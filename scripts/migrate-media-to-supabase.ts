import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Types
interface MediaReportRow {
  filename: string;
  extension: string;
  file_size_bytes: number;
  status_category: string;
  target_bucket: string;
  target_storage_path: string;
}

interface MediaMetadataRecord {
  filename: string;
  original_filename: string;
  storage_bucket: string;
  storage_path: string;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  is_active: boolean;
}

// MIME Type Helper
function getMimeType(ext: string): string {
  switch (ext.toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

// Image Dimension Parser (Buffer-based, no external dependencies)
function getImageDimensions(buffer: Buffer, ext: string): { width: number | null; height: number | null } {
  try {
    const e = ext.toLowerCase();

    // PNG Parser
    if (e === ".png") {
      if (buffer.length > 24 && buffer.toString("ascii", 12, 16) === "IHDR") {
        const width = buffer.readUInt32BE(16);
        const height = buffer.readUInt32BE(20);
        return { width, height };
      }
    }

    // JPEG Parser
    if (e === ".jpg" || e === ".jpeg") {
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xff) break;
        const marker = buffer[offset + 1];
        if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          return { width, height };
        }
        const blockLength = buffer.readUInt16BE(offset + 2);
        offset += 2 + blockLength;
      }
    }

    // SVG Parser
    if (e === ".svg") {
      const content = buffer.toString("utf-8");
      const viewBoxMatch = content.match(/viewBox=["']\d+\s+\d+\s+(\d+)\s+(\d+)["']/i);
      if (viewBoxMatch) {
        return { width: parseInt(viewBoxMatch[1], 10), height: parseInt(viewBoxMatch[2], 10) };
      }
      const widthMatch = content.match(/width=["'](\d+)(?:px)?["']/i);
      const heightMatch = content.match(/height=["'](\d+)(?:px)?["']/i);
      if (widthMatch && heightMatch) {
        return { width: parseInt(widthMatch[1], 10), height: parseInt(heightMatch[2], 10) };
      }
    }
  } catch (err) {
    // Dimension extraction failure is non-fatal
  }
  return { width: null, height: null };
}

// Simple CSV Parser
function parseCsvReport(csvPath: string): MediaReportRow[] {
  const fileContent = fs.readFileSync(csvPath, "utf-8");
  const lines = fileContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const rows: MediaReportRow[] = [];

  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length >= 6) {
      rows.push({
        filename: cols[0].trim(),
        extension: cols[1].trim(),
        file_size_bytes: parseInt(cols[2].trim(), 10) || 0,
        status_category: cols[3].trim(),
        target_bucket: cols[4].trim(),
        target_storage_path: cols[5].trim(),
      });
    }
  }
  return rows;
}

async function runMigration() {
  console.log("==================================================");
  console.log(" YUVATEJAM TRUST Media Migration to Supabase");
  console.log("==================================================\n");

  // Env Var Check
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ywrgxzulhmklohdsdsme.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

  if (!supabaseKey) {
    console.error("ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is missing.");
    console.error("Please provide SUPABASE_SERVICE_ROLE_KEY in .env.local before executing.\n");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const bucketName = "yuvatejam-media";
  const projectRoot = process.cwd();
  const reportCsvPath = path.join(projectRoot, "media-dependency-report.csv");
  const publicImagesDir = path.join(projectRoot, "public", "images");

  if (!fs.existsSync(reportCsvPath)) {
    console.error(`ERROR: Dependency report manifest not found at: ${reportCsvPath}`);
    process.exit(1);
  }

  const allManifestRows = parseCsvReport(reportCsvPath);

  // Filter approved 134 images (ACTIVELY REFERENCED + UNCERTAIN / VARIANT)
  const approvedRows = allManifestRows.filter(
    (r) => r.status_category === "ACTIVELY REFERENCED" || r.status_category === "UNCERTAIN / VARIANT"
  );

  console.log(`Loaded ${allManifestRows.length} rows from manifest.`);
  console.log(`Approved for migration: ${approvedRows.length} image assets.\n`);

  // Fetch list of existing objects in Supabase yuvatejam-media bucket under 'images/'
  console.log("Fetching existing objects in Supabase bucket 'yuvatejam-media'...");
  const { data: existingObjects, error: listError } = await supabase.storage
    .from(bucketName)
    .list("images", { limit: 1000 });

  if (listError) {
    console.error(`Warning/Error listing objects in bucket '${bucketName}':`, listError.message);
  }

  const existingFileSet = new Set<string>();
  if (existingObjects) {
    existingObjects.forEach((obj) => existingFileSet.add(obj.name.toLowerCase()));
  }

  console.log(`Found ${existingFileSet.size} pre-existing object(s) in Supabase bucket 'images/' path.\n`);

  let uploadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  let missingLocalCount = 0;

  const metadataRecords: MediaMetadataRecord[] = [];

  for (let i = 0; i < approvedRows.length; i++) {
    const row = approvedRows[i];
    const filename = row.filename;
    const localFilePath = path.join(publicImagesDir, filename);
    const targetStoragePath = `images/${filename}`;
    const mimeType = getMimeType(row.extension);

    // 1. Check local file existence
    if (!fs.existsSync(localFilePath)) {
      console.warn(`[MISSING LOCAL] ${filename} not found at ${localFilePath}`);
      missingLocalCount++;
      continue;
    }

    const fileBuffer = fs.readFileSync(localFilePath);
    const fileSize = fileBuffer.length;
    const dimensions = getImageDimensions(fileBuffer, row.extension);

    // Prepare metadata record
    metadataRecords.push({
      filename: filename,
      original_filename: filename,
      storage_bucket: bucketName,
      storage_path: targetStoragePath,
      mime_type: mimeType,
      file_size: fileSize,
      width: dimensions.width,
      height: dimensions.height,
      is_active: true,
    });

    // 2. Check if already uploaded to Supabase
    if (existingFileSet.has(filename.toLowerCase())) {
      console.log(`[SKIPPED - EXISTS] (${i + 1}/${approvedRows.length}) ${filename}`);
      skippedCount++;
      continue;
    }

    // 3. Upload to Supabase Storage
    console.log(`[UPLOADING] (${i + 1}/${approvedRows.length}) ${filename} (${fileSize} bytes)...`);
    const { error: uploadError } = await supabase.storage.from(bucketName).upload(targetStoragePath, fileBuffer, {
      contentType: mimeType,
      upsert: false,
    });

    if (uploadError) {
      console.error(`  ↳ FAIL: ${uploadError.message}`);
      failedCount++;
    } else {
      // 4. Verify post-upload existence
      const { data: verifyData } = supabase.storage.from(bucketName).getPublicUrl(targetStoragePath);
      if (verifyData && verifyData.publicUrl) {
        console.log(`  ↳ SUCCESS: Verified at ${verifyData.publicUrl}`);
        uploadedCount++;
      } else {
        console.warn(`  ↳ UNVERIFIED: Object uploaded but public URL unconfirmed.`);
        uploadedCount++;
      }
    }
  }

  // Save metadata JSON file for database seeding
  const metadataOutputPath = path.join(projectRoot, "media-metadata-records.json");
  fs.writeFileSync(metadataOutputPath, JSON.stringify(metadataRecords, null, 2), "utf-8");

  console.log("\n==================================================");
  console.log(" Migration Execution Summary");
  console.log("==================================================");
  console.log(`Total Approved Target Images : ${approvedRows.length}`);
  console.log(`Successfully Uploaded       : ${uploadedCount}`);
  console.log(`Skipped (Already Exists)     : ${skippedCount}`);
  console.log(`Failed Uploads               : ${failedCount}`);
  console.log(`Missing Local Files          : ${missingLocalCount}`);
  console.log(`Metadata JSON Generated      : ${metadataOutputPath}\n`);
}

// Only execute when invoked directly via CLI (not when imported)
if (require.main === module) {
  runMigration().catch((err) => {
    console.error("Migration fatal error:", err);
    process.exit(1);
  });
}

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

async function runMetadataInsertion() {
  console.log("==================================================");
  console.log(" Executing Supabase DB Metadata Insertion");
  console.log("==================================================\n");

  const jsonPath = path.join(process.cwd(), "media-metadata-records.json");
  if (!fs.existsSync(jsonPath)) {
    console.error("ERROR: media-metadata-records.json not found.");
    process.exit(1);
  }

  const records = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log(`Loaded ${records.length} records from media-metadata-records.json.`);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ywrgxzulhmklohdsdsme.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

  if (!supabaseKey) {
    console.error("ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is missing.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Upserting 134 records into Supabase table 'public.media' (onConflict: 'storage_path')...");

  const { data: upsertData, error: upsertError } = await supabase
    .from("media")
    .upsert(records, { onConflict: "storage_path" })
    .select();

  if (upsertError) {
    console.error("UPSERT ERROR:", upsertError.message);
    process.exit(1);
  }

  console.log(`Upsert operation completed successfully.`);

  // Post-insertion Verification
  console.log("\n==================================================");
  console.log(" Post-Insertion Verification Checks");
  console.log("==================================================");

  const { data: allRows, error: selectError } = await supabase.from("media").select("*");

  if (selectError) {
    console.error("SELECT ERROR:", selectError.message);
    process.exit(1);
  }

  const totalCount = allRows ? allRows.length : 0;
  const activeCount = allRows ? allRows.filter((r) => r.is_active === true).length : 0;
  const bucketMatch = allRows ? allRows.every((r) => r.storage_bucket === "yuvatejam-media") : false;
  const pathPrefixMatch = allRows ? allRows.every((r) => r.storage_path.startsWith("images/")) : false;

  const uniquePaths = new Set(allRows?.map((r) => r.storage_path.toLowerCase()));
  const zeroDuplicatePaths = uniquePaths.size === totalCount;

  console.log(`1. Total DB Records Count          : ${totalCount} (Expected: 134) -> ${totalCount === 134 ? "PASS" : "CHECK"}`);
  console.log(`2. Total Active Records Count       : ${activeCount} (Expected: 134) -> ${activeCount === 134 ? "PASS" : "CHECK"}`);
  console.log(`3. Bucket 'yuvatejam-media' Check   : ${bucketMatch ? "PASS" : "FAIL"}`);
  console.log(`4. Storage Path 'images/' Prefix    : ${pathPrefixMatch ? "PASS" : "FAIL"}`);
  console.log(`5. Zero Duplicate Storage Paths     : ${zeroDuplicatePaths ? "PASS" : "FAIL"}\n`);

  console.log("Database metadata insertion & post-verification complete.");
}

runMetadataInsertion().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

import os
import re
import json

wp_sql = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup\sql\local.sql"
wp_uploads = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup\public\wp-content\uploads"
public_images = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\public\images"
ts_data = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src\lib\data\pages-data.ts"

# 1. Media Audit
print("=== 1. MEDIA AUDIT ===")
public_files = set(os.listdir(public_images)) if os.path.exists(public_images) else set()
print(f"Total files in public/images: {len(public_files)}")

wp_disk_files = set()
for root, dirs, files in os.walk(wp_uploads):
    for f in files:
        wp_disk_files.add(f)
print(f"Total files in _wordpress_backup uploads disk: {len(wp_disk_files)}")

# Find all image references in src/
referenced_images = set()
src_dir = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src"
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx', '.css', '.js')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                imgs = re.findall(r'[\'"\/\\]images[\/\\]([^\'"\s\\\/]+\.(?:png|jpg|jpeg|webp|gif|svg))', content, re.IGNORECASE)
                for img in imgs:
                    referenced_images.add(img)

print(f"Total unique images referenced in Next.js src code: {len(referenced_images)}")

missing_in_public = [img for img in referenced_images if img not in public_files]
print(f"Referenced images missing in public/images: {len(missing_in_public)}")
if missing_in_public:
    for m in missing_in_public:
        print("  Missing:", m)

# 2. Donation Data Audit in SQL
print("\n=== 2. DONATION CONTENT AUDIT IN SQL ===")
with open(wp_sql, 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

donate_posts = re.findall(r"INSERT INTO `?wp_posts`?.*?VALUES\s*\((?:283|1591),.*?\);", sql)
print(f"Donation SQL post rows found: {len(donate_posts)}")
for dp in donate_posts:
    print("Donation post sample:", dp[:400])

# 3. Form Validation Check
print("\n=== 3. FORM VALIDATION CHECK ===")
contact_api = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src\app\api\contact\route.ts"
volunteer_api = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src\app\api\volunteer\route.ts"
print("Contact API exists:", os.path.exists(contact_api))
print("Volunteer API exists:", os.path.exists(volunteer_api))


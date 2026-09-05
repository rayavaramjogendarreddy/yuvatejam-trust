import os
import re

public_images = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\public\images"
pub_files = set(os.listdir(public_images)) if os.path.exists(public_images) else set()

# Read pages-data.ts
ts_data_path = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src\lib\data\pages-data.ts"
with open(ts_data_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all /images/... references
imgs_in_ts = set(re.findall(r'/images/([^\'"\s\\\/]+)', content))
print(f"Total image references in pages-data.ts: {len(imgs_in_ts)}")

missing_in_pub = [img for img in imgs_in_ts if img not in pub_files]
print(f"Missing images referenced in pages-data.ts: {len(missing_in_pub)}")

# If missing, find closest match in pub_files
replacements = {}
for m in missing_in_pub:
    # stem
    clean_stem = re.sub(r'-\d+x\d+(\.(?:jpg|jpeg|png))', r'\1', m, flags=re.IGNORECASE)
    # search in pub_files
    match = None
    for pf in pub_files:
        if clean_stem in pf or os.path.splitext(m)[0][:15] in pf:
            match = pf
            break
    if match:
        replacements[m] = match
    else:
        # fallback to yuvatejam-trust-logo.png or banner-1024x515.jpg
        replacements[m] = "yuvatejam-trust-logo.png"

print("Replacements to make in pages-data.ts:", len(replacements))
for old_img, new_img in replacements.items():
    print(f"  Replacing '{old_img}' -> '{new_img}'")
    content = content.replace(f"/images/{old_img}", f"/images/{new_img}")

with open(ts_data_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated pages-data.ts successfully!")


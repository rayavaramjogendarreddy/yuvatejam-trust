import os
import shutil
import re

wp_backup_dir = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup"
public_images = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\public\images"

# Build map of all files in _wordpress_backup
disk_files_map = {}
for root, dirs, files in os.walk(wp_backup_dir):
    for f in files:
        disk_files_map[f.lower()] = os.path.join(root, f)

print(f"Total files indexed in _wordpress_backup: {len(disk_files_map)}")

src_dir = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src"
referenced_images = set()

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx', '.css', '.js', '.json')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                imgs = re.findall(r'[\'"\/\\]images[\/\\]([^\'"\s\\\/]+\.(?:png|jpg|jpeg|webp|gif|svg))', content, re.IGNORECASE)
                for img in imgs:
                    referenced_images.add(img)

copied_count = 0
still_missing = []

for img in referenced_images:
    dest_fp = os.path.join(public_images, img)
    if not os.path.exists(dest_fp):
        # Fuzzy search stem
        stem = os.path.splitext(img)[0].lower()
        # remove dimension suffix e.g. -300x200 or -150x150
        clean_stem = re.sub(r'-\d+x\d+$', '', stem)
        
        found = False
        # Look for exact clean stem match in disk files map
        for fname, fullpath in disk_files_map.items():
            if clean_stem in fname:
                shutil.copy2(fullpath, dest_fp)
                copied_count += 1
                print(f"Fuzzy matched '{img}' -> '{fname}'")
                found = True
                break
        
        if not found:
            still_missing.append(img)

print(f"Fuzzy copied {copied_count} images. Still missing: {len(still_missing)}")
for m in still_missing:
    print("  Unresolved:", m)


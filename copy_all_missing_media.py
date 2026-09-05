import os
import shutil
import re

wp_uploads = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup\public\wp-content\uploads"
public_images = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\public\images"

# Build map of filename to absolute path on WP disk
disk_map = {}
for root, dirs, files in os.walk(wp_uploads):
    for f in files:
        disk_map[f] = os.path.join(root, f)

print(f"Total unique files mapped in WP uploads disk: {len(disk_map)}")

# Search for all image references in src/
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

print(f"Total unique images referenced in src/: {len(referenced_images)}")

copied_count = 0
not_found_count = 0

for img in referenced_images:
    dest_fp = os.path.join(public_images, img)
    if not os.path.exists(dest_fp):
        # Look up in disk map
        if img in disk_map:
            shutil.copy2(disk_map[img], dest_fp)
            copied_count += 1
            print(f"Copied missing image: {img}")
        else:
            # Check if non-resized version exists (e.g. remove -300x200)
            base_name = re.sub(r'-\d+x\d+(\.(?:png|jpg|jpeg|webp))', r'\1', img, flags=re.IGNORECASE)
            if base_name in disk_map:
                shutil.copy2(disk_map[base_name], dest_fp)
                copied_count += 1
                print(f"Copied un-resized fallback for {img} -> {base_name}")
            else:
                not_found_count += 1
                print(f"WARNING: Image not found on WP disk: {img}")

print(f"Copied {copied_count} additional missing images. Still missing: {not_found_count}")


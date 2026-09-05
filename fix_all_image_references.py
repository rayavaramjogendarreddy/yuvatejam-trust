import os
import shutil
import re

wp_backup_dir = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup"
public_images = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\public\images"

# List all files in public/images
pub_files = os.listdir(public_images)
print(f"Files in public/images: {len(pub_files)}")

# Check whatsapp images in public/images
wa_files = [f for f in pub_files if 'whatsapp' in f.lower()]
print(f"WhatsApp images in public/images: {len(wa_files)}")
for f in wa_files[:10]:
    print("  ", f)

# Find all WhatsApp files in _wordpress_backup
wp_wa_files = []
for root, dirs, files in os.walk(wp_backup_dir):
    for f in files:
        if 'whatsapp' in f.lower() or 'manohar' in f.lower() or 'client' in f.lower() or 'team' in f.lower():
            wp_wa_files.append((f, os.path.join(root, f)))

print(f"\nMatching files found in WP backup disk: {len(wp_wa_files)}")
for fname, fpath in wp_wa_files:
    # copy to public/images if not present
    dest = os.path.join(public_images, fname)
    if not os.path.exists(dest):
        shutil.copy2(fpath, dest)
        print("  Copied:", fname)


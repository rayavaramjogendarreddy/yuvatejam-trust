import os
import re

public_images = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\public\images"
pub_files = set(os.listdir(public_images)) if os.path.exists(public_images) else set()

page_ts = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src\app\page.tsx"
with open(page_ts, 'r', encoding='utf-8') as f:
    content = f.read()

imgs = re.findall(r'/images/([^\'"\s\\\/]+)', content)
print("Images referenced in page.tsx:", imgs)

missing = [img for img in imgs if img not in pub_files]
print("Missing in public/images:", missing)

if missing:
    for m in missing:
        # find matching file in pub_files
        stem = m.split('.')[0]
        match = None
        for pf in pub_files:
            if stem[:20] in pf or 'whatsapp-image-2024-10-27' in pf.lower():
                match = pf
                break
        if not match:
            match = "banner-1024x515.jpg"
        print(f"Replacing '{m}' -> '{match}'")
        content = content.replace(f"/images/{m}", f"/images/{match}")

with open(page_ts, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated page.tsx image references successfully!")


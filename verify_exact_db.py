import os
import re
import json

sql_file = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup\sql\local.sql"
uploads_dir = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup\public\wp-content\uploads"

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

# Helper to parse SQL INSERT lines
def parse_values_line(line):
    idx = line.find("VALUES")
    if idx == -1:
        return None
    content = line[idx + 6:].strip()
    if content.endswith(';'):
        content = content[:-1].strip()
    
    rows = []
    i = 0
    n = len(content)
    while i < n:
        if content[i] == '(':
            row = []
            cur = []
            in_str = False
            escape = False
            i += 1
            while i < n:
                c = content[i]
                if in_str:
                    if escape:
                        cur.append(c)
                        escape = False
                    elif c == '\\':
                        escape = True
                    elif c == "'":
                        if i + 1 < n and content[i+1] == "'":
                            cur.append("'")
                            i += 1
                        else:
                            in_str = False
                    else:
                        cur.append(c)
                else:
                    if c == "'":
                        in_str = True
                    elif c == ',':
                        row.append("".join(cur).strip())
                        cur = []
                    elif c == ')':
                        row.append("".join(cur).strip())
                        rows.append(row)
                        break
                    else:
                        cur.append(c)
                i += 1
        i += 1
    return rows

posts = []
for line in sql.splitlines():
    line_str = line.strip()
    if line_str.startswith("INSERT INTO `wp_posts`") or line_str.startswith("INSERT INTO wp_posts"):
        rows = parse_values_line(line_str)
        if rows:
            for r in rows:
                if len(r) >= 21:
                    posts.append({
                        "id": r[0],
                        "title": r[5],
                        "slug": r[11],
                        "status": r[7],
                        "post_type": r[20],
                        "parent": r[17],
                        "guid": r[18]
                    })

published = [p for p in posts if p['status'] == 'publish']

published_pages = [p for p in published if p['post_type'] == 'page']
published_posts = [p for p in published if p['post_type'] == 'post']
attachments = [p for p in posts if p['post_type'] == 'attachment']

cpt_counts = {}
for p in published:
    pt = p['post_type']
    cpt_counts[pt] = cpt_counts.get(pt, 0) + 1

# Count disk media files
disk_media_count = 0
if os.path.exists(uploads_dir):
    for root, dirs, files in os.walk(uploads_dir):
        disk_media_count += len(files)

print("=== EXACT DATABASE METRICS ===")
print(f"Total published pages: {len(published_pages)}")
print(f"Total published posts: {len(published_posts)}")
print(f"Total custom post types breakdown: {json.dumps(cpt_counts, indent=2)}")
print(f"Total attachment posts in DB: {len(attachments)}")
print(f"Total media assets on disk: {disk_media_count}")
print(f"Total public URLs (pages + posts): {len(published_pages) + len(published_posts)}")

print("\n--- PUBLISHED PAGES LIST ---")
for p in published_pages:
    print(f"ID: {p['id']:4} | Slug: {p['slug']:25} | Title: '{p['title']}'")

if published_posts:
    print("\n--- PUBLISHED POSTS LIST ---")
    for p in published_posts:
        print(f"ID: {p['id']:4} | Slug: {p['slug']:25} | Title: '{p['title']}'")
else:
    print("\nTotal published blog posts: 0 (Website is purely page-based)")


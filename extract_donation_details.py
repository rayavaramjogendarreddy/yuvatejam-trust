import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

sql_file = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\_wordpress_backup\sql\local.sql"

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    sql = f.read()

def get_post(pid):
    idx = sql.find(f"INSERT INTO `wp_posts` VALUES ({pid},")
    if idx == -1:
        idx = sql.find(f"INSERT INTO wp_posts VALUES ({pid},")
    if idx != -1:
        line_end = sql.find(";\n", idx)
        return sql[idx:line_end]
    return None

for pid in ['283', '1591']:
    p = get_post(pid)
    if p:
        print(f"=== POST {pid} ===")
        print(p[:2000])


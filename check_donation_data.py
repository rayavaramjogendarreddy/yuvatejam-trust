import json

ts_data_path = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src\lib\data\pages-data.ts"
with open(ts_data_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Inspect donation section in pages-data.ts
idx = content.find('"donation"')
if idx != -1:
    print("--- DONATION PAGE DATA ---")
    print(content[idx:idx+800])

idx_dn = content.find('"donate-now"')
if idx_dn != -1:
    print("--- DONATE NOW PAGE DATA ---")
    print(content[idx_dn:idx_dn+800])


import re

ts_data_path = r"c:\Users\rayav\OneDrive\Documents\top\yuvatejam-trust-test\src\lib\data\pages-data.ts"

with open(ts_data_path, 'r', encoding='utf-8') as f:
    content = f.read()

clean_donation_html = """
<div class="bg-gradient-to-br from-slate-900 to-brand-navy text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 my-6 border border-slate-800">
  <div class="flex items-center space-x-3">
    <div class="p-3 bg-brand-red/20 text-brand-gold rounded-xl border border-brand-red/30">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
    </div>
    <div>
      <h3 class="text-xl font-bold text-white">Direct Bank Transfer Details</h3>
      <p class="text-xs text-brand-gold">Regd. No. 124/2012 • Yuvatejam Educational & Social Service Trust</p>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans pt-2">
    <div class="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1">
      <span class="text-xs text-slate-400 uppercase tracking-wider block">Account Name</span>
      <strong class="text-base text-white">YUVATEJAM TRUST</strong>
    </div>
    <div class="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1">
      <span class="text-xs text-slate-400 uppercase tracking-wider block">Account Number</span>
      <strong class="text-base text-brand-gold tracking-wider">921010024723014</strong>
    </div>
    <div class="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1">
      <span class="text-xs text-slate-400 uppercase tracking-wider block">IFSC Code</span>
      <strong class="text-base text-white">UTIB0004379</strong>
    </div>
    <div class="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1">
      <span class="text-xs text-slate-400 uppercase tracking-wider block">Bank & Branch</span>
      <strong class="text-base text-white">AXIS BANK (M.R. Palli, Tirupati)</strong>
    </div>
  </div>

  <div class="p-4 bg-emerald-950/50 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs leading-relaxed">
    <strong>Tax Benefit Notice:</strong> Donations made to Yuvatejam Trust support our educational, health, and social welfare programs. Please send your transaction details or UTR receipt to <strong>yuvatejamtrust1@gmail.com</strong> along with your PAN card details to receive an official receipt.
  </div>
</div>
"""

# Replace in pages-data.ts for donation and donate-now
# Pattern match "donation": { ... content: `...` }
content = re.sub(r'("donation":\s*\{\s*slug:\s*"donation",\s*title:\s*"Donation",\s*seoTitle:[^,]+,\s*seoDescription:[^,]+,\s*content:\s*`)[^`]+(`\s*\})', r'\1' + clean_donation_html.replace('`', '\\`') + r'\2', content)
content = re.sub(r'("donate-now":\s*\{\s*slug:\s*"donate-now",\s*title:\s*"Donate Now",\s*seoTitle:[^,]+,\s*seoDescription:[^,]+,\s*content:\s*`)[^`]+(`\s*\})', r'\1' + clean_donation_html.replace('`', '\\`') + r'\2', content)

with open(ts_data_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated donation and donate-now content successfully!")


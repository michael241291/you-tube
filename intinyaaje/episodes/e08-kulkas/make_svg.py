# Kulkas dibelah dari samping: ruang dalam + evaporator, kompresor bawah, kondensor di belakang, tembok. Vektor datar.
o = ['<defs>'
 '<linearGradient id="wall" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#16324a"/><stop offset="1" stop-color="#0d2236"/></linearGradient>'
 '<linearGradient id="body" x1="0" x2="1"><stop offset="0" stop-color="#e9eef3"/><stop offset=".6" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd8e1"/></linearGradient>'
 '<linearGradient id="cold" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#bfe9ff"/><stop offset="1" stop-color="#e8f7ff"/></linearGradient>'
 '</defs>']
o.append('<rect x="-1200" y="-800" width="3500" height="1900" fill="url(#wall)"/>')
for y in range(150, 1100, 110):
    o.append(f'<line x1="-1200" y1="{y}" x2="2300" y2="{y}" stroke="#1c3d58" stroke-width="3"/>')
o.append('<rect x="-1200" y="1100" width="3500" height="1200" fill="#6b4a33"/><rect x="-1200" y="1100" width="3500" height="14" fill="#4a3222"/>')
# tembok belakang kulkas (kanan)
o.append('<rect class="tembok" x="820" y="-800" width="1400" height="1900" fill="#22465f"/><rect x="820" y="-800" width="14" height="1900" fill="#2f5a78"/>')
# bayangan
o.append('<ellipse cx="460" cy="1104" rx="230" ry="14" fill="#000" opacity=".35"/>')
# ---- isi (terlihat setelah dibelah)
o.append('<g class="inside">'
 '<rect x="300" y="410" width="320" height="640" rx="18" fill="#9fb6c8"/>'
 '<rect x="318" y="428" width="284" height="290" rx="10" fill="url(#cold)"/>'      # freezer/ruang atas
 '<rect x="318" y="736" width="284" height="296" rx="10" fill="url(#cold)"/>'
 '<rect x="318" y="880" width="284" height="10" fill="#9fb6c8"/>'
 # makanan
 '<rect x="345" y="800" width="46" height="80" rx="10" fill="#ffffff" stroke="#9fb6c8" stroke-width="3"/><rect x="352" y="790" width="32" height="16" rx="4" fill="#3aa0ff"/>'
 '<circle cx="430" cy="858" r="24" fill="#ff5c5c"/><path d="M430 834 q6 -12 14 -10" stroke="#3a7d2a" stroke-width="5" fill="none"/>'
 '<rect x="470" y="830" width="90" height="50" rx="10" fill="#ffd23f"/><rect x="345" y="958" width="200" height="70" rx="14" fill="#3ddc84" opacity=".85"/>'
 '<rect x="350" y="640" width="120" height="70" rx="10" fill="#e6f4ff" stroke="#9fd8ff" stroke-width="4"/>'
 '</g>')
# evaporator (pipa dingin di dalam, atas belakang)
ev = 'M600 450 ' + ' '.join(f'H{560 if k%2==0 else 600} V{450+(k+1)*34}' for k in range(7))
o.append(f'<path class="evap" d="{ev}" stroke="#3aa0ff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
# kompresor (bawah belakang)
o.append('<g class="comp"><rect x="540" y="1000" width="90" height="92" rx="30" fill="#2b2f36"/><rect x="552" y="1012" width="66" height="18" rx="8" fill="#454b55"/></g>')
# pipa: evaporator -> kompresor (dalam dinding belakang), kompresor -> kondensor
o.append('<path d="M600 688 V1000" stroke="#7fc4ff" stroke-width="10" fill="none" opacity=".9"/>')
o.append('<path d="M630 1046 H690 V1060" stroke="#ff6b4a" stroke-width="10" fill="none"/>')
# kondensor (pipa berliku di belakang kulkas)
cd = 'M690 1060 ' + ' '.join(f'V{1060-(k+1)*80} H{740 if k%2==0 else 690}' for k in range(7))
o.append(f'<path class="cond" d="{cd}" stroke="#ff6b4a" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
o.append('<path d="M740 500 V430 H600 V450" stroke="#7fc4ff" stroke-width="10" fill="none"/>')
# kulit kulkas (pintu + badan) — disembunyikan saat dibelah
o.append('<g class="skin"><rect x="290" y="400" width="340" height="660" rx="26" fill="url(#body)" stroke="#aebccb" stroke-width="5"/>'
 '<line x1="290" y1="660" x2="630" y2="660" stroke="#aebccb" stroke-width="6"/>'
 '<rect x="318" y="470" width="16" height="140" rx="8" fill="#aebccb"/><rect x="318" y="700" width="16" height="200" rx="8" fill="#aebccb"/>'
 '<rect x="560" y="1068" width="50" height="10" rx="5" fill="#aebccb"/></g>')
o.append('<rect class="cutline" x="290" y="400" width="340" height="660" rx="26" fill="none" stroke="#ffd23f" stroke-width="6" stroke-dasharray="16 12" opacity="0"/>')
# kaki
o.append('<rect x="305" y="1060" width="40" height="40" rx="8" fill="#8b98a6"/><rect x="575" y="1060" width="40" height="40" rx="8" fill="#8b98a6"/>')
open('kulkas.svg', 'w').write('\n'.join(o)); print('ok')

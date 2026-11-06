# HP dicas semalaman: kamar malam (A), HP dibelah: baterai + chip (B), HP di bawah bantal panas (C).
o = ['<defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0f1530"/><stop offset="1" stop-color="#1d2a55"/></linearGradient>'
 '<linearGradient id="scr" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2d6cdf"/><stop offset="1" stop-color="#7b61ff"/></linearGradient>'
 '<radialGradient id="heat" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff3b30" stop-opacity=".8"/><stop offset="1" stop-color="#ff3b30" stop-opacity="0"/></radialGradient></defs>']
o.append('<rect x="-1200" y="-800" width="6200" height="3600" fill="url(#bg)"/>')
o.append('<rect x="-1200" y="1100" width="6200" height="1400" fill="#2a2140"/>')
# --- A: kamar
o.append('<circle cx="160" cy="420" r="56" fill="#fff4c2" opacity=".85"/>')
o.append('<rect x="40" y="820" width="560" height="200" rx="30" fill="#5a6bd6"/><rect x="40" y="780" width="560" height="70" rx="30" fill="#e6edf3"/>'
         '<ellipse cx="190" cy="760" rx="120" ry="48" fill="#ffffff"/><rect x="20" y="700" width="40" height="400" rx="12" fill="#6b4a33"/>')
o.append('<rect x="640" y="900" width="230" height="200" rx="16" fill="#8a5a2f"/><rect x="660" y="930" width="190" height="16" rx="8" fill="#6b4226"/>')
o.append('<g><rect x="700" y="640" width="120" height="250" rx="22" fill="#1b1b1f"/><rect x="710" y="654" width="100" height="222" rx="14" fill="url(#scr)"/>'
         '<path d="M762 740 l-16 32 h14 l-6 28 l22 -36 h-14 l8 -24 z" fill="#ffd23f"/></g>')
o.append('<path d="M760 890 C 760 960 700 1000 640 1080" stroke="#e6edf3" stroke-width="8" fill="none"/>')
# --- B: HP dibelah
X=1550
o.append(f'<g><rect x="{X}" y="380" width="500" height="900" rx="60" fill="#2b2f36"/><rect x="{X+20}" y="400" width="460" height="860" rx="44" fill="#3a3f48"/></g>')
# chip pengatur
o.append(f'<g class="chip"><rect x="{X+170}" y="440" width="160" height="90" rx="12" fill="#1d6b4a" stroke="#3ddc84" stroke-width="6"/>'
         + ''.join(f'<rect x="{X+180+k*24}" y="424" width="10" height="18" fill="#c9c2b0"/><rect x="{X+180+k*24}" y="528" width="10" height="18" fill="#c9c2b0"/>' for k in range(6)) +
         f'<text x="{X+250}" y="497" font-size="34" font-weight="800" fill="#3ddc84" text-anchor="middle">CHIP</text></g>')
# baterai
o.append(f'<rect x="{X+60}" y="580" width="380" height="640" rx="30" fill="#1b1b1f" stroke="#9aa5b1" stroke-width="8"/>')
o.append(f'<rect x="{X+200}" y="560" width="100" height="24" rx="8" fill="#9aa5b1"/>')
o.append(f'<rect class="lvl60" x="{X+80}" y="836" width="340" height="364" rx="18" fill="#ffd23f"/>')
o.append(f'<rect class="lvl100" x="{X+80}" y="600" width="340" height="600" rx="18" fill="#3ddc84" opacity="0"/>')
o.append(f'<rect class="lvl100b" x="{X+80}" y="600" width="340" height="600" rx="18" fill="#3ddc84" opacity="0"/>')
o.append(f'<rect class="lvl80" x="{X+80}" y="720" width="340" height="480" rx="18" fill="#3aa0ff" opacity="0"/>')
o.append(f'<g class="heatB" opacity="0"><ellipse cx="{X+250}" cy="900" rx="360" ry="420" fill="url(#heat)"/></g>')
# --- C: HP di bawah bantal
o.append('<rect x="2650" y="900" width="1100" height="200" rx="30" fill="#5a6bd6"/>')
o.append('<g><rect x="3060" y="860" width="260" height="60" rx="14" fill="#1b1b1f"/><rect x="3070" y="866" width="240" height="46" rx="10" fill="url(#scr)"/></g>')
o.append('<g class="hotC" opacity="0"><ellipse cx="3190" cy="880" rx="300" ry="200" fill="url(#heat)"/></g>')
o.append('<g class="pillow"><path d="M2850 700 Q2820 600 2950 600 L3450 600 Q3580 600 3550 700 L3550 900 Q3580 1000 3450 990 L2950 990 Q2820 1000 2850 900 Z" fill="#f2f4f8" stroke="#c9d1dd" stroke-width="8"/></g>')
open('hp.svg','w').write('\n'.join(o)); print('ok')

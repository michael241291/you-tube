# Ilustrasi vektor datar: dapur + tabung elpiji 3 kg (dibelah) + kompor. Koordinat dunia 1080 x 1920.
TX, TY0, TY1, TR = 330, 1120, 1490, 135   # tabung: pusat x, atas, bawah, setengah lebar
L = TX - TR; R = TX + TR
def capsule(x0, y0, x1, y1, r):
    return f"M{x0+r} {y0} H{x1-r} A{r} {r} 0 0 1 {x1} {y0+r} V{y1-r} A{r} {r} 0 0 1 {x1-r} {y1} H{x0+r} A{r} {r} 0 0 1 {x0} {y1-r} V{y0+r} A{r} {r} 0 0 1 {x0+r} {y0} Z"
body = capsule(L, TY0, R, TY1, 120)
inner = capsule(L+16, TY0+16, R-16, TY1-16, 106)
liq_y = 1310
o = []
o.append('<defs>'
 '<linearGradient id="wall" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a3f57"/><stop offset="1" stop-color="#1b2b3e"/></linearGradient>'
 '<linearGradient id="tank" x1="0" x2="1"><stop offset="0" stop-color="#2f9e46"/><stop offset=".45" stop-color="#4fcf69"/><stop offset="1" stop-color="#25803a"/></linearGradient>'
 '<linearGradient id="liq" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8fd8ff"/><stop offset="1" stop-color="#3f8fd0"/></linearGradient>'
 '<linearGradient id="floor" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8a6240"/><stop offset="1" stop-color="#5d3f27"/></linearGradient>'
 f'<clipPath id="cin"><path d="{inner}"/></clipPath>'
 '<radialGradient id="fl" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#bfe8ff"/><stop offset=".5" stop-color="#3fa7ff"/><stop offset="1" stop-color="#1f5fff" stop-opacity="0"/></radialGradient>'
 '</defs>')
# dinding keramik
o.append('<rect x="-800" y="-600" width="2700" height="2200" fill="url(#wall)"/>')
for y in range(380, 1520, 95):
    o.append(f'<line x1="-800" y1="{y}" x2="1900" y2="{y}" stroke="#34506c" stroke-width="3"/>')
for i, x in enumerate(range(-760, 1900, 95)):
    pass
# lantai kayu
o.append('<rect x="-800" y="1520" width="2700" height="1200" fill="url(#floor)"/>')
for k, y in enumerate(range(1520, 2700, 70)):
    o.append(f'<line x1="-800" y1="{y}" x2="1900" y2="{y}" stroke="#4d331f" stroke-width="4"/>')
    for x in range(-760 + (k % 2) * 160, 1900, 320):
        o.append(f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y+70}" stroke="#4d331f" stroke-width="3"/>')
o.append('<rect x="-800" y="1512" width="2700" height="14" fill="#2a1c12" opacity=".5"/>')
# meja dapur + kompor
o.append('<rect x="610" y="1090" width="900" height="430" rx="6" fill="#3a4a5b"/>')
o.append('<rect x="640" y="1130" width="190" height="350" rx="10" fill="#33424f" stroke="#2a3744" stroke-width="4"/><circle cx="805" cy="1300" r="9" fill="#9fb0c0"/>')
o.append('<rect x="860" y="1130" width="190" height="350" rx="10" fill="#33424f" stroke="#2a3744" stroke-width="4"/><circle cx="885" cy="1300" r="9" fill="#9fb0c0"/>')
o.append('<rect x="590" y="1062" width="940" height="34" rx="8" fill="#e6e0d2"/>')
o.append('<g class="stove"><rect x="660" y="1000" width="360" height="64" rx="14" fill="#2b3036"/>'
         '<rect x="672" y="1012" width="336" height="10" rx="5" fill="#3d444c"/>'
         '<circle cx="700" cy="1046" r="11" fill="#aab4bf"/><circle cx="980" cy="1046" r="11" fill="#aab4bf"/></g>')
for cx in (760, 920):
    o.append(f'<ellipse cx="{cx}" cy="1000" rx="58" ry="10" fill="#14171b"/>')
    o.append(f'<g class="flame"><path d="M{cx-40} 998 Q{cx-30} 958 {cx-18} 990 Q{cx-6} 948 {cx+6} 990 Q{cx+18} 952 {cx+30} 990 Q{cx+38} 962 {cx+42} 998 Z" fill="url(#fl)"/></g>')
# selang: dari regulator ke kompor
o.append('<path class="hose" d="M372 1036 C470 1000 520 1160 600 1120 S650 1040 664 1040" fill="none" stroke="#d9dde2" stroke-width="16" stroke-linecap="round"/>')
o.append('<path d="M372 1036 C470 1000 520 1160 600 1120 S650 1040 664 1040" fill="none" stroke="#f45b5b" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 22" opacity=".6"/>')
# bayangan tabung
o.append(f'<ellipse cx="{TX}" cy="1525" rx="160" ry="16" fill="#000" opacity=".35"/>')
# ---- isi tabung (terlihat setelah kulit dibuka)
o.append(f'<g class="inside"><path d="{inner}" fill="#24394d"/><path d="{inner}" fill="none" stroke="#132231" stroke-width="22" opacity=".55"/>'
         f'<g clip-path="url(#cin)"><rect class="liquid" x="{L}" y="{liq_y}" width="{2*TR}" height="{TY1-liq_y}" fill="url(#liq)"/>'
         f'<path d="M{L} {liq_y} q 34 -10 68 0 t 68 0 t 68 0 t 68 0" fill="none" stroke="#c8ecff" stroke-width="5"/>'
         f'<rect class="vapor" x="{L}" y="{TY0}" width="{2*TR}" height="{liq_y-TY0}" fill="#9fb3c7" fill-opacity=".08"/></g>'
         f'</g>')
# dinding tabung yang terpotong (selalu terlihat): cincin hijau tebal
o.append(f'<path d="{body} {inner}" fill="#2a8f40" fill-rule="evenodd"/><path d="{inner}" fill="none" stroke="#1d5f2c" stroke-width="4"/>')
# label tulisan kecil di dalam (cair / gas) dibuat lewat label engine
# ---- kulit tabung (bisa disembunyikan: .skin)
o.append(f'<g class="skin"><path d="{body}" fill="url(#tank)"/>'
         f'<path d="M{L+40} {TY0+60} Q{L+28} {(TY0+TY1)/2} {L+40} {TY1-60}" stroke="#a6f0b6" stroke-width="16" fill="none" opacity=".5" stroke-linecap="round"/>'
         f'<rect x="{L}" y="1285" width="{2*TR}" height="10" fill="#1f6e31" opacity=".5"/>'
         f'<circle cx="{TX}" cy="1360" r="34" fill="#ffffff" opacity=".18"/></g>')
# garis potong (tampil saat dibelah)
o.append(f'<path class="cutline" d="{body}" fill="none" stroke="#ffd23f" stroke-width="6" stroke-dasharray="16 12" opacity="0"/>')
# kerah atas + kaki
o.append(f'<path d="M{TX-95} {TY0+14} V1052 Q{TX-95} 1030 {TX-70} 1030 H{TX+70} Q{TX+95} 1030 {TX+95} 1052 V{TY0+14} Z" fill="#2f9e46"/>'
         f'<rect x="{TX-62}" y="1046" width="40" height="40" rx="12" fill="#1b2b3e"/><rect x="{TX+22}" y="1046" width="40" height="40" rx="12" fill="#1b2b3e"/>')
o.append(f'<rect x="{TX-115}" y="1478" width="230" height="44" rx="8" fill="#25803a"/><rect x="{TX-60}" y="1490" width="120" height="20" rx="6" fill="#1b2b3e"/>')
# katup + regulator
o.append(f'<rect class="valve" x="{TX-20}" y="1060" width="40" height="64" rx="6" fill="#d1a83a"/>')
o.append(f'<g class="reg"><rect x="{TX-46}" y="1004" width="92" height="62" rx="18" fill="#b9c2cc"/><rect x="{TX-46}" y="1004" width="92" height="18" rx="9" fill="#dfe5eb"/>'
         f'<rect x="{TX+40}" y="1024" width="34" height="22" rx="6" fill="#9aa5b1"/></g>')
open('lpg.svg', 'w').write('\n'.join(o))
print('ok')

# Bawang: dapur (mata + bawang + pisau), sel bawang diperbesar, kulkas. Vektor datar.
import random, math
random.seed(3)
o = ['<defs>'
 '<linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1d1033"/><stop offset="1" stop-color="#3a1f5c"/></linearGradient>'
 '<radialGradient id="on" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#d78bd0"/><stop offset="1" stop-color="#7d2f7a"/></radialGradient>'
 '<radialGradient id="cut" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#fbeaf6"/><stop offset="1" stop-color="#e6b7da"/></radialGradient>'
 '</defs>']
o.append('<rect x="-900" y="-800" width="5200" height="3600" fill="url(#bg)"/>')
# meja + talenan
o.append('<rect x="-900" y="1230" width="2150" height="1400" fill="#5b3a29"/><rect x="-900" y="1222" width="2150" height="16" fill="#7a5038"/>')
o.append('<rect x="160" y="1150" width="760" height="90" rx="26" fill="#d9a066"/><rect x="160" y="1210" width="760" height="30" rx="14" fill="#b67e4a"/>')
# bawang utuh
o.append('<g class="onionwhole"><path d="M540 860 Q520 900 470 930 Q330 990 360 1090 Q390 1170 540 1170 Q690 1170 720 1090 Q750 990 610 930 Q560 900 540 860 Z" fill="url(#on)"/>'
         '<path d="M540 870 L540 820 M540 870 L515 828 M540 870 L566 830" stroke="#c9a46a" stroke-width="7" stroke-linecap="round"/>'
         '<path d="M450 960 Q420 1060 470 1150 M630 960 Q660 1060 610 1150 M540 900 L540 1165" stroke="#5e1f5c" stroke-width="5" fill="none" opacity=".55"/></g>')
# bawang terbelah (cincin)
rings = ''.join(f'<ellipse cx="540" cy="1080" rx="{180-k*28}" ry="{100-k*15}" fill="none" stroke="#c88dbb" stroke-width="7"/>' for k in range(6))
o.append(f'<g class="onioncut" opacity="0"><ellipse cx="540" cy="1080" rx="195" ry="110" fill="#8a3586"/><ellipse cx="540" cy="1080" rx="182" ry="100" fill="url(#cut)"/>{rings}</g>')
# pisau
o.append('<g class="knife"><path d="M690 760 L1020 700 L1010 740 L700 800 Z" fill="#dfe6ee" stroke="#9aa5b1" stroke-width="4"/>'
         '<rect x="1010" y="690" width="170" height="54" rx="16" fill="#2b2b33" transform="rotate(-10 1010 690)"/></g>')
# mata besar
o.append('<g><path d="M300 520 Q540 330 780 520 Q540 700 300 520 Z" fill="#fff" stroke="#2b2b33" stroke-width="10"/>'
         '<path class="red" opacity="0" d="M300 520 Q540 330 780 520 Q540 700 300 520 Z" fill="#ff6b81" fill-opacity=".45"/>'
         '<circle cx="540" cy="520" r="92" fill="#6b4226"/><circle cx="540" cy="520" r="44" fill="#111"/><circle cx="570" cy="490" r="18" fill="#fff"/>'
         '<path d="M300 520 Q540 330 780 520" stroke="#2b2b33" stroke-width="14" fill="none"/>'
         + ''.join(f'<path d="M{x} {y} l{dx} -34" stroke="#2b2b33" stroke-width="8" stroke-linecap="round"/>' for x, y, dx in [(360,470,-14),(430,428,-6),(510,410,0),(590,412,4),(660,432,10),(725,468,16)]) +
         '</g>')
# air mata
o.append('<g class="tears" opacity="0"><path d="M330 600 Q315 640 330 660 Q345 640 330 600 Z" fill="#7fd3ff"/><path d="M760 590 Q745 630 760 650 Q775 630 760 590 Z" fill="#7fd3ff"/></g>')
o.append('<g class="tears2" opacity="0"><path d="M330 600 Q300 690 330 720 Q360 690 330 600 Z" fill="#7fd3ff"/><path d="M760 590 Q730 680 760 710 Q790 680 760 590 Z" fill="#7fd3ff"/></g>')
# ---- B: sel bawang diperbesar
cells = []
for r in range(5):
    for c in range(4):
        x = 1360 + c * 260 + (r % 2) * 40; y = 560 + r * 200
        cells.append((x, y))
for x, y in cells:
    o.append(f'<rect x="{x}" y="{y}" width="230" height="170" rx="40" fill="#f6e3f1" stroke="#b46aa6" stroke-width="8"/>')
    o.append(f'<ellipse class="vac" cx="{x+80}" cy="{y+85}" rx="50" ry="44" fill="#d9b8ee" stroke="#9b6bc4" stroke-width="4"/>')
    o.append(f'<circle cx="{x+80}" cy="{y+85}" r="16" fill="#7b61ff"/><circle cx="{x+170}" cy="{y+60}" r="14" fill="#ff9f1c"/><circle cx="{x+175}" cy="{y+120}" r="14" fill="#ff9f1c"/>')
o.append('<g class="crack" opacity="0">' + ''.join(f'<path d="M{x+20} {y+10} l40 50 l-20 40 l40 60 M{x+200} {y+20} l-30 60 l30 40" stroke="#5e1f5c" stroke-width="9" fill="none"/>' for x, y in cells) + '</g>')
# ---- C: kulkas
o.append('<g><rect x="2750" y="560" width="620" height="980" rx="40" fill="#e6edf3" stroke="#9aa5b1" stroke-width="10"/><rect x="2750" y="900" width="620" height="12" fill="#9aa5b1"/>'
         '<rect x="3300" y="640" width="22" height="200" rx="10" fill="#9aa5b1"/><rect x="3300" y="980" width="22" height="260" rx="10" fill="#9aa5b1"/>'
         '<rect x="2800" y="960" width="520" height="520" rx="20" fill="#cfe8ff"/>'
         '<path d="M3060 1060 Q3040 1090 3000 1110 Q2920 1150 2940 1230 Q2960 1290 3060 1290 Q3160 1290 3180 1230 Q3200 1150 3120 1110 Q3080 1090 3060 1060 Z" fill="url(#on)"/>'
         + ''.join(f'<g stroke="#ffffff" stroke-width="6" stroke-linecap="round"><path d="M{x} {y-22} V{y+22} M{x-19} {y-11} L{x+19} {y+11} M{x-19} {y+11} L{x+19} {y-11}"/></g>' for x, y in [(2860,1010),(3260,1050),(2890,1400),(3240,1380),(3060,1000)]) + '</g>')
open('bawang.svg', 'w').write('\n'.join(o)); print('ok')

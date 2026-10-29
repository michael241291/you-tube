# Ilustrasi vektor datar: rumah panggung + anak lempar gigi (kiri) dan penampang gusi + gigi (kanan). Dunia ±2500 x 1920.
o = []
o.append('<defs>'
 '<linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a1b4a"/><stop offset="1" stop-color="#7a3d6e"/></linearGradient>'
 '<linearGradient id="mouth" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3a0f22"/><stop offset="1" stop-color="#1c0711"/></linearGradient>'
 '<linearGradient id="enamel" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f3f0e6"/><stop offset="1" stop-color="#d9d3c2"/></linearGradient>'
 '<linearGradient id="bone" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f0d9b5"/><stop offset="1" stop-color="#d9b98a"/></linearGradient>'
 '<linearGradient id="gum" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff8fb1"/><stop offset="1" stop-color="#e2557f"/></linearGradient>'
 '</defs>')
# ---------- BAGIAN A: rumah ----------
o.append('<rect x="-900" y="-700" width="2150" height="3400" fill="url(#sky)"/>')
for x, y, r in [(120, 520, 4), (300, 430, 3), (760, 470, 5), (930, 560, 3), (620, 380, 3), (60, 760, 3)]:
    o.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" opacity=".7"/>')
o.append('<circle cx="880" cy="420" r="60" fill="#ffe7a8" opacity=".9"/>')
o.append('<rect x="-900" y="1450" width="2150" height="1300" fill="#3b2a1c"/><rect x="-900" y="1450" width="2150" height="26" fill="#5a8a3a"/>')
# rumah panggung
o.append('<g>')
for x in (270, 420, 660, 810):
    o.append(f'<rect x="{x-12}" y="1340" width="24" height="115" fill="#6b4226"/>')
o.append('<rect x="230" y="1010" width="620" height="345" rx="6" fill="#c98b4f"/>')
for y in range(1040, 1350, 40):
    o.append(f'<line x1="230" y1="{y}" x2="850" y2="{y}" stroke="#a96f3a" stroke-width="4"/>')
o.append('<rect x="320" y="1110" width="120" height="110" rx="6" fill="#ffd27a"/><line x1="380" y1="1110" x2="380" y2="1220" stroke="#a96f3a" stroke-width="6"/>')
o.append('<rect x="600" y="1150" width="120" height="200" rx="6" fill="#7a4a24"/><circle cx="700" cy="1255" r="7" fill="#ffd23f"/>')
o.append('<path d="M180 1020 L540 700 L900 1020 Z" fill="#d9573b"/>')
for k in range(1, 7):
    y = 700 + k * 52; dx = (y - 700) * 360 / 320
    o.append(f'<line x1="{540-dx}" y1="{y}" x2="{540+dx}" y2="{y}" stroke="#b34128" stroke-width="5"/>')
o.append('<rect x="170" y="1012" width="740" height="18" rx="6" fill="#8f2f1d"/>')
o.append('</g>')
# bayangan kolong
o.append('<rect class="kolong" x="250" y="1360" width="580" height="90" fill="#000" opacity=".28"/>')
# anak
o.append('<g><circle cx="120" cy="1215" r="42" fill="#8a5a3c"/><path d="M80 1200 Q120 1150 160 1200 Z" fill="#2a1a12"/>'
         '<rect x="88" y="1255" width="64" height="120" rx="26" fill="#3aa0ff"/>'
         '<rect x="94" y="1370" width="22" height="80" rx="10" fill="#26303a"/><rect x="124" y="1370" width="22" height="80" rx="10" fill="#26303a"/>'
         '<path d="M146 1275 L200 1230" stroke="#8a5a3c" stroke-width="20" stroke-linecap="round"/>'
         '<path d="M110 1232 Q122 1244 134 1232" stroke="#2a1a12" stroke-width="4" fill="none"/></g>')
def tooth(cx, cy, s, cls=''):
    return (f'<g class="{cls}"><path d="M{cx-14*s} {cy-12*s} Q{cx-16*s} {cy-20*s} {cx-6*s} {cy-20*s} Q{cx} {cy-16*s} {cx+6*s} {cy-20*s} Q{cx+16*s} {cy-20*s} {cx+14*s} {cy-12*s} '
            f'L{cx+10*s} {cy+6*s} Q{cx+8*s} {cy+18*s} {cx+3*s} {cy+18*s} L{cx} {cy+6*s} L{cx-3*s} {cy+18*s} Q{cx-8*s} {cy+18*s} {cx-10*s} {cy+6*s} Z" '
            f'fill="#fff" stroke="#c9c2b0" stroke-width="{1.5*s}"/></g>')
# gigi terbang (lempar ke atap)
o.append(tooth(205, 1222, 2.0, 'fly1'))
# gigi atas -> kolong (Jepang)
o.append(tooth(540, 900, 1.6, 'fly2'))
# burung murai
o.append('<g class="bird"><ellipse cx="1180" cy="560" rx="58" ry="34" fill="#15161a"/><ellipse cx="1170" cy="572" rx="34" ry="16" fill="#f2f2f2"/>'
         '<circle cx="1130" cy="540" r="26" fill="#15161a"/><circle cx="1122" cy="534" r="5" fill="#fff"/><path d="M1106 544 L1084 552 L1106 556 Z" fill="#ffb02e"/>'
         '<path d="M1230 556 L1300 530 L1296 566 Z" fill="#1d3b6e"/><path d="M1165 548 Q1210 500 1240 540 Q1205 548 1165 560 Z" fill="#2b4f8f"/></g>')
# ---------- BAGIAN B: penampang gusi ----------
CX = 1840
o.append('<rect x="1250" y="-700" width="1500" height="3400" fill="url(#mouth)"/>')
# tulang rahang
o.append('<rect x="1300" y="1120" width="1100" height="900" rx="40" fill="url(#bone)"/>')
import random; random.seed(4)
for _ in range(70):
    x = random.uniform(1330, 2370); y = random.uniform(1180, 1950); r = random.uniform(6, 16)
    if abs(x - CX) < 190 and 1080 < y < 1700: continue
    o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r:.0f}" fill="#c99f6a" opacity=".55"/>')
# kantung + gigi dewasa (bersarang: adult2 > adult)
o.append(f'<g class="adult2"><g class="adult"><ellipse class="sac" cx="{CX}" cy="1520" rx="175" ry="150" fill="#b98352" opacity=".55"/>'
         f'<path d="M{CX-125} 1440 Q{CX-135} 1380 {CX-60} 1385 Q{CX} 1400 {CX+60} 1385 Q{CX+135} 1380 {CX+125} 1440 L{CX+105} 1600 Q{CX} 1640 {CX-105} 1600 Z" fill="url(#enamel)" stroke="#bdb59f" stroke-width="5"/>'
         f'<path d="M{CX-80} 1420 Q{CX-90} 1470 {CX-70} 1540" stroke="#ffffff" stroke-width="12" fill="none" opacity=".8" stroke-linecap="round"/></g></g>')
# gigi susu: akar (bisa hilang) + mahkota
o.append(f'<g class="babyall"><g class="root"><path d="M{CX-80} 1000 L{CX-60} 1290 Q{CX-45} 1320 {CX-30} 1290 L{CX-10} 1010 Z" fill="#efe6cf" stroke="#c9bd9c" stroke-width="5"/>'
         f'<path d="M{CX+80} 1000 L{CX+60} 1290 Q{CX+45} 1320 {CX+30} 1290 L{CX+10} 1010 Z" fill="#efe6cf" stroke="#c9bd9c" stroke-width="5"/></g>'
         f'<g class="rootshort"><path d="M{CX-80} 1000 L{CX-66} 1110 Q{CX-45} 1125 {CX-28} 1100 L{CX-10} 1010 Z" fill="#efe6cf" stroke="#c9bd9c" stroke-width="5"/>'
         f'<path d="M{CX+80} 1000 L{CX+66} 1110 Q{CX+45} 1125 {CX+28} 1100 L{CX+10} 1010 Z" fill="#efe6cf" stroke="#c9bd9c" stroke-width="5"/></g>'
         f'<path d="M{CX-100} 1010 Q{CX-110} 860 {CX-40} 850 Q{CX} 862 {CX+40} 850 Q{CX+110} 860 {CX+100} 1010 Z" fill="url(#enamel)" stroke="#c9c2b0" stroke-width="5"/>'
         f'<path d="M{CX-62} 885 Q{CX-72} 930 {CX-60} 980" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/></g>')
# gusi (selalu): pita merah muda di atas tulang
o.append(f'<path d="M1300 1150 L1300 1040 Q{CX-260} 1000 {CX-110} 990 L{CX+110} 990 Q{CX+260} 1000 2400 1040 L2400 1150 Z" fill="url(#gum)"/>')
o.append(f'<path d="M1300 1040 Q{CX-260} 1000 {CX-110} 990 M{CX+110} 990 Q{CX+260} 1000 2400 1040" stroke="#ffb3c9" stroke-width="8" fill="none"/>')
# kulit (gusi tertutup) - disembunyikan saat dibedah
o.append(f'<g class="skin"><rect x="1300" y="1140" width="1100" height="880" rx="30" fill="#d94c74"/>'
         f'<path d="M1300 1150 Q{CX} 1200 2400 1150" stroke="#ff8fb1" stroke-width="10" fill="none" opacity=".6"/></g>')
o.append('<rect class="cutline" x="1300" y="1140" width="1100" height="880" rx="30" fill="none" stroke="#ffd23f" stroke-width="7" stroke-dasharray="18 12" opacity="0"/>')
# sikat gigi (muncul di akhir)
o.append(f'<g class="brush" opacity="0"><rect x="{CX+120}" y="760" width="420" height="44" rx="22" fill="#3ddc84" transform="rotate(-20 {CX+120} 780)"/>'
         f'<g transform="rotate(-20 {CX+120} 780)"><rect x="{CX+40}" y="740" width="100" height="40" rx="8" fill="#ffffff"/>'
         + ''.join(f'<rect x="{CX+44+k*16}" y="712" width="10" height="30" rx="4" fill="#9fd8ff"/>' for k in range(6)) + '</g></g>')
open('gigi.svg', 'w').write('\n'.join(o)); print('ok')

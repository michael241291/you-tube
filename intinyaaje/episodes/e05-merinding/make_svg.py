# Merinding: lengan (A), penampang kulit (B), kucing (C). Ilustrasi vektor datar.
import random, math
random.seed(7)
o = ['<defs>'
 '<linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#062a2e"/><stop offset="1" stop-color="#0e4652"/></linearGradient>'
 '<linearGradient id="arm" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f0c19a"/><stop offset="1" stop-color="#d89a6e"/></linearGradient>'
 '<linearGradient id="derm" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f2b4a0"/><stop offset="1" stop-color="#e28f7a"/></linearGradient>'
 '</defs>']
o.append('<rect x="-900" y="-800" width="5600" height="3600" fill="url(#bg)"/>')
# ---- A: lengan
o.append('<path d="M-200 880 Q540 820 1300 900 L1300 1360 Q540 1420 -200 1350 Z" fill="url(#arm)"/>')
o.append('<path d="M-200 880 Q540 820 1300 900" stroke="#f7d7bb" stroke-width="10" fill="none" opacity=".6"/>')
flat, up, bumps = [], [], []
for k in range(46):
    x = random.uniform(30, 1050); y = random.uniform(900, 1320)
    flat.append(f'<path d="M{x:.0f} {y:.0f} q 22 -10 46 -12" stroke="#5a3a24" stroke-width="4" fill="none" stroke-linecap="round"/>')
    up.append(f'<path d="M{x:.0f} {y:.0f} q 6 -26 4 -50" stroke="#5a3a24" stroke-width="4" fill="none" stroke-linecap="round"/>')
    bumps.append(f'<circle cx="{x:.0f}" cy="{y+2:.0f}" r="11" fill="#c98560" opacity=".55"/><circle cx="{x-3:.0f}" cy="{y-2:.0f}" r="5" fill="#f9d9c0" opacity=".7"/>')
o.append('<g class="bumps" opacity="0">' + ''.join(bumps) + '</g>')
o.append('<g class="hairflat">' + ''.join(flat) + '</g>')
o.append('<g class="hairup" opacity="0">' + ''.join(up) + '</g>')
# ---- B: penampang kulit
X0, X1 = 1300, 2400
o.append(f'<rect x="{X0}" y="980" width="{X1-X0}" height="520" fill="url(#derm)"/>')
o.append(f'<rect x="{X0}" y="1500" width="{X1-X0}" height="260" fill="#f6dd96"/>')
for k in range(14):
    cx = random.uniform(X0+40, X1-40); cy = random.uniform(1530, 1730)
    o.append(f'<ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="48" ry="34" fill="#efcf7a" stroke="#e2bd62" stroke-width="3"/>')
o.append(f'<path d="M{X0} 900 L{X1} 900 L{X1} 990 L{X0} 990 Z" fill="#f6cfae"/><path d="M{X0} 900 L{X1} 900" stroke="#fde6d1" stroke-width="8"/>')
# pembuluh kecil
o.append(f'<path d="M{X0} 1420 C 1600 1380 1700 1460 2000 1430 S 2300 1400 {X1} 1440" stroke="#c0392b" stroke-width="10" fill="none" opacity=".6"/>')
# folikel (miring)
o.append('<path d="M1820 990 L1870 990 L1745 1360 Q1720 1400 1690 1370 Z" fill="#d97c66" stroke="#b85f4c" stroke-width="4"/>')
o.append('<ellipse cx="1712" cy="1372" rx="34" ry="28" fill="#b85f4c"/>')
# rambut miring (A) dan tegak (B)
o.append('<path class="hairA" d="M1712 1370 L1845 985 L2140 760" stroke="#3b2414" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
o.append('<path class="hairB" opacity="0" d="M1712 1370 L1845 960 L1905 600" stroke="#3b2414" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
# otot arrector pili (rileks / kontraksi)
o.append('<path class="muscle" d="M1760 1220 Q1900 1140 2010 995 L2040 1000 Q1930 1160 1772 1250 Z" fill="#e0475b" stroke="#a82c3d" stroke-width="3"/>')
o.append('<path class="muscleC" opacity="0" d="M1770 1180 Q1880 1100 1960 995 L2010 1000 Q1920 1140 1790 1230 Z" fill="#ff2d4a" stroke="#a82c3d" stroke-width="4"/>')
# benjolan kulit
o.append('<path class="bump" opacity="0" d="M1760 902 Q1850 800 1960 902 Z" fill="#f6cfae" stroke="#fde6d1" stroke-width="6"/>')
# saraf
o.append('<path class="nerve" opacity="0" d="M1320 1480 C 1500 1420 1650 1330 1780 1235" stroke="#ffd23f" stroke-width="9" fill="none" stroke-dasharray="20 10"/>')
# ---- C: kucing
CX, CY = 3250, 1250
def cat(cls, puff):
    s = []
    if puff:
        pts = []
        for k in range(60):
            a = math.pi * 2 * k / 60; r = (215 if k % 2 else 310)
            pts.append(f'{CX + r*1.25*math.cos(a):.0f},{CY + r*0.8*math.sin(a):.0f}')
        s.append(f'<polygon points="{" ".join(pts)}" fill="#2b2b33"/>')
        tail = [f'{CX+260+ (34 if k%2 else 0)*math.cos(k):.0f},{CY-120-k*26:.0f}' for k in range(10)]
        s.append(f'<path d="M{CX+260} {CY} Q{CX+420} {CY-150} {CX+330} {CY-360}" stroke="#2b2b33" stroke-width="110" fill="none" stroke-linecap="round" stroke-dasharray="30 6"/>')
        head = (CX - 300, CY - 170, 150)
    else:
        s.append(f'<ellipse cx="{CX}" cy="{CY}" rx="230" ry="130" fill="#2b2b33"/>')
        s.append(f'<path d="M{CX+220} {CY} Q{CX+380} {CY-60} {CX+330} {CY-260}" stroke="#2b2b33" stroke-width="34" fill="none" stroke-linecap="round"/>')
        head = (CX - 230, CY - 120, 110)
    hx, hy, hr = head
    s.append(f'<circle cx="{hx}" cy="{hy}" r="{hr}" fill="#2b2b33"/>')
    s.append(f'<path d="M{hx-hr*0.8} {hy-hr*0.5} L{hx-hr*0.6} {hy-hr*1.35} L{hx-hr*0.15} {hy-hr*0.85} Z M{hx+hr*0.8} {hy-hr*0.5} L{hx+hr*0.6} {hy-hr*1.35} L{hx+hr*0.15} {hy-hr*0.85} Z" fill="#2b2b33"/>')
    s.append(f'<ellipse cx="{hx-hr*0.38}" cy="{hy-hr*0.05}" rx="{hr*0.2}" ry="{hr*0.26}" fill="#ffd23f"/><ellipse cx="{hx+hr*0.38}" cy="{hy-hr*0.05}" rx="{hr*0.2}" ry="{hr*0.26}" fill="#ffd23f"/>')
    s.append(f'<ellipse cx="{hx-hr*0.38}" cy="{hy-hr*0.05}" rx="{hr*0.06}" ry="{hr*0.22}" fill="#111"/><ellipse cx="{hx+hr*0.38}" cy="{hy-hr*0.05}" rx="{hr*0.06}" ry="{hr*0.22}" fill="#111"/>')
    s.append(f'<path d="M{hx-hr*0.12} {hy+hr*0.3} L{hx+hr*0.12} {hy+hr*0.3} L{hx} {hy+hr*0.42} Z" fill="#ff8fa3"/>')
    for leg in (-150, -60, 60, 150):
        s.append(f'<rect x="{CX+leg-22}" y="{CY+60}" width="44" height="190" rx="20" fill="#2b2b33"/>')
    if puff:
        s.append(f'<path d="M{hx-hr*0.3} {hy+hr*0.6} Q{hx} {hy+hr*0.45} {hx+hr*0.3} {hy+hr*0.6}" stroke="#fff" stroke-width="8" fill="none"/>')
    return f'<g class="{cls}"' + (' opacity="0"' if puff else '') + '>' + ''.join(s) + '</g>'
o.append(f'<rect x="2700" y="1500" width="1200" height="400" fill="#0a3a40"/>')
o.append(cat('cat', False)); o.append(cat('catpuff', True))
open('merinding.svg', 'w').write('\n'.join(o)); print('ok')

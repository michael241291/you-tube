# Nguap menular: dua kepala (A), keluarga vs orang asing (B), anak kecil + anjing (C). Vektor datar.
o = ['<defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a1640"/><stop offset="1" stop-color="#4b2a6b"/></linearGradient></defs>']
o.append('<rect x="-1200" y="-800" width="6000" height="3600" fill="url(#bg)"/>')
def head(cx, cy, r, skin, hair, cls, yawn=True, shirt='#3aa0ff'):
    s = [f'<rect x="{cx-r*0.95}" y="{cy+r*0.8}" width="{r*1.9}" height="{r*1.4}" rx="{r*0.5}" fill="{shirt}"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{skin}"/>',
         f'<path d="M{cx-r} {cy-r*0.15} Q{cx-r*0.9} {cy-r*1.15} {cx} {cy-r*1.05} Q{cx+r*0.9} {cy-r*1.15} {cx+r} {cy-r*0.15} Q{cx+r*0.6} {cy-r*0.75} {cx} {cy-r*0.7} Q{cx-r*0.6} {cy-r*0.75} {cx-r} {cy-r*0.15} Z" fill="{hair}"/>']
    # mata terbuka (normal) & mata merem (nguap)
    s.append(f'<g class="{cls}eo"><circle cx="{cx-r*0.38}" cy="{cy-r*0.05}" r="{r*0.1}" fill="#1b1b1f"/><circle cx="{cx+r*0.38}" cy="{cy-r*0.05}" r="{r*0.1}" fill="#1b1b1f"/>'
             f'<path d="M{cx-r*0.2} {cy+r*0.42} Q{cx} {cy+r*0.55} {cx+r*0.2} {cy+r*0.42}" stroke="#7a3b2a" stroke-width="{r*0.06}" fill="none" stroke-linecap="round"/></g>')
    if yawn:
        s.append(f'<g class="{cls}ey" opacity="0"><path d="M{cx-r*0.52} {cy-r*0.05} Q{cx-r*0.38} {cy+r*0.06} {cx-r*0.24} {cy-r*0.05}" stroke="#1b1b1f" stroke-width="{r*0.07}" fill="none" stroke-linecap="round"/>'
                 f'<path d="M{cx+r*0.24} {cy-r*0.05} Q{cx+r*0.38} {cy+r*0.06} {cx+r*0.52} {cy-r*0.05}" stroke="#1b1b1f" stroke-width="{r*0.07}" fill="none" stroke-linecap="round"/>'
                 f'<ellipse cx="{cx}" cy="{cy+r*0.5}" rx="{r*0.26}" ry="{r*0.34}" fill="#5a1626"/><ellipse cx="{cx}" cy="{cy+r*0.66}" rx="{r*0.16}" ry="{r*0.12}" fill="#ff7a8a"/></g>')
    return ''.join(s)
# A: dua orang
o.append(head(300, 700, 150, '#e0a77a', '#2a1a12', 'p1', shirt='#ff9f1c'))
o.append(head(780, 700, 150, '#c98b5e', '#1b1b1f', 'p2', shirt='#3ddc84'))
# gelombang "nular"
o.append('<g class="wave" opacity="0">' + ''.join(f'<path d="M{430+k*40} {640+((-1)**k)*10} q20 -24 40 0" stroke="#ffd23f" stroke-width="8" fill="none" stroke-linecap="round" opacity="{0.4+0.15*k}"/>' for k in range(4)) + '</g>')
# otak di kepala 2
o.append('<g class="brain" opacity="0"><path d="M690 640 Q690 560 760 565 Q790 530 830 560 Q880 560 875 620 Q900 660 860 690 Q850 730 800 720 Q760 740 730 710 Q680 700 690 640 Z" fill="#ff9fc0" stroke="#d9668f" stroke-width="6"/>'
         '<path d="M735 600 q20 20 0 40 M790 580 q-15 30 10 50 M830 610 q-20 20 5 45" stroke="#d9668f" stroke-width="5" fill="none"/></g>')
o.append('<circle class="mirror" cx="805" cy="640" r="34" fill="#ffd23f" opacity="0"/>')
# B: keluarga vs orang asing
o.append('<g>' + head(1500, 760, 95, '#e0a77a', '#2a1a12', 'f1', False, '#ff5c8a') + head(1680, 790, 85, '#c98b5e', '#1b1b1f', 'f2', False, '#3aa0ff')
         + head(1590, 610, 70, '#f1c29a', '#5a3a24', 'f3', False, '#ffd23f') + '</g>')
o.append('<path d="M1590 470 q-30 -40 -60 -10 q-30 30 60 90 q90 -60 60 -90 q-30 -30 -60 10 Z" fill="#ff4d6d"/>')
o.append('<g opacity=".55">' + head(2100, 760, 95, '#b9b9c4', '#6b6b78', 's1', False, '#8b8b98') + '</g>')
o.append('<text x="2100" y="560" font-size="120" font-weight="800" fill="#ffffff" text-anchor="middle" opacity=".6">?</text>')
# C: anak kecil + anjing
o.append(head(2850, 800, 95, '#f1c29a', '#5a3a24', 'k1', False, '#b18cff'))
o.append('<g><ellipse cx="3300" cy="860" rx="150" ry="120" fill="#c8894f"/><ellipse cx="3190" cy="760" rx="50" ry="90" fill="#8a5a2f" transform="rotate(-20 3190 760)"/><ellipse cx="3410" cy="760" rx="50" ry="90" fill="#8a5a2f" transform="rotate(20 3410 760)"/>'
         '<ellipse cx="3300" cy="930" rx="70" ry="50" fill="#e6b583"/><ellipse cx="3300" cy="900" rx="22" ry="16" fill="#1b1b1f"/>'
         '<g class="dogo"><circle cx="3250" cy="820" r="14" fill="#1b1b1f"/><circle cx="3350" cy="820" r="14" fill="#1b1b1f"/></g>'
         '<g class="dogy" opacity="0"><path d="M3232 822 q18 12 36 0 M3332 822 q18 12 36 0" stroke="#1b1b1f" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="3300" cy="965" rx="40" ry="44" fill="#5a1626"/><ellipse cx="3300" cy="985" rx="24" ry="14" fill="#ff7a8a"/></g></g>')
open('nguap.svg', 'w').write('\n'.join(o)); print('ok')

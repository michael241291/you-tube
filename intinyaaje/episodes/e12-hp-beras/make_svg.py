# HP kecemplung: A ember cucian, B penampang HP + beras, C HP berdiri port bawah + kipas angin
o=['<defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0e3b4a"/><stop offset="1" stop-color="#14596b"/></linearGradient>'
 '<linearGradient id="scr" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2d6cdf"/><stop offset="1" stop-color="#7b61ff"/></linearGradient></defs>']
o.append('<rect x="-1200" y="-800" width="6400" height="3600" fill="url(#bg)"/>')
o.append('<rect x="-1200" y="1100" width="6400" height="1500" fill="#c9d6de"/>')
# A: ember + HP jatuh
o.append('<path d="M250 760 h560 l-50 340 h-460 z" fill="#ff6b6b"/><ellipse cx="530" cy="760" rx="280" ry="40" fill="#ff8f8f"/><ellipse cx="530" cy="775" rx="250" ry="30" fill="#4fb3ff"/>')
o.append('<path d="M290 760 Q530 560 770 760" stroke="#ffffff" stroke-width="12" fill="none"/>')
o.append('<g class="hpA"><rect x="470" y="430" width="120" height="230" rx="22" fill="#1b1b1f" transform="rotate(-20 530 545)"/><rect x="480" y="444" width="100" height="200" rx="14" fill="url(#scr)" transform="rotate(-20 530 545)"/></g>')
o.append('<g class="ciprat" opacity="0">'+''.join(f'<circle cx="{530+dx}" cy="{740+dy}" r="{r}" fill="#9fdcff"/>' for dx,dy,r in [(-120,-40,16),(-60,-90,12),(10,-120,14),(80,-80,12),(140,-30,16),(-170,-10,10),(190,-50,10)])+'</g>')
# B: penampang HP besar
X=1800
o.append(f'<rect x="{X-230}" y="330" width="460" height="900" rx="60" fill="#2b2f36"/><rect x="{X-210}" y="350" width="420" height="860" rx="46" fill="#3a3f48"/>')
o.append(f'<rect x="{X-160}" y="420" width="320" height="380" rx="20" fill="#1d6b4a"/>'+''.join(f'<rect x="{X-130+i*60}" y="460" width="40" height="40" rx="6" fill="#2fbf71"/>' for i in range(5)))
o.append(f'<rect x="{X-170}" y="840" width="340" height="250" rx="20" fill="#55606e"/>')
# port bawah + tombol samping
o.append(f'<rect class="port" x="{X-60}" y="1180" width="120" height="40" rx="14" fill="#111"/>')
o.append(f'<rect x="{X+218}" y="560" width="20" height="120" rx="8" fill="#111"/>')
o.append(f'<g class="airB" opacity="0">'+''.join(f'<ellipse cx="{X-40+i*30}" cy="{1170-(i%2)*14}" rx="14" ry="18" fill="#4fb3ff"/>' for i in range(4))+f'<ellipse cx="{X+228}" cy="{620}" rx="12" ry="18" fill="#4fb3ff"/><ellipse cx="{X+228}" cy="{660}" rx="10" ry="14" fill="#4fb3ff"/></g>')
# mangkok beras di kanan bawah
o.append(f'<g class="beras"><path d="M{X+260} 1080 h300 q-10 120 -150 120 q-140 0 -150 -120 z" fill="#e8e1d0"/>'+''.join(f'<ellipse cx="{X+290+i*24}" cy="{1072-(i%3)*6}" rx="10" ry="6" fill="#fffaf0"/>' for i in range(11))+'</g>')
o.append(f'<g class="debu" opacity="0">'+''.join(f'<circle cx="{X+240-i*28}" cy="{1180+(i%3)*8}" r="7" fill="#fffaf0"/>' for i in range(9))+'</g>')
o.append(f'<g class="silangB" opacity="0"><path d="M{X+250} 1000 L{X+580} 1240 M{X+580} 1000 L{X+250} 1240" stroke="#ff3b5c" stroke-width="30" stroke-linecap="round"/></g>')
# C: HP berdiri port bawah + kipas
C=3200
o.append(f'<g class="hpC"><rect x="{C-90}" y="560" width="180" height="360" rx="30" fill="#1b1b1f"/><rect x="{C-75}" y="576" width="150" height="320" rx="20" fill="#0d0f14"/><rect x="{C-30}" y="912" width="60" height="12" rx="6" fill="#444"/></g>')
o.append(f'<g class="tetes" opacity="0">'+''.join(f'<path d="M{C-14+i*14} {950+i*40} q14 -26 28 0 a14 14 0 1 1 -28 0" fill="#4fb3ff"/>' for i in range(3))+'</g>')
o.append(f'<g class="kipas"><circle cx="{C+420}" cy="760" r="170" fill="#e6edf3"/><circle cx="{C+420}" cy="760" r="150" fill="#cfd8e0"/>'+''.join(f'<ellipse cx="{C+420}" cy="680" rx="40" ry="80" fill="#8aa0b4" transform="rotate({a} {C+420} 760)"/>' for a in (0,120,240))+f'<circle cx="{C+420}" cy="760" r="26" fill="#55606e"/><rect x="{C+405}" y="930" width="30" height="170" fill="#8aa0b4"/><rect x="{C+330}" y="1090" width="180" height="24" rx="10" fill="#55606e"/></g>')
o.append(f'<g class="angin" opacity="0">'+''.join(f'<path d="M{C+230} {700+i*45} h-{120+i*20}" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity=".7"/>' for i in range(3))+'</g>')
o.append(f'<g class="jam" opacity="0"><circle cx="{C-330}" cy="560" r="110" fill="#ffd23f"/><circle cx="{C-330}" cy="560" r="90" fill="#fff6d8"/><path d="M{C-330} 560 V495 M{C-330} 560 H{C-280}" stroke="#333" stroke-width="12" stroke-linecap="round"/></g>')
open('hp2.svg','w').write('\n'.join(o)); print('ok')

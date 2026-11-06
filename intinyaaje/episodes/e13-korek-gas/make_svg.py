# Korek gas: A meja warung + korek nyala, B penampang korek (tombol, per, palu, kristal, kawat, katup, api)
o=['<defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1a1430"/><stop offset="1" stop-color="#2c2150"/></linearGradient>'
 '<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb347" stop-opacity=".7"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs>']
o.append('<rect x="-1200" y="-800" width="6400" height="3600" fill="url(#bg)"/>')
o.append('<rect x="-1200" y="1080" width="6400" height="1500" fill="#6b4a33"/>')
# A: warung
o.append('<rect x="60" y="300" width="940" height="60" fill="#ff5c5c"/>'+''.join(f'<path d="M{60+i*94} 360 q47 60 94 0" fill="{"#ff5c5c" if i%2 else "#ffffff"}"/>' for i in range(10)))
o.append('<rect x="80" y="980" width="900" height="110" rx="10" fill="#8a6748"/>')
o.append(''.join(f'<rect x="{140+i*90}" y="{600+(i%2)*20}" width="70" height="{360-(i%2)*20}" rx="10" fill="{c}"/>' for i,c in enumerate(["#4fb3ff","#ffd23f","#ff7a59","#2fbf71","#b07cff"])))
o.append('<g class="korekA"><rect x="650" y="700" width="110" height="280" rx="18" fill="#ff3b8d"/><rect x="650" y="660" width="110" height="60" rx="10" fill="#c9ced6"/><rect x="740" y="690" width="34" height="70" rx="8" fill="#8a929c"/></g>')
o.append('<g class="apiA" opacity="0"><ellipse cx="705" cy="560" rx="160" ry="160" fill="url(#glow)"/><path d="M705 650 q-50 -60 0 -150 q50 90 0 150 z" fill="#ffb347"/><path d="M705 650 q-22 -40 0 -80 q22 40 0 80 z" fill="#4da3ff"/></g>')
# B: penampang korek besar
X=1800
o.append(f'<rect x="{X-210}" y="560" width="420" height="700" rx="50" fill="#ff3b8d" opacity=".35"/><rect x="{X-210}" y="560" width="420" height="700" rx="50" fill="none" stroke="#ff3b8d" stroke-width="12"/>')
o.append(f'<g class="gas"><rect x="{X-180}" y="800" width="360" height="430" rx="34" fill="#7fd1ff" opacity=".35"/>'+''.join(f'<circle cx="{X-140+(i*53)%280}" cy="{860+(i*71)%330}" r="10" fill="#bfe8ff"/>' for i in range(16))+'</g>')
o.append(f'<rect x="{X-210}" y="460" width="420" height="110" rx="20" fill="#c9ced6"/>')
# tombol
o.append(f'<g class="tombol"><rect x="{X+110}" y="400" width="130" height="180" rx="18" fill="#8a929c"/><rect x="{X+110}" y="400" width="130" height="34" rx="12" fill="#a7afb8"/></g>')
# per (spring)
o.append(f'<g class="per"><path d="M{X+130} 600 '+' '.join(f'l{40 if i%2==0 else -40} 18' for i in range(9))+'" stroke="#e6edf3" stroke-width="8" fill="none"/></g>')
# palu
o.append(f'<g class="palu"><rect x="{X+40}" y="590" width="70" height="90" rx="12" fill="#55606e"/></g>')
# kristal
o.append(f'<g class="kristal"><rect x="{X-60}" y="610" width="90" height="140" rx="10" fill="#e8f4ff" stroke="#9fd0ff" stroke-width="6"/><path d="M{X-45} 640 l30 30 l30 -30 M{X-45} 700 l30 30 l30 -30" stroke="#9fd0ff" stroke-width="5" fill="none"/></g>')
o.append(f'<g class="kristalGlow" opacity="0"><rect x="{X-80}" y="590" width="130" height="180" rx="16" fill="none" stroke="#ffe14d" stroke-width="12"/></g>')
# kawat ke ujung
o.append(f'<path d="M{X-15} 610 V420 H{X-60} V330" stroke="#ffd23f" stroke-width="8" fill="none"/><path d="M{X-110} 330 V430" stroke="#c9ced6" stroke-width="10"/>')
o.append(f'<g class="spark" opacity="0"><path d="M{X-60} 330 l-14 -20 l-12 18 l-14 -22" stroke="#7fd1ff" stroke-width="8" fill="none"/><circle cx="{X-85}" cy="318" r="34" fill="#7fd1ff" opacity=".35"/></g>')
# katup + nozzle
o.append(f'<g class="katup"><rect x="{X-30}" y="770" width="60" height="40" rx="8" fill="#2fbf71"/><path d="M{X} 770 V470" stroke="#2fbf71" stroke-width="16"/></g>')
o.append(f'<g class="api" opacity="0"><ellipse cx="{X-60}" cy="200" rx="200" ry="200" fill="url(#glow)"/><path d="M{X-60} 330 q-70 -90 0 -230 q70 140 0 230 z" fill="#ffb347"/><path d="M{X-60} 330 q-30 -60 0 -120 q30 60 0 120 z" fill="#4da3ff"/></g>')
open('korek.svg','w').write('\n'.join(o)); print('ok')

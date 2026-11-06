# Mie instan: A dapur kos malam (panci keruh), B penampang mi berpori + lilin dicoret, C bungkus bumbu
import math,random
random.seed(3)
o=['<defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a1e3d"/><stop offset="1" stop-color="#3e2b4f"/></linearGradient>'
 '<radialGradient id="lamp" cx=".5" cy=".3" r=".6"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient></defs>']
o.append('<rect x="-1200" y="-800" width="6400" height="3600" fill="url(#bg)"/>')
o.append('<rect x="-1200" y="1080" width="6400" height="1500" fill="#5b3f2e"/>')
# --- A: dapur kos
o.append('<ellipse cx="520" cy="420" rx="520" ry="380" fill="url(#lamp)"/>')
o.append('<rect x="490" y="200" width="60" height="30" rx="8" fill="#e6c27a"/><path d="M470 230 h100 l-20 40 h-60 z" fill="#ffe9a8"/>')
o.append('<rect x="80" y="980" width="900" height="110" rx="14" fill="#8a6748"/>')
o.append('<rect x="250" y="930" width="420" height="60" rx="10" fill="#33363d"/><rect x="300" y="918" width="120" height="16" rx="6" fill="#55595f"/><rect x="500" y="918" width="120" height="16" rx="6" fill="#55595f"/>')
o.append('<g class="flameA"><path d="M330 920 q30 -50 30 -10 q15 -30 30 10 z" fill="#4da3ff"/></g>')
# panci
o.append('<path d="M240 700 h300 l-20 220 h-260 z" fill="#b8c2cc"/><rect x="225" y="690" width="330" height="26" rx="10" fill="#d7dee5"/>'
         '<rect x="540" y="720" width="120" height="18" rx="9" fill="#3a3a3a"/>')
o.append('<ellipse class="kuah" cx="390" cy="712" rx="150" ry="16" fill="#e8d9a0"/>')
o.append('<g class="minyakA">'+''.join(f'<ellipse cx="{300+i*45}" cy="{709+(i%2)*6}" rx="{14+(i%3)*5}" ry="5" fill="#ffd23f" opacity=".9"/>' for i in range(6))+'</g>')
o.append('<g class="uap" opacity=".6">'+''.join(f'<path d="M{320+i*60} 680 q-25 -60 0 -110 q25 -50 0 -110" stroke="#ffffff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".5"/>' for i in range(3))+'</g>')
# mangkok + bungkus kecil
o.append('<path d="M700 900 h220 q-10 90 -110 90 q-100 0 -110 -90 z" fill="#f2f4f8"/><rect x="690" y="890" width="240" height="18" rx="9" fill="#ff7a59"/>')
# --- B: penampang mi (x 1300-2300)
X=1800
o.append(f'<circle cx="{X}" cy="760" r="400" fill="#3a2a4a" stroke="#ffd23f" stroke-width="10"/>')
o.append(f'<g class="mie"><circle cx="{X}" cy="760" r="330" fill="#f2c96b"/>')
pores=[]
for i in range(70):
    a=random.random()*2*math.pi; r=math.sqrt(random.random())*300
    pores.append(f'<circle cx="{X+r*math.cos(a):.0f}" cy="{760+r*math.sin(a):.0f}" r="{random.randint(8,20)}" fill="#9a6a28"/>')
o.append('</g>')
o.append('<g class="pori" opacity="0">'+''.join(pores)+'</g>')
o.append(f'<g class="minyakB" opacity="0">'+''.join(f'<circle cx="{X+330*math.cos(a/9):.0f}" cy="{760+330*math.sin(a/9):.0f}" r="18" fill="#ffb000"/>' for a in range(0,57,4))+'</g>')
# lilin ring + X
o.append(f'<g class="lilin" opacity="0"><circle cx="{X}" cy="760" r="350" fill="none" stroke="#ffffff" stroke-width="30" stroke-dasharray="40 16" opacity=".85"/></g>')
o.append(f'<g class="silang" opacity="0"><path d="M{X-300} 460 L{X+300} 1060 M{X+300} 460 L{X-300} 1060" stroke="#ff3b5c" stroke-width="44" stroke-linecap="round"/></g>')
# tepung larut
o.append(f'<g class="tepung" opacity="0">'+''.join(f'<circle cx="{X-380+random.randint(0,760)}" cy="{400+random.randint(0,80)}" r="{random.randint(6,12)}" fill="#fff6d8" opacity=".8"/>' for i in range(40))+'</g>')
# --- C: bungkus bumbu (x 2800-3700)
C=3250
o.append(f'<g class="sachet"><rect x="{C-230}" y="440" width="460" height="560" rx="26" fill="#ff7a59"/><rect x="{C-230}" y="440" width="460" height="70" rx="20" fill="#e85c3a"/>'
         f'<circle cx="{C}" cy="740" r="130" fill="#ffd23f"/><text x="{C}" y="770" font-size="90" font-weight="900" fill="#7a2d10" text-anchor="middle">Na</text></g>')
o.append(f'<g class="gunting" opacity="0"><path d="M{C-300} 720 H{C+300}" stroke="#ffffff" stroke-width="10" stroke-dasharray="30 18"/></g>')
o.append(f'<g class="separuh" opacity="0"><rect x="{C-230}" y="720" width="460" height="280" rx="20" fill="#2a1e3d" opacity=".75"/></g>')
open('mie.svg','w').write('\n'.join(o)); print('ok')

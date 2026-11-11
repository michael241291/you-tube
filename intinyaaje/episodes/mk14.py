import sys;sys.path.insert(0,'.');from _svg14 import *
import os
def out(ep,name,o): os.makedirs(ep,exist_ok=True); cwd=os.getcwd(); os.chdir(ep); save(name,o); os.chdir(cwd)
# e21 tornado
o=head('#2b3140','#4a5468','#3d4a36')
o.append(cloud(540,260,1.6,'#3a3f4d')+cloud(300,300,1.2,'#444b5c')+cloud(800,290,1.3,'#3a3f4d'))
o.append(g('corong','<path d="M380 360 Q540 420 700 360 L600 700 Q560 900 560 1080 L520 1080 Q520 900 480 700Z" fill="#8a93a3" opacity=".85"/>'))
o.append(house(250,1100,'#ffd23f')+house(860,1100,'#4fb3ff')+tree(120,1100)+tree(980,1100))
o.append(g('atap','<path d="M720 640 l120 -40 l20 50 l-120 40z" fill="#ff5c8a"/><path d="M380 560 l90 30 l-20 50 l-90 -30z" fill="#ffd23f"/>',0))
X=1900
o.append(f'<rect x="{X-420}" y="250" width="840" height="900" rx="40" fill="#1e2433"/>'+T(X-200,330,54,'INDONESIA','#ffd23f')+T(X+200,330,54,'AMERIKA','#ff5c8a'))
o.append(g('kecil',f'<path d="M{X-260} 420 Q{X-200} 440 {X-140} 420 L{X-180} 900 L{X-220} 900Z" fill="#9aa3b2"/>'+T(X-200,980,46,'&lt;10 menit')))
o.append(g('besar',f'<path d="M{X+60} 420 Q{X+200} 470 {X+340} 420 L{X+240} 900 L{X+160} 900Z" fill="#9aa3b2"/>'+T(X+200,980,46,'± 1 jam'),0))
o.append(g('sama',T(X,1100,60,'SAMA-SAMA TORNADO','#3ddc84'),0))
C=3300
o.append(f'<rect x="{C-60}" y="500" width="40" height="600" fill="#777"/><rect x="{C-260}" y="420" width="440" height="200" fill="#ff7a59"/>'+T(C-40,540,48,'BALIHO')+tree(C+260,1100))
o.append(g('langit',f'<rect x="{C-450}" y="150" width="900" height="250" fill="#1a1d26"/>'+cloud(C,260,1.4,'#2a2e3a'),0))
o.append(g('lari',person(C-300,1080,1,'#3ddc84')+f'<path d="M{C-200} 1000 h-200" stroke="#3ddc84" stroke-width="16" marker-end=""/><path d="M{C-420} 1000 l40 -30 v60z" fill="#3ddc84"/>',0))
out('e21-tornado','tornado.svg',o)
# e22 counter steering - top view road
o=head('#0f2a1f','#174a34','#3b3b46')
o.append(moto(540,950,0))
o.append(g('setang','<rect x="430" y="700" width="220" height="24" rx="12" fill="#222"/>'))
o.append(g('putarKanan','<path d="M680 680 a80 80 0 0 1 0 100" stroke="#ffd23f" stroke-width="14" fill="none"/><path d="M670 790 l30 -10 l-20 -25z" fill="#ffd23f"/>',0))
X=1900  # top view
o.append(f'<rect x="{X-450}" y="100" width="900" height="1200" fill="#444"/>'+''.join(f'<rect x="{X-10}" y="{y}" width="20" height="80" fill="#fff"/>' for y in range(140,1300,160)))
o.append(g('rodaTop',f'<rect x="{X-30}" y="850" width="60" height="200" rx="20" fill="#222"/>'))
o.append(g('rodaKiri',f'<g transform="rotate(-18 {X} 760)"><rect x="{X-30}" y="660" width="60" height="200" rx="20" fill="#222"/></g>',0))
o.append(g('dorong',f'<path d="M{X+160} 760 h-120" stroke="#ff3b5c" stroke-width="18"/><path d="M{X+20} 760 l40 -30 v60z" fill="#ff3b5c"/>'+T(X+260,770,44,'DORONG','#ff3b5c'),0))
o.append(g('jalur',f'<path d="M{X} 1100 Q{X-60} 800 {X+40} 600 Q{X+220} 300 {X+400} 220" stroke="#3ddc84" stroke-width="16" fill="none" stroke-dasharray="40 20"/>',0))
C=3300
o.append(f'<rect x="{C-450}" y="1100" width="900" height="40" fill="#555"/>')
o.append(g('miring',moto(C,1040,18,'#ff3b5c')))
o.append(g('kmh',T(C,300,90,'&gt; 20 km/jam','#ffd23f'),0))
out('e22-counter-steering','counter.svg',o)
# e23 api minyak
o=head('#2a1408','#4a2410','#5a4632')
o.append('<rect x="100" y="900" width="880" height="60" fill="#9aa3ad"/><rect x="380" y="860" width="320" height="40" fill="#333"/>')
o.append(g('wajan','<path d="M300 760 Q540 900 780 760 Z" fill="#2b2b2b"/><rect x="780" y="770" width="200" height="22" rx="10" fill="#2b2b2b"/><path d="M330 770 Q540 860 750 770Z" fill="#e8b33a"/>'))
o.append(g('api','<path d="M420 760 q30 -200 120 -260 q-10 120 60 160 q30 -80 10 -140 q120 100 60 240z" fill="#ff7a1a"/><path d="M480 760 q20 -120 70 -160 q0 80 40 110 q20 -40 0 -80 q70 70 30 130z" fill="#ffd23f"/>'))
o.append(g('gayung','<rect x="760" y="420" width="160" height="110" rx="20" fill="#4fb3ff"/><rect x="900" y="450" width="120" height="30" fill="#4fb3ff"/>',0))
X=1900
o.append(f'<path d="M{X-350} 500 Q{X} 900 {X+350} 500 Z" fill="#2b2b2b"/><path d="M{X-320} 520 Q{X} 860 {X+320} 520Z" fill="#e8b33a"/>')
o.append(g('air',f'<ellipse cx="{X}" cy="760" rx="90" ry="40" fill="#4fb3ff"/>',0))
o.append(g('uap',''.join(f'<circle cx="{X+dx}" cy="{560-dy}" r="{r}" fill="#e8eef5" opacity=".8"/>' for dx,dy,r in [(-80,0,50),(40,40,60),(0,120,70),(-120,160,55),(110,180,65),(10,260,80)]),0))
o.append(g('bola',f'<circle cx="{X}" cy="300" r="260" fill="url(#hot)"/><circle cx="{X}" cy="320" r="160" fill="#ff7a1a" opacity=".8"/>',0))
C=3300
o.append(f'<path d="M{C-300} 760 Q{C} 900 {C+300} 760 Z" fill="#2b2b2b"/><path d="M{C-280} 770 Q{C} 860 {C+280} 770Z" fill="#e8b33a"/>')
o.append(g('apiC',f'<path d="M{C-80} 760 q30 -200 120 -260 q-10 120 60 160 q30 -80 10 -140 q120 100 60 240z" fill="#ff7a1a"/>'))
o.append(g('tutup',f'<path d="M{C-320} 740 Q{C} 560 {C+320} 740Z" fill="#9aa3ad"/><rect x="{C-30}" y="600" width="60" height="30" rx="10" fill="#555"/>',0))
o.append(g('kompor',f'<circle cx="{C+380}" cy="950" r="40" fill="#555"/><rect x="{C+370}" y="910" width="20" height="40" fill="#ffd23f"/>'))
out('e23-api-minyak','apiminyak.svg',o)
# e24 rel
o=head('#0b2230','#1a4a5e','#5a4a36')
o.append(train(60,1000,3,'#ff7a59',300))
o.append('<rect x="0" y="1000" width="1080" height="16" fill="#888"/>')
X=1900
o.append(f'<rect x="{X-450}" y="500" width="900" height="700" fill="#6b5236"/>'+''.join(f'<rect x="{X-400}" y="{y}" width="800" height="30" fill="#8a6a44"/>' for y in range(540,1200,90)))
o.append(g('sempit',f'<rect x="{X-180}" y="500" width="22" height="700" fill="#c9ced6"/><rect x="{X+158}" y="500" width="22" height="700" fill="#c9ced6"/>'+T(X,470,56,'1.067 mm','#3ddc84')))
o.append(g('lebar',f'<rect x="{X-260}" y="500" width="22" height="700" fill="#ffd23f"/><rect x="{X+238}" y="500" width="22" height="700" fill="#ffd23f"/>'+T(X,400,56,'1.435 mm','#ffd23f'),0))
o.append(g('th1867',T(X,1290,60,'SEMARANG 1867'),0))
C=3300
o.append(f'<path d="M{C-450} 1100 Q{C-200} 400 {C} 700 Q{C+200} 950 {C+450} 400 V1100Z" fill="#2f6b3d"/>')
o.append(g('kelok',f'<path d="M{C-420} 1050 Q{C-250} 700 {C-60} 820 Q{C+150} 980 {C+380} 560" stroke="#c9ced6" stroke-width="20" fill="none"/>'))
o.append(g('whoosh',f'<g transform="translate({C-380} 400)"><path d="M0 0 h620 q120 0 160 80 h-780z" fill="#e8eef5"/><rect x="0" y="80" width="780" height="60" fill="#d33"/></g>'+T(C,360,56,'WHOOSH · SUMATRA · SULAWESI','#ffd23f'),0))
out('e24-rel-sempit','rel.svg',o)
# e25 lift
o=head('#141826','#2a3150','#2a2a33')
o.append('<rect x="330" y="120" width="420" height="1100" fill="#20263a" stroke="#6b7280" stroke-width="10"/>')
o.append(g('kabel','<rect x="520" y="120" width="8" height="300" fill="#c9ced6"/><rect x="540" y="120" width="8" height="300" fill="#c9ced6"/><rect x="560" y="120" width="8" height="300" fill="#c9ced6"/>'))
o.append(g('kabin','<rect x="380" y="420" width="320" height="380" rx="16" fill="#9aa3ad"/>'+person(540,760,0.9,"#ff7a59")))
o.append(g('lompat',f'<path d="M640 600 v-80" stroke="#ffd23f" stroke-width="12"/><path d="M640 500 l-20 30 h40z" fill="#ffd23f"/>',0))
o.append(g('speed',T(540,1180,64,'±100 km/jam','#ff5c8a'),0))
X=1900
o.append(f'<rect x="{X-300}" y="150" width="40" height="1050" fill="#6b7280"/><rect x="{X+260}" y="150" width="40" height="1050" fill="#6b7280"/>')
o.append(f'<rect x="{X-240}" y="420" width="480" height="420" rx="16" fill="#9aa3ad"/>')
o.append(g('banyakKabel',''.join(f'<rect x="{X-60+i*24}" y="150" width="10" height="270" fill="#c9ced6"/>' for i in range(6))))
o.append(g('governor',f'<circle cx="{X-180}" cy="220" r="60" fill="#ffd23f"/><circle cx="{X-180}" cy="220" r="18" fill="#333"/>',0))
o.append(g('rem',f'<rect x="{X-262}" y="560" width="40" height="120" fill="#ff3b5c"/><rect x="{X+222}" y="560" width="40" height="120" fill="#ff3b5c"/>',0))
C=3300
o.append(f'<rect x="{C-160}" y="400" width="320" height="520" rx="20" fill="#2a3150"/>'+''.join(f'<circle cx="{C-60+(i%2)*120}" cy="{480+(i//2)*100}" r="36" fill="#9aa3ad"/>' for i in range(6)))
o.append(g('darurat',f'<circle cx="{C}" cy="820" r="54" fill="#ff3b30"/>'+T(C,840,40,'!'),0))
o.append(g('otis',T(C,1000,58,'OTIS · 1852','#ffd23f'),0))
out('e25-lift-jatuh','lift.svg',o)
# e26 minimarket
o=head('#0e1f33','#1d3d63','#3b3b46')
o.append('<rect x="0" y="1040" width="1080" height="80" fill="#555"/>')
o.append(g('tokoA','<rect x="180" y="640" width="320" height="400" fill="#ffd23f"/><rect x="180" y="640" width="320" height="80" fill="#ff7a59"/>'+T(340,700,46,'TOKO A')+'<rect x="230" y="760" width="220" height="200" fill="#bfe3ff"/>'))
o.append(g('tokoB','<rect x="580" y="640" width="320" height="400" fill="#bfe3ff"/><rect x="580" y="640" width="320" height="80" fill="#4f8cff"/>'+T(740,700,46,'TOKO B')+'<rect x="630" y="760" width="220" height="200" fill="#e8f4ff"/>'))
X=2000
o.append(f'<rect x="{X-600}" y="700" width="1200" height="30" fill="#c9ced6"/>'+''.join(f'<circle cx="{x}" cy="680" r="18" fill="#9fdcff"/>' for x in range(X-570,X+600,60)))
o.append(g('a1',f'<rect x="{X-600}" y="560" width="90" height="90" fill="#ffd23f"/>'))
o.append(g('b1',f'<rect x="{X+300}" y="560" width="90" height="90" fill="#4f8cff"/>'))
o.append(g('tengah',T(X,500,56,'TEORI HOTELLING','#3ddc84'),0))
C=3400
o.append(g('pilih',person(C,1000,1.1,"#3ddc84")+T(C-200,560,48,'LEBIH MURAH?','#ffd23f')+T(C+200,640,48,'LEBIH ADEM?','#4fb3ff')))
out('e26-minimarket','minimarket.svg',o)
# e27 lidah
o=head('#2a0f1a','#5a1d36','#3a2030')
o.append('<ellipse cx="540" cy="700" rx="380" ry="420" fill="#f2c49b"/><ellipse cx="540" cy="900" rx="230" ry="150" fill="#7a1f35"/>')
o.append(g('lidah','<ellipse cx="540" cy="930" rx="170" ry="110" fill="#ff8fa3"/>'))
o.append(g('putih','<ellipse cx="540" cy="920" rx="130" ry="80" fill="#f5f5f0" opacity=".9"/>',0))
o.append('<rect x="760" y="420" width="140" height="200" rx="20" fill="#bfe3ff" opacity=".6"/>')
X=1900
o.append(f'<rect x="{X-450}" y="700" width="900" height="400" fill="#ff8fa3"/>')
o.append(g('papila',''.join(f'<rect x="{x}" y="560" width="40" height="150" rx="20" fill="#ff9fb1"/>' for x in range(X-430,X+430,80))))
o.append(g('kotor',''.join(f'<circle cx="{x+40}" cy="{600+ (i%3)*30}" r="16" fill="#f5f5f0"/>' for i,x in enumerate(range(X-470,X+400,80))),0))
o.append(g('bakteri',''.join(f'<ellipse cx="{x+20}" cy="{660+(i%2)*20}" rx="14" ry="8" fill="#3ddc84"/>' for i,x in enumerate(range(X-450,X+420,60))),0))
C=3300
o.append(g('air',f'<rect x="{C-300}" y="500" width="160" height="300" rx="20" fill="#4fb3ff" opacity=".8"/>'))
o.append(g('sikat',f'<rect x="{C-60}" y="420" width="40" height="400" rx="16" fill="#ff7a59"/><rect x="{C-80}" y="380" width="80" height="80" rx="10" fill="#fff"/>',0))
o.append(g('dokter',f'<g transform="translate({C+220} 0)">'+person(0,980,1,"#fff")+'<circle cx="0" cy="880" r="30" fill="none" stroke="#4fb3ff" stroke-width="8"/></g>',0))
out('e27-lidah-putih','lidah.svg',o)
# e28 pesawat pelan
o=head('#0c2a52','#5aa0e0','#e8eef5')
o.append(cloud(250,1050,1.5,'#fff')+cloud(800,1080,1.3,'#fff'))
o.append('<rect x="140" y="260" width="800" height="700" rx="200" fill="#e8eef5" stroke="#9aa3ad" stroke-width="30"/><rect x="220" y="340" width="640" height="540" rx="160" fill="#7fb6ea"/>')
o.append(g('awanJauh',cloud(540,700,0.8,'#fff')))
o.append(g('kmh',T(540,200,80,'900 km/jam','#ffd23f'),0))
X=1900
o.append(f'<rect x="{X-450}" y="900" width="900" height="80" fill="#555"/>')
o.append(g('pohon',''.join(tree(x,900) for x in range(X-420,X+460,180))))
o.append(g('motorB',moto(X,880,0,'#ff7a59')))
o.append(g('blur',''.join(f'<path d="M{X-450} {y} h200" stroke="#fff" stroke-width="8" opacity=".6"/>' for y in (700,760,820)),0))
C=3300
o.append(f'<rect x="{C-450}" y="300" width="900" height="900" fill="#c9b48a"/>'+''.join(f'<rect x="{C-420+ (i%5)*170}" y="{340+(i//5)*170}" width="120" height="120" fill="#8a7a5a"/>' for i in range(25)))
o.append(g('bayang',f'<g transform="translate({C} 750) scale(.35)"><path d="M-420 0 L440 0 L20 260 L-60 260Z M-120 0 L-440 -230 L-330 -230 Z" fill="#000" opacity=".5"/></g>'))
out('e28-pesawat-pelan','pesawat.svg',o)
# e29 huruf a
o=head('#1d1730','#3a2d63','#2a2440')
o.append('<rect x="160" y="300" width="760" height="760" rx="20" fill="#fffdf0"/>'+''.join(f'<rect x="200" y="{y}" width="680" height="4" fill="#bcd"/>' for y in range(400,1060,80)))
o.append(g('aTangan','<text x="540" y="820" font-size="420" fill="#2b2b2b" text-anchor="middle" font-family="Comic Sans MS, cursive" font-style="italic">ɑ</text>'))
X=1900
o.append(f'<rect x="{X-260}" y="260" width="520" height="900" rx="60" fill="#111"/><rect x="{X-230}" y="320" width="460" height="780" rx="30" fill="#f5f7fb"/>')
o.append(g('aCetak',f'<text x="{X}" y="860" font-size="440" fill="#2b2b2b" text-anchor="middle" font-family="Georgia, serif">a</text>'))
o.append(g('tingkat',f'<rect x="{X-150}" y="520" width="300" height="10" fill="#ff5c8a"/>',0))
C=3300
o.append(g('kapital',T(C-280,800,360,'A','#ffd23f','middle','700')))
o.append(g('panah',f'<path d="M{C-120} 640 h160" stroke="#fff" stroke-width="14"/><path d="M{C+60} 640 l-40 -30 v60z" fill="#fff"/>',0))
o.append(g('duaA',f'<text x="{C+220}" y="760" font-size="280" fill="#3ddc84" text-anchor="middle" font-family="Georgia, serif">a</text><text x="{C+220}" y="1100" font-size="280" fill="#4fb3ff" text-anchor="middle" font-family="cursive" font-style="italic">ɑ</text>',0))
o.append(g('gg',T(C,300,90,'g · ɡ','#ff9f1c'),0))
out('e29-huruf-a','huruf.svg',o)
# e30 kereta rem
o=head('#1a1a2e','#2e2e52','#4a4030')
o.append('<rect x="0" y="1000" width="1080" height="16" fill="#888"/><rect x="0" y="1040" width="1080" height="16" fill="#888"/>')
o.append(g('palang','<rect x="80" y="700" width="20" height="320" fill="#ddd"/><rect x="90" y="700" width="420" height="24" fill="#ff3b30"/><circle cx="90" cy="680" r="30" fill="#ff3b30"/>'))
o.append(g('orang',person(700,1000,0.9,"#ffd23f")))
o.append(g('sirine','<circle cx="90" cy="680" r="70" fill="url(#hot)"/>',0))
X=2300
o.append(f'<rect x="{X-1100}" y="1000" width="2200" height="16" fill="#888"/>'+train(X-1050,1000,6,'#4f8cff',300))
o.append(g('jarak',f'<path d="M{X-1050} 1100 H{X+1050}" stroke="#ffd23f" stroke-width="12"/>'+T(X,1220,130,'±505 METER di 100 km/jam','#ffd23f'),0))
o.append(g('ton',T(X,640,130,'8–12 GERBONG · ±600 TON','#fff'),0))
C=4000
o.append(f'<rect x="{C-300}" y="500" width="600" height="400" rx="20" fill="#3ddc84"/>'+''.join(f'<rect x="{C-300+i*120}" y="880" width="20" height="40" fill="#fff"/>' for i in range(6)))
o.append(g('lapangan',T(C,450,60,'= 5 LAPANGAN BOLA','#3ddc84'),0))
out('e30-kereta-rem','rem.svg',o)
# e31 tol bambu
o=head('#0a2a3a','#2a6a7a','#3d5a6a')
o.append('<rect x="-200" y="900" width="1500" height="400" fill="#2a6a8a"/><rect x="-200" y="760" width="1500" height="60" fill="#666"/><rect x="-200" y="820" width="1500" height="80" fill="#8a7a5a"/>')
o.append(g('mobil','<rect x="300" y="700" width="160" height="60" rx="20" fill="#ff5c8a"/><rect x="620" y="700" width="160" height="60" rx="20" fill="#ffd23f"/>'))
X=1900
o.append(f'<rect x="{X-450}" y="300" width="900" height="300" fill="#8a7a5a"/><rect x="{X-450}" y="600" width="900" height="650" fill="#4a3a28"/>')
o.append(g('matras',''.join(f'<rect x="{X-430}" y="{590+i*22}" width="860" height="14" rx="7" fill="#c9a24a"/>' for i in range(4)),0))
o.append(g('cerucuk',''.join(f'<rect x="{x}" y="680" width="16" height="520" fill="#d9b25a"/>' for x in range(X-420,X+420,70)),0))
o.append(g('turun',''.join(f'<path d="M{x} 1150 v-480" stroke="#4fb3ff" stroke-width="8" stroke-dasharray="20 14"/>' for x in range(X-380,X+400,190)),0))
o.append(g('ambles',f'<path d="M{X-450} 300 Q{X} 420 {X+450} 300" stroke="#ff3b5c" stroke-width="12" fill="none"/>',0))
C=3300
o.append(g('juta',T(C,600,110,'±6 JUTA','#ffd23f')+T(C,720,60,'BATANG BAMBU')))
o.append(g('hemat',T(C,950,80,'30–40% LEBIH MURAH','#3ddc84'),0))
out('e31-tol-bambu','tolbambu.svg',o)
# e32 parasut
o=head('#0c2a52','#3f7fc8','#cfe2f5')
o.append(plane(540,700,1.0))
o.append(g('pelampung','<rect x="380" y="900" width="140" height="180" rx="40" fill="#ffd23f"/><ellipse cx="660" cy="980" rx="70" ry="50" fill="#fff"/><path d="M660 1030 v60" stroke="#fff" stroke-width="8"/>'))
o.append(g('parasutQ','<path d="M300 380 Q540 180 780 380Z" fill="#ff5c8a"/>'+T(540,330,90,'?','#fff'),0))
X=1900
o.append(g('tinggi',f'<path d="M{X-300} 200 V1200" stroke="#fff" stroke-width="10"/>'+T(X-250,240,60,'±11 km','#ffd23f','start')))
o.append(g('oksigen',T(X+100,420,60,'UDARA TIPIS','#4fb3ff')+'<rect x="'+str(X)+'" y="460" width="200" height="140" rx="60" fill="#e8eef5"/>',0))
o.append(g('angin',''.join(f'<path d="M{X-200} {y} h500" stroke="#fff" stroke-width="10" stroke-dasharray="60 30"/>' for y in (700,760,820))+T(X+50,900,64,'900 km/jam'),0))
C=3300
o.append(plane(C,500,0.7)+'<rect x="'+str(C-450)+'" y="1000" width="900" height="40" fill="#555"/>')
o.append(g('landas',f'<path d="M{C-400} 900 L{C+400} 600" stroke="#ff3b5c" stroke-width="12" stroke-dasharray="30 20"/>'+T(C,330,56,'LEPAS LANDAS &amp; MENDARAT','#ff3b5c'),0))
out('e32-parasut','parasut.svg',o)
# e33 ac sirkulasi
o=head('#1a2433','#2e4466','#3b3b46')
o.append('<path d="M60 980 L120 760 Q160 640 300 620 L760 620 Q880 630 940 760 L1000 980 Z" fill="#4f8cff"/><rect x="40" y="940" width="980" height="80" rx="30" fill="#3a6fd8"/><path d="M190 760 Q230 670 320 660 L520 660 L520 780 Z" fill="#bfe3ff"/><path d="M560 660 L740 660 Q830 670 870 780 L560 780 Z" fill="#bfe3ff"/><circle cx="250" cy="1020" r="80" fill="#222"/><circle cx="820" cy="1020" r="80" fill="#222"/>')
o.append(g('putar','<circle cx="540" cy="480" r="90" fill="#222"/><path d="M500 470 a40 40 0 1 1 30 40" stroke="#3ddc84" stroke-width="12" fill="none"/>'))
o.append(g('zzz',T(380,560,70,'Zzz','#ffd23f'),0))
X=1900
o.append(f'<rect x="{X-400}" y="300" width="800" height="700" rx="60" fill="#2e4466"/>')
o.append(g('co2',''.join(f'<g><circle cx="{X-300+(i*137)%600}" cy="{540+(i*91)%420}" r="34" fill="#9aa3ad"/><text x="{X-300+(i*137)%600}" y="{550+(i*91)%420}" font-size="24" font-weight="900" fill="#222" text-anchor="middle">CO₂</text></g>' for i in range(14)),0))
o.append(g('ppm1',T(X,390,56,'udara luar ±400 ppm','#3ddc84')))
o.append(g('ppm2',T(X,470,56,'4 orang, 20 menit: 2.000 ppm','#ff5c8a'),0))
C=3300
o.append(f'<rect x="{C-300}" y="500" width="600" height="300" rx="40" fill="#222"/>')
o.append(g('dalam',f'<circle cx="{C-140}" cy="650" r="80" fill="#3ddc84"/>'+T(C-140,670,40,'DALAM','#000')))
o.append(g('luar',f'<circle cx="{C+140}" cy="650" r="80" fill="#4fb3ff"/>'+T(C+140,670,40,'LUAR','#000'),0))
out('e33-ac-sirkulasi','ac.svg',o)
# e34 semen papua
o=head('#0e2a1e','#2a6a4a','#3d4a36')
o.append(g('sakJawa','<rect x="140" y="600" width="300" height="380" rx="30" fill="#c9ced6"/>'+T(290,800,48,'SEMEN','#333')+T(290,560,60,'Jawa ±70 rb','#3ddc84')))
o.append(g('sakPapua','<rect x="640" y="600" width="300" height="380" rx="30" fill="#c9ced6"/>'+T(790,800,48,'SEMEN','#333')+T(790,560,60,'Ilaga Rp2 jt','#ff5c8a'),0))
X=1900
o.append(f'<path d="M{X-450} 1150 L{X-200} 500 L{X} 800 L{X+200} 400 L{X+450} 1150Z" fill="#2f6b3d"/>')
o.append(g('pesawatKecil',f'<g transform="translate({X-200} 300) scale(.35)">'+plane(0,0,1,'#fff')+'</g>'))
o.append(g('tanpaJalan',f'<path d="M{X-450} 1100 h300" stroke="#c9ced6" stroke-width="20"/>'+X_(X-150,1100,40) if False else '',0))
o.append(g('ongkos',T(X,1250,60,'ongkos terbang &gt; harga semen','#ffd23f'),0))
C=3300
o.append(g('mi',f'<path d="M{C-200} 700 Q{C} 900 {C+200} 700Z" fill="#ff7a59"/>'+T(C,640,60,'mi Rp30 rb','#ffd23f')))
o.append(g('trans',f'<path d="M{C-450} 1000 Q{C} 900 {C+450} 1050" stroke="#c9ced6" stroke-width="30" fill="none"/>'+T(C,1150,54,'TRANS PAPUA · BBM SATU HARGA','#3ddc84'),0))
out('e34-semen-papua','semen.svg',o)

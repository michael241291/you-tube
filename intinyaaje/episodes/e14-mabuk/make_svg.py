import sys; sys.path.insert(0,'..'); from _kit import *
o=head('#1b2a4a','#26406b','#3b3b46')
# A: mobil dari samping, penumpang belakang main HP
o.append('<rect x="-200" y="1060" width="1400" height="40" fill="#555"/>'+''.join('<rect x="%d" y="1076" width="80" height="10" fill="#ddd"/>'%x for x in range(-150,1200,180)))
o.append('<path d="M60 980 L120 760 Q160 640 300 620 L760 620 Q880 630 940 760 L1000 980 Z" fill="#ff7a59"/><rect x="40" y="940" width="980" height="80" rx="30" fill="#e85c3a"/>')
o.append('<path d="M190 760 Q230 670 320 660 L520 660 L520 780 Z" fill="#bfe3ff"/><path d="M560 660 L740 660 Q830 670 870 780 L560 780 Z" fill="#bfe3ff"/>')
o.append('<circle cx="250" cy="1020" r="80" fill="#222"/><circle cx="250" cy="1020" r="34" fill="#888"/><circle cx="820" cy="1020" r="80" fill="#222"/><circle cx="820" cy="1020" r="34" fill="#888"/>')
o.append(person(420,880,0.9,"#2fbf71")+'<rect x="440" y="720" width="34" height="58" rx="6" fill="#111"/><rect x="444" y="726" width="26" height="44" rx="4" fill="#7b61ff"/>')
o.append(person(700,880,0.9,"#4fb3ff"))
o.append(g('pusing','<path d="M380 640 q30 -30 60 0 q30 30 60 0" stroke="#3ddc84" stroke-width="10" fill="none"/><path d="M390 600 q30 -30 60 0 q30 30 60 0" stroke="#3ddc84" stroke-width="10" fill="none"/>',0))
# B: kepala dibelah: telinga dalam + mata + otak + perut
X0=1800
o.append('<ellipse cx="%d" cy="620" rx="330" ry="360" fill="#f2c49b"/>'%X0)
o.append(g('otak','<path d="M%d 420 q-200 -10 -220 150 q-10 120 120 150 q100 30 200 -10 q140 -50 120 -170 q-20 -140 -220 -120z" fill="#ff9ec7" stroke="#e46aa0" stroke-width="10"/>'%(X0+40)))
o.append(g('mata','<ellipse cx="%d" cy="660" rx="54" ry="40" fill="#fff"/><circle cx="%d" cy="660" r="22" fill="#2b2b2b"/>'%(X0+220,X0+232)))
o.append('<rect x="%d" y="600" width="90" height="150" rx="14" fill="#111"/><rect x="%d" y="610" width="74" height="130" rx="10" fill="#7b61ff"/>'%(X0+420,X0+428))
o.append(g('telinga','<circle cx="%d" cy="700" r="60" fill="none" stroke="#4fb3ff" stroke-width="16"/><circle cx="%d" cy="660" r="40" fill="none" stroke="#4fb3ff" stroke-width="14"/>'%(X0-140,X0-90)))
o.append(g('cairan','<circle cx="%d" cy="742" r="16" fill="#9fdcff"/><circle cx="%d" cy="690" r="12" fill="#9fdcff"/>'%(X0-150,X0-80)))
o.append(g('sinyal1','<path d="M%d 640 Q%d 560 %d 540" stroke="#3ddc84" stroke-width="14" fill="none" stroke-dasharray="26 14"/>'%(X0-120,X0-80,X0-20),0))
o.append(g('sinyal2','<path d="M%d 640 Q%d 560 %d 540" stroke="#ff5c8a" stroke-width="14" fill="none" stroke-dasharray="26 14"/>'%(X0+200,X0+160,X0+90),0))
o.append(g('bingung','<text x="%d" y="470" font-size="140" font-weight="900" fill="#ffd23f" text-anchor="middle">?!</text>'%(X0+30),0))
o.append(g('perut','<ellipse cx="%d" cy="1150" rx="160" ry="110" fill="#ffb3a0"/><path d="M%d 1150 q40 -40 80 0 q40 40 80 0" stroke="#3ddc84" stroke-width="14" fill="none"/>'%(X0,X0-80)))
o.append(g('mual','<ellipse cx="%d" cy="1150" rx="170" ry="120" fill="#3ddc84" opacity=".55"/>'%X0,0))
# C: sopir lihat jalan, duduk depan
C=3250
o.append('<rect x="%d" y="760" width="900" height="420" rx="30" fill="#2e3b55"/><path d="M%d 760 L%d 520 L%d 520 L%d 760 Z" fill="#bfe3ff"/>'%(C-450,C-380,C-260,C+260,C+380))
o.append('<rect x="%d" y="600" width="900" height="10" fill="#3ddc84"/>'%(C-450))
o.append(g('horizon','<rect x="%d" y="590" width="760" height="30" rx="15" fill="#ffd23f"/>'%(C-380),0))
o.append(person(C-170,960,0.9,"#ff7a59")+'<circle cx="%d" cy="830" r="70" fill="none" stroke="#333" stroke-width="18"/>'%(C-170))
o.append(person(C+170,960,0.9,"#2fbf71"))
o.append(g('depan','<rect x="%d" y="760" width="200" height="220" rx="20" fill="none" stroke="#3ddc84" stroke-width="12"/>'%(C+70),0))
save('mabuk.svg',o)

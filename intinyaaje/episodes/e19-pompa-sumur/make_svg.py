import sys; sys.path.insert(0,'..'); from _kit import *
o=head('#0f0820','#33215f','#5a4632')
# Satu panggung besar: tanah + sumur dalam
o.append('<rect x="-1200" y="560" width="6400" height="2200" fill="#6b5236"/>')
# A: sumur kiri dengan pompa atas
o.append('<rect x="380" y="560" width="300" height="1500" fill="#2a1d12"/>')
o.append(g('air','<rect x="380" y="1700" width="300" height="360" fill="#4fb3ff"/>'))
o.append('<rect x="440" y="400" width="200" height="160" rx="20" fill="#ff7a59"/><rect x="500" y="440" width="80" height="20" fill="#fff"/>')
o.append(g('pipa','<rect x="520" y="560" width="40" height="1300" fill="#c9ced6"/>'))
o.append(g('airNaik','<rect x="526" y="1150" width="28" height="700" fill="#4fb3ff"/>',0))
o.append(g('batas','<path d="M280 1150 H780" stroke="#ffd23f" stroke-width="10" stroke-dasharray="30 14"/><text x="790" y="1165" font-size="56" font-weight="900" fill="#ffd23f">±10 m</text>',0))
o.append(g('batas7','<path d="M280 1050 H780" stroke="#ff5c8a" stroke-width="10" stroke-dasharray="30 14"/><text x="790" y="1065" font-size="56" font-weight="900" fill="#ff5c8a">6-7 m</text>',0))
o.append(g('udara',''.join('<path d="M%d 300 v120 l-20 -24 m20 24 l20 -24" stroke="#bfe8ff" stroke-width="10" fill="none"/>'%x for x in (300,760)),0))
o.append(g('bunyi','<text x="540" y="340" font-size="70" font-weight="900" fill="#fff" text-anchor="middle">NGIIING</text>',0))
# C: sumur kanan dengan pompa celup di bawah
C=2000
o.append('<rect x="%d" y="560" width="300" height="1500" fill="#2a1d12"/><rect x="%d" y="1700" width="300" height="360" fill="#4fb3ff"/>'%(C-150,C-150))
o.append('<rect x="%d" y="560" width="40" height="1200" fill="#c9ced6"/>'%(C-20))
o.append(g('celup','<rect x="%d" y="1760" width="120" height="200" rx="24" fill="#3ddc84"/>'%(C-60)))
o.append(g('dorong','<rect x="%d" y="560" width="28" height="1200" fill="#4fb3ff"/>'%(C-14),0))
o.append(g('keran','<path d="M%d 460 h120 v60" stroke="#c9ced6" stroke-width="30" fill="none"/><path d="M%d 540 v80" stroke="#4fb3ff" stroke-width="20" stroke-dasharray="20 10"/>'%(C-20,C+100),0))
save('pompa.svg',o)

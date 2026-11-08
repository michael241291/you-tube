import sys; sys.path.insert(0,'..'); from _kit import *
o=head('#1a0d05','#5a2a0e','#4a2e1a')
# A: baju & jahitan
o.append('<path d="M220 360 L420 300 Q540 380 660 300 L860 360 L960 560 L820 620 L800 1080 H280 L260 620 L120 560 Z" fill="#2ec4ff"/>')
o.append(g('jahitan','<path d="M300 700 H780" stroke="#fff" stroke-width="10" stroke-dasharray="34 18"/>'))
o.append(g('simpul',''.join('<circle cx="%d" cy="700" r="16" fill="#ff3b5c"/>'%x for x in range(320,780,104)),0))
# B: penampang mesin jahit: jarum, kain, kait, spul
X=1900
o.append('<rect x="%d" y="740" width="900" height="50" fill="#ffd9a8"/>'%(X-450))
o.append(g('benangAtas','<path d="M%d 120 V740" stroke="#ff3b5c" stroke-width="10"/>'%X))
o.append(g('jarum','<rect x="%d" y="200" width="24" height="560" rx="10" fill="#c9ced6"/>'%(X-12)))
o.append(g('kait','<circle cx="%d" cy="1000" r="170" fill="none" stroke="#9aa3ad" stroke-width="30" stroke-dasharray="820 250"/>'%X))
o.append(g('spul','<circle cx="%d" cy="1000" r="80" fill="#ffd23f"/><circle cx="%d" cy="1000" r="24" fill="#5a2a0e"/>'%(X,X)))
o.append(g('benangBawah','<path d="M%d 1000 Q%d 900 %d 770 H%d" stroke="#2ec4ff" stroke-width="10" fill="none"/>'%(X+80,X+200,X+60,X+450)))
o.append(g('loop','<ellipse cx="%d" cy="860" rx="50" ry="80" fill="none" stroke="#ff3b5c" stroke-width="10"/>'%(X+50),0))
o.append(g('loopBesar','<circle cx="%d" cy="1000" r="210" fill="none" stroke="#ff3b5c" stroke-width="12"/>'%X,0))
# C: kunci benang (lockstitch) penampang kain
C=3300
o.append('<rect x="%d" y="600" width="1000" height="120" fill="#ffd9a8"/>'%(C-500))
o.append(g('kunci','<path d="M%d 600 '%(C-460)+' '.join('h100 v60 h40 v-60'for _ in range(7))+'" stroke="#ff3b5c" stroke-width="12" fill="none"/><path d="M%d 720 '%(C-460)+' '.join('h100 v-60 h40 v60' for _ in range(7))+'" stroke="#2ec4ff" stroke-width="12" fill="none"/>'))
o.append(g('putus','<path d="M%d 560 l60 60 M%d 620 l60 -60" stroke="#ffd23f" stroke-width="16"/>'%(C-60,C-60),0))
save('jahit.svg',o)

import sys; sys.path.insert(0,'..'); from _kit import *
o=head('#07160f','#124a33','#3b3b46')
# A: pesawat mendarat
o.append('<rect x="-400" y="1080" width="2000" height="40" fill="#666"/>'+''.join('<rect x="%d" y="1094" width="90" height="12" fill="#fff"/>'%x for x in range(-300,1400,200)))
o.append(g('pesawat','<path d="M60 760 Q60 660 200 650 L900 650 Q1000 660 1020 720 L1000 780 Q960 800 900 800 L200 800 Q60 800 60 760Z" fill="#f2f4f7"/><path d="M380 720 L660 720 L560 900 L460 900Z" fill="#c9ced6"/><path d="M130 650 L60 470 L180 470 L260 650Z" fill="#3ddc84"/>'+''.join('<circle cx="%d" cy="700" r="16" fill="#4fb3ff"/>'%x for x in range(300,900,70))+'<rect x="500" y="800" width="20" height="200" fill="#555"/><circle cx="510" cy="1020" r="60" fill="#222"/><circle cx="510" cy="1020" r="24" fill="#999"/>'))
o.append(g('ban_mobil_pecah','<circle cx="860" cy="460" r="80" fill="#222"/><path d="M820 380 l40 60 l20 -50 l30 70" stroke="#ffd23f" stroke-width="12" fill="none"/>',0))
# B: ban besar dibelah + nitrogen
X=1900
o.append('<circle cx="%d" cy="660" r="380" fill="#222"/><circle cx="%d" cy="660" r="300" fill="#333"/><circle cx="%d" cy="660" r="140" fill="#9aa3ad"/>'%(X,X,X))
o.append(g('isiAngin',''.join('<circle cx="%d" cy="%d" r="18" fill="#7fd1ff"/>'%(X+int(220*__import__("math").cos(a/10)),660+int(220*__import__("math").sin(a/10))) for a in range(0,63,4))))
o.append(g('es',''.join('<path d="M%d %d l20 -20 l20 20 l-20 20z" fill="#e8f4ff"/>'%(X-260+i*60,420+(i%3)*30) for i in range(5)),0))
o.append(g('psi','<text x="%d" y="200" font-size="100" font-weight="900" fill="#3ddc84" text-anchor="middle">±200 PSI</text>'%X,0))
o.append(g('ban6','<text x="%d" y="200" font-size="90" font-weight="900" fill="#fff" text-anchor="middle">6× BAN MOBIL</text>'%X,0))
# C: rem panas + sumbat leleh
C=3300
o.append('<circle cx="%d" cy="660" r="300" fill="#222"/><circle cx="%d" cy="660" r="140" fill="#9aa3ad"/>'%(C,C))
o.append(g('rem','<rect x="%d" y="540" width="80" height="240" rx="20" fill="#ff7a59"/>'%(C-40)))
o.append(g('panas','<circle cx="%d" cy="660" r="220" fill="url(#hot)"/>'%C,0))
o.append(g('sumbat','<circle cx="%d" cy="660" r="34" fill="#ffd23f" stroke="#1b1b1b" stroke-width="8"/>'%(C+100)))
o.append(g('keluar','<path d="M%d 660 q120 -40 240 0 M%d 700 q120 40 240 0" stroke="#7fd1ff" stroke-width="14" fill="none" stroke-dasharray="30 16"/>'%(C+140,C+140),0))
save('ban.svg',o)

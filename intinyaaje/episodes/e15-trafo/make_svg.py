import sys; sys.path.insert(0,'..'); from _kit import *
o=head('#041a1f','#0e4652','#2a3a33')
# A: tiang + trafo + rumah
o.append('<rect x="480" y="200" width="44" height="920" fill="#8a8f96"/><rect x="300" y="250" width="420" height="24" fill="#6b7078"/>')
o.append(g('kabelAtas','<path d="M-200 262 Q300 300 1300 262" stroke="#ddd" stroke-width="8" fill="none"/><path d="M-200 300 Q300 340 1300 300" stroke="#ddd" stroke-width="8" fill="none"/>'))
o.append(g('kabelHot','<path d="M-200 262 Q300 300 1300 262" stroke="#ff3b30" stroke-width="14" fill="none"/>',0))
o.append('<rect x="560" y="440" width="190" height="260" rx="30" fill="#9aa3ad"/><rect x="560" y="440" width="190" height="40" rx="20" fill="#b9c1ca"/>'+''.join('<rect x="%d" y="480" width="14" height="210" fill="#7e8790"/>'%x for x in (590,630,670,710)))
o.append(g('dengung','<path d="M790 520 q30 50 0 100 M830 500 q50 70 0 140" stroke="#2ee6d6" stroke-width="10" fill="none"/>',0))
o.append('<path d="M650 700 Q800 820 880 860" stroke="#333" stroke-width="8" fill="none"/>')
o.append('<path d="M760 1100 V860 L920 740 L1080 860 V1100 Z" fill="#ffd23f"/><rect x="880" y="960" width="80" height="140" fill="#7a4a2a"/>')
o.append(g('gasTag','<rect x="120" y="560" width="300" height="110" rx="20" fill="#ff3b5c"/><text x="270" y="635" font-size="60" font-weight="900" fill="#fff" text-anchor="middle">GAS?</text>',0))
# B: penampang trafo: 2 gulungan + inti besi + minyak
X=1900
o.append(g('minyak','<rect x="%d" y="300" width="760" height="760" rx="60" fill="#ffd23f" opacity=".25"/>'%(X-380)))
o.append('<rect x="%d" y="300" width="760" height="760" rx="60" fill="none" stroke="#b9c1ca" stroke-width="16"/>'%(X-380))
o.append(g('inti','<path d="M%d 400 h500 v560 h-500 z M%d 480 v400 h340 v-400 z" fill="#6b7078" fill-rule="evenodd"/>'%(X-250,X-170)))
o.append(g('gulung1',''.join('<rect x="%d" y="%d" width="110" height="18" rx="9" fill="#ff9f1c"/>'%(X-305,y) for y in range(480,880,26))))
o.append(g('gulung2',''.join('<rect x="%d" y="%d" width="110" height="34" rx="12" fill="#2ee6d6"/>'%(X+195,y) for y in range(520,860,80))))
o.append(g('volt1','<text x="%d" y="250" font-size="70" font-weight="900" fill="#ff9f1c" text-anchor="middle">20.000 V</text>'%(X-250),0))
o.append(g('volt2','<text x="%d" y="250" font-size="70" font-weight="900" fill="#2ee6d6" text-anchor="middle">220 V</text>'%(X+250),0))
o.append(g('getar','<path d="M%d 380 l20 -30 l20 30 l20 -30 l20 30 M%d 380 l20 -30 l20 30 l20 -30 l20 30" stroke="#fff" stroke-width="8" fill="none"/>'%(X-60,X+120),0))
# C: layangan + bahaya
C=3300
o.append('<rect x="%d" y="200" width="40" height="920" fill="#8a8f96"/><path d="M%d 262 L%d 262" stroke="#ddd" stroke-width="8"/>'%(C-20,C-500,C+500))
o.append(g('layangan','<path d="M%d 180 l90 110 l-90 130 l-90 -130z" fill="#ff5c8a"/><path d="M%d 420 Q%d 700 %d 1000" stroke="#fff" stroke-width="4" fill="none"/>'%(C+200,C+200,C+260,C+150)))
o.append(g('bahaya','<path d="M%d 520 l170 300 h-340z" fill="#ffd23f" stroke="#1b1b1b" stroke-width="12"/><text x="%d" y="790" font-size="170" font-weight="900" fill="#1b1b1b" text-anchor="middle">!</text>'%(C-300,C-300),0))
save('trafo.svg',o)

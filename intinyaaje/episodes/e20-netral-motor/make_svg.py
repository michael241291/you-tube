import sys; sys.path.insert(0,'..'); from _kit import *
o=head('#0b1226','#22305a','#3b3b46')
# A: pedal gigi diagram 1-N-2-3-4
PX=540
o.append('<rect x="%d" y="340" width="200" height="760" rx="40" fill="#1e2a48" stroke="#4fb3ff" stroke-width="8"/>'%(PX-100))
gear=[('4',400),('3',540),('2',680),('N',790),('1',960)]
for n,y in gear:
    c={'N':'#3ddc84','1':'#ffd23f'}.get(n,'#fff')
    o.append(g('g'+n,'<circle cx="%d" cy="%d" r="54" fill="#0b1226" stroke="%s" stroke-width="10"/><text x="%d" y="%d" font-size="66" font-weight="900" fill="%s" text-anchor="middle">%s</text>'%(PX,y,c,PX,y+24,c,n)))
o.append(g('setengah','<path d="M%d 960 Q%d 880 %d 800" stroke="#3ddc84" stroke-width="12" fill="none" stroke-dasharray="20 12"/>'%(PX+80,PX+150,PX+80),0))
o.append(g('turun','<path d="M%d 420 V990" stroke="#ff3b5c" stroke-width="18" marker-end=""/><path d="M%d 990 l-30 -40 h60z" fill="#ff3b5c"/>'%(PX-170,PX-170),0))
# B: skenario salah: N di bawah, motor mogok di tanjakan
B=1900
o.append('<path d="M%d 1100 L%d 700 L%d 700 L%d 1100Z" fill="#555"/>'%(B-600,B+200,B+600,B+600))
o.append(g('motor','<g transform="translate(%d 860) rotate(-27)"><circle cx="-90" cy="60" r="56" fill="#222"/><circle cx="110" cy="60" r="56" fill="#222"/><path d="M-120 20 L-40 -40 L80 -40 L140 20Z" fill="#ff3b5c"/></g>'%(B-200)))
o.append(g('lampu','<rect x="%d" y="300" width="110" height="300" rx="20" fill="#222"/><circle cx="%d" cy="370" r="36" fill="#ff3b30"/><circle cx="%d" cy="450" r="36" fill="#553"/><circle cx="%d" cy="530" r="36" fill="#353"/>'%(B+300,B+355,B+355,B+355)))
o.append(g('mogok','<text x="%d" y="600" font-size="90" font-weight="900" fill="#ffd23f" text-anchor="middle">NETRAL?!</text>'%(B-200),0))
o.append(g('nBawah','<rect x="%d" y="300" width="160" height="330" rx="30" fill="#1e2a48"/><text x="%d" y="380" font-size="54" font-weight="900" fill="#fff" text-anchor="middle">2</text><text x="%d" y="470" font-size="54" font-weight="900" fill="#fff" text-anchor="middle">1</text><text x="%d" y="580" font-size="64" font-weight="900" fill="#3ddc84" text-anchor="middle">N</text>'%(B-780,B-700,B-700,B-700)))
o.append(g('xB',X(B-700,465,110,26),0))
# C: lampu netral di speedometer
C=3300
o.append('<circle cx="%d" cy="660" r="320" fill="#1e2a48" stroke="#9aa3ad" stroke-width="20"/><path d="M%d 660 L%d 480" stroke="#ff3b5c" stroke-width="16" stroke-linecap="round"/>'%(C,C,C+130))
o.append(g('lampuN','<circle cx="%d" cy="860" r="60" fill="#3ddc84"/><text x="%d" y="884" font-size="70" font-weight="900" fill="#0b1226" text-anchor="middle">N</text>'%(C,C),0))
o.append(g('aman','<rect x="%d" y="1060" width="560" height="120" rx="60" fill="#3ddc84"/><text x="%d" y="1142" font-size="70" font-weight="900" fill="#0b1226" text-anchor="middle">PENGAMAN</text>'%(C-280,C),0))
save('netral.svg',o)

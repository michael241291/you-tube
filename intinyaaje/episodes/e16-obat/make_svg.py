import sys; sys.path.insert(0,'..'); from _kit import *
o=head('#1a0614','#5a1240','#3a2030')
# A: meja: resep + piring nasi + obat
o.append('<rect x="100" y="380" width="380" height="500" rx="20" fill="#fff"/><text x="290" y="470" font-size="54" font-weight="900" fill="#333" text-anchor="middle">RESEP</text>'+''.join('<rect x="150" y="%d" width="280" height="16" rx="8" fill="#ccc"/>'%y for y in (530,580,630))+'<rect x="150" y="700" width="280" height="70" rx="12" fill="#ff5c8a"/><text x="290" y="750" font-size="34" font-weight="900" fill="#fff" text-anchor="middle">SESUDAH MAKAN</text>')
o.append(g('nasi','<ellipse cx="760" cy="900" rx="230" ry="70" fill="#eee"/><ellipse cx="760" cy="850" rx="170" ry="100" fill="#fffdf0"/>'))
o.append(g('kenyang','<text x="760" y="700" font-size="80" font-weight="900" fill="#ffd23f" text-anchor="middle">KENYANG?</text>',0))
o.append('<rect x="560" y="1000" width="120" height="50" rx="25" fill="#ff9f1c"/><rect x="560" y="1000" width="60" height="50" rx="25" fill="#fff"/>')
# B: lambung
X=1900
o.append('<path d="M%d 300 Q%d 260 %d 420 Q%d 760 %d 900 Q%d 1080 %d 900 Q%d 760 %d 520 Q%d 380 %d 300 Z" fill="#ff8fa3" stroke="#e05a77" stroke-width="18"/>'%(X-120,X-40,X+40,X+340,X+120,X-180,X-300,X-380,X-220,X-200,X-120))
o.append(g('kosong','<text x="%d" y="700" font-size="56" font-weight="900" fill="#7a1f35" text-anchor="middle">KOSONG</text>'%(X-80)))
o.append(g('pil','<g transform="translate(%d 520) rotate(30)"><rect x="-70" y="-28" width="140" height="56" rx="28" fill="#ff9f1c"/><rect x="-70" y="-28" width="70" height="56" rx="28" fill="#fff"/></g>'%(X-60)))
o.append(g('perih','<ellipse cx="%d" cy="760" rx="200" ry="110" fill="#ff3b30" opacity=".6"/>'%(X-60),0))
o.append(g('roti','<rect x="%d" y="780" width="220" height="130" rx="40" fill="#e8a75a"/><rect x="%d" y="800" width="180" height="90" rx="30" fill="#f5cf8f"/>'%(X-170,X-150),0))
o.append(g('bantal','<rect x="%d" y="720" width="360" height="40" rx="20" fill="#3ddc84"/>'%(X-240),0))
# C: jam & sebelum/sesudah
C=3300
o.append('<circle cx="%d" cy="640" r="280" fill="#fff" stroke="#ffd23f" stroke-width="24"/><path d="M%d 640 V440 M%d 640 L%d 640" stroke="#1b1b1b" stroke-width="20" stroke-linecap="round"/>'%(C,C,C,C+140))
o.append(g('arc2','<path d="M%d 380 A260 260 0 0 1 %d 640" stroke="#3ddc84" stroke-width="40" fill="none"/>'%(C,C+260),0))
o.append(g('sebelum','<path d="M%d 640 A260 260 0 0 1 %d 380" stroke="#ff5c8a" stroke-width="40" fill="none"/>'%(C-260,C),0))
o.append(g('tanya','<text x="%d" y="1080" font-size="90" font-weight="900" fill="#ffd23f" text-anchor="middle">TANYA APOTEKER</text>'%C,0))
save('obat.svg',o)

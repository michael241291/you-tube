import sys,os,math; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))); from _kit import *
def T(x,y,s,txt,c='#fff',a='middle',w=900): return f'<text x="{x}" y="{y}" font-size="{s}" font-weight="{w}" fill="{c}" text-anchor="{a}" font-family="Arial">{txt}</text>'
def house(x,y,c='#ffd23f'): return f'<path d="M{x-120} {y} V{y-170} L{x} {y-280} L{x+120} {y-170} V{y}Z" fill="{c}"/><rect x="{x-30}" y="{y-110}" width="60" height="110" fill="#7a4a2a"/>'
def tree(x,y): return f'<rect x="{x-14}" y="{y-150}" width="28" height="150" fill="#6b4a2b"/><circle cx="{x}" cy="{y-190}" r="80" fill="#2fbf71"/>'
def cloud(x,y,s=1,c='#d9e3ee'): return f'<g transform="translate({x} {y}) scale({s})"><ellipse cx="0" cy="0" rx="140" ry="60" fill="{c}"/><ellipse cx="-90" cy="20" rx="90" ry="50" fill="{c}"/><ellipse cx="100" cy="20" rx="100" ry="50" fill="{c}"/></g>'
def moto(x,y,rot=0,c='#ff3b5c'): return f'<g transform="translate({x} {y}) rotate({rot})"><circle cx="-110" cy="0" r="62" fill="#222"/><circle cx="-110" cy="0" r="24" fill="#999"/><circle cx="120" cy="0" r="62" fill="#222"/><circle cx="120" cy="0" r="24" fill="#999"/><path d="M-150 -40 L-60 -100 L70 -100 L150 -40 Z" fill="{c}"/>{person(0,-110,0.7,"#4fb3ff")}</g>'
def plane(x,y,s=1,c='#f2f4f7'): return f'<g transform="translate({x} {y}) scale({s})"><path d="M-420 0 Q-420 -60 -340 -70 L330 -70 Q420 -60 440 0 Q420 60 330 70 L-340 70 Q-420 60 -420 0Z" fill="{c}"/><path d="M-120 0 L120 0 L20 220 L-60 220Z" fill="#c9ced6"/><path d="M-380 -60 L-440 -230 L-330 -230 L-260 -60Z" fill="#3ddc84"/>'+''.join(f'<circle cx="{i}" cy="-20" r="16" fill="#4fb3ff"/>' for i in range(-250,320,60))+'</g>'
def train(x,y,n=3,c='#ff7a59',w=300):
    o=''
    for i in range(n): o+=f'<rect x="{x+i*(w+20)}" y="{y-200}" width="{w}" height="180" rx="24" fill="{c}"/>'+''.join(f'<rect x="{x+i*(w+20)+20+j*70}" y="{y-170}" width="50" height="60" rx="8" fill="#bfe3ff"/>' for j in range(4))+f'<circle cx="{x+i*(w+20)+60}" cy="{y-10}" r="26" fill="#222"/><circle cx="{x+i*(w+20)+w-60}" cy="{y-10}" r="26" fill="#222"/>'
    return o
B=lambda f,o: save(f,o)

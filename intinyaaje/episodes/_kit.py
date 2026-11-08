# Helper bersama untuk ilustrasi vektor datar @intinyaaje
def head(c1,c2,floor):
    return ['<defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient>'
            '<radialGradient id="hot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff3b30" stop-opacity=".85"/><stop offset="1" stop-color="#ff3b30" stop-opacity="0"/></radialGradient>'
            '<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe14d" stop-opacity=".8"/><stop offset="1" stop-color="#ffe14d" stop-opacity="0"/></radialGradient></defs>'%(c1,c2),
            '<rect x="-1200" y="-800" width="6400" height="3600" fill="url(#bg)"/>',
            '<rect x="-1200" y="1100" width="6400" height="1500" fill="%s"/>'%floor]
def g(cls,body,op=None):
    return '<g class="%s"%s>%s</g>'%(cls,' opacity="%s"'%op if op is not None else '',body)
def X(cx,cy,r,w=34): return '<path d="M%d %d L%d %d M%d %d L%d %d" stroke="#ff3b5c" stroke-width="%d" stroke-linecap="round"/>'%(cx-r,cy-r,cx+r,cy+r,cx+r,cy-r,cx-r,cy+r,w)
def person(x,y,s=1,shirt="#4fb3ff",skin="#f2c49b"):
    return ('<g transform="translate(%d %d) scale(%s)"><circle cx="0" cy="-150" r="46" fill="%s"/><path d="M-46 -170 q46 -50 92 0 v-16 q-46 -40 -92 0z" fill="#2b2b2b"/>'
            '<rect x="-60" y="-100" width="120" height="150" rx="40" fill="%s"/></g>')%(x,y,s,skin,shirt)
def save(name,o): open(name,'w').write('\n'.join(o)); print('ok',name)

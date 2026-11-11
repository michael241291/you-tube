"""Bangun episode.json dari spesifikasi ringkas (koordinat label & sfx = layar)."""
import json,os
ROOT=os.path.join(os.path.dirname(__file__),'..','episodes')
VOICE={"name":"Senandika","voice_id":"eESTQeTcGUli0jYysKtx","model":"eleven_v4","tags":True}
def build(id,meta,regions,cams,hl,labels,sfx,faces,hud,card,svg,sea,extra=None):
    d=os.path.join(ROOT,id); script=open(os.path.join(d,'script.txt')).read().strip()
    # cams: list of (w, region, dz) -> cam keys; tahan sampai key berikutnya
    keys=[];cur=None
    for i,(w,r,*z) in enumerate(cams):
        cx,cy,cw=regions[r]
        if z: cx,cy,cw=z[0]
        if cur: keys.append(["w%d"%(w-1) if w>0 else 0,*cur])
        cur=[cx,cy,cw]; keys.append(["w%d"%w if w>0 else 0,*cur])
    keys=[k if k[0]!='w0' else [0,*k[1:]] for k in keys]
    def regAt(w):
        c=None
        for (cw,r,*z) in cams:
            if cw<=w: c=(z[0] if z else regions[r])
        return c
    labs=[]
    for (w,w1,sx,sy,text,*sz) in labels:
        cx,cy,cw=regAt(w); k=cw/1080
        labs.append({"w":w,"w1":w1,"x":round(cx+(sx-540)*k),"y":round(cy+(sy-960)*k),"text":text,"pill":True,"size":sz[0] if sz else 42})
    ep={"audio":"voice.mp3","musicVol":0.22,"ver":1,"capY":1220,"voice":VOICE,"id":id,**meta,
        "hud":{"title":[["w%d"%w if w else "w0",t] for w,t in hud]},
        "sfx":[["w%d"%s[0],*s[1:]] for s in sfx],"faces":[["w%d"%f[0],f[1],2.0] for f in faces],
        "scenes":[{"type":"map","svgFile":svg,"sea":sea,"w0":0,"cam":keys,"hl":hl,"labels":labs,**(extra or {})},
                  {"type":"card","w0":card[0],"tag":"INTINYA","y":420,"lines":card[1]}],
        "script":script}
    json.dump(ep,open(os.path.join(d,'episode.json'),'w'),ensure_ascii=False,indent=1); print('ok',id)
def S(sel,w,dur=0.4,w1=None): o={"sel":sel,"w":w,"show":True,"dur":dur}; (o.update(w1=w1) if w1 else 0); return o
def H(sel,w,dur=0.4): return {"sel":sel,"w":w,"hide":True,"dur":dur}
def M(sel,w,mv,dur=0.5): return {"sel":sel,"w":w,"move":mv,"dur":dur}
def R(xl,xr,yt,yb,minw=1000):
    w=max(minw,(yb-yt)*1080/730,(xr-xl)*1.12); return (round((xl+xr)/2),round((yt+yb)/2+75*w/1080),round(w))

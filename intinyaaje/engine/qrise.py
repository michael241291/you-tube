"""Ukur seberapa naik nada di akhir take kalimat tanya (persen). python3 qrise.py take1.mp3 take2.mp3 ... -> pilih nilai tertinggi."""
import sys,subprocess,numpy as np
def f0track(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
    x=np.frombuffer(raw,np.int16).astype(float)/32768;out=[]
    for i in range(0,len(x)-640,160):
        fr=x[i:i+640]
        if np.sqrt((fr**2).mean())<0.02: out.append(np.nan);continue
        fr=fr-fr.mean();ac=np.correlate(fr,fr,'full')[639:];lo,hi=16000//350,16000//70;k=lo+np.argmax(ac[lo:hi])
        out.append(16000/k if ac[k]>0.3*ac[0] else np.nan)
    return np.array(out)
def rise(f):
    p=f0track(f);v=p[~np.isnan(p)]
    if len(v)<8: return -99
    n=len(v);tail=np.median(v[-max(3,n//6):]);body=np.median(v[:n*2//3]);return 100*(tail/body-1)
for f in sys.argv[1:]: print(f, round(rise(f)))

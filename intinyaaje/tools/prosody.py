import sys,json,subprocess,numpy as np,re
sys.path.insert(0,'/home/claude/you-tube/intinyaaje/engine')
from qrise import f0track
def stats(audio,asrjson=None):
    p=f0track(audio); t=np.arange(len(p))*0.01
    v=p[~np.isnan(p)]; st=12*np.log2(v/np.median(v))
    out={'st_std':round(float(np.std(st)),2),'range':round(float(np.percentile(st,90)-np.percentile(st,10)),2)}
    if asrjson:
        W=json.load(open(asrjson))['words']
        rises=[];ends=[]
        # sentence ends
        start=0
        for i,(w,a,b) in enumerate(W):
            if re.search(r'[.?!]$',w):
                seg=p[int(W[start][1]*100):int(b*100)]; last=p[int(a*100):int(b*100)]
                sv=seg[~np.isnan(seg)]; lv=last[~np.isnan(last)]
                if len(sv)>5 and len(lv)>2:
                    r=12*np.log2(np.median(lv[-max(2,len(lv)//2):])/np.median(sv))
                    (rises if w.endswith('?') else ends).append(round(float(r),1))
                start=i+1
        out['q_rise_st']=rises; out['stmt_end_st_mean']=round(float(np.mean(ends)),1) if ends else None
    return out
for a in sys.argv[1:]:
    j=a+'.asr.json'
    import os
    print(a.split('/')[-2:], stats(a, j if os.path.exists(j) else None))

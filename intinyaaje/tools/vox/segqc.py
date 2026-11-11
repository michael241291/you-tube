"""Cek tiap segmen: transkrip vs teks. Cetak indeks segmen yang meleset (kata hilang / ngoceh tambahan)."""
import sys,json,subprocess,re,difflib,numpy as np
from faster_whisper import WhisperModel
job=json.load(open(sys.argv[1])); m=WhisperModel('small',device='cpu',compute_type='int8')
norm=lambda s:re.sub(r'[^a-z0-9 ]','',s.lower().replace('-',' ')).split()
bad=[]
for i,s in enumerate(job['segs']):
    f=f"{job['dir']}/seg_{i:02d}.wav"
    a=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout
    hyp=' '.join(x.text for x in m.transcribe(np.frombuffer(a,np.float32),language='id')[0])
    r,h=norm(s['text']),norm(hyp); sim=difflib.SequenceMatcher(None,r,h).ratio(); extra=len(h)-len(r)
    ok=sim>=0.7 and extra<=2
    print(i,round(sim,2),extra,'OK' if ok else 'ULANG','|',hyp.strip(),flush=True)
    if not ok: bad.append(i)
print('BAD',json.dumps(bad))

"""Suara video panjang per segmen (Gemini 3.1 Puck). python3 segtts.py <ep_dir> [maks_panggilan]
Naskah a*/script.txt digabung, dipecah ±TARGET kata di batas kalimat -> voice/seg_NN.txt.
Segmen yang belum punya mp3 dibuat; kalau SAFETY, segmen dipecah dua (file baru NNa/NNb). 429 -> berhenti (lanjut besok)."""
import sys,os,re,json,glob,base64,subprocess,urllib.request
ep=sys.argv[1].rstrip('/');MAX=int(sys.argv[2]) if len(sys.argv)>2 else 9;TARGET=int(os.environ.get('TARGET','140'))
V=f'{ep}/voice';os.makedirs(V,exist_ok=True)
K=open('/home/claude/.secrets/gemini_key').read().strip()
STYLE="Read aloud in Indonesian as a warm, calm and clear storyteller narrating a true aviation history documentary, with natural pauses: "
MODEL='gemini-3.1-flash-tts-preview'
def sents(t): return [s for s in re.split(r'(?<=[.?!])\s+',t.strip()) if s]
if not glob.glob(f'{V}/seg_*.txt'):
    n=0
    for a in sorted(glob.glob(f'{ep}/a*/script.txt')):
        cur=[]
        for s in sents(open(a).read()):
            cur.append(s)
            if sum(len(x.split()) for x in cur)>=TARGET: n+=1;open(f'{V}/seg_{n:02d}.txt','w').write(' '.join(cur));cur=[]
        if cur:
            if len(' '.join(cur).split())<40 and n: p=f'{V}/seg_{n:02d}.txt';open(p,'w').write(open(p).read()+' '+' '.join(cur))
            else: n+=1;open(f'{V}/seg_{n:02d}.txt','w').write(' '.join(cur))
calls=0
def tts(txt,out):
    body={"contents":[{"parts":[{"text":STYLE+txt}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Puck"}}}}}
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",data=json.dumps(body).encode(),headers={"x-goog-api-key":K,"Content-Type":"application/json"})
    try: r=json.load(urllib.request.urlopen(req,timeout=300))
    except urllib.error.HTTPError as e: return f'HTTP{e.code}'
    try: pcm=base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
    except (KeyError,IndexError): return r.get('candidates',[{}])[0].get('finishReason','?')
    subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ar','24000','-ac','1','-i','-','-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse','-ar','44100','-ac','1',out],input=pcm,check=True);subprocess.run(['ffmpeg','-v','error','-y','-i',out,'-b:a','128k',out[:-4]+'.mp3'],check=True);return 'OK'
while calls<MAX:
    todo=[p for p in sorted(glob.glob(f'{V}/seg_*.txt')) if not (os.path.exists(p[:-4]+'.wav') or os.path.exists(p[:-4]+'.mp3'))]
    if not todo: print('SEMUA SEGMEN SELESAI');break
    p=todo[0];txt=open(p).read().strip();calls+=1
    st=tts(txt,p[:-4]+'.wav');print(os.path.basename(p),len(txt.split()),'kata ->',st,flush=True)
    if st=='OK': continue
    if st.startswith('HTTP429'): print('KUOTA HABIS');break
    if st in('SAFETY','OTHER','PROHIBITED_CONTENT'):
        ss=sents(txt);h=len(ss)//2
        if h==0: print('tidak bisa dipecah lagi:',p);break
        b=p[:-4];os.rename(p,b+'.orig');open(b+'a.txt','w').write(' '.join(ss[:h]));open(b+'b.txt','w').write(' '.join(ss[h:]))
    else: print('error lain',st);break
print('panggilan:',calls)

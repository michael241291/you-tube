"""tts.txt bertag -> narasi Gemini TTS, satu panggilan per tag ("Say <gaya>: <teks>").
python3 gem_ep.py <tts.txt> <out.mp3> [voice] [model]"""
import sys,json,base64,subprocess,urllib.request,re,os,time,tempfile
K=open('/home/claude/.secrets/gemini_key').read().strip()
src,out=sys.argv[1],sys.argv[2]; voice=sys.argv[3] if len(sys.argv)>3 else 'Puck'; model=sys.argv[4] if len(sys.argv)>4 else 'gemini-3.8-flash-tts'
ST={"curious":"with curiosity, like starting an intriguing story","skeptical":"skeptically, a little teasing","excited":"excitedly, upbeat",
    "warmly":"warmly and clearly, like explaining to a friend","dramatically":"dramatically, with emphasis","serious":"seriously and calmly",
    "chuckles":"with a light amused chuckle","confidently":"confidently","whispers":"in a soft whisper"}
txt=open(src).read().strip(); parts=re.split(r'\[([a-z ]+)\]',txt); segs=[];tag='warmly'
for i,p in enumerate(parts):
    if i%2: tag=p.strip(); continue
    p=p.strip()
    if p: segs.append((tag,p))
tmp=tempfile.mkdtemp(); files=[]
def call(prompt):
    body={"contents":[{"parts":[{"text":prompt}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice}}}}}
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",data=json.dumps(body).encode(),headers={"x-goog-api-key":K,"Content-Type":"application/json"})
    for a in range(8):
        try: r=json.load(urllib.request.urlopen(req,timeout=300)); return base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
        except urllib.error.HTTPError as e:
            m=e.read().decode()[:300]
            if e.code in (429,500,503): print("tunggu kuota", e.code, m[:160].replace(chr(10)," "), flush=True); time.sleep(30); continue
            raise SystemExit(f"HTTP {e.code} {m}")
    raise SystemExit("gagal setelah retry")
for k,(tag,t) in enumerate(segs):
    pcm=call(f"Say in Indonesian, {ST.get(tag,tag)}, natural casual Jakarta accent, lively young narrator pace: {t}")
    f=f"{tmp}/s{k:02d}.wav"; subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ar','24000','-ac','1','-i','-','-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse',f],input=pcm,check=True)
    files.append(f); print(k,tag,round(len(pcm)/48000,1),flush=True); time.sleep(6)
subprocess.run(['ffmpeg','-v','error','-y','-f','lavfi','-i','anullsrc=r=24000:cl=mono','-t','0.22',f"{tmp}/sil.wav"])
with open(f"{tmp}/l.txt",'w') as L:
    for f in files: L.write(f"file '{f}'\nfile '{tmp}/sil.wav'\n")
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',f"{tmp}/l.txt",'-af','loudnorm=I=-16:TP=-1.5','-ar','44100','-b:a','160k',out],check=True)
print('OK',out)

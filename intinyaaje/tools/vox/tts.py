"""tts.txt (tag emosi gaya ElevenLabs) -> voice.mp3 via VoxCPM2 lokal. Pemakaian: python3 tts.py <episode_dir>"""
import sys,re,json,os,subprocess
H=os.path.dirname(os.path.abspath(__file__))
STYLE={"curious":"curious, intrigued, inviting tone",
 "skeptical":"skeptical, slightly teasing, questioning tone",
 "excited":"excited and energetic, upbeat",
 "warmly":"warm, friendly, clear explaining tone",
 "dramatically":"dramatic, emphatic, rising intensity",
 "serious":"serious, calm, firm",
 "chuckles":"amused, light playful tone with a smile",
 "confidently":"confident, assertive, clear",
 "whispers":"soft, hushed, secretive"}
BASE="Young male Indonesian narrator, warm friendly voice, lively intonation with clear rising pitch on questions, speaks at a relaxed moderate pace with natural pauses between phrases, articulates every word clearly"
ep=sys.argv[1].rstrip('/'); work=f"/home/claude/work/vox/{os.path.basename(ep)}"; os.makedirs(work,exist_ok=True)
txt=open(f"{ep}/tts.txt").read().strip()
parts=re.split(r'\[([a-z ]+)\]',txt); segs=[]; tag='warmly'
for i,p in enumerate(parts):
    if i%2: tag=p.strip(); continue
    p=p.replace('...',',').strip()
    if not p: continue
    # pecah per kalimat supaya memori aman (maks ~2 kalimat / segmen)
    sents=re.findall(r'[^.?!]+[.?!]?',p); buf=''
    for s in sents:
        s=s.strip()
        if not s: continue
        if len((buf+' '+s).split())>16 and buf: segs.append({'text':buf.strip(),'style':BASE+'; '+STYLE.get(tag,tag)}); buf=s
        else: buf=(buf+' '+s).strip()
    if buf: segs.append({'text':buf,'style':BASE+'; '+STYLE.get(tag,tag)})
job={'dir':work,'ref':f"{H}/ref_voice.wav",'segs':segs}; jp=f"{work}/job.json"; json.dump(job,open(jp,'w'),ensure_ascii=False,indent=1)
print(len(segs),'segmen')
env=dict(os.environ,MALLOC_ARENA_MAX='2',VOX_MAXLEN='384')
i=0
while i<len(segs):
    r=subprocess.run(['/home/claude/vox/bin/python',f"{H}/seg.py",jp,str(i),str(i+3)],env=env,capture_output=True,text=True)
    print(''.join(l+'\n' for l in r.stdout.splitlines()),end='',flush=True)
    done=sum(os.path.exists(f"{work}/seg_{k:02d}.wav") for k in range(len(segs)))
    if done<=i: print('GAGAL',r.stderr[-800:]); sys.exit(1)
    i=done
# QC per segmen: ulang yang meleset (maks 2 putaran)
for rnd in range(2):
    q=subprocess.run(['python3',f"{H}/segqc.py",jp],capture_output=True,text=True).stdout
    print(q,end='')
    bad=json.loads(q.strip().splitlines()[-1].split('BAD ',1)[1])
    if not bad: break
    for k in bad:
        os.remove(f"{work}/seg_{k:02d}.wav")
        subprocess.run(['/home/claude/vox/bin/python',f"{H}/seg.py",jp,str(k),str(k+1)],env=env,capture_output=True)
# gabung dengan jeda pendek
lst=f"{work}/list.txt"; sil=f"{work}/sil.wav"
subprocess.run(['ffmpeg','-v','error','-y','-f','lavfi','-i','anullsrc=r=48000:cl=mono','-t','0.32',sil])
with open(lst,'w') as f:
    for k in range(len(segs)): f.write(f"file 'seg_{k:02d}.wav'\nfile 'sil.wav'\n")
out=sys.argv[2] if len(sys.argv)>2 else f"{ep}/voice_vox.mp3"
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',lst,'-af','atempo=0.88,loudnorm=I=-16:TP=-1.5','-ar','44100','-b:a','160k',out],check=True)
print('OK',out)

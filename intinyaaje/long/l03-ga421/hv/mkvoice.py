"""python3 mkvoice.py — gabung segmen suara GA421 per bab -> aN/voice.mp3, lalu timing kata (asralign) -> aN/words.js"""
import subprocess,json,sys,os,glob
sys.path.insert(0,'/home/claude/you-tube/intinyaaje/engine');import asralign
V='/home/claude/you-tube/intinyaaje/long/l03-ga421/voice'
MAP={'a1':['01a','01b','02'],'a2':['03a','03b','04'],'a3':['05a','05b','06'],'a4':['07a','07b','08'],'a5':['09','10'],'a6':['11','12']}
for ch in (sys.argv[1:] or MAP):
    segs=[]
    for s in MAP[ch]:
        sub=sorted(glob.glob(f'{V}/seg_{s}.mp3'))or sorted(glob.glob(f'{V}/seg_{s}[ab].mp3'))
        if not sub: print('BELUM ADA',ch,s);break
        segs+=sub
    else:
        ins=[];fl=[]
        for i,p in enumerate(segs):
            ins+=['-i',p];fl.append(f'[{i}:a]aformat=sample_rates=44100:channel_layouts=mono,apad=pad_dur=0.35[s{i}]')
        fl.append(''.join(f'[s{i}]' for i in range(len(segs)))+f'concat=n={len(segs)}:v=0:a=1[a]')
        subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fl),'-map','[a]','-b:a','160k',f'{ch}/voice.mp3'],check=True)
        dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{ch}/voice.mp3'],capture_output=True,text=True).stdout)
        script=' '.join(open(f'/home/claude/you-tube/intinyaaje/long/l03-ga421/{ch}/script.txt').read().split())
        w=asralign.align(script,f'{ch}/voice.mp3',dur)
        json.dump(w,open(f'{ch}/words.json','w'));open(f'{ch}/words.js','w').write('const WORDS='+json.dumps(w)+';')
        print('OK',ch,round(dur,1),len(w))

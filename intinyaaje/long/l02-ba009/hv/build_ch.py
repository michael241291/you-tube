import json,subprocess,sys,os,shutil
ch=sys.argv[1];os.chdir(ch)
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','voice.mp3'],capture_output=True,text=True).stdout)+1.2
if os.path.exists('fr'):shutil.rmtree('fr')
subprocess.run(['node','../hrender.js','h.html',f'{dur:.2f}','fr'],check=True)
S=json.load(open('scenes.json'));V=[s for s in S if s['kind']=='video']
G={'':'','night':',eq=brightness=-0.18:saturation=0.55,colorbalance=bs=0.25:bm=0.12:rs=-0.1','dim':',eq=brightness=-0.12:saturation=0.7'}
inp=['-f','lavfi','-i',f'color=c=black:s=1920x1080:r=30:d={dur:.2f}'];fc=[];last='0:v'
for k,s in enumerate(V):
    t0=max(0,s['t0']-0.5);t1=min(dur,s['t1']+0.5);d=t1-t0
    inp+=['-stream_loop','-1','-i',f"../clips/{s['clip']}.mp4"]
    fc.append(f"[{k+1}:v]trim={s['off']}:{s['off']+d:.2f},setpts=PTS-STARTPTS,scale=2016:1134:force_original_aspect_ratio=increase,crop=1920:1080:(iw-1920)/2:(ih-1080)*{s['y']},fps=30{G[s['grade']]},format=yuv420p,setpts=PTS+{t0:.3f}/TB[v{k}]")
    fc.append(f"[{last}][v{k}]overlay=eof_action=pass:enable='between(t,{t0:.2f},{t1:.2f})'[b{k}]");last=f'b{k}'
subprocess.run(['ffmpeg','-v','error','-y',*inp,'-filter_complex',';'.join(fc),'-map',f'[{last}]','-t',f'{dur:.2f}','-c:v','libx264','-preset','veryfast','-crf','16','-pix_fmt','yuv420p','bg.mp4'],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i','bg.mp4','-framerate','30','-i','fr/f_%05d.png','-i','voice.mp3','-filter_complex','[0:v][1:v]overlay=format=auto,format=yuv420p[v];[2]apad[a]','-map','[v]','-map','[a]','-t',f'{dur:.2f}','-c:v','libx264','-preset','veryfast','-crf','19','-c:a','aac','-b:a','192k','-ar','44100','-ac','2',f'{ch}.mp4'],check=True)
shutil.rmtree('fr');print('OK',ch,dur)

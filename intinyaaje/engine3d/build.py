"""python3 engine3d/build.py <ep-dir> <out.mp4> [musik]  — gabung frame overlay (PNG alpha) di atas klip Pixabay (meta.json CLIPS), + suara + musik ducking.
CLIPS: [{t0,t1,src (relatif ep),ss (detik awal di klip), rate?}]"""
import sys,json,os,subprocess
ep,out=sys.argv[1],sys.argv[2];mus=sys.argv[3] if len(sys.argv)>3 else 'penasaran'
root=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..');E=os.path.join(root,ep)
m=json.load(open(f'{E}/meta.json'));END=m['END'];clips=m['CLIPS']
inp=['-f','lavfi','-i',f'color=c=black:s=1080x1920:r=30:d={END:.3f}'];fl=[];last='[0:v]'
for i,c in enumerate(clips):
    d=c['t1']-c['t0'];inp+=['-ss',str(c.get('ss',0)),'-t',f'{d+0.2:.3f}','-i',f"{E}/{c['src']}"]
    fl.append(f"[{i+1}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30,setpts=PTS-STARTPTS+{c['t0']:.3f}/TB[c{i}]")
    fl.append(f"{last}[c{i}]overlay=enable='between(t,{c['t0']:.3f},{c['t1']:.3f})':eof_action=pass[b{i}]");last=f'[b{i}]'
n=len(clips)+1
inp+=['-framerate','30','-i',f'{E}/fr/f_%05d.png','-i',f'{E}/voice.mp3','-stream_loop','-1','-i',f'{root}/assets/music/{mus}.mp3']
fl.append(f"{last}[{n}:v]overlay=0:0:format=auto,format=yuv420p[v]")
fl.append(f"[{n+2}:a]volume=0.2[m];[{n+1}:a]asplit[v1][v2];[m][v2]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[md];[v1][md]amix=inputs=2:duration=first:normalize=0,apad[a]")
cmd=['ffmpeg','-y','-v','error',*inp,'-filter_complex',';'.join(fl),'-map','[v]','-map','[a]','-t',f'{END:.3f}','-c:v','libx264','-preset','veryfast','-crf','20','-c:a','aac','-b:a','192k',out]
subprocess.run(cmd,check=True);print('ok',out)

import subprocess,sys
chs=sys.argv[2:];out=sys.argv[1]
open('list.txt','w').write(''.join(f"file '{c}/{c}.mp4'\n" for c in chs))
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i','list.txt','-c','copy','cat.mp4'],check=True)
d=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','cat.mp4'],capture_output=True,text=True).stdout)
M='/home/claude/you-tube/intinyaaje/assets/music/misteri.mp3'
subprocess.run(['ffmpeg','-v','error','-y','-i','cat.mp4','-stream_loop','-1','-i',M,'-filter_complex',
 f"[0:a]aformat=sample_rates=44100:channel_layouts=stereo,asplit[vo][sc];[1:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=0.22,afade=t=in:d=2,afade=t=out:st={d-2.5:.2f}:d=2.5[m];[m][sc]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=500[md];[vo][md]amix=inputs=2:duration=first:normalize=0[a]",
 '-map','0:v','-map','[a]','-t',f'{d:.2f}','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',out],check=True)
print(out,d)

"""Generate segments [start,end) of a job JSON with VoxCPM2 (one process, trims memory)."""
import sys,json,os,time,torch,soundfile as sf
sys.path.insert(0,os.path.dirname(__file__)); import lowmem
torch.set_num_threads(2)
from voxcpm import VoxCPM
job=json.load(open(sys.argv[1])); a,b=int(sys.argv[2]),int(sys.argv[3])
m=VoxCPM.from_pretrained("/home/claude/vox/models/VoxCPM2", load_denoiser=False, optimize=False)
for i in range(a,min(b,len(job['segs']))):
    s=job['segs'][i]; out=f"{job['dir']}/seg_{i:02d}.wav"
    if os.path.exists(out): continue
    t=time.time()
    w=m.generate(text=f"({s['style']}){s['text']}",reference_wav_path=job['ref'],cfg_value=job.get('cfg',2.0),inference_timesteps=job.get('steps',10))
    sf.write(out,w,m.tts_model.sample_rate); print(i,round(time.time()-t),round(len(w)/m.tts_model.sample_rate,1),flush=True)
    del w; lowmem.trim()

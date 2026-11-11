import os,sys,torch,gc
import torch.nn as nn, ctypes
_libc=ctypes.CDLL('libc.so.6')
def trim():
    gc.collect(); _libc.malloc_trim(0)
from safetensors import safe_open
import voxcpm.model.voxcpm2 as V
class QLin(nn.Module):
    def __init__(s, lin):
        super().__init__()
        f=nn.Linear(lin.in_features,lin.out_features,bias=lin.bias is not None,dtype=torch.float32)
        f.weight.data.copy_(lin.weight.data.float())
        if lin.bias is not None: f.bias.data.copy_(lin.bias.data.float())
        s.q=torch.ao.quantization.quantize_dynamic(nn.Sequential(f),{nn.Linear},dtype=torch.qint8)[0]
        s.in_features=lin.in_features; s.out_features=lin.out_features
    def forward(s,x):
        dt=x.dtype; return s.q(x.float()).to(dt)
def from_local_lowmem(cls, path, optimize=True, training=False, device=None, lora_config=None):
    cfg=V.VoxCPMConfig.model_validate_json(open(os.path.join(path,"config.json"),encoding="utf-8").read())
    cfg.max_length=int(os.environ.get("VOX_MAXLEN","1024"))
    tok=V.LlamaTokenizerFast.from_pretrained(path)
    avc=getattr(cfg,"audio_vae_config",None)
    vae=V.AudioVAEV2(config=avc) if avc else V.AudioVAEV2()
    vsd=torch.load(os.path.join(path,"audiovae.pth"),map_location="cpu",weights_only=True); vsd=vsd.get("state_dict",vsd)
    vae.load_state_dict(vsd,strict=False); del vsd
    old=torch.get_default_dtype(); torch.set_default_dtype(torch.bfloat16)
    try: model=cls(cfg,tok,vae,lora_config,device=device)
    finally: torch.set_default_dtype(old)
    model=model.to(torch.bfloat16); model.audio_vae=model.audio_vae.to(torch.float32)
    sd=None; n=0
    with safe_open(os.path.join(path,"model.safetensors"),framework="pt") as f:
        keys=set(f.keys())
        if os.environ.get("VOX_INT8"):
            q=0
            for name,mod in list(model.named_modules()):
                if name.startswith('audio_vae'): continue
                for cn,ch in list(mod.named_children()):
                    full=(name+'.' if name else '')+cn
                    if type(ch) is nn.Linear and ch.in_features*ch.out_features>=256*256 and full+'.weight' in keys:
                        ch.weight.data=f.get_tensor(full+'.weight').to(torch.bfloat16)
                        if ch.bias is not None and full+'.bias' in keys: ch.bias.data=f.get_tensor(full+'.bias').to(torch.bfloat16)
                        setattr(mod,cn,QLin(ch)); del ch; q+=1
                trim()
            print("quantized",q,file=sys.stderr)
        sd=dict(model.state_dict(keep_vars=True))
        for k in keys:
            if k in sd:
                t=f.get_tensor(k); sd[k].data.copy_(t.to(sd[k].dtype)); del t; n+=1
    gc.collect(); print("loaded tensors",n,file=sys.stderr)
    return model.to(model.device).eval().optimize(disable=not optimize)
V.VoxCPM2Model.from_local=classmethod(from_local_lowmem) if hasattr(V,'VoxCPM2Model') else None

import torch.nn as nn
def quantize(model, skip=('audio_vae',)):
    n=0
    for name,mod in list(model.named_modules()):
        if any(name.startswith(k) for k in skip): continue
        for cn,ch in list(mod.named_children()):
            if type(ch) is nn.Linear and ch.in_features*ch.out_features>=256*256:
                setattr(mod,cn,QLin(ch)); n+=1
        gc.collect()
    print("quantized",n,file=sys.stderr)
    return model
_orig=V.VoxCPM2Model.from_local
def _fl(cls,*a,**k):
    m=from_local_lowmem(cls,*a,**k)
    return m
V.VoxCPM2Model.from_local=classmethod(_fl)

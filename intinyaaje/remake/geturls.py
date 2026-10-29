import re,json,sys
T='/root/.claude/projects/-home-claude/68ed53ad-b0ed-55b5-a5a2-b775f3fa7a26.jsonl'
txt=open(T).read().replace('\\\\','\\')
urls={}
for m in re.finditer(r'content_generation/([A-Za-z0-9]+)/([A-Za-z0-9]+)/content\.mp3\?[^"\\ ]+',txt):
    urls[m.group(2)]=m.group(0)
want=dict(a.split('=') for a in sys.argv[1:])
import subprocess
for gid,out in want.items():
    u='https://storage.googleapis.com/xi-backend/database/workspace/9332f14a707d4a00a4c2461fa9760f38/'+urls[gid]
    u=u.replace('\\u0026','&')
    r=subprocess.run(['curl','-sS','-o',out,'-w','%{http_code}',u],capture_output=True,text=True);print(out,r.stdout)

"""Gemini TTS: tts.txt (tag emosi) -> wav. python3 gem.py <tts.txt> <out.wav> [voice] [model]"""
import sys,json,base64,subprocess,urllib.request,os,time
K=open('/home/claude/.secrets/gemini_key').read().strip()
src,out=sys.argv[1],sys.argv[2]; voice=sys.argv[3] if len(sys.argv)>3 else 'Puck'; model=sys.argv[4] if len(sys.argv)>4 else 'gemini-3.8-flash-tts'
txt=open(src).read().strip()
NOTE=("Bacakan narasi YouTube Shorts berbahasa Indonesia ini seperti pencerita muda yang asyik membedah fakta untuk temannya: "
      "jelas, percaya diri, ekspresif, tempo sedang agak cepat, pertanyaan benar-benar naik nadanya, ikuti tag emosi di dalam kurung siku. "
      "Ucapkan setiap kata dengan jelas, logat Indonesia (Jakarta santai), jangan membaca tag-nya.\n\n")
MODE=os.environ.get('GEM_MODE','sys')
if MODE=='sys':
    body={"systemInstruction":{"parts":[{"text":NOTE}]},"contents":[{"parts":[{"text":txt}]}],
      "generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice}}}}}
else:
    body={"contents":[{"parts":[{"text":NOTE.replace("\n\n","")+"\n\n### TRANSCRIPT\n"+txt}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice}}}}}
req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",data=json.dumps(body).encode(),headers={"x-goog-api-key":K,"Content-Type":"application/json"})
for a in range(3):
    try: r=json.load(urllib.request.urlopen(req,timeout=300)); break
    except urllib.error.HTTPError as e:
        msg=e.read().decode()[:400]; print('HTTP',e.code,msg)
        if e.code in (429,500,503) and a<2: time.sleep(20); continue
        sys.exit(1)
part=r['candidates'][0]['content']['parts'][0]['inlineData']
pcm=base64.b64decode(part['data']); rate=int(part.get('mimeType','rate=24000').split('rate=')[-1].split(';')[0]) if 'rate=' in part.get('mimeType','') else 24000
subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ar',str(rate),'-ac','1','-i','-',out],input=pcm,check=True)
print('OK',out,voice,model,r.get('usageMetadata',{}))

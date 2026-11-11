"""SUARA RESMI @intinyaaje (disetujui user 11 Nov 2026): Gemini TTS, suara Puck, 1 panggilan per video.
Pakai: python3 narrate.py <episode_dir>   -> <episode_dir>/voice.mp3 (dari script.txt, TANPA tag)
API key: /home/claude/.secrets/gemini_key (JANGAN masuk repo; minta ulang ke user tiap sesi baru).
Kuota gratis: 10 permintaan/hari PER MODEL -> otomatis pindah model kalau kena 429."""
import sys,json,base64,subprocess,urllib.request,os
VOICE="Puck"
MODELS=["gemini-3.1-flash-tts-preview","gemini-3.8-flash-tts","gemini-2.5-flash-preview-tts","gemini-2.5-pro-preview-tts","gemini-3.8-flash-lite-tts"]
STYLE=("Say in Indonesian like an energetic, curious young storyteller explaining a surprising fact to a friend, "
       "expressive with questions rising in pitch: ")
K=open('/home/claude/.secrets/gemini_key').read().strip()
ep=sys.argv[1].rstrip('/'); txt=open(f"{ep}/script.txt").read().strip()
out=sys.argv[2] if len(sys.argv)>2 else f"{ep}/voice.mp3"
body={"contents":[{"parts":[{"text":STYLE+txt}]}],
      "generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":VOICE}}}}}
for model in MODELS:
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        data=json.dumps(body).encode(),headers={"x-goog-api-key":K,"Content-Type":"application/json"})
    try:
        r=json.load(urllib.request.urlopen(req,timeout=300))
        pcm=base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data']); break
    except urllib.error.HTTPError as e:
        print(model,e.code,e.read().decode()[:160].replace('\n',' '),flush=True)
else: sys.exit("SEMUA MODEL KENA KUOTA - coba lagi besok")
subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ar','24000','-ac','1','-i','-',
  '-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5',
  '-ar','44100','-b:a','160k',out],input=pcm,check=True)
asr=out+'.asr.json'
if os.path.exists(asr): os.remove(asr)
print('OK',out,model,VOICE)

import json,sys
for ch in sys.argv[1:]:
    w=json.load(open(f'{ch}/words.json'))
    open(f'{ch}/words.js','w').write('const WORDS='+json.dumps(w,ensure_ascii=False)+';')
    open(f'{ch}/h.html','w').write(f'''<!doctype html><html><head><meta charset="utf-8"><style>html,body{{margin:0;padding:0;background:transparent;width:1920px;height:1080px;overflow:hidden}}canvas{{display:block}}</style>
<script src="../mapd.js"></script><script src="words.js"></script></head><body><canvas id="c" width="1920" height="1080"></canvas>
<script src="../hlib.js"></script><script src="../c_{ch}.js"></script></body></html>''')

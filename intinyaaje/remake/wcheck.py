import sys,re,difflib
sys.path.insert(0,'/home/claude/you-tube/intinyaaje/engine')
import asralign
def norm(w): return re.sub(r'[^a-z0-9]','',w.lower())
script=open(sys.argv[1]).read().split()
for a in sys.argv[2:]:
    ws=[norm(w['w'] if isinstance(w,dict) and 'w' in w else (w.get('word') if isinstance(w,dict) else w[0])) for w in asralign.asr_words(a)]
    ss=[norm(w) for w in script]
    sm=difflib.SequenceMatcher(None,ss,ws,autojunk=False)
    print('==',a,'ratio %.3f'%sm.ratio())
    for op,i1,i2,j1,j2 in sm.get_opcodes():
        if op!='equal': print(' ',op,ss[i1:i2],'->',ws[j1:j2])

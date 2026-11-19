import sys,glob
from PIL import Image,ImageDraw
d=sys.argv[1];fs=sorted(glob.glob(d+'/s_*.png'),key=lambda f:float(f.split('s_')[-1][:-4]))
n=len(fs);cols=3;rows=(n+cols-1)//cols;sh=Image.new('RGB',(640*cols,360*rows),(60,60,60))
for k,f in enumerate(fs):
    im=Image.open(f).convert('RGBA');bg=Image.new('RGBA',im.size,(40,90,40,255));bg.alpha_composite(im);t=bg.convert('RGB').resize((640,360));ImageDraw.Draw(t).text((560,8),f.split('s_')[-1][:-4],fill='yellow');sh.paste(t,((k%cols)*640,(k//cols)*360))
sh.save(d+'/sheet.jpg')

// e21 — Indonesia beneran nggak ada tornado?
ANIM.tornado=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='globe'){
    AL.cam(c,540,820,AL.mix(0.9,1.1,sm(P(t,0,T(12)))));
    c.fillStyle=AL.rg(c,540,800,50,1300,[[0,'#13284a'],[1,'#03060d']]);c.fillRect(-500,-500,2100,3000);
    for(let i=0;i<90;i++){c.fillStyle=`rgba(255,255,255,${.3+.5*AL.r(i,3)*(0.6+0.4*Math.sin(t*2+i))})`;c.fillRect(AL.r(i,1)*1600-260,AL.r(i,2)*1900,3,3)}
    AL.globe(c,t,540,820,330,{indo:-0.2,spin:.18});
    // tornado kecil berputar di dekat garis khatulistiwa (tanda tanya)
    const q=P(t,T(12),T(12)+0.4);if(q>0){AL.text(c,'AMAN?',540,1110,{size:70,color:'#ffd23f'})}
    const eq=P(t,T(10),T(10)+0.4);if(eq>0){c.globalAlpha=eq;AL.text(c,'GARIS KHATULISTIWA',540,560,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
  if(v==='kota'){
    const form=sm(P(t,T(27)-0.3,T(29))),move=P(t,T(27),T(47));
    const [sx,sy]=AL.shake(t,6*form);AL.cam(c,540+sx,800+sy,AL.mix(1.05,0.95,sm(P(t,T(16),T(27)))));
    const dark=sm(P(t,T(16),T(27)));
    AL.sky(c,`rgb(${AL.mix(110,40,dark)|0},${AL.mix(150,46,dark)|0},${AL.mix(190,58,dark)|0})`,`rgb(${AL.mix(190,95,dark)|0},${AL.mix(205,100,dark)|0},${AL.mix(215,105,dark)|0})`);
    AL.clouds(c,t,{y:170,n:12,s:220,v:30,col:dark>.3?['rgba(60,62,70,.97)','rgba(40,42,50,0)']:['rgba(255,255,255,.95)','rgba(230,230,240,0)']});
    AL.ground(c,1150,'#6f8a4a','#3a4a28');c.fillStyle='#555a5f';c.fillRect(-1200,1150,3500,50);
    // pabrik
    c.fillStyle='#9aa3ab';c.fillRect(-60,760,480,390);c.fillStyle='#7d868e';for(let k=0;k<4;k++){c.beginPath();c.moveTo(-60+k*120,760);c.lineTo(0+k*120,690);c.lineTo(60+k*120,760);c.fill()}
    c.fillStyle='#5f676e';c.fillRect(340,580,44,180);c.fillStyle='#7a838a';for(let k=0;k<3;k++)c.fillRect(-20+k*140,880,90,70);AL.text(c,'PABRIK',180,1050,{size:40,color:'#2a2f33'});
    // rumah
    const hx=[560,720,880,1040];hx.forEach((x,k)=>{AL.house(c,x-20,1150,150,150,{noRoof:t>T(30)+k*0.35,wall:['#e4d3b4','#d6e0e6','#e8c9b0','#d9d0c3'][k]})});
    AL.tree(c,470,1150,230,t,6+40*form);AL.tree(c,1010,1150,200,t,6+40*form);
    // corong bergerak dari kanan ke kiri
    const fx=AL.mix(980,330,move);
    AL.funnel(c,t,{x:fx+60,xb:fx,yTop:250,yBot:1150,wTop:380,wBot:80,I:form,wobble:60,spin:6,n:260,size:34,a:.32,col:'95,92,90'});
    // atap & seng beterbangan
    for(let i=0;i<14;i++){const tt=T(29)+i*0.18;if(t<tt)continue;const el=t-tt;const x0=i<5?(-60+i*100):(560+(i%4)*160+40);const a=el*2.4+i;const R=AL.mix(40,240,Math.min(1,el*.5));
      const x=AL.mix(x0,fx,Math.min(1,el*.8))+Math.cos(a)*R,y=AL.mix(i<5?760:1000,1150-el*300,Math.min(1,el*.8))+Math.sin(a)*R*.3;if(y<120)continue;
      c.save();c.translate(x,y);c.rotate(a*1.7);c.fillStyle=i<5?'#b7c0c7':'#a6452f';c.fillRect(-34,-10,68,20);c.restore()}
    const l1=P(t,T(9)+0.2,T(9)+0.6)*(1-P(t,T(16),T(16)+0.3));if(l1>0){c.setTransform(1,0,0,1,0,0);c.globalAlpha=l1;AL.text(c,'FEB 2024 · RANCAEKEK',90,560,{size:40,pill:true,align:'left',color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='bedah'){
    AL.cam(c,540,820,1);
    AL.sky(c,'#2c3442','#7d8794');AL.ground(c,1150,'#6d7f4a','#38452a');
    const g=sm(P(t,T(53),T(55)+0.5));
    AL.clouds(c,t,{y:330,n:10,s:240,v:16,col:['rgba(55,58,66,.98)','rgba(40,42,50,0)']});
    AL.funnel(c,t,{x:560,xb:520,yTop:380,yBot:1150,wTop:300,wBot:60,I:g,wobble:40,spin:5,n:240,size:30,a:.36,col:'100,98,96'});
    // panah putaran
    const rot=P(t,T(65),T(65)+0.4);if(rot>0){c.save();c.globalAlpha=rot;c.strokeStyle='#ffd23f';c.lineWidth=10;for(const yy of[560,780]){const w=yy<700?220:140;c.beginPath();c.ellipse(550,yy,w,w*.22,0,(t*4)%6.28,(t*4)%6.28+4.2);c.stroke()}c.restore()}
    const L=(txt,y,w)=>{const a=P(t,T(w),T(w)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,txt,860,y,{size:34,pill:true});c.globalAlpha=1}};
    L('AWAN BADAI',540,70);L('PUSARAN ANGIN',800,67);L('SAMPAI TANAH',1100,73);
    const sz=P(t,T(57),T(57)+0.4)*(1-P(t,T(65),T(65)+0.3));if(sz>0){c.globalAlpha=sz;AL.text(c,'PUTING BELIUNG = TORNADO KECIL',540,560,{size:36,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='banding'){
    AL.cam(c,540,820,1);
    AL.sky(c,'#3a4150','#9aa2ab');AL.ground(c,1150,'#7a8a52','#3d4a2a');c.fillStyle='rgba(255,255,255,.5)';c.fillRect(538,520,4,630);
    const big=sm(P(t,T(78),T(80))),small=sm(P(t,T(90),T(92)));
    AL.clouds(c,t,{y:380,n:7,s:200,v:10,col:['rgba(55,58,66,.98)','rgba(40,42,50,0)']});
    AL.funnel(c,t,{x:300,xb:270,yTop:420,yBot:1150,wTop:470,wBot:200,I:big,wobble:30,spin:4,n:300,size:44,a:.38,col:'90,88,86',seed:5});
    AL.funnel(c,t,{x:800,xb:790,yTop:420,yBot:1150,wTop:160,wBot:34,I:small,wobble:20,spin:7,n:140,size:20,a:.4,col:'110,108,104',seed:400});
    c.setTransform(1,0,0,1,0,0);
    if(big>0){c.globalAlpha=big;AL.text(c,'AMERIKA',270,580,{size:38,pill:true});AL.text(c,Math.round(AL.mix(0,300,sm(P(t,T(83),T(84)+0.6))))+' km/jam',270,700,{size:40,pill:true,color:'#ff8a5c'});
      if(t>T(88))AL.text(c,'± 1 JAM',270,790,{size:40,pill:true,color:'#fff'});c.globalAlpha=1}
    if(small>0){c.globalAlpha=small;AL.text(c,'INDONESIA',800,580,{size:38,pill:true});if(t>T(95))AL.text(c,'< 10 MENIT',800,700,{size:40,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    const rare=P(t,T(104),T(104)+0.4);if(rare>0){c.strokeStyle=`rgba(255,77,94,${rare})`;c.lineWidth=12;c.beginPath();c.arc(280,880,260*AL.mix(1.3,1,eb(rare)),0,6.283);c.stroke();c.globalAlpha=rare;AL.text(c,'YANG JARANG',280,1100,{size:34,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
};

// e39 Pesawat kok dicat putih? — adegan 3D + klip Pixabay
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,L3,T,I,WT,fin,pill,txt,C,X,W,rnd}=K;
 S.background=new THREE.Color('#bcd7ef');S.fog=new THREE.Fog('#bcd7ef',30,90);
 Object.assign(sun.shadow.camera,{left:-6,right:6,top:6,bottom:-6,near:0.5,far:30});sun.position.set(4,9,5);sun.shadow.camera.updateProjectionMatrix();
 // landasan
 const gc=document.createElement('canvas');gc.width=gc.height=512;const g=gc.getContext('2d');g.fillStyle='#7d8288';g.fillRect(0,0,512,512);for(let i=0;i<4000;i++){g.fillStyle=`rgba(${rnd(i)>.5?255:0},${rnd(i)>.5?255:0},${rnd(i)>.5?255:0},.05)`;g.fillRect(rnd(i+1)*512,rnd(i+2)*512,2,2)}
 g.fillStyle='#f2c230';g.fillRect(248,0,16,512);
 const gt=new THREE.CanvasTexture(gc);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(6,6);gt.colorSpace=THREE.SRGBColorSpace;gt.anisotropy=8;
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(120,120),new THREE.MeshStandardMaterial({map:gt,roughness:.85}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;S.add(ground);
 // logo fiktif di ekor
 function logoTex(name,bg,fg){const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,512,512);x.fillStyle=fg;x.beginPath();x.arc(256,200,110,0,7);x.fill();x.fillStyle=bg;x.beginPath();x.moveTo(170,230);x.quadraticCurveTo(256,120,350,170);x.lineTo(340,200);x.quadraticCurveTo(256,160,185,250);x.fill();
  x.fillStyle=fg;x.font='800 64px Poppins';x.textAlign='center';x.fillText(name,256,400);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
 const LOGOS=[logoTex('NUSA AIR','#1c4fa0','#ffd23f'),logoTex('AWAN JET','#d1342f','#ffffff'),logoTex('LANGIT','#0e8a6b','#ffffff')];
 // pesawat prosedural (sumbu panjang = x, hidung ke +x)
 function plane(col){const grp=new THREE.Group();const m=new THREE.MeshPhysicalMaterial({color:col,roughness:.35,clearcoat:.8,clearcoatRoughness:.2});const gray=new THREE.MeshStandardMaterial({color:'#b8bec6',roughness:.4,metalness:.5});const dark=new THREE.MeshStandardMaterial({color:'#15181d',roughness:.3});
  const prof=[[0,-2.05],[0.12,-2.0],[0.2,-1.85],[0.25,-1.5],[0.27,-1.0],[0.27,1.2],[0.24,1.6],[0.17,1.95],[0.08,2.15],[0,2.22]].map(p=>new THREE.Vector2(p[0],p[1]));
  const fus=new THREE.Mesh(new THREE.LatheGeometry(prof,64),m);fus.rotation.z=-Math.PI/2;fus.scale.set(1,1,1);fus.castShadow=fus.receiveShadow=true;grp.add(fus);
  // jendela
  const win=new THREE.InstancedMesh(new THREE.BoxGeometry(0.045,0.06,0.02),dark,60);const o=new THREE.Object3D();let n=0;for(const s of [1,-1])for(let i=0;i<30;i++){o.position.set(-1.35+i*0.09,0.06,s*0.262);o.updateMatrix();win.setMatrixAt(n++,o.matrix)}grp.add(win);
  const ck=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.05,0.42),dark);ck.position.set(1.93,0.1,0);ck.rotation.z=-0.35;grp.add(ck);
  // sayap
  const ws=new THREE.Shape();ws.moveTo(0.35,0);ws.lineTo(-0.35,0);ws.lineTo(-0.85,2.1);ws.lineTo(-0.55,2.1);ws.closePath();
  const wg=new THREE.ExtrudeGeometry(ws,{depth:0.04,bevelEnabled:false});
  for(const s of [1,-1]){const w=new THREE.Mesh(wg,m);w.rotation.x=s*Math.PI/2;w.rotation.y=0;w.position.set(0.1,-0.12,0);if(s<0){w.rotation.x=-Math.PI/2;w.position.y=-0.08}w.rotation.order='XYZ';w.castShadow=true;grp.add(w);
   const eng=new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.11,0.55,32),m);eng.rotation.z=Math.PI/2;eng.position.set(0.25,-0.28,s*0.75);eng.castShadow=true;grp.add(eng);
   const intake=new THREE.Mesh(new THREE.CircleGeometry(0.115,32),dark);intake.rotation.y=Math.PI/2;intake.position.set(0.53,-0.28,s*0.75);grp.add(intake);
   const pyl=new THREE.Mesh(new THREE.BoxGeometry(0.4,0.15,0.03),m);pyl.position.set(0.15,-0.17,s*0.75);grp.add(pyl)}
  // ekor
  const fs=new THREE.Shape();fs.moveTo(0,0);fs.lineTo(-0.75,0);fs.lineTo(-1.05,0.95);fs.lineTo(-0.75,0.95);fs.closePath();
  const finM=new THREE.Mesh(new THREE.ExtrudeGeometry(fs,{depth:0.04,bevelEnabled:false}),m);finM.position.set(-1.25,0.18,-0.02);finM.castShadow=true;grp.add(finM);
  const logoM=new THREE.MeshStandardMaterial({map:LOGOS[0],roughness:.4});const logoPl=[];for(const s of [1,-1]){const lp=new THREE.Mesh(new THREE.PlaneGeometry(0.62,0.62),logoM);lp.position.set(-1.62,0.62,s*0.03);if(s<0)lp.rotation.y=Math.PI;grp.add(lp);logoPl.push(lp)}
  const hs=new THREE.Shape();hs.moveTo(0,0);hs.lineTo(-0.4,0);hs.lineTo(-0.6,0.75);hs.lineTo(-0.45,0.75);hs.closePath();const hg=new THREE.ExtrudeGeometry(hs,{depth:0.03,bevelEnabled:false});
  for(const s of [1,-1]){const h=new THREE.Mesh(hg,m);h.rotation.x=s*Math.PI/2;h.position.set(-1.55,0.12+(s<0?0.03:0),0);h.castShadow=true;grp.add(h)}
  // roda
  for(const [x,z] of [[1.55,0],[-0.05,0.25],[-0.05,-0.25]]){const wh=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.07,0.06,20),dark);wh.rotation.x=Math.PI/2;wh.position.set(x,-0.36,z);grp.add(wh);const st=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,0.12,8),gray);st.position.set(x,-0.28,z);grp.add(st)}
  grp.position.y=0.43;grp.userData={m,logoM};return grp}
 const pw=add(plane('#f4f6f8')),pr=add(plane('#c8302b')),pw2=add(plane('#f4f6f8'));
 // matahari, sinar, partikel kilau
 const sunBall=add(new THREE.Mesh(new THREE.SphereGeometry(0.6,32,16),new THREE.MeshBasicMaterial({color:'#ffd23f'})));
 const rayM=new THREE.MeshBasicMaterial({color:'#ffb703',transparent:true,opacity:.75});const rays=[];for(let i=0;i<10;i++){const r=add(new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,1,8),rayM));rays.push(r)}
 const spark=add(new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.05),new THREE.MeshBasicMaterial({color:'#ffffff'}),40));
 const streak=add(new THREE.Mesh(new THREE.PlaneGeometry(1,0.05),new THREE.MeshBasicMaterial({color:'#2b1d0e',transparent:true,opacity:.85})));
 const tmp=new THREE.Object3D();
 function setRay(r,a,b){const d=new THREE.Vector3().subVectors(b,a);r.position.copy(a).addScaledVector(d,.5);r.scale.set(1,d.length(),1);r.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize())}
 const V=(x,y,z)=>new THREE.Vector3(x,y,z);
 // waktu
 const tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tSoal=T('soal lebih'),tMitos=T('itu mitos'),tPuluhan=T('puluhan ton'),tPertama=T('alasan pertama'),tPantul=T('memantulkan'),tKedua=T('kedua'),tTiga=T('tiga ratus ribu'),tKetiga=T('ketiga'),tGanti=T('ganti logo'),tBonus=T('bonusnya'),tJadi=WT(I('jadi pesawat'));
 const heat=new THREE.Color('#ff6a00');
 const scenes=[
  {t0:0,clip:true,ov:(t)=>{pill('HAMPIR SEMUA PUTIH?',W/2,520,36,C.DARK,'#fff',fin(t,0.4))}},
  {t0:tKata,d3:(t,lt)=>{show(pw,spark);pw.position.set(0,0.43,0);pw.rotation.y=0.6+lt*0.12;look([3.2,1.4,3.6],[0,0.6,0],lerp(2.3,1.9,ez(lt/4)));spark.visible=false},
   ov:(t)=>{pill('KATA ORANG: BIAR RINGAN',W/2,520,32,C.DARK,'#fff',fin(t,tKata));pill('IRIT BAHAN BAKAR?',W/2,610,30,C.YEL,'#111',fin(t,T('irit')-.1))}},
  {t0:tAda,d3:(t,lt)=>{show(pw,spark);pw.rotation.y=0.6+(t-tKata)*0.12;look([3.2,1.4,3.6],[0,0.6,0],lerp(1.9,1.5,ez(lt/3)));
    for(let i=0;i<40;i++){const ph=(lt*0.8+rnd(i))%1;tmp.position.set(-2+rnd(i+3)*4,0.3+rnd(i+5)*0.9,(rnd(i+7)-.5)*1.2);tmp.scale.setScalar(Math.sin(ph*Math.PI)*1.2);tmp.rotation.y=lt*3;tmp.updateMatrix();spark.setMatrixAt(i,tmp.matrix)}spark.instanceMatrix.needsUpdate=true},
   ov:(t)=>pill('KATA LAINNYA: BIAR BERSIH',W/2,520,32,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{show(pw);pw.rotation.y=Math.PI*0.5+0.35*Math.sin(lt);look([3.4,1.0,0.6],[0.6,0.55,0],1.5)},
   ov:(t)=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tSoal,d3:(t,lt)=>{show(pw,pr);pw.position.set(0,0.43,-1.4);pr.position.set(0,0.43,1.4);pw.rotation.y=pr.rotation.y=0.35;look([4.5,2.2,4.2],[0,0.5,0],2.1-0.04*lt)},
   ov:(t)=>{pill('MITOS',W/2,500,48,C.RED,'#fff',fin(t,tMitos-.1));if(t>tPuluhan-1.6){pill('BEDA BERAT CAT: KECIL',W/2,610,30,C.DARK,'#fff',fin(t,tPuluhan-1.6));pill('PESAWAT: PULUHAN TON',W/2,700,34,C.YEL,'#111',fin(t,tPuluhan-.1))}}},
  {t0:tPertama,d3:(t,lt)=>{show(pw,pr,sunBall,...rays);pw.position.set(0,0.43,-1.4);pr.position.set(0,0.43,1.4);pw.rotation.y=pr.rotation.y=0.35;
    sunBall.position.set(-1.5,4.2,0);const k=ez((t-tPantul+0.5)/1.2);
    rays.forEach((r,i)=>{r.visible=(i%5)%2==0;const z=i<5?-1.4:1.4,x=-1.2+(i%5)*0.6;const hit=V(x,0.75,z);const a=V(-1.5+((i%5)-2)*0.12,4.0,0);const p=cl((lt-0.3-i*0.05)/0.6);setRay(r,a,a.clone().lerp(hit,p));if(i<5&&k>0){r.scale.y+=0}});
    // pantulan dari pesawat putih: sinar balik
    if(k>0)rays.slice(0,5).forEach((r,i)=>{const x=-1.2+i*0.6;const hit=V(x,0.75,-1.4);setRay(r,hit,hit.clone().add(V(-0.6,3.2*k,-1.2)))});
    const h=cl((lt-0.6)/3);pr.userData.m.emissive=heat;pr.userData.m.emissiveIntensity=0.55*h*(0.85+0.15*Math.sin(lt*6));pw.userData.m.emissiveIntensity=0;
    look([5.5,3.0,3.2],[0,1.4,0],2.0)},
   ov:(t,lt)=>{const h=cl((lt-0.6)/3);pill('PUTIH: MEMANTULKAN',W/2,500,30,'#fff','#111',fin(t,tPantul-.2));
    const bar=(y,lab,v,col)=>{txt(lab,250,y,26,'#fff',{al:'left',w:800});X.save();X.fillStyle='rgba(0,0,0,.35)';X.fillRect(470,y-14,360,28);X.fillStyle=col;X.fillRect(470,y-14,360*v,28);X.restore()};
    if(lt>0.6){bar(590,'CAT PUTIH',0.25+0.1*h,C.GRN);bar(640,'CAT BERWARNA',0.25+0.7*h,C.RED)}}},
  {t0:tKedua,d3:(t,lt)=>{show(pr);pr.userData.m.emissiveIntensity=0;pr.position.set(0,0.43,0);pr.rotation.y=0.5+lt*0.08;const f=ez((lt-0.5)/2.5);pr.userData.m.color.set('#c8302b').lerp(new THREE.Color('#d9a19b'),f*0.8);pr.userData.m.clearcoat=0.8*(1-f);look([3.0,1.3,3.4],[0,0.6,0],1.9)},
   ov:(t)=>{pill('CAT BERWARNA CEPAT PUDAR',W/2,500,30,C.DARK,'#fff',fin(t,tKedua));if(t>tTiga-1.8){txt('NGECAT ULANG 1 PESAWAT',W/2,610,32,'#fff',{a:fin(t,tTiga-1.8)});txt('s/d $300.000',W/2,690,70,C.YEL,{a:fin(t,tTiga-.1)})}}},
  {t0:tKetiga,d3:(t,lt)=>{show(pw2);pr.userData.m.color.set('#c8302b');pw2.position.set(0,0.43,0);pw2.rotation.y=-0.9;const li=t<tGanti-.3?0:Math.min(2,1+Math.floor((t-tGanti+.3)/0.55));pw2.userData.logoM.map=LOGOS[li];look([-3.0,1.3,2.6],[-1.3,0.9,0],lerp(1.6,1.05,ez(lt/2)))},
   ov:(t)=>{pill('±50% PESAWAT = SEWAAN',W/2,500,32,C.YEL,'#111',fin(t,tKetiga));if(t>tGanti-.3)pill('BADAN PUTIH: CUKUP GANTI LOGO',W/2,600,28,C.DARK,'#fff',fin(t,tGanti-.3))}},
  {t0:tBonus,d3:(t,lt)=>{show(pw,streak);pw.position.set(0,0.43,0);pw.rotation.y=0;pw.userData.m.emissiveIntensity=0;const k=ez((lt-0.4)/1.4);streak.position.set(0.0-0.45*k,0.33,0.272);streak.scale.set(Math.max(0.01,0.9*k),1.6,1);look([0.9,0.35,2.2],[-0.3,0.4,0.27],1.0)},
   ov:(t)=>pill('REMBESAN OLI LANGSUNG KELIHATAN',W/2,500,28,C.DARK,'#fff',fin(t,tBonus+.3))},
  {t0:tJadi,clip:true}
 ];
 const END=WT(K.WORDS.length-1)+1.2;
 return {scenes,cardAt:tJadi-.2,card:['BUKAN BIAR RINGAN','TAPI BIAR ADEM, AWET','& GAMPANG GANTI PEMILIK'],
  clips:[{t0:0,t1:tKata,src:'clip/v3586.mp4',ss:2},{t0:tJadi,t1:END,src:'clip/v3586.mp4',ss:30}]};
}

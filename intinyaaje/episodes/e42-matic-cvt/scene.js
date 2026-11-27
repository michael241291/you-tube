// e42 Motor matic kok nggak ada gigi? — 3D CVT (2 puli + sabuk + roller + kopling sentrifugal)
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 for(const n of ['p237205','p7805450'])loadImg(n,`/${K.EP}/img/${n}.jpg`);
 S.background=new THREE.Color('#1b2230');S.fog=null;
 Object.assign(sun.shadow.camera,{left:-4,right:4,top:4,bottom:-4,near:0.5,far:20});sun.position.set(2,5,6);
 const metal=new THREE.MeshStandardMaterial({color:'#c9ced6',metalness:.85,roughness:.28,transparent:true});
 const dark=new THREE.MeshStandardMaterial({color:'#2a2f38',metalness:.5,roughness:.5});
 const beltM=new THREE.MeshStandardMaterial({color:'#15171b',roughness:.7});
 const orange=new THREE.MeshStandardMaterial({color:'#ff8a1f',metalness:.3,roughness:.35});
 const red=new THREE.MeshStandardMaterial({color:'#c0392b',roughness:.5});
 const X1=-1.15,X2=1.15;
 // puli = dua piringan (z = ±gap/2) + tanda putar
 function pulley(x,R){const g=new THREE.Group();g.position.set(x,0,0);const a=new THREE.Mesh(new THREE.CylinderGeometry(R,R*0.35,0.09,64),metal);a.rotation.x=Math.PI/2;const b=a.clone();b.rotation.x=-Math.PI/2;
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,0.6,24),dark);hub.rotation.x=Math.PI/2;g.add(a,b,hub);
  const marks=[];for(const d of [a,b]){const m=new THREE.Mesh(new THREE.BoxGeometry(R*0.8,0.04,0.02),orange);m.position.x=R*0.5;const piv=new THREE.Group();piv.add(m);d.add(piv);marks.push(piv)}
  g.userData={a,b,R};return g}
 const P1=add(pulley(X1,0.62)),P2=add(pulley(X2,0.72));
 const setGap=(P,gap)=>{P.userData.a.position.z=gap/2+0.045;P.userData.b.position.z=-gap/2-0.045};
 // sabuk: hull dua lingkaran -> tube
 let belt=null;add(new THREE.Group());
 function setBelt(r1,r2){const pts=[];for(let i=0;i<120;i++){const t=i/120*Math.PI*2;pts.push([X1+r1*Math.cos(t),r1*Math.sin(t)],[X2+r2*Math.cos(t),r2*Math.sin(t)])}
  pts.sort((p,q)=>p[0]-q[0]||p[1]-q[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];for(const p of pts){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}for(const p of pts.slice().reverse()){while(up.length>=2&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}
  const hull=lo.slice(0,-1).concat(up.slice(0,-1));const curve=new THREE.CatmullRomCurve3(hull.map(p=>new THREE.Vector3(p[0],p[1],0)),true);
  if(belt){S.remove(belt);belt.geometry.dispose()}belt=new THREE.Mesh(new THREE.TubeGeometry(curve,240,0.045,8,true),beltM);belt.castShadow=true;S.add(belt);K.all.push(belt)}
 // roller di puli depan
 const rollers=[];for(let i=0;i<6;i++){const r=new THREE.Mesh(new THREE.SphereGeometry(0.07,20,12),orange);P1.add(r);rollers.push(r)}
 const setRollers=(rr,ang)=>rollers.forEach((r,i)=>{const a=ang+i*Math.PI/3;r.position.set(rr*Math.cos(a),rr*Math.sin(a),0)});
 // bak CVT (penutup)
 const caseM=new THREE.MeshStandardMaterial({color:'#3a3f48',metalness:.4,roughness:.5,transparent:true});
 const boxCase=add(new THREE.Mesh(new THREE.CapsuleGeometry(0.9,2.3,8,32),caseM));boxCase.rotation.z=Math.PI/2;boxCase.scale.set(1,1,0.45);
 // roda belakang (ikut puli belakang lewat kopling)
 const wheel=add(new THREE.Group());const tire=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.17,20,60),new THREE.MeshStandardMaterial({color:'#1a1a1a',roughness:.85}));const rim=new THREE.Mesh(new THREE.CylinderGeometry(0.62,0.62,0.12,40),dark);rim.rotation.x=Math.PI/2;
 const spokes=[];for(let i=0;i<5;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.08,0.14),new THREE.MeshStandardMaterial({color:'#9aa3af',metalness:.6,roughness:.3}));s.rotation.z=i*Math.PI/5;spokes.push(s)}
 wheel.add(tire,rim,...spokes);wheel.position.set(X2,0,-0.9);
 // kopling sentrifugal: rumah kopling + 3 kampas
 const clutch=add(new THREE.Group());const drum=new THREE.Mesh(new THREE.CylinderGeometry(0.75,0.75,0.25,64,1,true),new THREE.MeshStandardMaterial({color:'#9aa3af',metalness:.8,roughness:.3,side:THREE.DoubleSide}));drum.rotation.x=Math.PI/2;clutch.add(drum);
 const plate=new THREE.Group();clutch.add(plate);const shoes=[];for(let i=0;i<3;i++){const sh=new THREE.Mesh(new THREE.TorusGeometry(0.55,0.07,10,30,Math.PI*0.5),red);const piv=new THREE.Group();piv.rotation.z=i*Math.PI*2/3;piv.add(sh);plate.add(piv);shoes.push(sh)}
 const hubC=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.3,24),dark);hubC.rotation.x=Math.PI/2;plate.add(hubC);
 const L1=I('waktu gas ditarik');const tGas=WT(L1),tRoller=T('di dalamnya ada roller'),tDorong=T('roller ini mendorong'),tBelakang=T('di belakang, sabuk'),tHasil=T('hasilnya'),tKenapa=T('terus kenapa'),tKopling=T('ada kopling'),tPutaran=T('di putaran rendah'),tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tBak=T('di dalam bak'),tJadi=WT(I('jadi motor matic'));
 // state CVT: k=0 (gas lepas) .. 1 (gas penuh)
 let ang1=0,ang2=0,wAng=0,lastT=0,rpmK=0;
 function cvt(t,k,{showCase=0,wheelOn=false,cut=0}={}){const dt=Math.max(0,Math.min(0.1,t-lastT));lastT=t;
  const r1=lerp(0.24,0.55,k),r2=lerp(0.66,0.36,k);setGap(P1,lerp(0.22,0.06,k));setGap(P2,lerp(0.06,0.22,k));setBelt(r1,r2);
  const w1=lerp(4,16,Math.max(k,0.15));ang1+=w1*dt;ang2+=w1*dt*r1/r2;P1.userData.a.rotation.y=P1.userData.b.rotation.y=0;
  P1.rotation.z=-ang1;P2.rotation.z=-ang2;setRollers(lerp(0.16,0.42,k),0);metal.opacity=1-cut*0.6;metal.depthWrite=cut<0.5;caseM.opacity=showCase;boxCase.visible=showCase>0.01;caseM.depthWrite=showCase>0.99;
  if(wheelOn){wAng+=w1*dt*r1/r2;wheel.rotation.z=-wAng}}
 const lookV=(p,tg,f)=>{look(p,tg,f);cam.rotateZ(Math.PI/2)};
 const lab=(s,x,y,a,col='#fff',bg=C.DARK)=>pill(s,x,y,26,bg,col,a);
 const scenes=[
  {t0:0,photo:'p237205',ov:t=>pill('MOTOR MATIC: NGGAK ADA PEDAL GIGI',W/2,520,30,C.DARK,'#fff',fin(t,.4))},
  {t0:tKata,d3:(t,lt)=>{show(P1,P2,belt,boxCase);cvt(t,0.2,{showCase:1});lookV([0.85,1.6,5.2],[0.55,0,0],lerp(1.75,1.6,ez(lt/3)))},ov:t=>{pill('KATA ORANG: GIGINYA PINDAH SENDIRI',W/2,520,28,C.DARK,'#fff',fin(t,tKata));txt('BAK CVT',W/2,1180,44,'#fff',{a:fin(t,tKata+.5)})}},
  {t0:tAda,photo:'p7805450',ov:t=>pill('KATA LAINNYA: CUMA PUNYA 1 GIGI',W/2,520,30,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{show(P1,P2,belt,boxCase);cvt(t,0.2,{showCase:1});lookV([0.95,0.6,4.8],[0.55,0,0],1.7)},ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tBak,d3:(t,lt)=>{show(P1,P2,belt,boxCase);cvt(t,0.2,{showCase:1-ez(lt/1.2)});lookV([0.85,1.4,5.0],[0.55,0,0],1.7)},
   ov:t=>{lab('DUA PULI + 1 SABUK',W/2,820,fin(t,tBak+.8),'#111',C.YEL);lab('PULI DEPAN = MESIN',820,560,fin(t,T('puli depan nempel')-.2));lab('PULI BELAKANG = RODA',800,1080,fin(t,T('puli belakang')-.2))}},
  {t0:tGas,d3:(t,lt)=>{show(P1,P2,belt,...rollers);const k=t<tDorong?0.15:ez((t-tDorong)/2.4)*0.85+0.15;cvt(t,k,{cut:t>tRoller-.3?1:0});lookV([-0.6,0.9,3.6],[X1,0,0],1.15)},
   ov:(t)=>{pill('GAS DITARIK',W/2,520,32,C.YEL,'#111',fin(t,tGas));if(t>tRoller-.3)lab('ROLLER = BOLA PEMBERAT',W/2,610,fin(t,tRoller-.3));if(t>tDorong-.2)lab('DINDING PULI MERAPAT → SABUK NAIK',W/2,690,fin(t,tDorong-.2),'#06210f',C.GRN)}},
  {t0:tBelakang,d3:(t,lt)=>{show(P1,P2,belt,...rollers,wheel);cvt(t,1,{wheelOn:true});lookV([1.4,1.6,4.8],[0.9,0,-0.3],1.7)},ov:t=>{lab('BELAKANG: SABUK TURUN',W/2,520,fin(t,tBelakang));if(t>tHasil-.2){lab('RODA MAKIN CEPAT',W/2,610,fin(t,tHasil-.2),'#111',C.YEL);lab('MULUS, TANPA HENTAKAN',W/2,700,fin(t,T('tanpa hentakan')-.2),'#06210f',C.GRN)}}},
  {t0:tKenapa,d3:(t,lt)=>{show(clutch);clutch.position.set(0,0,0);const on=t>tPutaran+2.2;const k=on?ez((t-tPutaran-2.2)/1):0;shoes.forEach(s=>{s.position.set(lerp(0,0.11,k)*1,0,0)});
    shoes.forEach((s,i)=>{const a=i*Math.PI*2/3+Math.PI*0.25;s.parent.rotation.z=i*Math.PI*2/3;s.position.set(lerp(0,0.11,k)*Math.cos(Math.PI*0.25),lerp(0,0.11,k)*Math.sin(Math.PI*0.25),0)});
    plate.rotation.z-=0.18;drum.rotation.y=on?plate.rotation.z:0;clutch.rotation.set(0.25,-0.35,0);look([0,0.4,3.2],[0,0,0],1.35)},
   ov:t=>{pill('MESIN NYALA, MOTOR DIAM?',W/2,520,30,C.DARK,'#fff',fin(t,tKenapa));if(t>tKopling-.2)lab('KOPLING SENTRIFUGAL',W/2,610,fin(t,tKopling-.2),'#111',C.YEL);if(t>tPutaran-.2)lab('PUTARAN RENDAH: KAMPAS BELUM MENGEMBANG',W/2,700,fin(t,tPutaran-.2));if(t>tPutaran+2.2)lab('GAS DITAMBAH: KAMPAS MENJEPIT → RODA IKUT',W/2,790,fin(t,tPutaran+2.2),'#06210f',C.GRN)}},
  {t0:tJadi,d3:(t,lt)=>{show(P1,P2,belt,...rollers);cvt(t,0.5+0.45*Math.sin(lt*1.4),{});lookV([0.85,1.4,5.0],[0.1,0,0],2.3)}}
 ];
 return {scenes,cardAt:tJadi-.2,card:['BUKAN GANTI GIGI OTOMATIS','TAPI 2 PULI YANG','MEMBESAR & MENGECIL'],clips:[]};
}

// e40 Punuk Boeing 747 buat apa? — 3D jumbo jet + foto Pixabay
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 for(const n of ['p884408','p867505','p7159144'])loadImg(n,`/${K.EP}/img/${n}.jpg`);
 S.background=new THREE.Color('#c3dcf2');S.fog=new THREE.Fog('#c3dcf2',30,90);
 Object.assign(sun.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:0.5,far:30});sun.position.set(4,9,5);
 const gc=document.createElement('canvas');gc.width=gc.height=512;const g=gc.getContext('2d');g.fillStyle='#80858b';g.fillRect(0,0,512,512);for(let i=0;i<4000;i++){g.fillStyle=`rgba(255,255,255,${rnd(i)*.06})`;g.fillRect(rnd(i+1)*512,rnd(i+2)*512,2,2)}g.fillStyle='#f2c230';g.fillRect(248,0,14,512);
 const gt=new THREE.CanvasTexture(gc);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(6,6);gt.colorSpace=THREE.SRGBColorSpace;
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(120,120),new THREE.MeshStandardMaterial({map:gt,roughness:.85}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;S.add(ground);
 const M=(c,o={})=>new THREE.MeshPhysicalMaterial({color:c,roughness:.35,clearcoat:.7,clearcoatRoughness:.2,...o});
 const body=M('#f4f6f8',{transparent:true}),dark=new THREE.MeshStandardMaterial({color:'#15181d',roughness:.3}),blue=M('#1f4e9c');
 const humpM=M('#f4f6f8',{transparent:true,side:THREE.DoubleSide});
 // ---- jumbo jet (hidung ke +x), panjang ±5,4
 const J=new THREE.Group();J.position.y=0.55;add(J);
 const mainP=[[0,-2.6],[0.14,-2.55],[0.24,-2.35],[0.31,-1.9],[0.34,-1.3],[0.34,1.9]].map(p=>new THREE.Vector2(p[0],p[1]));
 const fus=new THREE.Mesh(new THREE.LatheGeometry(mainP,64),body);fus.rotation.z=-Math.PI/2;fus.castShadow=true;J.add(fus);
 const stripe=new THREE.Mesh(new THREE.CylinderGeometry(0.343,0.343,4.1,64,1,true,Math.PI*0.42,Math.PI*0.16),blue);stripe.rotation.z=-Math.PI/2;stripe.position.x=-0.25;J.add(stripe);
 const stripe2=stripe.clone();stripe2.rotation.x=Math.PI;J.add(stripe2);
 // hidung (engsel di atas, x=1.9)
 const noseP=[[0.34,0],[0.33,0.25],[0.29,0.45],[0.21,0.62],[0.1,0.72],[0,0.75]].map(p=>new THREE.Vector2(p[0],p[1]));
 const hinge=new THREE.Group();hinge.position.set(1.9,0.3,0);J.add(hinge);
 const nose=new THREE.Mesh(new THREE.LatheGeometry(noseP,64),body);nose.rotation.z=-Math.PI/2;nose.position.set(0,-0.3,0);nose.castShadow=true;hinge.add(nose);
 // punuk
 const hump=new THREE.Mesh(new THREE.SphereGeometry(0.3,48,24,0,Math.PI*2,0,Math.PI/2),humpM);hump.scale.set(4.0,1.15,0.85);hump.position.set(1.0,0.18,0);hump.castShadow=true;J.add(hump);
 const hwin=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,0.3),dark);hwin.position.set(2.1,0.42,0);hwin.rotation.z=-0.7;J.add(hwin);
 // jendela kabin
 const win=new THREE.InstancedMesh(new THREE.BoxGeometry(0.05,0.065,0.02),dark,90);const o=new THREE.Object3D();let n=0;for(const s of [1,-1])for(let i=0;i<45;i++){o.position.set(-2.0+i*0.085,0.07,s*0.335);o.updateMatrix();win.setMatrixAt(n++,o.matrix)}J.add(win);
 // kokpit (kotak merah/hijau untuk penjelasan)
 const ckM=new THREE.MeshStandardMaterial({color:'#ffd23f',emissive:'#ffb703',emissiveIntensity:.5});const cockpit=new THREE.Mesh(new THREE.BoxGeometry(0.32,0.2,0.28),ckM);J.add(cockpit);
 // lounge (kursi bulat) di punuk
 const lounge=new THREE.Group();J.add(lounge);for(let i=0;i<6;i++){const st=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.06,16),M('#c0392b'));st.position.set(0.3+i*0.17,0.38,(i%2?1:-1)*0.09);lounge.add(st)}
 const bar=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.07,0.06),M('#8a5a2b'));bar.position.set(0.55,0.38,0);lounge.add(bar);
 // sayap, mesin, ekor
 const ws=new THREE.Shape();ws.moveTo(0.5,0);ws.lineTo(-0.45,0);ws.lineTo(-1.2,2.6);ws.lineTo(-0.85,2.6);ws.closePath();const wg=new THREE.ExtrudeGeometry(ws,{depth:0.045,bevelEnabled:false});
 for(const s of [1,-1]){const w=new THREE.Mesh(wg,body);w.rotation.x=s*Math.PI/2;w.position.set(0.0,-0.15+(s<0?0.045:0),0);w.castShadow=true;J.add(w);
  for(const [ex,ez_] of [[0.1,0.85],[-0.35,1.6]]){const e=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.1,0.5,32),body);e.rotation.z=Math.PI/2;e.position.set(ex,-0.31,s*ez_);e.castShadow=true;J.add(e);const it=new THREE.Mesh(new THREE.CircleGeometry(0.105,32),dark);it.rotation.y=Math.PI/2;it.position.set(ex+0.26,-0.31,s*ez_);J.add(it)}}
 const fs=new THREE.Shape();fs.moveTo(0,0);fs.lineTo(-0.85,0);fs.lineTo(-1.25,1.15);fs.lineTo(-0.9,1.15);fs.closePath();const fin3=new THREE.Mesh(new THREE.ExtrudeGeometry(fs,{depth:0.045,bevelEnabled:false}),blue);fin3.position.set(-1.6,0.2,-0.022);fin3.castShadow=true;J.add(fin3);
 const hs=new THREE.Shape();hs.moveTo(0,0);hs.lineTo(-0.45,0);hs.lineTo(-0.75,0.9);hs.lineTo(-0.55,0.9);hs.closePath();const hg=new THREE.ExtrudeGeometry(hs,{depth:0.035,bevelEnabled:false});for(const s of [1,-1]){const h=new THREE.Mesh(hg,body);h.rotation.x=s*Math.PI/2;h.position.set(-1.9,0.1+(s<0?0.035:0),0);J.add(h)}
 for(const [x,z] of [[1.7,0],[-0.1,0.3],[-0.1,-0.3],[-0.45,0.3],[-0.45,-0.3]]){const wh=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.08,20),dark);wh.rotation.x=Math.PI/2;wh.position.set(x,-0.45,z);J.add(wh);const st=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,0.15,8),dark);st.position.set(x,-0.36,z);J.add(st)}
 // peti kemas
 const boxes=[];const cols=['#e07a1f','#2b8a6e','#c0392b','#3b5ea8'];for(let i=0;i<4;i++){const b=(new THREE.Mesh(new THREE.BoxGeometry(0.5,0.42,0.42),new THREE.MeshStandardMaterial({color:cols[i],roughness:.6})));b.castShadow=true;J.add(b);b.visible=false;boxes.push(b)}
 const xMark=add(new THREE.Group());for(const r of [0.8,-0.8]){const bar_=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.07,0.07),new THREE.MeshBasicMaterial({color:'#ff4d4d'}));bar_.rotation.z=r;xMark.add(bar_)}
 const V=(x,y,z)=>new THREE.Vector3(x,y,z);
 function pose({nose:a=0,cut=false,hump:hv=1,ck=null,lg=false}){hinge.rotation.z=a;body.opacity=cut?0.28:1;body.depthWrite=!cut;humpM.opacity=hv*(cut?0.35:1);humpM.depthWrite=!cut&&hv>=1;hump.visible=hv>0.01;hwin.visible=hv>0.5;
  cockpit.visible=!!ck;if(ck)cockpit.position.set(...ck);lounge.visible=lg}
 const tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tTahun=T('tahun enam'),tJadi1=T('jadi jumbo'),tCara=T('caranya'),tPeti=T('peti kemas'),tMasalah=T('masalahnya'),tKalau=T('kalau hidungnya'),tSolusi=T('solusinya'),tPunuk=T('dan punuk'),tRuang=T('ruang di belakang'),tKursi=T('kursi penumpang'),tPeswat=T('pesawat supersoniknya'),tVersi=T('tapi versi'),tJadi=WT(I('jadi punuk'));
 const boxRun=(t,t0)=>{boxes.forEach((b,i)=>{b.visible=true;const k=ez((t-t0-i*0.5)/1.6);b.position.set(lerp(3.4+i*0.6,1.4-i*0.55,k),0.0,0)})};const boxOff=()=>boxes.forEach(b=>b.visible=false);
 const scenes=[
  {t0:0,photo:'p884408',ov:t=>pill('PUNUK BOEING 747',W/2,520,36,C.DARK,'#fff',fin(t,.3))},
  {t0:tKata,d3:(t,lt)=>{show(J);boxOff();pose({});J.rotation.y=0.7+lt*0.08;look([3.5,1.8,4.2],[0.3,0.8,0],1.9)},ov:t=>pill('KATA ORANG: KELAS BISNIS MEWAH',W/2,520,30,C.DARK,'#fff',fin(t,tKata))},
  {t0:tAda,d3:(t,lt)=>{show(J);boxOff();pose({});J.rotation.y=0.7+(t-tKata)*0.08;look([2.4,1.6,2.2],[1.2,1.0,0],lerp(1.9,1.4,ez(lt/3)))},ov:t=>pill('KATA LAINNYA: KAMAR TIDUR PILOT',W/2,520,30,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{show(J);boxOff();pose({});J.rotation.y=Math.PI/2+0.4+0.25*Math.sin(lt);look([3.0,1.3,0.5],[0.8,0.85,0],1.7)},ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tTahun,photo:'p7159144',ov:t=>{pill('1960-AN',W/2,500,40,C.YEL,'#111',fin(t,tTahun));pill('PESAWAT SUPERSONIK BAKAL GANTIKAN?',W/2,600,28,C.DARK,'#fff',fin(t,T('pesawat supersonik')-.1))}},
  {t0:tJadi1,d3:(t,lt)=>{show(J);pose({});J.rotation.y=0.5;boxes.forEach((b,i)=>{b.visible=true;b.position.set(3.2+i*0.62,-0.34,0.9)});look([4.5,2.0,4.6],[1.4,0.7,0.4],2.0)},ov:t=>pill('SIAP JADI PESAWAT KARGO',W/2,520,32,C.YEL,'#111',fin(t,tJadi1+.3))},
  {t0:tCara,d3:(t,lt)=>{show(J);J.rotation.y=0.35;pose({nose:0.95*ez((t-tCara-.6)/1.6),cut:t>tPeti-.4});boxRun(t,Math.max(tPeti-.6,t+1e-3>tPeti-.6?tPeti-.6:1e9));look([5.5,2.2,3.6],[2.0,0.8,0],1.6)},ov:t=>{pill('HIDUNG DIBUKA KE ATAS',W/2,520,32,C.DARK,'#fff',fin(t,tCara+.5));if(t>tPeti-.4)pill('PETI KEMAS MASUK LURUS',W/2,610,30,C.YEL,'#111',fin(t,tPeti-.4))}},
  {t0:tMasalah,d3:(t,lt)=>{show(J,xMark);boxOff();J.rotation.y=0.35;const up=t>tKalau?0.95*ez((t-tKalau)/1.2):0;pose({nose:up,cut:true,hump:0,ck:[2.15,0.05,0]});
    // kokpit ikut terangkat bersama hidung (mustahil) -> tanda X
    const p=V(0.25,-0.25,0).applyAxisAngle(V(0,0,1),up);cockpit.position.set(1.9+p.x,0.3+p.y,0);xMark.visible=t>tKalau+0.8;xMark.position.copy(J.localToWorld(cockpit.position.clone()).add(V(0,0.35,0.3)));xMark.lookAt(cam.position);
    look([4.2,1.6,3.4],[1.9,0.7,0],1.35)},ov:t=>{pill('KOKPIT ADA DI HIDUNG',W/2,520,32,C.DARK,'#fff',fin(t,tMasalah+.4));if(t>tKalau+.6)pill('HIDUNG DIANGKAT = KOKPIT IKUT?',W/2,610,28,C.RED,'#fff',fin(t,tKalau+.6))}},
  {t0:tSolusi,d3:(t,lt)=>{show(J);boxOff();J.rotation.y=0.35;const k=ez((lt-0.3)/1.6);pose({nose:0,cut:true,hump:t>tPunuk-.3?ez((t-tPunuk+.3)/1.2):0,ck:[lerp(2.15,1.8,k),lerp(0.05,0.4,k),0]});look([4.2,1.8,3.4],[1.6,0.85,0],1.35)},
   ov:t=>{pill('KOKPIT NAIK KE ATAS KABIN',W/2,520,30,C.GRN,'#06210f',fin(t,tSolusi+.3));if(t>tPunuk-.3)pill('PUNUK = PEMBUNGKUSNYA',W/2,610,32,C.YEL,'#111',fin(t,tPunuk-.3))}},
  {t0:tRuang,d3:(t,lt)=>{show(J);boxOff();J.rotation.y=0.6;pose({cut:true,hump:1,ck:[1.8,0.4,0],lg:true});look([2.6,1.6,2.4],[1.0,0.9,0],1.75)},ov:t=>{pill('AWALNYA: LOUNGE & BAR',W/2,520,32,C.DARK,'#fff',fin(t,tRuang+.5));if(t>tKursi-.8)pill('LALU: KURSI PENUMPANG',W/2,610,30,C.YEL,'#111',fin(t,tKursi-.8))}},
  {t0:tPeswat,photo:'p867505',dir:-1,ov:t=>pill('VERSI KARGO 747',W/2,520,34,C.YEL,'#111',fin(t,tVersi))},
  {t0:tVersi+1.2,d3:(t,lt)=>{show(J);J.rotation.y=0.35;pose({nose:0.95*ez(lt/1.2)});boxRun(t,tVersi+1.9);look([5.5,2.2,3.6],[2.0,0.8,0],1.6)},ov:t=>pill('HIDUNGNYA BENERAN DIBUKA',W/2,520,30,C.YEL,'#111',fin(t,tVersi+1.2))},
  {t0:tJadi,photo:'p884408',noShift:true}
 ];
 return {scenes,cardAt:tJadi-.2,card:['BUKAN BUAT KELAS MEWAH','TAPI BIAR HIDUNGNYA','BISA DIBUKA BUAT KARGO'],clips:[]};
}

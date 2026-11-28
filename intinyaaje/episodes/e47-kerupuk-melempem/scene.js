// e47 Kerupuk melempem kenapa? — toples, kerupuk 3D (kriuk patah vs lembek melentur), struktur rongga, uap air masuk, dijemur
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 for(const n of ['p4881400','p491231'])loadImg(n,`/${K.EP}/img/${n}.jpg`);
 S.background=new THREE.Color('#efe4d2');
 Object.assign(sun.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:0.5,far:12});sun.position.set(1.5,4,2.5);
 // meja kayu
 const wood=document.createElement('canvas');wood.width=wood.height=512;const g=wood.getContext('2d');g.fillStyle='#a8784a';g.fillRect(0,0,512,512);for(let i=0;i<60;i++){g.strokeStyle=`rgba(80,48,20,${.08+rnd(i)*.12})`;g.lineWidth=1+rnd(i+1)*3;g.beginPath();g.moveTo(0,i*9);g.bezierCurveTo(170,i*9+rnd(i+3)*14,340,i*9-rnd(i+4)*14,512,i*9+rnd(i+5)*6);g.stroke()}
 const wt=new THREE.CanvasTexture(wood);wt.colorSpace=THREE.SRGBColorSpace;const table=add(new THREE.Mesh(new THREE.BoxGeometry(5,0.1,3),new THREE.MeshStandardMaterial({map:wt,roughness:.6})));table.position.y=-0.05;table.receiveShadow=true;
 // tekstur kerupuk
 const kc=document.createElement('canvas');kc.width=kc.height=256;const k2=kc.getContext('2d');k2.fillStyle='#f3e6cf';k2.fillRect(0,0,256,256);for(let i=0;i<220;i++){k2.fillStyle=`rgba(${200+rnd(i)*40},${150+rnd(i+1)*40},${120+rnd(i+2)*30},.5)`;k2.beginPath();k2.arc(rnd(i+3)*256,rnd(i+4)*256,1+rnd(i+5)*5,0,7);k2.fill()}
 const kt=new THREE.CanvasTexture(kc);kt.colorSpace=THREE.SRGBColorSpace;
 function cracker(R=0.18){const geo=new THREE.CircleGeometry(R,48,0,Math.PI*2);const pos=geo.attributes.position;const base=pos.array.slice();const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:kt,roughness:.7,side:THREE.DoubleSide,color:'#ffffff'}));m.rotation.x=-Math.PI/2;m.castShadow=true;m.userData={base,R};return m}
 // bentuk: wave = gelombang renyah, droop = melengkung lemas
 function shape(m,{wave=1,droop=0,t=0}){const p=m.geometry.attributes.position,b=m.userData.base,R=m.userData.R;for(let i=0;i<p.count;i++){const x=b[i*3],y=b[i*3+1];const r=Math.hypot(x,y),a=Math.atan2(y,x);let z=wave*0.012*Math.sin(a*7+r*40)+wave*0.008*Math.sin(r*90);z-=droop*0.35*Math.pow(Math.max(0,Math.abs(x)-0.02)/R,2)*R;p.setXYZ(i,x,y,z)}p.needsUpdate=true;m.geometry.computeVertexNormals()}
 // toples
 const jar=add(new THREE.Group());const glassM=new THREE.MeshPhysicalMaterial({color:'#ffffff',roughness:.05,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false});
 const body=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.32,0.75,48,1,true),glassM);body.position.y=0.375;jar.add(body);const bottom=new THREE.Mesh(new THREE.CircleGeometry(0.32,48),glassM);bottom.rotation.x=-Math.PI/2;bottom.position.y=0.003;jar.add(bottom);
 const lid=new THREE.Mesh(new THREE.CylinderGeometry(0.34,0.34,0.06,48),new THREE.MeshStandardMaterial({color:'#d64545',roughness:.4}));jar.add(lid);
 const inJar=[];for(let i=0;i<9;i++){const c=cracker(0.15);c.position.set((rnd(i)-.5)*0.25,0.06+i*0.065,(rnd(i+1)-.5)*0.25);c.rotation.z=rnd(i+2)*3;c.rotation.x=-Math.PI/2+(rnd(i+3)-.5)*0.6;jar.add(c);inJar.push(c)}
 // satu kerupuk besar + potongan patah
 const big=add(cracker(0.42));const halfA=add(cracker(0.42)),halfB=add(cracker(0.42));
 const cutHalf=(m,side)=>{const p=m.geometry.attributes.position;for(let i=0;i<p.count;i++){if(side*p.getX(i)<0)p.setX(i,0)}p.needsUpdate=true;m.userData.base=p.array.slice()};cutHalf(halfA,1);cutHalf(halfB,-1);
 // partikel uap air (biru) masuk ke toples / kerupuk
 const vap=add(new THREE.InstancedMesh(new THREE.SphereGeometry(0.014,8,6),new THREE.MeshBasicMaterial({color:'#4fb3ff'}),120));const o=new THREE.Object3D();
 function vapor(t,center,rad,k,inward=true){for(let i=0;i<120;i++){const ph=(t*0.35+rnd(i))%1;const a=rnd(i+1)*6.28,el=rnd(i+2)*1.2;const r=inward?lerp(rad*2.6,rad*0.4,ph):lerp(rad*0.3,rad*2.6,ph);o.position.set(center.x+r*Math.cos(a)*Math.cos(el),center.y+0.05+r*Math.sin(el)*0.8,center.z+r*Math.sin(a)*Math.cos(el));o.scale.setScalar(k*Math.sin(ph*Math.PI));o.updateMatrix();vap.setMatrixAt(i,o.matrix)}vap.instanceMatrix.needsUpdate=true}
 // struktur mikro: kisi rongga (bola-bola terhubung)
 const micro=add(new THREE.Group());const nodeM=new THREE.MeshPhysicalMaterial({color:'#f6ead3',roughness:.25,clearcoat:.8});const nodes=[];const links=[];
 for(let i=0;i<5;i++)for(let j=0;j<5;j++)for(let k=0;k<2;k++){const n=new THREE.Mesh(new THREE.SphereGeometry(0.035,12,8),nodeM);n.userData.p=new THREE.Vector3((i-2)*0.22,(k)*0.22+0.2,(j-2)*0.22);n.position.copy(n.userData.p);micro.add(n);nodes.push(n)}
 for(const a of nodes)for(const b of nodes){const d=a.userData.p.distanceTo(b.userData.p);if(d>0.01&&d<0.23&&a.id<b.id){const l=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,1,6),nodeM);l.userData={a,b};micro.add(l);links.push(l)}}
 const waterIn=new THREE.InstancedMesh(new THREE.SphereGeometry(0.02,8,6),new THREE.MeshPhysicalMaterial({color:'#5fb8ff',roughness:.05}),60);micro.add(waterIn);
 function microAnim(t,soft,water){nodes.forEach((n,i)=>{const w=soft*0.05;n.position.set(n.userData.p.x+w*Math.sin(t*3+i),n.userData.p.y-soft*0.06*(n.userData.p.y)+w*Math.cos(t*2.6+i*1.3),n.userData.p.z+w*Math.sin(t*2.2+i*0.7))});
  links.forEach(l=>{const a=l.userData.a.position,b=l.userData.b.position;const d=new THREE.Vector3().subVectors(b,a);l.position.copy(a).addScaledVector(d,.5);l.scale.set(1+soft*0.6,d.length(),1+soft*0.6);l.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize())});
  nodeM.color.set(soft>0.5?'#e9d9b9':'#f6ead3');for(let i=0;i<60;i++){const n=nodes[i%nodes.length].position;o.position.set(n.x+(rnd(i)-.5)*0.15,n.y+(rnd(i+1)-.5)*0.15,n.z+(rnd(i+2)-.5)*0.15);o.scale.setScalar(cl(water*1.5-rnd(i+3)*0.5));o.updateMatrix();waterIn.setMatrixAt(i,o.matrix)}waterIn.instanceMatrix.needsUpdate=true}
 // matahari (jemur)
 const sunBall=add(new THREE.Mesh(new THREE.SphereGeometry(0.22,32,16),new THREE.MeshBasicMaterial({color:'#ffd23f'})));
 const tray=add(new THREE.Mesh(new THREE.CylinderGeometry(0.7,0.65,0.05,48),new THREE.MeshStandardMaterial({color:'#c9a46b',roughness:.8})));
 const trayK=[];for(let i=0;i<5;i++){const c=add(cracker(0.2));trayK.push(c)}
 const tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tKer=T('kerupuk itu sebagian'),tGoreng=T('waktu digoreng'),tItulah=T('itulah yang'),tMasalah=T('masalahnya'),tUdara=T('udara di indonesia'),tBegitu=T('begitu ada air'),tMinyak=T('minyak yang jelek'),tJemur=T('kerupuk yang sudah'),tJadi=WT(I('jadi kerupuk melempem'));
 const lidOn=(on)=>{lid.position.y=on?0.78:0.03;lid.rotation.z=0;lid.position.x=on?0:-0.62;lid.position.z=on?0:-0.35};
 const scenes=[
  {t0:0,photo:'p4881400',ov:t=>pill('LUPA DITUTUP SEMALAM...',W/2,520,30,C.DARK,'#fff',fin(t,.3))},
  {t0:T('kerupuknya melempem')-0.4,d3:(t,lt)=>{show(big,table);big.position.set(0,0.25,0);big.rotation.set(-Math.PI/2+0.3,0,0);shape(big,{wave:1-ez(lt/1),droop:ez(lt/1)});look([0.2,0.9,1.5],[0,0.2,0],1.9)},ov:t=>pill('MELEMPEM',W/2,520,44,C.RED,'#fff',fin(t,T('kerupuknya melempem')))},
  {t0:tKata,d3:(t,lt)=>{show(jar,vap,table);lidOn(false);jar.position.set(0,0,0);inJar.forEach(c=>shape(c,{wave:1}));vapor(t,new THREE.Vector3(0,0.8,0),0.3,1);look([0.6,1.1,1.8],[0,0.45,0],1.35)},ov:t=>pill('KATA ORANG: KENA ANGIN',W/2,520,30,C.DARK,'#fff',fin(t,tKata))},
  {t0:tAda,photo:'p491231',ov:t=>pill('KATA LAINNYA: MINYAKNYA JELEK',W/2,520,30,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{show(big,table);big.position.set(0,0.3,0);big.rotation.set(-Math.PI/2+0.5,lt*0.3,0);shape(big,{wave:1});look([0.2,0.9,1.5],[0,0.25,0],1.9)},ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tKer,d3:(t,lt)=>{show(big,table);big.position.set(0,0.3,0);big.rotation.set(-Math.PI/2+0.5,0.3,0);shape(big,{wave:1});look([0.2,0.9,1.5],[0,0.25,0],1.9)},ov:t=>pill('SEBAGIAN BESAR TEPUNG TAPIOKA',W/2,520,28,C.YEL,'#111',fin(t,T('tepung tapioka')-.2))},
  {t0:tGoreng,d3:(t,lt)=>{show(micro);microAnim(t,0,0);micro.rotation.y=lt*0.25;look([0.9,1.0,1.4],[0,0.3,0],1.25)},ov:t=>{pill('DIGORENG: AIR MENGUAP',W/2,520,30,C.DARK,'#fff',fin(t,tGoreng+.3));if(t>T('penuh rongga')-.3)pill('KERING, PENUH RONGGA',W/2,610,30,C.YEL,'#111',fin(t,T('penuh rongga')-.3));if(t>T('kaca tipis')-.3)pill('KAKU SEPERTI KACA TIPIS',W/2,700,30,C.BLU,'#06121f',fin(t,T('kaca tipis')-.3))}},
  {t0:tItulah,d3:(t,lt)=>{const br=lt>0.8;show(table,...(br?[halfA,halfB]:[big]));const k=ez((lt-0.8)/0.35);big.position.set(0,0.3,0);big.rotation.set(-Math.PI/2+0.5,0,0);shape(big,{wave:1});[halfA,halfB].forEach((h,i)=>{const s=i?-1:1;h.position.set(s*0.06*k,0.3-0.05*k,0);h.rotation.set(-Math.PI/2+0.5,0,s*0.5*k);shape(h,{wave:1})});look([0.2,0.9,1.5],[0,0.25,0],1.9)},ov:(t,lt)=>{if(lt>0.8)txt('KRIUK!',W/2,580,110,C.YEL,{a:fin(t,tItulah+0.8,.15)})}},
  {t0:tMasalah,d3:(t,lt)=>{show(jar,vap,table);lidOn(false);inJar.forEach(c=>shape(c,{wave:1}));vapor(t,new THREE.Vector3(0,0.5,0),0.3,t>tUdara-.3?1:0.4);look([0.6,1.1,1.8],[0,0.45,0],1.35)},ov:t=>{pill('TEPUNG INI RAKUS AIR',W/2,520,30,C.RED,'#fff',fin(t,T('rakus air')-.2));if(t>tUdara-.2)pill('UDARA INDONESIA LEMBAP',W/2,610,30,C.BLU,'#06121f',fin(t,tUdara-.2));if(t>T('menyerap uap')-.3)pill('PELAN-PELAN MENYERAP UAP AIR',W/2,700,28,C.DARK,'#fff',fin(t,T('menyerap uap')-.3))}},
  {t0:tBegitu,d3:(t,lt)=>{const soft=ez((t-T('jadi lentur')+.3)/1.5);if(t<T('kriuknya hilang')-.2){show(micro);microAnim(t,soft,ez(lt/1.2));micro.rotation.y=lt*0.25;look([0.9,1.0,1.4],[0,0.3,0],1.25)}else{show(big,table);big.position.set(0,0.3,0);big.rotation.set(-Math.PI/2+0.5,0.3,0);const kk=ez((t-T('kriuknya hilang')+.2)/1);shape(big,{wave:1-kk,droop:kk});look([0.2,0.9,1.5],[0,0.25,0],1.9)}},
   ov:t=>{pill('ADA AIR → LENTUR & LIAT',W/2,520,30,C.BLU,'#06121f',fin(t,tBegitu+.3));if(t>T('kriuknya hilang')-.2)pill('KRIUKNYA HILANG',W/2,610,34,C.RED,'#fff',fin(t,T('kriuknya hilang')-.2))}},
  {t0:tMinyak,photo:'p491231',dir:-1,ov:t=>{pill('MINYAK JELEK: RASA & BAU',W/2,520,30,C.DARK,'#fff',fin(t,tMinyak+.2));if(t>T('tapi bukan itu')-.2)pill('BUKAN PENYEBAB MELEMPEM',W/2,610,30,C.RED,'#fff',fin(t,T('tapi bukan itu')-.2))}},
  {t0:tJemur,d3:(t,lt)=>{show(tray,sunBall,vap,...trayK,table);tray.position.set(0,0.03,0);trayK.forEach((c,i)=>{const a=i/5*6.28;c.position.set(0.38*Math.cos(a)*(i?1:0),0.07,0.38*Math.sin(a)*(i?1:0));const k=ez((lt-0.8)/2.5);shape(c,{wave:k,droop:1-k})});sunBall.position.set(-0.6,1.4,-0.4);vapor(t,new THREE.Vector3(0,0.1,0),0.35,1,false);look([0.4,1.4,1.5],[0,0.25,0],1.3)},ov:t=>{pill('DIJEMUR / DIPANASKAN LAGI',W/2,520,30,C.YEL,'#111',fin(t,T('bisa dijemur')-.2));if(t>T('airnya keluar')-.3)pill('AIRNYA KELUAR → KRIUK LAGI',W/2,610,28,C.GRN,'#06210f',fin(t,T('airnya keluar')-.3))}},
  {t0:tJadi,d3:(t,lt)=>{show(jar,table);jar.position.set(0,0,0);const on=t>T('tertutup rapat')-.4;lidOn(on);inJar.forEach(c=>shape(c,{wave:1}));look([0.6,1.1,1.8],[0,0.35,0],1.55)}}
 ];
 return {scenes,cardAt:tJadi-.2,card:['MELEMPEM = SERAP UAP AIR','BUKAN KARENA MINYAKNYA','TOPLES TUTUP RAPAT'],clips:[]};
}

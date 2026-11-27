// e43 HP panas dimasukin kulkas? — 3D HP, kulkas, embun, gelas es teh, langkah aman
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 loadImg('p5922635',`/${K.EP}/img/p5922635.jpg`);
 S.background=new THREE.Color('#e9e2d6');
 Object.assign(sun.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:0.5,far:12});sun.position.set(1.5,4,3);
 // meja
 const wood=document.createElement('canvas');wood.width=wood.height=512;const g=wood.getContext('2d');g.fillStyle='#b7895a';g.fillRect(0,0,512,512);for(let i=0;i<60;i++){g.strokeStyle=`rgba(90,55,25,${.08+rnd(i)*.12})`;g.lineWidth=1+rnd(i+1)*3;g.beginPath();g.moveTo(0,i*9+rnd(i+2)*6);g.bezierCurveTo(170,i*9+rnd(i+3)*14,340,i*9-rnd(i+4)*14,512,i*9+rnd(i+5)*6);g.stroke()}
 const wt=new THREE.CanvasTexture(wood);wt.colorSpace=THREE.SRGBColorSpace;const table=add(new THREE.Mesh(new THREE.BoxGeometry(6,0.1,4),new THREE.MeshStandardMaterial({map:wt,roughness:.6})));table.position.y=-0.05;table.receiveShadow=true;
 // HP: badan + layar
 const rr=(w,h,r)=>{const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s};
 const phone=add(new THREE.Group());const bodyM=new THREE.MeshPhysicalMaterial({color:'#2b2f36',metalness:.6,roughness:.3,clearcoat:.6,emissive:'#ff3b00',emissiveIntensity:0});
 const body=new THREE.Mesh(new THREE.ExtrudeGeometry(rr(0.5,1.0,0.07),{depth:0.06,bevelEnabled:true,bevelSize:0.012,bevelThickness:0.012,bevelSegments:3,curveSegments:12}),bodyM);body.position.z=-0.03;body.castShadow=true;phone.add(body);
 const sc=document.createElement('canvas');sc.width=256;sc.height=512;const sx=sc.getContext('2d');const scT=new THREE.CanvasTexture(sc);scT.colorSpace=THREE.SRGBColorSpace;
 const screen=new THREE.Mesh(new THREE.ShapeGeometry(rr(0.46,0.96,0.06)),new THREE.MeshBasicMaterial({map:scT}));screen.position.z=0.045;phone.add(screen);
 const uvFix=screen.geometry.attributes.uv;for(let i=0;i<uvFix.count;i++){uvFix.setXY(i,(screen.geometry.attributes.position.getX(i)+0.23)/0.46,(screen.geometry.attributes.position.getY(i)+0.48)/0.96)}
 function drawScreen(mode,k=0){sx.fillStyle='#0b0f18';sx.fillRect(0,0,256,512);
  if(mode==='game'){const gr=sx.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#3a7bd5');gr.addColorStop(1,'#00d2a8');sx.fillStyle=gr;sx.fillRect(0,0,256,512);sx.fillStyle='#ffd23f';for(let i=0;i<6;i++){sx.beginPath();sx.arc(40+i*36,300+Math.sin(k*4+i)*40,14,0,7);sx.fill()}sx.fillStyle='#fff';sx.font='800 26px Poppins';sx.fillText('GAME',80,80)}
  if(mode==='apps'){for(let i=0;i<12;i++){const on=i>=Math.round(12*k);sx.fillStyle=on?['#ff4d4d','#4fb3ff','#3ddc84','#ffd23f'][i%4]:'#1b2230';sx.beginPath();sx.roundRect(30+(i%3)*72,60+Math.floor(i/3)*100,56,56,14);sx.fill()}}
  if(mode==='off'){}
  sx.fillStyle='#fff';sx.font='700 18px Poppins';sx.fillText('12:00',16,26);scT.needsUpdate=true}
 // kabel cas
 const cable=add(new THREE.Group());const cb=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,1.6,12),new THREE.MeshStandardMaterial({color:'#f2f2f2',roughness:.5}));cb.position.y=-0.8;cable.add(cb);const plug=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.1,0.035),new THREE.MeshStandardMaterial({color:'#e6e6e6'}));plug.position.y=-0.03;cable.add(plug);
 // casing (jaket)
 const caseM=new THREE.MeshPhysicalMaterial({color:'#e2574c',roughness:.6,transparent:true,opacity:.95});const casing=add(new THREE.Mesh(new THREE.ExtrudeGeometry(rr(0.56,1.06,0.09),{depth:0.05,bevelEnabled:true,bevelSize:0.01,bevelThickness:0.01,bevelSegments:2}),caseM));
 // kulkas
 const fridge=add(new THREE.Group());const fM=new THREE.MeshStandardMaterial({color:'#dfe5ea',metalness:.3,roughness:.35});const inner=new THREE.MeshStandardMaterial({color:'#f4fbff',emissive:'#bfe6ff',emissiveIntensity:.35,side:THREE.BackSide});
 const shell=new THREE.Mesh(new THREE.BoxGeometry(1.6,2.6,1.2),inner);shell.position.y=1.3;fridge.add(shell);const back=new THREE.Mesh(new THREE.BoxGeometry(1.7,2.7,0.05),fM);back.position.set(0,1.3,-0.62);fridge.add(back);
 for(const y of [0.9,1.7]){const sh=new THREE.Mesh(new THREE.BoxGeometry(1.5,0.03,1.0),new THREE.MeshPhysicalMaterial({color:'#ffffff',transparent:true,opacity:.5}));sh.position.y=y;fridge.add(sh)}
 const doorPiv=new THREE.Group();doorPiv.position.set(-0.8,1.3,0.6);fridge.add(doorPiv);const door=new THREE.Mesh(new THREE.BoxGeometry(1.6,2.6,0.1),fM);door.position.x=0.8;doorPiv.add(door);
 for(const s of [-1,1]){const side=new THREE.Mesh(new THREE.BoxGeometry(0.05,2.7,1.2),fM);side.position.set(s*0.82,1.3,0);fridge.add(side)}
 const top=new THREE.Mesh(new THREE.BoxGeometry(1.7,0.05,1.2),fM);top.position.y=2.63;fridge.add(top);
 // titik embun di HP
 const dew=new THREE.InstancedMesh(new THREE.SphereGeometry(0.012,8,6),new THREE.MeshPhysicalMaterial({color:'#ffffff',transmission:.6,roughness:.05,transparent:true,opacity:.9}),160);phone.add(dew);
 const tmp=new THREE.Object3D();const setDew=k=>{for(let i=0;i<160;i++){const s=cl(k*1.4-rnd(i)*0.6);tmp.position.set((rnd(i+1)-.5)*0.5,(rnd(i+2)-.5)*1.0,i%2?0.05:-0.05);tmp.scale.setScalar(s*(0.6+rnd(i+3)));tmp.updateMatrix();dew.setMatrixAt(i,tmp.matrix)}dew.instanceMatrix.needsUpdate=true};
 // gelas es teh
 const glass=add(new THREE.Group());const gl=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.26,0.9,48,1,true),new THREE.MeshPhysicalMaterial({color:'#ffffff',roughness:.05,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false}));gl.position.y=0.45;glass.add(gl);
 const tea=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.25,0.72,48),new THREE.MeshPhysicalMaterial({color:'#a8541a',roughness:.15,clearcoat:1}));tea.position.y=0.38;glass.add(tea);
 for(let i=0;i<5;i++){const ice=new THREE.Mesh(new THREE.BoxGeometry(0.13,0.13,0.13),new THREE.MeshPhysicalMaterial({color:'#e8f6ff',transmission:.7,roughness:.1,transparent:true,opacity:.8}));ice.position.set((rnd(i)-.5)*0.3,0.62+rnd(i+1)*0.12,(rnd(i+2)-.5)*0.3);ice.rotation.set(rnd(i)*3,rnd(i+1)*3,0);glass.add(ice)}
 const gdew=new THREE.InstancedMesh(new THREE.SphereGeometry(0.018,8,6),new THREE.MeshPhysicalMaterial({color:'#eaf6ff',roughness:.05,clearcoat:1,transparent:true,opacity:.85}),220);glass.add(gdew);
 const setGDew=k=>{for(let i=0;i<220;i++){const a=rnd(i)*6.28,y=0.05+rnd(i+1)*0.8;const r=lerp(0.262,0.322,y/0.9)+0.01;tmp.position.set(r*Math.cos(a),y,r*Math.sin(a));tmp.scale.setScalar(cl(k*1.5-rnd(i+2)*0.5)*(0.6+rnd(i+3)));tmp.updateMatrix();gdew.setMatrixAt(i,tmp.matrix)}gdew.instanceMatrix.needsUpdate=true};
 // papan sirkuit (penampang)
 const board=add(new THREE.Group());const pcb=new THREE.Mesh(new THREE.BoxGeometry(1.4,2.2,0.06),new THREE.MeshStandardMaterial({color:'#1d6b3a',roughness:.5}));board.add(pcb);
 for(let i=0;i<14;i++){const ch=new THREE.Mesh(new THREE.BoxGeometry(0.12+rnd(i)*0.3,0.1+rnd(i+1)*0.3,0.06),new THREE.MeshStandardMaterial({color:i%3?'#1b1d22':'#b8bfc9',metalness:.6,roughness:.4}));ch.position.set((rnd(i+2)-.5)*1.1,(rnd(i+3)-.5)*1.9,0.06);board.add(ch)}
 const drop=new THREE.Mesh(new THREE.SphereGeometry(0.09,24,16),new THREE.MeshPhysicalMaterial({color:'#bfe6ff',transmission:.8,roughness:.05,thickness:.1}));drop.scale.set(1,1,0.5);board.add(drop);
 const spark=new THREE.PointLight('#9fd8ff',0,2);board.add(spark);
 // kipas
 const fan=add(new THREE.Group());const blades=new THREE.Group();for(let i=0;i<3;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.16,0.02),new THREE.MeshStandardMaterial({color:'#4fb3ff',roughness:.4}));b.position.x=0.27;const p=new THREE.Group();p.rotation.z=i*2.094;p.add(b);blades.add(p)}
 const cage=new THREE.Mesh(new THREE.TorusGeometry(0.62,0.015,8,64),new THREE.MeshStandardMaterial({color:'#e6e6e6'}));const stand=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1.0,12),new THREE.MeshStandardMaterial({color:'#e6e6e6'}));stand.position.y=-0.75;const base=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.34,0.06,32),new THREE.MeshStandardMaterial({color:'#e6e6e6'}));base.position.y=-1.25;
 fan.add(blades,cage,stand,base);fan.position.set(-1.1,1.3,-0.6);fan.rotation.y=0.6;
 const heat=(on)=>{bodyM.emissiveIntensity=on};let dewK=-1;const dewSet=k=>{if(k!==dewK){setDew(k);dewK=k}};
 const tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tDua=T('dua-duanya'),tWaktu=T('waktu hp'),tMengembun=T('mengembun'),tMirip=T('mirip gelas'),tAir=T('air sedikit'),tBat=T('baterai juga'),tAman=T('yang aman'),tCabut=T('cabut cas dulu'),tLepas=T('lepas casing'),tTutup=T('tutup aplikasi'),tTaruh=T('taruh di tempat'),tJadi=WT(I('jadi hp panas'));
 const flat=(x=0,z=0)=>{phone.rotation.set(-Math.PI/2,0,0.3);phone.position.set(x,0.05,z)};
 const thermo=(t,v,x=150,y=760)=>{X.save();X.fillStyle='rgba(10,14,22,.8)';X.beginPath();X.roundRect(x-40,y-230,80,300,40);X.fill();const col=v>0.6?C.RED:v>0.35?C.YEL:C.BLU;X.fillStyle=col;X.beginPath();X.arc(x,y+30,30,0,7);X.fill();X.fillRect(x-14,y+30-240*v,28,240*v);X.restore();txt(Math.round(lerp(25,48,v))+'°C',x,y-260,34,'#fff')};
 const scenes=[
  {t0:0,photo:'p5922635',ov:t=>{pill('HP PANAS HABIS MAIN GAME + DICAS',W/2,520,30,C.DARK,'#fff',fin(t,.3))}},
  {t0:tKata,d3:(t,lt)=>{dewSet(0);show(phone,fridge,table);drawScreen('game',t);heat(0.4);const k=ez((lt-0.6)/1.6);doorPiv.rotation.y=-1.6*ez(lt/1);fridge.position.set(0.3,0,-1.2);phone.rotation.set(0,0.2,0);phone.position.set(lerp(-0.9,0.3,k),lerp(0.9,1.2,k),lerp(0.6,-1.0,k));look([1.6,2.0,3.6],[0,1.2,-0.6],1.45)},ov:(t)=>pill('KATA ORANG: MASUKIN KULKAS',W/2,520,30,C.DARK,'#fff',fin(t,tKata))},
  {t0:tAda,d3:(t,lt)=>{dewSet(0);show(phone,table,...iceBlocks);drawScreen('game',t);heat(0.4);flat();iceBlocks.forEach((b,i)=>{b.position.set(-0.05+i*0.12,0.12+lerp(0.8,0,ez((lt-i*0.2)/0.8)),0.05*(i%2))});look([0.9,1.4,1.4],[0,0.05,0],1.25)},ov:t=>pill('KATA LAINNYA: KOMPRES ES BATU',W/2,520,30,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{dewSet(0);show(phone,table);drawScreen('game',t);heat(0.45+0.1*Math.sin(t*6));phone.rotation.set(-0.25,0.3+0.15*Math.sin(lt),0);phone.position.set(0,0.75,0);look([0.4,1.1,2.2],[0,0.75,0],1.2)},ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tDua,d3:(t,lt)=>{dewSet(0);show(phone,table);drawScreen('game',t);heat(0.5);phone.rotation.set(-0.25,0.3,0);phone.position.set(0,0.75,0);look([0.4,1.1,2.2],[0,0.75,0],1.2)},ov:(t,lt)=>{pill('DUA-DUANYA BAHAYA',W/2,520,40,C.RED,'#fff',fin(t,tDua+.4));thermo(t,0.85)}},
  {t0:tWaktu,d3:(t,lt)=>{show(phone,fridge,table);fridge.position.set(0,0,-0.4);doorPiv.rotation.y=-1.6;drawScreen('off');const cool=ez((t-T('tempat dingin')+.2)/2);heat(0.5*(1-cool));phone.rotation.set(-0.15,0.25,0);phone.position.set(0,1.27,-0.1);dewSet(t>tMengembun-.4?ez((t-tMengembun+.4)/2.2):0);look([0.7,1.5,1.6],[0,1.27,-0.1],lerp(1.4,1.0,ez(lt/3)))},
   ov:(t)=>{thermo(t,lerp(0.85,0.15,ez((t-T('tempat dingin')+.2)/2)));if(t>tMengembun-.3)pill('UDARA LEMBAP → MENGEMBUN',W/2,520,30,C.BLU,'#06121f',fin(t,tMengembun-.3));if(t>T('sampai ke dalam')-.3)pill('BISA SAMPAI KE DALAM',W/2,610,30,C.RED,'#fff',fin(t,T('sampai ke dalam')-.3))}},
  {t0:tMirip,d3:(t,lt)=>{show(glass,table);glass.position.set(0,0,0);setGDew(ez((lt-0.4)/2));look([0.9,1.0,1.8],[0,0.45,0],1.1)},ov:t=>pill('SAMA KAYAK GELAS ES TEH',W/2,520,32,C.YEL,'#111',fin(t,tMirip+.2))},
  {t0:tAir,d3:(t,lt)=>{show(board);board.position.set(0,1.1,0);board.rotation.set(-0.2,0.25,0);const k=ez((t-T('korsleting')+.3)/0.3);drop.position.set(0.1,lerp(1.4,0.1,ez(lt/1.2)),0.08);spark.intensity=k>0&&t<T('korsleting')+0.9?(Math.sin(t*60)>0?8:0):0;spark.position.copy(drop.position);look([0.6,1.5,2.4],[0,1.1,0],1.75)},
   ov:t=>{pill('AIR + PAPAN SIRKUIT',W/2,520,30,C.DARK,'#fff',fin(t,tAir+.3));if(t>T('korsleting')-.2)pill('KORSLETING',W/2,610,36,C.RED,'#fff',fin(t,T('korsleting')-.2));if(t>T('karat')-.2)pill('ATAU KARAT PELAN-PELAN',W/2,700,30,C.DARK,'#fff',fin(t,T('karat')-.2))}},
  {t0:tBat,d3:(t,lt)=>{dewSet(0);show(phone,table);drawScreen('off');heat(0);phone.rotation.set(-0.25,0.3,0);phone.position.set(0,0.75,0);look([0.4,1.1,2.2],[0,0.75,0],1.2)},ov:(t,lt)=>{pill('BATERAI NGGAK SUKA SUHU BERUBAH MENDADAK',W/2,520,26,C.YEL,'#111',fin(t,tBat+.2));const v=lt<1.2?0.85:0.15;thermo(t,v,150,760);thermo(t,lt<1.2?0.85:0.85-0.7*ez((lt-1.2)/0.3),930,760)}},
  {t0:tAman,d3:(t,lt)=>{dewSet(0);show(phone,table,cable,casing);drawScreen('game',t);heat(0.4*(1-ez((t-tCabut)/3)));flat();
    cable.rotation.set(-Math.PI/2,0,0.3);const out=ez((t-tCabut+.2)/0.6);cable.position.set(0.15+0.6*out*Math.sin(-0.3)*-1,0.05,0.48+0.6*out);cable.visible=out<0.98;
    const off=ez((t-tLepas+.1)/0.7);casing.rotation.set(-Math.PI/2,0,0.3);casing.position.set(lerp(0,0.8,off),lerp(0.03,0.6,off),-0.02);casing.visible=off<0.99;
    if(t>tTutup-.2)drawScreen('apps',ez((t-tTutup+.2)/1.5));if(t>T('matikan sebentar')-.1)drawScreen('off');
    look([0.7,1.5,1.3],[0,0.05,0.05],1.25)},
   ov:t=>{const st=[['1. CABUT CAS',tCabut],['2. LEPAS CASING',tLepas],['3. TUTUP APLIKASI BERAT',tTutup]];st.forEach(([s,tt],i)=>pill(s,W/2,520+i*90,30,i==1&&t>T('kayak jaket')-.2?C.YEL:C.DARK,i==1&&t>T('kayak jaket')-.2?'#111':'#fff',fin(t,tt-.2)));if(t>T('kayak jaket')-.2)txt('casing = jaket',W/2,800,30,'#fff',{a:fin(t,T('kayak jaket')-.2)})}},
  {t0:tTaruh,d3:(t,lt)=>{dewSet(0);show(phone,table,fan);drawScreen('off');heat(0);flat(0.1,0.1);blades.rotation.z-=0.35;look([0.6,1.8,2.6],[-0.4,0.6,-0.2],1.25)},ov:t=>{pill('4. TARUH DI TEMPAT TEDUH',W/2,520,30,C.GRN,'#06210f',fin(t,tTaruh));if(t>T('kena angin')-.2)pill('KENA ANGIN KIPAS BOLEH',W/2,610,30,C.DARK,'#fff',fin(t,T('kena angin')-.2))}},
  {t0:tJadi,d3:(t,lt)=>{dewSet(0);show(phone,table,fan);drawScreen('off');heat(0);flat(0.1,0.1);blades.rotation.z-=0.35;look([0.6,1.8,2.6],[-0.4,0.6,-0.2],1.35)}}
 ];
 // es batu untuk adegan kompres
 const iceBlocks=[];for(let i=0;i<3;i++){const b=add(new THREE.Mesh(new THREE.BoxGeometry(0.11,0.11,0.11),new THREE.MeshPhysicalMaterial({color:'#e8f6ff',transmission:.7,roughness:.1,transparent:true,opacity:.85})));b.rotation.set(0.4*i,0.7*i,0);iceBlocks.push(b)}
 drawScreen('game',0);
 return {scenes,cardAt:tJadi-.2,card:['JANGAN KULKAS / ES BATU','CABUT CAS, LEPAS CASING,','DINGINKAN DI TEMPAT TEDUH'],clips:[]};
}

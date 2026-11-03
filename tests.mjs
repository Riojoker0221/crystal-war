import test from 'node:test';import assert from 'node:assert/strict';import {Game,W,H,mines,rocks} from './public/engine.js';
const tick=(g,n)=>{for(let i=0;i<n*10;i++)g.step(.1);};
test('双人随机出生覆盖左右整条安全竖线，独立抽取并避开矿石与障碍',()=>{
 const ys=[[],[]];let sameHalf=0;
 for(let seed=0;seed<160;seed++){
  const g=new Game({ai:false,spawnLayout:'random-sides',seed:Math.imul(seed+1,2654435761)>>>0});
  for(let p=0;p<2;p++){
   const b=g.own(p)[0];ys[p].push(b.y);assert.equal(b.x,p?W-150:150);assert.ok(b.y>=140&&b.y<=H-140);
   assert.equal(g.own(p).length,5);assert.equal(g.openSpot(b.x,b.y,b.r,b.id),true);
   for(const e of g.own(p)){assert.ok(e.x>e.r&&e.x<W-e.r&&e.y>e.r&&e.y<H-e.r);assert.ok(rocks.every(o=>Math.hypot(e.x-o.x,e.y-o.y)>e.r+o.r));assert.ok(g.mines.every(m=>Math.hypot(e.x-m.x,e.y-m.y)>e.r+25));}
   const m=g.mines[p];assert.equal(m.capacity,1400);assert.equal(m.remaining,1400);assert.equal(Math.hypot(m.x-b.x,m.y-b.y),Math.hypot(40,90));assert.ok(g.knownMines[p].has(p));
   assert.deepEqual(g.mines.slice(2),mines.slice(2));assert.ok(g.mines.slice(2).every(n=>Math.hypot(n.x-m.x,n.y-m.y)>=160));
  }
  if((g.own(0)[0].y<H/2)===(g.own(1)[0].y<H/2))sameHalf++;
 }
 for(const values of ys){assert.ok(new Set(values).size>100);assert.ok(Math.min(...values)<250);assert.ok(Math.max(...values)>H-250);}
 assert.ok(sameHalf>30&&sameHalf<130,'独立随机允许双方在同一半场，不强制对角线或镜像');
});
test('随机出生可复现、每局独立，PVE保留原开局',()=>{
 const opts={ai:false,spawnLayout:'random-sides',seed:1234567},a=new Game(opts),b=new Game(opts);
 assert.deepEqual(a.entities,b.entities);assert.deepEqual(a.mines,b.mines);a.mines[0].remaining=0;assert.equal(b.mines[0].remaining,1400);
 const pve=new Game({seed:1234567});assert.deepEqual(pve.own(0).map(e=>[e.x,e.y])[0],[150,270]);assert.deepEqual(pve.own(1).map(e=>[e.x,e.y])[0],[W-150,H-270]);assert.deepEqual(pve.mines,mines);
});
test('所有阵营随机出生后可采矿，建造碰撞采用当局矿位',()=>{
 for(let f=0;f<4;f++)for(let seed of [17,1000,234567,4294967295]){
  let g=new Game({ai:false,spawnLayout:'random-sides',f0:f,f1:f,seed});
  for(let p=0;p<2;p++){let m=g.mines[p];assert.equal(g.openSpot(m.x,m.y,25),false);assert.equal(g.openSpot(g.own(p)[0].x,g.own(p)[0].y,34,g.own(p)[0].id),true);}
  tick(g,20);for(let p=0;p<2;p++){assert.ok(g.players[p].money>250);assert.ok(g.mines[p].remaining<1400);}
 }
});
function miningFixture(remaining=17,workers=1){let g=new Game({ai:false});g.entities=g.entities.filter(e=>e.k==='b');g.players[0].money=0;g.mines.forEach(m=>m.remaining=0);g.mines[0].remaining=remaining;let m=g.mines[0],b=g.own(0)[0];b.x=m.x+40;b.y=m.y;let us=[];for(let i=0;i<workers;i++){let u=g.spawn(0,'u',0,m.x,m.y);u.order={type:'mine',mine:0};us.push(u);}return {g,us};}

test('地图扩大四倍、18处有限矿区对称分散',()=>{assert.equal(W*H,1200*760*4);assert.equal(mines.length,18);assert.ok(mines.reduce((n,m)=>n+m.capacity,0)>40000);for(let i=0;i<mines.length;i+=2){let a=mines[i],b=mines[i+1];assert.equal(a.x+b.x,W);assert.equal(a.y+b.y,H);assert.equal(a.capacity,b.capacity);assert.equal(a.remaining,a.capacity);assert.ok(a.x>0&&a.x<W&&a.y>0&&a.y<H);}for(let i=0;i<mines.length;i++)for(let j=i+1;j<mines.length;j++)assert.ok(Math.hypot(mines[i].x-mines[j].x,mines[i].y-mines[j].y)>200);});
test('开采在提取时扣矿、末次不足10也只运输实际数量',()=>{let {g,us:[u]}=miningFixture(7);g.step(1.3);assert.equal(g.mines[0].remaining,0);assert.equal(u.carry,7);assert.equal(g.players[0].money,0);g.step(.1);assert.equal(g.players[0].money,7);tick(g,10);assert.equal(g.players[0].money,7);assert.equal(u.miningIdle,true);});
test('两名工人争采与科技加成均不能凭空增加有限矿量',()=>{let {g,us}=miningFixture(17,2);g.step(1.3);assert.equal(g.mines[0].remaining,0);assert.equal(us.reduce((n,u)=>n+u.carry,0),17);g.step(.1);assert.equal(g.players[0].money,17);let {g:h,us:[u]}=miningFixture(12);h.players[0].tech.push(2);h.step(1.3);assert.equal(u.carry,12);assert.equal(h.mines[0].remaining,0);h.step(.1);assert.equal(h.players[0].money,12);});
test('矿藏属于各对局独立状态，快照不会反向修改资源',()=>{let a=new Game({ai:false}),b=new Game({ai:false});a.mines[0].remaining=0;assert.equal(b.mines[0].remaining,mines[0].capacity);assert.equal(mines[0].remaining,mines[0].capacity);let s=b.snapshot(0);s.mines[0].remaining=0;assert.equal(b.mines[0].remaining,mines[0].capacity);});
test('矿空后寻找已发现矿区，没有可用矿时等待侦察，空矿手动指令有提示',()=>{let {g,us:[u]}=miningFixture(0);g.mines[2].remaining=50;g.knownMines[0].add(2);g.step(.1);assert.equal(u.order.mine,2);assert.equal(u.miningIdle,false);assert.match(g.command(0,{type:'order',ids:[u.id],action:'mine',mine:0,x:110,y:180}),/已枯竭/);let {g:h,us:[v]}=miningFixture(0);h.mines[16].remaining=100;h.knownMines[0]=new Set([0]);h.step(.1);assert.equal(v.order.mine,-1);assert.equal(v.miningIdle,true);assert.equal(h.players[0].money,0);h.knownMines[0].add(16);h.step(.1);assert.equal(v.order.mine,16);assert.equal(v.miningIdle,false);});
test('普通模式超过10分钟仍继续，限时模式按时结算',()=>{let g=new Game({ai:false});tick(g,610);assert.equal(g.winner,null);let t=new Game({ai:false,rule:'timed'});tick(t,601);assert.notEqual(t.winner,null);});
test('普通模式中央据点不会触发胜利',()=>{let g=new Game({ai:false});g.time=480;g.spawn(0,'u',1,W/2,H/2);tick(g,46);assert.equal(g.winner,null);assert.equal(g.players[0].hold,0);});
test('限时模式晶核连续占领45秒获胜',()=>{let g=new Game({ai:false,rule:'timed'});g.time=480;g.spawn(0,'u',1,W/2,H/2);tick(g,46);assert.equal(g.winner,0);});
test('采矿产生资源；生产扣费、占人口、等待完成',()=>{let g=new Game({ai:false});tick(g,15);assert.ok(g.players[0].money>250);let base=g.own(0)[0],before=g.players[0].money;assert.equal(g.command(0,{type:'train',id:base.id,t:0}),'');assert.equal(g.players[0].money,before-50);assert.equal(g.pop(0),5);assert.equal(g.own(0).filter(e=>e.k==='u').length,4);tick(g,9);assert.equal(g.own(0).filter(e=>e.k==='u').length,5);});
test('建造前置与取消返还',()=>{let g=new Game({ai:false}),base=g.own(0)[0];assert.match(g.command(0,{type:'build',t:2,x:260,y:320}),/需要先完成/);g.command(0,{type:'train',id:base.id,t:0});g.command(0,{type:'cancel',id:base.id});assert.equal(g.players[0].money,237);assert.equal(g.pop(0),4);});
test('四阵营第二基地完成才加人口，被毁后保留军队但禁止超额生产',()=>{for(let f=0;f<4;f++){let g=new Game({ai:false,f0:f});let b=g.spawn(0,'b',0,300,270);b.build=1;assert.equal(g.capacity(0),36);tick(g,2);assert.equal(g.capacity(0),54);assert.equal(g.snapshot(0).players[0].capacity,54);for(let i=0;i<33;i++)g.spawn(0,'u',1,250,250);g.players[0].money=1000;assert.equal(g.command(0,{type:'train',id:b.id,t:0}),'');b.hp=0;g.step(.1);assert.equal(g.capacity(0),36);assert.equal(g.pop(0),37);assert.match(g.command(0,{type:'train',id:g.own(0)[0].id,t:0}),/人口/);}});
test('不能操作敌方建筑；迷雾隐藏敌军',()=>{let g=new Game({ai:false});assert.ok(g.command(0,{type:'train',id:g.own(1)[0].id,t:0}));assert.ok(g.snapshot(0).entities.every(e=>e.p===0));});
test('两座基地需全部摧毁，投降直接结束',()=>{let g=new Game({ai:false});g.spawn(1,'b',0,850,600);g.own(1)[0].hp=0;g.step(.1);assert.equal(g.winner,null);g.own(1).find(e=>e.k==='b'&&e.t===0).hp=0;g.step(.1);assert.equal(g.winner,0);let h=new Game({ai:false});h.command(0,{type:'surrender'});assert.equal(h.winner,1);});
test('真实攻击摧毁基地并结算；训练人口不能超上限',()=>{let g=new Game({ai:false});let enemy=g.own(1)[0];enemy.hp=20;let u=g.spawn(0,'u',7,enemy.x-90,enemy.y);g.command(0,{type:'order',ids:[u.id],action:'attack',target:enemy.id,x:enemy.x,y:enemy.y});tick(g,5);assert.equal(g.winner,0);let h=new Game({ai:false}),base=h.own(0)[0];for(let i=0;i<32;i++)h.spawn(0,'u',1,200,200);assert.match(h.command(0,{type:'train',id:base.id,t:0}),/人口/);});
test('32种兵种数值与三档AI模拟无崩溃',()=>{for(let f=0;f<4;f++)for(let difficulty of ['easy','normal','hard']){let g=new Game({f0:f,f1:f,difficulty});tick(g,180);assert.ok(g.entities.every(e=>Number.isFinite(e.x)&&Number.isFinite(e.hp)));assert.ok(g.own(1).some(e=>e.k==='u'&&e.t>0));assert.ok(g.pop(1)<=36);assert.ok(g.players[1].money>=0);}});

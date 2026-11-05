import test from 'node:test';
import assert from 'node:assert/strict';
import {Game,factions} from './public/engine.js';

const tick=(g,seconds)=>{for(let left=seconds;left>1e-8;left-=.05)g.step(Math.min(.05,left));};
function arena(f,f1=0){
 const g=new Game({ai:false,f0:f,f1,seed:27183});
 g.entities=g.entities.filter(e=>e.k==='b');
 for(const p of g.players)p.money=10000;
 return g;
}
function troop(g,p,t,x=600,y=400){const e=g.spawn(p,'u',t,x,y);e.cd=Infinity;return e;}
function dummy(g,p=1,x=700,y=400,t=1){const e=troop(g,p,t,x,y);e.hp=e.max=10000;return e;}
const cast=(g,e,ability,x=700,y=400,p=e.p)=>g.command(p,{type:'ability',id:e.id,ability,x,y});
const factory=(g,x=700)=>g.spawn(0,'b',2,x,600);
const ready=g=>g.players[0].tech.push(3);
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-6,`${actual} ≈ ${expected}`);

test('四阵营终极特种兵须研究、在高级建筑训练，跨队列合计最多两名',()=>{
 for(let f=0;f<4;f++){
  const g=arena(f),a=factory(g),b=factory(g,900);
  assert.ok(factions[f].units[8],`faction ${f} has a specialist`);
  assert.ok(g.command(0,{type:'train',id:a.id,t:8}));
  ready(g);
  assert.ok(g.command(0,{type:'train',id:g.own(0)[0].id,t:8}),'main base cannot train specialist');
  const train=id=>{g.own(0)[0].larvae=20;return g.command(0,{type:'train',id,t:8});};
  assert.equal(train(a.id),'');assert.equal(train(b.id),'');
  let money=g.players[0].money,pop=g.pop(0);assert.ok(train(a.id));assert.equal(g.players[0].money,money);assert.equal(g.pop(0),pop);
  assert.equal(g.command(0,{type:'cancel',id:b.id}),'');assert.equal(train(b.id),'');
  tick(g,factions[f].units[8][2]+1);
  const specials=g.own(0).filter(e=>e.k==='u'&&e.t===8);assert.equal(specials.length,2);assert.ok(train(a.id));
  specials[0].hp=0;assert.equal(train(a.id),'','a dead specialist frees a slot');
 }
});

test('新增区域技能拒绝越权、无科技、越界、超距离与冷却中的释放',()=>{
 for(const [f,id] of [[1,'emp'],[2,'ward'],[3,'parasite']]){
  const g=arena(f),actor=troop(g,0,8);
  assert.ok(cast(g,actor,id));ready(g);
  assert.ok(cast(g,actor,id,700,400,1));
  assert.ok(cast(g,actor,id,NaN,400));assert.ok(cast(g,actor,id,2000,400));assert.ok(cast(g,actor,id,-1,400));
  assert.equal(cast(g,actor,id),'');assert.ok(cast(g,actor,id));
  assert.ok(actor.abilityCD[id]>44);assert.equal(g.events.filter(e=>e.kind===id).length,1);
 }
});

test('电磁封锁预警后造成伤害，压制攻速与技能六秒且不叠加倍率',()=>{
 const g=arena(1);ready(g);g.players[1].tech.push(3);
 const a=troop(g,0,8),b=troop(g,0,8,600,430),rifle=dummy(g),bomber=dummy(g,1,740,420,8);
 assert.equal(cast(g,a,'emp'),'');assert.equal(cast(g,b,'emp'),'');tick(g,.9);assert.equal(rifle.hp,10000);
 tick(g,.2);assert.equal(rifle.hp,9880,'two pulses deal damage individually');
 assert.ok(rifle.status.empUntil>g.time);assert.ok(cast(g,bomber,'demolition',650,420));
 const victim=dummy(g,0,730,460);g.attack(rifle,victim,[victim]);near(rifle.cd,factions[0].units[1][6]/.65);
 rifle.cd=Infinity;tick(g,6.1);g.attack(rifle,victim,[victim]);near(rifle.cd,factions[0].units[1][6]);
 assert.equal(cast(g,bomber,'demolition',650,420),'','active skills recover after silence expires');
});

test('电磁封锁暂停防御塔，不停止基地生产、收拢和缓慢移动',()=>{
 const g=arena(1);ready(g);const source=troop(g,0,8),target=dummy(g,0,720,430);
 const tower=g.spawn(1,'b',4,700,400);tower.cd=Infinity;
 assert.equal(cast(g,source,'emp'),'');tick(g,1.1);tower.cd=0;let hp=target.hp;tick(g,.5);assert.equal(target.hp,hp);
 tick(g,5.7);assert.ok(target.hp<hp,'turret resumes firing after EMP');
 const h=arena(1);ready(h);const actor=troop(h,0,8),base=h.own(1)[0];base.x=700;base.y=400;
 assert.equal(h.command(1,{type:'train',id:base.id,t:0}),'');const left=base.queue[0].left;
 assert.equal(cast(h,actor,'emp'),'');tick(h,1.2);assert.ok(base.queue[0].left<left-1);
 h.command(1,{type:'cancel',id:base.id});assert.equal(h.command(1,{type:'pack',id:base.id}),'');
 const before={x:base.x,y:base.y};h.move(base,{x:900,y:400},1);near(Math.hypot(base.x-before.x,base.y-before.y),20);
});

test('已释放的爆破预警不会被电磁封锁取消，施法者死亡也不取消脉冲',()=>{
 const g=arena(1);ready(g);g.players[1].tech.push(3);
 const actor=troop(g,0,8),bomber=troop(g,1,8,700,400),victim=dummy(g,0,680,450);
 assert.equal(cast(g,bomber,'demolition',680,450),'');assert.equal(cast(g,actor,'emp'),'');actor.hp=0;
 tick(g,1.1);assert.ok(bomber.status.lockUntil>g.time);assert.ok(g.events.some(e=>e.kind==='blast'));
 const before=victim.hp;tick(g,.5);assert.ok(victim.hp<before,'scheduled blast still explodes');
});

test('星界结界提供一次临时护盾，重复结界不叠加且建筑不受益',()=>{
 const g=arena(2);ready(g);const a=troop(g,0,8),b=troop(g,0,8,600,430),ally=troop(g,0,1,690,400),building=g.spawn(0,'b',1,710,450);
 assert.equal(cast(g,a,'ward'),'');tick(g,.05);assert.equal(ally.tempShield,80);assert.ok(!building.tempShield);
 g.hit(ally,30,{p:1});assert.equal(ally.tempShield,50);
 const snapshot=g.snapshot(0),copiedZone=snapshot.events.find(e=>e.kind==='ward');assert.ok(copiedZone.shielded.includes(ally.id));copiedZone.shielded.length=0;
 tick(g,.1);assert.equal(ally.tempShield,50,'one field does not regenerate the temporary shield each frame, even after snapshot mutation');
 assert.equal(cast(g,b,'ward'),'');tick(g,.05);assert.equal(ally.tempShield,80,'a second cast may refresh but cannot add to the shield');
 tick(g,8.2);assert.equal(ally.tempShield||0,0,'temporary shield expires with the field');
});

test('结界只在区域内提高移动速度，离开即恢复，重新进入不免费重充护盾',()=>{
 const g=arena(2);ready(g);const actor=troop(g,0,8),ally=troop(g,0,1,700,400);
 assert.equal(cast(g,actor,'ward'),'');tick(g,.05);
 const speed=factions[2].units[1][8];let x=ally.x;g.move(ally,{x:900,y:400},.5);near(ally.x-x,speed*1.2*.5);
 g.hit(ally,40,{p:1});const shield=ally.tempShield;
 ally.x=950;tick(g,.05);x=ally.x;g.move(ally,{x:1000,y:400},.5);near(ally.x-x,speed*.5);
 ally.x=700;tick(g,.05);assert.equal(ally.tempShield,shield);x=ally.x;g.move(ally,{x:900,y:400},.5);near(ally.x-x,speed*1.2*.5);
});

test('结界减免远程伤害但不减免近战，临时盾先于生命吸收伤害',()=>{
 const g=arena(2);ready(g);const actor=troop(g,0,8),rangedAlly=troop(g,0,1,680,380),meleeAlly=troop(g,0,1,680,430);
 rangedAlly.shield=meleeAlly.shield=0;rangedAlly.lastHit=meleeAlly.lastHit=g.time;
 const gun=troop(g,1,1,760,380),worker=troop(g,1,0,760,430);
 assert.equal(cast(g,actor,'ward'),'');tick(g,.05);
 const rangedHp=rangedAlly.hp,meleeHp=meleeAlly.hp;
 g.hit(rangedAlly,100,gun);near(rangedAlly.tempShield,5);assert.equal(rangedAlly.hp,rangedHp);
 g.hit(meleeAlly,100,worker);assert.equal(meleeAlly.tempShield,0);near(meleeAlly.hp,meleeHp-20);
});

test('结界不会减免冰霜风暴的持续伤害',()=>{
 const g=arena(2,2);ready(g);const actor=troop(g,0,8),ally=troop(g,0,1,700,400),mage=troop(g,1,4,800,400);
 ally.shield=0;ally.lastHit=g.time;
 assert.equal(cast(g,actor,'ward'),'');assert.equal(ally.tempShield,80);
 assert.equal(cast(g,mage,'storm'),'');tick(g,1.1);
 assert.equal(ally.tempShield,60,'one 20-damage DOT tick bypasses ranged mitigation');
});

test('寄生菌雾预警后每秒伤害一次，重叠不重复计伤或叠加减速',()=>{
 for(const count of [1,2]){
  const g=arena(3);ready(g);const target=dummy(g);for(let i=0;i<count;i++){const actor=troop(g,0,8,600,400+i*25);assert.equal(cast(g,actor,'parasite'),'');}
  tick(g,.7);assert.equal(target.hp,10000);tick(g,1.1);assert.equal(target.hp,9992);
  assert.ok(target.status.parasiteSlowUntil>g.time);let x=target.x;g.move(target,{x:1000,y:400},.1);near(target.x-x,factions[0].units[1][8]*.75*.1);
  tick(g,7.2);assert.equal(target.hp,9936,'eight DOT ticks total, even with overlapping fields');
  x=target.x;g.move(target,{x:1000,y:400},.1);near(target.x-x,factions[0].units[1][8]*.1);
 }
});

test('寄生孵化每次最多六只，不从工兵、建筑或召唤物重复繁殖',()=>{
 const g=arena(3);ready(g);const actor=troop(g,0,8);
 const victims=Array.from({length:9},(_,i)=>dummy(g,1,680+(i%3)*25,370+Math.floor(i/3)*25));
 const worker=troop(g,1,0,700,445),tower=g.spawn(1,'b',4,725,440),summon=dummy(g,1,750,450);tower.cd=Infinity;summon.summonedUntil=100;
 assert.equal(cast(g,actor,'parasite'),'');tick(g,.85);
 const pop=g.pop(0),score=g.score(0);
 for(const target of [worker,tower,summon])g.hit(target,100000,actor);
 assert.equal(g.own(0).filter(e=>e.parasite).length,0);
 for(const target of victims)g.hit(target,100000,actor);
 let spawned=g.own(0).filter(e=>e.parasite);assert.equal(spawned.length,6);assert.equal(g.pop(0),pop);assert.equal(g.score(0),score);
 assert.ok(spawned.every(e=>e.summonedUntil>g.time+14.9&&e.t===1));
 tick(g,15.2);assert.equal(g.own(0).filter(e=>e.parasite).length,0);assert.equal(g.pop(0),pop);
});

test('对方菌雾不能从已召唤的寄生虫再次孵化寄生虫',()=>{
 const g=arena(3,3);ready(g);g.players[1].tech.push(3);
 const caster=troop(g,0,8),opponent=troop(g,1,8,750,400),victim=dummy(g,1,690,420);
 assert.equal(cast(g,caster,'parasite',700,400),'');assert.equal(cast(g,opponent,'parasite',650,400),'');tick(g,.85);
 g.hit(victim,100000,caster);const summoned=g.own(0).find(e=>e.parasite);assert.ok(summoned);
 tick(g,.05);g.hit(summoned,100000,opponent);
 assert.equal(g.own(1).filter(e=>e.parasite).length,0,'a summoned victim cannot start a recursive infestation');
});

test('离开寄生区域后不再受持续伤害或长期减速',()=>{
 const g=arena(3);ready(g);const actor=troop(g,0,8),target=dummy(g);
 assert.equal(cast(g,actor,'parasite'),'');tick(g,.9);target.x=1100;tick(g,.5);
 const hp=target.hp;tick(g,2);assert.equal(target.hp,hp);assert.ok((target.status.parasiteSlowUntil||0)<=g.time);
});

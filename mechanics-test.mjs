import test from 'node:test';
import assert from 'node:assert/strict';
import {Game,abilities,factionResearch,research,factions} from './public/engine.js';

const tick=(g,seconds)=>{for(let t=0;t<seconds;t+=.1)g.step(Math.min(.1,seconds-t));};
function arena(f=0,opts={}){
  const g=new Game({ai:false,f0:f,f1:0,seed:12631,...opts});
  g.entities=g.entities.filter(e=>e.k==='b');
  g.players[0].money=10000;g.players[1].money=10000;
  return g;
}
const unit=(g,p,t,x=600,y=400)=>g.spawn(p,'u',t,x,y);
const building=(g,p,t,x=700,y=400)=>g.spawn(p,'b',t,x,y);
function cast(g,e,id,point={x:e.x,y:e.y},extra={}){return g.command(e.p,{type:'ability',id:e.id,ability:id,...point,...extra});}
function ability(f,id){const a=abilities.find(a=>a.f===f&&a.id===id);assert.ok(a,`ability ${id} exists for faction ${f}`);return a;}
function dummy(g,x,y){let e=unit(g,1,1,x,y);e.hp=e.max=1000;e.cd=Infinity;return e;}

test('处死只影响己方工兵，释放人口并且不能杀敌军或作战单位',()=>{
  for(let f=0;f<4;f++){
    let g=arena(f),worker=unit(g,0,0),enemy=unit(g,1,0,1600,1000),soldier=unit(g,0,1,620,400),before=g.pop(0);
    g.command(0,{type:'execute',ids:[worker.id,enemy.id,soldier.id]});
    assert.ok(!g.own(0).some(e=>e.id===worker.id));assert.equal(g.pop(0),before-1);
    assert.equal(enemy.hp,enemy.max);assert.equal(soldier.hp,soldier.max);
  }
});

test('基地收起后缓慢移动、保持归属与人口，并禁止生产',()=>{
  let g=arena(),base=g.own(0)[0];base.x=600;base.y=400;let worker=unit(g,0,0,600,500);worker.order=null;
  assert.equal(g.command(0,{type:'pack',id:base.id}),'');assert.equal(base.packed,true);assert.equal(g.capacity(0),36);
  assert.ok(g.command(0,{type:'train',id:base.id,t:0}));
  assert.equal(g.command(0,{type:'order',ids:[base.id],action:'move',x:800,y:400}),'');
  let x=base.x;tick(g,1);assert.ok(base.x>x);assert.ok(base.x-x<=15,'base travels at most 14 world units/sec');assert.equal(base.p,0);assert.equal(g.winner,null);
  assert.ok(g.command(1,{type:'pack',id:base.id}));
});

test('基地队列存在时不能收起，移动基地不能接收运矿',()=>{
  let g=arena(),base=g.own(0)[0];assert.equal(g.command(0,{type:'train',id:base.id,t:0}),'');assert.ok(g.command(0,{type:'pack',id:base.id}));
  g.command(0,{type:'cancel',id:base.id});assert.equal(g.command(0,{type:'pack',id:base.id}),'');
  let w=unit(g,0,0,base.x+40,base.y);w.carry=10;w.order={type:'mine',mine:0};let money=g.players[0].money;tick(g,1);assert.equal(g.players[0].money,money);assert.equal(w.carry,10);
});

test('基地在无效位置不能展开，安全地点可恢复生产',()=>{
  let g=arena(),base=g.own(0)[0];base.x=600;base.y=400;g.command(0,{type:'pack',id:base.id});let blocker=building(g,0,1,base.x,base.y);
  assert.ok(g.command(0,{type:'pack',id:base.id}));assert.equal(base.packed,true);
  blocker.hp=0;assert.equal(g.command(0,{type:'pack',id:base.id}),'');assert.equal(base.packed,false);assert.equal(g.command(0,{type:'train',id:base.id,t:0}),'');
});

test('人口科技需要实际研究时间且只能增加一次12人口',()=>{
  let g=arena(),lab=building(g,0,3);assert.equal(g.capacity(0),36);let money=g.players[0].money;assert.ok(g.command(0,{type:'research',id:lab.id,t:'4'}));assert.equal(g.players[0].money,money);assert.equal(lab.queue.length,0);assert.equal(g.command(0,{type:'research',id:lab.id,t:4}),'');assert.equal(g.capacity(0),36);
  tick(g,research[4].time+1);assert.equal(g.capacity(0),48);assert.ok(g.command(0,{type:'research',id:lab.id,t:4}));
  building(g,0,0,400,500);assert.equal(g.capacity(0),66);
});

test('隐身科技被终极研究锁定；四阵营可选科技遵守互斥规则',()=>{
  for(let f=0;f<4;f++){
    let g=arena(f),lab=building(g,0,3);assert.ok(g.command(0,{type:'research',id:lab.id,t:5}));g.players[0].tech.push(3);assert.equal(g.command(0,{type:'research',id:lab.id,t:5}),'');
    const defs=factionResearch[f],first=defs.find(r=>r.exclusive?.length);assert.ok(first,'faction has a mutually exclusive upgrade branch');
    lab.queue=[];g.players[0].tech.push(first.id);assert.ok(g.command(0,{type:'research',id:lab.id,t:first.exclusive[0]}));
  }
});

test('终极专属技能有科技门槛、所有权和冷却校验',()=>{
  for(let f=0;f<4;f++){
    let terminal=abilities.filter(a=>a.f===f&&a.tech===3);assert.ok(terminal.length,'each faction has terminal abilities');
    for(let a of terminal){let g=arena(f),e=g.spawn(0,a.kind||'u',a.types[0],600,400);e.cd=Infinity;
      let target=a.mode==='target'?building(g,0,5,690,400):null;
      assert.ok(cast(g,e,a.id,{x:650,y:400},{target:target?.id}),`${a.id} requires terminal research`);
      g.players[0].tech.push(3);
      assert.ok(g.command(1,{type:'ability',id:e.id,ability:a.id,x:650,y:400,target:target?.id}),`${a.id} respects ownership`);
    }
  }
});

test('机械电弧可以弹射，巨像与虚空射手的穿透命中后排',()=>{
  let g=arena(1);unit(g,0,2);let targets=[dummy(g,650,400),dummy(g,675,400),dummy(g,700,400)];g.step(.1);assert.equal(targets.filter(e=>e.hp<e.max).length,3);
  for(let [f,t] of [[1,5],[2,6]]){let h=arena(f);unit(h,0,t);let ts=[dummy(h,645,400),dummy(h,665,400)];h.step(.1);assert.equal(ts.filter(e=>e.hp<e.max).length,2,`faction ${f} unit ${t} pierces aligned targets`);}
});

test('人类火箭反重甲、突击车反轻甲，治疗兵自动支援',()=>{
  let rocket=arena(0);unit(rocket,0,2);let heavy=building(rocket,1,0,680,400);heavy.hp=heavy.max=1000;heavy.cd=Infinity;rocket.step(.1);assert.ok(1000-heavy.hp>24);
  let car=arena(0);unit(car,0,4);let light=dummy(car,660,400);car.step(.1);assert.ok(1000-light.hp>24);
  let heal=arena(0),medic=unit(heal,0,3),wounded=unit(heal,0,1,620,400);wounded.hp=30;tick(heal,1);assert.ok(wounded.hp>30);assert.ok(medic.hp>0);
});

test('人类爆破兵属于生物单位，能被医疗兵治疗而不能被工兵修理',()=>{
  let g=arena(0),medic=unit(g,0,3),bomber=unit(g,0,8,620,400),worker=unit(g,0,0,640,400);bomber.hp=30;bomber.cd=Infinity;tick(g,1);assert.ok(bomber.hp>30);assert.equal(g.mechanical(bomber),false);assert.ok(cast(g,worker,'repair',{x:bomber.x,y:bomber.y}));assert.ok(medic.hp>0);
});

test('虫群建造消耗工虫，完工补回一名免费工虫',()=>{
  let g=arena(3);unit(g,0,0,620,400);let before=g.players[0].money;
  assert.equal(g.command(0,{type:'build',t:1,x:680,y:400}),'');assert.equal(g.own(0).filter(e=>e.k==='u'&&e.t===0).length,0);assert.equal(g.players[0].money,before-factions[3].cost[1]);
  tick(g,factions[3].time[1]+1);assert.equal(g.own(0).filter(e=>e.k==='u'&&e.t===0).length,1);assert.equal(g.players[0].money,before-factions[3].cost[1]);
});

test('母巢与育虫池按9秒和12秒分别产生幼虫',()=>{
  let g=arena(3);g.own(0)[0].larvae=0;g.syncLarvae(0);building(g,0,5,650,400);tick(g,8.8);assert.equal(g.players[0].larvae,0);tick(g,.4);assert.equal(g.players[0].larvae,1);tick(g,3);assert.equal(g.players[0].larvae,2);
});

test('爆破兵终极研究后才能训练，爆炸有预警且不伤友军，冷却中不能重复',()=>{
  let g=arena(0),factory=building(g,0,2);assert.ok(g.command(0,{type:'train',id:factory.id,t:8}));g.players[0].tech.push(3);assert.equal(g.command(0,{type:'train',id:factory.id,t:8}),'');factory.queue=[];
  let bomber=unit(g,0,8),enemy=dummy(g,690,400),friend=unit(g,0,1,680,430);bomber.cd=friend.cd=Infinity;
  assert.equal(cast(g,bomber,'demolition',{x:690,y:400}),'');assert.equal(enemy.hp,1000);assert.ok(cast(g,bomber,'demolition',{x:690,y:400}));
  tick(g,1);assert.equal(enemy.hp,1000);tick(g,.6);assert.equal(enemy.hp,860);assert.equal(friend.hp,friend.max);
  assert.ok(bomber.abilityCD.demolition>38);assert.ok(cast(g,bomber,'demolition',{x:NaN,y:400}));
});

test('机械光束命中直线敌军，终极超频实际提高攻击与移动并自然到期',()=>{
  let g=arena(1);g.players[0].tech.push(3);let commander=unit(g,0,7),friend=unit(g,0,1,620,430),enemy=dummy(g,700,400),rear=dummy(g,780,400);commander.cd=friend.cd=Infinity;
  assert.equal(cast(g,commander,'beam',{x:700,y:400}),'');assert.equal(enemy.hp,900);assert.equal(rear.hp,900);assert.ok(cast(g,commander,'beam',{x:700,y:400}));
  assert.equal(cast(g,commander,'overclock'),'');assert.ok(friend.status.overclockUntil>g.time);let before=friend.x;g.move(friend,{x:friend.x+500,y:friend.y},1);assert.ok(friend.x-before>factions[1].units[1][8]);
  g.attack(friend,enemy,[enemy]);assert.ok(friend.cd<factions[1].units[1][6]);tick(g,10.2);assert.ok(friend.status.overclockUntil<=g.time);
});

test('精灵庇护恢复护盾，虫群狂潮提高攻速；两者均有冷却',()=>{
  let g=arena(2);g.players[0].tech.push(3);let phoenix=unit(g,0,7),ally=unit(g,0,4,620,430);ally.shield=0;assert.equal(cast(g,phoenix,'sanctuary'),'');assert.equal(ally.shield,80);assert.ok(ally.status.sanctuaryUntil>g.time);assert.ok(cast(g,phoenix,'sanctuary'));
  let h=arena(3);h.players[0].tech.push(3);let king=unit(h,0,7),claw=unit(h,0,1,620,430),enemy=dummy(h,650,430);assert.equal(cast(h,king,'frenzy'),'');h.attack(claw,enemy,[enemy]);assert.ok(claw.cd<factions[3].units[1][6]);assert.ok(cast(h,king,'frenzy'));
});

test('工兵修理耗费晶矿，坦克架设后不移动且射程更远',()=>{
  let g=arena(0),engineer=unit(g,0,0),tank=unit(g,0,5,640,400);tank.hp=100;tank.cd=Infinity;let money=g.players[0].money;
  assert.equal(cast(g,engineer,'repair',{x:tank.x,y:tank.y}),'');tick(g,1);assert.ok(tank.hp>100);assert.ok(g.players[0].money<money);
  let h=arena(0),siege=unit(h,0,5),target=dummy(h,780,400);building(h,0,1,700,500);assert.equal(cast(h,siege,'siege'),'');h.command(0,{type:'order',ids:[siege.id],action:'move',x:900,y:400});let x=siege.x;h.step(.1);assert.equal(siege.x,x);assert.ok(target.hp<1000);
});

test('爆破兵隐身有可复现概率；扫描揭示隐身，攻击后显形',()=>{
  function sequence(seed){let g=arena(0,{seed});g.players[0].tech.push(3,5);return Array.from({length:200},()=>unit(g,0,8).stealth);}
  let a=sequence(91);assert.deepEqual(a,sequence(91));assert.ok(a.filter(Boolean).length>40&&a.filter(Boolean).length<110);let noTech=arena(0);assert.equal(unit(noTech,0,8).stealth,false);
  let g=arena(0);g.players[0].tech.push(3,5);let bomber=unit(g,0,8),observer=unit(g,1,0,650,400),radar=building(g,1,5,1000,400);bomber.stealth=true;bomber.cloakCapable=true;bomber.cd=observer.cd=Infinity;
  assert.equal(g.visible(1,bomber),false);assert.equal(cast(g,radar,'scan',{x:600,y:400}),'');assert.equal(g.visible(1,bomber),true);tick(g,8.2);assert.equal(g.visible(1,bomber),false);
  g.attack(bomber,observer,[observer]);assert.equal(bomber.stealth,false);assert.equal(g.visible(1,bomber),true);
});

test('方尖碑传送需引导、限8人口；任一方尖碑摧毁会取消',()=>{
  for(let cancel of [false,true]){let g=arena(2),source=building(g,0,5,600,400),destination=building(g,0,5,1000,400);let squad=Array.from({length:10},(_,i)=>unit(g,0,1,620+i,420));squad.forEach(e=>e.cd=Infinity);
    assert.equal(cast(g,source,'teleport',{x:destination.x,y:destination.y}),'');tick(g,1);assert.ok(squad.every(e=>e.x<800));if(cancel)destination.hp=0;tick(g,1.2);
    assert.equal(squad.filter(e=>e.x>900).length,cancel?0:8);assert.ok(source.abilityCD.teleport>37);
  }
});

test('冰霜风暴按描述共60点伤害并减速，凤凰点燃造成持续伤害',()=>{
  let g=arena(2),mage=unit(g,0,4),enemy=dummy(g,690,400);mage.cd=Infinity;assert.equal(cast(g,mage,'storm',{x:690,y:400}),'');tick(g,1.1);assert.ok(enemy.status.slowUntil>g.time);tick(g,2.1);assert.equal(enemy.hp,940);
  let h=arena(2),phoenix=unit(h,0,7),target=dummy(h,650,400);h.step(.1);assert.ok(target.status.burnUntil>h.time);phoenix.hp=0;let hp=target.hp;tick(h,1);assert.ok(target.hp<hp);
});

test('虫群潜伏不能移动，破土首击增强，腐蚀减甲与巨兽减速生效',()=>{
  let g=arena(3),hunter=unit(g,0,4);assert.equal(cast(g,hunter,'burrow'),'');let x=hunter.x;g.command(0,{type:'order',ids:[hunter.id],action:'move',x:900,y:400});tick(g,1);assert.equal(hunter.x,x);assert.equal(hunter.stealth,true);
  assert.equal(cast(g,hunter,'burrow'),'');let target=dummy(g,620,400);g.step(.1);assert.ok(1000-target.hp>factions[3].units[4][5]);
  let h=arena(3),acid=unit(h,0,2),enemy=dummy(h,660,400);h.step(.1);assert.ok(enemy.status.acidUntil>h.time);acid.hp=0;let beast=unit(h,0,6,650,400);h.step(.1);assert.ok(enemy.status.slowUntil>h.time);assert.ok(beast.hp>0);
});

test('虫王临时召唤不占人口、不增加得分且12秒后消失',()=>{
  let g=arena(3);g.players[0].tech.push(3);let king=unit(g,0,7),pop=g.pop(0),score=g.score(0);assert.equal(cast(g,king,'summon'),'');let summons=g.own(0).filter(e=>e.summonedUntil);assert.equal(summons.length,2);assert.equal(g.pop(0),pop);assert.equal(g.score(0),score);assert.ok(cast(g,king,'summon'));
  tick(g,12.2);assert.equal(g.own(0).filter(e=>e.summonedUntil).length,0);assert.equal(g.pop(0),pop);
});

test('能源节点加快生产，机械自愈与精灵脱战护盾按研究生效',()=>{
  let g=arena(1),barracks=building(g,0,1,600,400);building(g,0,5,700,400);assert.equal(g.command(0,{type:'train',id:barracks.id,t:1}),'');tick(g,10);assert.ok(barracks.queue[0].left<1.1);assert.ok(barracks.queue[0].left>.8);
  let robot=unit(g,0,1,1100,500);robot.hp=50;robot.lastHit=g.time;g.players[0].tech.push(9);tick(g,6);assert.ok(robot.hp>50);
  let h=arena(2),archer=unit(h,0,1);archer.shield=0;archer.lastHit=0;tick(h,4);assert.equal(archer.shield,0);h.players[0].tech.push(6);tick(h,2);assert.ok(archer.shield>6.5);
});

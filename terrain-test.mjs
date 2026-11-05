import test from 'node:test';
import assert from 'node:assert/strict';
import {Game,W,H,mines,rocks,spawnPoints,groundAt,factions} from './public/engine.js';
import {groundTiles,terrainCols,terrainRows} from './public/terrain.js';
const tick=(g,t)=>{for(let n=0;n<t*10;n++)g.step(.1);};
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
test('larger irregular map has symmetric terrain, finite accessible deposits and distinct random corner starts',()=>{
 assert.equal(W,3200);assert.equal(H,2080);assert.equal(mines.length,22);assert.ok(groundTiles.some(v=>!v));
 for(let y=0;y<terrainRows;y++)for(let x=0;x<terrainCols;x++){let v=groundTiles[y*terrainCols+x];assert.equal(v,groundTiles[y*terrainCols+terrainCols-1-x]);assert.equal(v,groundTiles[(terrainRows-1-y)*terrainCols+x]);}
 for(let m of mines){assert.ok(groundAt(m.x,m.y,40));assert.equal(m.remaining,m.capacity);}
 const pairs=new Set();for(let seed=0;seed<120;seed++){
  let g=new Game({ai:false,seed:Math.imul(seed+1,2654435761)>>>0}),bases=[g.own(0)[0],g.own(1)[0]],ids=bases.map(b=>spawnPoints.findIndex(p=>distance(p,b)===0));
  assert.ok(ids.every(i=>i>=0));assert.notEqual(ids[0],ids[1]);pairs.add(ids.join(','));
  for(let p=0;p<2;p++){assert.ok(g.openSpot(bases[p].x,bases[p].y,34,bases[p].id));assert.ok(g.knownMines[p].has(ids[p]));for(let u of g.own(p))assert.ok(groundAt(u.x,u.y,u.r));}
 }
 assert.equal(pairs.size,12);assert.deepEqual(new Game({seed:55}).starts,new Game({seed:55}).starts);
});
test('every corner can mine immediately with all four factions',()=>{
 for(let f=0;f<4;f++)for(let seed of [0,99,2134,932774]){let g=new Game({ai:false,f0:f,f1:f,seed});tick(g,20);for(let p of g.players)assert.ok(p.money>=400);}
});
test('ground routes link all starts and deposits without cutting cliffs; heavy units also fit narrow roads',()=>{
 let g=new Game({ai:false});g.entities=[];
 for(let t of [0,5])for(let a of spawnPoints)for(let b of [...spawnPoints,...mines]){
  let u=g.spawn(0,'u',t,a.x,a.y),last={x:u.x,y:u.y},length=0;
  for(let n=0;n<2500;n++){let done=g.move(u,b,.1);assert.ok(groundAt(u.x,u.y,u.r),`cliff at ${u.x},${u.y}`);length+=distance(last,u);last={x:u.x,y:u.y};if(done)break;}
  assert.ok(distance(u,b)<4,`unreachable ${JSON.stringify(a)} -> ${JSON.stringify(b)} (${u.x},${u.y})`);u.hp=0;
 }
});
test('cliffs cannot be built on; movement to a void point stops on nearby reachable ground',()=>{
 let g=new Game({ai:false});g.entities=[];g.players[0].money=10000;g.spawn(0,'b',0,900,400);g.spawn(0,'u',0,950,400);
 assert.equal(groundAt(1150,400),false);assert.equal(g.validSpot(0,1,1150,400),false);
 let u=g.spawn(0,'u',1,900,400);for(let i=0;i<1500;i++){if(g.move(u,{x:1150,y:400},.1))break;}
 assert.ok(groundAt(u.x,u.y,u.r));assert.ok(distance(u,{x:1150,y:400})>25);
});
test('airborne base speed is 20, ignores buildings and cliffs, cannot land on either, and clears ground traffic',()=>{
 let g=new Game({ai:false});g.entities=[];let base=g.spawn(0,'b',0,900,400),obstacle=g.spawn(0,'b',1,980,400),walker=g.spawn(0,'u',1,920,400);
 assert.equal(g.command(0,{type:'pack',id:base.id}),'');assert.equal(g.flying(base),true);
 assert.equal(g.canWalk(base.x,base.y,9),true);
 g.move(base,{x:1400,y:400},4);assert.ok(Math.abs(base.x-980)<1e-6);assert.equal(g.command(0,{type:'pack',id:base.id}).includes('无法展开'),true);
 g.move(base,{x:1400,y:400},8.5);assert.ok(Math.abs(base.x-1150)<1e-6);assert.equal(g.command(0,{type:'pack',id:base.id}).includes('无法展开'),true);
 g.move(base,{x:1400,y:400},12.5);assert.ok(Math.abs(base.x-1400)<1e-6);assert.equal(g.command(0,{type:'pack',id:base.id}),'');assert.equal(g.flying(base),false);
 let air=g.spawn(0,'u',6,900,440);g.move(air,{x:1400,y:440},6);assert.ok(air.x>1300);
});
test('each faction builds an affordable radar, scans any point for exactly 7 seconds, cools down for 45 and keeps enemy fog private',()=>{
 for(let f=0;f<4;f++){
  let g=new Game({ai:false,f0:f,f1:2});g.entities=[];g.spawn(0,'b',0,400,400);g.spawn(1,'b',0,2800,1680);g.spawn(0,'b',1,580,400);g.spawn(0,'u',0,500,450);g.players[0].money=120;
  let t=f===0?5:6;assert.equal(factions[f].cost[t],120);assert.equal(g.command(0,{type:'build',t,x:700,y:400}),'');assert.equal(g.players[0].money,0);
  let radar=g.own(0).find(e=>e.k==='b'&&e.t===t),enemy=g.spawn(1,'u',3,2600,1600);enemy.stealth=true;enemy.cd=999;
  const scan=p=>g.command(p,{type:'ability',id:radar.id,ability:'scan',x:2600,y:1600});assert.ok(scan(0));tick(g,20.1);assert.ok(scan(1));assert.equal(g.visible(0,enemy),false);
  assert.equal(scan(0),'');assert.equal(radar.abilityCD.scan,45);assert.equal(g.scans[0].radius,240);assert.equal(g.visible(0,enemy),true);assert.equal(g.snapshot(1).scans.length,0);assert.ok(scan(0));
  tick(g,6.8);assert.equal(g.visible(0,enemy),true);tick(g,.3);assert.equal(g.visible(0,enemy),false);assert.ok(!g.snapshot(0).entities.some(e=>e.id===enemy.id));assert.ok(scan(0));tick(g,38);assert.equal(scan(0),'');
 }
});
test('navigation updates when buildings are raised, landed or destroyed; units cannot clip through new blockers',()=>{
 let g=new Game({ai:false});g.entities=[];let u=g.spawn(0,'u',1,600,400),target={x:950,y:400};g.move(u,target,.1);let b=g.spawn(0,'b',0,760,400);
 for(let i=0;i<120;i++){g.move(u,target,.1);assert.ok(distance(u,b)>=u.r+b.r+1);}
 assert.ok(distance(u,target)<4);b.packed=true;u.x=600;u.y=400;for(let i=0;i<70;i++)g.move(u,target,.1);assert.ok(Math.abs(u.y-400)<1);assert.ok(distance(u,target)<4);
});

test('nearby squads reuse valid routes and still reach their own destinations',()=>{
 const g=new Game({ai:false});g.entities=[];const squad=Array.from({length:12},(_,i)=>g.spawn(0,'u',1,430+i*5,450));const goals=squad.map((_,i)=>({x:2700+i*4,y:1600}));
 for(let i=0;i<squad.length;i++)g.move(squad[i],goals[i],.1);assert.ok(g.navCache.routes.length<4,'squad shares routes instead of repeating A* for each soldier');
 for(let n=0;n<1200;n++)for(let i=0;i<squad.length;i++){g.move(squad[i],goals[i],.1);assert.ok(groundAt(squad[i].x,squad[i].y,squad[i].r));}
 for(let i=0;i<squad.length;i++)assert.ok(distance(squad[i],goals[i])<4);
});

export const W=2400,H=1520;
export const factions=[
 {name:'人类联邦',tag:'火力 · 医疗 · 机械化',build:['指挥中心','步兵兵营','机械工厂','军事研究院','自动炮塔','雷达站'],cost:[340,140,205,220,100,110],time:[42,18,27,30,16,18],units:[['工程兵',50,8,65,0,3,1.2,24,60,1],['步枪兵',70,10,85,0,9,.8,108,60,1],['火箭兵',110,15,100,0,24,1.9,120,54,1],['医疗兵',120,18,85,0,0,1,96,62,1],['突击车',145,20,175,1,24,1.1,96,86,2],['攻城坦克',230,32,310,2,48,2.8,144,40,3],['战斗机',260,35,195,1,16,.9,108,92,3],['毁灭机甲',390,50,540,3,40,1.5,120,46,5],['爆破兵',280,38,115,1,5,1.5,80,60,2]]},
 {name:'机械主脑',tag:'重甲 · 电弧 · 能源网络',build:['主脑核心','自动装配厂','重械工厂','主脑实验室','激光防御塔','能源节点'],cost:[360,145,210,230,115,90],time:[45,19,29,32,17,14],units:[['采集机器人',50,8,70,1,2,1.2,24,58,1],['哨卫机器人',80,12,110,1,11,1.1,96,56,1],['电弧机器人',110,16,90,0,8,.8,96,64,1],['维修无人机',125,18,85,0,0,1,96,66,1],['悬浮猎手',165,23,175,1,15,.9,108,84,2],['重装巨像',250,34,410,3,37,1.6,72,36,3],['轨道炮台机',285,39,210,1,75,3.2,168,36,3],['主脑歼灭者',420,52,630,3,68,2.3,132,44,5]]},
 {name:'星界精灵',tag:'护盾 · 机动 · 奥术',build:['星界主殿','月华兵营','星辉祭坛','奥术圣殿','星晶防御塔','传送方尖碑'],cost:[350,145,205,235,110,120],time:[42,18,28,32,17,20],units:[['晶灵',50,8,55,0,2,1.2,24,62,1,25],['星弓手',85,12,65,0,12,1,120,64,1,40],['魔刃使',110,16,100,1,17,.9,24,76,1,45],['影刃刺客',150,21,85,0,25,1.3,24,90,2,55],['星界法师',175,24,80,0,30,2.4,120,54,2,80],['元素守卫',240,34,240,2,30,1.7,36,48,3,110],['虚空射手',255,36,120,0,36,2.5,168,60,3,85],['星界凤凰',400,50,300,1,34,1.7,96,88,5,220]]},
 {name:'古老虫群',tag:'孵化 · 酸液 · 数量压制',build:['原初母巢','基础孵化巢','生物变异巢','原初进化池','棘刺防御巢','育虫池'],cost:[325,135,200,225,95,105],time:[40,18,27,31,16,17],units:[['工虫',45,7,55,0,3,1.1,24,62,1],['裂爪虫',45,6,55,0,7,.6,24,80,1],['喷酸虫',85,11,75,0,13,1.4,96,56,1],['飞翼虫',110,16,95,0,9,.7,72,86,1],['掘地猎虫',145,20,165,1,23,1.1,24,72,2],['爆裂虫',120,16,65,0,75,1,24,68,1],['装甲巨兽',260,35,390,3,34,1.4,36,44,3],['原初虫王',390,48,520,2,42,1.6,84,50,5]]}
];
export const prerequisites=[-1,0,1,2,1,1];
export const research=[{id:0,name:'武器强化',cost:130,time:22,desc:'全军伤害 +15%'},{id:1,name:'防护强化',cost:140,time:24,desc:'全军护甲 +1'},{id:2,name:'高效采集',cost:150,time:25,desc:'每次采集 +3 晶矿'},{id:3,name:'终极单位与专属协议',cost:260,time:36,desc:'解锁终极单位及阵营终极技能'},{id:4,name:'人口扩展',cost:180,time:30,desc:'永久人口上限 +12'},{id:5,name:'隐匿协议',cost:200,time:30,requires:3,desc:'新爆破兵35%获得隐身，机械猎手可隐身；隐匿单位破隐一击伤害 +15%'}];
export const mines=[
 [110,180,1400],[330,340,1600],[170,650,2000],[420,1120,2200],
 [780,220,2400],[830,760,2600],[830,1300,2400],[1120,480,3000],[1080,1000,3000]
].flatMap(([x,y,capacity])=>[{x,y,capacity,remaining:capacity},{x:W-x,y:H-y,capacity,remaining:capacity}]);
export const rocks=[{x:880,y:220,r:48},{x:1520,y:1300,r:48},{x:840,y:880,r:38},{x:1560,y:640,r:38},{x:530,y:650,r:46},{x:1870,y:870,r:46},{x:500,y:200,r:36},{x:1900,y:1320,r:36},{x:1120,y:1240,r:44},{x:1280,y:280,r:44}];
// Faction research IDs are stable within a player's faction.
export const factionResearch=[
 [{id:6,name:'强化弹药',cost:115,time:20,desc:'步枪兵伤害 +15%',exclusive:[9]},{id:7,name:'战地医疗',cost:135,time:24,desc:'医疗兵治疗效率 +25%'},{id:8,name:'火炮增程',cost:185,time:32,desc:'坦克攻城模式射程 +36'},{id:9,name:'快速装填',cost:160,time:28,desc:'步枪兵攻速 +12%',exclusive:[6]}],
 [{id:6,name:'激光聚焦',cost:130,time:22,desc:'哨卫与悬浮猎手伤害 +12%',exclusive:[9]},{id:7,name:'能源循环',cost:140,time:25,desc:'能源节点范围 +72'},{id:8,name:'电磁穿甲',cost:195,time:32,desc:'轨道炮对重甲伤害 +25%'},{id:9,name:'自我修复',cost:175,time:29,desc:'机械单位脱战后每秒恢复2生命',exclusive:[6]}],
 [{id:6,name:'护盾强化',cost:145,time:22,desc:'护盾恢复速度 +40%',exclusive:[7]},{id:7,name:'奥术穿透',cost:165,time:28,desc:'远程武器忽略1护甲',exclusive:[6]},{id:8,name:'星界折跃',cost:135,time:24,desc:'方尖碑传送冷却减为30秒'},{id:9,name:'魔法共鸣',cost:185,time:32,desc:'冰霜风暴伤害 +20%'}],
 [{id:6,name:'利爪进化',cost:110,time:20,desc:'裂爪虫伤害 +15%',exclusive:[7]},{id:7,name:'甲壳强化',cost:145,time:24,desc:'虫群单位护甲 +1',exclusive:[6]},{id:8,name:'毒液变异',cost:165,time:28,desc:'喷酸虫伤害 +20%'},{id:9,name:'繁殖进化',cost:175,time:30,desc:'幼虫产生速度 +20%'}]
];
export const abilities=[
 {id:'repair',name:'修理',f:[0,1],kind:'u',types:[0],tech:null,mode:'point',range:80,radius:0,cooldown:0,desc:'修理附近友方机械与建筑，每秒消耗2晶矿恢复10生命'},
 {id:'siege',name:'切换攻城模式',f:0,kind:'u',types:[5],tech:null,mode:'toggle',range:0,radius:0,cooldown:0,desc:'固定在原地，射程192，范围炮击'},
 {id:'scan',name:'雷达扫描',f:0,kind:'b',types:[5],tech:null,mode:'point',range:Math.hypot(W,H),radius:180,cooldown:30,desc:'揭示目标范围及隐身敌人8秒'},
 {id:'mechBlast',name:'聚能轰击',f:0,kind:'u',types:[7],tech:3,mode:'point',range:240,radius:75,cooldown:18,desc:'对目标范围造成85伤害'},
 {id:'demolition',name:'定点爆破',f:0,kind:'u',types:[8],tech:3,mode:'point',range:300,radius:110,cooldown:40,desc:'确认区域后预警1.5秒，引爆大范围140伤害；隐匿协议使新爆破兵35%获得隐身'},
 {id:'beam',name:'毁灭光束',f:1,kind:'u',types:[7],tech:3,mode:'point',range:260,radius:28,cooldown:22,desc:'对前方直线敌军造成100伤害'},
 {id:'overclock',name:'主脑超频',f:1,kind:'u',types:[7],tech:3,mode:'self',range:0,radius:150,cooldown:35,desc:'附近友军攻击与移动速度 +25%，持续10秒'},
 {id:'cloak',name:'隐匿/显形',f:1,kind:'u',types:[4],tech:5,mode:'toggle',range:0,radius:0,cooldown:12,desc:'悬浮猎手进入隐身，攻击后显形12秒'},
 {id:'cloak',name:'隐匿/显形',f:2,kind:'u',types:[3],tech:null,mode:'toggle',range:0,radius:0,cooldown:12,desc:'影刃刺客进入隐身，攻击后显形12秒'},
 {id:'storm',name:'冰霜风暴',f:2,kind:'u',types:[4],tech:null,mode:'point',range:230,radius:65,cooldown:16,desc:'3秒内造成60伤害并使敌军减速25%'},
 {id:'teleport',name:'方尖碑传送',f:2,kind:'b',types:[5],tech:null,mode:'point',range:Math.hypot(W,H),radius:100,cooldown:40,desc:'选择另一座己方方尖碑，2秒后传送附近最多8人口地面部队'},
 {id:'sanctuary',name:'星界庇护',f:2,kind:'u',types:[7],tech:3,mode:'self',range:0,radius:150,cooldown:35,desc:'附近友军恢复80护盾，移动速度 +20%，持续8秒'},
 {id:'burrow',name:'潜伏/破土',f:3,kind:'u',types:[4],tech:null,mode:'toggle',range:0,radius:0,cooldown:0,desc:'潜伏时不能移动且隐身，破土首次攻击伤害 +50%'},
 {id:'detonate',name:'自爆',f:3,kind:'u',types:[5],tech:null,mode:'self',range:0,radius:55,cooldown:0,desc:'对周围敌军造成75伤害，爆裂虫死亡'},
 {id:'summon',name:'召唤裂爪虫',f:3,kind:'u',types:[7],tech:3,mode:'self',range:0,radius:0,cooldown:25,desc:'召唤2只裂爪虫，持续12秒，不占人口且不计分'},
 {id:'frenzy',name:'原初狂潮',f:3,kind:'u',types:[7],tech:3,mode:'self',range:0,radius:150,cooldown:35,desc:'附近虫群攻击速度 +25%，持续12秒'}
];
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const pointValid=c=>Number.isFinite(c.x)&&Number.isFinite(c.y)&&c.x>=0&&c.x<=W&&c.y>=0&&c.y<=H;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const matches=(a,f)=>Array.isArray(a.f)?a.f.includes(f):a.f===f;
const lineDistance=(t,a,b)=>{let dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy,q=len?clamp(((t.x-a.x)*dx+(t.y-a.y)*dy)/len,0,1):0;return Math.hypot(t.x-a.x-q*dx,t.y-a.y-q*dy);};
export class Game{
 constructor(opts={}){
  this.time=0;this.id=1;this.entities=[];this.effects=[];this.events=[];this.scans=[];this.seed=(Number.isFinite(opts.seed)?opts.seed:Math.floor(Math.random()*4294967296))>>>0;
  this.mines=mines.map(m=>({...m}));this.knownMines=[new Set(),new Set()];this.mode=opts.rule||'normal';this.difficulty=opts.difficulty||'normal';this.ai=opts.ai!==false;
  this.players=[opts.f0||0,opts.f1??1].map(f=>({f,money:250,tech:[],kills:0,hold:0,control:0,larvae:4,larvaClock:0}));this.winner=null;this.reason='';this.aiClock=0;this.attackClock=0;
  const randomSides=opts.spawnLayout==='random-sides';
  const starts=randomSides?[this.sideSpawn(0),this.sideSpawn(1)]:[{x:150,y:270},{x:W-150,y:H-270}];
  for(let p=0;p<2;p++){
   const start=starts[p];
   // Each side keeps the same nearby starting deposit and hauling distance.
   if(randomSides)Object.assign(this.mines[p],{x:start.x+(p?40:-40),y:start.y+(p?90:-90)});
   let b=this.spawn(p,'b',0,start.x,start.y);for(let i=0;i<4;i++){let u=this.spawn(p,'u',0,b.x+(i-1.5)*18,b.y+(p?-55:55));u.order={type:'mine',mine:p};}
  }
  this.discoverMines();
 }
 random(){this.seed=(Math.imul(1664525,this.seed)+1013904223)>>>0;return this.seed/4294967296;}
 sideSpawn(p){
  const x=p?W-150:150,candidates=[],neutral=this.mines.slice(2);
  for(let y=140;y<=H-140;y++){
   const base={x,y,r:34},deposit={x:x+(p?40:-40),y:y+(p?90:-90)};
   const occupied=[base,...Array.from({length:4},(_,i)=>({x:x+(i-1.5)*18,y:y+(p?-55:55),r:9}))];
   if(occupied.some(e=>rocks.some(o=>dist(e,o)<e.r+o.r+15)||neutral.some(m=>dist(e,m)<e.r+40)))continue;
   if(neutral.some(m=>dist(deposit,m)<160)||rocks.some(o=>dist(deposit,o)<o.r+45))continue;
   candidates.push(y);
  }
  if(!candidates.length)throw Error('地图两侧没有安全出生位置');
  return {x,y:candidates[Math.floor(this.random()*candidates.length)]};
 }
 def(e){return factions[this.players[e.p].f].units[e.t];}
 tech(p,id){return this.players[p].tech.includes(id);}
 researchDef(p,t){return t<6?research[t]:factionResearch[this.players[p].f].find(r=>r.id===t);}
 spawn(p,k,t,x,y){
  let f=this.players[p].f,d=factions[f].units[t];let hp=k==='b'?[[1600,750,850,650,480,500],[1700,800,900,700,520,550],[1300,600,700,550,390,450],[1450,700,800,650,500,500]][f][t]:d[3];
  let shield=f===2?(k==='b'?[350,150,180,150,120,100][t]:d[10]||0):0;
  let e={id:this.id++,p,k,t,x,y,hp,max:hp,shield,maxShield:shield,r:k==='b'?(t===0?34:25):(t>=5?14:9),queue:[],order:null,cd:0,lastHit:-99,build:0,fullBuild:0,packed:false,siege:false,burrowed:false,stealth:false,abilityCD:{},status:{},carry:0,larvaClock:0,larvae:0};
  if(k==='b'&&f===3&&(t===0||t===5))e.larvae=t===0?4:0;
  if(k==='u'&&f===2&&t===3)e.cloakCapable=true;
  if(k==='u'&&f===0&&t===8&&this.tech(p,5)){e.cloakCapable=this.random()<.35;e.stealth=e.cloakCapable;}
  this.entities.push(e);return e;
 }
 own(p){return this.entities.filter(e=>e.p===p&&e.hp>0);}
 pop(p){return this.own(p).reduce((n,e)=>n+(e.k==='u'&&!e.summonedUntil?this.def(e)[9]:0)+(e.replacementWorker?1:0)+e.queue.reduce((a,q)=>a+(q.kind==='unit'?factions[this.players[p].f].units[q.t][9]:0),0),0);}
 capacity(p){return 36+Math.max(0,this.own(p).filter(e=>e.k==='b'&&e.t===0&&!e.build).length-1)*18+(this.tech(p,4)?12:0);}
 has(p,t){return this.own(p).some(e=>e.k==='b'&&e.t===t&&!e.build&&!e.packed);}
 sight(p,e){return e.p===p||this.scans.some(s=>s.p===p&&dist(s,e)<s.radius)||this.own(p).some(a=>dist(a,e)<(a.k==='b'?210:170));}
 detected(p,e){return !e.stealth&&!e.burrowed||this.scans.some(s=>s.p===p&&dist(s,e)<s.radius)||this.own(p).some(a=>a.k==='b'&&a.t===5&&!a.build&&!a.packed&&dist(a,e)<160);}
 visible(p,e){return e.p===p||this.sight(p,e)&&this.detected(p,e);}
 discoverMines(){for(let p=0;p<2;p++)this.mines.forEach((m,i)=>{if(this.sight(p,m))this.knownMines[p].add(i);});}
 nearestMine(p,e){let best=-1,bestDistance=Infinity;for(let i of this.knownMines[p]){let m=this.mines[i],d=dist(e,m);if(m.remaining>0&&d<bestDistance){best=i;bestDistance=d;}}return best;}
 openSpot(x,y,r,ignore){return x>r&&x<W-r&&y>r&&y<H-r&&!this.entities.some(e=>e.k==='b'&&e.id!==ignore&&e.hp>0&&dist(e,{x,y})<e.r+r+10)&&!rocks.some(o=>dist(o,{x,y})<o.r+r+5)&&!this.mines.some(m=>dist(m,{x,y})<r+25);}
 validSpot(p,t,x,y){return pointValid({x,y})&&this.openSpot(x,y,t===0?34:25)&&this.own(p).some(e=>dist(e,{x,y})<230);}
 syncLarvae(p){this.players[p].larvae=this.own(p).filter(e=>e.k==='b'&&(e.t===0||e.t===5)&&!e.build).reduce((n,e)=>n+e.larvae,0);}
 spendLarvae(p,n){let sources=this.own(p).filter(e=>e.k==='b'&&(e.t===0||e.t===5)&&!e.build);for(let b of sources){let use=Math.min(n,b.larvae);b.larvae-=use;n-=use;if(!n)break;}this.syncLarvae(p);}
 entityAbilities(e){let f=this.players[e.p].f;return abilities.filter(a=>a.kind===e.k&&a.types.includes(e.t)&&matches(a,f)&&!(a.id==='cloak'&&!((f===1&&e.t===4)||(f===2&&e.t===3))));}
 reveal(e){e.stealth=false;e.cloakReady=this.time+12;if(e.burrowed){e.burrowed=false;e.ambush=true;}}
 command(p,c){
  if(this.winner!==null)return '对局已经结束';if(p!==0&&p!==1)return '无效玩家';let pl=this.players[p],f=factions[pl.f],e=this.entities.find(v=>v.id===c.id&&v.p===p&&v.hp>0);
  if(c.type==='surrender'){this.end(1-p,'对手投降');return '';}
  if(c.type==='execute'){if(!Array.isArray(c.ids))return '请选择己方工兵';let victims=this.own(p).filter(v=>v.k==='u'&&v.t===0&&c.ids.includes(v.id));if(!victims.length)return '只能处死己方工兵';for(let u of victims){u.hp=0;u.carry=0;}this.entities=this.entities.filter(v=>v.hp>0);return '';}
  if(c.type==='pack'){
   if(!e||e.k!=='b'||e.t!==0||e.build)return '请选择已完成的主基地';if(e.queue.length)return '请先完成或取消生产队列';
   if(e.packed){if(!this.openSpot(e.x,e.y,e.r,e.id))return '此处无法展开基地，请移动到空地';e.packed=false;e.order=null;}else{e.packed=true;e.order=null;}return '';
  }
  if(c.type==='build'){
   let t=c.t;if(!Number.isInteger(t)||t<0||t>5)return '无效建筑';let bs=this.own(p).filter(v=>v.k==='b');
   if(t===0&&bs.filter(v=>v.t===0).length>=2)return '最多两座主基地';
   if(t===5&&pl.f===2&&bs.filter(v=>v.t===5).length>=2)return '最多两座传送方尖碑';
   if(t===5&&pl.f===3&&bs.filter(v=>v.t===5).length>=bs.filter(v=>v.t===0&&!v.build).length)return '每座母巢最多对应一座育虫池';
   if(prerequisites[t]>=0&&!this.has(p,prerequisites[t]))return '需要先完成：'+f.build[prerequisites[t]];
   let workers=this.own(p).filter(v=>v.k==='u'&&v.t===0);if(!workers.length)return '需要一名工兵';if(!this.validSpot(p,t,c.x,c.y))return '无法在此建造：请靠近己方部队，并避开矿区、石块和建筑';if(pl.money<f.cost[t])return '晶矿不足';
   pl.money-=f.cost[t];let b=this.spawn(p,'b',t,c.x,c.y);b.build=b.fullBuild=f.time[t];
   if(pl.f===3){let worker=workers.sort((a,b)=>dist(a,c)-dist(b,c))[0];worker.hp=0;b.replacementWorker=true;this.entities=this.entities.filter(v=>v.hp>0);}return '';
  }
  if(c.type==='train'){
   let t=c.t;if(!Number.isInteger(t)||!f.units[t]||t<0||!e||e.k!=='b'||e.build||e.packed)return '请选择已完成且展开的生产建筑';
   if(e.t!==(t===0?0:t<4?1:2))return '生产建筑不匹配';if(t>=7&&!this.tech(p,3))return '请先研究终极单位与专属协议';let d=f.units[t];
   if(e.queue.length>=5)return '队列已满';if(pl.money<d[1])return '晶矿不足';if(this.pop(p)+d[9]>this.capacity(p))return '人口已达上限';let l=t>=7?3:t>=4?2:1;
   this.syncLarvae(p);if(pl.f===3&&pl.larvae<l)return '幼虫不足';if(pl.f===3)this.spendLarvae(p,l);pl.money-=d[1];e.queue.push({kind:'unit',t,left:d[2],total:d[2],cost:d[1]});return '';
  }
  if(c.type==='research'){
   let t=c.t;if(!Number.isInteger(t)||t<0||t>9)return '无效研究';let d=this.researchDef(p,t);if(!d||!e||e.k!=='b'||e.t!==3||e.build||e.packed)return '请选择已完成的科技建筑';if(t===5&&!this.tech(p,3))return '隐匿协议需要先完成终极研究';
   let pending=this.own(p).flatMap(b=>b.queue.filter(q=>q.kind==='tech').map(q=>q.t));if(pl.tech.includes(t)||pending.includes(t))return '已研究或正在研究';
   if(t>=6&&pl.tech.filter(v=>v>=6).length+pending.filter(v=>v>=6).length>=3)return '每局最多选择三项阵营科技';
   if(d.exclusive?.some(id=>pl.tech.includes(id)||pending.includes(id)))return '与已选择的科技路线互斥';if(pl.money<d.cost)return '晶矿不足';
   pl.money-=d.cost;e.queue.push({kind:'tech',t,left:d.time,total:d.time,cost:d.cost});return '';
  }
  if(c.type==='cancel'){if(e?.queue.length){let q=e.queue.pop();pl.money+=Math.floor(q.cost*.75);}return '';}
  if(c.type==='ability')return this.useAbility(p,e,c);
  if(c.type==='order'){
   if(c.action==='mine'&&Number.isInteger(c.mine)&&this.mines[c.mine]?.remaining===0)return '这处晶矿已枯竭，请寻找其他矿区';
   if(!Array.isArray(c.ids)||!pointValid(c))return '无效指令';let target=this.entities.find(v=>v.id===c.target&&this.visible(p,v));
   let units=this.own(p).filter(v=>(v.k==='u'||v.k==='b'&&v.t===0&&v.packed)&&c.ids.includes(v.id));
   units.forEach((u,i)=>{
    u.miningIdle=false;if(c.action==='stop'){u.order=null;return;}if(u.siege||u.burrowed)return;
    if(c.action==='mine'&&u.k==='u'&&u.t===0&&Number.isInteger(c.mine)&&this.mines[c.mine]){u.order={type:'mine',mine:c.mine};u.mineClock=0;return;}
    u.order={type:target&&target.p!==p?'attack':c.action==='attack'?'attackmove':'move',x:clamp(c.x+(i%5-2)*20,15,W-15),y:clamp(c.y+Math.floor(i/5)*20,15,H-15),target:target?.id};
   });return '';
  }
  return '未知指令';
 }
 useAbility(p,e,c){
  if(!e||e.build||e.hp<=0)return '请选择己方已完成的单位或建筑';let a=this.entityAbilities(e).find(v=>v.id===c.ability);if(!a)return '此单位没有该能力';
  let f=this.players[p].f;if(a.tech!==null&&!this.tech(p,a.tech)&&!(a.id==='cloak'&&f===2))return '请先完成所需研究';if(e.abilityCD[a.id]>0)return '技能冷却中：'+Math.ceil(e.abilityCD[a.id])+'秒';
  if(e.packed)return '基地移动中无法使用能力';if(a.mode==='point'&&(!pointValid(c)||dist(e,c)>a.range))return '目标超出施放范围';
  if(a.mode==='point'&&!['scan','teleport','repair'].includes(a.id)&&!this.sight(p,c))return '必须先侦察目标区域';
  let enemies=this.entities.filter(v=>v.p!==p&&v.hp>0),pl=this.players[p];
  if(a.id==='siege'){e.siege=!e.siege;e.order=null;return '';}
  if(a.id==='burrow'){e.burrowed=!e.burrowed;e.stealth=e.burrowed;e.order=null;if(!e.burrowed)e.ambush=true;return '';}
  if(a.id==='cloak'){e.cloakCapable=true;e.stealth=!e.stealth;if(e.stealth&&e.cloakReady>this.time){e.stealth=false;return '显形后需要等待12秒';}e.abilityCD[a.id]=e.stealth?0:12;return '';}
  if(a.id==='repair'){let target=this.own(p).filter(v=>v.id!==e.id&&v.hp<v.max&&(v.k==='b'||this.mechanical(v))&&dist(v,c)<v.r+35).sort((a,b)=>dist(a,c)-dist(b,c))[0];if(!target)return '请选择附近受伤的友方机械或建筑';e.order={type:'repair',target:target.id};return '';}
  if(a.id==='scan'){this.scans.push({p,x:c.x,y:c.y,radius:a.radius,until:this.time+8});}
  if(a.id==='teleport'){
   let target=this.own(p).find(v=>v.k==='b'&&v.t===5&&!v.build&&v.id!==e.id&&dist(v,c)<55);if(!target)return '请选择另一座己方已完成的方尖碑';
   let units=[],population=0;for(let u of this.own(p).filter(v=>v.k==='u'&&!this.flying(v)&&dist(v,e)<100).sort((a,b)=>a.id-b.id)){let pop=this.def(u)[9];if(population+pop<=8){population+=pop;units.push(u.id);}}
   if(!units.length)return '方尖碑附近没有可传送地面部队';this.events.push({kind:'teleport',p,x:e.x,y:e.y,target:target.id,source:e.id,units,remaining:2,radius:100});e.abilityCD[a.id]=this.tech(p,8)?30:40;return '';
  }
  if(a.id==='demolition'){this.events.push({kind:'blast',p,source:e.id,x:c.x,y:c.y,radius:a.radius,damage:140,remaining:1.5});this.reveal(e);}
  if(a.id==='mechBlast'){for(let t of enemies)if(dist(t,c)<a.radius+t.r)this.hit(t,85,e);this.areaEffect(c.x,c.y,a.radius,p,'blast');this.reveal(e);}
  if(a.id==='beam'){let d=dist(e,c)||1,goal={x:e.x+(c.x-e.x)/d*a.range,y:e.y+(c.y-e.y)/d*a.range};for(let t of enemies)if(lineDistance(t,e,goal)<a.radius+t.r)this.hit(t,100,e);this.effects.push({x:e.x,y:e.y,tx:goal.x,ty:goal.y,p,life:.5,kind:'beam'});this.reveal(e);}
  if(a.id==='storm'){this.events.push({kind:'storm',p,source:e.id,x:c.x,y:c.y,radius:a.radius,damage:this.tech(p,9)?24:20,remaining:3,until:this.time+3,nextTick:this.time+1});this.reveal(e);}
  if(['overclock','sanctuary','frenzy'].includes(a.id)){
   for(let u of this.own(p).filter(v=>v.k==='u'&&dist(v,e)<=a.radius)){if(a.id==='sanctuary'){u.shield=Math.min(u.maxShield,u.shield+80);u.status.sanctuaryUntil=this.time+8;}if(a.id==='overclock')u.status.overclockUntil=this.time+10;if(a.id==='frenzy')u.status.frenzyUntil=this.time+12;}this.areaEffect(e.x,e.y,a.radius,p,a.id);
  }
  if(a.id==='summon'){for(let i=0;i<2;i++){let u=this.spawn(p,'u',1,clamp(e.x+(i?22:-22),12,W-12),clamp(e.y+20,12,H-12));u.summonedUntil=this.time+12;u.order=e.order?{...e.order}:null;}this.areaEffect(e.x,e.y,45,p,'summon');}
  if(a.id==='detonate'){for(let t of enemies)if(dist(t,e)<a.radius+t.r)this.hit(t,75,e);e.hp=0;this.areaEffect(e.x,e.y,a.radius,p,'blast');}
  e.abilityCD[a.id]=a.cooldown;return '';
 }
 areaEffect(x,y,radius,p,kind){this.effects.push({x,y,tx:x,ty:y,radius,p,kind,life:.7});}
 mechanical(e){let f=this.players[e.p].f;return e.k==='b'||f===1||f===0&&[4,5,6,7].includes(e.t);}
 flying(e){return e.k==='u'&&((this.players[e.p].f===0&&e.t===6)||(this.players[e.p].f===2&&e.t===7)||(this.players[e.p].f===3&&e.t===3));}
 move(e,target,dt){
  if(e.siege||e.burrowed)return false;let d=dist(e,target);if(d<3)return true;let speed=e.k==='b'?14:this.def(e)[8];
  if(e.status.slowUntil>this.time)speed*=.75;if(e.status.overclockUntil>this.time)speed*=1.25;if(e.status.sanctuaryUntil>this.time)speed*=1.2;
  let dx=(target.x-e.x)/d,dy=(target.y-e.y)/d;
  if(!this.flying(e)){for(let o of [...rocks,...this.entities.filter(b=>b.k==='b'&&b.id!==e.id&&b.hp>0)]){let rr=o.r+e.r+6,dd=dist(e,o);if(dd<rr+20){let dot=dx*(o.x-e.x)+dy*(o.y-e.y);if(dot>0){let side=dx*(o.y-e.y)-dy*(o.x-e.x)>=0?1:-1;dx+=side*dy*1.8+(e.x-o.x)/Math.max(1,dd);dy-=side*((target.x-e.x)/d)*1.8;}}}}
  let len=Math.hypot(dx,dy);if(!len)return false;e.x=clamp(e.x+dx/len*Math.min(d,speed*dt),e.r,W-e.r);e.y=clamp(e.y+dy/len*Math.min(d,speed*dt),e.r,H-e.r);return false;
 }
 hit(target,damage,source,{ignore=0}={}){
  if(target.hp<=0)return;let f=this.players[target.p].f,armor=target.k==='b'?2:this.def(target)[4];armor+=(this.tech(target.p,1)?1:0)+(f===3&&this.tech(target.p,7)?1:0);if(target.status.acidUntil>this.time)armor--;armor=Math.max(0,armor-ignore);
  damage=Math.max(1,damage-armor);let absorbed=Math.min(target.shield,damage);target.shield-=absorbed;target.hp-=damage-absorbed;target.lastHit=this.time;
  if(target.hp<=0&&source?.p!==undefined&&source.p!==target.p&&!target.summonedUntil)this.players[source.p].kills++;
 }
 processEvents(dt){
  for(let event of this.events){event.remaining-=dt;let source=this.entities.find(e=>e.id===event.source&&e.hp>0);
   if(event.kind==='storm'){while(this.time>=event.nextTick&&event.nextTick<=event.until){event.nextTick+=1;for(let t of this.entities)if(t.p!==event.p&&t.hp>0&&dist(t,event)<event.radius+t.r){this.hit(t,event.damage,source||{p:event.p});t.status.slowUntil=this.time+1.1;}}}
   if(event.remaining>0)continue;
   if(event.kind==='blast'){for(let t of this.entities)if(t.p!==event.p&&t.hp>0&&dist(t,event)<event.radius+t.r)this.hit(t,event.damage,source||{p:event.p});this.areaEffect(event.x,event.y,event.radius,event.p,'blast');}
   if(event.kind==='teleport'){let target=this.entities.find(e=>e.id===event.target&&e.hp>0&&!e.build);if(source&&target){event.units.forEach((id,i)=>{let u=this.entities.find(e=>e.id===id&&e.hp>0);if(u&&dist(u,source)<120&&!u.burrowed){u.x=clamp(target.x+45+(i%3)*20,15,W-15);u.y=clamp(target.y+(Math.floor(i/3)-1)*20,15,H-15);u.order=null;}});this.areaEffect(target.x,target.y,90,event.p,'teleport');}}
  }this.events=this.events.filter(e=>e.remaining>0);this.scans=this.scans.filter(s=>s.until>this.time);
 }
 mining(e,dt){
  let pl=this.players[e.p],bases=this.own(e.p).filter(b=>b.k==='b'&&b.t===0&&!b.build&&!b.packed).sort((a,b)=>dist(a,e)-dist(b,e)),b=bases[0];if(!b){e.miningIdle=true;return;}
  if(e.carry>0){if(dist(e,b)<b.r+15){pl.money+=e.carry;e.carry=0;e.mineClock=0;}else this.move(e,b,dt);return;}
  let m=this.mines[e.order.mine];if(!m||m.remaining<=0){e.order.mine=this.nearestMine(e.p,e);e.mineClock=0;m=this.mines[e.order.mine];}e.miningIdle=!m;if(!m)return;
  if(dist(e,m)<24){e.mineClock=(e.mineClock||0)+dt;if(e.mineClock>=1.2){e.carry=Math.min(m.remaining,this.tech(e.p,2)?13:10);m.remaining-=e.carry;e.mineClock=0;}}else this.move(e,m,dt);
 }
 healAndRepair(e,dt){
  let f=this.players[e.p].f,pl=this.players[e.p];
  if(e.maxShield&&this.time-e.lastHit>5)e.shield=Math.min(e.maxShield,e.shield+5*(f===2&&this.tech(e.p,6)?1.4:1)*dt);
  if(f===3&&e.k==='b'&&this.time-e.lastHit>5)e.hp=Math.min(e.max,e.hp+2*dt);
  if(f===1&&this.time-e.lastHit>5){let range=170+(this.tech(e.p,7)?72:0),node=this.own(e.p).some(b=>b.k==='b'&&b.t===5&&!b.build&&dist(e,b)<range);if(node||e.k==='u'&&this.tech(e.p,9))e.hp=Math.min(e.max,e.hp+(node?3:2)*dt);}
  if(e.k==='u'&&e.t===0&&[0,1].includes(f)&&e.order?.type==='repair'){
   let target=this.entities.find(t=>t.id===e.order.target&&t.p===e.p&&t.hp>0);if(!target||target.hp>=target.max){e.order=null;return;}if(dist(e,target)>target.r+45){this.move(e,target,dt);return;}let spend=Math.min(pl.money,2*dt);pl.money-=spend;target.hp=Math.min(target.max,target.hp+spend*5);return;
  }
  if(e.k==='u'&&e.t===3&&[0,1].includes(f)){
   let target=this.own(e.p).filter(t=>t.k==='u'&&t.id!==e.id&&t.hp<t.max&&dist(t,e)<96&&(f===0?!this.mechanical(t):this.mechanical(t))).sort((a,b)=>a.hp/a.max-b.hp/b.max)[0];
   if(target){target.hp=Math.min(target.max,target.hp+(f===0?10*(this.tech(e.p,7)?1.25:1):9)*dt);if(e.cd<=0){this.effects.push({x:e.x,y:e.y,tx:target.x,ty:target.y,p:e.p,heal:true,life:.15});e.cd=.4;}}
  }
 }
 attack(e,target,enemies){
  let pl=this.players[e.p],f=pl.f,d=e.k==='u'?this.def(e):null,interval=e.k==='b'?1:d[6],damage=e.k==='b'?16:d[5];
  if(!damage)return;
  if(e.status.overclockUntil>this.time)interval/=1.25;if(e.status.frenzyUntil>this.time)interval/=1.25;
  if(f===0&&e.t===1&&this.tech(e.p,9))interval/=1.12;
  if(f===2&&e.t===2){e.combo=e.comboTarget===target.id?Math.min(5,(e.combo||0)+1):0;e.comboTarget=target.id;interval/=1+e.combo*.04;}
  e.cd=interval;if(this.tech(e.p,0))damage*=1.15;
  if(e.k==='u'){
   let heavy=target.k==='b'||this.def(target)[4]>=2;
   if(f===0&&e.t===1&&this.tech(e.p,6))damage*=1.15;if(f===0&&e.t===2&&heavy)damage*=1.5;if(f===0&&e.t===4&&!heavy)damage*=1.25;
   if(f===1&&[1,4].includes(e.t)&&this.tech(e.p,6))damage*=1.12;if(f===1&&e.t===6&&heavy&&this.tech(e.p,8))damage*=1.25;
   if(f===3&&e.t===1&&this.tech(e.p,6))damage*=1.15;if(f===3&&e.t===2&&this.tech(e.p,8))damage*=1.2;
   if(this.tech(e.p,5)&&(e.stealth||e.ambush))damage*=1.15;if(e.ambush){damage*=1.5;e.ambush=false;}
  }
  let ignore=f===2&&e.k==='u'&&d[7]>30&&this.tech(e.p,7)?1:0;
  this.hit(target,damage,e,{ignore});this.effects.push({x:e.x,y:e.y,tx:target.x,ty:target.y,p:e.p,life:.18});this.reveal(e);
  if(e.k!=='u')return;
  if(f===0&&e.t===5||f===2&&e.t===4||f===3&&[5,7].includes(e.t)){let radius=f===3&&e.t===5?55:45;for(let t of enemies)if(t.id!==target.id&&dist(t,target)<radius)this.hit(t,damage*.6,e);if(f===3&&e.t===5){e.hp=0;this.areaEffect(e.x,e.y,55,e.p,'blast');}}
  if(f===1&&e.t===2){let previous=target;for(let t of enemies.filter(t=>t.id!==target.id&&dist(t,target)<70).slice(0,2)){this.hit(t,damage*.6,e);this.effects.push({x:previous.x,y:previous.y,tx:t.x,ty:t.y,p:e.p,life:.2});previous=t;}}
  if(f===1&&e.t===5||f===2&&e.t===6){let secondary=enemies.filter(t=>t.id!==target.id&&lineDistance(t,e,target)<t.r+12&&dist(e,t)<=dist(e,target)+35).sort((a,b)=>dist(e,a)-dist(e,b));for(let t of secondary.slice(0,f===2?1:4))this.hit(t,damage*.75,e,{ignore});}
  if(f===2&&e.t===7){target.status.burnUntil=this.time+3;target.status.burnSource=e.p;target.status.burnTick=target.status.burnTick>this.time?target.status.burnTick:this.time+1;}
  if(f===3&&e.t===2)target.status.acidUntil=this.time+3;
  if(f===3&&e.t===6){target.status.slowUntil=this.time+2;let length=dist(e,target)||1;target.x=clamp(target.x+(target.x-e.x)/length*8,target.r,W-target.r);target.y=clamp(target.y+(target.y-e.y)/length*8,target.r,H-target.r);}
 }
 step(dt){
  if(this.winner!==null||!Number.isFinite(dt)||dt<=0)return;this.time+=dt;this.discoverMines();this.effects=this.effects.filter(e=>(e.life-=dt)>0);this.processEvents(dt);
  for(let e of [...this.entities]){
   if(e.hp<=0)continue;if(e.summonedUntil&&e.summonedUntil<=this.time){e.hp=0;continue;}
   for(let id of Object.keys(e.abilityCD))e.abilityCD[id]=Math.max(0,e.abilityCD[id]-dt);e.cd-=dt;
   while(e.status.burnTick&&e.status.burnTick<=this.time&&e.status.burnTick<=e.status.burnUntil){this.hit(e,4,{p:e.status.burnSource});e.status.burnTick+=1;}
   if(e.build>0){e.build=Math.max(0,e.build-dt);if(!e.build&&e.replacementWorker){let u=this.spawn(e.p,'u',0,e.x+45,e.y);u.order={type:'mine',mine:this.nearestMine(e.p,u)};e.replacementWorker=false;}continue;}
   let pl=this.players[e.p],f=pl.f;
   if(e.cloakCapable&&!e.burrowed&&e.cloakReady&&e.cloakReady<=this.time){e.stealth=true;e.cloakReady=0;}
   if(f===3&&e.k==='b'&&[0,5].includes(e.t)&&!e.packed){let cycle=(e.t===0?9:12)/(this.tech(e.p,9)?1.2:1),cap=e.t===0?4:3;e.larvaClock+=dt;while(e.larvaClock>=cycle){e.larvaClock-=cycle;e.larvae=Math.min(cap,e.larvae+1);}}
   this.healAndRepair(e,dt);
   if(e.packed){if(e.order&&['move','attackmove','attack'].includes(e.order.type)&&this.move(e,e.order,dt))e.order=null;continue;}
   if(e.queue.length){let q=e.queue[0],range=170+(this.tech(e.p,7)?72:0),boost=f===1&&this.own(e.p).some(b=>b.k==='b'&&b.t===5&&!b.build&&dist(e,b)<range)?1.1:1;q.left-=dt*boost;if(q.left<=0){e.queue.shift();if(q.kind==='tech')pl.tech.push(q.t);else{let u=this.spawn(e.p,'u',q.t,e.x+(e.p?-48:48),e.y+((this.id%3)-1)*22);if(q.t===0)u.order={type:'mine',mine:this.nearestMine(e.p,u)};}}}
   if(e.k==='b'&&e.t!==4)continue;
   if(e.k==='u'&&e.t===0&&e.order?.type==='mine'){this.mining(e,dt);continue;}
   if(e.k==='u'&&e.t===0&&e.order?.type==='repair')continue;
   let d=e.k==='u'?this.def(e):null,heal=d&&d[5]===0;if(e.burrowed)continue;
   let range=e.k==='b'?145:d[7];if(e.siege)range=192+(this.tech(e.p,8)?36:0);
   let groundOnly=e.k==='u'&&((f===0&&[0,5,8].includes(e.t))||(f===1&&[0,5,6].includes(e.t))||(f===2&&[0,2,3,4,5].includes(e.t))||(f===3&&[0,1,4,5,6].includes(e.t)));
   let enemies=this.entities.filter(t=>t.p!==e.p&&t.hp>0&&this.visible(e.p,t)&&(!groundOnly||!this.flying(t))),target=enemies.find(t=>t.id===e.order?.target);
   if(!target&&e.order?.type!=='move'&&!heal)target=enemies.filter(t=>dist(e,t)<range+t.r+35).sort((a,b)=>dist(e,a)-dist(e,b))[0];
   if(target&&!heal){if(dist(e,target)<=range+target.r){if(e.cd<=0)this.attack(e,target,enemies);}else if(e.k==='u'&&!e.siege)this.move(e,target,dt);}
   else if(e.k==='u'&&e.order&&['move','attackmove','attack'].includes(e.order.type)){if(this.move(e,e.order,dt))e.order=null;}
  }
  let us=this.entities.filter(e=>e.k==='u'&&e.hp>0&&!e.burrowed);for(let i=0;i<us.length;i++)for(let j=i+1;j<us.length;j++){let a=us[i],b=us[j],dd=dist(a,b),rr=(a.r+b.r)*.8;if(dd>0&&dd<rr&&this.flying(a)===this.flying(b)){let push=(rr-dd)*.25,dx=(a.x-b.x)/dd,dy=(a.y-b.y)/dd;if(!a.siege){a.x=clamp(a.x+dx*push,a.r,W-a.r);a.y=clamp(a.y+dy*push,a.r,H-a.r);}if(!b.siege){b.x=clamp(b.x-dx*push,b.r,W-b.r);b.y=clamp(b.y-dy*push,b.r,H-b.r);}}}
  this.entities=this.entities.filter(e=>e.hp>0);for(let p=0;p<2;p++){if(this.players[p].f===3)this.syncLarvae(p);if(!this.own(p).some(e=>e.k==='b'&&e.t===0)){this.end(1-p,'所有敌方主基地已被摧毁');return;}}
  if(this.mode==='timed'&&this.time>=480){let present=[0,1].map(p=>this.own(p).some(e=>e.k==='u'&&e.t>0&&!e.summonedUntil&&dist(e,{x:W/2,y:H/2})<90));for(let p=0;p<2;p++){if(present[p]&&!present[1-p]){this.players[p].hold+=dt;this.players[p].control+=dt;}else this.players[p].hold=0;if(this.players[p].hold>=45)this.end(p,'连续控制中央晶核45秒');}if(this.time>=600&&this.winner===null){let score=[this.score(0),this.score(1)];this.end(score[0]===score[1]?2:score[0]>score[1]?0:1,'限时结束 · 按战场得分结算');}}
  if(this.ai)this.think(dt);
 }
 score(p){return Math.round(this.own(p).reduce((n,e)=>n+(e.summonedUntil?0:e.k==='b'?(e.t===0?1000:100):this.def(e)[1])*e.hp/e.max,0)+this.players[p].control*20);}
 end(p,reason){this.winner=p;this.reason=reason;}
 think(dt){
  this.aiClock-=dt;this.attackClock+=dt;if(this.aiClock>0)return;let level=Math.max(0,['easy','normal','hard'].indexOf(this.difficulty));this.aiClock=[5,2.5,1][level];let p=1,own=this.own(p),workers=own.filter(e=>e.k==='u'&&e.t===0),army=own.filter(e=>e.k==='u'&&e.t>0),base=own.find(e=>e.k==='b'&&e.t===0);if(!base)return;
  if(workers.length<[5,7,9][level]&&!base.queue.length)this.command(p,{type:'train',id:base.id,t:0});let builds=own.filter(e=>e.k==='b'),planned=[1,...(level?[2,4,3,5]:[])],next=planned.find(t=>!builds.some(e=>e.t===t));
  if(next!==undefined){let spots=[[-120,-10],[0,-130],[-150,100],[-170,-80],[-60,160],[-250,20],[70,-80],[100,100]].map(([dx,dy])=>[base.x+dx,base.y+dy]);for(let [x,y]of spots)if(this.validSpot(p,next,x,y)){this.command(p,{type:'build',t:next,x,y});break;}}
  if(level&&this.players[p].money>500&&builds.filter(e=>e.t===0).length<2){let m=[...this.knownMines[p]].map(i=>this.mines[i]).filter(m=>m.remaining>500&&dist(m,base)>220).sort((a,b)=>dist(a,base)-dist(b,base))[0];if(m){let x=m.x-80,y=m.y;if(this.validSpot(p,0,x,y))this.command(p,{type:'build',t:0,x,y});else if(workers[0])this.command(p,{type:'order',ids:[workers[0].id],action:'move',x,y});}}
  for(let b of builds.filter(e=>!e.build&&!e.queue.length&&!e.packed)){
   if(b.t===1)this.command(p,{type:'train',id:b.id,t:level===0?1:1+Math.floor(this.time/17)%3});
   if(b.t===2)this.command(p,{type:'train',id:b.id,t:this.tech(p,3)&&Math.floor(this.time/19)%3===0?7:4+Math.floor(this.time/23)%3});
   if(b.t===3){let t=[0,1,3,4,6,7,8].find(t=>!this.tech(p,t));if(t!==undefined)this.command(p,{type:'research',id:b.id,t});}
  }
  let threat=this.entities.find(e=>e.p===0&&this.visible(1,e)&&dist(e,base)<260),threshold=[7,6,4][level],interval=[110,70,40][level];
  if(threat||army.length>=threshold&&this.attackClock>interval||this.mode==='timed'&&this.time>480){let goal=threat||(this.mode==='timed'&&this.time>480?{x:W/2,y:H/2}:{x:150,y:270});this.command(p,{type:'order',ids:army.map(e=>e.id),action:'attack',x:goal.x,y:goal.y,target:threat?.id});this.attackClock=0;}
  if(level===2)for(let u of army)if(u.hp<u.max*.25)this.command(p,{type:'order',ids:[u.id],action:'move',x:base.x-55,y:base.y});
  if(level)for(let e of own){let enemy=this.entities.filter(v=>v.p!==p&&v.hp>0&&this.sight(p,v)).sort((a,b)=>dist(a,e)-dist(b,e))[0];for(let a of this.entityAbilities(e)){if(e.abilityCD[a.id]>0||a.tech!==null&&!this.tech(p,a.tech))continue;if(['overclock','frenzy','sanctuary','summon'].includes(a.id)&&enemy&&dist(enemy,e)<220)this.command(p,{type:'ability',id:e.id,ability:a.id});if(['mechBlast','beam','storm','demolition','scan'].includes(a.id)&&enemy)this.command(p,{type:'ability',id:e.id,ability:a.id,x:enemy.x,y:enemy.y});}}
 }
 snapshot(p){
  let entities=this.entities.filter(e=>this.visible(p,e)).map(e=>({...e,queue:e.queue.map(q=>({...q})),order:e.order?{...e.order}:null,status:{...e.status},abilityCD:{...e.abilityCD},abilities:e.p===p?this.entityAbilities(e).map(a=>a.id):[]}));
  return {time:this.time,mines:this.mines.map(m=>({...m})),mode:this.mode,players:this.players.map((v,i)=>i===p?{...v,tech:[...v.tech],pop:this.pop(i),capacity:this.capacity(i)}:{f:v.f,hold:v.hold}),entities,effects:this.effects.filter(e=>this.sight(p,e)).map(e=>({...e})),events:this.events.filter(e=>this.sight(p,e)).map(e=>({...e})),scans:this.scans.filter(s=>s.p===p).map(s=>({...s})),winner:this.winner,reason:this.reason,scores:this.winner!==null?[this.score(0),this.score(1)]:null};
 }
}

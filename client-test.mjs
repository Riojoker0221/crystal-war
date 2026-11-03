import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const [bundle,markup]=await Promise.all([
  readFile(new URL('./public/game.js',import.meta.url),'utf8'),
  readFile(new URL('./public/index.html',import.meta.url),'utf8')
]);

// This fixture exercises the shipped client in a VM. It provides only the DOM,
// timers, and drawing surface the game needs; no game handlers are reimplemented.
function client({blockedStorage=false,protocol='file:'}={}){
  const ids=new Map(),intervals=new Map(),timeouts=new Map();let nextTimer=1,frameCallback;
  const context2d=Object.fromEntries(['save','restore','clearRect','scale','translate','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','fill','arc','stroke','drawImage'].map(name=>[name,()=>{}]));
  class Element{
    constructor(tagName='div'){
      this.tagName=tagName.toUpperCase();this.children=[];this.style={};this.dataset={};this.attributes=new Map();
      this.hidden=false;this.disabled=false;this.open=false;this.className='';this.value='';this._text='';this._html='';
      this.classList={
        toggle:(name,force)=>{const classes=new Set(this.className.split(/\s+/).filter(Boolean));const on=force??!classes.has(name);if(on)classes.add(name);else classes.delete(name);this.className=[...classes].join(' ');return on;},
        contains:name=>this.className.split(/\s+/).includes(name)
      };
    }
    set textContent(value){this._text=String(value);}
    get textContent(){return this._text;}
    set innerHTML(value){
      this._html=String(value);this.children=[];
      for(const match of this._html.matchAll(/<([a-z]+)[^>]*\bid="([^"]+)"[^>]*>/gi)){
        const child=new Element(match[1]);child.id=match[2];ids.set(child.id,child);this.children.push(child);
      }
    }
    get innerHTML(){return this._html;}
    append(...children){this.children.push(...children);}
    replaceChildren(...children){this.children=[...children];}
    add(option){this.children.push(option);}
    setAttribute(name,value){this.attributes.set(name,String(value));}
    getAttribute(name){return this.attributes.get(name)??null;}
    getContext(){return context2d;}
    showModal(){this.open=true;}
    close(){this.open=false;}
    setPointerCapture(){}
    getBoundingClientRect(){return {left:0,top:0,width:1200,height:760};}
    click(){assert.equal(typeof this.onclick,'function','expected client to register click handler');return this.onclick();}
  }
  for(const match of markup.matchAll(/<([a-z]+)[^>]*\bid="([^"]+)"[^>]*>/gi)){
    const element=new Element(match[1]);element.id=match[2];element.hidden=/\bhidden(?:\s|>)/.test(match[0]);ids.set(element.id,element);
  }
  const tabButtons={kind:[],rule:[]};
  for(const match of markup.matchAll(/<button([^>]*)>/g)){
    const attr=match[1],data=/data-(kind|rule)="([^"]+)"/.exec(attr);if(!data)continue;
    const button=new Element('button');button.dataset[data[1]]=data[2];button.className=/class="([^"]*)"/.exec(attr)?.[1]||'';tabButtons[data[1]].push(button);
  }
  const status=new Element('span');
  const document={
    getElementById:id=>ids.get(id)||null,
    createElement:tag=>new Element(tag),
    querySelector:selector=>selector==='.status'?status:null,
    querySelectorAll:selector=>selector==='[data-kind]'?tabButtons.kind:selector==='[data-rule]'?tabButtons.rule:[],
    hidden:false,activeElement:new Element('body')
  };
  ids.get('difficulty').value='normal';ids.get('enemy').value='1';
  const sandbox={
    document,location:{protocol},console,AbortSignal,
    Option:class extends Element{constructor(label,value){super('option');this.textContent=label;this.value=String(value);}},
    confirm:()=>true,addEventListener:()=>{},requestAnimationFrame:fn=>{frameCallback=fn;return 1;},
    setInterval:fn=>{let id=nextTimer++;intervals.set(id,fn);return id;},clearInterval:id=>intervals.delete(id),
    setTimeout:fn=>{let id=nextTimer++;timeouts.set(id,fn);return id;},clearTimeout:id=>timeouts.delete(id),
    fetch:()=>{throw Error('Unexpected network request in offline client test');}
  };
  if(blockedStorage)Object.defineProperty(sandbox,'sessionStorage',{get(){throw Error('Storage denied');}});
  else sandbox.sessionStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
  sandbox.window=sandbox;
  vm.runInContext(bundle,vm.createContext(sandbox),{filename:'public/game.js',timeout:1000});
  return {get:id=>ids.get(id),tabs:tabButtons,ready:()=>sandbox.crystalReady,tick:()=>{for(const fn of intervals.values())fn();},frame:()=>frameCallback?.(16),intervalCount:()=>intervals.size};
}

const factions=[['人类联邦','指挥中心'],['机械主脑','主脑核心'],['星界精灵','星界主殿'],['古老虫群','原初母巢']];

test('selected mineral stock counts down to exhausted in the actual client',async()=>{
  const c=client();await c.get('start').click();let board=c.get('board'),event={button:0,clientX:80,clientY:180,pointerId:1};
  board.onpointerdown(event);board.onpointerup(event);assert.equal(c.get('mineInfo').hidden,false);assert.match(c.get('mineInfo').innerHTML,/1400 \/ 1400/);
  for(let i=0;i<1600;i++)c.tick();c.frame();assert.match(c.get('mineInfo').innerHTML,/已枯竭/);assert.match(c.get('mineInfo').innerHTML,/剩余 0 \/ 1400/);
  assert.equal(c.get('mapView').textContent,'100%');
});
test('camera controls preserve mineral picking and base jump after overview',async()=>{
  const c=client();await c.get('start').click();await c.get('mapOverview').click();c.frame();assert.match(c.get('mapView').textContent,/50%/);
  let board=c.get('board'),event={button:0,clientX:40,clientY:90,pointerId:1};board.onpointerdown(event);board.onpointerup(event);assert.match(c.get('mineInfo').innerHTML,/晶矿 1/);
  c.get('minimap').onpointerdown({clientX:1200,clientY:760});await c.get('zoomIn').click();await c.get('home').click();c.frame();assert.match(c.get('selection').innerHTML,/指挥中心/);assert.equal(c.get('mineInfo').hidden,true);
});

test('file entry loads all factions and each selection starts the chosen army',async()=>{
  const c=client();assert.equal(c.ready(),true);assert.equal(c.get('startupError').hidden,true);
  assert.equal(c.get('factions').children.length,4);assert.equal(c.get('enemy').children.length,4);
  for(let i=0;i<factions.length;i++){
    const cards=c.get('factions').children;await cards[i].click();
    for(let j=0;j<4;j++)assert.equal(cards[j].getAttribute('aria-pressed'),String(i===j));
    await c.get('start').click();
    assert.equal(c.get('lobby').hidden,true);assert.equal(c.get('game').hidden,false);
    assert.equal(c.get('matchLabel').textContent,`${factions[i][0]} / 普通 · 不限时`);
    assert.equal(c.get('pop').textContent,'4');assert.equal(c.get('capacity').textContent,'36');assert.match(c.get('techTree').innerHTML,/未解锁/);assert.match(c.get('techTree').innerHTML,/工兵/);assert.match(c.get('techTree').innerHTML,new RegExp(factions[i][1]));assert.equal(c.intervalCount(),1);
    await c.get('home').click();assert.match(c.get('selection').innerHTML,new RegExp(factions[i][1]));
    assert.equal(c.get('actions').children.length,2,'main base offers worker production and packing');
    await c.get('leave').click();await Promise.resolve();
    assert.equal(c.get('lobby').hidden,false);assert.equal(c.get('game').hidden,true);assert.equal(c.intervalCount(),0);
  }
});

test('rule controls change the actual local match clock',async()=>{
  const c=client(),normal=c.tabs.rule.find(b=>b.dataset.rule==='normal'),timed=c.tabs.rule.find(b=>b.dataset.rule==='timed');
  await timed.click();assert.equal(timed.classList.contains('active'),true);assert.equal(normal.classList.contains('active'),false);
  await c.get('start').click();assert.match(c.get('matchLabel').textContent,/限时/);assert.equal(c.get('clock').textContent,'10:00');
  await c.get('leave').click();await Promise.resolve();
  await normal.click();await c.get('start').click();assert.match(c.get('matchLabel').textContent,/普通 · 不限时/);assert.equal(c.get('clock').textContent,'00:00');
});

test('offline PvP explains the required launcher and tabs still work',async()=>{
  const c=client(),pvp=c.tabs.kind.find(b=>b.dataset.kind==='pvp'),pve=c.tabs.kind.find(b=>b.dataset.kind==='pve');
  await pvp.click();assert.equal(c.get('aiOptions').hidden,true);assert.equal(c.get('joinArea').hidden,false);
  await c.get('start').click();assert.match(c.get('toast').textContent,/启动游戏\.cmd/);assert.equal(c.get('start').disabled,false);assert.equal(c.get('lobby').hidden,false);
  await c.get('join').click();assert.match(c.get('toast').textContent,/双人联机/);
  await pve.click();assert.equal(c.get('aiOptions').hidden,false);assert.equal(c.get('joinArea').hidden,true);
  await c.get('start').click();assert.equal(c.get('game').hidden,false);
});

test('blocked browser storage does not prevent faction selection or returning to setup',async()=>{
  const c=client({blockedStorage:true});await c.get('factions').children[2].click();await c.get('start').click();
  assert.match(c.get('matchLabel').textContent,/星界精灵/);await c.get('leave').click();await Promise.resolve();
  assert.equal(c.get('lobby').hidden,false);await c.get('factions').children[1].click();await c.get('start').click();assert.match(c.get('matchLabel').textContent,/机械主脑/);
});

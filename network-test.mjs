import assert from 'node:assert/strict';
const base='http://127.0.0.1:'+(process.env.PORT||8787);
async function post(path,data){let r=await fetch(base+'/api/'+path,{method:'POST',body:JSON.stringify(data)});return {status:r.status,...await r.json()};}
let a=await post('create',{kind:'pvp',rule:'normal',faction:0});assert.equal(a.status,200);
assert.equal((await (await fetch(base+'/api/health')).json()).version,'0.2.0');
assert.equal((await post('session',{token:a.token})).valid,true);
assert.equal((await post('session',{token:'expired'})).status,403);
let b=await post('join',{code:a.code,faction:2});assert.equal(b.status,200);assert.equal(b.p,1);
assert.equal((await post('join',{code:a.code,faction:0})).status,409);
const controllers=[new AbortController(),new AbortController()];
let streams=await Promise.all([a,b].map((p,i)=>fetch(base+'/events?token='+p.token,{signal:controllers[i].signal})));
let readers=streams.map(r=>r.body.getReader());
async function read(reader){let buffer='';for(;;){let {value,done}=await reader.read();assert.ok(!done);buffer+=new TextDecoder().decode(value);let line=buffer.split('\n').find(l=>l.startsWith('data: '));if(line)return JSON.parse(line.slice(6));}}
let snapshots=await Promise.all(readers.map(read));assert.equal(snapshots[0].state.mines.length,18);assert.deepEqual(snapshots[0].state.mines,snapshots[1].state.mines);assert.ok(snapshots[0].state.mines.every(m=>m.remaining>=0&&m.remaining<=m.capacity));assert.equal(snapshots[0].state.mode,'normal');assert.equal(snapshots[1].state.players[1].f,2);assert.ok(snapshots.every(s=>s.state.entities.every(e=>e.p===(s.state.players[0].money!==undefined?0:1))));
assert.equal((await post('command',{token:a.token,command:{type:'surrender'}})).error,'');
let end;for(let i=0;i<10;i++){end=await read(readers[1]);if(end.state.winner!==null)break;}assert.equal(end.state.winner,1);
controllers.forEach(c=>c.abort());console.log('PASS: two real clients, room capacity, isolated fog, shared rule, synchronized surrender.');

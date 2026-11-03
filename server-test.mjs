import test from 'node:test';import assert from 'node:assert/strict';import {fork} from 'node:child_process';import net from 'node:net';import {fileURLToPath} from 'node:url';
test('公开房间接口拒绝异常输入，保留房间可用性，同步处死与基地迁移',{timeout:15000},async t=>{
 const probe=net.createServer();await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
 const process=fork(fileURLToPath(new URL('server.mjs',import.meta.url)),[],{env:{...globalThis.process.env,PORT:String(port),MAX_ROOMS:'2'},stdio:['ignore','ignore','ignore','ipc']});
 t.after(()=>process.kill());await new Promise((resolve,reject)=>{process.on('message',m=>{if(m.type==='ready')resolve();});process.once('error',reject);process.once('exit',code=>reject(Error('Server exited '+code)));});
 const base='http://127.0.0.1:'+port;async function post(path,body){let res=await fetch(base+'/api/'+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});return {status:res.status,...await res.json()};}
 assert.equal((await post('create',{faction:.5})).status,400);assert.equal((await post('create',null)).status,400);
 let host=await post('create',{kind:'pvp',faction:0});assert.equal(host.status,200);
 assert.equal((await post('join',{code:host.code,faction:1.5})).status,400);
 let guest=await post('join',{code:host.code,faction:2});assert.equal(guest.status,200);
 assert.equal((await post('join',{code:host.code,faction:1})).status,409);
 assert.equal((await post('command',{token:host.token})).status,400);assert.equal((await post('session',{token:'bad-token'})).status,403);
 const control=new AbortController(),stream=await fetch(base+'/events?token='+host.token,{signal:control.signal});t.after(()=>control.abort());const reader=stream.body.getReader();let buffer='';
 async function next(){for(;;){let end=buffer.indexOf('\n');while(end>=0){let line=buffer.slice(0,end);buffer=buffer.slice(end+1);if(line.startsWith('data: '))return JSON.parse(line.slice(6));end=buffer.indexOf('\n');}let {value,done}=await reader.read();assert.ok(!done);buffer+=new TextDecoder().decode(value);}}
 let initial=await next(),worker=initial.state.entities.find(e=>e.k==='u'),main=initial.state.entities.find(e=>e.k==='b');
 let joined=await post('state',{token:guest.token}),other=joined.state.entities.find(e=>e.k==='b'&&e.t===0);
 assert.equal(main.x,150);assert.equal(other.x,2250);assert.ok(main.y>=140&&main.y<=1380);assert.ok(other.y>=140&&other.y<=1380);
 assert.equal(initial.state.mines[0].y,main.y-90);assert.equal(joined.state.mines[1].y,other.y+90);
 assert.deepEqual(initial.state.mines,joined.state.mines,'双方看到同一套随机矿位');
 let resumed=await post('state',{token:guest.token});assert.equal(resumed.state.entities.find(e=>e.id===other.id).y,other.y,'重连读取不会重新随机出生点');
 assert.match((await post('command',{token:guest.token,command:{type:'execute',ids:[worker.id]}})).error,/己方工兵/);
 assert.equal((await post('command',{token:host.token,command:{type:'execute',ids:[worker.id]}})).error,'');
 assert.equal((await post('command',{token:host.token,command:{type:'pack',id:main.id}})).error,'');
 let after;for(let i=0;i<10;i++){after=await next();if(after.state.players[0].pop===3&&after.state.entities.find(e=>e.id===main.id)?.packed)break;}
 assert.equal(after.state.players[0].pop,3);assert.equal(after.state.entities.find(e=>e.id===main.id).packed,true);
 assert.equal((await post('create',{kind:'pve',faction:1})).status,200);assert.equal((await post('create',{kind:'pve',faction:1})).status,503);
 control.abort();assert.equal((await fetch(base+'/api/health')).status,200);
 assert.equal((await post('state',{token:'expired'})).status,403);
 await post('state',{token:host.token});let guestState=await post('state',{token:guest.token});assert.equal(guestState.paused,false);
 let startTime=guestState.state.time,last;for(let i=0;i<31;i++){await new Promise(r=>setTimeout(r,150));last=await post('state',{token:host.token});}
 assert.ok(last.state.time>startTime,'two polling players advance the shared game');assert.equal(last.paused,true,'missing guest pauses after presence timeout');
});

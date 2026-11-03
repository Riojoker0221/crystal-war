import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:net';

const VERSION='0.3.2';
const explicitPort=Boolean(process.env.PORT);
let port=explicitPort?Number(process.env.PORT):8787;
const address=()=>`http://localhost:${port}`;
const noOpen=process.argv.includes('--no-open');

async function health(candidate){
  try{
    const response=await fetch(`http://127.0.0.1:${candidate}/api/health`,{signal:AbortSignal.timeout(1200)});
    if(!response.ok)return {occupied:true};
    const result=await response.json();
    return {occupied:true,expected:result.service==='crystal-war'&&result.version===VERSION&&result.ready===true,result};
  }catch{return {occupied:false};}
}

function available(candidate){
  return new Promise((resolve,reject)=>{
    const probe=createServer();
    probe.once('error',error=>error.code==='EADDRINUSE'?resolve(false):reject(error));
    probe.listen(candidate,'0.0.0.0',()=>probe.close(()=>resolve(true)));
  });
}

function openBrowser(){
  if(noOpen){console.log(`已就绪：${address()}`);return;}
  const command=process.platform==='win32'?'cmd.exe':process.platform==='darwin'?'open':'xdg-open';
  const args=process.platform==='win32'?['/d','/c','start','""',address()]:[address()];
  const browser=spawn(command,args,{stdio:'ignore',detached:true,windowsHide:true});
  browser.on('error',()=>console.log(`请在浏览器中打开 ${address()}`));
  browser.unref();
}

async function launch(){
  if(!Number.isInteger(port)||port<1||port>65535)throw Error('PORT 必须是 1 到 65535 之间的整数。');
  const firstPort=port,lastPort=explicitPort?port:port+20;
  let found=false;
  for(let candidate=firstPort;candidate<=lastPort;candidate++){
    const existing=await health(candidate);
    if(existing.expected){port=candidate;console.log('游戏服务器已经运行，正在打开游戏。');openBrowser();return;}
    if(!existing.occupied&&await available(candidate)){port=candidate;found=true;break;}
    if(explicitPort)throw Error(`指定端口 ${port} 已被其他程序或旧版本占用，请设置其他 PORT 后启动。`);
  }
  if(!found)throw Error(`端口 ${firstPort} 至 ${lastPort} 均不可用，请设置其他 PORT 后启动。`);
  if(port!==firstPort)console.log(`默认端口正被使用，改用 ${port} 启动新版游戏。`);
  const child=spawn(process.execPath,[fileURLToPath(new URL('./server.mjs',import.meta.url))],{
    cwd:fileURLToPath(new URL('.',import.meta.url)),env:{...process.env,PORT:String(port)},stdio:['inherit','inherit','inherit','ipc'],windowsHide:true
  });
  let exited=false,ready=false;
  child.on('message',message=>{if(message.type==='ready'&&message.service==='crystal-war'&&message.version===VERSION)ready=true;});
  child.on('exit',code=>{exited=true;if(code)process.exitCode=code;});
  child.on('error',error=>{console.error(`无法启动游戏：${error.message}`);exited=true;process.exitCode=1;});
  process.once('SIGINT',()=>{if(!exited)child.kill('SIGINT');});
  process.once('SIGTERM',()=>{if(!exited)child.kill('SIGTERM');});
  // The browser is opened only after the child confirms that listen succeeded.
  for(let i=0;i<75&&!ready&&!exited;i++)await delay(200);
  if(!ready){if(!exited)child.kill();throw Error('游戏服务器未能启动，请查看上方提示。');}
  openBrowser();
  child.disconnect();
}
launch().catch(error=>{console.error(error.message);process.exitCode=1;});

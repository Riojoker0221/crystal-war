export function unitPainter(g,e){
 const x=Math.round(e.x),y=Math.round(e.y);
 const box=(dx,dy,w,h,color)=>{g.fillStyle=color;g.fillRect(x+Math.round(dx),y+Math.round(dy),Math.round(w),Math.round(h));};
 const poly=(points,color)=>{g.fillStyle=color;g.beginPath();points.forEach(([dx,dy],i)=>i?g.lineTo(x+Math.round(dx),y+Math.round(dy)):g.moveTo(x+Math.round(dx),y+Math.round(dy)));g.closePath();g.fill();};
 const line=(x0,y0,x1,y1,color,width=2)=>{
  x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);
  const dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1;let err=dx+dy;
  for(;;){box(x0-Math.floor(width/2),y0-Math.floor(width/2),width,width,color);if(x0===x1&&y0===y1)break;const step=2*err;if(step>=dy){err+=dy;x0+=sx;}if(step<=dx){err+=dx;y0+=sy;}}
 };
 const gem=(dx,dy,rx,ry,color)=>poly([[dx,dy-ry],[dx+rx,dy],[dx,dy+ry],[dx-rx,dy]],color);
 return {box,poly,line,gem,ink:'#08151e',steel:'#9ab3bf',white:'#dcecf0'};
}

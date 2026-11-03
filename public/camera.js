export class Camera{
 constructor(w,h,vw=1200,vh=760){this.w=w;this.h=h;this.vw=vw;this.vh=vh;this.zoom=1;this.x=0;this.y=0;}
 clamp(){this.x=Math.max(0,Math.min(this.w-this.vw/this.zoom,this.x));this.y=Math.max(0,Math.min(this.h-this.vh/this.zoom,this.y));}
 center(x,y){this.x=x-this.vw/this.zoom/2;this.y=y-this.vh/this.zoom/2;this.clamp();}
 pan(dx,dy){this.x+=dx/this.zoom;this.y+=dy/this.zoom;this.clamp();}
 world(x,y){return {x:this.x+x/this.zoom,y:this.y+y/this.zoom};}
 setZoom(zoom,sx=this.vw/2,sy=this.vh/2){let anchor=this.world(sx,sy);this.zoom=Math.max(Math.max(this.vw/this.w,this.vh/this.h),Math.min(1.8,zoom));this.x=anchor.x-sx/this.zoom;this.y=anchor.y-sy/this.zoom;this.clamp();}
}

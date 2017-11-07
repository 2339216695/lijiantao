/**
 * Created by szb02 on 2017/9/13.
 */
//获取canvas及其上下文
var canvas=document.getElementById("home");
var ctx=canvas.getContext("2d");
//初定canvas大小
canvas.width=innerWidth;
canvas.height=innerHeight;
var bg=new Image();
bg.src="./imgs/bg_1.jpg";
var option={
  imgs:bg,
  height:canvas.height,
}
var bg_move_start=new bg_move(option);
function bg_move(option){
  this.imgs=option.imgs;
  this.height=option.height;
  this.y1=0;
  this.y2=-this.height;
  this.draw=function(context){
    context.drawImage(this.imgs,0,this.y1,canvas.width,this.height);
    context.drawImage(this.imgs,0,this.y2,canvas.width,this.height);
  }
  this.step=function(){
    this.y1++;
    this.y2++;
    (this.y1>=this.height)?this.y1=-this.height:"";
    (this.y2>=this.height)?this.y2=-this.height:"";
  }
}
setInterval(function(){
  canvas.width=innerWidth;
  bg_move_start.draw(ctx);
  bg_move_start.step();
  ctx.font = "28px '微软雅黑'";
  ctx.fillStyle="darkcyan";
  ctx.fillText("李建涛",canvas.width/2-42,canvas.height/2-50);
  ctx.fillText("应聘岗位：WEB 前端工程师",canvas.width/2-180,canvas.height/2+50);
},20)
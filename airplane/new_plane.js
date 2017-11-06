var canvas=document.getElementsByTagName("canvas")[0];
var ctx=canvas.getContext("2d");
//五个阶段
const START=0;//打开游戏的初始界面
const LOADING=1;//左下角的游戏加载，将进入正式游戏的界面
const PLAY=2;//正式开始游戏界面
const PAUSE=3;//游戏鼠标移出canvas的暂停界面
const OVER=4;//游戏结束界面，点击canvas重新开始游戏
function Arrays(arr){//读取图片数组
  for(var i= 0,arr1=[];i<arr.length;i++){
    var img=new Image();
    img.src="./images/"+arr[i];
    arr1.push(img);
  }
  return arr1;
}
//第一阶段--欢迎阶段
var state=START;
var bg=new Image();
bg.src="./images/background.png";
var Background={
  imgs:bg,
  width:480,
  height:650,
};
var game=new Game(Background);
var logo=new Image;
logo.src="./images/start.png";
function Game(option){///背景图片的切换
  this.imgs=option.imgs;
  this.width=option.width;
  this.height=option.height;
  this.y1=0;
  this.y2=-this.height;
  this.draw=function(context){
    context.drawImage(this.imgs,0,this.y1);
    context.drawImage(this.imgs,0,this.y2);
  };
  this.step=function(){
    this.y1+=2;
    this.y2+=2;
    if(this.y1>this.height){
      this.y1=-this.height;
    }
    if(this.y2>this.height){
      this.y2=-this.height;
    }
  };
}
//第二阶段--载入游戏阶段
canvas.onclick=function(){
  if(state == START){
    state = LOADING;
  }else if(state==OVER){
    window.location.reload();
  }
}
var loading={
  imgs:Arrays(["game_loading1.png","game_loading2.png","game_loading3.png"]),
};
var gameloading=new Loading(loading);
function Loading(option){
  this.imgs=option.imgs;
  this.begin=0;
  this.draw=function(context){
    if(this.begin<3){
      context.drawImage(this.imgs[0],0,600);
    }else if(this.begin<6){
      context.drawImage(this.imgs[1],0,600);
    }else if(this.begin<9){
      context.drawImage(this.imgs[2],0,600);
    }else if(this.begin<11){
      state=PLAY;
    }
    this.begin++;
  };
}
//第三阶段--游戏正式开始阶段
var playing={
  x:canvas.width/2-99/2,
  y:canvas.height-124,
  imgs:Arrays(["hero1.png","hero2.png"]),
  width:99,
  height:124,
  Playnum :0,
  life:4,
}
function Play(option) {
  this.x = option.x;
  this.y = option.y;
  this.imgs = option.imgs;
  this.width = option.width;
  this.height = option.height;
  this.Playnum = option.Playnum;
  this.time=0;
  this.destroy_flag = 0;
  this.life=option.life;
  //英雄机的编辑
  this.draw = function (context) {
    context.drawImage(this.imgs[this.Playnum],this.x,this.y);
  }
  this.step=function(){
    this.Playnum++;
    this.Playnum = this.Playnum%2;
  }
  this.heroOver=function(context) {
    context.font = "30px '微软雅黑'";
    context.fillText("life " + this.life, 400, 30);
    if(this.life<=0){
      state = OVER;
    }
  }
  //己方产生子弹
  this.stepBullets=function(bullets){
    if(this.time%25==0){
      var bullet = new create_bullet(BULLET);
      bullet.x = this.x+this.width/2-9/2;
      bullet.y = this.y;
      bullets[bullets.length] = bullet;
    }
    this.time++;
  }
}
var Plays=new Play(playing);
//回执跟随鼠标移动的飞机
canvas.onmousemove=function(e){
  overing.x=Plays.x= e.offsetX-Plays.width/2;
  overing.y=Plays.y=e.offsetY-Plays.height/2;
}
var bullet_img = new Image();
bullet_img.src = "./images/bullet.png";
var BULLET = {
  width:9,
  height:21,
  imgs:bullet_img,
  destroy_flag:0
}
//产生子弹
function create_bullet(BULLET){
  this.width = BULLET.width;
  this.height = BULLET.height;
  this.imgs = BULLET.imgs;
  this.x = BULLET.x;
  this.y = BULLET.y;
  this.destroy_flag = BULLET.destroy_flag;
  this.draw = function(context){
    context.drawImage(this.imgs,this.x,this.y);
  }
  this.step = function(){
    this.y--;
    if(this.y<(0-this.height))
      this.destroy_flag = 1;
  }
}
var bullets = []
//所有子弹的动画效果
function bullets_animate(){
  for(var i=0;i<bullets.length;i++){
    bullets[i].draw(ctx);
    bullets[i].step();
  }
}
//所有子弹的边界判定
function bullets_destroy(){
  for(var i=0;i<bullets.length;i++){
    if(bullets[i].destroy_flag == 1) {
      bullets.splice(i, 1);
    }
  }
}
//创建敌机对象数组
var enemys = [];
var enemys1 = [];
var enemys2 = [];
//小型飞机参数
var ENEMY_MIN={
  imgs:Arrays(["enemy1.png","enemy1_down1.png","enemy1_down2.png","enemy1_down3.png","enemy1_down4.png","game_loading4.png"]
  ),
  width:57,
  height:51,
  index : 0,
  destroy_flag: 0,
  is_down : 0,
  life:1,
  planeType:1,
}
//中型飞机参数
var ENEMY_MIDDLE={
  imgs:Arrays(["enemy2.png","enemy2_down1.png","enemy2_down2.png","enemy2_down3.png","enemy2_down4.png"]
  ),
  width:69,
  height:95,
  index : 0,
  destroy_flag: 0,
  is_down : 0,
  life:2,
  planeType:2,
}
//大型飞机参数
var ENEMY_MAX={
  imgs:Arrays(  ["enemy3_n2.png","enemy3_down1.png","enemy3_down2.png","enemy3_down3.png","enemy3_down4.png","enemy3_down5.png","enemy3_down6.png"]
  ),
  width:165,
  height:261,
  index : 0,
  destroy_flag: 0,
  is_down : 0,
  life:4,
  planeType:3,
}
//敌机的生成
function create_e_min(option) {
  this.imgs=option.imgs;
  this.width=option.width;
  this.height=option.height;
  this.index = option.index;
  this.destroy_flag = option.destroy_flag;
  this.is_down = option.is_down;
  this.life=option.life;
  //飞机爆炸的动画频率
  this.down_time=0;
  this.x = parseInt(Math.random()*(canvas.width-this.width+1));
  this.y = - this.height;
  this.draw = function(context){
    context.drawImage(this.imgs[this.index],this.x,this.y);
  }
  this.step = function(){
    this.y++;
    if(this.y>canvas.height){
      this.destroy_flag = 1;
    }
  }
  this.down = function(){
    if(this.life<=0){
      this.down_time++;
      if(this.down_time%2==0){
        this.index++;
      }
      if(this.index>=this.imgs.length){
        this.destroy_flag = 1;
        this.index=0;
      }
    }
  }
}
var score=0;
//敌方的飞机动画
function enemy_animation(enemys){
  for(var i = 0;i<enemys.length;i++) {
    if(enemys[i].is_down == 0 && enemys[i].destroy_flag == 0){
      enemys[i].draw(ctx);
      enemys[i].step();
    }else if(enemys[i].is_down == 1 && enemys[i].destroy_flag == 0) {
      enemys[i].down();
      enemys[i].draw(ctx);
      enemys[i].step();
    }else if(enemys[i].destroy_flag == 1){
      if(enemys[i].width==57){
        score+=1;
      }else if(enemys[i].width==69){
        score+=2;
      }else if(enemys[i].width==165){
        score+=3;
      }
      enemys.splice(i,1);
      i--;
    }
  }
}
//敌机是否被命中的判定
function is_e_hitted(enemys){
  for(var i = 0;i<enemys.length;i++) {
    //判定敌机是否被子弹击中
    for (var j = 0; j < bullets.length; j++) {
      if (((bullets[j].x + 9) >= enemys[i].x) && (bullets[j].x <= enemys[i].x + enemys[i].width ) && ( bullets[j].y <= enemys[i].y + enemys[i].height )) {
        enemys[i].is_down = 1;
        enemys[i].life--;
        bullets[j].destroy_flag = 1;
      }
      //判定敌机是否和主机相撞
      if((Plays.x+Plays.width>enemys[i].x)&&(Plays.x<enemys[i].x + enemys[i].width)&&(Plays.y+Plays.height>enemys[i].y)&&(Plays.y<enemys[i].y+enemys[i].height)){
        enemys.splice(i,1);
        Plays.life--;
      }
    }
  }
}
//道具功能模块
var score1=[];
var life1=[];
var get_score= {
  imgs: Arrays(["24.ico"]),
  width: 24,
  height: 24,
  destroy_flag: 0,
}
var get_life= {
  imgs: Arrays(["favicon2.ico"]),
  width: 16,
  height: 16,
  destroy_flag: 0,
}
//产生道具
function get_more(option) {
  this.imgs=option.imgs;
  this.width=option.width;
  this.height=option.height;
  this.destroy_flag = option.destroy_flag;
  this.x = parseInt(Math.random()*(canvas.width-this.width+1));
  this.y = - this.height;
  this.draw = function(context){
    context.drawImage(this.imgs[0],this.x,this.y);
  }
  this.step = function(){
    this.y++;
    if(this.y>canvas.height){
      this.destroy_flag = 1;
    }
  }
}
//道具的动画
function get_more_animation(more){
  for(var i = 0;i<more.length;i++) {
    more[i].draw(ctx);
    more[i].step();
  }
}
//判定是否获得道具
function enter_more(more){
  for(var i = 0;i<more.length;i++) {
    if((Plays.x+Plays.width>more[i].x)&&(Plays.x<more[i].x + more[i].width)&&(Plays.y+Plays.height>more[i].y)&&(Plays.y<more[i].y+more[i].height)){
      if(more[i].width==16){
        Plays.life++;
      }else if(more[i].width==24){
        score+=100;
      }
      more.splice(i,1);
    }
  }
}
//第四阶段---暂停阶段
var pauseImg=new Image();
pauseImg.src="./images/game_pause_nor.png";
canvas.onmouseout=function(){
  if(state==PLAY){
    state=PAUSE;
  }
}
canvas.onmouseover=function(){
  if(state==PAUSE){
    state=PLAY;
  }
}
//第五阶段---结束阶段
var over={
  x:canvas.width/2-99/2,
  y:canvas.height-124,
  imgs:Arrays(["hero_blowup_n1.png","hero_blowup_n2.png","hero_blowup_n3.png","hero_blowup_n4.png"]),
  width:99,
  height:124,
  Playnum :0,
}
function over_animate(option) {
  this.imgs=option.imgs;
  this.x=option.x;
  this.y=option.y;
  this.width=option.width;
  this.height=option.height;
  this.Playnum=option.Playnum;
  this.Playtime=0;
  this.draw=function(ctx){
    ctx.drawImage(this.imgs[this.Playnum],this.x,this.y);
  }
  this.step=function(){
    this.Playtime++;
    if (this.Playtime % 5 == 0) {
      this.Playnum++;
    }
    if (this.Playnum >= this.imgs.length) {
      this.Playnum = this.imgs.length-1;
    }
  }
}
var overing=new over_animate(over);
//敌机出现的频率
var times = 0;
//全局的定时器
setInterval(function(){
  game.draw(ctx);
  game.step();
  switch(state) {
    case START:
      ctx.drawImage(logo, 40, 0);
      break;
    case LOADING:
      gameloading.draw(ctx);
      break;
    case PLAY:
      Plays.draw(ctx);
      Plays.step();
      Plays.heroOver(ctx);
      Plays.stepBullets(bullets);
      bullets_animate();
      bullets_destroy();
      times++;
      //小型敌机
      if( times%50 == 0){
        var enemy = new create_e_min(ENEMY_MIN);
        enemys[enemys.length]=enemy;
      }
      is_e_hitted(enemys);
      enemy_animation(enemys);
      //中型敌机
      if( times>800 && times%240 == 0){
        var enemy1 = new create_e_min(ENEMY_MIDDLE);
        enemys1[enemys1.length]=enemy1;
      }
      is_e_hitted(enemys1);
      enemy_animation(enemys1);
      //大型敌机
      if( times>2000 && times%550 == 0){
        var enemy2 = new create_e_min(ENEMY_MAX);
        enemys2[enemys2.length]=enemy2;
      }
      is_e_hitted(enemys2);
      enemy_animation(enemys2);
      //分数道具
      if( times>1000 && times%2000 == 0){
        var score0 = new get_more(get_score);
        score1[score1.length]=score0;
      }
      enter_more(score1);
      get_more_animation(score1);
      //生命道具
      if( times>2000 && times%5000 == 0){
        var life0 = new get_more(get_life);
        life1[life1.length]=life0;
      }
      enter_more(life1);
      get_more_animation(life1);
      //分数公示
      ctx.font="30px '微软雅黑'";
      ctx.fillText("score "+score,10,30);
      break;
    case PAUSE:
      ctx.drawImage(pauseImg,210,305);
      break;
    case OVER:
      overing.draw(ctx);
      overing.step();
      ctx.font="60px '微软雅黑'";
      ctx.fillStyle="red";
      ctx.fillText("游戏结束",120,305);
      break;
  }
},10);
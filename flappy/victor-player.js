function Player (x, y, w, h) {
  this.x=x ;
  this.y=y;
  this.w=w;
  this.h=h;
  this.motion = 0;
  this.ySpeed = -5;

Player.prototype.draw = function (){
    context.drawImage(spritesImg,360,80,80,70,this.x,this.y,this.w,this.h);
  };

Player.prototype.update = function()
    this.motion += 0.15;
    this.y += 1; this.ySpeed +this.motion;
    

};
Player.prototype.moveUp = function() {
  this.y += 1;

};

function Pipe(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.gap = 200;
    this.xSpeed = -5;
    this.canScore = true;
}

Pipe.prototype.update = function() {
  this.x += this.xSpeed;
  if (this.x + this.w < 0) {
      this.x = 360;
      this.h = 100 + Math.floor(Math.random() * 300);
      this.canScore = true;
  }

  if (this.x < player.x + player.w && this.x + this.w > player.x) {
      if (player.y > this.h && player.y + player.h < this.h + this.gap) {

      } else {
          if (this.canScore) {
              splatAudio.play();
              score--;
              this.canScore = false;
          }

      }
  }

  if (this.x + this.w < player.x) {
      if (this.canScore) {
          score++;
          goodAudio.play();
          this.canScore = false;
      }
  }
};


Pipe.prototype.draw = function () {
    context.drawImage(sprite, 361, 0, 80, 80, this.x, this.y, this.w, this.h);
    context.drawImage(sprite, 361, 0, 80, 80, this.x, this.y + this.h + this.gap, this.w, 640 - this.h - this.gap);
};
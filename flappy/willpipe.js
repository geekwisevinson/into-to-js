function Pipe(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.gap = 200;
    this.xSpeed = 2;
    this.canScore = true;
}

Pipe.prototype.draw = function() {
    context.drawImage(spritesImg, 360, 0, 80, 80, this.x, this.y, this.w, this.h);
    context.drawImage(
        spritesImg,
        360, 0, 80, 80,
        this.x, this.y + this.h + this.gap ,
        this.w,
        640 -  this.h - this.gap)
};

Pipe.prototype.update = function () {
    this.x -= this.xSpeed;

    if (this.x + this.w < 0) {
        this.x = 360;
        this.h = 100 + Math.floor(Math.random() * 200);
        this.canScore = true;
        this.xSpeed += .2;
    }

    if (player.x + player.w >= this.x && player.x < this.x + this.w) {
        if (player.y > this.h && this.h + this.gap > player.y + player.h) {
            console.log('in the gap');
        } else {
            console.log('hit');
            if (this.canScore === true) {
                this.canScore = false;
                badAudio.play();
                alert('Game Over');
                window.location.reload();
            }

        }
    }

    if (player.x > this.x + this.w) {
        if (this.canScore === true) {
            score++;
            goodAudio.play();
            this.canScore = false;
        }
    }
};

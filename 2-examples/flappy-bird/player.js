function Player(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.frame = 1;
    this.ySpeed = -5;
    this.fallSpeed = 0;
}

Player.prototype.draw = function() {
    context.drawImage(sprite, 361, 81 + (this.frame * 70), 80, 70, this.x,this.y, this.w, this.h)
};

Player.prototype.update = function() {
    this.fallSpeed += 0.2;
    this.y += this.fallSpeed + this.ySpeed;
    if (this.fallSpeed > 1) {
        this.frame = 0;
    } else {
        this.frame = 1;
    }
    if (this.y > 600) {
        this.y = 600;
    }
};

Player.prototype.flap = function( ) {
    this.fallSpeed = 0;
    swipeAudio.currentTime = 0;
    swipeAudio.play();
};
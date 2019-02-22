function Background(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Background.prototype.draw = function() {
    context.drawImage(spritesImg, 0, 0, 360, 640, this.x, this.y,this.w, this.h);
};

Background.prototype.update = function() {
    this.x -= 1;

    if (this.x <= -360) {
        console.log('startover')
        this.x = 360;
    }
};

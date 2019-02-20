function Background(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Background.prototype.update = function() {
    this.x -= 2;
    if (this.x < -359) {
        this.x = 360;
    }
};

Background.prototype.draw = function() {
    context.drawImage(sprite, 0, 0, 360, 640, this.x, 0, 360, 640)
};
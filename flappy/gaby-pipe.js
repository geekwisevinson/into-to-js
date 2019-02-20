function Pipe(x, y, w, h) {
this.x = x;
this.y = y;
this.w = w;
this.h = h;
this.gap = 200;
this.xSpeed = 2;
}

Pipe.prototype.draw = function () {
    isContext.drawImage(srpitesImg, 360, 0, 80, 80, this.x, this.y, this.w, this.h)
    isContext.drawImage(srpitesImg, 360, 0, 80, 80, this.x, this.y + this.h + this.gap, this.w, this.h)
};

Pipe.prototype.update = function() {
    this.x -= this.xSpeed;
    if (this.x + this.w < 0) {
        this.x = 360;
        this.h = 100 + Math.floor(Math.random() * 200)
    }
};
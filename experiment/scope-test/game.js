function Background(x, y, w, h, speed) {
    // Physical properties
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
}

// Draw call
Background.prototype.draw = function() {
    ctx.drawImage(sprites, 0, 0, 360, 640, this.x, this.y, this.w, this.h);
};

// Update call
Background.prototype.update = function() {
    // Make it move to left with a constant speed
    this.x -= this.speed;

    // If it gets out from the screen, make it jump to the starting position so it seamlessly keeps scrolling endlessly
    if (this.x <= -360) {
        this.x = 360;
    }
};
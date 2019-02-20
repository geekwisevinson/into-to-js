function Pipe(x, y, w, h, speed) {
    // Physical properties
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
}

// Draw call
Pipe.prototype.draw = function () {
    ctx.drawImage(sprites, 360, 0, 80, 80, this.x, this.y, this.w, this.h);
}

// Update call
Pipe.prototype.update = function () {
    // Make it move to the left with a constant speed
    this.x -= this.speed;

    // Check if the pipe is out of the screen
    if (this.x + this.w <= 0) {
        this.x = 360; // Make it jump to the right side of the screen

        // If the pipe is the top one
        if (this.y <= 320) {
            this.y = -(Math.random() * (150 - 50) + 50); // Math.random() * (max - min) + min
            // If the pipe is the bottom one
        } else {
            this.y = 320 + (Math.random() * (150 - 50) + 50);
        }
    }
}
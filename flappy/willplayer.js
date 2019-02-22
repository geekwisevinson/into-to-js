function Player(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    function Player(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.motion = 0;
        this.ySpeed = -5;
        this.frame = 1;
    }

    Player.prototype.draw = function() {
        context.drawImage(spritesImg, 360, 81  + ( 70 * this.frame), 80, 70, this.x, this.y, this.w, this.h);
    };

    Player.prototype.update = function() {
        this.motion += 0.15;
        this.y += this.ySpeed + this.motion;
        if (this.y > 600) {
            this.y = 600;
        }

        if (this.motion > 1) {
            this.frame = 0;
        } else {
            this.frame = 1;
        }
    };

    Player.prototype.moveUp = function() {
        this.motion = 0;
        swipeAudio.currentTime = 0;
        swipeAudio.play();
    };

class Sand extends GameObject {
    source = {
        x: 0,
        y: 154,
        w: 600,
        h: 150,
    };
    xSpeed = -1;
    constructor(x, y, w, h, sprite) {
        super(x, y, w, h, sprite);

        console.log('sprite', sprite.src.split('/').splice(-2).join('/'));
    }
    update() {
        this.x += this.xSpeed;
        if (this.x + this.w <= 0) {
            this.x = canvasWidth;
        }
    }
}

class Cloud extends GameObject {
    source = {
        x: 0,
        y: 0,
        w: 1900,
        h: 1200,
    };
    xSpeed = Math.random() + .2;
    constructor(x, y, w, h, sprite) {
        super(x, y, w, h, sprite);

            console.log('sprite', sprite.src.split('/').splice(-2).join('/'));
        if (sprite.src.split('/').splice(-2).join('/') === 'images/cloud2.png') {
            this.source = {
                x: 0,
                y: 0,
                w: 700,
                h: 390,
            }
        }
        if (sprite.src.split('/').splice(-2).join('/') === 'images/cloud5.png') {
            this.source = {
                x: 0,
                y: 100,
                w: 400,
                h: 200,
            }
        }
    }
    update() {
        this.x -= this.xSpeed;
        if (this.x + this.w < 0) {
            this.x = canvasWidth;
            this.xSpeed = Math.random() + .1;
            this.w = (Math.random() * 200) + 70;
            this.h = (Math.random() * 150) + 50;
        }
    }
}

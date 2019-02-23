class GameObject {
    constructor(x, y, w, h, sprite) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.sprite = sprite;
        this.source = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
        };
    }

    draw() {
        // context.fillStyle = 'pink';
        // context.fillRect(
        //     this.x,
        //     this.y,
        //     this.w,
        //     this.h,
        // );
        context.drawImage(
            this.sprite,
            this.source.x,
            this.source.y,
            this.source.w,
            this.source.h,
            this.x,
            this.y,
            this.w,
            this.h,
        );


    }

    test() {
        console.log('this', this);
    }
}

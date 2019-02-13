var pressedButtons = {};

function Element() {
    this.el = document.createElement('div');
    this.el.style.position = 'absolute';
    this.relativeChild = document.createElement('div');
    this.relativeChild.style.position = 'relative';
    this.relativeChild.style.height = '100%';
    this.el.appendChild(this.relativeChild);
    this.el.style.backgroundColor = '#DFA98F';
    this.el.style.height = '40px';
    this.el.style.width = '40px';
    this.el.style.left = '300px';
    this.el.style.top = '300px';
    this.vSpeed = 40;
    this.hSpeed = 40;
    this.moveX = moveX;
    this.moveY = moveY;
    this.setSize = setSize;
    this.setColor = setColor;
    this.play = play;
    this.play();
    document.body.appendChild(this.el);
    this.append = append;
    alert('create');
}

var head = new Element({height: 40, width: 100});
head.append(document.body);
head.setSize({width: 200, height: 90});
head.setColor('blue');

var eye = new Element({height: 40, width: 100});
eye.append(head.relativeChild);
eye.setSize({width: 40, height: 60});
eye.setColor('black');
eye.moveY(-200);

document.body.addEventListener('keydown', keydown);
function keydown(event) {
  pressedButtons[event.key] = true;
}

document.body.addEventListener('keyup', keyup);
function keyup(event) {
    pressedButtons[event.key] = false;
}



// helpers

function moveX(value) {
    console.log(this);
    this.el.style.left = ( parseInt( this.el.style.left ) + value ) + 'px';
}

function moveY(value) {
    this.el.style.top = ( parseInt( this.el.style.top ) + value ) + 'px';
}

function setSize( {height, width}) {
    if (!isNaN(height)) {
        this.el.style.height = height + 'px';
    }
    if (!isNaN(width)) {
        this.el.style.width = width + 'px';
    }
}
function play () {
    setInterval( () => {
        if (pressedButtons['e']) {
            this.moveY(-this.vSpeed)
        }
        if (pressedButtons['d']) {
            this.moveY(this.vSpeed)
        }
        if (pressedButtons['s']) {
            this.moveX(-this.hSpeed)
        }
        if (pressedButtons['f']) {
            this.moveX(this.hSpeed)
        }

    }, 100);
}

function setColor(color) {
    this.el.style.backgroundColor = color;
}

function append(parent) {
    parent.appendChild(this.el);
}
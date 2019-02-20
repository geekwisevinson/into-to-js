const background = new Background(0, 0, 360, 640);
const background2 = new Background(360, 0, 360, 640);
const player = new Player(40, 100, 80, 70);
const pipe = new Pipe(360, 0, 80, 300);
let score = 0;
let isPaused = true;

function gameLoop() {
    context.clearRect(0, 0, 360, 640);
    if (!isPaused) {
        background.update();
        background2.update();
        player.update();
        pipe.update();
    }

    background.draw();
    background2.draw();
    player.draw();
    pipe.draw();
    drawScore();
    if (isPaused) {
        drawPaused();
    }
    window.requestAnimationFrame(gameLoop);
}
gameLoop();

function drawScore() {
    context.textAlign = 'center';
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.fillStyle = 'white';
    context.font = 'bold 56px Comic Sans MS';
    context.fillText('Score: ' + score, 180, 100);
    context.strokeText('Score: ' + score, 180, 100)
}

function drawPaused() {
    context.fillStyle = 'rgba(0,0,0, .5)';
    context.fillRect(0,0, 360, 640);
    context.textAlign = 'center';
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.fillStyle = 'white';
    context.font = 'bold 56px Comic Sans MS';
    context.fillText('Paused', 180, 300);
    context.strokeText('Paused', 180, 300)
}


document.addEventListener('keydown', function(e) {
    console.log(e.code)

    if (e.code === 'Space') {
        player.moveUp();
    }
    if (e.code === 'Enter') {
        isPaused = !isPaused;
    }
});
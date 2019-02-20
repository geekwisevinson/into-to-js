const background = new Background(0,0,300, 640);
const background2 = new Background(360,0,300, 640);
const player = new Player(40,100,80,70);
const pipe = new Pipe(360, 0, 80, 200);
let score = 0;
let isPaused = true;


function drawHighScore() {
    context.textAlign = 'center';
    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.fillStyle = 'white';
    context.font = 'bold 20px Comic Sans MS';
    context.fillText('High Score: ' + score, 180, 40);
    context.strokeText('High Score: ' + score, 180, 40)
}



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
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(80, 220, 200, 80);
    context.textAlign = 'center';
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.fillStyle = 'white';
    context.font = 'bold 56px Comic Sans MS';
    context.fillText('Paused', 180, 280);
    context.strokeText('Paused', 180, 280)
}
function gameLoop() {
    context.clearRect(0,0,360, 640);
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
    drawHighScore();
    if (isPaused) {
        drawPaused();
    }
    window.requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('keydown', function(e) {
    console.log('e', e);
    if (e.code === 'Enter') {
        isPaused = !isPaused;
    } else if( e.code === 'Space') {
        player.flap();
    }
});
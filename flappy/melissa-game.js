const background = new Background(0, 0, 360, 640);
const background2 = new Background(360, 0, 360, 640);
const player = new player(0, 100, 80, 70);
function gameLoop() {
    context.clearRect(0, 0, 360, 640);
    background.update();
    background2.update();
    background.draw();
    background2.draw();
    player.draw();
    
    window.requestAnimationFrame(gameLoop);
}
gameLoop();
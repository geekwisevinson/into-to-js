

function generateAnswer() {
    answer = Math.floor(Math.random() * 4);
    simonAnswers.push(possibleAnswers[answer]);
    console.log('Simon says: ', possibleAnswers[answer]);
    playAll();
}

function playAll() {
    let i = 0;
    
    playInterval = setInterval(function () {
        switch (simonAnswers[i]) {
            case 'green':
                console.log('SWITCH GREEN');
                playGreenAnimation();
                break;
            case 'red':
                console.log('SWITCH RED');
                playRedAnimation();
                break;
            case 'yellow':
                playYellowAnimation();
                console.log('SWITCH YELLOW');
                break;
            case 'blue':
                playBlueAnimation();
                console.log('SWITCH BLUE');
                break;
        }
        if (i < simonAnswers.length) {
            i++;
        } else {
            clearInterval(playInterval);
        }
    }, 600);    
}


function checkAnswers() {
    console.log(playerAnswers);
    console.log(simonAnswers);


    for (i = 0; i < playerAnswers.length; i++) {
            console.log('Player: ', playerAnswers[i]);
            console.log('Simon: ', simonAnswers[i]);
        if (playerAnswers[i] === simonAnswers[i]) {
            console.log('correct');
        }
        else {
            console.log('incorrect');
            gameOver = true;

        }
    }
    score++;
    console.log('Score: ' + score);
}


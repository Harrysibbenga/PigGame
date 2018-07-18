/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, gamePlaying;

init();

var previousRoll0;
var previousRoll1;

/* the last dice roll is stored at the end of the function because when the 
function is run again the previouse roll variable will be stored from the previous roll */

function hideDice() {
        document.querySelector('#dice0').style.display = 'none';
        document.querySelector('#dice1').style.display = 'none';
}


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var dice0DOM = document.querySelector('#dice0');
        var dice1DOM = document.querySelector('#dice1');
        dice0DOM.style.display = 'block';
        dice0DOM.src = 'dice-' + dice0 + '.png';
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        
        if ((previousRoll0 === 6 && dice0 === 6) || (previousRoll1 === 6 && dice1 === 6)){
            //Remove total score
            scores[activePlayer] = 0;
            //Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            //Next Player
            setTimeout(nextPlayer, 1000);
            document.querySelector('.btn-roll').classList.add('remove');
        } else if (dice0 !==1 && dice1 !== 1) {
            //Add score
            roundScore += (dice0 + dice1);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
            
            // Used to keep the previous dice score in a variable to compaire if its a 6 or not.
            
            previousRoll0 = dice0;
            previousRoll1 = dice1;
        } else {
            //Next player
            setTimeout(nextPlayer, 1000);
            document.querySelector('.btn-roll').classList.add('remove');
        }
        
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('#gamescore').value;
        
        // Undefined, 0, "" - false part of type COERISON
        // if there is a value then its true
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            hideDice();
        } else {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.btn-roll').classList.remove('remove');
    
    hideDice();
    
    
    // used to reset the previous dice roll for the next player so it dosent reset their score when they roll a 6.
    
    previousRoll0 = 0;
    previousRoll1 = 0;

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    
    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    
}
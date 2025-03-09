'use strict';


let score1 = document.getElementById('score--0');
let score2 = document.getElementById('score--1');

let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

let dice = document.querySelector('.dice');

let roll = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let newGame = document.querySelector('.btn--new');

let currentscore0 = document.getElementById('current--0');
let currentscore1 = document.getElementById('current--1');


let activePlayer = 0; // 0 for player 1, 1 for player 2
let currentScore = 0;
let scores = [0, 0];
score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden');
let modal = document.querySelector('.modal');
let startButton = document.querySelector('.btn--start');
let player1NameInput = document.getElementById('player1-name');
let player2NameInput = document.getElementById('player2-name');
let maxScoreInput = document.getElementById('max-score');
let maxScore = 100; // Default max score
let winnerOverlay = document.querySelector('.winner-overlay');
let winnerMessage = document.getElementById('winner-message');
let newSameButton = document.querySelector('.btn--new-same');
let newDifferentButton = document.querySelector('.btn--new-different');
// Open modal at the start
modal.classList.remove('hidden');



let switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
};


// Function to reset game
function resetGame() {
    score1.textContent = 0;
    score2.textContent = 0;
    currentscore0.textContent = 0;
    currentscore1.textContent = 0;
    dice.classList.add('hidden');
    roll.disabled = false;
    hold.disabled = false;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
}

// New game with same players
newSameButton.addEventListener('click', function () {
    resetGame();
    winnerOverlay.classList.add('hidden');
});

// New game with different players
newDifferentButton.addEventListener('click', function () {
    resetGame();
    winnerOverlay.classList.add('hidden');
    document.querySelector('.overlay').classList.remove("hidden");
    modal.classList.remove('hidden');
    // Reset input fields
    player1NameInput.value = '';
    player2NameInput.value = '';
    maxScoreInput.value = '';
});

document.querySelector('.btn--new').addEventListener('click', function () {
    resetGame();
}
);


// Start game button event
startButton.addEventListener('click', function () {
    document.querySelector('.overlay').classList.add("hidden");
    // Set player names
    document.getElementById('name--0').textContent = player1NameInput.value || 'Player 1';
    document.getElementById('name--1').textContent = player2NameInput.value || 'Player 2';
    // Set max score
    maxScore = Number(maxScoreInput.value) || 100;
    // Hide modal
    modal.classList.add('hidden');
});


// btn--hold
document.querySelector('.btn--hold').addEventListener('click', function () {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. Check if player's score is >= maxScore
    if (scores[activePlayer] >= maxScore) {
        // Finish the game
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        dice.classList.add('hidden');
        // Disable buttons
        roll.disabled = true;
        hold.disabled = true;
        // Show winner modal
        winnerMessage.textContent = `${document.getElementById(`name--${activePlayer}`).textContent} wins!`;
        winnerOverlay.classList.remove('hidden');
    } else {
        // Switch to the next player
        switchPlayer();
    }
});

// btn--roll
document.querySelector('.btn--roll').addEventListener('click', function () {
    // 1. Generating a random dice roll
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (diceRoll !== 1 ) {
        // Add dice to current score
        currentScore += diceRoll;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to next player
        switchPlayer();
    }
});
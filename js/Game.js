/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */  
    createPhrases() {
        const phrases = [
            {phrase: 'The best of both worlds'},
            {phrase: 'Your guess is as good as mine'},
            {phrase: 'Make a long story short'},
            {phrase: 'Go back to the drawing board'},
            {phrase: 'Cut somebody some slack'}
        ];
        return phrases;
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const randomNumber = Math.floor( Math.random() * this.phrases.length );
        return this.phrases[randomNumber];
    }

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        const activePhrase = this.getRandomPhrase();
        this.activePhrase = new Phrase(activePhrase.phrase);
        this.activePhrase.addPhraseToDisplay();
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    * example: button = <button class="key">q</button>
    */
    handleInteraction(button) {
        button.disabled = true;
        const letter = button.textContent;
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            if (this.checkForWin()) {
                this.gameOver(this.checkForWin());
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
    * Checks to see if the player has revealed all of the letters in the active phrase.
    * @return {boolean} True if game has been won, false if game wasn't won
    */
    checkForWin() {
        const allLetters = document.querySelectorAll('.letter');
        let matchedLetters = document.querySelectorAll('.show');
        return allLetters.length === matchedLetters.length;
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const lives = document.querySelectorAll('.tries img');
        lives[this.missed].src = 'images/lostHeart.png';
        
        this.missed += 1;
        const tries = document.querySelectorAll('.tries img').length;
        if (tries === this.missed) {
            this.gameOver(false);
        }
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').classList.remove('start');
        if (gameWon) {
            document.querySelector('#game-over-message').textContent = 'You won, great job!';
            document.querySelector('#overlay').classList.add('win');
        } else {
            document.querySelector('#game-over-message').textContent = 'Sorry, better luck next time!';
            document.querySelector('#overlay').classList.add('lose');
        }
        this.reset();
    }

    /**
    * This resets the game
    */
    reset() {
        this.activePhrase.addPhraseToDisplay;
        let phraseList = document.querySelector('#phrase ul');
        phraseList.innerHTML = '';

        const lives = document.querySelectorAll('.tries img');
        lives.forEach(live => {
            live.src = 'images/liveHeart.png';
        });

        const buttons = document.querySelectorAll('.key');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('wrong');
            button.classList.remove('chosen');
        });
    }
}
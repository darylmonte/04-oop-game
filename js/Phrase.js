/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        let listPhrase = document.querySelector('#phrase ul');
        listPhrase.innerHTML = '';

        for ( let i = 0; i < this.phrase.length; i++ ) {
            let letter = this.phrase[i];
            let letterList = '';
            if (letter === ' ') {
                letterList = `<li class="space">${letter}</li>`;
            } else {
                letterList = `<li class="hide letter ${letter}">${letter}</li>`;
            }
            listPhrase.insertAdjacentHTML('beforeend', letterList);
        }
    }

    /**
    * Checks to see if the letter selected by the player matches a letter in the phrase.
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        if (this.checkLetter(letter)) {
            const matchedLetters = document.querySelectorAll(`.${letter}`);
            matchedLetters.forEach(matchedLetter => {
                matchedLetter.classList.remove('hide');
                matchedLetter.classList.add('show');
            });
        }
    }
}
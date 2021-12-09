/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Clicking the "Start Game" button creates a new Game object and starts the game
let game;
document.querySelector('#btn__reset').addEventListener('click', e => {
    game = new Game();
    game.startGame();
});

// Clicking an onscreen keyboard button results in a call to the handleInteraction() method for the clicked keyboard button
const buttons = document.querySelectorAll('.key');
buttons.forEach(button => {
    button.addEventListener('click', e => {
        e = button;
        game.handleInteraction(e);
    });
});

// pressing a physical keyboard button results in the handleInteraction() method being called 
// for the associated onscreen keyboard button
// This also prevents duplicate pressing of keys
window.addEventListener('keydown', (e) => {
    buttons.forEach(button => {
      if (button.textContent === e.key) {
        if (button.classList.contains('chosen')) {
            e.preventDefault();
        } else if (button.classList.contains('wrong')) {
            e.preventDefault();
        } else {
            game.handleInteraction(button);
        }
      }
    })
  });

// CUSTOMIZATIONS
document.querySelector('.start').style.backgroundColor = '#212F3D';
document.querySelector('h2.title').style.fontFamily = "'Special Elite', cursive";
document.querySelector('h2.header').style.fontFamily = "'Special Elite', cursive";
buttons.forEach(button => button.style.fontFamily = "'Special Elite', cursive");
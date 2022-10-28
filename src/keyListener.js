import store from "$/store";

const listenKeyBoardEvents = function (e) {
  if (store.game.started) {
    // Open Next Square on Enter
    if (e.keyCode == 13) {

    }

    // Open Guess What box on space
    if (e.keyCode == 32) {

    }

    // Previous card on left arrow
    if (e.keyCode == 37) {
  
    }

    // Next card on right arrow
    if (e.keyCode == 39) {

    }

    // Quit Game on Esc
    if (e.keyCode == 27) {
      store.quitGame();
    }

    // Give UP on Backspace
    if (e.keyCode == 8) {

    }
  } else {
    if (e.keyCode == 13) {
      store.startGame();
    }
  }
};

$(window).on("resize", function (e) {
  store.quitGame();
});

window.addEventListener("keydown", listenKeyBoardEvents);

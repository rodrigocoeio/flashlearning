import store from "$/store";

const listenKeyBoardEvents = function (e) {
  if (store.game.started) {
    // Open Next on Enter
    if (e.keyCode == 13) {
      if (store.card.image && !store.game.image) return (store.game.image = true);
      if (store.card.name && !store.game.name) return (store.game.name = true);
      if (store.card.translation && !store.game.translation) return (store.game.translation = true);

      return store.nextCard();
    }

    // Close on Backspace
    if (e.keyCode == 8) {
      if (store.card.translation && store.game.translation) return (store.game.translation = false);
      if (store.card.name && store.game.name) return (store.game.name = false);
      if (store.card.image && store.game.image) return (store.game.image = false);

      return store.previousCard();
    }

    // Play card audio on space
    if (e.keyCode == 32) {
      store.playCardAudio();
    }

    // Previous card on left arrow
    if (e.keyCode == 37) {
      store.previousCard();
    }

    // Next card on right arrow
    if (e.keyCode == 39) {
      store.nextCard();
    }

    // Quit Game on Esc
    if (e.keyCode == 27) {
      store.quitGame();
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

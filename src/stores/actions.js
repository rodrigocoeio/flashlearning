export default {
  startGame() {
    this.game.started = true;
    this.game.image = false;
    this.game.text = false;
    this.game.translation = false;
  },

  quitGame() {
    if (this.game.audio) this.stopAudio();

    this.game.started = false;
  },

  playCardAudio() {
    const audioFile = "/cards/" + this.categoryName + "/" + this.card.audio;

    if (this.card.audio) {
      this.game.audio = playAudio(audioFile);
      this.game.audio.onended = function () {
        this.game.audio = false;
      };
    }
  },

  stopAudio() {
    if (this.game.audio) this.game.audio.pause();
  },

  selectCategory(category) {
    this.game.category = category;
  },

  previousCard() {
    if (this.game.audio) this.stopAudio();

    if (this.game.cardIndex > 0) {
      this.game.image = false;
      this.game.text = false;
      this.game.translation = false;
      this.game.cardIndex--;
    }
  },

  nextCard() {
    if (this.game.audio) this.stopAudio();

    if (this.game.cardIndex + 1 < this.cardsNumber) {
      this.game.image = false;
      this.game.text = false;
      this.game.translation = false;
      this.game.cardIndex++;
    }
  },
};

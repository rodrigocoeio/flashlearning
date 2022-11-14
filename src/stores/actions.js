export default {
  startGame() {
    if(!this.currentCategory || (!this.currentCategory.cards || this.currentCategory.cards.length===0))
    {
      alert('Choose a Category or Subcategory');
      $("#categoryField").trigger("focus");
      return false;
    }

    console.log("Game Started");

    this.game.started = true;
    this.game.cardIndex = 0;
    this.game.cover = this.currentCategory.cover;
    this.game.audio = false;
    this.game.image = false;
    this.game.name = false;
    this.game.translation = false;
  },

  quitGame() {
    if (this.game.audio) this.stopAudio();

    this.game.started = false;
    this.game.category = false;
  },

  playCardAudio(card) {
    this.stopAudio();
    
    const store = this;
    card = card ? card : this.card;

    const audioFile = "/cards/" + card.parent + "/" + card.audio;

    if (card.audio) {
      this.game.audio = playAudio(audioFile);
      this.game.audio.onended = function () {
        store.game.audio = false;
      };
    }
  },

  stopAudio() {
    if (this.game.audio){
      this.game.audio.pause();
      this.game.audio = false;
    }
  },

  toggleCardImage() {
    this.game.image = !this.game.image;
  },

  toggleCardName() {
    this.game.name = !this.game.name;
  },

  toggleCardTranslation() {
    this.game.translation = !this.game.translation;
  },

  selectCategory(category) {
    this.game.category = category;
  },

  selectSubCategory(subcategory) {
    this.game.subcategory = subcategory;
  },

  previousCard() {
    if (this.game.audio) this.stopAudio();

    if (this.game.cardIndex > 0) {
      this.game.image = false;
      this.game.name = false;
      this.game.translation = false;
      this.game.cardIndex--;
    }
  },

  nextCard() {
    if (this.game.audio) this.stopAudio();

    if (this.game.cardIndex + 1 < this.cardsNumber) {
      this.game.image = false;
      this.game.name = false;
      this.game.translation = false;
      this.game.cardIndex++;
    }
  },
};

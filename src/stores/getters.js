export default {
  currentCategory() {
    const categoryName = this.game.category;
    const subcategoryName = this.game.subcategory;

    // All Cards
    if (categoryName === "all") {
      const allCards = [];

      for (const k in this.categories) {
        const category = this.categories[k];
        category.cards.forEach((card) => allCards.push(card));
      }

      const allCardsCategory = {
        name: "All Cards",
        cards: shuffleArray(allCards),
      };

      return allCardsCategory;
    }

    let category = this.categories[categoryName]
      ? this.categories[categoryName]
      : false;

    if(subcategoryName)
      return category.categories[subcategoryName];

    return category;
  },

  categoryName() {
    return this.currentCategory ? this.currentCategory.name : "";
  },

  card() {
    return this.currentCategory &&
      this.currentCategory.cards[this.game.cardIndex]
      ? this.currentCategory.cards[this.game.cardIndex]
      : false;
  },

  cardsNumber() {
    return this.currentCategory ? this.currentCategory.cards.length : 0;
  },
};

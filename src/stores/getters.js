export default {
  currentCategory() {
    const categoryName = this.game.category;

    // All Cards
    if (categoryName === "all") {
      const allCards = [];

      for (const k in this.categories) {
        const category = this.categories[k];
        category.cards.forEach((card) => allCards.push(card));
      }

      const allCardsCategory = {
        name: "All Cards",
        cards: sortByKey(allCards, "name"),
      };

      return allCardsCategory;
    }

    return this.categories[categoryName]
      ? this.categories[categoryName]
      : false;
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

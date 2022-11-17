<template>
  <main>
    <img src="images/flashlearning_logo.png">

    <br><br>

    <select class="form form-select" v-model="cardSorting">
      <option value="alpha">Alphabetical Sorting</option>
      <option value="number">Numerical Sorting</option>
      <option value="shuffle">Shuffle Cards</option>
    </select>

    <category-select :categories="categories"></category-select>

    <button class="btn btn-primary" @click="startGame">Start Game</button>

  </main>
</template>
  
<script>
import store from "$/store.js";
import CategorySelect from "./CategorySelect.vue";

export default {
  data() {
    return {
      category: store.game.category,
      subcategory: store.game.subcategory,
      cardSorting: store.game.cardSorting
    }
  },

  computed: {
    categories() {
      return store.categories;
    },

    currentCategory() {
      return store.categories[this.category];
    },

    hasSubCategories() {
      return this.currentCategory && this.currentCategory.categories ? Object.keys(this.currentCategory.categories).length > 0 : false;
    }
  },

  watch: {
    category(category) {
      store.selectCategory(category);
    },

    subcategory(subcategory) {
      store.selectSubCategory(subcategory);
    },

    cardSorting(value) {
      store.game.cardSorting = value;
    }
  },

  methods: {
    startGame() {
      return store.startGame();
    }
  },

  components: {
    CategorySelect
  }
}
</script>
  
<style scoped>
main {
  padding: 15px;
}

select {
    max-width: 200px;
    margin: auto;
    margin-bottom: 15px;
}
</style>
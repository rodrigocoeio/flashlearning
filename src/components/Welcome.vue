<template>
  <main>
    <img src="images/flashlearning_logo.png">

    <br><br>

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
      subcategory: store.game.subcategory
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
</style>
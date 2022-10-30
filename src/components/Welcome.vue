<template>
  <main>
    <img src="images/flashlearning_logo.png">

    <br><br>

    <select id="categoryField" class="form form-select" v-model="category" @change="subcategory=0">
      <option value="0">Choose a Category</option>
      <option value="all">All Cards</option>
      <option v-for="category, index in categories" :value="index">{{ category.name }}</option>
    </select>

    <select id="subCategoryField" v-if="hasSubCategories" class="form form-select" v-model="subcategory">
      <option value="0">Choose a Sub-Category</option>
      <option v-for="category, index in currentCategory.categories" :value="index">{{ category.name }}</option>
    </select>

    <button class="btn btn-primary" @click="startGame">Start Game</button>

  </main>
</template>
  
<script>
import store from "$/store.js";

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
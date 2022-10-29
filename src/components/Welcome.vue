<template>
  <main>
    <img src="images/flashlearning_logo.png">

    <br><br>

    <select id="categoryField" class="form form-select" v-model="category">
      <option value="0">Choose a Category</option>
      <option value="all">All Cards</option>
      <option v-for="category, index in categories" :value="index">{{ category.name }}</option>
    </select>

    <button class="btn btn-primary" @click="startGame">Start Game</button>

  </main>
</template>
  
<script>
import store from "$/store.js";

export default {
  data() {
    return {
      category: store.game.category
    }
  },

  computed: {
    categories() {
      return store.categories;
    }
  },

  watch: {
    category(category) {
      store.selectCategory(category);
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
<template>
    <select id="categoryField" class="form form-select" v-model="categoryName" @change="selectCategory">
        <option value="0">Choose a Category</option>
        <option value="all">All Cards</option>
        <option v-for="category, index in categories" :value="index">{{ category.name }}</option>
    </select>

    <category-select v-if="hasSubCategories" :category="currentCategory" :categories="currentCategory.categories">
    </category-select>
</template>

<script>
import store from "$/store.js";
import CategorySelect from "./CategorySelect.vue";

export default {
    props: ['category', 'categories'],

    data() {
        return {
            categoryName: "0"
        }
    },

    computed: {
        hasSubCategories() {
            return this.currentCategory && this.currentCategory.categories ? Object.keys(this.currentCategory.categories).length > 0 : false;
        },

        currentCategory() {
            if (this.categoryName === "all") {
                const allCards = this.getCategoriesAllCards(this.categories);

                const allCardsCategory = {
                    name: "All Cards",
                    fullName: this.category ? this.category.fullName + " - All Cards" : "All Cards",
                    cards: sortByKey(allCards, "name"),
                };

                return allCardsCategory;
            }

            return this.categories[this.categoryName];
        }
    },

    mounted() {
        if (!store.game.category)
            this.selectCategory();
    },

    methods: {
        selectCategory() {
            const category = this.currentCategory;
            if (category && category.cards && store.game.cardSorting=="shuffle")
                category.cards = shuffleArray(category.cards);
            store.game.category = category;
        },

        getCategoriesAllCards(categories) {
            const allCards = [];

            for (const name in categories) {
                const category = categories[name];

                if (category.cards)
                    category.cards.forEach((card) => allCards.push(card));

                if (category.categories) {
                    const categoryCards = this.getCategoriesAllCards(category.categories);
                    categoryCards.forEach((card) => allCards.push(card));
                }
            }

            return allCards;
        }
    }
}
</script>

<style scoped>
select {
    max-width: 200px;
    margin: auto;
    margin-bottom: 15px;
}
</style>
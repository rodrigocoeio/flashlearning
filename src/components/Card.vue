<template>
    <div class="CardBox">
        <div class="Card">

            <div>
                <h1 v-show="game.name">{{ card.name }}</h1>
                <h2 class="Translation" v-show="game.translation">
                    <pre>{{ card.translation }}</pre>
                </h2>
                <h2 class="Comment" v-show="card.comment && game.translation">
                    <pre>{{ card.comment }}</pre>
                </h2>
            </div>

            <!-- Cover -->
            <img :src="coverImage" class="GuessWhat" v-show="!game.image"
                @click="playAudio">

            <!-- Card Image -->
            <img :src="image" v-if="card.image" v-show="game.image" @click="playAudio" class="CardImage">
        </div>
    </div>
</template>

<script>
import store from "$/store.js";

export default {
    computed: {
        game() {
            return store.game;
        },

        currentCategory() {
            return store.currentCategory;
        },

        card() {
            return store.card;
        },

        image() {
            return "/cards/" + this.card.parent + "/" + this.card.image;
        },

        coverImage() {
            const category = store.game.category;
            const cover = category.cover;

            return cover ? "/cards/" + cover.parent + "/" + cover.image : "/images/flashlearning_logo.png";
        },

        cards() {
            return store.currentCategory ? store.currentCategory.cards : [];
        },

        cardIndex() {
            return store.game.cardIndex;
        }
    },

    mounted() {
        this.playAudio();
    },

    methods: {
        playAudio() {
            store.playCardAudio();
        },

        quitGame() {
            return store.quitGame();
        }
    },
}
</script>

<style scoped>
.Translation {
    color: blue;
}

.Comment {
    color: red;
    font-size: 25px;
}

.CardBox {
    width: calc(100% - 200px);
    max-height: calc(100% - 100px);
    height: 100%;
    padding: 30x;
    margin: auto;
    overflow: hidden;
}

.Card img {
    max-height: 100%;
    object-fit: contain;
    cursor: pointer;
}

.Card {
    border: 4px dashed red;
    padding: 30px;
    height: 100%;
}

.Card pre {
    margin-bottom: 0px;
}

.GuessWhat {
    cursor: pointer;
}
</style>
<template>
    <div class="CardBox">
        <div :class="['Card', index == 0 ? 'active' : '']" v-for="card,index in cards" v-show="cardIndex === index">

            <img src="/images/guesswhat.jpg" class="GuessWhat" v-if="!game.image && !game.name && !game.translation"
                @click="playAudio">

            <div>
                <h1 v-show="game.name">{{ card.name }}</h1>
                <h2 class="Translation" v-show="game.translation">{{ card.translation }}</h2>
            </div>

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
            return "/cards/" + this.card.category + "/" + this.card.image;
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
    color: red;
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

.GuessWhat {
    cursor: pointer;
}
</style>
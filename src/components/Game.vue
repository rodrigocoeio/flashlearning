<template>
    <controls></controls>

    <br>

    <div class="CardBox">
        <div :class="['Card', index == 0 ? 'active' : '']" v-for="card,index in cards" v-show="cardIndex === index">

            <img src="/images/guesswhat.jpg" class="GuessWhat" v-if="!game.image && !game.text && !game.translation" @click="playAudio">

            <img :src="image" v-if="card.image" v-show="game.image" class="CardImage">

            <div>
                <h1 v-show="game.text">{{ card.name }}</h1>
                <h3 class="Translation" v-show="game.translation">{{ card.translation }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import store from "$/store.js";

import Controls from "./Controls.vue";

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
            return "/cards/" + this.currentCategory.name + "/" + this.card.image;
        },

        cards() {
            return store.currentCategory ? store.currentCategory.cards : [];
        },

        cardIndex() {
            return store.game.cardIndex;
        }
    },

    methods: {
        playAudio() {
            store.playCardAudio();
        },

        quitGame() {
            return store.quitGame();
        }
    },

    components: {
        Controls
    }
}
</script>

<style scoped>
.Translation {
    color: red;
}

.CardBox {
    width: calc(100% - 200px);
    height: 100%;
    padding: 30x;
    margin: auto;
}

.Card {
    border: 4px dashed black;
    padding: 30px;

}

.CardImage {
    height: 300px;
}

.GuessWhat {
    cursor: pointer;
}
</style>

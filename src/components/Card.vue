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
            <img :src="coverImage" class="GuessWhat" v-show="!game.image" @click="playAudio">

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

            return cover ? "/cards/" + cover.parent + "/" + cover.image : "/images/flashlearning.png";
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
    height: calc(100% - 100px);
    padding: 30x;
    margin: auto;
    overflow: hidden;
    border: 4px dashed red;
    border-radius: 30px;
}

.Card {
    padding: 30px;
    padding-top: 10%;
    height: calc(100% - 90px);
    background-repeat: no-repeat;
    background-size: cover;
}

.Card img {
    max-height: calc(100% - 100px);
    object-fit: contain;
    cursor: pointer;
}

.Card h1 {
    font-size: 48px;
    text-shadow: gray 3px 1px 1px;
    -webkit-text-stroke: 1px black;
}

.Card pre {
    margin-bottom: 0px;
}

.GuessWhat {
    cursor: pointer;
}

pre {
    white-space: pre-wrap;
    /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
}
</style>
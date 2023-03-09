<template>
    <div class="CardBox">
        <div class="Card">

            <div class="CardText">
                <h1 v-show="game.name">{{ card.name }}</h1>
                <h2 class="Translation" v-show="game.translation">
                    <pre>{{ card.translation }}</pre>
                </h2>
                <h2 class="Comment" v-show="card.comment && game.translation">
                    <pre>{{ card.comment }}</pre>
                </h2>
            </div>

            <!-- Cover -->
            <div class="CardCover" v-if="!game.image">
                <img :src="coverImage" class="GuessWhat" @click="playAudio">
            </div>

            <div class="CardImage" v-if="card.image">
                <!-- Card Image -->
                <img :src="image" v-show="game.image" @click="playAudio" class="CardImage">
            </div>
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
    height: calc(100% - 120px);
    padding: 30x;
    margin: auto;
    overflow: hidden;
    border: 4px dashed black;
    border-radius: 30px;
    display: flex;
    place-content: center;
    align-items: center;
    place-items: center;
}

.Card {
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: contain;
    height: 90%;
}

.CardImage {
    position: relative;
    object-fit: contain;
    height: calc(100% - 120px);
}

.CardImage img {
    height: 100%;
}

.CardCover {
    position: relative;
    object-fit: contain;
    height: 100%;
}

.CardCover img {
    height: 100%;
}

.CardText {
    margin: 0px;
    overflow: hidden;
    background-color: white;
    color: black;
}

.Card h1 {
    font-size: 48px;
    text-shadow: gray 3px 1px 1px;
    -webkit-text-stroke: 1px black;
    margin: 0px;
}

.Card h2 {
    font-size: 30px;
    margin: 0px;
}

.Card pre {
    margin: 0px;
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
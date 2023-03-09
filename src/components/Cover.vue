<template>
    <div class="CardBox">
        <div class="Card" @click="playAudio">
            <div>
                <h1>{{ card.name }}</h1>
                <h1 class="Translation">
                    <pre>{{ card.translation }}</pre>
                </h1>
            </div>

            <img :src="image" v-if="card.image" @click="playAudio" class="CardImage">
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

        card() {
            return store.game.cover;
        },

        image() {
            return "/cards/" + this.card.parent + "/" + this.card.image;
        },
    },

    mounted() {
        this.playAudio();
    },

    methods: {
        playAudio() {
            store.playCardAudio(this.card);
        }
    }

}
</script>


<style scoped>
.Translation {
    color: red;
}

.CardBox {
    width: calc(100% - 200px);
    height: calc(100% - 100px);
    padding: 30x;
    margin: auto;
    margin-top: 15px;
    overflow: hidden;
    border: 4px dashed red;
    border-radius: 30px;
}

.Card {
    padding: 30px;
    height: calc(100% - 90px);
    background-repeat: no-repeat;
    background-size: cover;
}

.Card img {
    max-height: calc(100% - 100px);
    object-fit: contain;
    cursor: pointer;
}

h1,
h2 {
    background-color: white;
    text-shadow: gray 3px 1px 1px;
    -webkit-text-stroke: 1px black;
}

.GuessWhat {
    cursor: pointer;
}
</style>
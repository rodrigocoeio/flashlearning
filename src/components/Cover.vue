<template>
    <div class="CardBox">
        <div class="Card" @click="playAudio">
            <div>
                <h1>{{ card.name }}</h1>
                <h2 class="Translation">
                    <pre>{{ card.translation }}</pre>
                </h2>
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
    background-repeat: no-repeat;
    background-size: cover;
}

h1,
h2 {
    background-color: white;
}

.GuessWhat {
    cursor: pointer;
}
</style>
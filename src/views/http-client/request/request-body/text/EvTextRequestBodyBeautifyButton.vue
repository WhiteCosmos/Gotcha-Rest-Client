<template>
    <div class="ev-text-request-body-beautify-button" @click="emitBeautify">
        <v-hover v-slot="{ hover }">
            <v-icon size="10" :color="hover ? '#007AFF' : '#C3C3C3'">fa-magic</v-icon>
        </v-hover>
    </div>
</template>

<script>
    export default {
        name: "EvTextRequestBodyBeautifyButton",

        methods: {
            emitBeautify() {
                this.$emit('beautify')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-text-request-body-beautify-button {
        display: flex;

        justify-content: center;

        align-items: center;

        width: 16px;

        height: 16px;

        padding-bottom: 1px;
    }
</style>

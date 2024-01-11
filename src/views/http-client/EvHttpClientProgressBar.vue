<template>
    <transition name="fade">
        <v-progress-linear
            v-if="progress > 0"
            :value="progress"
            height="2"
            color="#3395FF"
            background-color="none"></v-progress-linear>
    </transition>
</template>

<script>
    export default {
        name: "EvHttpClientProgressBar",

        props: {
            progress: Number
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

<template>
    <div class="dot-button d-flex flex-column align-center justify-center" v-on="events">
        <div class="dot-button__circle"></div>

        <ev-horizon-gutter :gutter="3"></ev-horizon-gutter>

        <div class="dot-button__circle"></div>

        <ev-horizon-gutter :gutter="3"></ev-horizon-gutter>

        <div class="dot-button__circle"></div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    export default {
        name: "EvDotButton",

        props: {
            events: Object,

            horizon: false,
        },

        components: {EvHorizonGutter, EvVerticalGutter},
    }
</script>

<style lang="scss" scoped>
    .dot-button {
        width: 20px;

        height: 20px;

        border-radius: 20px;

        //padding-left: 4px;

        //padding-right: 4px;

        user-select: none;

        transition: all .12s;

        &:hover {
            background-color: #f7f7f7;
        }
    }

    .dot-button__circle {
        width: 2px;

        height: 2px;

        border-radius: 2px;

        background-color: #AABBCC;
    }
</style>

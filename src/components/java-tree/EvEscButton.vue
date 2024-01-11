<template>
    <div class="esc-button">
        <span class="esc-button__font">ESC</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <cancel-icon></cancel-icon>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import CancelIcon from '@/components/icon/cancel-icon'

    export default {
        name: "EvEscButton",
        components: {CancelIcon, EvVerticalGutter},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .esc-button {
        @include horizon-center;

        height: 16px;

        //border: 1px solid $SECONDARY_COLOR;

        border-radius: 8px;

        padding-left: 6px;

        padding-right: 4px;

        display: flex;

        align-items: center;

        background-color: #F1F1F1;
    }

    .esc-button__font {
        font-size: 10px;

        font-weight: bold;

        color: #AABBCC;
    }
</style>

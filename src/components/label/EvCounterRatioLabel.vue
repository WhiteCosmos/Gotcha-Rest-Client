<template>
    <div class="ev-counter-label">
        <span class="ev-counter-label__text">{{ nu || 0 }}</span>

        <ev-vertical-gutter :gutter="3"></ev-vertical-gutter>

        <span class="ev-counter-label__text">/</span>

        <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

        <span class="ev-counter-label__text">{{ de || 0 }}</span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvCounterRatioLabel",
        components: {EvVerticalGutter},
        props: {
            nu: [String, Number, Object],

            de: [String, Number, Object]
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-counter-label {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 4px;

        padding-right: 4px;

        padding-top: 1px;

        height: 12px;

        border-radius: 3px;

        border: 1px solid #CCC;

        user-select: none;

        &__text {
            font-size: 10px;

            color: $SECONDARY_FONT_COLOR;
        }
    }
</style>

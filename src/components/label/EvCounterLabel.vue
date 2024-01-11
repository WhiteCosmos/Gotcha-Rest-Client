<template>
    <div class="ev-counter-label">
        <span class="ev-counter-label__text">{{ value }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvCounterLabel",

        props: {
            value: [String, Number, Object]
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

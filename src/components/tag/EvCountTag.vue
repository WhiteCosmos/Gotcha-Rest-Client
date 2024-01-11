<template>
    <div class="count-tag">
        <span class="count-tag__font">{{ count }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvCountTag",

        props: {
            count: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .count-tag {
        min-width: 14px;

        height: 14px;

        border-radius: 3px;

        background-color: $SECONDARY_BACKGROUND_COLOR;

        display: flex;

        align-items: center;

        justify-content: center;

        //padding-left: 1px;

        padding-top: 1px;
    }

    .count-tag__font {
        font-family: "Source Code Pro", sans-serif;

        font-size: 11px;

        line-height: 11px;

        font-weight: bold;

        color: $PLACEHOLDER_COLOR;
    }
</style>

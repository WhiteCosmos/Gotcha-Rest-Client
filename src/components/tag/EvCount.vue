<template>
    <div class="count">
        <span class="count__font">[ {{ count }} ]</span>
    </div>
</template>

<script>
    export default {
        name: "EvCount",
        props: {
            count: {
                type: Number,
                default: 0,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .count {
        min-width: 14px;

        height: 14px;

        border-radius: 3px;

        //background-color: $SECONDARY_BACKGROUND_COLOR;

        display: flex;

        align-items: center;

        justify-content: center;

        //padding-left: 1px;

        padding-top: 1px;

        padding-left: 2px;

        padding-right: 2px;
    }

    .count__font {
        font-family: "Source Code Pro", sans-serif;

        font-size: 11px;

        line-height: 11px;

        font-weight: normal;

        color: $PLACEHOLDER_COLOR;
    }
</style>

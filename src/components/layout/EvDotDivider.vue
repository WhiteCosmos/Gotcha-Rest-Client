<template>
    <div class="ev-dot-divider">
        <div class="ev-dot-divider__dot"></div>
    </div>
</template>

<script>
    export default {
        name: "EvDotDivider",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-dot-divider {
        @include full-center;

        width: 16px;

        height: 16px;

        padding-top: 3px;

        &__dot {
            display: flex;

            width: 4px;

            height: 4px;

            border-radius: 4px;

            background-color: $PLACEHOLDER_FONT_COLOR;
        }
    }
</style>

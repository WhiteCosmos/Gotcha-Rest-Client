<template>
    <div class="ev-counter">
        <span class="ev-counter__label"><slot></slot></span>
    </div>
</template>

<script>
    export default {
        name: "EvCounter",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-counter {
        width: 20px;

        height: 12px;

        border-radius: 2px;

        //background-color: #FAFAFA;

        border: 1px solid #E0E0E0;

        @include full-center;

        padding-left: 1px;

        &__label {
            font-size: 10px;

            line-height: 12px;

            text-align: center;

            color: $PLACEHOLDER_FONT_COLOR;
        }
    }
</style>

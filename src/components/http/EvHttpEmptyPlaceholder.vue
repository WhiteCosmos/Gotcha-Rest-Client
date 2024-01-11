<template>
    <div class="http-empty-placeholder">
        <span class="http-empty-placeholder__label">{{ text }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvHttpEmptyPlaceholder",

        props: {
            text: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-empty-placeholder {
        height: 64px;

        border: 1px dashed #E0E0E0;

        @include full-center;

        border-radius: 4px;

        user-select: none;

        &__label {
            font-size: 10px;

            font-weight: bold;

            color: #AABBCC;
        }
    }
</style>

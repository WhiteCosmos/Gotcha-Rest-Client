<template>
    <div class="placeholder-container d-flex align-center justify-center" :style="{'height': height + 'px'}">
        <span class="placeholder-style"><slot></slot></span>
    </div>
</template>

<script>
    export default {
        name: "EvPlaceholder",
        props: {
            height: {
                type: Number,
                default: 72
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .placeholder-container {
        width: 100%;

        border-radius: 5px;

        border: 1px dashed #CCC;

        user-select: none;
    }

    .placeholder-style {
        font-size: 12px;

        font-weight: bold;

        color: #B5B5B5;
    }
</style>

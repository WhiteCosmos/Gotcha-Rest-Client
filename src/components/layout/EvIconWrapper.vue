<template>
    <div class="ev-icon-wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "EvIconWrapper",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-icon-wrapper {
        @include full-center;

        width: 20px;

        height: 20px;

        border-radius: 2px;

        transition: background-color 0.1s;

        &:hover {
            background-color: #F1F1F1;
        }
    }
</style>

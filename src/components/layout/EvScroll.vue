<template>
    <div class="ev-scroll">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "EvScroll",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-scroll {
        display: flex;

        height: 100%;
    }
</style>

<template>
    <div class="ev-column">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "EvColumn",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-column {
        display: flex;

        flex-direction: column;

        user-select: none;
    }
</style>

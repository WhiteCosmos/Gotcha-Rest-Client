<template>
    <div class="ev-row">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "EvRow",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-row {
        display: flex;

        flex-direction: row;

        align-items: center;
    }
</style>

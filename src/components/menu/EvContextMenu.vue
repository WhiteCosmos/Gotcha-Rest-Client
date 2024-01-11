<template>
    <div class="ev-context-menu">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "EvContextMenu",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-context-menu {
        display: flex;

        flex-direction: column;

        min-width: 160px;

        padding: 4px;

        background-color: #F1F1F1;
    }
</style>

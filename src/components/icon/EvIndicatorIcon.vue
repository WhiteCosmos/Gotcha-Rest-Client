<template>
    <div class="indicator-icon"></div>
</template>

<script>
    export default {
        name: "EvIndicatorIcon",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .indicator-icon {
        width: 4px;

        height: 12px;

        border-radius: 4px;

        background-color: $PRIMARY_COLOR;

        transform: scale(.8);

        box-shadow: 0px 1px 4px -2px #C2C7CC;
    }
</style>


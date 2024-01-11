<template>
    <div class="http-client-divider"></div>
</template>

<script>
    export default {
        name: "EvHttpClientDivider",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-divider {
        height: 16px;

        flex-shrink: 0;

        background-color: #FAFAFA;

        //box-shadow: inset 0px 8px 8px -12px #C8C8C8, inset 0px -8px 8px -12px #C8C8C8;
    }
</style>

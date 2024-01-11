<template>
    <div class="ev-websocket-response-body">

    </div>
</template>

<script>
    export default {
        name: "EvWebsocketResponseBody",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-websocket-response-body {
        display: flex;

        height: 100%;

        overflow-y: scroll;
    }
</style>

<template>
    <div class="ev-websocket-response">
        <ev-websocket-response-header></ev-websocket-response-header>

        <ev-websocket-response-body></ev-websocket-response-body>

        <ev-websocket-response-footer></ev-websocket-response-footer>
    </div>
</template>

<script>
    import EvWebsocketResponseHeader from '@/views/websocket/EvWebsocketResponseHeader'
    import EvWebsocketResponseBody from '@/views/websocket/EvWebsocketResponseBody'
    import EvWebsocketResponseFooter from '@/views/websocket/EvWebsocketResponseFooter'

    export default {
        name: "EvWebsocketResponse",
        components: {EvWebsocketResponseFooter, EvWebsocketResponseBody, EvWebsocketResponseHeader},
        props: {}
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-websocket-response {
        position: relative;

        display: flex;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        flex-direction: column;

        background-color: #F5F5F5;
    }
</style>

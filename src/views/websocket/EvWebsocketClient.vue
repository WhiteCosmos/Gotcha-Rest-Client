<template>
    <div class="ev-websocket-client">
        <ev-split-view :config="viewConfig" ref="ev-split-view">
            <template v-slot:major>
                <ev-websocket-request></ev-websocket-request>
            </template>

            <template v-slot:minor>
                <ev-websocket-response></ev-websocket-response>
            </template>
        </ev-split-view>
    </div>
</template>

<script>
    import EvWebsocketRequest from '@/views/websocket/EvWebsocketRequest'
    import EvWebsocketResponse from '@/views/websocket/EvWebsocketResponse'
    import EvSplitView from '@/components/layout/EvSplitView'

    export default {
        name: "EvWebsocketClient",

        components: {
            EvSplitView,
            EvWebsocketRequest,
            EvWebsocketResponse,
        },

        props: {
            websocketOperation: Object
        },

        computed: {
            viewConfig() {
                return {
                    name: 'EvWebsocketClient',
                    minMajorViewWidth: 512
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-websocket-client {
        position: relative;

        display: flex;

        flex: 1;

        height: 100%;
    }
</style>

<template>
    <div class="d-flex flex-column mock-client-response">
        <ev-mock-client-response-status-bar></ev-mock-client-response-status-bar>

        <ev-mock-client-response-navigation-bar></ev-mock-client-response-navigation-bar>

        <ev-horizon-divider></ev-horizon-divider>

        <div>
            <ev-mock-client-response-headers></ev-mock-client-response-headers>

            <ev-mock-client-response-body></ev-mock-client-response-body>
        </div>
    </div>
</template>

<script>
    import EvMockClientResponseStatusBar from '@/components/mock-client/response/EvMockClientResponseStatusBar'
    import EvMockClientResponseNavigationBar from '@/components/mock-client/response/EvMockClientResponseNavigationBar'
    import EvMockClientResponseHeaders from '@/components/mock-client/response/EvMockClientResponseHeaders'
    import EvMockClientResponseBody from '@/components/mock-client/response/EvMockClientResponseBody'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'

    export default {
        name: "EvMockClientResponse",

        components: {
            EvHorizonDivider,
            EvMockClientResponseBody,
            EvMockClientResponseHeaders,
            EvMockClientResponseNavigationBar,
            EvMockClientResponseStatusBar
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-response {
        height: 100%;

        flex: 1;

        //background-color: #FCFCFC;
    }
</style>

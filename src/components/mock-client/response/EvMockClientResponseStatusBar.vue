<template>
    <div class="d-flex align-center mock-client-response-status-bar">
        <ev-mock-client-response-status-code></ev-mock-client-response-status-code>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-mock-client-response-delay></ev-mock-client-response-delay>
    </div>
</template>

<script>
    import EvMockClientResponseStatusCode from '@/components/mock-client/response/status-bar/EvMockClientResponseStatusCode'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvMockClientResponseDelay from '@/components/mock-client/response/status-bar/EvMockClientResponseDelay'

    export default {
        name: "EvMockClientResponseStatusBar",
        components: {EvMockClientResponseDelay, EvVerticalGutter, EvMockClientResponseStatusCode},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-response-status-bar {
        //width: 100%;

        height: 40px;

        background-color: #FAFAFA;

        padding-left: 36px;

        padding-right: 16px;
    }
</style>

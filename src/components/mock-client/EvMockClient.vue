<template>
    <div class="d-flex mock-client">
        <ev-mock-client-request></ev-mock-client-request>

        <ev-vertical-divider></ev-vertical-divider>

        <ev-mock-client-response></ev-mock-client-response>
    </div>
</template>

<script>
    import EvMockClientRequest from '@/components/mock-client/request/EvMockClientRequest'
    import EvMockClientResponse from '@/components/mock-client/response/EvMockClientResponse'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'

    export default {
        name: "EvMockClient",

        components: {
            EvVerticalDivider,
            EvMockClientResponse,
            EvMockClientRequest
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client {
        height: calc(100vh - 168px);
    }
</style>

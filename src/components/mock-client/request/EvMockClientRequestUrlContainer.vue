<template>
    <div class="d-flex align-center mock-client-request-url-container">
        <ev-mock-client-request-url></ev-mock-client-request-url>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-mock-client-update-mock-button></ev-mock-client-update-mock-button>
    </div>
</template>

<script>
    import EvMockClientRequestUrl from '@/components/mock-client/request/EvMockClientRequestUrl'
    import EvMockClientUpdateMockButton from '@/components/mock-client/request/EvMockClientUpdateMockButton'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvMockClientRequestUrlContainer",

        components: {
            EvVerticalGutter,
            EvMockClientUpdateMockButton,
            EvMockClientRequestUrl
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-request-url-container {
        min-width: 1px;

        min-height: 1px;

        height: 40px;

        background-color: #FAFAFA;

        padding-left: 28px;

        padding-right: 36px;
    }
</style>
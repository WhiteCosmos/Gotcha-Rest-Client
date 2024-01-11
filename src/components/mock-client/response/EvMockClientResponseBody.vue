<template>
    <div class="d-flex flex-column">
        <ev-mock-client-response-body-navigation-bar></ev-mock-client-response-body-navigation-bar>
    </div>
</template>

<script>
    import EvMockClientResponseBodyNavigationBar from '@/components/mock-client/response/response-body/EvMockClientResponseBodyNavigationBar'

    export default {
        name: "EvMockClientResponseBody",

        components: {
            EvMockClientResponseBodyNavigationBar
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

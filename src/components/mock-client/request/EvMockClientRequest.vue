<template>
    <div class="d-flex flex-column mock-client-request">
        <ev-mock-client-request-url-container></ev-mock-client-request-url-container>

        <ev-mock-client-request-navigation-bar @select="doSelect"></ev-mock-client-request-navigation-bar>

        <ev-horizon-divider></ev-horizon-divider>

        <!-- Headers & URL Params -->

        <div class="d-flex mock-client-request__navigation-container">
            <div v-show="isHeaders" style="width: 100%">
                <ev-mock-client-request-headers></ev-mock-client-request-headers>
            </div>

            <div v-show="isUrlParams" style="width: 100%">
                <ev-mock-client-request-url-params></ev-mock-client-request-url-params>
            </div>
        </div>
    </div>
</template>

<script>
    import EvMockClientRequestNavigationBar from '@/components/mock-client/request/EvMockClientRequestNavigationBar'
    import EvMockClientRequestHeaders from '@/components/mock-client/request/EvMockClientRequestHeaders'
    import EvMockClientRequestUrlParams from '@/components/mock-client/request/EvMockClientRequestUrlParams'
    import EvMockClientRequestUrlContainer from '@/components/mock-client/request/EvMockClientRequestUrlContainer'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'

    export default {
        name: "EvMockClientRequest",

        components: {
            EvHorizonDivider,
            EvMockClientRequestUrlContainer,
            EvMockClientRequestUrlParams,
            EvMockClientRequestHeaders,
            EvMockClientRequestNavigationBar,
        },

        data() {
            return {
                navigation: "URL_PARAMS" // HEADERS URL_PARAMS
            }
        },

        computed: {
            isHeaders() {
                return this.navigation === "HEADERS"
            },

            isUrlParams() {
                return this.navigation === "URL_PARAMS"
            }
        },

        methods: {
            doSelect(val) {
                this.navigation = val
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .mock-client-request {
        height: 100%;

        flex: 1;

        &__navigation-container {
            height: calc(100% - 80px);

            overflow-y: scroll;
        }
    }
</style>

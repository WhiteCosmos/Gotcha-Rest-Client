<template>
    <div class="http-client-response-container">
        <div class="http-client__response__title">
            <ev-http-client-url-viewer :http-operation="httpOperation"></ev-http-client-url-viewer>

            <ev-horizon-gutter :gutter="6"></ev-horizon-gutter>

            <ev-http-client-response-container-menu v-if="!hasHttpErrorWithoutResponse"
                                                    v-model="menu"
                                                    :http-operation="httpOperation"></ev-http-client-response-container-menu>
        </div>

        <ev-http-client-response-network-error v-if="hasHttpErrorWithoutResponse"
                                               :http-error="httpOperation.httpError"></ev-http-client-response-network-error>

        <div class="d-flex flex-column" v-else>
            <div class="headers-container" v-show="isResponseInfoMenu" v-if="defer(2)">
                <ev-http-client-response-summary :http-response="httpResponse"
                                                 :visible="isResponseInfoMenu"></ev-http-client-response-summary>
            </div>

            <div class="headers-container" v-show="isResponseHeadersMenu" v-if="defer(3)">
                <ev-http-client-response-headers :http-response="httpResponse"></ev-http-client-response-headers>
            </div>

            <div class="headers-container" v-show="isResponseBodyMenu" v-if="defer(1)">
                <ev-http-client-response-body v-if="hasHttpResponsePayload"
                                              :visible="isResponseBodyMenu"
                                              :http-response="httpResponse"></ev-http-client-response-body>

                <ev-http-client-response-body-placeholder v-else></ev-http-client-response-body-placeholder>
            </div>

            <div class="headers-container" v-show="isResponseTestsMenu" v-if="defer(4)">
                <ev-http-client-response-tests :http-response="httpResponse"></ev-http-client-response-tests>
            </div>
        </div>
    </div>
</template>

<script>
    import EvHttpClientResponseContainerMenu from '@/views/http-client/response/EvHttpClientResponseContainerMenu'
    import EvHttpClientResponseHeaders from '@/views/http-client/response/EvHttpClientResponseHeaders'
    import EvHttpClientResponseBody from '@/views/http-client/response/EvHttpClientResponseBody'
    import EvHttpClientUrlViewer from '@/views/http-client/response/EvHttpClientUrlViewer'
    import EvHttpClientResponseNetworkError from '@/views/http-client/response/EvHttpClientResponseNetworkError'
    import EvHttpClientResponseSummary from '@/views/http-client/response/EvHttpClientResponseSummary'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpClientResponseTests from '@/views/http-client/response/EvHttpClientResponseTests'
    import EvHttpClientResponseBodyPlaceholder from '@/views/http-client/response/EvHttpClientResponseBodyPlaceholder'
    import Defer from '@/mixins/Defer'

    export default {
        name: "EvHttpClientResponseContainer",

        components: {
            EvHttpClientResponseBodyPlaceholder,
            EvHttpClientResponseTests,
            EvHorizonGutter,
            EvHttpClientResponseSummary,
            EvHttpClientResponseNetworkError,
            EvHttpClientUrlViewer,
            EvHttpClientResponseBody,
            EvHttpClientResponseHeaders,
            EvHttpClientResponseContainerMenu
        },

        mixins: [
            Defer(),
        ],

        props: {
            httpOperation: Object,
        },

        data() {
            return {
                menu: {
                    name: "Body",

                    type: "RESPONSE_BODY"
                },
            }
        },

        computed: {
            isResponseInfoMenu() {
                return this.menu.type === "RESPONSE_INFO"
            },

            isResponseHeadersMenu() {
                return this.menu.type === "RESPONSE_HEADERS"
            },

            isResponseBodyMenu() {
                return this.menu.type === "RESPONSE_BODY"
            },

            isResponseTestsMenu() {
                return this.menu.type === "RESPONSE_TESTS"
            },

            hasHttpErrorWithoutResponse() {
                return this.httpOperation && this.httpOperation.httpError && !this.httpOperation.httpResponse
            },

            hasHttpResponsePayload() {
                return this.httpResponse.payload !== undefined
            },

            httpResponse() {
                return this.httpOperation.httpResponse
            },

            httpError() {
                return this.httpOperation.httpError
            }
        },

        watch: {
            isResponseBodyMenu(newVal) {
                if (newVal) {
                    // EvApiHttpClientEventBus.$emit(EvApiHttpClientEvents.SHOW_RESPONSE_BODY, this.httpOperation)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-response-container {
        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: 100%;

        .headers-container {
            height: calc(100vh - 208px);
        }

        .body-container {
            height: calc(100vh - 208px);
        }
    }

    .http-client__response__title {
        width: 100%;

        height: 80px;

        padding: 6px 16px 6px 24px;

        background-color: #FCFCFC;

        border-bottom: 1px solid #EAEAEA;
    }
</style>

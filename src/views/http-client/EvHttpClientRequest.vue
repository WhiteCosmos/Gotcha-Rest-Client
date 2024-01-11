<template>
    <div class="http-client__request">
        <div class="http-client__request-title">
            <ev-http-client-request-url-bar :http-request="httpRequest"
                                            :configuration="configuration"></ev-http-client-request-url-bar>

            <ev-horizon-gutter :gutter="6"></ev-horizon-gutter>

            <ev-http-client-request-menu v-model="menu"
                                         :http-request="httpRequest"
                                         :configuration="configuration"></ev-http-client-request-menu>
        </div>

        <div class="http-client__request-container">
            <div class="http-client__request-unit" v-show="isRequestDocs(menu)" v-if="defer(4)">
                <ev-http-client-request-docs :menu="menu"
                                             :http-request="httpRequest"
                                             :http-request-name="httpRequestName"></ev-http-client-request-docs>
            </div>

            <div class="http-client__request-unit" v-show="isRequestAuth(menu)" v-if="defer(5)">
                <ev-http-client-request-auth :http-request="httpRequest"></ev-http-client-request-auth>
            </div>

            <div class="http-client__request-unit" v-show="isRequestHeaders(menu)" v-if="defer(6)">
                <ev-http-client-request-headers
                    :http-request="httpRequest"
                    :configuration="configuration"></ev-http-client-request-headers>
            </div>

            <div class="http-client__request-unit" v-show="isRequestParameters(menu)" v-if="defer(3)">
                <ev-http-client-request-url-parameters
                    :http-request="httpRequest"></ev-http-client-request-url-parameters>
            </div>

            <div class="http-client__request-unit"
                 v-show="isRequestBody(menu)"
                 v-if="defer(5)">
                <ev-http-client-request-body
                    :visible="isRequestBody(menu)"
                    :http-request="httpRequest"></ev-http-client-request-body>
            </div>

            <div class="http-client__request-unit" v-show="isRequestTests(menu)" v-if="defer(7)">
                <ev-http-client-request-tests
                    :http-request="httpRequest"></ev-http-client-request-tests>
            </div>
        </div>
    </div>
</template>

<script>
    import EvHttpClientRequestMenu from '@/views/http-client/request/EvHttpClientRequestMenu'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpClientRequestBody from '@/views/http-client/request/EvHttpClientRequestBody'
    import EvHttpClientRequestHeaders from '@/views/http-client/request/EvHttpClientRequestHeaders'
    import EvHttpClientRequestUrlParameters from '@/views/http-client/request/EvHttpClientRequestUrlParameters'
    import EvHttpClientRequestUrl from '@/views/http-client/request/EvHttpClientRequestUrl'
    import EvHttpClientMenuMixin from '@/views/http-client/mixins/EvHttpClientMenuMixin'
    import EvHttpClientRequestUrlBar from '@/views/http-client/request/EvHttpClientRequestUrlBar'
    import EvHttpClientRequestAuth from '@/views/http-client/request/EvHttpClientRequestAuth'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import EvLabel from '@/components/typography/EvLabel'
    import EvHttpClientRequestDocs from '@/views/http-client/request/EvHttpClientRequestDocs'
    import EvHttpClientRequestTests from '@/views/http-client/request/request-tests/EvHttpClientRequestTests'
    import EvLazyComponent from '@/components/layout/EvLazyComponent'

    import Defer from '@/mixins/Defer'
    import {EvHttpClientRequestTestsEventBus, EvHttpClientRequestTestsEvents} from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsEventBus'
    import GHCKeyValueAssertionItem from '@/views/http-client/components/key-value-assertion-editor/GHCKeyValueAssertionItem'
    import JsonSchemaNode from '@/components/json-schema-editor/JsonSchemaNode'

    export default {
        name: "EvHttpClientRequest",

        components: {
            EvLazyComponent,
            EvHttpClientRequestTests,
            EvHttpClientRequestDocs,
            EvLabel,
            EvHttpClientRequestAuth,
            EvHttpClientRequestUrlBar,
            EvHttpClientRequestUrl,
            EvHttpClientRequestUrlParameters,
            EvHttpClientRequestHeaders,
            EvHttpClientRequestBody,
            EvHorizonGutter,
            EvHttpClientRequestMenu,
        },

        mixins: [
            EvHttpClientMenuMixin,
            Defer(),
        ],

        created() {
            this.initializeProperties()

            EvHttpClientEventBus.$on(EvHttpClientEvents.ADD_REQUEST_HEADER, this.handleAddRequestHeader)

            EvHttpClientRequestTestsEventBus.$on(EvHttpClientRequestTestsEvents.ADD_RESPONSE_HEADER_ASSERTION, this.handleAddResponseHeaderAssertion)
        },

        beforeDestroy() {
            EvHttpClientEventBus.$off(EvHttpClientEvents.ADD_REQUEST_HEADER, this.handleAddRequestHeader)

            EvHttpClientRequestTestsEventBus.$off(EvHttpClientRequestTestsEvents.ADD_RESPONSE_HEADER_ASSERTION, this.handleAddResponseHeaderAssertion)
        },

        props: {
            httpOperation: Object, // RabiHttpOperation

            configuration: Object,
        },

        provide() {
            return {
                httpRequest: this.httpRequest
            }
        },

        computed: {
            httpRequest() {
                return this.httpOperation.httpRequest
            },

            httpRequestName() {
                return this.httpOperation.name
            },
        },

        data() {
            return {
                menu: {
                    name: "URL Params",

                    type: "REQUEST_PARAMETERS",

                    itemCount: 0,

                    hasContent: false,
                },

                snackbar: false,

                contentType: "",
            }
        },

        methods: {
            initializeProperties() {
                // Since 1.6.0

                if (!this.httpRequest.hasOwnProperty('operationId')) {
                    this.$set(this.httpRequest, 'operationId', '')
                }

                if (!this.httpRequest.hasOwnProperty('deprecated')) {
                    this.$set(this.httpRequest, 'deprecated', false)
                }

                if (!this.httpRequest.hasOwnProperty('extensions')) {
                    this.$set(this.httpRequest, 'extensions', [])
                }

                if (!this.httpRequest.hasOwnProperty('createdAt')) {
                    this.$set(this.httpRequest, 'createdAt', new Date())
                }

                if (!this.httpRequest.hasOwnProperty('externalUrl')) {
                    this.$set(this.httpRequest, 'externalUrl', '')
                }

                let examples = this.httpRequest.examples

                examples.forEach(example => {
                    this.initializeHttpResponseExample(example)
                })

                // Since 1.6.2

                if (!this.httpRequest.hasOwnProperty('serverId')) {
                    this.$set(this.httpRequest, 'serverId', undefined)
                }
            },

            initializeHttpResponseExample(example) {
                if (!example.hasOwnProperty('dType')) {
                    this.$set(example, 'dType', 'none')
                }

                if (!example.hasOwnProperty('dContentType')) {
                    this.$set(example, 'dContentType', 'application/json')
                }

                if (!example.hasOwnProperty('dExample')) {
                    this.$set(example, 'dExample', '')
                }

                if (!example.hasOwnProperty('dContentTypes')) {
                    this.$set(example, 'dContentTypes', ['application/json'])
                }

                if (!example.hasOwnProperty('dSchema')) {
                    this.$set(example, 'dSchema', JsonSchemaNode.newRootNode('object'))
                }

                if (!example.hasOwnProperty('dExamples')) {
                    this.$set(example, 'dExamples', {})
                }
            },

            handleAddRequestHeader(httpRequest, key, value) {
                if (!this.isCurrentRequest(httpRequest)) {
                    return
                }

                this.contentType = value

                this.snackbar = true
            },

            handleRemoveRequestHeader(httpRequest, key) {
                if (!this.isCurrentRequest(httpRequest)) {
                    return
                }

                this.contentType = ""
            },

            handleAddResponseHeaderAssertion(httpResponse, item) {
                if (this.isCurrentHttpOperation({httpResponse: httpResponse})) {
                    let assertionItem = new GHCKeyValueAssertionItem()

                    assertionItem.key = item.key

                    assertionItem.value = item.value

                    this.httpRequest.assertion.headers.push(assertionItem)
                }
            },

            isCurrentRequest(httpRequest) {
                return httpRequest && this.httpRequest.uid === httpRequest.uid
            },

            isCurrentHttpOperation(httpOperation) {
                if (httpOperation.httpResponse) {
                    // httpResponse no uid
                    return this.httpOperation.httpResponse === httpOperation.httpResponse
                }

                if (httpOperation.httpRequest) {
                    return this.httpOperation.httpRequest.uid === httpOperation.httpRequest.uid
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client__request {
        position: relative;

        display: flex;

        flex-direction: column;

        flex: 1;

        height: 100%;

        min-height: 1px;

        min-width: 496px;

        flex-shrink: 0;

        box-sizing: border-box;

        background-color: white;
    }

    .http-client__request-title {
        display: flex;

        flex-direction: column;

        align-items: center;

        height: 80px;

        padding: 6px 24px 0px 16px;

        background-color: #FCFCFC;

        border-bottom: 1px solid #EAEAEA;
    }

    .http-client__request-container {
        display: flex;

        flex-direction: column;

        height: calc(100% - 80px);
    }

    .http-client__request-unit {
        height: 100%;
    }

    .snackbar-container {
        display: flex;

        align-items: center;

        height: 24px;

        width: 100%;

        padding-left: 8px;

        padding-right: 8px;

        background-color: $YELLOW_COLOR;

        border-radius: 3px;

        &__label {
            font-size: 10px;

            font-weight: 500;

            color: #000;

            user-select: none;
        }
    }
</style>

<template>
    <div class="ev-http-client-request-body">
        <ev-http-client-request-body-menu v-model="payloadType"></ev-http-client-request-body-menu>

        <ev-http-client-none-request-body v-if="isNoneRequestBody"></ev-http-client-none-request-body>

        <ev-http-client-text-request-body :http-request="httpRequest"
                                          :visible="isTextRequestBody && visible"
                                          v-show="isTextRequestBody"
                                          v-if="defer(8)"></ev-http-client-text-request-body>

        <ev-http-client-json-request-body :http-request="httpRequest"
                                          v-show="isJsonRequestBody"
                                          v-if="defer(9)"></ev-http-client-json-request-body>

        <ev-http-client-form-request-body :http-request="httpRequest"
                                          v-show="isFormRequestBody"
                                          v-if="defer(10)"></ev-http-client-form-request-body>

        <ev-http-client-multipart-request-body :http-request="httpRequest"
                                               v-show="isMultipartRequestBody"
                                               v-if="defer(11)"></ev-http-client-multipart-request-body>

        <ev-http-client-file-request-body :http-request="httpRequest"
                                          v-show="isFileRequestBody"
                                          v-if="defer(12)"></ev-http-client-file-request-body>

        <ev-http-client-graphql-request-body :http-request="httpRequest"
                                             :visible="isGraphQLRequestBody && visible"
                                             v-show="isGraphQLRequestBody"
                                             v-if="defer(13)"></ev-http-client-graphql-request-body>
    </div>
</template>

<script>
    import EvHttpClientRequestBodyMenu from '@/views/http-client/request/EvHttpClientRequestBodyMenu'
    import GHCHttpRequestPayloadType from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
    import EvHttpClientNoneRequestBody from '@/views/http-client/request/request-body/EvHttpClientNoneRequestBody'
    import EvHttpClientTextRequestBody from '@/views/http-client/request/request-body/EvHttpClientTextRequestBody'
    import EvHttpClientJsonRequestBody from '@/views/http-client/request/request-body/EvHttpClientJsonRequestBody'
    import EvHttpClientFormRequestBody from '@/views/http-client/request/request-body/EvHttpClientFormRequestBody'
    import EvHttpClientMultipartRequestBody from '@/views/http-client/request/request-body/EvHttpClientMultipartRequestBody'
    import EvHttpClientFileRequestBody from '@/views/http-client/request/request-body/EvHttpClientFileRequestBody'
    import EvHttpClientGraphqlRequestBody from '@/views/http-client/request/request-body/graphql/EvHttpClientGraphqlRequestBody'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import Defer from '@/mixins/Defer'
    import {EvCodemirrorWrapperEventBus, EvCodemirrorWrapperEvents} from '@/components/input/EvCodemirrorWrapperEventBus'
    import JsonSchemaNode from '@/components/json-schema-editor/JsonSchemaNode'

    export default {
        name: "EvHttpClientRequestBody",

        components: {
            EvHttpClientGraphqlRequestBody,
            EvHttpClientFileRequestBody,
            EvHttpClientMultipartRequestBody,
            EvHttpClientFormRequestBody,
            EvHttpClientJsonRequestBody,
            EvHttpClientTextRequestBody,
            EvHttpClientNoneRequestBody,
            EvHttpClientRequestBodyMenu,
        },

        mixins: [
            Defer(20)
        ],

        created() {
            this.initialize()
        },

        props: {
            httpRequest: Object,

            visible: false,
        },

        data() {
            return {
                payloadType: 'none',
            }
        },

        watch: {
            'httpRequest.payload.type'(newVal) {
                this.payloadType = newVal
            },

            payloadType(newVal) {
                this.httpRequest.payload.type = newVal

                this.emitChangeContentType(newVal)
            }
        },

        computed: {
            isNoneRequestBody() {
                return this.payloadType === GHCHttpRequestPayloadType.NONE
            },

            isTextRequestBody() {
                return this.payloadType === GHCHttpRequestPayloadType.TEXT
            },

            isJsonRequestBody() {
                return this.payloadType === GHCHttpRequestPayloadType.JSON
            },

            isFormRequestBody() {
                return this.payloadType === GHCHttpRequestPayloadType.FORM
            },

            isMultipartRequestBody() {
                return this.payloadType === GHCHttpRequestPayloadType.MULTIPART
            },

            isFileRequestBody() {
                return this.payloadType === GHCHttpRequestPayloadType.FILE
            },

            isGraphQLRequestBody() {
                return this.payloadType === GHCHttpRequestPayloadType.GRAPHQL
            },
        },

        methods: {
            initialize() {
                let payload = this.httpRequest.payload

                this.payloadType = payload.type

                this.initializeProperties(payload)
            },

            initializeProperties(payload) {
                // Since 1.6.0

                if (!payload.hasOwnProperty('dType')) {
                    this.$set(payload, 'dType', 'none')
                }

                if (!payload.hasOwnProperty('dContentType')) {
                    this.$set(payload, 'dContentType', 'application/json')
                }

                if (!payload.hasOwnProperty('dExample')) {
                    this.$set(payload, 'dExample', '')
                }

                if (!payload.hasOwnProperty('dContentTypes')) {
                    this.$set(payload, 'dContentTypes', ['application/json'])
                }

                if (!payload.hasOwnProperty('dSchema')) {
                    this.$set(payload, 'dSchema', JsonSchemaNode.newRootNode('object'))
                }
            },

            emitChangeContentType() {
                if (this.isNoneRequestBody) {
                    EvHttpClientEventBus.$emit(EvHttpClientEvents.REMOVE_REQUEST_HEADER, this.httpRequest, 'Content-Type')
                }

                if (this.isTextRequestBody) {
                    let contentType = this.getContentTypeFromTextPayload(this.httpRequest)

                    EvHttpClientEventBus.$emit(EvHttpClientEvents.ADD_REQUEST_HEADER, this.httpRequest, 'Content-Type', contentType)
                }

                if (this.isJsonRequestBody) {
                    EvHttpClientEventBus.$emit(EvHttpClientEvents.ADD_REQUEST_HEADER, this.httpRequest, 'Content-Type', 'application/json')
                }

                if (this.isFormRequestBody) {
                    EvHttpClientEventBus.$emit(EvHttpClientEvents.ADD_REQUEST_HEADER, this.httpRequest, 'Content-Type', 'application/x-www-form-urlencoded')
                }

                if (this.isMultipartRequestBody) {
                    EvHttpClientEventBus.$emit(EvHttpClientEvents.REMOVE_REQUEST_HEADER, this.httpRequest, 'Content-Type')
                }

                if (this.isFileRequestBody) {
                    EvHttpClientEventBus.$emit(EvHttpClientEvents.ADD_REQUEST_HEADER, this.httpRequest, 'Content-Type', 'application/octet-stream')
                }

                if (this.isGraphQLRequestBody) {
                    EvHttpClientEventBus.$emit(EvHttpClientEvents.ADD_REQUEST_HEADER, this.httpRequest, 'Content-Type', 'application/json')
                }
            },

            getContentTypeFromTextPayload(httpRequest) {
                let text = httpRequest.payload.text

                let mode = text.mode

                let contentType = ''

                if (mode === 'text') {
                    contentType = 'text/plain'
                }

                if (mode === 'json') {
                    contentType = 'application/json'
                }

                if (mode === 'yaml') {
                    contentType = 'application/yaml'
                }

                if (mode === 'html') {
                    contentType = 'text/html'
                }

                if (mode === 'xml') {
                    contentType = 'application/xml'
                }

                return contentType
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-body {
        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        height: 100%;
    }

    .snackbar-style {
        background-color: #FAFAFA;

        height: 24px;
    }

    .snackbar-message {
        font-size: 12px;

        font-weight: bold;

        color: $PRIMARY-COLOR;

        user-select: none;
    }
</style>

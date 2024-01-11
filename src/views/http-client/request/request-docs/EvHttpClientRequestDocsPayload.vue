<template>
    <div class="ev-http-client-request-payload-docs">
        <ev-http-client-docs-payload-title :payload="payload" @merge-json-schema="handleMergeJsonSchema"></ev-http-client-docs-payload-title>

        <div class="ev-content-type-wrapper" v-if="isTextRequestPayload">
            <ev-label size="11" bold secondary>Content-Type:</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="d-flex">
                <ev-basic-input v-model="payload.dContentType"></ev-basic-input>
            </div>

            <v-spacer></v-spacer>
        </div>

        <ev-multiple-content-types v-if="isJsonSchemaPayload" :content-types="payload.dContentTypes"></ev-multiple-content-types>

        <div class="ev-content-wrapper--none" v-if="isNoneRequestPayload">
            <ev-label size="11" bold grey>{{ $t('noRequestBody') }}</ev-label>
        </div>

        <div class="ev-content-wrapper" v-if="isTextRequestPayload">
            <ev-codemirror-wrapper v-model="payload.dExample"></ev-codemirror-wrapper>
        </div>

        <div class="ev-content-wrapper" v-if="isJsonSchemaPayload">
            <ev-json-schema-editor ref="ev-json-schema-editor" :root="payload.dSchema" page-mode></ev-json-schema-editor>
        </div>

        <div class="ev-content-wrapper" v-if="isFormRequestPayload">
            <ev-request-parameter-description-editor :items="formRequestPayload"
                                                     :options="formOptions"
                                                     v-if="isFormRequestPayload"></ev-request-parameter-description-editor>
        </div>

        <div class="ev-content-wrapper" v-if="isMultipartRequestPayload">
            <ev-request-parameter-description-editor :items="multipartRequestPayload"
                                                     :options="multipartOptions"
                                                     v-if="isMultipartRequestPayload"></ev-request-parameter-description-editor>
        </div>
    </div>
</template>

<script>
    import GHCHttpRequestPayloadType from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
    import GHCJsonNodeBuilder from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvHttpClientRequestDocsTextPayload from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsTextPayload'
    import EvRequestParameterDescriptionEditor from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditor'
    import EvHttpClientDocsPayloadTitle from '@/views/http-client/request/request-docs/EvHttpClientDocsRequestPayloadTitle'
    import EvHttpClientEmptyPlaceholder from '@/views/http-client/components/EvHttpClientEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpClientHighlightjsView from '@/views/http-client/components/EvHttpClientHighlightjsView'
    import EvLabel from '@/components/typography/EvLabel'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvJsonSchemaEditor from '@/components/json-schema-editor/EvJsonSchemaEditor'
    import EvMultipleContentTypes from '@/views/http-client/request/request-docs/components/multiple-content-type/EvMultipleContentTypes'
    import JsonSchemaNode from '@/components/json-schema-editor/JsonSchemaNode'

    export default {
        name: "EvHttpClientRequestDocsPayload",

        components: {
            EvMultipleContentTypes,
            EvJsonSchemaEditor,
            EvBasicInput,
            EvCodemirrorWrapper,
            EvLabel,
            EvHttpClientHighlightjsView,
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpClientEmptyPlaceholder,
            EvHttpClientDocsPayloadTitle,
            EvRequestParameterDescriptionEditor,
            EvHttpClientRequestDocsTextPayload
        },

        mixins: [
            EvStoreMixin
        ],

        props: {
            httpRequest: Object
        },

        created() {
            this.initializeProperties()

            if (this.isJsonRequestPayload) {
                this.buildJsonContent().then(content => {
                    this.jsonContent = content
                })
            }
        },

        data() {
            return {
                options: {
                    noTitle: true
                },

                formOptions: {
                    noTitle: true,
                    keyPlaceholder: "Form Key",
                    valuePlaceholder: "Form Description"
                },

                multipartOptions: {
                    noTitle: true,
                    keyPlaceholder: "Multipart Key",
                    valuePlaceholder: "Multipart Description"
                },

                jsonContent: ''
            }
        },

        methods: {
            initializeProperties() {
                let payload = this.payload

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

            async buildJsonContent() {
                let builder = new GHCJsonNodeBuilder(this.dynamicVariableRender)

                let json = this.payload.json

                let content = builder.buildJsonFromJsonNode(json.root)

                return JSON.stringify(content, null, 2)
            },

            handleMergeJsonSchema() {
                this.$refs['ev-json-schema-editor'].initializeFlattenTree()
            },
        },

        watch: {
            'payload.dType'(newVal) {
                if (newVal === 'text') {
                    this.payload.dContentType = 'application/json'
                }

                if (newVal === 'form') {
                    this.payload.dContentType = 'application/x-www-form-urlencoded'
                }

                if (newVal === 'multipart') {
                    this.payload.dContentType = 'multipart/form-data'
                }
            },
        },

        computed: {
            payload() {
                return this.httpRequest.payload
            },

            contentType() {
                if (this.isTextRequestPayload) {
                    return 'application/json'
                }

                if (this.isJsonRequestPayload) {
                    return 'application/json'
                }

                if (this.isFormRequestPayload) {
                    return 'application/x-www-form-urlencoded'
                }

                if (this.isMultipartRequestPayload) {
                    return 'application/multipart'
                }

                return ''
            },

            isNoneRequestPayload() {
                return this.payload && this.payload.dType === GHCHttpRequestPayloadType.NONE
            },

            isTextRequestPayload() {
                return this.payload && this.payload.dType === GHCHttpRequestPayloadType.TEXT
            },

            isJsonSchemaPayload() {
                return this.payload && this.payload.dType === GHCHttpRequestPayloadType.SCHEMA
            },

            textRequestPayload() {
                return this.payload.text.content
            },

            isJsonRequestPayload() {
                return this.payload && this.payload.dType === GHCHttpRequestPayloadType.JSON
            },

            jsonRequestPayload() {
                let builder = new GHCJsonNodeBuilder(this.dynamicVariableRender)

                let json = this.payload.json

                let content = builder.buildJsonFromJsonNode(json.root)

                return JSON.stringify(content, null, 2)
            },

            isFormRequestPayload() {
                return this.payload && this.payload.dType === GHCHttpRequestPayloadType.FORM
            },

            formRequestPayload() {
                let form = this.payload.form

                return form.items
            },

            isMultipartRequestPayload() {
                return this.payload && this.payload.dType === GHCHttpRequestPayloadType.MULTIPART
            },

            multipartRequestPayload() {
                let multipart = this.payload.multipart

                return multipart.items
            },

            isGraphQLRequestPayload() {
                return this.payload && this.payload.type === GHCHttpRequestPayloadType.GRAPHQL
            },

            graphQLRequestPayload() {

            },
        },

        i18n: {
            messages: {
                en: {
                    payload_1: "Click ",
                    payload_2: "Body",
                    payload_3: " tab and append a request body",
                    noRequestBody: "No Request Payload"
                },
                zh: {
                    payload_1: "点击 ",
                    payload_2: "请求数据",
                    payload_3: " 页面并且添加请求数据",
                    noRequestBody: "没有请求数据"
                },
                zh_TW: {
                    payload_1: "點擊",
                    payload_2: "請求數據",
                    payload_3: "頁面，並添加請求數據",
                    noRequestBody: "沒有請求數據"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-payload-docs {
        display: flex;

        flex-direction: column;

        border: 1px solid #F1F1F1;

        border-radius: 5px;
    }

    .ev-content-type-wrapper {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 16px;

        padding-right: 16px;

        border-bottom: 1px solid #F1F1F1;
    }

    .ev-content-wrapper {
        display: flex;

        width: 100%;

        //overflow: hidden;

        //border-radius: 5px;

        &--none {
            display: flex;

            border-radius: 5px;

            min-height: 96px;

            align-items: center;

            justify-content: center;

            background-color: #FCFCFC;
        }

        //min-height: 96px;
    }
</style>

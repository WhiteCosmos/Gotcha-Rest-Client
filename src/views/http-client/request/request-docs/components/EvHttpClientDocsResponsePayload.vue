<template>
    <div class="ev-http-client-docs-response-payload">
        <div class="ev-http-client-docs-response-payload__header">
            <ev-label size="11" secondary bold>{{ $t('responseBody') }}</ev-label>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio name='None' value="none" v-model="example.dType"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio name='Text' value="text" v-model="example.dType"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio name='Schema' value="schema" v-model="example.dType"></ev-radio>

            <v-spacer></v-spacer>

            <ev-http-client-json-request-body-importer @import-json="handleImportFromJson"
                                                       :disabled="!isSchemaResponseType"></ev-http-client-json-request-body-importer>
        </div>

        <div class="ev-content-type-wrapper" v-if="isTextResponseType">
            <ev-label size="11" bold secondary>Content-Type:</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="d-flex">
                <ev-basic-input v-model="example.dContentType" placeholder="application/json"></ev-basic-input>
            </div>

            <v-spacer></v-spacer>
        </div>

        <ev-multiple-content-types v-if="isSchemaResponseType" :content-types="example.dContentTypes"></ev-multiple-content-types>

        <div class="ev-http-client-docs-response-payload__codemirror ev-content-wrapper--none" v-if="isNoneResponseType">
            <ev-label size="11" bold grey>{{ $t('noResponseBody') }}</ev-label>
        </div>

        <div class="ev-http-client-docs-response-payload__codemirror" v-if="isTextResponseType">
            <ev-codemirror-wrapper v-model="example.dExample"></ev-codemirror-wrapper>
        </div>

        <div class="ev-http-client-docs-response-payload__codemirror" v-if="isSchemaResponseType">
            <ev-json-schema-editor page-mode :root="example.dSchema"></ev-json-schema-editor>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvJsonSchemaEditor from '@/components/json-schema-editor/EvJsonSchemaEditor'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvRadio from '@/components/form/EvRadio'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvMultipleContentTypes from '@/views/http-client/request/request-docs/components/multiple-content-type/EvMultipleContentTypes'
    import EvHttpClientJsonRequestBodyImporter from '@/views/http-client/request/request-body/EvHttpClientJsonRequestBodyImporter.vue'
    import JsonSchemaHelper from '@/components/json-schema-editor/JsonSchemaHelper'

    export default {
        name: "EvHttpClientDocsResponsePayload",

        components: {
            EvHttpClientJsonRequestBodyImporter,
            EvMultipleContentTypes,
            EvBasicInput,
            EvVerticalGutter,
            EvRadio,
            EvCodemirrorWrapper,
            EvJsonSchemaEditor,
            EvLabel
        },

        props: {
            example: Object,
        },

        computed: {
            isNoneResponseType() {
                return this.example.dType === 'none'
            },

            isTextResponseType() {
                return this.example.dType === 'text'
            },

            isSchemaResponseType() {
                return this.example.dType === 'schema'
            },
        },

        methods: {
            handleImportFromJson(json, mergeOption) {
                let helper = new JsonSchemaHelper()

                if (mergeOption) {
                    let dSchema = helper.parse(json)

                    helper.merge(this.example.dSchema, dSchema)
                } else {
                    this.example.dSchema = helper.parse(json)
                }
            }
        },

        i18n: {
            messages: {
                en: {
                    responseBody: "Response Body",

                    noResponseBody: "No Response Body",

                },
                zh: {
                    responseBody: "返回数据",

                    noResponseBody: "没有返回数据",
                },
                zh_TW: {
                    responseBody: "返回資料",

                    noResponseBody: "沒有返回資料",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-docs-response-payload {
        display: flex;

        flex-direction: column;

        border-top: 1px solid #F1F1F1;

        &__header {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 16px;

            padding-right: 4px;

            border-bottom: 1px solid #EAEAEA;
        }

        &__codemirror {
            display: flex;

            width: 100%;

            min-height: 84px;

            min-width: 1px;
        }
    }

    .ev-content-wrapper {
        display: flex;

        width: 100%;

        overflow: hidden;

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

    .ev-content-type-wrapper {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 16px;

        padding-right: 16px;

        border-bottom: 1px solid #F1F1F1;
    }
</style>

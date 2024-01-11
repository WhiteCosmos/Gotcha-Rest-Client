<template>
    <div class="ev-http-client-docs-payload-title">
        <ev-label size="11" secondary bold> {{ $t('payload') }}</ev-label>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name='None' value="none" v-model="payload.dType"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name='Text' value="text" v-model="payload.dType"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name='Schema' value="schema" v-model="payload.dType"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name='Form' value="form" v-model="payload.dType"></ev-radio>

        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-radio name='Multipart' value="multipart" v-model="payload.dType"></ev-radio>

        <v-spacer></v-spacer>

        <ev-http-client-json-request-body-importer
            :disabled="payload.dType !== 'schema'"
            @import-json="handleImportJson"></ev-http-client-json-request-body-importer>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvRadio from '@/components/form/EvRadio'
    import EvHttpClientJsonRequestBodyImporter from '@/views/http-client/request/request-body/EvHttpClientJsonRequestBodyImporter.vue'
    import JsonSchemaHelper from '@/components/json-schema-editor/JsonSchemaHelper'

    export default {
        name: "EvHttpClientDocsPayloadTitle",

        components: {
            EvHttpClientJsonRequestBodyImporter,
            EvRadio,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            payload: Object
        },

        methods: {
            handleImportJson(json, mergeOption) {
                let helper = new JsonSchemaHelper()

                if (mergeOption) {
                    let dSchema = helper.parse(json)

                    helper.merge(this.payload.dSchema, dSchema)

                    this.$emit('merge-json-schema')
                } else {
                    this.payload.dSchema = helper.parse(json)
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    payload: "Payload"
                },
                zh: {
                    payload: "请求数据"
                },
                zh_TW: {
                    payload: "請求數據"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-docs-payload-title {
        display: flex;

        align-items: center;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;

        background-color: #FAFAFA;

        border-radius: 5px 5px 0 0;

        padding-left: 16px;

        padding-right: 8px;

        &__icon-container {
            @include full-center;

            height: 28px;

            width: 32px;
        }
    }
</style>

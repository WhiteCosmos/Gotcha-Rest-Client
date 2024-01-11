<template>
    <div class="ev-http-client-graphql-request-body-title">
        <ev-label size="12" bold :blue="isQueryType" :grey="!isQueryType" @click.native="emitSelectType('query')">
            {{ $t('query') }}
        </ev-label>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <v-divider inset vertical></v-divider>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-label size="12" bold :blue="isVariablesType" :grey="!isVariablesType" @click.native="emitSelectType('variables')">
            {{ $t('variables') }}
        </ev-label>

        <v-spacer></v-spacer>

        <!--        <ev-label size="10" grey>No Schema</ev-label>-->

        <!--        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--        <ev-import-json-icon></ev-import-json-icon>-->
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvImportJsonIcon from '@/components/json-editor-vsl/icons/ev-import-json-icon'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider.vue'

    export default {
        name: "EvHttpClientGraphqlRequestBodyTitle",

        props: {
            type: String,

            graphql: Object,
        },

        components: {
            EvVerticalDivider,
            EvImportJsonIcon,
            EvVerticalGutter,
            EvLabel
        },

        computed: {
            isQueryType() {
                return this.type === 'query'
            },

            isVariablesType() {
                return this.type === 'variables'
            },
        },

        methods: {
            emitSelectType(type) {
                this.$emit('select-type', type)
            }
        },

        i18n: {
            messages: {
                en: {
                    query: "Query",

                    variables: "Variables"
                },
                zh: {
                    query: "查询语句",

                    variables: "查询变量"
                },
                zh_TW: {
                    query: "查詢語句",

                    variables: "查詢變數"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-graphql-request-body-title {
        display: flex;

        align-items: center;

        width: 100%;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        padding-left: 24px;

        padding-right: 16px;
    }
</style>

<template>
    <div class="ev-http-client-graphql-request-body">
        <ev-http-client-graphql-request-body-title :graphql="graphql" :type="type" @select-type="handleSelectType"></ev-http-client-graphql-request-body-title>

        <div class="ev-http-client-graphql-request-body__codemirror" v-if="type === 'query'">
            <ev-codemirror-wrapper ref="ev-codemirror-wrapper"
                                   v-model="graphql.query"
                                   mode="graphql"></ev-codemirror-wrapper>
        </div>

        <div class="ev-http-client-graphql-request-body__json-editor" v-if="type === 'variables'">
            <ev-json-editor-vsl :root="graphql.variables"></ev-json-editor-vsl>
        </div>
    </div>
</template>

<script>
    import EvHttpClientGraphqlRequestBodyTitle from '@/views/http-client/request/request-body/graphql/EvHttpClientGraphqlRequestBodyTitle'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvJsonEditorVsl from '@/components/json-editor-vsl/EvJsonEditor'
    import RabiHttpRequestGraphqlPayload from '@/data/gotcha/http-operation/payload/RabiHttpRequestGraphqlPayload'

    export default {
        name: "EvHttpClientGraphqlRequestBody",

        components: {
            EvJsonEditorVsl,
            EvCodemirrorWrapper,
            EvHttpClientGraphqlRequestBodyTitle
        },

        watch: {
            visible(newVal) {
                newVal && this.$refs['ev-codemirror-wrapper'].refresh()
            },
        },

        props: {
            httpRequest: Object,

            visible: Boolean,
        },

        computed: {
            graphql() {
                return this.httpRequest.payload.graphql
            }
        },

        data() {
            return {
                type: "query" // query | variables
            }
        },

        methods: {
            handleSelectType(type) {
                this.type = type
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-graphql-request-body {
        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: calc(100vh - 244px);

        &__codemirror {
            display: flex;

            flex-direction: column;

            height: calc(100% - 28px);

            overflow-y: hidden;
        }

        &__json-editor {
            display: flex;

            flex-direction: column;

            height: calc(100% - 28px);

            //overflow-y: scroll;
        }
    }
</style>

<template>
    <div class="ev-http-client-response-docs-content">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-http-client-response-docs-status-code :example="example" :index="index" @remove="doRemove"></ev-http-client-response-docs-status-code>

        <ev-http-client-empty-placeholder v-if="noResponseBody">No Response</ev-http-client-empty-placeholder>

        <ev-http-client-highlightjs-view v-else :text="example.content"></ev-http-client-highlightjs-view>
    </div>
</template>

<script>
    import EvHttpClientResponseDocsStatusCode from '@/views/http-client/request/request-docs/response-docs/EvHttpClientResponseDocsStatusCode'
    import EvHttpClientResponsePlaceholder from '@/views/http-client/EvHttpClientResponsePlaceholder'
    import EvHttpClientResponseDocsPlaceholder from '@/views/http-client/request/request-docs/response-docs/EvHttpClientResponseDocsPlaceholder'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpClientResponseDocsBody from '@/views/http-client/request/request-docs/response-docs/EvHttpClientResponseDocsBody'

    import _ from 'lodash'
    import EvHttpClientHighlightjsView from '@/views/http-client/components/EvHttpClientHighlightjsView'
    import EvHttpClientEmptyPlaceholder from '@/views/http-client/components/EvHttpClientEmptyPlaceholder'

    export default {
        name: "EvHttpClientResponseDocsContent",

        components: {
            EvHttpClientEmptyPlaceholder,
            EvHttpClientHighlightjsView,
            EvHttpClientResponseDocsBody,
            EvHorizonGutter,
            EvHttpClientResponseDocsPlaceholder,
            EvHttpClientResponsePlaceholder,
            EvHttpClientResponseDocsStatusCode
        },

        props: {
            index: Number,

            example: Object
        },

        computed: {
            noResponseBody() {
                return _.isEmpty(this.example.content)
            },
        },

        methods: {
            doRemove() {
                this.$emit('remove', this.example)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-docs-content {
        display: flex;

        flex-direction: column;
    }
</style>

<template>
    <div class="ev-http-client-request-docs-body">
        <ev-http-client-request-docs-body-subtitle content-type="application/json"></ev-http-client-request-docs-body-subtitle>

        <ev-http-client-response-docs-body :text="body"></ev-http-client-response-docs-body>
    </div>
</template>

<script>
    import EvHttpClientRequestDocsSubtitle from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsSubtitle'
    import EvHttpClientRequestDocsBodySubtitle from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsBodySubtitle'
    import EvHttpClientResponseDocsBody from '@/views/http-client/request/request-docs/response-docs/EvHttpClientResponseDocsBody'

    export default {
        name: "EvHttpClientRequestDocsBody",

        components: {
            EvHttpClientResponseDocsBody,
            EvHttpClientRequestDocsBodySubtitle,
            EvHttpClientRequestDocsSubtitle
        },

        props: {
            body: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-docs-body {
        display: flex;

        flex-direction: column;
    }
</style>

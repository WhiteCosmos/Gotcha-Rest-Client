<template>
    <div class="ev-http-client-docs-response-headers">
        <ev-request-parameter-description-editor
            v-model="example.headers"
            :options="headersOption" page-mode></ev-request-parameter-description-editor>
    </div>
</template>

<script>
    import EvRequestParameterDescriptionEditor from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditor'

    export default {
        name: "EvHttpClientDocsResponseHeaders",

        components: {
            EvRequestParameterDescriptionEditor
        },

        props: {
            example: Object
        },

        computed: {
            headersOption() {
                return {
                    title: this.$t('responseHeaders'),
                    keyPlaceholder: "Header Name",
                    valuePlaceholder: "Header Description",
                    pageMode: true
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    responseHeaders: "Response Headers"
                },
                zh: {
                    responseHeaders: "响应头部"
                },
                zh_TW: {
                    responseHeaders: "響應標頭"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-docs-response-headers {
        display: flex;

        flex-direction: column;

        border-bottom: 1px solid #EAEAEA;
    }
</style>

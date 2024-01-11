<template>
    <div class="ev-http-client-response-tests">
<!--        <ev-http-client-request-tests-general :assertion="httpResponse.assertion"></ev-http-client-request-tests-general>-->

        <!--        <ev-http-client-divider></ev-http-client-divider>-->

        <ev-key-value-assertion-viewer :options="headersAssertionOptions" :items="headerItems"></ev-key-value-assertion-viewer>

        <ev-http-client-divider></ev-http-client-divider>

        <ev-key-value-assertion-viewer :options="jsonPathAssertionOptions" :items="jsonPathItems"></ev-key-value-assertion-viewer>
    </div>
</template>

<script>
    import EvHttpClientRequestTestsGeneral from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsGeneral'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvKeyValueAssertionViewer from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionViewer'

    export default {
        name: "EvHttpClientResponseTests",

        components: {
            EvKeyValueAssertionViewer,
            EvHttpClientDivider,
            EvHttpClientRequestTestsGeneral
        },

        props: {
            httpResponse: Object,
        },

        computed: {
            headerItems() {
                let assertion = this.httpResponse.assertion

                return assertion ? assertion.headers : []
            },

            jsonPathItems() {
                let assertion = this.httpResponse.assertion

                return assertion ? assertion.jsonPaths : []
            },
        },

        data() {
            return {
                headersAssertionOptions: {
                    title: this.$t('responseHeaders'),

                    headers: [
                        this.$t('headerName'),
                        this.$t('expectedValue'),
                    ],

                    keyPlaceholder: "Header Name",

                    valuePlaceholder: "Header Value",
                },

                jsonPathAssertionOptions: {
                    title: this.$t('responseBody'),

                    headers: [
                        this.$t('jsonPath'),
                        this.$t('expectedValue'),
                    ],

                    keyPlaceholder: "$.store.books[0].name",

                    valuePlaceholder: "Json Value",

                    mode: "JSON_PATH"
                },
            }
        },

        i18n: {
            messages: {
                en: {
                    responseHeaders: "Response Headers",

                    responseBody: "Response Body",

                    headerName: "Header Name",

                    headerValue: "Header Value",

                    jsonPath: "Json Path",

                    expectedValue: "Returned vs. Expected"

                },
                zh: {
                    responseHeaders: "响应头部",

                    responseBody: "返回数据",

                    headerName: "参数名",

                    headerValue: "参数值",

                    jsonPath: "JSON 路径",

                    expectedValue: "期望值 vs. 返回值"
                },
                zh_TW: {
                    responseHeaders: "響應標頭",

                    responseBody: "返回資料",

                    headerName: "參數名稱",

                    headerValue: "參數值",

                    jsonPath: "JSON 路徑",

                    expectedValue: "期望值 vs. 返回值"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-response-tests {
        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: 100%;

        overflow-y: scroll;
    }
</style>

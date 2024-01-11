<template>
    <div class="ev-http-client-request-tests">
        <ev-key-value-assertion-editor :options="headersAssertionOptions" v-model="assertion.headers"></ev-key-value-assertion-editor>

        <ev-http-client-divider></ev-http-client-divider>

        <ev-key-value-assertion-editor :options="jsonPathAssertionOptions" v-model="assertion.jsonPaths"></ev-key-value-assertion-editor>
    </div>
</template>

<script>
    import EvHttpClientRequestTestsMenu from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsMenu'
    import EvHttpClientLabelDivider from '@/views/http-client/components/EvHttpClientLabelDivider'
    import EvRequestParameterEditor from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditor'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvKeyValueAssertionEditor from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionEditor'
    import EvHttpClientRequestTestsGeneral from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsGeneral'
    import RabiHttpRequestAssertion from '@/data/gotcha/http-operation/RabiHttpRequestAssertion'
    import EvHttpClientRequestTestsSubtitle from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsSubtitle'
    import {EvHttpClientRequestTestsEventBus, EvHttpClientRequestTestsEvents} from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsEventBus'
    import GHCKeyValueAssertionItem from '@/views/http-client/components/key-value-assertion-editor/GHCKeyValueAssertionItem'

    export default {
        name: "EvHttpClientRequestTests",

        components: {
            EvHttpClientRequestTestsSubtitle,
            EvHttpClientRequestTestsGeneral,
            EvKeyValueAssertionEditor,
            EvHttpClientDivider,
            EvRequestParameterEditor,
            EvHttpClientLabelDivider,
            EvHttpClientRequestTestsMenu
        },

        created() {

        },

        props: {
            httpRequest: Object
        },

        computed: {
            assertion() {
                let assertion = this.httpRequest.assertion

                if (!assertion) {
                    assertion = new RabiHttpRequestAssertion()
                    this.httpRequest.assertion = assertion
                }

                return assertion
            },
        },

        data() {
            return {
                generalOptions: {
                    title: "General",

                    valuePlaceholder: "/path",

                    // indexMode: true,
                },

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

        methods: {},

        i18n: {
            messages: {
                en: {
                    responseHeaders: "Response Headers",

                    responseBody: "Response Body",

                    headerName: "Header Name",

                    headerValue: "Header Value",

                    jsonPath: "Json Path",

                    expectedValue: "Expected Value"

                },
                zh: {
                    responseHeaders: "响应头部",

                    responseBody: "返回数据",

                    headerName: "参数名",

                    headerValue: "参数值",

                    jsonPath: "JSON 路径",

                    expectedValue: "期望值"
                },
                zh_TW: {
                    responseHeaders: "響應標頭",
                    responseBody: "返回數據",
                    headerName: "參數名",
                    headerValue: "參數值",
                    jsonPath: "JSON 路徑",
                    expectedValue: "期望值"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-request-tests {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        overflow-y: scroll;
    }
</style>

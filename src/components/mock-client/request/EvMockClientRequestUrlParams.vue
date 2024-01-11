<template>
    <div class="d-flex flex-column mock-client-request-url-params">
        <!--        <ev-key-value-editor :options="pathOptions"-->
        <!--                             key="PathParametersEditor"-->
        <!--                             v-model="pathParameters"></ev-key-value-editor>-->

        <!--        <ev-http-client-divider></ev-http-client-divider>-->

        <!--        <ev-key-value-editor :options="queryOptions"-->
        <!--                             key="QueryParametersEditor"-->
        <!--                             v-model="queryParameters"></ev-key-value-editor>-->
    </div>
</template>

<script>
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    // import EvKeyValueEditor from '@/views/http-client/request/key-value-editor/EvKeyValueEditor'

    export default {
        name: "EvMockClientRequestUrlParams",

        components: {
            EvHttpClientDivider
        },

        data() {
            return {
                pathParameters: [],

                queryParameters: [],

                pathOptions: {
                    title: "Path Parameters",

                    keyTitle: "Index",

                    valueTitle: "Value",

                    valuePlaceholder: "/path",

                    checkedStatus: "CHECKED",

                    isValueEditor: true,
                },

                queryOptions: {
                    title: "Query Parameters",

                    keyTitle: "Name",

                    valueTitle: "Value",

                    keyPlaceholder: "Param Name",

                    valuePlaceholder: "Param Value",

                    checkedStatus: "CHECKED",

                    isValueEditor: false,
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-request-url-params {
        width: 100%;
    }
</style>

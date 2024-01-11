<template>
    <div class="d-flex flex-column">
        <ev-http-response-title :label="$t('EvHttpResponseBlock.label')" :http-response="httpResponse"></ev-http-response-title>

        <ev-http-response-headers :response-headers="responseHeaders" v-if="hasResponseHeader"></ev-http-response-headers>

        <ev-http-response-payloads :response-payloads="responsePayloads" v-if="hasResponsePayloads"></ev-http-response-payloads>
    </div>
</template>

<script>
    import EvHttpResponseTitle from '@/components/http/EvHttpResponseTitle'
    import EvHttpResponseDescription from '@/components/http/response/EvHttpResponseDescription'
    import EvHttpResponseHeaders from '@/components/http/response/EvHttpResponseHeaders'
    import EvHttpResponsePayloads from '@/components/http/response/EvHttpResponsePayloads'
    import EvHttpResponsePayloadExamples from '@/components/http/response/EvHttpResponsePayloadExamples'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    import _ from 'lodash'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvLocaleMixin from '@/mixins/EvLocaleMixin'

    export default {
        name: "EvHttpResponseBlock",

        components: {
            EvHttpEmptyPlaceholder,
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpResponsePayloadExamples,
            EvHttpResponsePayloads,
            EvHttpResponseHeaders,
            EvHttpResponseDescription,
            EvHttpResponseTitle
        },

        props: {
            httpResponse: Object // JsonHttpResponse
        },

        data() {
            return {
                currentHttpResponsePayload: undefined,
            }
        },

        computed: {
            hasResponseHeader() {
                return !_.isEmpty(this.httpResponse.headers)
            },

            responseHeaders() {
                return this.httpResponse.headers
            },

            hasResponsePayloads() {
                return !_.isEmpty(this.httpResponse.payloads)
            },

            responsePayloads() {
                return this.httpResponse.payloads
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

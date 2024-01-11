<template>
    <div class="d-flex flex-column">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-api-description-block-title>{{ $t('EvHttpRequestBlock.label') }}</ev-api-description-block-title>

        <ev-http-request-headers :request-headers="requestHeaders" v-if="hasRequestHeaders"></ev-http-request-headers>

        <ev-http-request-url-params :url-parameters="urlParameters" v-if="hasUrlParameters"></ev-http-request-url-params>

        <ev-http-request-payloads :request-payloads="requestPayloads" v-if="hasRequestPayloads"></ev-http-request-payloads>

        <div v-if="noRequestParameters">
            <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

            <ev-http-empty-placeholder :text="$t('EvHttpRequestBlock.noParameters')"></ev-http-empty-placeholder>
        </div>
    </div>
</template>

<script>
    import EvHttpRequestHeaders from '@/components/http/request/EvHttpRequestHeaders'
    import EvHttpRequestPayloads from '@/components/http/request/EvHttpRequestPayloads'
    import EvHttpRequestUrlParams from '@/components/http/request/EvHttpRequestUrlParams'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    import _ from 'lodash'
    import JsonStructHelper from '@/core/evalon4j/JsonStructHelper'
    import JsonMethodHelper from '@/core/Evalon4JHelper'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvApiDescriptionBlockTitle from '@/views/content/components/EvApiDefinitionBlockTitle'

    export default {
        name: "EvHttpRequestBlock",

        components: {
            EvApiDescriptionBlockTitle,
            EvHttpEmptyPlaceholder,
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpRequestUrlParams,
            EvHttpRequestPayloads,
            EvHttpRequestHeaders,
        },

        props: {
            jsonMethod: Object,
        },

        computed: {
            noRequestParameters() {
                return !this.hasRequestHeaders && !this.hasUrlParameters && !this.hasRequestPayloads
            },

            hasRequestHeaders() {
                // 新版本

                let httpRequest = this.jsonMethod.httpRequest

                if (httpRequest) {
                    return !_.isEmpty(httpRequest.headers)
                }

                // 兼容旧版本逻辑

                return !_.isEmpty(this.jsonMethod.headers)
            },

            requestHeaders() {
                // 新版本

                let httpRequest = this.jsonMethod.httpRequest

                if (httpRequest) {
                    return httpRequest.headers
                }

                // 兼容旧版本逻辑

                return this.jsonMethod.headers
            },

            hasUrlParameters() {
                // 新版本

                let httpRequest = this.jsonMethod.httpRequest

                if (httpRequest) {
                    return !_.isEmpty(httpRequest.urlParams)
                }

                // 兼容旧版本逻辑

                if (_.isEmpty(this.jsonMethod.parameters)) {
                    return false
                }

                return this.jsonMethod.parameters.some(parameter => {
                    return JsonStructHelper.isUrlParameter(parameter)
                })
            },

            urlParameters() {
                // 新版本

                let httpRequest = this.jsonMethod.httpRequest

                if (httpRequest) {
                    return httpRequest.urlParams
                }

                // 兼容旧版本逻辑

                // ???

                return this.jsonMethod.parameters.filter(parameter => {
                    return JsonStructHelper.isUrlParameter(parameter)
                })
            },

            hasRequestPayloads() {
                // 新版本

                let httpRequest = this.jsonMethod.httpRequest

                if (httpRequest) {
                    return !_.isEmpty(httpRequest.payloads)
                }

                // 兼容旧版本逻辑

                if (_.isEmpty(this.jsonMethod.parameters)) {
                    return false
                }

                return this.jsonMethod.parameters.some(parameter => {
                    return JsonStructHelper.isRequestPayload(parameter)
                })
            },

            requestPayloads() {
                // 新版本

                let httpRequest = this.jsonMethod.httpRequest

                if (httpRequest) {
                    return httpRequest.payloads
                }

                // 兼容旧版本逻辑

                return JsonMethodHelper.buildRequestPayloads(this.jsonMethod)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

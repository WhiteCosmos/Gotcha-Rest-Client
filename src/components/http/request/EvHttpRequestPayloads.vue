<template>
    <div class="ev-http-block">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div v-if="hasRequestContent">
            <div class="ev-http-block__title">
                <span class="ev-http-block__title__label">{{ $t('EvHttpRequestPayloads.label') }}</span>

                <v-spacer></v-spacer>

                <ev-http-payloads-selector label="Content-Type"
                                           default-value="application/json"
                                           :items="requestPayloads"
                                           item-key="contentType"
                                           @select="doSwitch"></ev-http-payloads-selector>
            </div>

            <java-viewer :json-structs="currentRequestPayload.content"></java-viewer>
        </div>

        <ev-http-payload-examples v-if="hasRequestPayloadExamples"
                                  :title="$t('EvHttpRequestPayloadExamples.label')"
                                  :payload-examples="requestPayloadExamples"></ev-http-payload-examples>
    </div>
</template>

<script>
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import JavaViewer from '@/components/java-viewer/java-viewer'

    import _ from 'lodash'
    import EvHttpContentType from '@/components/http/response/EvHttpContentType'
    import EvHttpPayloadsSelector from '@/components/http/EvHttpPayloadsSelector'
    import EvHttpPayloadExamples from '@/components/http/EvHttpPayloadExamples'

    export default {
        name: "EvHttpRequestPayloads",

        components: {
            EvHttpPayloadExamples,
            EvHttpPayloadsSelector,
            EvHttpContentType,
            JavaViewer,
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder
        },

        mixins: [],

        created() {
            this.updateCurrentRequestPayload()
        },

        watch: {
            requestPayloads() {
                this.updateCurrentRequestPayload()
            }
        },

        props: {
            requestPayloads: Array // List<JsonHttpPayload>
        },

        data() {
            return {
                currentRequestPayload: undefined,
            }
        },

        computed: {
            hasRequestPayloadExamples() {
                return !_.isEmpty(this.currentRequestPayload.examples)
            },

            requestPayloadExamples() {
                return this.currentRequestPayload.examples
            },

            hasRequestContent() {
                return !_.isEmpty(this.currentRequestPayload) &&
                    !_.isEmpty(this.currentRequestPayload.content)
            },

            requestContent() {
                return this.currentRequestPayload.content
            },
        },

        methods: {
            doSwitch(selectedRequestPayload) {
                this.currentRequestPayload = selectedRequestPayload
            },

            updateCurrentRequestPayload() {
                this.currentRequestPayload = this.requestPayloads[0]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvHttpBlock";
</style>

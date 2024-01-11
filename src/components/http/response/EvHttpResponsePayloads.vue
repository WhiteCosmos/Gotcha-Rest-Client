<template>
    <div class="ev-http-block">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div v-if="hasResponseContent">
            <div class="ev-http-block__title">
                <span class="ev-http-block__title__label">{{ label }}</span>

                <v-spacer></v-spacer>

                <ev-http-payloads-selector label="Content-Type"
                                           default-value="application/json"
                                           :items="responsePayloads"
                                           item-key="contentType"
                                           @select="doSwitch"></ev-http-payloads-selector>
            </div>

            <java-viewer :json-structs="responseContent"></java-viewer>
        </div>

        <ev-http-payload-examples
            v-if="hasResponsePayloadExamples"
            :title="$t('EvHttpResponsePayloadExamples.label')"
            :payload-examples="responsePayloadExamples"></ev-http-payload-examples>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import JavaViewer from '@/components/java-viewer/java-viewer'
    import EvSquareTag from '@/components/tag/EvSquareTag'
    import EvHttpContentType from '@/components/http/response/EvHttpContentType'

    import _ from 'lodash'
    import EvHttpPayloadsSelector from '@/components/http/EvHttpPayloadsSelector'
    import EvHttpResponsePayloadExamples from '@/components/http/response/EvHttpResponsePayloadExamples'
    import EvHttpPayloadExamples from '@/components/http/EvHttpPayloadExamples'
    import EvLocaleMixin from '@/mixins/EvLocaleMixin'

    export default {
        name: "EvHttpResponsePayloads",

        components: {
            EvHttpPayloadExamples,
            EvHttpResponsePayloadExamples,
            EvHttpPayloadsSelector,
            EvHttpContentType,
            EvSquareTag,
            JavaViewer,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder,
            EvHorizonGutter
        },

        mixins: [
            EvLocaleMixin
        ],

        props: {
            responsePayloads: Array, // List<JsonHttpPayload>
        },

        created() {
            this.updateCurrentResponsePayload()
        },

        watch: {
            responsePayloads() {
                this.updateCurrentResponsePayload()
            }
        },

        data() {
            return {
                currentResponsePayload: undefined,
            }
        },

        computed: {
            label() {
                if (this.isLocale_EN) {
                    return "Response Payload"
                }

                if (this.isLocale_ZH) {
                    return "响应携带数据"
                }
            },

            hasResponsePayloadExamples() {
                return !_.isEmpty(this.currentResponsePayload) &&
                    !_.isEmpty(this.currentResponsePayload.examples)
            },

            responsePayloadExamples() {
                return this.currentResponsePayload.examples
            },

            hasResponseContent() {
                return !_.isEmpty(this.currentResponsePayload) &&
                    !_.isEmpty(this.currentResponsePayload.content)
            },

            responseContent() {
                return this.currentResponsePayload.content
            },
        },

        methods: {
            doSwitch(selectedResponsePayload) {
                this.currentResponsePayload = selectedResponsePayload
            },

            updateCurrentResponsePayload() {
                this.currentResponsePayload = this.responsePayloads[0]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvHttpBlock";
</style>

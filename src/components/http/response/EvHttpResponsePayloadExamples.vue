<template>
    <div class="ev-http-block">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-http-block__title">
            <span class="ev-http-block__title__label">{{ $t('EvHttpResponsePayloadExamples.label') }}</span>

            <v-spacer></v-spacer>

            <ev-http-payloads-selector
                v-if="hasMultipleResponsePayloads"
                label="Content-Type"
                :items="responsePayloadExamples"
                item-key="contentType"></ev-http-payloads-selector>
        </div>

        <div class="ev-http-block__content">
            <pre v-highlightjs="jsonExample"><code class="json"></code></pre>
        </div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpPayloadsSelector from '@/components/http/EvHttpPayloadsSelector'

    import _ from 'lodash'
    import EvLocaleMixin from '@/mixins/EvLocaleMixin'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpResponsePayloadExamples",

        components: {
            EvHttpPayloadsSelector,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder,
            EvHorizonGutter
        },

        props: {
            responsePayloadExamples: Array // List<JsonHttpPayloadExample>
        },

        data: () => {
            return {
                currentPayloadExample: undefined,

                expand: false,
            }
        },

        computed: {
            jsonExample() {
                return GHCJson.beautify(this.example)
            },

            hasMultipleResponsePayloads() {
                // return _.isEmpty(this.responsePayloadExamples) && this.responsePayloadExamples.length > 1
            }
        },

        methods: {
            doExpand() {

            },

            doSwitch(selectedPayloadExample) {

            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/highlightjs.css";

    @import "../EvHttpBlock";
</style>

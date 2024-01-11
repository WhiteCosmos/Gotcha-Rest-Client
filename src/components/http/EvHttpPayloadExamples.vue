<template>
    <div class="d-flex flex-column">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="ev-http-block__title">
            <span class="ev-http-block__title__label">{{ title }}</span>

            <div class="ev-http-block__icon-container" @click="doCopyPayloadExample">
                <v-hover v-slot="{ hover }">
                    <v-icon size="11" :color="hover ? '#007AFF' : '#AABBCC'">fa-copy</v-icon>
                </v-hover>
            </div>

            <v-spacer></v-spacer>

            <ev-http-payloads-selector
                v-if=" hasMultiplePayloadExamples
                    "
                label="Examples"
                :items="payloadExamples"
                item-key="name"></ev-http-payloads-selector>
        </div>

        <div class="ev-http-block__content">
            <pre v-highlightjs="exampleValue"><code :class="exampleType"></code></pre>
        </div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpPayloadsSelector from '@/components/http/EvHttpPayloadsSelector'

    import _ from 'lodash'
    import EvJsonCopyButton from '@/components/json-editor-vsl/components/EvJsonCopyButton'
    import EvJsonCopyIcon from '@/components/json-editor-vsl/icons/ev-json-copy-icon'
    import EvCopyRequestIcon from '@/components/tabs/content-tab-titles/http-client/EvCopyRequestIcon'

    export default {
        name: "EvHttpPayloadExamples",

        components: {
            EvCopyRequestIcon,
            EvJsonCopyIcon,
            EvJsonCopyButton,
            EvHttpPayloadsSelector,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder,
            EvHorizonGutter
        },

        props: {
            title: String,

            payloadExamples: Array // List<JsonHttpPayloadExample>
        },

        created() {
            this.updateCurrentPayloadExample()
        },

        watch: {
            payloadExamples() {
                this.updateCurrentPayloadExample()
            }
        },

        data: () => {
            return {
                currentPayloadExample: undefined,
            }
        },

        computed: {
            hasMultiplePayloadExamples() {
                return _.isEmpty(this.payloadExamples) && this.payloadExamples.length > 1
            },

            exampleType() {
                if (_.isEmpty(this.currentPayloadExample.type)) { // default using json format
                    return 'json'
                }

                switch (this.currentPayloadExample.type) {
                    case 'application/json':
                        return 'json'
                    case 'application/xml':
                        return 'xml'
                    default:
                        return 'json'
                }
            },

            exampleValue() {
                return this.currentPayloadExample.value
            }
        },

        methods: {
            doSwitch(selectedPayloadExample) {
                this.currentPayloadExample = selectedPayloadExample
            },

            updateCurrentPayloadExample() {
                this.currentPayloadExample = this.payloadExamples[0]
            },

            doCopyPayloadExample() {
                const {clipboard} = require('electron')

                clipboard.writeText(this.exampleValue)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "./EvHttpBlock";

    @import "~@/styles/highlightjs.css";

    .ev-http-block__icon-container {
        width: 24px;

        height: 24px;

        @include full-center;
    }
</style>

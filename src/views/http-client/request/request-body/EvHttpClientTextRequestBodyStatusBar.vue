<template>
    <div class="ev-http-client-text-request-body-status-bar">
        <ev-label size="10">L:{{ line }}, C:{{ character }}</ev-label>

        <v-spacer></v-spacer>

        <!--        <ev-label size="10" blue>Find & Replace (⌘F)</ev-label>-->

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-text-request-body-beautify-button @beautify="emitBeautify"></ev-text-request-body-beautify-button>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-text-request-body-mode-selector v-model="text.mode"></ev-text-request-body-mode-selector>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvTextRequestBodyModeSelector from '@/views/http-client/request/request-body/text/EvTextRequestBodyModeSelector'
    import EvTextRequestBodyBeautifyButton from '@/views/http-client/request/request-body/text/EvTextRequestBodyBeautifyButton'

    export default {
        name: "EvHttpClientTextRequestBodyStatusBar",

        components: {
            EvTextRequestBodyBeautifyButton,
            EvTextRequestBodyModeSelector,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            line: Number,

            character: Number,

            text: Object,
        },

        methods: {
            emitBeautify() {
                this.$emit('beautify')
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-text-request-body-status-bar {
        display: flex;

        flex-shrink: 0;

        align-items: center;

        width: 100%;

        height: 28px;

        background-color: #FAFAFA;

        border-top: 1px solid #F1F1F1;

        padding-left: 16px;

        //padding-right: 16px;
    }
</style>

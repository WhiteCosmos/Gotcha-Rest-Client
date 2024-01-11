<template>
    <div class="ev-http-block">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-http-block__title">
            <span class="ev-http-block__title__label">{{ $t('EvHttpRequestPayloadExamples.label') }}</span>
        </div>

        <div class="ev-http-block__content">
            <pre v-highlightjs="jsonExample"><code class="json"></code></pre>
        </div>
    </div>
</template>

<script>
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvHttpRequestPayloadExamples",

        components: {
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder
        },

        data: () => {
            return {
                expand: false,
            }
        },

        methods: {
            doExpand() {

            }
        },

        computed: {
            jsonExample() {
                return JSON.stringify(JSON.parse(this.example), null, 4)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvHttpBlock";
</style>

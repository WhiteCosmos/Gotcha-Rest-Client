<template>
    <div class="ev-http-client-request-template-placeholder" :style="{'padding-bottom': paddingBottom + 'px'}">
        <ev-label size="12" medium grey>{{ value }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'

    export default {
        name: "EvHttpClientRequestTemplatePlaceholder",

        components: {
            EvLabel
        },

        props: {
            value: String,

            paddingBottom: {
                type: Number,
                default: 0
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-template-placeholder {
        @include full-center;

        width: 100%;

        height: 100%;
    }
</style>

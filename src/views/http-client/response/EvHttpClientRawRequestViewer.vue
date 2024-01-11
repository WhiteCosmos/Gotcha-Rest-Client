<template>
    <div class="ev-http-client-raw-request-viewer">
        <ev-codemirror-wrapper ref="ev-codemirror-wrapper" v-model="summary.rawRequest" read-only mode="http"></ev-codemirror-wrapper>
    </div>
</template>

<script>
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'

    export default {
        name: "EvHttpClientRawRequestViewer",

        components: {
            EvCodemirrorWrapper
        },

        props: {
            summary: Object,

            visible: false,
        },

        watch: {
            visible(newVal) {
                newVal && this.$refs['ev-codemirror-wrapper'].refresh()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-raw-request-viewer {
        display: flex;

        border-top: 1px solid #F1F1F1;

        border-bottom: 1px solid #EAEAEA;
    }

</style>

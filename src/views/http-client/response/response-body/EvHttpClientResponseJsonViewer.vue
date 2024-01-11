<template>
    <div class="ev-http-client-response-json-viewer">
        <ev-json-viewer :json-str="jsonStr"
                        @add-jsonpath-assertion="emitAddJsonpathAssertion"></ev-json-viewer>
    </div>
</template>

<script>
    import EvJsonViewer from '@/components/json-viewer/EvJsonViewer'

    export default {
        name: "EvHttpClientResponseJsonViewer",

        components: {
            EvJsonViewer
        },

        mixins: [],

        props: {
            payload: Object,
        },

        computed: {
            jsonStr() {
                if (this.payload) {
                    return this.payload.body
                }

                return ''
            },
        },

        methods: {
            emitAddJsonpathAssertion(jsonpath, type, value) {
                this.$emit('add-jsonpath-assertion', jsonpath, type, value)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-json-viewer {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        &__wrapper {
            display: flex;

            width: 100%;

            height: calc(100% - 28px);
        }
    }
</style>

<template>
    <div class="ev-http-client-text-body">
        <div class="ev-http-client-text-body__codemirror">
            <ev-codemirror-wrapper ref="codemirror-wrapper"
                                   v-model="content"
                                   :mode="text.mode"
                                   @cursor-activity="handleCursorActivity"></ev-codemirror-wrapper>
        </div>

        <ev-http-client-text-request-body-status-bar
            :line="line"
            :character="character"
            :match-count="matchCount"
            :text="text"
            @beautify="handleBeautify"></ev-http-client-text-request-body-status-bar>
    </div>
</template>

<script>
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvHttpClientTextRequestBodyStatusBar from '@/views/http-client/request/request-body/EvHttpClientTextRequestBodyStatusBar'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'

    export default {
        name: "EvHttpClientTextRequestBody",

        components: {
            EvHttpClientTextRequestBodyStatusBar,
            EvCodemirrorWrapper,
        },

        created() {

        },

        mounted() {

        },

        activated() {

        },

        props: {
            httpRequest: Object,

            visible: false,
        },

        computed: {
            content: {
                get: function () {
                    let text = this.httpRequest.payload.text

                    return text.content
                },

                set: function (value) {
                    let text = this.httpRequest.payload.text

                    text.content = value
                },
            },

            text() {
                return this.httpRequest.payload.text
            },
        },

        data() {
            return {
                line: 0,

                character: 0,

                matchCount: 0,

                mode: 'application/json'
            }
        },

        watch: {
            visible(newVal) {
                newVal && this.$refs['codemirror-wrapper'].refresh()
            },

            'text.mode'(newVal, oldVal) {
                if (!newVal || !oldVal) {
                    return
                }

                let contentType = ''

                if (newVal === 'text') {
                    contentType = 'text/plain'
                }

                if (newVal === 'json') {
                    contentType = 'application/json'
                }

                if (newVal === 'yaml') {
                    contentType = 'application/yaml'
                }

                if (newVal === 'html') {
                    contentType = 'text/html'
                }

                if (newVal === 'xml') {
                    contentType = 'application/xml'
                }

                EvHttpClientEventBus.$emit(EvHttpClientEvents.ADD_REQUEST_HEADER, this.httpRequest, 'Content-Type', contentType)
            }
        },

        methods: {
            handleCursorActivity(cursor) {
                this.line = cursor.line + 1

                this.character = cursor.ch
            },

            handleSearchComplete(state) {
                this.matchCount = state.count
            },

            handleBeautify() {
                this.$refs['codemirror-wrapper'].beautify()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-text-body {
        position: relative;

        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: calc(100% - 28px);

        &__codemirror {
            display: flex;

            flex-direction: column;

            height: calc(100% - 28px);

            flex-wrap: nowrap;

            overflow-y: hidden;
        }
    }
</style>

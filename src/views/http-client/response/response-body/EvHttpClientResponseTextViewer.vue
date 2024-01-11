<template>
    <div class="ev-http-client-response-text-viewer">
        <div class="ev-http-client-response-text-viewer__wrapper">
            <ev-codemirror-wrapper ref="ev-codemirror-wrapper"
                                   :text="text"
                                   :mode=mode
                                   :options="cmOptions"
                                   :read-only="true"
                                   @search-complete="handleSearchComplete"></ev-codemirror-wrapper>
        </div>

        <ev-http-client-response-text-filter @search="handleSearch"
                                             @find-previous="handleFindPrevious"
                                             @find-next="handleFindNext"
                                             :match-count="matchCount"></ev-http-client-response-text-filter>
    </div>
</template>

<script>
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvHttpClientResponseTextFilter from '@/views/http-client/response/response-body/EvHttpClientResponseTextFilter'
    import {
        EvContentTabsEventBus,
        EvContentTabsEvents
    } from '@/components/tabs/EvContentTabsEventBus'

    import xmlFormatter from 'xml-formatter'

    import _ from 'lodash'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpClientResponseTextViewer",

        components: {
            EvHttpClientResponseTextFilter,
            EvCodemirrorWrapper
        },

        created() {
            // 选择接口的同时刷新Codemirror,避免出现空白问题

            EvContentTabsEventBus.$on(EvContentTabsEvents.SELECT_CONTENT_TAB, this.handleSelectContentTab)

            EvContentTabsEventBus.$on(EvContentTabsEvents.NAVIGATE_TO_HTTP_REQUEST, this.handleSelectContentTab)
        },

        beforeDestroy() {
            EvContentTabsEventBus.$off(EvContentTabsEvents.SELECT_CONTENT_TAB, this.handleSelectContentTab)

            EvContentTabsEventBus.$off(EvContentTabsEvents.NAVIGATE_TO_HTTP_REQUEST, this.handleSelectContentTab)
        },

        props: {
            payload: Object,

            visible: false,
        },

        data() {
            return {
                matchCount: 0,

                mode: 'text',
            }
        },

        watch: {
            visible() {
                let wrapper = this.$refs['ev-codemirror-wrapper']

                wrapper && wrapper.refresh()
            },
        },

        computed: {
            text() {
                if (!this.payload) {
                    return ''
                }

                let body = this.payload.body

                if (this.checkIsJson(body)) {
                    this.mode = 'json'
                    return GHCJson.beautify(body)
                }

                if (this.extension === 'html') {
                    this.mode = 'html'
                }

                if (this.extension === 'xml') {
                    this.mode = 'xml'
                }

                return body
            },

            extension() {
                if (!this.payload) {
                    return 'text'
                }

                return this.payload.extension
            },

            // mode: {
            //
            //     get() {
            //         if (!this.payload) {
            //             return 'text'
            //         }
            //
            //         return this.payload.extension
            //     },
            // },

            cmOptions() {
                return {
                    readOnly: true,
                    cursorBlinkRate: -1
                }
            }
        },

        methods: {
            handleSelectContentTab() {
                this.$nextTick(() => {
                    let wrapper = this.$refs['ev-codemirror-wrapper']

                    wrapper && wrapper.refresh()
                })
            },

            handleSearch(keyword) {
                this.$refs['ev-codemirror-wrapper'].search(keyword)
            },

            handleFindPrevious() {
                this.$refs['ev-codemirror-wrapper'].findPrevious()
            },

            handleFindNext() {
                this.$refs['ev-codemirror-wrapper'].findNext()
            },

            handleSearchComplete(state) {
                this.matchCount = state.count
            },

            checkIsJson(value) {
                try {
                    GHCJson.parse(value)

                    return true
                } catch (ignore) {
                    return false
                }
            },

            checkIsXml(value) {
                let parser = new DOMParser()

                try {
                    parser.parseFromString(value, 'application/xml')

                    return true
                } catch (ignore) {
                    return false
                }
            },

            // checkIsHtml(value) {
            //
            // },
            //
            // checkIsMarkdown() {
            //
            // },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-text-viewer {
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

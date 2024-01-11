<template>
    <div class="json-service-view" v-if="visible_">
        <div class="json-service-container" @click="toggle">
            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <div class="json-service-operator">
                <v-icon color="#007AFF" x-small v-if="expand_">fa-angle-down</v-icon>

                <v-icon color="#C8C8C8" x-small v-else>fa-angle-right</v-icon>
            </div>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="json-service-title-container">
                <span :class="jsonServiceTitleClasses" v-if="serviceSubtitle" v-html="serviceSubtitle"></span>

                <span :class="jsonServiceTitleClasses" v-else v-html="serviceTitle"></span>

                <span :class="jsonServiceSubtitleClasses" v-if="serviceSubtitle" v-html="serviceTitle"></span>
            </div>

            <v-spacer></v-spacer>

            <ev-json-service-menu></ev-json-service-menu>
        </div>

        <div class="json-method-container" v-if="expand_">
            <ev-json-method-view :json-service="jsonService"
                                 :json-method="jsonMethod"
                                 :selected-json-method="selectedJsonMethod"
                                 :selected-http-operation="selectedHttpOperation"
                                 :selected-mock-operation="selectedMockOperation"
                                 :keyword="keyword"
                                 v-for="jsonMethod in jsonMethods_"></ev-json-method-view>
        </div>
    </div>
</template>

<script>
    import EvJsonMethodView from '@/components/java-tree/EvJsonMethodView'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonServiceMenu from '@/components/java-tree/EvJsonServiceMenu'
    import {
        EvJsonTreeViewEventBus,
        EvJsonTreeViewEvents
    } from '@/components/java-tree/EvJsonTreeViewEventBus'
    import {
        EvLocalRepositoryEventBus,
        EvLocalRepositoryEvents
    } from '@/events/EvLocalRepositoryEventBus'

    import _ from 'lodash'
    import EvJsonTreeViewMixin from '@/components/java-tree/EvJsonTreeViewMixin'


    export default {
        name: "EvJsonServiceView",

        components: {
            EvJsonServiceMenu,
            EvVerticalGutter,
            EvJsonMethodView
        },

        mixins: [
            EvJsonTreeViewMixin
        ],

        created() {
            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.SEARCH, (s) => {
                this.handleSearch(s)
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.COLLAPSE_ALL, () => {
                this.handleCollapseAll()
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.EXPAND_ALL, () => {
                this.handleExpandAll()
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.EXPAND_SERVICE, (jsonService) => {
                this.handleExpandService(jsonService)
            })

            // EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.NO_SEARCH_RESULTS, () => {
            //     this.handleNoSearchResults()
            // })
        },

        mounted() {
            this.jsonService && (this.jsonMethods_ = this.jsonService.methods)
        },

        watch: {
            jsonService(newVal) {
                this.jsonMethods_ = newVal.methods
            }
        },

        props: {
            jsonService: Object,

            selectedJsonService: Object,

            selectedJsonMethod: Object,

            selectedHttpOperation: Object,

            selectedMockOperation: Object,

            treeViewGroup: Object
        },

        data() {
            return {
                jsonMethods_: [],

                expand_: false,

                visible_: true,

                keyword: undefined,

                noSearchResults: false,
            }
        },

        computed: {
            serviceTitle() {
                if (this.jsonService) {
                    if (this.jsonService.isHttpService) {
                        let highlight = this.jsonService.summary || this.jsonService.serviceName

                        return this.replaceWithHighlight(highlight, this.keyword)
                    }

                    if (this.jsonService.isJavaService) {
                        return this.replaceWithHighlight(this.jsonService.serviceName, this.keyword)
                    }
                }
            },

            serviceSubtitle() {
                if (this.jsonService) {
                    if (this.jsonService.isJavaService && !_.isEmpty(this.jsonService.summary)) {
                        return this.replaceWithHighlight(this.jsonService.summary, this.keyword)
                    }

                    if (this.jsonService.isHttpService && !_.isEmpty(this.jsonService.summary)) {
                        return this.replaceWithHighlight(this.jsonService.serviceName, this.keyword)
                    }
                }
            },

            jsonServiceTitleClasses() {
                return [
                    'json-service-title',
                    'text-truncate',
                    (this.isSelectedJsonService || this.expand_) ? 'json-service-title--selected' : '',
                ]
            },

            jsonServiceSubtitleClasses() {
                return [
                    'json-service-subtitle',
                    'text-truncate',
                    (this.isSelectedJsonService || this.expand_) ? 'json-service-subtitle--selected' : '',
                ]
            },

            isSelectedJsonService() {
                return this.jsonService === this.selectedJsonService
            }
        },

        methods: {
            handleSearch(s) {
                if (_.isEmpty(s)) {
                    this.handleSearchComplete()
                } else {
                    s = s.trim()

                    this.keyword = s

                    if (this.isJsonServiceMatch(s, this.jsonService)) {
                        this.expand_ = true

                        this.visible_ = true

                        return
                    }

                    let matchedJsonMethods = this.jsonService.methods.filter(jsonMethod => {
                        return this.isJsonMethodMatch(s, jsonMethod)
                    })

                    if (!_.isEmpty(matchedJsonMethods)) {
                        this.expand_ = true

                        this.jsonMethods_ = matchedJsonMethods
                    } else {
                        this.visible_ = false
                    }
                }
            },

            handleSearching() {

            },

            handleSearchComplete() {
                this.visible_ = true

                this.jsonMethods_ = this.jsonService.methods

                this.keyword = undefined
            },

            handleCollapseAll() {
                this.expand_ = false
            },

            handleExpandAll() {
                this.expand_ = true
            },

            handleExpandService(jsonService) {
                if (this.jsonService === jsonService) {
                    this.expand_ = true
                }
            },

            toggle() {
                this.expand_ = !this.expand_
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .json-service-view {
        @include flex-column;

        .json-service-container {
            @include horizon-center;

            height: 56px;

            .json-service-operator {
                @include square(16px, 0)
            }

            .json-service-title-container {
                @include flex-column;

                width: 240px; // TODO maybe
            }
        }

        .json-method-container {
            display: flex;

            flex-direction: column;

            box-shadow: inset 0px 8px 8px -12px #C8C8C8, inset 0px -8px 8px -12px #C8C8C8;

            background-color: #F5F5F5;

            //border-top: 1px solid ;

            //border-bottom: 1px solid blue;
        }

        .no-search-results {
            @include full-center;
        }
    }

    .json-service-title {
        font-size: 13px;

        line-height: 24px;

        font-weight: bold;

        //width: 80%;

        & {
            color: $PRIMARY_FONT_COLOR;
        }

        &--selected {
            color: $PRIMARY_COLOR;
        }
    }

    .json-service-subtitle {
        font-size: 11px;

        line-height: 24px;

        //width: 80%;

        & {
            color: $SECONDARY_FONT_COLOR;
        }

        &--selected {
            color: $PRIMARY_COLOR;
        }
    }

    ::v-deep .highlight {
        background-color: #f3d23e;

        color: black;
    }
</style>

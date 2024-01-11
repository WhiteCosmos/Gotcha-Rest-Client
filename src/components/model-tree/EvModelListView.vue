<template>
    <div class="model-tree-view">
        <ev-model-list-empty-view v-if="isEmptyModelList"></ev-model-list-empty-view>

        <ev-no-search-results v-if="noSearchResults" :keyword="keyword"></ev-no-search-results>

        <ev-model-list-view-item
            v-if="!noSearchResults"
            :json-struct="jsonStruct"
            :id="jsonStruct.fieldName"
            :key="index"
            :selected-json-struct="selectedJsonStruct"
            @click.native="doSelectModel(jsonStruct)"
            v-for="(jsonStruct, index) in jsonStructs_"></ev-model-list-view-item>
    </div>
</template>

<script>
    import EvModelListViewItem from '@/components/model-tree/EvModelListViewItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'
    import {EvModelListViewEventBus, EvModelListViewEvents} from '@/components/model-tree/EvModelListViewEventBus'
    import _ from 'lodash'
    import EvModelListEmptyView from '@/components/model-tree/EvModelListEmptyView'
    import EvNoSearchResults from '@/components/java-tree/EvNoSearchResults'

    export default {
        name: "EvModelListView",

        components: {
            EvNoSearchResults,
            EvModelListEmptyView,
            EvHorizonGutter,
            EvVerticalGutter,
            EvModelListViewItem
        },

        created() {
            EvContentTabsEventBus.$on(EvContentTabsEvents.SELECT_CONTENT_TAB, (selectedContentTab) => {
                this.handleSelectContentTab(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_OTHER_CONTENT_TABS, (selectedContentTab) => {
                this.handleCloseOtherContentTabs(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_ALL_CONTENT_TABS, (selectedContentTab) => {
                this.handleCloseAllContentTabs(selectedContentTab)
            })

            EvModelListViewEventBus.$on(EvModelListViewEvents.SEARCH, (s) => {
                this.handleSearch(s)
            })

            EvModelListViewEventBus.$on(EvModelListViewEvents.AIM, () => {
                this.scrollToJsonStruct(this.selectedJsonStruct)
            })
        },

        mounted() {
            this.jsonStructs_ = this.jsonStructs
        },

        watch: {
            jsonStructs() {
                this.jsonStructs_ = this.jsonStructs
            }
        },

        props: {
            jsonStructs: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },

        data() {
            return {
                jsonStructs_: [],

                selectedJsonStruct: undefined,

                keyword: '',

                noSearchResults: false,
            }
        },

        computed: {
            isEmptyModelList() {
                return _.isEmpty(this.jsonStructs)
            }
        },

        methods: {
            doSelectModel(jsonStruct) {
                this.selectedJsonStruct = jsonStruct

                EvContentTabsEventBus.$emit(EvContentTabsEvents.NAVIGATE_TO_STRUCT_DEFINITION, jsonStruct)
            },

            handleSearch(s) {
                if (_.isEmpty(s)) {
                    this.handleSearchComplete()
                } else {
                    this.handleSearching(s)
                }
            },

            handleSearching(s) {
                s = s.trim()

                this.keyword = s

                this.jsonStructs_ = this.jsonStructs.filter(jsonStruct => {
                    return this.isJsonStructMatch(s, jsonStruct)
                })

                this.noSearchResults = _.isEmpty(this.jsonStructs_)
            },

            isJsonStructMatch(s, jsonStruct) {
                if (_.isEmpty(s)) {
                    return true
                }

                return jsonStruct.fieldName.includes(s) ||
                    (!_.isEmpty(jsonStruct.fieldSummary) && (jsonStruct.fieldSummary.includes(s)))
            },

            handleSearchComplete() {
                this.keyword = ''

                this.noSearchResults = false

                this.jsonStructs_ = this.jsonStructs
            },

            handleSelectContentTab(selectedContentTab) {
                if (selectedContentTab.isStructDefinition()) {
                    this.selectedJsonStruct = selectedContentTab.jsonStruct

                    this.scrollToJsonStruct(this.selectedJsonStruct)
                }
            },

            handleCloseOtherContentTabs(selectedContentTab) {
                if (selectedContentTab.isStructDefinition()) {
                    this.selectedJsonStruct = selectedContentTab.jsonStruct

                    this.scrollToJsonStruct(this.selectedJsonStruct)
                }
            },

            handleCloseAllContentTabs(selectedContentTab) {
                if (selectedContentTab.isStructDefinition()) {
                    this.selectedJsonStruct = undefined

                    this.scrollToTop()
                }
            },

            scrollToTop() {
                this.scrollToJsonStruct(undefined)
            },

            scrollToJsonStruct(jsonStruct) {
                try {
                    if (!jsonStruct) {
                        this.$vuetify.goTo(0)
                    } else {
                        this.$vuetify.goTo('#' + jsonStruct.fieldName, {
                            container: this,
                            duration: 150,
                            offset: 0
                        })
                    }
                } catch (e) {
                    // ignore
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .model-tree-view {
        display: flex;

        flex-direction: column;

        background-color: #FCFCFC;

        width: 100%;

        height: 100%;

        min-width: 1px;

        min-height: 1px;

        user-select: none;
    }

    .dividerr {
        @include absolute-center;

        height: 16px;

        margin-left: 16px;

        margin-right: 16px;

        //border-bottom: 2px solid #C8C8C8;

        .dividerrr {

            border-bottom: 1px solid #C8C8C8;
            //@include circle(4px);

            //background-color: #C8C8C8;
        }
    }
</style>

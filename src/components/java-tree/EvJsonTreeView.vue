<template>
    <div class="json-tree-view">
        <ev-json-tree-empty-view v-if="isEmptyJsonTreeView"></ev-json-tree-empty-view>

        <ev-no-search-results v-if="noSearchResults" :keyword="keyword"></ev-no-search-results>

        <ev-json-service-view
            v-if="!noSearchResults"
            :key="jsonService.id"
            v-for="jsonService in jsonServices"
            :id="replaceServiceQualifiedName(jsonService.serviceQualifiedName)"
            :json-service="jsonService"
            :selected-json-service="selectedJsonService"
            :selected-json-method="selectedJsonMethod"
            :selected-http-operation="selectedHttpOperation"
            :selected-mock-operation="selectedMockOperation"></ev-json-service-view>
    </div>
</template>

<script>
    import EvJsonServiceView from '@/components/java-tree/EvJsonServiceView'
    import {EvJsonTreeViewEventBus, EvJsonTreeViewEvents} from '@/components/java-tree/EvJsonTreeViewEventBus'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'

    import _ from 'lodash'
    import EvJsonTreeViewMixin from '@/components/java-tree/EvJsonTreeViewMixin'
    import EvNoSearchResults from '@/components/java-tree/EvNoSearchResults'
    import EvJsonTreeEmptyView from '@/components/java-tree/EvJsonTreeEmptyView'
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    export default {
        name: "EvJsonTreeView",

        components: {
            EvJsonTreeEmptyView,
            EvNoSearchResults,
            EvJsonServiceView
        },

        mixins: [
            EvJsonTreeViewMixin,
            EvStoreMixin,
        ],

        created() {
            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents._SELECT_JSON_METHOD, (jsonService, jsonMethod) => {
                this.handleSelectJsonMethod(jsonService, jsonMethod)
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents._SELECT_HTTP_OPERATION, (jsonService, jsonMethod, httpOperation) => {
                this.handleSelectHttpOperation(jsonService, jsonMethod, httpOperation)
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.SELECT_MOCK_OPERATION, (jsonService, jsonMethod, mockOperation) => {
                this.handleSelectMockOperation(jsonService, jsonMethod, mockOperation)
            })

            // TODO Search http operation

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.SEARCH, (s) => {
                this.handleSearch(s)
            })

            EvJsonTreeViewEventBus.$on(EvJsonTreeViewEvents.AIM, () => {
                this.aimToSelectedJsonService()
            })

            // Listen To Content Tabs Events

            EvContentTabsEventBus.$on(EvContentTabsEvents.SELECT_CONTENT_TAB, (selectedContentTab) => {
                this.handleSelectContentTab(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_OTHER_CONTENT_TABS, (selectedContentTab) => {
                this.handleCloseOtherContentTabs(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_ALL_CONTENT_TABS, () => {
                this.handleCloseAllContentTabs()
            })
        },

        mounted() {
            // this.jsonServices_ = this.jsonServices
        },

        props: {
            jsonServices: Array,

            selectedGroup: Object,
        },

        watch: {
            // jsonServices() {
            //     this.jsonServices_ = this.jsonServices
            // }
        },

        data() {
            return {
                // jsonServices_: [],

                selectedJsonService: undefined,

                selectedJsonMethod: undefined,

                selectedHttpOperation: undefined,

                selectedMockOperation: undefined, // TODO v1.4.x

                noSearchResults: false,

                keyword: '',
            }
        },

        computed: {
            isEmptyJsonTreeView() {
                return _.isEmpty(this.jsonServices)
            },

            isCurrentGroup() {
                return this.selectedGroup
                    && this.currentGroup
                    && (this.selectedGroup.id === this.currentGroup.id)
            }
        },

        methods: {
            handleSelectJsonMethod(jsonService, jsonMethod) {
                if (!this.isCurrentGroup) {
                    return
                }

                this.selectedJsonService = jsonService

                this.selectedJsonMethod = jsonMethod

                this.selectedHttpOperation = undefined

                this.selectedMockOperation = undefined

                EvContentTabsEventBus.$emit(EvContentTabsEvents.NAVIGATE_TO_API_DEFINITION, jsonMethod)
            },

            handleSelectHttpOperation(jsonService, jsonMethod, httpOperation) {
                if (!this.isCurrentGroup) {
                    return
                }

                this.selectedJsonService = jsonService

                this.selectedJsonMethod = jsonMethod

                this.selectedHttpOperation = httpOperation

                this.selectedMockOperation = undefined

                EvContentTabsEventBus.$emit(EvContentTabsEvents.NAVIGATE_TO_HTTP_CLIENT, jsonMethod, httpOperation)
            },

            handleSelectMockOperation(jsonService, jsonMethod, mockOperation) {
                if (!this.isCurrentGroup) {
                    return
                }

                this.selectedJsonService = jsonService

                this.selectedJsonMethod = jsonMethod

                this.selectedHttpOperation = undefined

                this.selectedMockOperation = mockOperation

                EvContentTabsEventBus.$emit(EvContentTabsEvents.NAVIGATE_TO_MOCK_CLIENT, jsonMethod, mockOperation)
            },

            handleSearch(s) {
                if (!this.isCurrentGroup) {
                    return
                }

                if (this.isEmptyJsonTreeView) {
                    return
                }

                if (_.isEmpty(s)) {
                    this.handleSearchComplete()
                } else {
                    this.handleSearching(s).then(noSearchResults => {
                        this.noSearchResults = noSearchResults
                    })
                }
            },

            async handleSearching(s) {
                if (!this.isCurrentGroup) {
                    return
                }

                this.keyword = s

                let matchedJsonServices = this.jsonServices.filter(jsonService => {
                    return this.isJsonServiceMatch(s, jsonService) ||
                        jsonService.methods.some(jsonMethod => {
                            return this.isJsonMethodMatch(s, jsonMethod)
                        })
                })

                return _.isEmpty(matchedJsonServices)
            },

            handleSearchComplete() {
                if (!this.isCurrentGroup) {
                    return
                }

                this.noSearchResults = false

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.COLLAPSE_ALL)

                if (this.selectedJsonService) {
                    this.scrollToSelectedJsonService()
                }
            },

            handleSelectContentTab(selectedContentTab) {
                if (!this.isCurrentGroup) {
                    return
                }

                if (selectedContentTab.isApiDefinition()) {
                    this.selectedJsonService = selectedContentTab.jsonService

                    this.selectedJsonMethod = selectedContentTab.jsonMethod

                    this.selectedHttpOperation = undefined

                    this.selectedMockOperation = undefined

                    this.scrollToSelectedJsonService()
                }

                if (selectedContentTab.isApiHttpClient()) {
                    this.selectedJsonService = selectedContentTab.jsonService

                    this.selectedJsonMethod = selectedContentTab.jsonMethod

                    this.selectedHttpOperation = selectedContentTab.httpOperation

                    this.selectedMockOperation = undefined

                    this.scrollToSelectedJsonService()
                }
            },

            handleCloseOtherContentTabs(selectedContentTab) {
                if (!this.isCurrentGroup) {
                    return
                }

                if (selectedContentTab.isApiDefinition() || selectedContentTab.isApiHttpClient()) {
                    this.selectedJsonService = selectedContentTab.jsonService

                    this.selectedJsonMethod = selectedContentTab.jsonMethod

                    this.scrollToSelectedJsonService()
                }
            },

            handleCloseAllContentTabs() {
                if (!this.isCurrentGroup) {
                    return
                }

                this.selectedJsonService = undefined

                this.selectedJsonMethod = undefined

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.COLLAPSE_ALL)

                this.scrollToTop()
            },

            handleSwitchToApiDefinition(selectedContentTab) {

            },

            scrollToSelectedJsonService() {
                this.scrollToJsonService(this.selectedJsonService)
            },

            aimToSelectedJsonService() {
                if (!this.selectedJsonService) {
                    return
                }

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.COLLAPSE_ALL)

                this.scrollToJsonService(this.selectedJsonService)
            },

            scrollToTop() {
                try {
                    this.$vuetify.goTo(0, {
                        container: this,
                        duration: 0,
                        offset: 0
                    })
                } catch (e) {
                    // ignore error cause of search
                }
            },

            scrollToJsonService(jsonService) {
                if (!jsonService) {
                    return
                }

                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.EXPAND_SERVICE, jsonService)

                try {
                    this.$vuetify.goTo('#' + this.replaceServiceQualifiedName(jsonService.serviceQualifiedName), {
                        container: this,
                        duration: 150,
                        offset: 0
                    })
                } catch (e) {
                    // ignore error cause of search
                }
            },

            scrollToJsonMethod(jsonMethod) {

            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .json-tree-view {
        display: flex;

        flex-direction: column;

        background-color: #FCFCFC;

        width: 100%;

        //height: 100%;

        user-select: none;
    }
</style>

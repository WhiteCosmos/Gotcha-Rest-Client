<template>
    <div class="app-content">
        <ev-content-tab-items :content-tabs="contentTabs"
                              :hidden-content-tabs="hiddenContentTabs"
                              :overview-content-tab="overviewContentTab"
                              :selected-content-tab="selectedContentTab"
                              @update-content-tabs="handleUpdateContentTabs"></ev-content-tab-items>

        <div v-for="(contentTab, idx) in contentTabs" :key="contentTab.uid">
            <ev-content-tab v-if="defer(idx)"
                            v-show="selectedContentTab === contentTab"
                            :ref="contentTab.uid"
                            :key="contentTab.uid"
                            :content-tab="contentTab"
                            @send-http-request="handleSendHttpRequest"
                            @send-http-operation="handleSendHttpOperation"></ev-content-tab>
        </div>

        <!--            <ev-content-tab v-if="selectedContentTab"-->
        <!--                            :ref="selectedContentTab.uid"-->
        <!--                            :content-tab="selectedContentTab"-->
        <!--                            @send-http-request="handleSendHttpRequest"-->
        <!--                            @send-http-operation="handleSendHttpOperation"></ev-content-tab>-->

        <ev-app-content-placeholder v-if="noContentTabs"></ev-app-content-placeholder>
    </div>
</template>

<script>
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'
    import EvContentTabItems from '@/components/tabs/EvContentTabItems'
    import EvContentTab from '@/components/tabs/EvContentTab'
    import GHCContentTab from '@/components/tabs/GHCContentTab'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvTreeViewSelectorMixin from '@/views/sidebar/tree-view-selector/EvTreeViewSelectorMixin'
    import GHCContentTabType from '@/components/tabs/GHCContentTabType'
    import ContentTabHelper from '@/components/tabs/ContentTabHelper'
    import JsonMethodContentDao from '@/core/dao/JsonMethodContentDao'
    import JsonStructContentDao from '@/core/dao/JsonStructContentDao'
    import {AppEventBus, AppEvents} from '@/AppEventBus'

    import _ from 'lodash'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import EvAppContentPlaceholder from '@/views/EvAppContentPlaceholder'
    import EvModelMixin from '@/mixins/EvModelMixin'
    import RabiTreeViewNodeType from '@/components/api-tree/data/RabiTreeViewNodeType'
    import GHCIndexedDBDao from '@/core/dao/GHCIndexedDBDao'
    import Defer from '@/mixins/Defer'
    import AppCache from '@/AppCache'

    const MAX_CONTENT_TAB_LENGTH = 7

    export default {
        name: "EvAppContent",

        components: {
            EvAppContentPlaceholder,
            EvContentTab,
            EvContentTabItems
        },

        mixins: [
            EvStoreMixin,
            EvModelMixin,
            EvTreeViewSelectorMixin,
            Defer(),
        ],

        created() {
            // Events from App

            AppEventBus.$on(AppEvents.SELECT_TREE_VIEW_GROUP, (group) => {
                this.handleSelectTreeViewGroup(group)

                this.handleRestoreContentTabs(group)
            })

            // Events from ContentTabs

            EvContentTabsEventBus.$on(EvContentTabsEvents.SELECT_CONTENT_TAB, (selectedContentTab) => {
                this.handleSelectContentTab(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_CONTENT_TAB, (closedContentTab) => {
                this.handleRemoveContentTab(closedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_OTHER_CONTENT_TABS, (selectedContentTab) => {
                this.handleRemoveOtherContentTabs(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_TABS_TO_THE_LEFT, (selectedContentTab) => {
                this.handleCloseTabsToTheLeft(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_TABS_TO_THE_RIGHT, (selectedContentTab) => {
                this.handleCloseTabsToTheRight(selectedContentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_ALL_CONTENT_TABS, () => {
                this.handleRemoveAllContentTabs()
            })

            // Events from JsonTreeView

            EvContentTabsEventBus.$on(EvContentTabsEvents.NAVIGATE_TO_API_DEFINITION, (jsonMethod) => {
                this.handleNavigateToApiDefinition(jsonMethod)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.NAVIGATE_TO_STRUCT_DEFINITION, (jsonStruct) => {
                this.handleNavigateToStructDefinition(jsonStruct)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.NAVIGATE_TO_HTTP_CLIENT, (jsonMethod, httpOperation) => {
                this.handleNavigateToHttpClient(jsonMethod, httpOperation)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.NAVIGATE_TO_MOCK_CLIENT, (jsonMethod, mockOperation) => {
                // TODO v1.4.x
            })

            // Events From ApiTreeView

            EvContentTabsEventBus.$on(EvContentTabsEvents.NAVIGATE_TO_HTTP_REQUEST, (treeNodes) => {
                this.handleNavigateToHttpRequest(treeNodes)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_CONTENT_TAB_BY_HTTP_REQUEST, (treeNode) => {
                this.handleCloseContentTabByHttpRequest(treeNode)
            })
        },

        data() {
            return {
                overviewContentTab: undefined,

                selectedGroup: undefined,

                contentTabGroups: {},

                contentTabs_: [],

                hiddenContentTabs_: [],

                selectedContentTab_: undefined,
            }
        },

        watch: {
            // 自动保存 实现方式链接 https://juejin.cn/post/6844904069228658701
            selectedContentTab: {
                handler(newVal) {
                    this.saveContentTab_(newVal)
                }, deep: true
            }
        },

        computed: {
            noContentTabs() {
                return _.isEmpty(this.contentTabs)
            },

            contentTabs: {
                get: function () {
                    if (!this.selectedGroup) {
                        return []
                    }

                    let contentTabGroup = this.contentTabGroups[this.selectedGroup.id]

                    this.contentTabs_ = contentTabGroup.contentTabs

                    return this.contentTabs_
                },

                set: function (contentTabs) {
                    if (!contentTabs) {
                        contentTabs = []
                    }

                    let contentTabGroup = this.contentTabGroups[this.selectedGroup.id]

                    contentTabGroup.contentTabs = contentTabs

                    this.contentTabs_ = contentTabGroup.contentTabs
                }
            },

            hiddenContentTabs: {
                get: function () {
                    if (!this.selectedGroup) {
                        return []
                    }

                    let contentTabGroup = this.contentTabGroups[this.selectedGroup.id]

                    this.hiddenContentTabs_ = contentTabGroup.hiddenContentTabs

                    return this.hiddenContentTabs_
                },

                set: function (contentTabs) {
                    if (!contentTabs) {
                        contentTabs = []
                    }

                    let contentTabGroup = this.contentTabGroups[this.selectedGroup.id]

                    contentTabGroup.hiddenContentTabs = contentTabs

                    this.hiddenContentTabs_ = contentTabGroup.hiddenContentTabs
                }
            },

            selectedContentTab: {
                get: function () {
                    return this.selectedContentTab_
                },

                set: function (contentTab) {
                    if (!this.selectedGroup) {
                        return
                    }

                    let contentTabGroup = this.contentTabGroups[this.selectedGroup.id]

                    contentTabGroup.selectedContentTab = contentTab

                    this.selectedContentTab_ = contentTabGroup.selectedContentTab
                }
            }
        },

        methods: {
            handleSelectTreeViewGroup(group) {
                this.selectedGroup = group

                let contentTabGroup = this.contentTabGroups[group.id]

                if (!contentTabGroup) {
                    this.contentTabGroups[group.id] = {
                        contentTabs: [],
                        hiddenContentTabs: [],
                        selectedContentTab: undefined,
                    }

                    EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, this.overviewContentTab)
                } else {
                    if (_.isEmpty(contentTabGroup.contentTabs)) {
                        EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, this.overviewContentTab)
                    } else {
                        EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, contentTabGroup.selectedContentTab)
                    }
                }
            },

            async handleNavigateToApiDefinition(jsonMethod) {
                let existsContentTab = ContentTabHelper.findContentTabByJsonMethod(this.contentTabs, jsonMethod)

                if (!existsContentTab) {
                    existsContentTab = GHCContentTab.buildContentTabByJsonMethod(jsonMethod)

                    existsContentTab.jsonMethod = await new JsonMethodContentDao().query({id: jsonMethod.id})

                    this.insertContentTab(existsContentTab)
                }

                existsContentTab.type = GHCContentTabType.API_DEFINITION

                this.activeContentTab(existsContentTab)
            },

            async handleNavigateToStructDefinition(jsonStruct) {
                let existsContentTab = ContentTabHelper.findContentTabByJsonStruct(this.contentTabs, jsonStruct)

                if (!existsContentTab) {
                    existsContentTab = GHCContentTab.buildContentTabByJsonStruct(jsonStruct)

                    existsContentTab.jsonStruct = await new JsonStructContentDao().query({id: jsonStruct.id})

                    this.insertContentTab(existsContentTab)
                }

                existsContentTab.type = GHCContentTabType.STRUCT_DEFINITION

                this.activeContentTab(existsContentTab)
            },

            async handleNavigateToHttpClient(jsonMethod, httpOperation) {
                let existsContentTab = ContentTabHelper.findContentTabByJsonMethod(this.contentTabs, jsonMethod)

                if (!existsContentTab) {
                    existsContentTab = GHCContentTab.buildContentTabByJsonMethod(jsonMethod)

                    existsContentTab.jsonMethod = await new JsonMethodContentDao().query({id: jsonMethod.id})

                    this.insertContentTab(existsContentTab)
                }

                existsContentTab.type = GHCContentTabType.API_HTTP_CLIENT

                existsContentTab.httpOperation = httpOperation

                this.activeContentTab(existsContentTab)
            },

            async handleNavigateToMockClient(jsonMethod, mockOperation) {

            },

            async handleNavigateToHttpRequest(treeNodes) {
                let treeNode = treeNodes[treeNodes.length - 1]

                let existsContentTab = ContentTabHelper.findContentTabByTreeNode(this.contentTabs, treeNode)

                if (!existsContentTab) {
                    existsContentTab = GHCContentTab.buildContentTabsByTreeNode(treeNodes)

                    if (treeNode.type === RabiTreeViewNodeType.HTTP_REQUEST) {
                        existsContentTab.httpRequest = await new RabiHttpOperationDao().query({id: treeNode.httpRequestId})
                    }

                    //TODO 修改事件名称
                    if (treeNode.type === RabiTreeViewNodeType.WEBSOCKET_REQUEST) {
                        existsContentTab.websocketOperation = await new GHCIndexedDBDao(GHCIndexedDBDao.GHCWebsocketOperation).query({id: treeNode.websocketOperationId})
                    }

                    this.insertContentTab(existsContentTab)
                }

                this.activeContentTab(existsContentTab)

                this.cacheContentTabs()
            },

            async handleRestoreContentTabs(group) {
                if (!_.isEmpty(this.contentTabs)) { // 项目切换时，跳过restore过程
                    return
                }

                let contentTabCache = this.currentModule.contentTabCache

                if (!contentTabCache) {
                    contentTabCache = this.addContentTabCache(this.currentModule)
                }

                let contentTabs = []

                let caches = contentTabCache[group.id]

                if (_.isEmpty(caches)) {
                    return
                }

                for (let i = 0; i < caches.length; i++) {
                    let contentTab = new GHCContentTab()

                    let cache = caches[i]

                    contentTab.treeNodes = cache.treeNodes

                    contentTab.treeNode = cache.treeNode

                    contentTab.name = cache.name

                    contentTab.type = GHCContentTabType.API_HTTP_REQUEST

                    contentTab.httpRequest = await new RabiHttpOperationDao().query({id: cache.treeNode.httpRequestId})

                    contentTabs.push(contentTab)
                }

                contentTabs.forEach(contentTab => {
                    this.insertContentTab(contentTab)
                })

                let selectedContentTab = contentTabs[contentTabs.length - 1]

                this.activeContentTab(selectedContentTab)

                EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, selectedContentTab)
            },

            async cacheContentTabs() {
                let contentTabCache = this.currentModule.contentTabCache

                if (!contentTabCache) {
                    contentTabCache = this.addContentTabCache(this.currentModule)
                }

                contentTabCache[this.currentGroup.id] = this.contentTabs.map(it => {
                    let clonedContentTab = new GHCContentTab()

                    clonedContentTab.treeNodes = it.treeNodes

                    clonedContentTab.treeNode = it.treeNode

                    clonedContentTab.name = it.name

                    clonedContentTab.type = GHCContentTabType.API_HTTP_REQUEST

                    return clonedContentTab
                })

                this.saveCurrentModule()
            },

            async handleCloseContentTabByHttpRequest(treeNode) {
                let existsContentTab = ContentTabHelper.findContentTabByTreeNode(this.contentTabs, treeNode)

                if (!existsContentTab) {
                    return
                }

                this.handleRemoveContentTab(existsContentTab)
            },

            handleSelectContentTab(contentTab) {
                if (this.hiddenContentTabs.includes(contentTab)) {
                    let index = this.hiddenContentTabs.indexOf(contentTab)

                    this.hiddenContentTabs.splice(index, 1)

                    this.contentTabs.splice(0, 0, contentTab)

                    let hiddenContentTab = this.contentTabs.pop()

                    this.hiddenContentTabs.splice(0, 0, hiddenContentTab)
                }

                this.selectedContentTab = contentTab
            },

            toggleContentTabActive(contentTab) {
                // TODO Delete
            },

            handleRemoveContentTab(contentTab) {
                if (this.contentTabs.length === 1) {
                    // 如果仅剩最后一个标签页，触发关闭全部，让TreeView取消选中
                    EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_ALL_CONTENT_TABS)
                    return
                }

                let index = this.contentTabs.indexOf(contentTab)

                this.contentTabs.splice(index, 1)

                if (this.contentTabs.length - 1 < MAX_CONTENT_TAB_LENGTH && this.hiddenContentTabs.length > 0) {
                    let hiddenContentTabs = this.hiddenContentTabs.splice(0, 1)

                    this.contentTabs.push(hiddenContentTabs[0])
                }

                if (contentTab === this.selectedContentTab) {
                    let nextContentTab

                    if (index === 0) { // If is first content tab, select next one
                        this.contentTabs.length > 0 ? (nextContentTab = this.contentTabs[0]) : (nextContentTab = this.contentTabs[0])
                    } else { // Not first content tab, select previous one
                        nextContentTab = this.contentTabs[index - 1]
                    }

                    EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, nextContentTab)
                }

                this.cacheContentTabs()
            },

            handleRemoveOtherContentTabs(contentTab) {
                if (!contentTab) {
                    contentTab = this.selectedContentTab
                }

                if (!contentTab) {
                    return
                }

                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_CONTENT_TABS, this.contentTabs)

                this.contentTabs = [contentTab]

                this.hiddenContentTabs = []

                this.cacheContentTabs()

                EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, contentTab)
            },

            handleCloseTabsToTheLeft(contentTab) {
                if (!contentTab) {
                    contentTab = this.selectedContentTab
                }

                if (!contentTab) {
                    return
                }

                let closedContentTabs = this.contentTabs.slice(0, this.contentTabs.indexOf(contentTab) + 1)

                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_CONTENT_TABS, closedContentTabs)

                this.contentTabs = this.contentTabs.slice(this.contentTabs.indexOf(contentTab), this.contentTabs.length)

                this.cacheContentTabs()
            },

            handleCloseTabsToTheRight(contentTab) {
                if (!contentTab) {
                    contentTab = this.selectedContentTab
                }

                if (!contentTab) {
                    return
                }

                let closedContentTabs = this.contentTabs.slice(this.contentTabs.indexOf(contentTab), this.contentTabs.length)

                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_CONTENT_TABS, closedContentTabs)

                this.contentTabs = this.contentTabs.slice(0, this.contentTabs.indexOf(contentTab) + 1)

                this.hiddenContentTabs = []

                this.cacheContentTabs()
            },

            handleRemoveAllContentTabs() {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_CONTENT_TABS, this.contentTabs)

                this.selectedContentTab = undefined

                this.contentTabs = []

                this.hiddenContentTabs = []

                this.cacheContentTabs()
            },

            handleUpdateContentTabs(contentTabs) {
                this.contentTabs = contentTabs
            },

            handleSendHttpRequest(contentTab) {
                if (contentTab !== this.selectedContentTab) {
                    return
                }

                let component = this.$refs[contentTab.uid][0]

                let httpClient = component.$refs['http-request-client']

                httpClient && httpClient.sendHttpRequest()
            },

            handleSendHttpOperation(contentTab) {
                if (contentTab !== this.selectedContentTab) {
                    return
                }

                let component = this.$refs[contentTab.uid]

                let httpClient = component.$refs['http-operation-client']

                httpClient && httpClient.sendHttpRequest()
            },

            activeContentTab(contentTab) {
                this.selectedContentTab = contentTab
            },

            insertContentTab(contentTab) {
                if (this.contentTabs.length >= MAX_CONTENT_TAB_LENGTH) {
                    let hiddenContentTab = this.contentTabs.pop()

                    EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_CONTENT_TABS, [hiddenContentTab])

                    this.hiddenContentTabs.push(hiddenContentTab)
                }

                this.contentTabs.splice(0, 0, contentTab)
            },

            saveContentTab_: _.debounce((contentTab) => {
                if (!contentTab) {
                    return
                }

                if (contentTab.httpRequest) {
                    let httpRequest = contentTab.httpRequest

                    new RabiHttpOperationDao().save(httpRequest)

                    AppCache.httpOperations.set(httpRequest.id, httpRequest)
                }

                if (contentTab.httpOperation) {
                    new RabiHttpOperationDao().save(contentTab.httpOperation)
                }
            }, 500)
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .app-content {
        display: flex;

        flex-direction: column;

        flex: 1;

        height: 100%;

        min-width: 1px;

        min-height: 1px;
    }
</style>

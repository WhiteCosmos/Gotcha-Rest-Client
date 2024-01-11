<template>
    <div class="api-tree-view"
         @contextmenu="showTreeViewContextMenu"
         v-hotkey="hotkeys">

        <ev-api-tree-view-placeholder v-if="isTreeViewEmpty"></ev-api-tree-view-placeholder>

        <ev-api-tree-view-no-search-results v-if="isNoSearchResults" :keyword="highlight"></ev-api-tree-view-no-search-results>

        <!--        <ev-popup-menu-divider label="快速访问"></ev-popup-menu-divider>-->

        <!--        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>-->

        <!--        <div class="pinned-api-tree-view">-->
        <!--            <div class="pinned-api-tree-view__item">-->
        <!--                <ev-lighting-icon color="#FFB900"></ev-lighting-icon>-->

        <!--                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--                <ev-label size="11" bold primary>Get User Token</ev-label>-->
        <!--            </div>-->

        <!--            <div class="pinned-api-tree-view__item">-->
        <!--                <ev-lighting-icon color="#FFB900"></ev-lighting-icon>-->

        <!--                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--                <ev-label size="11" bold primary>获取用户鉴权 Token</ev-label>-->
        <!--            </div>-->

        <!--            <div class="pinned-api-tree-view__item">-->
        <!--                <ev-lighting-icon color="#FFB900"></ev-lighting-icon>-->

        <!--                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--                <ev-label size="11" bold primary>人々のケンゼンを取る</ev-label>-->
        <!--            </div>-->
        <!--        </div>-->

        <!--        <ev-popup-menu-divider label="所有接口"></ev-popup-menu-divider>-->

        <!--        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>-->

        <recycle-scroller ref="recycle-scroller"
                          :items="flattenTreeNodes"
                          key-field="uid" v-slot="{ item }" page-mode>
            <ev-tree-view-node-wrapper :flatten-tree="flattenTree"
                                       :node="item"
                                       :ref="item.uid"
                                       :selected-node="selectedNode"
                                       :focused-node="focusedNode"
                                       :focused-nodes="focusedNodes"
                                       :copied-node="copiedNode"
                                       :copied-nodes="copiedNodes"
                                       :moved-node="movedNode"
                                       :moved-nodes="movedNodes"
                                       :dragged-node="draggedSourceNode"
                                       :dragged-nodes="draggedSourceNodes"
                                       :shift="shift"
                                       :command="command"
                                       :highlight="highlight"
                                       @show-context-menu="showTreeViewContextMenu"
                                       @focus-tree-view-node="handleFocusTreeViewNode"
                                       @select-tree-view-node="handleSelectTreeViewNode"
                                       @drag-tree-view-node="handleDragTreeViewNode"
                                       @drop-tree-view-node="handleDropTreeViewNode"
                                       @toggle-tree-view-node="handleToggleTreeViewNode"
                                       @update-tree-view-node="handleUpdateTreeViewNode"></ev-tree-view-node-wrapper>
        </recycle-scroller>

        <div class="d-flex flex-shrink-0" style="height: 96px"></div>

        <ev-api-tree-view-blank-context-menu
            ref="ev-api-tree-view-blank-context-menu"
            @add-http-request="doAddHttpRequest"
            @add-group="doAddGroup"
            @add-from-template="doAddFromTemplate"
            @open-import-from-file-dialog="doOpenImportFromFileDialog"
            @import-postman-collection="doImportPostmanCollection"></ev-api-tree-view-blank-context-menu>

        <ev-api-tree-view-group-context-menu
            :node="focusedNode"
            ref="ev-api-tree-view-group-context-menu"
            @add-http-request="doAddHttpRequest"
            @add-group="doAddGroup"
            @add-from-template="doAddFromTemplate"
            @import-postman-collection="doImportPostmanCollection"
            @import-from=""
            @export-to="handleExportTo"
            @group-tree-view-nodes="doGroupTreeViewNodes"
            @ungroup-tree-view-nodes="doUngroupTreeViewNodes"
            @expand-all-tree-view-nodes="doExpandTreeViewNodesRecursively"
            @collapse-all-tree-view-nodes="doCollapseTreeViewNodeRecursively"
            @rename-tree-view-node="doRenameTreeViewNode"
            @move-tree-view-node="handleMoveTreeViewNode"
            @copy-tree-view-node="handleCopyTreeViewNode"
            @paste-tree-view-node="handlePasteTreeViewNode"
            @remove-tree-view-node="doRemoveTreeViewNode"></ev-api-tree-view-group-context-menu>

        <ev-api-tree-view-request-context-menu
            :node="focusedNode"
            ref="ev-api-tree-view-request-context-menu"
            @add-http-request="doAddHttpRequest"
            @add-websocket-request="doAddWebsocketRequest"
            @add-group="doAddGroup"
            @add-from-template="doAddFromTemplate"
            @group-tree-view-nodes="doGroupTreeViewNodes"
            @ungroup-tree-view-nodes="doUngroupTreeViewNodes"
            @rename-tree-view-node="doRenameTreeViewNode"
            @move-tree-view-node="handleMoveTreeViewNode"
            @copy-tree-view-node="handleCopyTreeViewNode"
            @copy-tree-view-node-as="handleCopyAs"
            @duplicate-tree-view-node="handleDuplicateTreeViewNode"
            @paste-tree-view-node="handlePasteTreeViewNode"
            @remove-tree-view-node="doRemoveTreeViewNode"></ev-api-tree-view-request-context-menu>
    </div>
</template>

<script>
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'

    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import {EvAppSidebarEventBus, EvAppSidebarEvents} from '@/views/sidebar/EvAppSidebarEventBus'
    import EvPlaceholderNode from '@/components/api-tree/nodes/EvPlaceholderNode'
    import EvApiTreeViewContextMenu from '@/components/api-tree/EvApiTreeViewContextMenu'
    import EvTreeViewNodeWrapper from '@/components/api-tree/nodes/EvTreeViewNodeWrapper'
    import GHCTreeNode from '@/components/api-tree/data/GHCTreeNode'
    import RabiTreeViewHttpRequestNodeBuilder from '@/components/api-tree/data/RabiTreeViewHttpRequestNodeBuilder'
    import RabiTreeViewNodeType from '@/components/api-tree/data/RabiTreeViewNodeType'

    import _ from 'lodash'
    import $ from 'jquery'
    import EvApiTreeViewPlaceholder from '@/components/api-tree/EvApiTreeViewPlaceholder'
    import EvApiTreeViewNoSearchResults from '@/components/api-tree/EvApiTreeViewNoSearchResults'
    import EvApiTreeViewBlankContextMenu from '@/components/api-tree/context-menu/EvApiTreeViewBlankContextMenu'
    import EvApiTreeViewGroupContextMenu from '@/components/api-tree/context-menu/EvApiTreeViewGroupContextMenu'
    import EvApiTreeViewRequestContextMenu from '@/components/api-tree/context-menu/EvApiTreeViewRequestContextMenu'
    import EvNotificationMixin from '@/mixins/EvNotificationMixin'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'
    import RabiModuleDao from '@/core/dao/RabiModuleDao'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import GHCHttpClientCURLBuilder from '@/views/http-client/core/GHCHttpClientCURLBuilder'
    import {clipboard} from 'electron'
    import GHCHttpClientRequestDocsExporter from '@/views/http-client/request/request-docs/GHCHttpClientRequestDocsExporter'
    import GHCApiTreeViewExportHandler from '@/components/api-tree/GHCApiTreeViewExportHandler'
    import EvFileMixin from '@/mixins/EvFileMixin'
    import GHCPostmanCollectionV2Builder from '@/core/postman/GHCPostmanCollectionV2Builder'
    import GHCTreeViewWebsocketRequestNodeBuilder from '@/components/api-tree/data/GHCTreeViewWebsocketRequestNodeBuilder'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvLabel from '@/components/typography/EvLabel'
    import EvLightIcon from '@/components/icon/ev-light-icon'
    import EvLightingIcon from '@/components/api-tree/icons/ev-lighting-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientLabelDivider from '@/views/http-client/components/EvHttpClientLabelDivider'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvApiTreeView",

        components: {
            EvHorizonGutter,
            EvPopupMenuDivider,
            EvHttpClientLabelDivider,
            EvVerticalGutter,
            EvLightingIcon,
            EvLightIcon,
            EvLabel,
            EvHorizonDivider,
            EvApiTreeViewRequestContextMenu,
            EvApiTreeViewGroupContextMenu,
            EvApiTreeViewBlankContextMenu,
            EvApiTreeViewNoSearchResults,
            EvApiTreeViewPlaceholder,
            EvTreeViewNodeWrapper,
            EvApiTreeViewContextMenu,
            EvPlaceholderNode,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
        },

        mixins: [
            EvFileMixin,
            EvStoreMixin,
            EvContextMenuMixin,
            EvNotificationMixin,
        ],

        created() {
            this.initialize()

            // EvAppSidebar Events

            EvAppSidebarEventBus.$on(EvAppSidebarEvents.EXPAND_ALL, () => {
                this.handleExpandAllTreeViewNodes()
            })

            EvAppSidebarEventBus.$on(EvAppSidebarEvents.COLLAPSE_ALL, () => {
                this.handleCollapseAllTreeViewNodes()
            })

            EvAppSidebarEventBus.$on(EvAppSidebarEvents.AIM_TO_TARGET, () => {
                this.handleAimToTarget()
            })

            EvAppSidebarEventBus.$on(EvAppSidebarEvents.IMPORT_FROM_FILE_COMPLETE, (sn, tn) => {
                this.handleImportFromFileComplete(sn, tn)
            })

            // EvAppContent Events

            EvContentTabsEventBus.$on(EvContentTabsEvents.SELECT_CONTENT_TAB, (contentTab) => {
                this.handleSelectContentTab(contentTab)
            })

            EvContentTabsEventBus.$on(EvContentTabsEvents.CLOSE_ALL_CONTENT_TABS, () => {
                this.handleCloseAllContentTabs()
            })

            // App Events

            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, (event) => {
                this.hideTreeViewContextMenu()
            })
        },

        props: {
            module: Object
        },

        watch: {
            treeNodes: {
                handler() {
                    this.saveTreeView_()
                }, deep: true
            }
        },

        data() {
            return {
                flattenTree: undefined,

                treeNodes: [],

                flattenTreeNodes: [],

                node: undefined,

                focusedNode: undefined,

                focusedNodes: [],

                selectedNode: undefined,

                copiedNode: undefined,

                copiedNodes: [],

                movedNode: undefined,

                movedNodes: [],

                draggedSourceNode: undefined,

                draggedSourceNodes: [],

                draggedTargetNode: undefined,

                // hotkeys

                shift: false,

                command: false,

                // status

                searching: false,

                highlight: '',
            }
        },

        computed: {
            hotkeys() {
                return {
                    'command+ctrl+n': this.doAddHttpRequest,
                    'command+shift+n': this.doAddGroup,

                    'command+ctrl+g': this.doGroupTreeViewNodes,
                    'command+shift+g': this.doUngroupTreeViewNodes,

                    'command+shift+r': this.doRenameTreeViewNode,
                    'command+shift+o': this.doOpenImportFromFileDialog,

                    'command+delete': this.doRemoveTreeViewNode,
                    'command+backspace': this.doRemoveTreeViewNode,
                    'command+a': () => {
                    }, // Dummy Select All, Add To App.vue 为了把 '全选' 这个快捷键关闭

                    'command+d': this.handleDuplicateTreeViewNode,

                    'esc': this.clearTreeView,
                }
            },

            isTreeViewEmpty() {
                return _.isEmpty(this.treeNodes)
            },

            isNoSearchResults() {
                return this.searching && _.isEmpty(this.flattenTreeNodes)
            },
        },

        methods: {
            initialize() {
                this.treeNodes = this.module.apis

                this.flattenTree = new GHCFlattenTree(this.treeNodes)

                this.flattenTree.buildFlattenTree().then(flattenTreeNodes => {
                    this.flattenTreeNodes = flattenTreeNodes

                    this.flattenTreeNodes.forEach(treeNode => {
                        this.initializeProperties(treeNode)
                    })
                })

                this.initializeHotkeysBinding()
            },

            initializeProperties(treeNode) {
                if (!treeNode.hasOwnProperty('exportConfigs')) {
                    this.$set(treeNode, 'exportConfigs', [])
                }
            },

            initializeHotkeysBinding() {
                document.body.addEventListener('click', event => {
                    this.clearTreeView()
                })

                window.addEventListener('copy', event => {
                    this.handleCopyTreeViewNode()
                })

                window.addEventListener('cut', event => {
                    this.handleMoveTreeViewNode()
                })

                window.addEventListener('paste', event => {
                    this.handlePasteTreeViewNode()
                })

                $('body').keydown(e => {
                    if (e.metaKey) {
                        this.command = true
                    }

                    if (e.shiftKey) {
                        this.shift = true
                    }
                }).keyup(e => {
                    if (e.key === "Meta") {
                        this.command = false
                    }

                    if (e.key === "Shift") {
                        this.shift = false
                    }
                })
            },

            clearTreeView() {
                this.focusedNode = undefined

                this.focusedNodes = []

                this.copiedNode = undefined

                this.copiedNodes = []

                this.movedNode = undefined

                this.movedNodes = []

                this.draggedSourceNode = undefined

                this.draggedTargetNode = undefined

                this.shift = false

                this.command = false
            },

            clearCopyAndPaste() {
                this.focusedNode = undefined

                this.focusedNodes = []

                this.copiedNode = undefined

                this.copiedNodes = []

                this.movedNode = undefined

                this.movedNodes = []

                this.shift = false

                this.command = false
            },

            doSearch: _.debounce(function (keyword) { // 不能用 () => {} ???
                this.searching = !_.isEmpty(keyword)

                if (this.searching) {
                    this.highlight = keyword

                    this.flattenTree.filterTreeNodes((node) => {
                        if (node.name.includes(keyword)) {
                            return true
                        }

                        if (node.requestPath && (node.requestPath.includes(keyword))) {
                            return true
                        }

                        return false
                    }).then(matchedFlattenTreeNodes => {
                        this.flattenTreeNodes = matchedFlattenTreeNodes
                    })
                } else {
                    this.highlight = ''

                    this.flattenTree.buildFlattenTree().then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }
            }, 50),

            handleToggleTreeViewNode(treeViewNode) {
                treeViewNode.expand = !treeViewNode.expand

                if (treeViewNode.expand) {
                    this.flattenTree.expandTreeNode(treeViewNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                } else {
                    this.flattenTree.collapseTreeNode(treeViewNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }
            },

            handleExpandAllTreeViewNodes() {
                if (!this.checkIsCurrentModule(this.module)) {
                    return
                }

                this.flattenTree.expandAllTreeNodes().then(flattenTreeNodes => {
                    this.flattenTreeNodes = flattenTreeNodes
                })
            },

            handleCollapseAllTreeViewNodes() {
                if (!this.checkIsCurrentModule(this.module)) {
                    return
                }

                this.flattenTree.collapseAllTreeNodes().then(flattenTreeNodes => {
                    this.flattenTreeNodes = flattenTreeNodes
                })
            },

            handleFocusTreeViewNode(treeViewNode) {
                if (!this.shift && !this.command) {
                    this.focusedNode = treeViewNode

                    this.focusedNodes = []
                }

                if (this.shift && !this.command) {
                    this.focusedNodes = []

                    let startNode = this.focusedNode || this.selectedNode

                    let endNode = treeViewNode

                    let startIndex = this.flattenTreeNodes.indexOf(startNode)

                    let endIndex = this.flattenTreeNodes.indexOf(endNode)

                    if (startIndex < endIndex) {
                        for (let i = startIndex; i < endIndex + 1; i++) {
                            this.focusedNodes.push(this.flattenTreeNodes[i])
                        }
                    }

                    if (startIndex > endIndex) {
                        for (let i = endIndex; i < startIndex + 1; i++) {
                            this.focusedNodes.push(this.flattenTreeNodes[i])
                        }
                    }
                }

                if (this.command && !this.shift) {
                    // 再次点击已选中的节点，则取消选中
                    if (treeViewNode === this.focusedNode) {
                        this.focusedNode = undefined
                        return
                    }

                    if (_.isEmpty(this.focusedNodes) && this.focusedNode) {
                        this.focusedNodes = [this.focusedNode]
                    }

                    if (this.focusedNodes.includes(treeViewNode)) {
                        this.focusedNodes.splice(this.focusedNodes.indexOf(treeViewNode), 1)
                    } else {
                        this.focusedNodes.push(treeViewNode)
                    }
                }
            },

            handleSelectTreeViewNode(treeViewNode) {
                if (RabiTreeViewNodeType.checkIsGroup(treeViewNode)) {
                    return
                }

                this.focusedNode = treeViewNode

                this.focusedNodes = []

                this.selectedNode = treeViewNode

                let treeNodes = this.flattenTree.getAllParents(treeViewNode)

                treeNodes.push(treeViewNode)

                EvContentTabsEventBus.$emit(EvContentTabsEvents.NAVIGATE_TO_HTTP_REQUEST, treeNodes)
            },

            handleDragTreeViewNode(treeViewNode) {
                this.draggedSourceNode = treeViewNode
            },

            handleDropTreeViewNode(treeNode, layer) {
                this.draggedTargetNode = treeNode

                if (this.draggedSourceNode && this.draggedTargetNode) {
                    if (!_.isEmpty(this.focusedNodes) && this.focusedNodes.includes(this.draggedSourceNode)) {
                        this.flattenTree.moveTreeNodes(this.focusedNodes, this.draggedTargetNode, layer).then(flattenTreeNodes => {
                            this.flattenTreeNodes = flattenTreeNodes
                        })
                    } else {
                        this.flattenTree.moveTreeNode(this.draggedSourceNode, this.draggedTargetNode, layer).then(flattenTreeNodes => {
                            this.flattenTreeNodes = flattenTreeNodes
                        })
                    }
                }

                this.draggedSourceNode = undefined

                this.draggedTargetNode = undefined
            },

            handleUpdateTreeViewNode() {
                // ignore
            },

            doAddHttpRequest() {
                let builder = new RabiTreeViewHttpRequestNodeBuilder(this.currentProject, this.currentVersion, this.dynamicVariableRender)

                let name = this._generateHttpRequestName()

                builder.buildTreeViewHttpRequestNode().then(treeViewNode => {
                    treeViewNode.name = name

                    this.doAddTreeNode(treeViewNode)
                })
            },

            _generateHttpRequestName() {
                let name = "Http Request"

                if (this.focusedNode) {
                    if (this.focusedNode.isContainer) {
                        if (this.focusedNode.expand) {
                            name = `Http Request (${this.focusedNode.children.length + 1})`
                        } else {
                            let parent = this.flattenTree.getParent(this.focusedNode)

                            parent && (name = `Http Request (${parent.children.length + 1})`)
                        }
                    } else {
                        let parent = this.flattenTree.getParent(this.focusedNode)

                        parent && (name = `Http Request (${parent.children.length + 1})`)
                    }
                }

                return name
            },

            doAddFromTemplate(focusedNode, template) {
                let builder = new RabiTreeViewHttpRequestNodeBuilder(this.currentProject, this.currentVersion, this.dynamicVariableRender)

                builder.buildTreeViewHttpRequestNodeFromTemplate(template).then(treeViewNode => {
                    this.doAddTreeNode(treeViewNode, focusedNode)
                })
            },

            doAddGroup() {
                this.doAddTreeNode(GHCTreeNode.newTreeViewGroupNode())
            },

            doAddWebsocketRequest() {
                let builder = new GHCTreeViewWebsocketRequestNodeBuilder(this.currentProject, this.currentVersion, this.dynamicVariableRender)

                builder.build().then(treeViewNode => {
                    this.doAddTreeNode(treeViewNode)
                })
            },

            doAddTreeNode(treeNode, focusedNode_) {
                let focusedNode = focusedNode_ || this.focusedNode

                if (focusedNode) {
                    let layer

                    if (focusedNode.isContainer) {
                        layer = focusedNode.expand ? GHCFlattenTree.LAYER.LOW : GHCFlattenTree.LAYER.MIDDLE
                    } else {
                        layer = GHCFlattenTree.LAYER.MIDDLE
                    }

                    this.flattenTree.addTreeNode(treeNode, focusedNode, layer).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                } else {
                    this.flattenTree.addTreeNodeToRoot(treeNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }
            },

            doImportPostmanCollection(treeNodes) {
                /*
                1. 选择Postman Collection文件
                2. 出现Process弹窗
                3. 导入成功或失败通知
                 */

                // let focusedNode = this.focusedNode
                //
                // treeNodes.forEach(treeNode => {
                //     if (focusedNode.expand) {
                //         this.addTreeNode(focusedNode, treeNode)
                //     } else {
                //         this.insertTreeNode(focusedNode, treeNode, true)
                //     }
                // })
            },

            handleImportFrom(type) {
                if (type === 'postman') {

                }

                if (type === 'insomnia') {

                }
            },

            doGroupTreeViewNodes() {

            },

            doUngroupTreeViewNodes() {
                if (this.focusedNode) {
                    let focusedNode = this.focusedNode

                    if (focusedNode.isContainer) {
                        this.ungroupContainerTreeNode(focusedNode)
                    }
                }
            },

            doExpandTreeViewNodesRecursively(treeViewNode) {
                this.flattenTree.expandTreeNodeRecursively(treeViewNode).then(flattenTreeNodes => {
                    this.flattenTreeNodes = flattenTreeNodes
                })
            },

            doCollapseTreeViewNodeRecursively(treeViewNode) {
                this.flattenTree.collapseTreeNodeRecursively(treeViewNode).then(flattenTreeNodes => {
                    this.flattenTreeNodes = flattenTreeNodes
                })
            },

            doRenameTreeViewNode() {
                if (this.focusedNode) {
                    this.$refs[this.focusedNode.uid].doRename()
                }
            },

            doOpenImportFromFileDialog() {
                this.$emit('open-import-from-file-dialog')
            },

            // Handlers

            handleMoveTreeViewNode() {
                this.copiedNode = undefined

                this.copiedNodes = []

                if (!_.isEmpty(this.focusedNodes)) {
                    this.movedNodes = this.focusedNodes
                } else if (this.focusedNode) {
                    this.movedNode = this.focusedNode
                }
            },

            handleCopyTreeViewNode() {
                this.movedNode = undefined

                this.movedNodes = []

                if (!_.isEmpty(this.focusedNodes)) {
                    this.copiedNodes = this.focusedNodes
                } else if (this.focusedNode) {
                    this.copiedNode = this.focusedNode
                }
            },

            async handleDuplicateTreeViewNode() {
                let builder = new RabiTreeViewHttpRequestNodeBuilder(this.currentProject, this.currentVersion, this.dynamicVariableRender)

                if (!_.isEmpty(this.focusedNodes)) {
                    let duplicatedNodes = []

                    for (let i = 0; i < this.focusedNodes.length; i++) {
                        let focusedNode = this.focusedNodes[i]

                        let duplicatedNode = await builder.duplicateTreeViewHttpRequestNode(focusedNode)

                        duplicatedNodes.push(duplicatedNode)

                        this.flattenTree._addNodeAsSibling(duplicatedNode, focusedNode)
                    }

                    this.flattenTree.buildFlattenTree().then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })

                } else if (this.focusedNode) {
                    let duplicatedNode = await builder.duplicateTreeViewHttpRequestNode(this.focusedNode)

                    this.flattenTree.addTreeNode(duplicatedNode, this.focusedNode, GHCFlattenTree.LAYER.MIDDLE).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }
            },

            async handlePasteTreeViewNode() {
                this.showContextMenu = false

                if (this.copiedNode) {
                    let builder = new RabiTreeViewHttpRequestNodeBuilder(this.currentProject, this.currentVersion, this.dynamicVariableRender)

                    let duplicatedNode = await builder.duplicateTreeViewHttpRequestNode(this.copiedNode)

                    this.doAddTreeNode(duplicatedNode)
                }

                if (!_.isEmpty(this.copiedNodes) && this.focusedNode) {
                    let builder = new RabiTreeViewHttpRequestNodeBuilder(this.currentProject, this.currentVersion, this.dynamicVariableRender)

                    let duplicateNodes = []

                    for (let i = 0; i < this.copiedNodes.length; i++) {
                        duplicateNodes.push(await builder.duplicateTreeViewHttpRequestNode(this.copiedNodes[i]))
                    }

                    duplicateNodes.forEach(duplicateNode => {
                        this.doAddTreeNode(duplicateNode)
                    })
                }

                if (this.movedNode && this.focusedNode) {
                    let layer = this.flattenTree.getPossibleLayer(this.focusedNode)

                    this.flattenTree.moveTreeNode(this.movedNode, this.focusedNode, layer).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }

                if (!_.isEmpty(this.movedNodes) && this.focusedNode) {
                    let layer = this.flattenTree.getPossibleLayer(this.focusedNode)

                    this.flattenTree.moveTreeNodes(this.movedNodes, this.focusedNode, layer).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }

                this.clearCopyAndPaste()
            },

            doRemoveTreeViewNode() {
                if (!_.isEmpty(this.focusedNodes)) {
                    this.flattenTree.removeTreeNodes(this.focusedNodes, (sns) => {
                        sns.forEach(sn => {
                            this.closeHttpRequestContentTab(sn)
                        })
                    }).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                } else if (this.focusedNode) {
                    this.flattenTree.removeTreeNode(this.focusedNode, (sn) => {
                        this.closeHttpRequestContentTab(sn)
                    }).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }

                this.clearTreeView()
            },

            closeHttpRequestContentTab(treeViewNode) {
                if (treeViewNode.isContainer) {
                    treeViewNode.children.forEach(child => {
                        this.closeHttpRequestContentTab(child)
                    })
                } else {
                    EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_CONTENT_TAB_BY_HTTP_REQUEST, treeViewNode)
                }
            },

            handleAimToTarget() {
                if (!this.checkIsCurrentModule(this.module)) {
                    return
                }

                if (!this.selectedNode) {
                    return
                }

                let parents = this.flattenTree.getAllParents(this.selectedNode)

                parents.forEach(node => {
                    this.flattenTree.expandTreeNode(node).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                })

                let height = 0

                let index = this.flattenTreeNodes.indexOf(this.selectedNode)

                for (let i = 0; i < index; i++) {
                    height += this.flattenTreeNodes[i].size
                }

                this.$emit('scroll-to', height)
            },

            handleSelectContentTab(contentTab) {
                if (!contentTab) {
                    return
                }

                this.selectedNode = contentTab.treeNode

                this.handleAimToTarget()
            },

            handleCloseAllContentTabs() {
                this.selectedNode = undefined

                this.clearTreeView()
            },

            handleImportFromFileComplete(sn, tn) {
                if (tn) {
                    this.flattenTree.addTreeNode(sn, tn).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                } else {
                    this.flattenTree.addTreeNode(sn, this.treeNodes[this.treeNodes.length - 1]).then(flattenTreeNodes => {
                        this.flattenTreeNodes = flattenTreeNodes
                    })
                }

                this.sendNotification('Success', 'Import File Complete')
            },

            async handleCopyAs(treeNode, type) {
                let httpOperation = await new RabiHttpOperationDao().query({id: treeNode.httpRequestId})

                if (type === 'curl') {
                    let builder = new GHCHttpClientCURLBuilder(this.currentCookieJar, this.dynamicVariableRender)

                    let cURL = builder.build(httpOperation.httpRequest)

                    clipboard.writeText(cURL)
                }

                if (type === 'markdown') {
                    let exporter = new GHCHttpClientRequestDocsExporter(this.currentCookieJar, this.dynamicVariableRender)

                    let md = exporter.exportToMarkdown(httpOperation.httpRequest)

                    clipboard.writeText(md)
                }
            },

            handleExportTo(treeNode, type) {
                let handler = new GHCApiTreeViewExportHandler(this.currentCookieJar, this.dynamicVariableRender)

                handler.handle(treeNode, type).then(content => {
                    this.saveFile(content, handler.getExtension(type), handler.getFilename(treeNode, type))
                })
            },

            // Helper

            showTreeViewContextMenu(event, treeViewNode) {
                AppEventBus.$emit(AppEvents.SHOW_CONTEXT_MENU, event)

                this.focusedNode = treeViewNode

                this.hideTreeViewContextMenu()

                if (this.focusedNode) {
                    if (this.focusedNode.isContainer) {
                        this.$refs['ev-api-tree-view-group-context-menu'].show(event)
                    } else {
                        this.$refs['ev-api-tree-view-request-context-menu'].show(event)
                    }
                } else {
                    this.$refs['ev-api-tree-view-blank-context-menu'].show(event)
                }
            },

            hideTreeViewContextMenu() {
                let bm = this.$refs['ev-api-tree-view-blank-context-menu']

                let gm = this.$refs['ev-api-tree-view-group-context-menu']

                let rm = this.$refs['ev-api-tree-view-request-context-menu']

                bm && bm.hide()

                gm && gm.hide()

                rm && rm.hide()
            },

            saveTreeView_: _.debounce(function () { // 不能用 () => {} ???
                this.module.apis = this.treeNodes

                new RabiModuleDao().save(this.module)
            }, 500),

            // onDragover(event) {
            //     event.preventDefault()
            // },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .api-tree-view {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        user-select: none;

        padding-top: 6px; // (28 - 16) / 2

        padding-left: 16px;

        padding-right: 16px;
    }

    .pinned-api-tree-view {
        display: flex;

        flex-direction: column;

        padding-left: 20px;

        margin-bottom: 8px;

        &__item {
            display: flex;

            align-items: center;

            height: 28px;
        }
    }
</style>

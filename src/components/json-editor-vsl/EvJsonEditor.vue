<template>
    <div class="ev-json-editor" v-hotkey="hotkeys">
        <ev-json-editor-header
            :movedNode="movedNode"
            :movedNodes="movedNodes"
            :copiedNode="copiedNode"
            :copiedNodes="copiedNodes"
            @toggle-expand-all="handleToggleExpandAll"></ev-json-editor-header>

        <div class="json-editor-scroll">
            <recycle-scroller class="json-editor-scroll__scroller"
                              :items="flattenTreeNodes_" key-field="uid"
                              :item-size="28" :buffer="10" v-slot="{ item }">
                <ev-json-node-wrapper :flatten-tree="flattenTree_"
                                      :node="item"
                                      :index="getJsonNodeIndex(item)"
                                      :parent-node="getJsonNodeParent(item)"
                                      :focused-node="focusedNode"
                                      :focused-nodes="focusedNodes"
                                      :moved-node="movedNode"
                                      :moved-nodes="movedNodes"
                                      :copied-node="copiedNode"
                                      :copied-nodes="copiedNodes"
                                      :dragged-node="draggedSourceNode"

                                      :shift="shift"
                                      :command="command"

                                      @show-context-menu="handleShowContextMenu"

                                      @focus-json-node="handleFocusJsonNode"
                                      @change-json-node-type="handleChangeJsonNodeType"
                                      @toggle-json-node="handleToggleJsonNodeExpand"
                                      @toggle-json-node-checked="handleToggleJsonNodeCheckedStatus"

                                      @add-json-node="handleAddJsonNode"
                                      @add-sibling-json-node="handleAddSiblingJsonNode"
                                      @remove-json-node="handleRemoveJsonNode"

                                      @drag-json-node="handleDragJsonNode"
                                      @drop-json-node="handleDropJsonNode"></ev-json-node-wrapper>
            </recycle-scroller>

            <!--            <div class="d-flex flex-shrink-0" style="height: 96px"></div>-->

            <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
                <ev-context-menu>


                    <!--                    <ev-context-menu-divider></ev-context-menu-divider>-->

                    <!--                    <ev-context-menu-item @click.stop.native="">Expand All</ev-context-menu-item>-->

                    <!--                    <ev-context-menu-item @click.stop.native="">Collapse All</ev-context-menu-item>-->


                    <ev-context-menu-item @click.stop.native="handleMoveJsonNode" :hotkeys="['⌘', 'X']">{{ $t('EvContextMenu.cut') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.stop.native="handleCopyJsonNode" :hotkeys="['⌘', 'C']">{{ $t('EvContextMenu.copy') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.stop.native="handlePasteJsonNode" :hotkeys="['⌘', 'V']">{{ $t('EvContextMenu.paste') }}</ev-context-menu-item>

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <ev-context-menu-item @click.stop.native="handleCopyJson">{{ $t('copyJson') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.stop.native="handleCopyJsonPath">{{ $t('copyJsonPath') }}</ev-context-menu-item>

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <ev-context-menu-item @click.stop.native="handleExpandAll">{{ $t('EvContextMenu.expandAll') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.stop.native="handleCollapseAll">{{ $t('EvContextMenu.collapseAll') }}</ev-context-menu-item>

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <ev-context-menu-item @click.stop.native="handleRemoveJsonNode(undefined)" :hotkeys="['⌘', '⌫']">{{ $t('EvContextMenu.remove') }}
                    </ev-context-menu-item>
                </ev-context-menu>
            </v-menu>
        </div>
    </div>
</template>

<script>
    import JsonNode from '@/components/json-editor-vsl/JsonNode'
    import ApiPlaceholderBlock from '@/views/content/definition-block/ApiPlaceholderBlock'
    import EvJsonEditorHeader from '@/components/json-editor-vsl/EvJsonEditorHeader'
    import EvJsonNodeWrapper from '@/components/json-editor-vsl/nodes/EvJsonNodeWrapper'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'

    import _ from 'lodash'
    import $ from 'jquery'
    import {clipboard} from 'electron'
    import JsonNodeHelper from '@/components/json-editor-vsl/editors/JsonNodeHelper'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvHttpClientRequestMixin from '@/views/http-client/request/EvHttpClientRequestMixin'
    import {EvJsonEditorEventBus, EvJsonEditorEvents} from '@/components/json-editor-vsl/EvJsonEditorEventBus'
    import GHCJsonEditorHelper from '@/components/json-editor-vsl/GHCJsonEditorHelper'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'

    export default {
        name: "EvJsonEditorVsl",

        components: {
            EvHorizonGutter,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvJsonNodeWrapper,
            EvJsonEditorHeader,
            ApiPlaceholderBlock,
        },

        mixins: [
            EvHttpClientRequestMixin,
            EvContextMenuMixin,
            EvCheckedStatusMixin,
            EvStoreMixin,
        ],

        created() {
            this.initialize()

            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.doHideContextMenu)

            EvJsonEditorEventBus.$on(EvJsonEditorEvents.EDIT_COMPLETE, this.handleEditComplete)
        },

        beforeDestroy() {
            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.doHideContextMenu)

            EvJsonEditorEventBus.$off(EvJsonEditorEvents.EDIT_COMPLETE, this.handleEditComplete)

            this.removeHotKeysBinding()
        },

        props: {
            root: {
                type: Object,
                default: () => {
                    return JsonNode.newRootNode('object')
                }
            },

            readOnly: Boolean,
        },

        watch: {
            root(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.initializeFlattenTree()
                }
            }
        },

        data() {
            return {
                flattenTree_: undefined,

                flattenTreeNodes_: [],

                focusedNode: undefined,

                focusedNodes: [],

                movedNode: undefined,

                movedNodes: [],

                copiedNode: undefined,

                copiedNodes: [],

                draggedSourceNode: undefined,

                draggedTargetNode: undefined,

                // hotkeys

                shift: false,

                command: false,
            }
        },

        computed: {
            hotkeys() {
                return {
                    'esc': this.clearCopyAndPaste,
                    'command+delete': this.handleRemoveFocusedJsonNode,
                    'command+backspace': this.handleRemoveFocusedJsonNode,
                }
            }
        },

        methods: {
            initialize() {
                this.initializeFlattenTree()

                this.initializeHotKeysBinding()
            },

            initializeFlattenTree() {
                this.flattenTree_ = new GHCFlattenTree([this.root])

                this.flattenTree_.buildFlattenTree().then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
            },

            initializeHotKeysBinding() {
                window.addEventListener('copy', this.bindCopyEventListener)

                window.addEventListener('cut', this.bindMoveEventListener)

                window.addEventListener('paste', this.bindPasteEventListener)

                document.body.addEventListener('click', this.clearJsonEditor)

                $('body').keydown(this.bindKeydown).keyup(this.bindKeyup)
            },

            removeHotKeysBinding() {
                window.removeEventListener('copy', this.bindCopyEventListener)

                window.removeEventListener('cut', this.bindMoveEventListener)

                window.removeEventListener('paste', this.bindPasteEventListener)

                document.body.removeEventListener('click', this.clearJsonEditor)

                $('body').off('keydown', this.bindKeydown).off('keyup', this.bindKeyup)
            },

            bindKeydown(e) {
                if (e.key === "Meta") {
                    this.command = true
                }

                if (e.key === "Shift") {
                    this.shift = true
                }
            },

            bindKeyup(e) {
                if (e.key === "Meta") {
                    this.command = false
                }

                if (e.key === "Shift") {
                    this.shift = false
                }
            },

            bindCopyEventListener(event) {
                if (!this.checkEventTargetIsInputElement(event)) {
                    this.handleCopyJsonNode()
                }
            },

            bindMoveEventListener(event) {
                if (!this.checkEventTargetIsInputElement(event)) {
                    this.handleMoveJsonNode()
                }
            },

            bindPasteEventListener(event) {
                if (!this.checkEventTargetIsInputElement(event)) {
                    this.handlePasteJsonNode()
                }
            },

            checkEventTargetIsInputElement(event) {
                return event && event.target instanceof HTMLInputElement
            },

            handleShowContextMenu($event, node) {
                if (this._checkIsRootJsonNode(node)) {
                    return
                }

                AppEventBus.$emit(AppEvents.SHOW_CONTEXT_MENU, $event)

                this.focusedNode = node

                this.doShowContextMenu($event)
            },

            handleToggleExpandAll(expand) {
                if (expand) {
                    this.flattenTree_.expandAllTreeNodes().then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                } else {
                    this.flattenTree_.collapseAllTreeNodes({skipRoot: true}).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }
            },

            handleChangeJsonNodeType(jsonNode) {
                if (!['object', 'array'].includes(jsonNode.type)) {
                    jsonNode.isContainer = false
                }

                jsonNode.children = []

                this.flattenTree_.buildFlattenTree().then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
            },

            handleToggleJsonNodeExpand(jsonNode) {
                jsonNode.expand = !jsonNode.expand

                if (jsonNode.expand) {
                    this.flattenTree_.expandTreeNode(jsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                } else {
                    this.flattenTree_.collapseTreeNode(jsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }
            },

            handleToggleJsonNodeCheckedStatus(jsonNode) {
                if (this.isItemChecked(jsonNode)) {
                    this.uncheckJsonNode(jsonNode)
                } else {
                    this.checkJsonNode(jsonNode)
                }
            },

            handleFocusJsonNode(jsonNode) {
                if (!this.shift && !this.command) {
                    this.focusedNode = jsonNode

                    this.focusedNodes = []
                }

                if (this.shift && !this.command) {
                    this.focusedNodes = []

                    let startNode = this.focusedNode

                    let endNode = jsonNode

                    let startIndex = this.flattenTreeNodes_.indexOf(startNode)

                    let endIndex = this.flattenTreeNodes_.indexOf(endNode)

                    if (startIndex < endIndex) {
                        for (let i = startIndex; i < endIndex + 1; i++) {
                            this.focusedNodes.push(this.flattenTreeNodes_[i])
                        }
                    }

                    if (startIndex > endIndex) {
                        for (let i = endIndex; i < startIndex + 1; i++) {
                            this.focusedNodes.push(this.flattenTreeNodes_[i])
                        }
                    }
                }

                if (this.command && !this.shift) {
                    if (_.isEmpty(this.focusedNodes) && this.focusedNode) {
                        this.focusedNodes = [this.focusedNode]
                    }

                    if (this.focusedNodes.includes(jsonNode)) {
                        this.focusedNodes.splice(this.focusedNodes.indexOf(jsonNode), 1)
                    } else {
                        this.focusedNodes.push(jsonNode)
                    }
                }
            },

            handleDragJsonNode(jsonNode) {
                this.focusedNode = jsonNode

                this.draggedSourceNode = jsonNode
            },

            handleDropJsonNode(jsonNode, layer) {
                if (this._checkIsDropBesideRootJsonNode(jsonNode, layer)) {
                    return
                }

                this.draggedTargetNode = jsonNode

                if (this.draggedSourceNode && this.draggedTargetNode) {
                    if (!_.isEmpty(this.focusedNodes) && this.focusedNodes.includes(this.draggedSourceNode)) {
                        this.flattenTree_.moveTreeNodes(
                            this.focusedNodes,
                            this.draggedTargetNode,
                            layer, this.afterDropJsonNodes).then(flattenTreeNodes => {
                            this.flattenTreeNodes_ = flattenTreeNodes
                        })
                    } else {
                        this.flattenTree_.moveTreeNode(
                            this.draggedSourceNode,
                            this.draggedTargetNode,
                            layer, this.afterDropJsonNode).then(flattenTreeNodes => {
                            this.flattenTreeNodes_ = flattenTreeNodes
                        })
                    }
                }

                this.draggedSourceNode = undefined

                this.draggedTargetNode = undefined

                this.clearJsonEditor()
            },

            _checkIsDropBesideRootJsonNode(targetJsonNode, layer) {
                let parent = this.getJsonNodeParent(targetJsonNode)

                return this._checkIsRootJsonNode(parent) && layer === GHCFlattenTree.LAYER.HIGH
            },

            afterDropJsonNodes(sns, tn) {
                sns.forEach(sn => {
                    this.afterDropJsonNode(sn)
                })
            },

            afterDropJsonNode(sn, tn) {
                let parent = this.flattenTree_.getParent(sn)

                if (parent) {
                    if (parent.type === 'object') {
                        sn.isObjectProperty = true

                        sn.isArrayItem = false
                    } else if (parent.type === 'array') {
                        sn.isObjectProperty = false

                        sn.isArrayItem = true
                    } else {
                        sn.isObjectProperty = false

                        sn.isArrayItem = false
                    }
                }
            },

            handleAddJsonNode(targetJsonNode, head = false) {
                let createdJsonNode = new JsonNode()

                if (JsonNodeHelper.checkIsContainerNode(targetJsonNode)) {
                    if (JsonNodeHelper.checkIsObjectNode(targetJsonNode)) {
                        createdJsonNode.type = 'string'

                        createdJsonNode.valuePlaceholder = '\" \"'

                        createdJsonNode.isObjectProperty = true
                    }

                    if (JsonNodeHelper.checkIsArrayNode(targetJsonNode)) {
                        createdJsonNode.isArrayItem = true

                        if (_.isEmpty(targetJsonNode.children)) {
                            createdJsonNode.type = 'string'

                            createdJsonNode.valuePlaceholder = '\" \"'
                        } else {
                            let lastNode = targetJsonNode.children[targetJsonNode.children.length - 1]

                            createdJsonNode.valuePlaceholder = lastNode.valuePlaceholder

                            createdJsonNode.type = lastNode.type
                        }
                    }

                    if (this.isItemUnchecked(targetJsonNode)) {
                        createdJsonNode.checkedStatus = "UNCHECKED"
                    } else {
                        createdJsonNode.checkedStatus = "CHECKED"
                    }

                    this.addJsonNode(createdJsonNode, targetJsonNode)
                }

                if (JsonNodeHelper.checkIsPrimitiveNode(targetJsonNode)) {
                    createdJsonNode.type = targetJsonNode.type

                    createdJsonNode.valuePlaceholder = targetJsonNode.valuePlaceholder

                    createdJsonNode.isObjectProperty = targetJsonNode.isObjectProperty

                    createdJsonNode.isArrayItem = targetJsonNode.isArrayItem

                    this.addJsonNode(createdJsonNode, targetJsonNode)
                }
            },

            handleAddSiblingJsonNode(targetJsonNode) {
                let createdJsonNode = new JsonNode()

                createdJsonNode.isContainer = true

                createdJsonNode.type = targetJsonNode.type

                createdJsonNode.valuePlaceholder = targetJsonNode.valuePlaceholder

                createdJsonNode.isObjectProperty = targetJsonNode.isObjectProperty

                createdJsonNode.isArrayItem = targetJsonNode.isArrayItem

                this.addSiblingJsonNode(createdJsonNode, targetJsonNode)
            },

            handleRemoveJsonNode(targetJsonNode) {
                this.showContextMenu = false

                if (targetJsonNode) {
                    this.flattenTree_.removeTreeNode(targetJsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                } else if (!_.isEmpty(this.focusedNodes)) {
                    this.flattenTree_.removeTreeNodes(this.focusedNodes).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                } else if (this.focusedNode) {
                    this.flattenTree_.removeTreeNode(this.focusedNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }

                this.clearCopyAndPaste()
            },

            handleRemoveFocusedJsonNode() {
                if (this.focusedNode) {
                    this.flattenTree_.removeTreeNode(this.focusedNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }
            },

            handleCopyJson() {
                this.showContextMenu = false

                let helper = new GHCJsonEditorHelper(this.dynamicVariableRender)

                clipboard.writeText(helper.stringify(this.focusedNode))
            },

            handleCopyJsonPath() {
                this.showContextMenu = false

                let helper = new GHCJsonEditorHelper(this.dynamicVariableRender)

                clipboard.writeText(helper.jsonPath(this.flattenTree_, this.focusedNode))
            },

            handleCopyJsonNode() {
                this.showContextMenu = false

                this.movedNode = undefined

                this.movedNodes = []

                if (!_.isEmpty(this.focusedNodes)) {
                    this.copiedNodes = this.focusedNodes
                } else if (this.focusedNode) {
                    this.copiedNode = this.focusedNode
                }
            },

            handleMoveJsonNode() {
                this.showContextMenu = false

                this.copiedNode = undefined

                this.copiedNodes = []

                if (!_.isEmpty(this.focusedNodes)) {
                    this.movedNodes = this.focusedNodes
                } else if (this.focusedNode) {
                    this.movedNode = this.focusedNode
                }
            },

            handlePasteJsonNode() {
                this.showContextMenu = false

                if (this.copiedNode) {
                    let duplicatedNode = JsonNode.duplicateJsonNode(this.copiedNode)

                    this.addJsonNode(duplicatedNode, this.focusedNode)
                }

                if (!_.isEmpty(this.copiedNodes) && this.focusedNode) {
                    let duplicatedNodes = []

                    for (let i = 0; i < this.copiedNodes.length; i++) {
                        duplicatedNodes.push(JsonNode.duplicateJsonNode(this.copiedNodes[i]))
                    }

                    duplicatedNodes.forEach(duplicatedNode => {
                        this.addJsonNode(duplicatedNode, this.focusedNode)
                    })
                }

                if (this.movedNode && this.focusedNode) {
                    let layer = this.flattenTree_.getPossibleLayer(this.focusedNode)

                    this.flattenTree_.moveTreeNode(this.movedNode, this.focusedNode, layer, this.afterDropJsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }

                if (!_.isEmpty(this.movedNodes) && this.focusedNode) {
                    let layer = this.flattenTree_.getPossibleLayer(this.focusedNode)

                    this.flattenTree_.moveTreeNodes(this.movedNodes, this.focusedNode, layer, this.afterDropJsonNodes).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }

                this.clearCopyAndPaste()
            },

            handleExpandAll() {
                this.showContextMenu = false

                this.flattenTree_.expandTreeNodeRecursively(this.focusedNode).then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
            },

            handleCollapseAll() {
                this.showContextMenu = false

                this.flattenTree_.collapseTreeNodeRecursively(this.focusedNode).then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
            },

            clearJsonEditor() {
                this.focusedNode = undefined

                this.focusedNodes = []

                this.movedNode = undefined

                this.movedNodes = []

                this.copiedNode = undefined

                this.copiedNodes = []

                this.draggedSourceNode = undefined

                this.draggedTargetNode = undefined

                this.shift = false

                this.command = false
            },

            clearCopyAndPaste() {
                this.focusedNode = undefined

                this.focusedNodes = []

                this.movedNode = undefined

                this.movedNodes = []

                this.copiedNode = undefined

                this.copiedNodes = []

                this.shift = false

                this.command = false
            },

            addJsonNode(sourceJsonNode, targetJsonNode) {
                if (targetJsonNode) {
                    let layer

                    if (this._checkIsRootJsonNode(targetJsonNode)) {
                        targetJsonNode.expand = true

                        layer = GHCFlattenTree.LAYER.LOW
                    } else {
                        if (targetJsonNode.isContainer) {
                            targetJsonNode.expand = true

                            layer = GHCFlattenTree.LAYER.LOW
                        } else {
                            layer = GHCFlattenTree.LAYER.MIDDLE
                        }
                    }

                    this.flattenTree_.addTreeNode(sourceJsonNode, targetJsonNode, layer, this.afterDropJsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                } else {
                    this.flattenTree_.addTreeNodeToRoot(sourceJsonNode).then(flattenTreeNodes => {
                        this.flattenTreeNodes_ = flattenTreeNodes
                    })
                }
            },

            addSiblingJsonNode(sourceJsonNode, targetJsonNode) {
                this.flattenTree_.addTreeNode(sourceJsonNode, targetJsonNode, GHCFlattenTree.LAYER.MIDDLE).then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
            },

            checkJsonNode(jsonNode) {
                this.toItemChecked(jsonNode)

                if (jsonNode.isContainer) {
                    jsonNode.children.forEach(child => {
                        this.checkJsonNodeRecursively(child)
                    })
                }

                this._syncParentsCheckedStatus(jsonNode)
            },

            checkJsonNodeRecursively(jsonNode) {
                this.toItemChecked(jsonNode)

                if (jsonNode.isContainer) {
                    jsonNode.children.forEach(child => {
                        this.checkJsonNodeRecursively(child)
                    })
                }
            },

            uncheckJsonNode(jsonNode) {
                this.toItemUnchecked(jsonNode)

                if (jsonNode.isContainer) {
                    jsonNode.children.forEach(child => {
                        this.uncheckJsonNodeRecursively(child)
                    })
                }

                this._syncParentsCheckedStatus(jsonNode)
            },

            handleEditComplete() {
                this.flattenTree_.checkHasDuplicateKeyRecursively([this.root])
            },

            uncheckJsonNodeRecursively(jsonNode) {
                this.toItemUnchecked(jsonNode)

                if (jsonNode.isContainer) {
                    jsonNode.children.forEach(child => {
                        this.uncheckJsonNodeRecursively(child)
                    })
                }
            },

            _syncParentsCheckedStatus(jsonNode) {
                let parent = this.flattenTree_.getParent(jsonNode)

                while (parent) {
                    if (this.isEveryChecked(parent.children)) {
                        this.toItemChecked(parent)
                    } else if (this.isAnyChecked(parent.children)) {
                        this.toItemHalfChecked(parent)
                    } else {
                        this.toItemUnchecked(parent)
                    }

                    parent = this.flattenTree_.getParent(parent)
                }
            },

            _checkIsRootJsonNode(jsonNode) {
                return this.flattenTreeNodes_.indexOf(jsonNode) === 0
            },

            getJsonNodeIndex(jsonNode) {
                let parent = this.flattenTree_.getParent(jsonNode)

                return parent ? parent.children.indexOf(jsonNode) : -1
            },

            getJsonNodeParent(jsonNode) {
                return this.flattenTree_.getParent(jsonNode)
            },
        },

        i18n: {
            messages: {
                en: {
                    copyJson: "Copy Json",

                    copyJsonPath: "Copy Json Path"
                },
                zh: {
                    copyJson: "复制 Json",

                    copyJsonPath: "复制 Json 路径"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-json-editor {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        width: 100%;

        height: 100%;
    }

    .json-editor-scroll {
        position: relative;

        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100% - 28px);

        &__scroller {
            overflow-y: scroll !important; // override overflow-y: auto

            padding-top: 6px; // for root node

            height: 100%;
        }
    }
</style>

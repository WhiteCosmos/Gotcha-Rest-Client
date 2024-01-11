<template>
    <div class="ev-json-schema-editor" v-hotkey="hotkeys">
        <ev-json-schema-editor-header
            :movedNode="movedNode"
            :movedNodes="movedNodes"
            :copiedNode="copiedNode"
            :copiedNodes="copiedNodes"
            @toggle-expand-all="handleToggleExpandAll"></ev-json-schema-editor-header>

        <div class="ev-json-schema-editor-scroll">
            <recycle-scroller :class="scrollStyles"
                              :items="flattenTreeNodes_" key-field="uid"
                              :item-size="28" :buffer="10" v-slot="{ item }">
                <ev-json-schema-node-wrapper :flatten-tree="flattenTree_"
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
                                             @drop-json-node="handleDropJsonNode"></ev-json-schema-node-wrapper>
            </recycle-scroller>

            <div class="d-flex flex-shrink-0" style="height: 24px;" v-if="pageMode"></div>

            <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
                <ev-context-menu>


                    <!--                    <ev-context-menu-divider></ev-context-menu-divider>-->

                    <!--                    <ev-context-menu-item @click.stop.native="">Expand All</ev-context-menu-item>-->

                    <!--                    <ev-context-menu-item @click.stop.native="">Collapse All</ev-context-menu-item>-->


                    <ev-context-menu-item @click.stop.native="handleMoveJsonNode" :hotkeys="['⌘', 'X']">{{ $t('EvContextMenu.cut') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.stop.native="handleCopyJsonNode" :hotkeys="['⌘', 'C']">{{ $t('EvContextMenu.copy') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.stop.native="handlePasteJsonNode" :hotkeys="['⌘', 'V']">{{ $t('EvContextMenu.paste') }}</ev-context-menu-item>

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <!--                    <ev-context-menu-item @click.stop.native="handleCopyJsonPath">Copy Json Path</ev-context-menu-item>-->

                    <!--                    <ev-context-menu-divider></ev-context-menu-divider>-->

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
    import JsonSchemaNode from '@/components/json-schema-editor/JsonSchemaNode'
    import ApiPlaceholderBlock from '@/views/content/definition-block/ApiPlaceholderBlock'
    import EvJsonSchemaEditorHeader from '@/components/json-schema-editor/EvJsonSchemaEditorHeader'
    import EvJsonSchemaNodeWrapper from '@/components/json-schema-editor/nodes/EvJsonSchemaNodeWrapper'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'

    import _ from 'lodash'
    import $ from 'jquery'
    import JsonNodeHelper from '@/components/json-schema-editor/editors/JsonNodeHelper'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import GHCJsonSchemaNodeType from '@/components/json-schema-editor/GHCJsonSchemaNodeType'
    import {EvJsonSchemaEditorEventBus, EvJsonSchemaEditorEvents} from '@/components/json-schema-editor/EvJsonSchemaEditorEventBus'
    import EvJsonSchemaEditorMixin from '@/components/json-schema-editor/EvJsonSchemaEditorMixin'

    export default {
        name: "EvJsonSchemaEditor",

        components: {
            EvHorizonGutter,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvJsonSchemaNodeWrapper,
            EvJsonSchemaEditorHeader,
            ApiPlaceholderBlock,
        },

        mixins: [
            EvContextMenuMixin,
            EvCheckedStatusMixin,
            EvJsonSchemaEditorMixin,
        ],

        created() {
            this.initialize()

            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.doHideContextMenu)

            EvJsonSchemaEditorEventBus.$on(EvJsonSchemaEditorEvents.SCHEMA_UPDATED, this.handleSchemaUpdated)
        },

        beforeDestroy() {
            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.doHideContextMenu)

            EvJsonSchemaEditorEventBus.$off(EvJsonSchemaEditorEvents.SCHEMA_UPDATED, this.handleSchemaUpdated)

            this.removeHotKeysBinding()
        },

        provide() {
            return {
                mode: this.mode
            }
        },

        props: {
            root: {
                type: Object,
                default: () => {
                    return JsonSchemaNode.newRootNode('object')
                }
            },

            mode: {
                type: String,
                default: "default" // schema or default
            },

            pageMode: {
                type: Boolean,
                default: false
            }
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
            },

            scrollStyles() {
                if (this.pageMode) {
                    return ['ev-json-schema-editor-scroll--disable']
                } else {
                    return ['ev-json-schema-editor-scroll--enable']
                }
            },
        },

        methods: {
            initialize() {
                this.initializeFlattenTree()

                this.initializeHotKeysBinding()
            },

            initializeFlattenTree() {
                this.resolveReferenceTreeNodes([this.root])

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

            handleSchemaUpdated() {
                this.resolveReferenceTreeNodes()

                this.flattenTree_.buildFlattenTree().then(flattenTreeNodes => {
                    this.flattenTreeNodes_ = flattenTreeNodes
                })
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

            handleChangeJsonNodeType() {
                this.resolveReferenceTreeNodes([this.root])

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
                if (!this._checkIsTargetJsonNodeDroppable(jsonNode, layer)) {
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

            _checkIsTargetJsonNodeDroppable(targetJsonNode, layer) {
                if (this._checkIsRootJsonNode(parent) && (layer === GHCFlattenTree.LAYER.HIGH || layer === GHCFlattenTree.LAYER.MIDDLE)) {
                    return false
                }

                if (targetJsonNode.isReadOnly) {
                    return false
                }

                if (targetJsonNode.type === GHCJsonSchemaNodeType.REFERENCE) {
                    if (layer === GHCFlattenTree.LAYER.LOW) {
                        return false
                    }
                }

                let parent = this.getJsonNodeParent(targetJsonNode)

                // Parent Node

                if (parent && parent.children[parent.children.length - 1] === targetJsonNode) {
                    if (parent.isArrayItem) {
                        return layer !== GHCFlattenTree.LAYER.HIGH
                    }

                    if (parent.isDictionaryValue) {
                        return layer !== GHCFlattenTree.LAYER.HIGH
                    }
                }


                // Dictionary Node

                if (targetJsonNode.type === 'dictionary') {
                    if (targetJsonNode.expand) {
                        return false
                    } else {
                        return layer !== GHCFlattenTree.LAYER.LOW // 只能移动到相邻或外侧
                    }
                }

                if (targetJsonNode.isDictionaryKey) { // 作为Map的Key时，任何位置的移动均无效
                    return false
                }

                if (targetJsonNode.isDictionaryValue) {
                    if (targetJsonNode.isContainer) {
                        // ignore
                    } else {
                        return layer === GHCFlattenTree.LAYER.HIGH
                    }
                }

                // Array Node

                if (targetJsonNode.type === 'array') {
                    if (targetJsonNode.expand) {
                        return false
                    } else {
                        return layer !== GHCFlattenTree.LAYER.LOW // 只能移动到相邻或外侧
                    }
                }

                if (targetJsonNode.isArrayItem) {
                    if (targetJsonNode.isContainer) {
                        // ignore
                    } else {
                        return layer === GHCFlattenTree.LAYER.HIGH
                    }
                }

                return true
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
                let createdJsonNode = new JsonSchemaNode()

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
                let createdJsonNode = new JsonSchemaNode()

                createdJsonNode.type = GHCJsonSchemaNodeType.STRING

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

            handleCopyJsonPath() { // TODO Copy Json Path
                this.showContextMenu = false
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
                    let duplicatedNode = JsonSchemaNode.duplicateJsonNode(this.copiedNode)

                    this.addJsonNode(duplicatedNode, this.focusedNode)
                }

                if (!_.isEmpty(this.copiedNodes) && this.focusedNode) {
                    let duplicatedNodes = []

                    for (let i = 0; i < this.copiedNodes.length; i++) {
                        duplicatedNodes.push(JsonSchemaNode.duplicateJsonNode(this.copiedNodes[i]))
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
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-json-schema-editor {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        width: 100%;

        height: 100%;
    }

    .ev-json-schema-editor-scroll {
        position: relative;

        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100% - 28px);

        &--enable {
            overflow-y: scroll !important; // override overflow-y: auto

            padding-top: 6px; // for root node

            height: 100%;
        }

        &--disable {
            padding-top: 6px; // for root node

            height: 100%;
        }
    }
</style>

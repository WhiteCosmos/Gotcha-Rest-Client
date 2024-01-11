<template>
    <div class="ev-json-editor__json-node-wrapper">
        <ev-json-container-node v-if="isContainerNode"

                                :node="node"
                                :index="index"

                                :selected-node="selectedNode"
                                :focused-node="focusedNode"
                                :focused-nodes="focusedNodes"
                                :moved-node="movedNode"
                                :moved-nodes="movedNodes"
                                :copied-node="copiedNode"
                                :copied-nodes="copiedNodes"
                                :dragged-node="draggedNode"
                                :dragged-nodes="draggedNodes"

                                :shift="shift"
                                :command="command"

                                @focus-json-node="emitFocusJsonNode"
                                @change-json-node-type="emitChangeJsonNodeType"
                                @toggle-json-node="emitToggleJsonNode"
                                @toggle-json-node-checked="emitToggleJsonNodeChecked"
                                @add-json-node="emitAddJsonNode"
                                @add-sibling-json-node="emitAddSiblingJsonNode"
                                @remove-json-node="emitRemoveJsonNode"
                                @drag-json-node="emitDragJsonNode"
                                @show-context-menu="emitShowContextMenu"></ev-json-container-node>

        <ev-json-primitive-node v-else

                                :node="node"
                                :index="index"

                                :selected-node="selectedNode"
                                :focused-node="focusedNode"
                                :focused-nodes="focusedNodes"
                                :moved-node="movedNode"
                                :moved-nodes="movedNodes"
                                :copied-node="copiedNode"
                                :copied-nodes="copiedNodes"
                                :dragged-node="draggedNode"
                                :dragged-nodes="draggedNodes"

                                @focus-json-node="emitFocusJsonNode"
                                @toggle-json-node="emitToggleJsonNode"
                                @toggle-json-node-checked="emitToggleJsonNodeChecked"
                                @add-json-node="emitAddJsonNode"
                                @remove-json-node="emitRemoveJsonNode"
                                @drag-json-node="emitDragJsonNode"
                                @show-context-menu="emitShowContextMenu"></ev-json-primitive-node>

        <ev-json-node-divider :flatten-tree="flattenTree"
                              :node="node"
                              :parent-node="parentNode"
                              :dragged-node="draggedNode"
                              @show-context-menu="emitShowContextMenu"
                              @focus-json-node="emitFocusJsonNode"
                              @drop-json-node="emitDropJsonNode"></ev-json-node-divider>
    </div>
</template>

<script>
    import EvJsonNodeDivider from '@/components/json-editor-vsl/editors/EvJsonNodeDivider'
    import EvJsonNodeMixin from '@/components/json-editor-vsl/editors/EvJsonNodeMixin'
    import EvJsonContainerNode from '@/components/json-editor-vsl/nodes/EvJsonContainerNode'
    import EvJsonPrimitiveNode from '@/components/json-editor-vsl/nodes/EvJsonPrimitiveNode'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'
    import EvTreeViewNodeDivider from '@/components/api-tree/components/EvTreeViewNodeDivider'

    export default {
        name: "EvJsonNodeWrapper",

        components: {
            EvTreeViewNodeDivider,
            EvHorizonGutter,
            EvJsonContainerNode,
            EvJsonPrimitiveNode,
            EvJsonNodeDivider,
        },

        props: {
            flattenTree: GHCFlattenTree,
        },

        mixins: [
            EvJsonNodeMixin
        ],
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonEditor";
</style>

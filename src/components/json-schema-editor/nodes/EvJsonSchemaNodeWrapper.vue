<template>
    <div class="ev-json-editor__json-node-wrapper">
        <ev-json-schema-container-node v-if="isContainerNode"

                                       :flatten-tree="flattenTree"

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
                                       @show-context-menu="emitShowContextMenu"></ev-json-schema-container-node>

        <ev-json-schema-primitive-node v-else

                                       :flatten-tree="flattenTree"

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
                                       @change-json-node-type="emitChangeJsonNodeType"
                                       @toggle-json-node="emitToggleJsonNode"
                                       @toggle-json-node-checked="emitToggleJsonNodeChecked"
                                       @add-json-node="emitAddJsonNode"
                                       @remove-json-node="emitRemoveJsonNode"
                                       @drag-json-node="emitDragJsonNode"
                                       @show-context-menu="emitShowContextMenu"></ev-json-schema-primitive-node>

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
    import EvJsonNodeDivider from '@/components/json-schema-editor/editors/EvJsonNodeDivider'
    import EvJsonSchemaContainerNode from '@/components/json-schema-editor/nodes/EvJsonSchemaContainerNode'
    import EvJsonSchemaPrimitiveNode from '@/components/json-schema-editor/nodes/EvJsonSchemaPrimitiveNode'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'
    import EvTreeViewNodeDivider from '@/components/api-tree/components/EvTreeViewNodeDivider'
    import EvJsonSchemaNodeMixin from '@/components/json-schema-editor/mixins/EvJsonSchemaNodeMixin'

    export default {
        name: "EvJsonSchemaNodeWrapper",

        components: {
            EvTreeViewNodeDivider,
            EvHorizonGutter,
            EvJsonSchemaContainerNode,
            EvJsonSchemaPrimitiveNode,
            EvJsonNodeDivider,
        },

        props: {
            flattenTree: GHCFlattenTree,
        },

        mixins: [
            EvJsonSchemaNodeMixin
        ],
    }
</script>

<style lang="scss" scoped>
    @import "../EvJsonSchemaEditor";
</style>

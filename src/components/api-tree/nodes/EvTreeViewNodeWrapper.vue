<template>
    <div class="ev-tree-view-node-wrapper">
        <ev-tree-view-group-node v-if="checkIsGroup(node)"
                                 ref="ev-tree-view-group-node"
                                 :node="node"
                                 :selected-node="selectedNode"
                                 :focused-node="focusedNode"
                                 :focused-nodes="focusedNodes"
                                 :copied-node="copiedNode"
                                 :copied-nodes="copiedNodes"
                                 :moved-node="movedNode"
                                 :moved-nodes="movedNodes"
                                 :dragged-node="draggedNode"
                                 :dragged-nodes="draggedNodes"
                                 :shift="shift"
                                 :command="command"
                                 :highlight="highlight"
                                 @show-context-menu="emitShowContextMenu"
                                 @add-tree-view-node="emitAddTreeViewNode"
                                 @focus-tree-view-node="emitFocusTreeViewNode"
                                 @select-tree-view-node="emitSelectTreeViewNode"
                                 @toggle-tree-view-node="emitToggleTreeViewNode"
                                 @drag-tree-view-node="emitDragTreeViewNode"
                                 @update-tree-view-node="emitUpdateTreeViewNode"></ev-tree-view-group-node>

        <ev-tree-view-http-request-node v-if="checkIsHttpRequest(node)"
                                        ref="ev-tree-view-request-node"
                                        :node="node"
                                        :selected-node="selectedNode"
                                        :focused-node="focusedNode"
                                        :focused-nodes="focusedNodes"
                                        :copied-node="copiedNode"
                                        :copied-nodes="copiedNodes"
                                        :moved-node="movedNode"
                                        :moved-nodes="movedNodes"
                                        :dragged-node="draggedNode"
                                        :dragged-nodes="draggedNodes"
                                        :shift="shift"
                                        :command="command"
                                        :highlight="highlight"
                                        @show-context-menu="emitShowContextMenu"
                                        @add-tree-view-node="emitAddTreeViewNode"
                                        @focus-tree-view-node="emitFocusTreeViewNode"
                                        @select-tree-view-node="emitSelectTreeViewNode"
                                        @toggle-tree-view-node="emitToggleTreeViewNode"
                                        @drag-tree-view-node="emitDragTreeViewNode"
                                        @update-tree-view-node="emitUpdateTreeViewNode"></ev-tree-view-http-request-node>

        <ev-tree-view-node-divider :flatten-tree="flattenTree"
                                   :node="node"
                                   :parent-node="parentTreeNode"
                                   :dragged-node="draggedNode"
                                   @show-context-menu="emitShowContextMenu"
                                   @select-tree-view-node="emitSelectTreeViewNode"
                                   @focus-tree-view-node="emitFocusTreeViewNode"
                                   @drop-tree-view-node="emitDropTreeViewNode"></ev-tree-view-node-divider>
    </div>
</template>

<script>
    import EvTreeViewNodeMixin from '@/components/api-tree/mixins/EvTreeViewNodeMixin'
    import EvTreeViewGroupNode from '@/components/api-tree/nodes/EvTreeViewGroupNode'
    import EvTreeViewHttpRequestNode from '@/components/api-tree/nodes/EvTreeViewHttpRequestNode'
    import EvTreeViewNodeDivider from '@/components/api-tree/components/EvTreeViewNodeDivider'
    import GHCFlattenTree from '@/components/mixins/GHCFlattenTree'

    export default {
        name: "EvTreeViewNodeWrapper",

        components: {
            EvTreeViewNodeDivider,
            EvTreeViewGroupNode,
            EvTreeViewHttpRequestNode,
        },

        mixins: [
            EvTreeViewNodeMixin
        ],

        props: {
            flattenTree: GHCFlattenTree
        },

        computed: {
            parentTreeNode() {
                return this.flattenTree.getParent(this.node)
            },
        },

        methods: {
            doRename() {
                if (this.checkIsGroup(this.node)) {
                    this.$refs['ev-tree-view-group-node'].doRename()
                }

                if (this.checkIsHttpRequest(this.node)) {
                    this.$refs['ev-tree-view-request-node'].doRename()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-tree-view-node-wrapper {
        display: flex;

        flex-direction: column;
    }
</style>

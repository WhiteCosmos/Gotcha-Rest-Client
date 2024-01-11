<template>
    <div class="ev-export-tree-view">
        <ev-request-tree-view-group-node ref="export-tree-view-group-node"
                                         v-for="treeNode in treeNodes"
                                         :tree-node="treeNode"
                                         @select="emitSelectTreeNode"></ev-request-tree-view-group-node>

        <ev-request-tree-view-node v-for="treeNode in treeNodes"
                                   :tree-node="treeNode"
                                   @click.native="emitSelectTreeNode(treeNode)"></ev-request-tree-view-node>
    </div>
</template>

<script>

    import EvRequestTreeViewGroupNode from '@/components/dynamic-variable/request-chain/request-tree-view/EvRequestTreeViewGroupNode'
    import EvRequestTreeViewNode from '@/components/dynamic-variable/request-chain/request-tree-view/EvRequestTreeViewNode'

    export default {
        name: "EvRequestTreeView",

        components: {
            EvRequestTreeViewNode,
            EvRequestTreeViewGroupNode
        },

        props: {
            treeNodes: Array
        },

        data() {
            return {}
        },

        computed: {},

        methods: {
            reset() {
                let groups = this.$refs['export-tree-view-group-node']

                groups.forEach(group => {
                    group.collapse()
                })
            },

            emitSelectTreeNode(treeNode) {
                this.$emit('select', treeNode)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-export-tree-view {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        width: 100%;

        height: 100%;
    }
</style>

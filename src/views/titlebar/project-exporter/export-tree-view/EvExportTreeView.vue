<template>
    <div class="ev-export-tree-view">
        <ev-export-tree-view-group-node ref="export-tree-view-group-node"
                                        v-for="treeNode in treeNodes"
                                        :tree-node="treeNode"></ev-export-tree-view-group-node>
    </div>
</template>

<script>
    import EvExportTreeViewGroupNode from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewGroupNode'

    export default {
        name: "EvExportTreeView",

        components: {
            EvExportTreeViewGroupNode
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

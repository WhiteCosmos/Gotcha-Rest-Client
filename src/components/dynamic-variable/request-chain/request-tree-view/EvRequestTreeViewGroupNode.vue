<template>
    <div class="d-flex flex-column" v-if="treeNode.isContainer && totalItemCount !== 0">
        <div class="ev-export-tree-view-node" @click="expand = !expand">
            <div class="ev-export-tree-view-node__icon">
                <ev-arrow-down color="#AABBCC" v-if="expand"></ev-arrow-down>

                <ev-arrow-right color="#AABBCC" v-else></ev-arrow-right>
            </div>

            <div class="ev-export-tree-view-node__block">
                <ev-folder-open-icon v-if="expand"></ev-folder-open-icon>

                <ev-folder-close-icon v-else></ev-folder-close-icon>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" bold secondary>{{ treeNode.name }}</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
        </div>

        <div v-if="expand" style="padding-left: 8px">
            <ev-request-tree-view-node v-for="child in treeNode.children"
                                       :tree-node="child"
                                       @click.native="$emit('select', child)"></ev-request-tree-view-node>
        </div>
    </div>
</template>

<script>
    import EvArrowDown from '@/components/icon/ev-arrow-down'
    import EvArrowRight from '@/components/icon/ev-arrow-right'
    import EvLabel from '@/components/typography/EvLabel'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvCounterLabel from '@/components/label/EvCounterLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvFolderCloseIcon from '@/components/api-tree/icons/ev-folder-close-icon'
    import EvFolderOpenIcon from '@/components/api-tree/icons/ev-folder-open-icon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvCounterRatioLabel from '@/components/label/EvCounterRatioLabel'
    import EvRequestTreeViewMixin from '@/components/dynamic-variable/request-chain/request-tree-view/EvRequestTreeViewMixin'
    import EvRequestTreeViewNode from '@/components/dynamic-variable/request-chain/request-tree-view/EvRequestTreeViewNode'

    export default {
        name: "EvRequestTreeViewGroupNode",

        components: {
            EvCounterRatioLabel,
            EvFolderOpenIcon,
            EvFolderCloseIcon,
            EvRequestTreeViewNode,
            EvVerticalGutter,
            EvCounterLabel,
            EvExportCheckBox,
            EvLabel,
            EvArrowRight,
            EvArrowDown
        },

        mixins: [
            EvStoreMixin,
            EvRequestTreeViewMixin
        ],

        props: {
            treeNode: Object,
        },

        data() {
            return {
                expand: false,
            }
        },

        computed: {
            checkedStatus: {
                set(status) {
                    if (status === 'CHECKED') {
                        this.makeGroupTreeNodeSelected(this.treeNode)
                    }

                    if (status === 'UNCHECKED') {
                        this.makeGroupTreeNodeUnselected(this.treeNode)
                    }
                },

                get() {
                    if (this.checkIsEveryTreeNodeSelected(this.treeNode)) {
                        return 'CHECKED'
                    }

                    if (this.checkIsAnyTreeNodeSelected(this.treeNode)) {
                        return 'HALF_CHECKED'
                    }

                    if (this.checkIsNoTreeNodeSelected(this.treeNode)) {
                        return 'UNCHECKED'
                    }
                },
            },

            selectedItemCount() {
                return this.getSelectedChildren(this.treeNode).length
            },

            totalItemCount() {
                return this.getChildren(this.treeNode).length
            },
        },

        methods: {
            collapse() {
                this.expand = false
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestTreeView";

    .ev-export-tree-view-node-wrapper {
        display: flex;

        flex-direction: column;
    }
</style>

<template>
    <div class="d-flex flex-column" v-if="treeNode.isContainer && totalItemCount !== 0">
        <div class="ev-export-tree-view-node" @click="expand = !expand">
            <div class="ev-export-tree-view-node__icon">
                <ev-arrow-down color="#AABBCC" v-if="expand"></ev-arrow-down>

                <ev-arrow-right color="#AABBCC" v-else></ev-arrow-right>
            </div>

            <div class="ev-export-tree-view-node__block">
                <ev-export-check-box v-model="checkedStatus" @click.native.stop=""></ev-export-check-box>
            </div>

            <div class="ev-export-tree-view-node__block">
                <ev-folder-open-icon v-if="expand"></ev-folder-open-icon>

                <ev-folder-close-icon v-else></ev-folder-close-icon>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" bold secondary>{{ treeNode.name }}</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-counter-ratio-label :nu="selectedItemCount" :de="totalItemCount"></ev-counter-ratio-label>
        </div>

        <div v-if="expand">
            <ev-export-tree-view-node v-for="child in treeNode.children"
                                      :tree-node="child"></ev-export-tree-view-node>
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
    import EvExportTreeViewNode from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewNode'
    import EvFolderCloseIcon from '@/components/api-tree/icons/ev-folder-close-icon'
    import EvFolderOpenIcon from '@/components/api-tree/icons/ev-folder-open-icon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvExportTreeViewMixin from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewMixin'
    import EvCounterRatioLabel from '@/components/label/EvCounterRatioLabel'

    export default {
        name: "EvExportTreeViewGroupNode",

        components: {
            EvCounterRatioLabel,
            EvFolderOpenIcon,
            EvFolderCloseIcon,
            EvExportTreeViewNode,
            EvVerticalGutter,
            EvCounterLabel,
            EvExportCheckBox,
            EvLabel,
            EvArrowRight,
            EvArrowDown
        },

        mixins: [
            EvStoreMixin,
            EvExportTreeViewMixin
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
    @import "EvExportTreeView";

    .ev-export-tree-view-node-wrapper {
        display: flex;

        flex-direction: column;
    }
</style>

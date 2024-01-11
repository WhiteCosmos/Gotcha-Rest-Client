<template>
    <div class="ev-export-tree-view-node" v-if="!treeNode.isContainer">
        <ev-vertical-gutter :gutter="24"></ev-vertical-gutter>

        <div class="ev-export-tree-view-node__block">
            <ev-export-check-box v-model="checkedStatus"></ev-export-check-box>
        </div>

        <div class="ev-export-tree-view-node__block">
            <ev-lighting-icon color="#FFB900"></ev-lighting-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label size="11" bold secondary>{{ treeNode.name }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLightingIcon from '@/components/api-tree/icons/ev-lighting-icon'
    import EvExportTreeViewMixin from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewMixin'

    export default {
        name: "EvExportTreeViewNode",

        components: {
            EvLightingIcon,
            EvVerticalGutter,
            EvExportCheckBox,
            EvLabel
        },

        mixins: [
            EvExportTreeViewMixin
        ],

        props: {
            treeNode: Object,
        },

        data() {
            return {}
        },

        computed: {
            checkedStatus: {
                set(status) {
                    if (status === 'CHECKED') {
                        this.addExportConfig(this.treeNode, this.selectedExportConfig)
                    }

                    if (status === 'UNCHECKED') {
                        this.removeExportConfig(this.treeNode, this.selectedExportConfig)
                    }
                },

                get() {
                    if (this.checkIsTreeNodeSelected(this.treeNode)) {
                        return 'CHECKED'
                    } else {
                        return 'UNCHECKED'
                    }
                },
            }
        },

        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "EvExportTreeView";

</style>

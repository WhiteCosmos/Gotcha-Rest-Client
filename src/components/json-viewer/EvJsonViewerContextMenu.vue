<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu v-if="focusedNode && focusedNode.isContainer">
            <ev-context-menu-item @click.native="emitCopyJson">{{ $t('copyJson') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="emitCopyJsonPath">{{ $t('copyJsonPath') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="emitExpandAll">{{ $t('expandAll') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="emitCollapseAll">{{ $t('collapseAll') }}</ev-context-menu-item>
        </ev-context-menu>

        <ev-context-menu v-else>
            <ev-context-menu-item @click.native="emitCopyJson">{{ $t('copyJson') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="emitCopyJsonPath">{{ $t('copyJsonPath') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="emitAddAssertion">{{ $t('addAssertion') }}</ev-context-menu-item>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'

    export default {
        name: "EvJsonViewerContextMenu",

        components: {
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu
        },

        mixins: [
            EvContextMenuMixin
        ],

        props: {
            focusedNode: Object,
        },

        data() {
            return {
                showContextMenu: false
            }
        },

        i18n: {
            messages: {
                en: {
                    copyJson: "Copy Json",

                    copyJsonPath: "Copy Json Path",

                    expandAll: "Expand All",

                    collapseAll: "Collapse All",

                    addAssertion: "Add Assertion"
                },
                zh: {
                    copyJson: "复制 Json",

                    copyJsonPath: "复制 Json Path",

                    expandAll: "展开全部",

                    collapseAll: "收起全部",

                    addAssertion: "添加断言"
                }
            }
        },

        methods: {
            show(event) {
                this.doShowContextMenu(event)
            },

            hide() {
                this.doHideContextMenu()
            },

            emitCopyJson() {
                this.$emit('copy-json', this.focusedNode)
            },

            emitCopyJsonPath() {
                this.$emit('copy-jsonpath', this.focusedNode)
            },

            emitExpandAll() {
                this.$emit('expand-all', this.focusedNode)
            },

            emitCollapseAll() {
                this.$emit('collapse-all', this.focusedNode)
            },

            emitAddAssertion() {
                this.$emit('add-assertion', this.focusedNode)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

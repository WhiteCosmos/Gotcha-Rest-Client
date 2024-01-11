<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu>
            <ev-context-menu-item @click.stop.native="doAddHttpRequest" :hotkeys="['⌃', '⌘', 'N']">{{ $t('EvApiTreeViewContextMenu.newRequest') }}
            </ev-context-menu-item>

            <!--            <ev-context-menu-item @click.stop.native="">New Mock</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.stop.native="">New Definition</ev-context-menu-item>-->

            <!--            <ev-context-menu-divider></ev-context-menu-divider>-->

            <ev-context-menu-item @click.stop.native="doAddGroup" :hotkeys="['⇧', '⌘', 'N']">{{ $t('EvApiTreeViewContextMenu.newGroup') }}
            </ev-context-menu-item>

            <ev-context-submenu-item>{{ $t('EvApiTreeViewContextMenu.createFromTemplate') }}
                <template v-slot:items>
                    <ev-context-menu-item @click.native="doAddFromTemplate(template)" v-for="template in templates">
                        {{ template.name }}
                    </ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-submenu-item>{{ $t('exportTo') }}
                <template v-slot:items>
                    <ev-context-menu-item @click.native="doExportTo('postman')">Postman V2</ev-context-menu-item>

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <ev-context-menu-item @click.native="doExportTo('markdown')">Markdown</ev-context-menu-item>

                    <ev-context-menu-item @click.native="doExportTo('curl')">cURL</ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <!--                <ev-context-menu-item @click.stop.native="doGroupTreeViewNodes" :hotkeys="['⌃', '⌘', 'G']">Import From</ev-context-menu-item>-->

            <!--                <ev-context-menu-item @click.stop.native="doUngroupTreeViewNodes" :hotkeys="['⇧', '⌘', 'G']">Export To</ev-context-menu-item>-->

            <!--                <ev-context-menu-divider></ev-context-menu-divider>-->

            <!--                <ev-context-menu-item @click.stop.native="doRenameTreeViewNode" :hotkeys="['⇧', '⌘', 'R']">Rename</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.stop.native="" :hotkeys="['⌘', 'G']">Group</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.stop.native="" :hotkeys="['⇧', '⌘', 'G']">Ungroup</ev-context-menu-item>-->

            <ev-context-menu-item @click.stop.native="doExpandAllTreeViewNodes">{{ $t('EvApiTreeViewContextMenu.expandAll') }}</ev-context-menu-item>

            <ev-context-menu-item @click.stop.native="doCollapseAllTreeViewNodes">{{ $t('EvApiTreeViewContextMenu.collapseAll') }}</ev-context-menu-item>

<!--            <ev-context-menu-divider></ev-context-menu-divider>-->

            <!--            <ev-context-menu-item @click.stop.native="">{{ $t('batchRun') }}</ev-context-menu-item>-->

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.stop.native="doRenameTreeViewNode" :hotkeys="['⇧', '⌘', 'R']">{{ $t('EvContextMenu.rename') }}</ev-context-menu-item>

            <ev-context-menu-item @click.stop.native="doMoveTreeViewNode" :hotkeys="['⌘', 'X']">{{ $t('EvContextMenu.cut') }}</ev-context-menu-item>

            <ev-context-menu-item @click.stop.native="doCopyTreeViewNode" :hotkeys="['⌘', 'C']">{{ $t('EvContextMenu.copy') }}</ev-context-menu-item>

            <ev-context-menu-item @click.stop.native="doPasteTreeViewNode" :hotkeys="['⌘', 'V']">{{ $t('EvContextMenu.paste') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.stop.native="doRemoveTreeViewNode" :hotkeys="['⌘', '⌫']">{{ $t('EvContextMenu.remove') }}</ev-context-menu-item>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvTreeViewNodeMixin from '@/components/api-tree/mixins/EvTreeViewNodeMixin'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextSubmenuItem from '@/components/menu/EvContextSubmenuItem'
    import EvProTag from '@/components/tag/EvProTag.vue'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'

    export default {
        name: "EvApiTreeViewGroupContextMenu",

        components: {
            EvProTag,
            EvContextSubmenuItem,
            EvContextMenuItem,
            EvContextMenu,
            EvContextMenuDivider
        },

        mixins: [
            EvTreeViewNodeMixin,
            EvContextMenuMixin,
            EvStoreMixin,
        ],

        props: {
            blank: Boolean,
        },

        computed: {
            templates() {
                return this.currentProject.requestTemplates
            },

            isGroupNode() {
                return this.node && this.node.type === "GROUP"
            },
        },

        methods: {
            doAddHttpRequest() {
                this.showContextMenu = false

                this.$emit('add-http-request', this.node)
            },

            doAddGroup() {
                this.showContextMenu = false

                this.$emit('add-group', this.node)
            },

            doAddFromTemplate(template) {
                this.showContextMenu = false

                this.$emit('add-from-template', this.node, template)
            },

            doGroupTreeViewNodes() {
                this.showContextMenu = false

                this.$emit('group-tree-view-nodes', this.node)
            },

            doUngroupTreeViewNodes() {
                this.showContextMenu = false

                this.$emit('ungroup-tree-view-nodes', this.node)
            },

            doExpandAllTreeViewNodes() {
                this.showContextMenu = false

                this.$emit('expand-all-tree-view-nodes', this.node)
            },

            doCollapseAllTreeViewNodes() {
                this.showContextMenu = false

                this.$emit('collapse-all-tree-view-nodes', this.node)
            },

            doRenameTreeViewNode() {
                this.showContextMenu = false

                this.emitRenameTreeViewNode()
            },

            doCopyTreeViewNode() {
                this.showContextMenu = false

                this.emitCopyTreeViewNode()
            },

            doMoveTreeViewNode() {
                this.showContextMenu = false

                this.emitMoveTreeViewNode()
            },

            doPasteTreeViewNode() {
                this.showContextMenu = false

                this.emitPasteTreeViewNode()
            },

            doRemoveTreeViewNode() {
                this.showContextMenu = false

                this.emitRemoveTreeViewNode()
            },

            doImportPostmanCollection() {
                this.showContextMenu = false

                this.emitImportFrom('postman')
            },

            doExportTo(type) {
                this.showContextMenu = false

                this.$emit('export-to', this.node, type)
            },

            show(event) {
                this.doShowContextMenu(event)
            },

            hide(event) {
                this.doHideContextMenu()
            }
        },

        i18n: {
            messages: {
                en: {
                    exportTo: "Export To...",

                    batchRun: "Send All Requests",

                    createFromTemplate: "From Template ..."
                },
                zh: {
                    exportTo: "导出为...",

                    batchRun: "批量运行",

                    createFromTemplate: "通过模板创建 ..."
                },
                zh_TW: {
                    exportTo: "匯出為...",

                    batchRun: "批次執行",

                    createFromTemplate: "透過範本建立 ..."
                },
                jp: {
                    exportTo: "エクスポート...",

                    batchRun: "一括実行",

                    createFromTemplate: "テンプレートから作成...",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu>
            <ev-context-menu-item @click.stop.native="doAddHttpRequest" :hotkeys="['⌃', '⌘', 'N']">New Request</ev-context-menu-item>

            <ev-context-menu-item @click.stop.native="doAddGroup" :hotkeys="['⇧', '⌘', 'N']">New Group</ev-context-menu-item>

            <!--            <ev-context-menu-divider></ev-context-menu-divider>-->

            <!--            <ev-context-menu-item @click.stop.native="">Import From</ev-context-menu-item>-->

            <div v-if="isGroupNode">
                <ev-context-menu-divider></ev-context-menu-divider>

                <!--                <ev-context-menu-item @click.stop.native="">Import From</ev-context-menu-item>-->

                <!--                <ev-context-menu-item @click.stop.native="">Export To</ev-context-menu-item>-->

                <ev-context-submenu-item>Import From</ev-context-submenu-item>
            </div>

            <div v-if="!blank">
                <ev-context-menu-divider></ev-context-menu-divider>

                <!--                <ev-context-menu-item @click.stop.native="doGroupTreeViewNodes" :hotkeys="['⌃', '⌘', 'G']">Import From</ev-context-menu-item>-->

                <!--                <ev-context-menu-item @click.stop.native="doUngroupTreeViewNodes" :hotkeys="['⇧', '⌘', 'G']">Export To</ev-context-menu-item>-->

                <!--                <ev-context-menu-divider></ev-context-menu-divider>-->

                <!--                <ev-context-menu-item @click.stop.native="doRenameTreeViewNode" :hotkeys="['⇧', '⌘', 'R']">Rename</ev-context-menu-item>-->

                <ev-context-menu-item @click.stop.native="doMoveTreeViewNode" :hotkeys="['⌘', 'X']">Cut</ev-context-menu-item>

                <ev-context-menu-item @click.stop.native="doCopyTreeViewNode" :hotkeys="['⌘', 'C']">Copy</ev-context-menu-item>

                <ev-context-menu-item @click.stop.native="doPasteTreeViewNode" :hotkeys="['⌘', 'V']">Paste</ev-context-menu-item>

                <ev-context-menu-divider></ev-context-menu-divider>

                <ev-context-menu-item @click.stop.native="doRemoveTreeViewNode" :hotkeys="['⌘', '⌫']">Remove</ev-context-menu-item>
            </div>
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

    export default {
        name: "EvApiTreeViewContextMenu",

        components: {
            EvContextSubmenuItem,
            EvContextMenuItem,
            EvContextMenu,
            EvContextMenuDivider
        },

        mixins: [
            EvTreeViewNodeMixin,
            EvContextMenuMixin,
        ],

        props: {
            blank: Boolean,
        },

        computed: {
            isGroupNode() {
                return this.node && this.node.type === "GROUP"
            }
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

            doGroupTreeViewNodes() {
                this.showContextMenu = false

                this.$emit('group-tree-view-nodes', this.node)
            },

            doUngroupTreeViewNodes() {
                this.showContextMenu = false

                this.$emit('ungroup-tree-view-nodes', this.node)
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

            show(event) {
                this.doShowContextMenu(event)
            },

            hide(event) {
                this.doHideContextMenu()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

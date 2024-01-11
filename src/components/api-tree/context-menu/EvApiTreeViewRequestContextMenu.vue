<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu>
            <ev-context-menu-item @click.stop.native="doAddHttpRequest" :hotkeys="['⌃', '⌘', 'N']">
                {{ $t('EvApiTreeViewContextMenu.newRequest') }}
            </ev-context-menu-item>

            <!--            <ev-context-menu-item @click.stop.native="doAddWebsocketRequest">-->
            <!--                创建 WS 请求-->
            <!--            </ev-context-menu-item>-->

            <ev-context-menu-item @click.stop.native="doAddGroup" :hotkeys="['⇧', '⌘', 'N']">
                {{ $t('EvApiTreeViewContextMenu.newGroup') }}
            </ev-context-menu-item>

            <ev-context-submenu-item>{{ $t('EvApiTreeViewContextMenu.createFromTemplate') }}
                <template v-slot:items>
                    <ev-context-menu-item @click.native="doAddFromTemplate(template)"
                                          v-for="template in templates">{{ template.name }}
                    </ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <!--            <ev-context-menu-item @click.stop.native="">快速访问</ev-context-menu-item>-->

            <!--            <ev-context-menu-divider></ev-context-menu-divider>-->

            <!--            <ev-context-menu-item @click.stop.native="" :hotkeys="['⌘', 'G']">Group</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.stop.native="" :hotkeys="['⇧', '⌘', 'G']">Ungroup</ev-context-menu-item>-->

            <!--            <ev-context-menu-divider></ev-context-menu-divider>-->

            <!--                <ev-context-menu-item @click.stop.native="doGroupTreeViewNodes" :hotkeys="['⌃', '⌘', 'G']">Import From</ev-context-menu-item>-->

            <!--                <ev-context-menu-item @click.stop.native="doUngroupTreeViewNodes" :hotkeys="['⇧', '⌘', 'G']">Export To</ev-context-menu-item>-->

            <!--                <ev-context-menu-divider></ev-context-menu-divider>-->

            <!--                <ev-context-menu-item @click.stop.native="doRenameTreeViewNode" :hotkeys="['⇧', '⌘', 'R']">Rename</ev-context-menu-item>-->

            <ev-context-menu-item @click.stop.native="doRenameTreeViewNode" :hotkeys="['⇧', '⌘', 'R']">{{ $t('EvContextMenu.rename') }}</ev-context-menu-item>

            <ev-context-menu-item @click.stop.native="doMoveTreeViewNode" :hotkeys="['⌘', 'X']">{{ $t('EvContextMenu.cut') }}</ev-context-menu-item>

            <ev-context-menu-item @click.stop.native="doCopyTreeViewNode" :hotkeys="['⌘', 'C']">{{ $t('EvContextMenu.copy') }}</ev-context-menu-item>

            <ev-context-submenu-item label="Copy as">{{ $t('copyAs') }}
                <template v-slot:items>
                    <ev-context-menu-item @click.native="doCopyTreeViewNodeAs('curl')">cURL</ev-context-menu-item>

                    <ev-context-menu-item @click.native="doCopyTreeViewNodeAs('markdown')">Markdown</ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-context-menu-item @click.stop.native="doDuplicateTreeViewNode" :hotkeys="['⌘', 'D']">{{ $t('EvContextMenu.duplicate') }}</ev-context-menu-item>

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
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import EvProTag from '@/components/tag/EvProTag.vue'

    export default {
        name: "EvApiTreeViewRequestContextMenu",

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
            isGroupNode() {
                return this.node && this.node.type === "GROUP"
            },

            templates() {
                return this.currentProject.requestTemplates
            },
        },

        methods: {
            doAddHttpRequest() {
                this.showContextMenu = false

                this.$emit('add-http-request', this.node)
            },

            doAddWebsocketRequest() {
                this.showContextMenu = false

                this.$emit('add-websocket-request', this.node)
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

            doRenameTreeViewNode() {
                this.showContextMenu = false

                this.emitRenameTreeViewNode()
            },

            doMoveTreeViewNode() {
                this.showContextMenu = false

                this.emitMoveTreeViewNode()
            },

            doCopyTreeViewNode() {
                this.showContextMenu = false

                this.emitCopyTreeViewNode()
            },

            doCopyTreeViewNodeAs(type) {
                this.showContextMenu = false

                this.$emit('copy-tree-view-node-as', this.node, type)
            },

            doDuplicateTreeViewNode() {
                this.showContextMenu = false

                this.emitDuplicateTreeViewNode()
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
        },

        i18n: {
            messages: {
                en: {
                    copyAs: "Copy As ..."
                },
                zh: {
                    copyAs: "拷贝为 ..."
                },
                zh_TW: {
                    copyAs: "複製為 ..."
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

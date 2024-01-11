<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu>
            <ev-context-menu-item @click.stop.native="doAddHttpRequest" :hotkeys="['⌃', '⌘', 'N']">{{ $t('EvApiTreeViewContextMenu.newRequest') }}
            </ev-context-menu-item>

            <!--            <ev-context-menu-item @click.stop.native="doAddHttpRequest">创建模拟请求</ev-context-menu-item>-->

            <ev-context-menu-item @click.stop.native="doAddGroup" :hotkeys="['⇧', '⌘', 'N']">{{ $t('EvApiTreeViewContextMenu.newGroup') }}
            </ev-context-menu-item>

            <ev-context-submenu-item>{{ $t('EvApiTreeViewContextMenu.createFromTemplate') }}
                <template v-slot:items>
                    <ev-context-menu-item v-for="template in templates"
                                          @click.native="doAddFromTemplate(template)">{{ template.name }}
                    </ev-context-menu-item>

                    <ev-context-menu-item v-if="templates.length === 0">{{ $t('noTemplate') }}</ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.stop.native="doOpenImportFromFileDialog" :hotkeys="['⇧', '⌘', 'O']">{{ $t('EvApiTreeViewContextMenu.importFromFile')
                }}
            </ev-context-menu-item>
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
    name: "EvApiTreeViewBlankContextMenu",

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

            doOpenImportFromFileDialog() {
                this.showContextMenu = false

                this.emitOpenImportFromFileDialog()
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
                    noTemplate: "No Template"
                },
                zh: {
                    noTemplate: "没有请求模板"
                },
                zh_TW: {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

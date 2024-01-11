<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu v-if="contextMenuType === 'jsonSchemaGroup'">
            <ev-context-menu-item @click.native="doRenameJsonSchemaGroup">{{ $t('rename') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="doRemoveJsonSchemaGroup">{{ $t('remove') }}</ev-context-menu-item>
        </ev-context-menu>

        <ev-context-menu v-if="contextMenuType === 'jsonSchema'">
            <ev-context-menu-item @click.native="doRenameJsonSchema">{{ $t('rename') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="doCloneJsonSchema">{{ $t('clone') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="doRemoveJsonSchema">{{ $t('remove') }}</ev-context-menu-item>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvTreeViewNodeMixin from '@/components/api-tree/mixins/EvTreeViewNodeMixin'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'

    export default {
        name: "EvJsonSchemaManagerContextMenu",

        components: {
            EvContextMenuItem,
            EvContextMenu,
            EvContextMenuDivider
        },

        mixins: [
            EvTreeViewNodeMixin,
            EvContextMenuMixin,
        ],

        props: {
            contextMenuType: String,

            focusedJsonSchemaGroup: Object,

            focusedJsonSchema: Object
        },

        methods: {
            doRenameJsonSchemaGroup() {
                this.showContextMenu = false

                this.$emit('rename-json-schema-group', this.focusedJsonSchemaGroup)
            },

            doRemoveJsonSchemaGroup() {
                this.showContextMenu = false

                this.$emit('remove-json-schema-group', this.focusedJsonSchemaGroup)
            },

            doRenameJsonSchema() {
                this.showContextMenu = false

                this.$emit('rename-json-schema', this.focusedJsonSchema)
            },

            doCloneJsonSchema() {
                this.showContextMenu = false

                this.$emit('clone-json-schema', this.focusedJsonSchema)
            },

            doRemoveJsonSchema() {
                this.showContextMenu = false

                this.$emit('remove-json-schema', this.focusedJsonSchema)
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
                    rename: "Rename",

                    clone: "Clone",

                    remove: "Remove"
                },
                zh: {
                    rename: "重命名",

                    clone: "克隆",

                    remove: "删除"
                },
                zh_TW: {
                    "rename": "重命名",

                    "clone": "複製",

                    "remove": "刪除"
                },
                jp: {
                    rename: "名前を変更",

                    clone: "複製",

                    remove: "削除",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

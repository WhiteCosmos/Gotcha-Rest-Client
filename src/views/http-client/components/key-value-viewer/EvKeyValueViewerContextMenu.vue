<template>
    <v-menu v-model="showContextMenu" transition="v-fade-transition" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu>
            <ev-context-menu-item @click.native="$emit('copy-key-value')">{{ $t('copyKeyValue') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="$emit('add-assertion')">{{ $t('addAssertion') }}</ev-context-menu-item>
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'

    export default {
        name: "EvKeyValueViewerContextMenu",

        components: {
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu
        },

        mixins: [
            EvContextMenuMixin
        ],

        props: {
            focusedNode: Object
        },

        data() {
            return {
                showContextMenu: false
            }
        },

        methods: {
            show(event) {
                this.doShowContextMenu(event)
            },

            hide() {
                this.doHideContextMenu()
            },
        },

        i18n: {
            messages: {
                en: {
                    copyKeyValue: "Copy Key-Value Pair",

                    addAssertion: "Add Assertion"
                },

                zh: {
                    copyKeyValue: "复制键值对",

                    addAssertion: "添加断言"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

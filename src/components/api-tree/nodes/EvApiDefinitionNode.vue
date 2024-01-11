<template>
    <div class="tree-view-node" @contextmenu.stop="doShowContextMenu($event)">
        <ev-vertical-gutter :gutter="16 * layer"></ev-vertical-gutter>

        <div class="tree-view-node__folder-icon">
            <ev-content-switch-button-api-icon></ev-content-switch-button-api-icon>
        </div>

<!--        <ev-api-http-method method="GET"></ev-api-http-method>-->

        <span class="tree-view-node__label">{{ node.name }}</span>

        <v-spacer></v-spacer>

        <v-icon size="11" color="#007AFF">fa-caret-left</v-icon>

        <v-menu v-model="showContextMenu" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
            <ev-context-menu>
                <ev-context-menu-item @click.native="doCreateHttpOperation">New Http Operation</ev-context-menu-item>

                <ev-context-menu-item @click.native="doCreateMockOperation">New Mock Operation</ev-context-menu-item>

                <ev-context-menu-divider></ev-context-menu-divider>

                <ev-context-menu-item @click.native="">Delete</ev-context-menu-item>
            </ev-context-menu>
        </v-menu>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpMethodTag from '@/components/typography/EvHttpMethodTag'
    import EvLightIcon from '@/components/icon/ev-light-icon'
    import EvContentSwitchButtonApiIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonApiIcon'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'

    export default {
        name: "EvApiDefinitionNode",

        components: {
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvContentSwitchButtonApiIcon,
            EvVerticalGutter,
            EvHttpMethodTag,
            EvLightIcon
        },

        mixins: [
            EvContextMenuMixin
        ],

        methods: {
            doCreateHttpOperation() {

            },

            doCreateMockOperation() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../EvApiTreeView";

</style>

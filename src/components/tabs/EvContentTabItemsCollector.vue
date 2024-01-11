<template>
    <v-menu v-bind="contentTabItemsCollectorMenuConfig" v-model="showContextMenu">
        <template v-slot:activator="{ on }">
            <div class="content-tab-items-collector" v-on="on">
                <div class="d-flex" style="padding-top: 0px">
                    <v-icon size="10" color="#999">fa-bars</v-icon>
                </div>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-counter>{{ hiddenContentTabs.length }}</ev-counter>
            </div>
        </template>

        <ev-context-menu>
            <ev-content-tab-items-collector-menu v-if="hiddenContentTabs.length > 0" :hidden-content-tabs="hiddenContentTabs"></ev-content-tab-items-collector-menu>

            <ev-context-menu-divider v-if="hiddenContentTabs.length > 0"></ev-context-menu-divider>

            <ev-context-menu-item @click.native="doCloseOtherTabs">{{ $t("EvContentTabContextMenu.closeOtherTabs") }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="doCloseAllTabs">{{ $t("EvContentTabContextMenu.closeAllTabs") }}</ev-context-menu-item>

            <!--            <ev-context-menu-divider></ev-context-menu-divider>-->

            <!--            <ev-context-menu-item>Save Session</ev-context-menu-item>-->
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvContentTabItemsCollectorMenu from '@/components/tabs/EvContentTabItemsCollectorMenu'
    import {
        EvContentTabsEventBus,
        EvContentTabsEvents
    } from '@/components/tabs/EvContentTabsEventBus'
    import EvCounter from '@/components/tag/EvCounter'
    import EvCounterLabel from '@/components/label/EvCounterLabel'

    export default {
        name: "EvContentTabItemsCollector",

        components: {
            EvCounterLabel,
            EvCounter,
            EvContentTabItemsCollectorMenu,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvPopupMenuDivider,
            EvPopupMenuItem,
            EvPopupMenu,
            EvVerticalGutter
        },

        mixins: [
            EvContextMenuMixin,
        ],

        props: {
            hiddenContentTabs: Array,
        },

        data() {
            return {
                contentTabItemsCollectorMenuConfig: {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'allow-overflow': true,

                    'nudge-bottom': 2,

                    'transition': 'dummy'
                },
            }
        },

        methods: {
            doCloseOtherTabs() {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_OTHER_CONTENT_TABS)
            },

            doCloseAllTabs() {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_ALL_CONTENT_TABS)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .content-tab-items-collector {
        width: fit-content;

        display: flex;

        //justify-content: center;

        align-items: center;

        height: 24px;

        user-select: none;

        background-color: white;

        @include component-shadow;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 3px;

        margin-right: 8px;

        margin-left: 8px;

        &__label {
            color: #AABBCC;

            font-weight: normal;

            font-size: 10px;

            line-height: 16px;
        }
    }
</style>

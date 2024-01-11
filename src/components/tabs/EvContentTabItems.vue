<template>
    <div class="ev-content-tab-items">
        <draggable v-model="contentTabs_"
                   @choose="dragging = true"
                   @start="dragging = true"
                   @end="dragging = false"
                   @update="emitUpdateContentTabs"
                   v-bind="dragOptions"
                   class="ev-content-tab-items__draggable">
            <ev-content-tab-item
                v-for="contentTab in contentTabs_"
                :key="contentTab.uid"
                :content-tab="contentTab"
                :selected-content-tab="selectedContentTab"
                :dragging="dragging"
                :sibling="checkIsSiblingContentTab(selectedContentTab, contentTab)"
                @contextmenu.native="handleShowContextMenu(contentTab, $event)"></ev-content-tab-item>
        </draggable>

        <div class="ev-content-tab-items__http-client-panel">
            <ev-content-tab-items-collector :hidden-content-tabs="hiddenContentTabs"></ev-content-tab-items-collector>
        </div>

        <div class="ev-content-tab-items__http-client-panel">
            <ev-http-client-panel></ev-http-client-panel>
        </div>

        <v-menu v-model="showContextMenu" transition='dummy' :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
            <ev-context-menu>
                <ev-context-menu-item @click.native="doCloseContentTab(targetContentTab)">{{ $t("EvContentTabContextMenu.closeTab") }}</ev-context-menu-item>

                <ev-context-menu-divider></ev-context-menu-divider>

                <ev-context-menu-item @click.native="doCloseOtherTabs(targetContentTab)">{{ $t("EvContentTabContextMenu.closeOtherTabs") }}
                </ev-context-menu-item>

                <ev-context-menu-item @click.native="doCloseTabsToTheLeft(targetContentTab)">{{ $t("EvContentTabContextMenu.closeTabsToTheLeft") }}
                </ev-context-menu-item>

                <ev-context-menu-item @click.native="doCloseTabsToTheRight(targetContentTab)">{{ $t("EvContentTabContextMenu.closeTabsToTheRight") }}
                </ev-context-menu-item>

                <ev-context-menu-divider></ev-context-menu-divider>

                <ev-context-menu-item @click.native="doCloseAllTabs()">{{ $t("EvContentTabContextMenu.closeAllTabs") }}</ev-context-menu-item>
            </ev-context-menu>
        </v-menu>
    </div>
</template>

<script>
    import EvContentTabItem from '@/components/tabs/EvContentTabItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvMenu from '@/components/menu/EvMenu'
    import draggable from 'vuedraggable'
    import EvContentTabItemsCollector from '@/components/tabs/EvContentTabItemsCollector'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvContentTabMixin from '@/components/tabs/EvContentTabMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvHttpClientPanel from '@/views/http-client/components/EvHttpClientPanel'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvSidebarIcon from '@/assets/icon/ev-sidebar-icon'

    export default {
        name: "EvContentTabItems",

        components: {
            EvSidebarIcon,
            EvHttpClientPanel,
            EvContextMenu,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContentTabItemsCollector,
            EvMenu,
            EvVerticalGutter,
            EvContentTabItem,
            draggable,
        },

        mixins: [
            EvContentTabMixin,
            EvContextMenuMixin,
        ],

        created() {
            this.contentTabs_ = this.contentTabs

            AppEventBus.$on(AppEvents.SHOW_CONTEXT_MENU, this.handleEmitShowContextMenu)
        },

        beforeDestroy() {
            AppEventBus.$off(AppEvents.SHOW_CONTEXT_MENU, this.handleEmitShowContextMenu)
        },

        watch: {
            contentTabs() {
                this.contentTabs_ = this.contentTabs
            }
        },

        props: {
            overviewContentTab: Object,

            selectedContentTab: Object,

            contentTabs: {
                type: Array,

                default: () => [],
            },

            hiddenContentTabs: {
                type: Array,

                default: () => [],
            }
        },

        data() {
            return {
                targetContentTab: undefined,

                dragging: false,

                contentTabs_: [], // Content Tabs Sort
            }
        },

        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    disabled: false,
                    direction: 'horizontal',
                    // draggable: '.content-tab-item--draggable',
                    swapThreshold: 1.5,
                    'drag-class': 'ev-content-tab-items__draggable-item',
                }
            }
        },

        methods: {
            handleEmitShowContextMenu() {
                this.showContextMenu = false
            },

            handleShowContextMenu(contentTab, event) {
                AppEventBus.$emit(AppEvents.SHOW_CONTEXT_MENU)

                if (this.checkContentTabIsProjectOverview(contentTab)) {
                    return
                }

                this.targetContentTab = contentTab

                this.doShowContextMenu(event)
            },

            emitUpdateContentTabs() {
                this.$emit('update-content-tabs', this.contentTabs_)
            },

            checkIsSiblingContentTab(source, target) {
                if (!source || !target) {
                    return false
                }

                let sid = this.contentTabs_.indexOf(source)

                let tid = this.contentTabs_.indexOf(target)

                return (tid - sid) === 1
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-content-tab-items {
        position: relative;

        display: flex;

        align-items: flex-end;

        height: 40px;

        padding-left: 16px;

        padding-right: 16px;

        background-color: #F2F2F2;

        &__draggable {
            display: flex;

            flex: 1;

            min-width: 1px;

            min-height: 1px;

            flex-direction: row;
        }

        &__draggable-item {
            border-radius: 5px;

            border: none;
        }

        &__overview-tab {
            display: flex;
        }

        &__http-client-panel {
            display: flex;

            padding-bottom: 8px;
        }
    }

    .content-tab-items-collector {
        display: flex;

        justify-content: center;

        align-content: center;
    }
</style>

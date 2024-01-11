<template>
    <div class="content-tab-items-collector-menu">
        <div class="content-tab-items-collector-menu__item" v-for="contentTab in hiddenContentTabs" @click="doSelectContentTab(contentTab)">
            <ev-content-tab-icon :content-tab="contentTab"></ev-content-tab-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="content-tab-items-collector-menu__item__label text-truncate">{{ getContentTabName(contentTab) }}</span>
        </div>
    </div>
</template>

<script>
    import EvContentTabItemsCollector from '@/components/tabs/EvContentTabItemsCollector'
    import EvLabel from '@/components/typography/EvLabel'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'
    import EvContentTabIcon from '@/components/tabs/EvContentTabIcon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvContentTabItemsCollectorMenu",

        components: {
            EvVerticalGutter,
            EvContentTabIcon,
            EvLabel,
            EvContentTabItemsCollector
        },

        props: {
            hiddenContentTabs: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },

        methods: {
            doSelectContentTab(contentTab) {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, contentTab)
            },

            getContentTabName(contentTab) {
                if (contentTab.treeNode) {
                    return contentTab.treeNode.name
                }

                return contentTab.name
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    //@import "~@/styles/scrollbar.scss";

    .content-tab-items-collector-menu {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        max-height: calc(100vh - 320px);

        width: 200px;

        user-select: none;

        overflow-y: overlay;

        &__item {
            display: flex;

            align-items: center;

            min-height: 1px;

            min-width: 1px;

            flex-shrink: 0;

            height: 28px;

            padding-left: 4px;

            border-radius: 3px;

            &:hover {
                background-color: #E0E0E0;
            }

            &__label {
                font-size: 11px;

                color: $SECONDARY_FONT_COLOR;

                font-weight: bolder;

                width: 80%;
            }
        }
    }
</style>

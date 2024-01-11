<template>
    <v-hover v-slot="{ hover }">
        <div :class="contentTabItemStyle"
             @click="doSelectContentTab(contentTab)">

            <div class="content-tab-item__divider" v-show="!isContentTabSelected && !sibling">
                <div style="width: 1px; height: 12px; background-color: #CCC"></div>
            </div>

            <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

            <ev-content-tab-icon :content-tab="contentTab" :selected-content-tab="selectedContentTab"></ev-content-tab-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="contentTabItemLabelStyle" class="text-truncate">{{ contentTabName }}</span>

            <v-spacer></v-spacer>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <transition name="fade" duration="50">
                <div class="content-tab-item__item-close flex-shrink-0"
                     v-show="hover"
                     @click.stop="doCloseContentTab(contentTab)">
                    <cancel-icon></cancel-icon>
                </div>
            </transition>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
        </div>
    </v-hover>
</template>

<script>
    import EvContentSwitchButtonApiIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonApiIcon'
    import EvContentSwitchButtonLightIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonLightIcon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import CancelIcon from '@/components/icon/cancel-icon'
    import EvMenu from '@/components/menu/EvMenu'
    import EvContentSwitchButtonStructIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonStructIcon'
    import EvContentTabMixin from '@/components/tabs/EvContentTabMixin'
    import EvContentTabIcon from '@/components/tabs/EvContentTabIcon'

    export default {
        name: "EvContentTabItem",

        components: {
            EvContentTabIcon,
            EvContentSwitchButtonStructIcon,
            EvMenu,
            CancelIcon,
            EvVerticalGutter,
            EvContentSwitchButtonLightIcon,
            EvContentSwitchButtonApiIcon
        },

        mixins: [
            EvContentTabMixin
        ],

        props: {
            contentTab: Object,

            selectedContentTab: Object,

            dragging: {
                type: Boolean,
                default: false,
            },

            sibling: {
                type: Boolean,
                default: false,
            }
        },

        data() {
            return {}
        },

        computed: {
            contentTabName() {
                if (!this.contentTab) {
                    return
                }

                if (this.contentTab.treeNode) {
                    return this.contentTab.treeNode.name
                }

                return this.contentTab.name
            },

            isContentTabSelected() {
                return this.contentTab === this.selectedContentTab
            },

            contentTabItemStyle() {
                return [
                    this.checkContentTabIsProjectOverview(this.contentTab) ? 'content-tab-item-overview' : 'content-tab-item',
                    this.isContentTabSelected ? 'content-tab-item--active' : 'content-tab-item--inactive'
                ]
            },

            contentTabItemLabelStyle() {
                return [
                    'content-tab-item__item-label',
                    this.isContentTabSelected ? 'content-tab-item__item-label--active' : 'content-tab-item__item-label--inactive'
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .content-tab-item-overview {
        position: relative;

        display: flex;

        flex-shrink: 0;

        align-items: center;

        user-select: none;

        width: 128px;

        min-width: 1px;

        align-self: flex-end;
    }

    .content-tab-item {
        position: relative;

        display: flex;

        align-items: center;

        user-select: none;

        max-width: 200px;

        min-width: 1px;

        flex: 1;

        align-self: flex-end;

        &__divider {
            position: absolute;

            display: flex;

            align-items: center;

            left: 0px;
        }

        &__item-hint {
            display: flex;

            align-items: center;

            justify-content: center;

            width: 16px;

            height: 16px;
        }

        &__item-close {
            position: absolute;

            top: 8px;

            right: 6px;

            @include full-center;

            @include rectangle(14px, 14px, 3px);

            //background-color: #ff6666;

            //z-index: 999;

            &:hover {
                background-color: #F1F1F1;
            }
        }

        &--active {
            padding-left: 4px;

            padding-right: 5px;

            height: 32px;

            background-color: white;

            border-radius: 4px 4px 0 0;

            border-bottom: 2px solid $SECONDARY_COLOR;

            box-shadow: 0px -2px 12px -8px $SHADOW_COLOR;
        }

        &--inactive {
            padding-left: 4px;

            padding-right: 5px;

            height: 32px;

            border-radius: 4px 4px 0 0;

            border-bottom: 2px solid transparent;

            background-color: transparent;

            transition: background-color 100ms;

            &:hover {
                background-color: #F8F8F8;
            }
        }

        &__item-label {
            &--active {
                font-size: 11px;

                font-weight: bold;

                color: $PRIMARY_COLOR;
            }

            &--inactive {
                font-size: 11px;

                font-weight: bold;

                color: $SECONDARY_FONT_COLOR;
            }
        }
    }

    .tooltip-container {
        background-color: #FAFAFA;

        border-radius: 3px;

        max-width: 240px;

        @include component-shadow;
    }
</style>

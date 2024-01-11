<template>
    <div class="content-switch-button">
        <div class="content-switch-button__switch-item" @click="switchToApiDefinition">
            <ev-content-switch-button-api-icon :active="contentTab.isApiDefinition()"
                                               :active-color="activeColor"
                                               :inactive-color="inactiveColor"></ev-content-switch-button-api-icon>

            <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

            <span :class="['content-switch-button__switch-item-label', contentTab.isApiDefinition() ? 'active': 'inactive']">{{ $t("EvContentSwitchButton.apiDefinition") }}</span>
        </div>

        <div class="content-switch-button__switch-item" @click="switchToHttpClient">
            <v-icon size="10" :color="contentTab.isApiHttpClient() ? activeColor : inactiveColor">fa-bolt</v-icon>

            <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

            <span :class="['content-switch-button__switch-item-label', contentTab.isApiHttpClient() ? 'active': 'inactive']">{{ $t("EvContentSwitchButton.apiHttpClient")
                }}</span>
        </div>

        <!--        <div :class="['content-switch-button__slider', contentTab.isApiDefinition() ? 'left' : 'right']">-->
        <!--            <div class="content-switch-button__slider-bar"></div>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import GHCContentTab, {contentTabTypes} from '@/components/tabs/GHCContentTab'
    import EvContentSwitchButtonApiIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonApiIcon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvContentSwitchButtonLightIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonLightIcon'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'

    export default {
        name: "EvContentSwitchButton",

        components: {
            EvContentSwitchButtonLightIcon,
            EvVerticalGutter,
            EvContentSwitchButtonApiIcon
        },

        props: {
            contentTab: GHCContentTab
        },

        data() {
            return {
                activeColor: "#007AFF",

                inactiveColor: "#AABBCC",
            }
        },

        computed: {},

        methods: {
            switchToApiDefinition() {
                this.contentTab.toApiDefinition()

                EvContentTabsEventBus.$emit(EvContentTabsEvents.SWITCH_TO_API_DEFINITION, this.contentTab)
            },

            switchToHttpClient() {
                this.contentTab.toApiHttpClient()

                EvContentTabsEventBus.$emit(EvContentTabsEvents.SWITCH_TO_HTTP_OPERATION, this.contentTab)
            },

            switchToMockClient() {
                this.contentTab.toApiMockClient()

                EvContentTabsEventBus.$emit(EvContentTabsEvents.SWITCH_TO_MOCK_OPERATION, this.contentTab)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .content-switch-button {
        @include horizon-center;

        @include rectangle(136px, 24px, 3px);

        box-shadow: inset 0px 0px 4px -2px $SHADOW_COLOR;

        //@include fill(#FCFCFC, #F1F1F1);

        background-color: #FAFAFA;

        //border: 1px solid #007AFF;

        padding-left: 4px;

        padding-right: 4px;

        &__switch-item {
            @include absolute-center;

            @include rectangle(80px, 4px, 0px);

            z-index: 1;
        }

        &__switch-item-label {
            padding-top: 2px;

            font-size: 10px;

            line-height: 16px;

            transition: .1s;

            &.active {
                font-weight: bold;

                color: $PRIMARY_COLOR;
            }

            &.inactive {
                font-weight: normal;

                color: $PLACEHOLDER_FONT_COLOR;
            }
        }

        &__slider {
            position: absolute;

            @include horizon-center;

            @include rectangle(152px, 20px, 2px);

            transition: .15s;

            &.left {
                padding-left: 0px;
            }

            &.center {

            }

            &.right {
                padding-left: 78px;
            }
        }

        &__slider-bar {
            @include rectangle(72px, 18px, 2px);

            //@include fill(#3395FF, null);

            background-color: #007AFF;

            //@include blue-background-gradient--horizontal;
        }
    }
</style>

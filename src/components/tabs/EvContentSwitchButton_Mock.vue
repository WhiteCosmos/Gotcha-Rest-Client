<template>
    <div class="content-switch-button">
        <div class="content-switch-button__switch-item" @click="contentTab.toApiDefinition()">
            <ev-content-switch-button-api-icon :active="contentTab.isApiDefinition()"
                                               :active-color="activeColor"
                                               :inactive-color="inactiveColor"></ev-content-switch-button-api-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="['content-switch-button__switch-item-label', contentTab.isApiDefinition() ? 'active': 'inactive']">{{ $t("EvContentSwitchButton.apiDefinition")
                }}</span>
        </div>

        <div class="content-switch-button__switch-item" @click="contentTab.toApiHttpClient()">
            <ev-content-switch-button-light-icon :active="contentTab.isApiHttpClient()"
                                                 :active-color="activeColor"
                                                 :inactive-color="inactiveColor"></ev-content-switch-button-light-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="['content-switch-button__switch-item-label', contentTab.isApiHttpClient() ? 'active': 'inactive']">{{ $t("EvContentSwitchButton.apiHttpClient")
                }}</span>
        </div>

        <div class="content-switch-button__switch-item" @click="contentTab.toApiMockClient()">
            <ev-content-switch-button-light-icon :active="contentTab.isApiMockClient()"
                                                 :active-color="activeColor"
                                                 :inactive-color="inactiveColor"></ev-content-switch-button-light-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="['content-switch-button__switch-item-label', contentTab.isApiMockClient() ? 'active': 'inactive']">{{ $t("EvContentSwitchButton.apiMockClient")
                }}</span>
        </div>

        <div class="content-switch-button__slider" :class="sliderBarClasses">
            <div class="content-switch-button__slider-bar"></div>
        </div>
    </div>
</template>

<script>
    import GHCContentTab from '@/components/tabs/GHCContentTab'
    import EvContentSwitchButtonApiIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonApiIcon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvContentSwitchButtonLightIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonLightIcon'

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
                activeColor: "#FFFFFF",

                inactiveColor: "#AABBCC",
            }
        },

        computed: {
            sliderBarClasses() {
                if (this.contentTab.isApiDefinition()) {
                    return ['left']
                }

                if (this.contentTab.isApiHttpClient()) {
                    return ['center']
                }

                if (this.contentTab.isApiMockClient()) {
                    return ['right']
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .content-switch-button {
        @include horizon-center;

        @include rectangle(240px, 28px, 2px);

        @include fill(#FCFCFC, #F1F1F1);

        //border: 1px solid #007AFF;

        padding-left: 4px;

        padding-right: 4px;

        &__switch-item_ {
            @include absolute-center;

            @include rectangle(80px, 4px, 0px);

            z-index: 1;
        }

        &__switch-item-label {
            padding-top: 2px;

            font-size: 10px;

            line-height: 16px;

            transition: .15s;

            &.active {
                font-weight: bold;

                color: white;
            }

            &.inactive {
                font-weight: normal;

                color: $PLACEHOLDER_FONT_COLOR;
            }
        }

        &__slider_ {
            position: absolute;

            @include horizon-center;

            @include rectangle(224px, 20px, 2px);

            transition: .15s;

            &.left {
                padding-left: 0px;
            }

            &.center {
                padding-left: 78px;
            }

            &.right {
                padding-left: 160px;
            }
        }

        &__slider-bar_ {
            @include rectangle(72px, 20px, 2px);

            //@include fill(#3395FF, null);

            background-color: #007AFF;

            //@include blue-background-gradient--horizontal;
        }
    }
</style>

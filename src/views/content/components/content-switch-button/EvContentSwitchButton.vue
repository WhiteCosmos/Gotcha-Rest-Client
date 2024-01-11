<template>
    <div class="content-switch-button">
        <div class="content-switch-button__item" @click="toggle(API_DEFINITION_INDEX)">
            <ev-content-switch-button-api-icon :active="onApiDefinition" :active-color="activeColor" :inactive-color="inactiveColor"></ev-content-switch-button-api-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="['content-switch-button__item-text', onApiDefinition ? 'active': 'inactive']">接口文档</span>
        </div>

        <v-spacer></v-spacer>

        <div class="content-switch-button__item" @click="toggle(API_HTTP_CLIENT_INDEX)">
            <ev-content-switch-button-light-icon :active="onApiHttpClient" :active-color="activeColor" :inactive-color="inactiveColor"></ev-content-switch-button-light-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="['content-switch-button__item-text', onApiHttpClient ? 'active': 'inactive']">接口测试</span>
        </div>

        <!--        <v-spacer></v-spacer>-->

        <div :class="['content-switch-button__slider', onApiDefinition ? 'left': 'right']">
            <div :class="['content-switch-button__slider-bar', onApiDefinition ? 'left': 'right']"></div>
        </div>
    </div>
</template>

<script>
    import EvContentSwitchButtonLightIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonLightIcon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvContentSwitchButtonApiIcon from '@/views/content/components/content-switch-button/EvContentSwitchButtonApiIcon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    export default {
        name: "EvContentSwitchButton",

        components: {
            EvContentSwitchButtonApiIcon,
            EvVerticalGutter,
            EvContentSwitchButtonLightIcon
        },

        mixins: [
            EvStoreMixin,
        ],

        mounted() {

        },

        props: {
            index: 0,
        },

        data() {
            return {
                index_: 0,

                API_DEFINITION_INDEX: 0,

                API_HTTP_CLIENT_INDEX: 1,

                activeColor: "#FFFFFF",

                inactiveColor: "#AABBCC",

                isApiDefinitionHover: false,

                isApiHttpClientHover: false,
            }
        },

        computed: {
            onApiDefinition() {
                return this.index_ === this.API_DEFINITION_INDEX
            },

            onApiHttpClient() {
                return this.index_ === this.API_HTTP_CLIENT_INDEX
            }
        },

        methods: {
            toggle(index) {
                this.index_ = index

                if (this.index_ === this.API_DEFINITION_INDEX) {
                    // this.switchJsonMethodTabType(this.API_DEFINITION_TAB)
                }

                if (this.index_ === this.API_HTTP_CLIENT_INDEX) {
                    // this.switchJsonMethodTabType(this.API_HTTP_CLIENT_TAB)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .content-switch-button {
        position: relative;

        display: flex;

        align-items: center;

        width: 160px;

        height: 28px;

        border-radius: 28px;

        background-color: #FCFCFC;

        border: 1px solid #F1F1F1;

        user-select: none;

        padding-left: 4px;

        padding-right: 4px;
    }

    .content-switch-button__item {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 72px;

        height: 20px;

        z-index: 999;

        //border-radius: 20px;
    }

    .content-switch-button__slider {
        position: absolute;

        display: flex;

        align-items: center;

        width: 152px;

        height: 28px;

        border-radius: 28px;

        user-select: none;

        transition: .15s;

        //background-color: black;

        &.left {
            padding-left: 0px;
        }

        &.right {
            padding-left: 78px;
        }
    }

    .content-switch-button__slider-bar {
        width: 72px;

        height: 20px;

        border-radius: 20px;

        background-color: #3395FF;

        transition: .1s;
    }

    .content-switch-button__item-text {
        padding-top: 2px;

        font-size: 10px;

        line-height: 16px;

        //z-index: 999;

        transition: .15s;

        &.active {
            font-weight: bold;

            color: white;
        }

        &.inactive {
            font-weight: normal;

            color: #AABBCC;
        }
    }
</style>

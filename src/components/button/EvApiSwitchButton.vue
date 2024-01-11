<template>
    <div class="api-switch d-flex align-center">
        <!--        <div class="d-flex flex-grow-1 justify-start">-->
        <!--            <span class="api-switch__font&#45;&#45;inactive" @click="doSwitch(2)">接口MOCK</span>-->
        <!--        </div>-->

        <!--        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>-->

        <!--        <v-divider vertical inset></v-divider>-->

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <div class="d-flex flex-grow-1 justify-start align-center" @click="doSwitch(1)">
            <ev-light-icon></ev-light-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="{'api-switch__font--active': (currentIdx === API_DEBUG_INDEX), 'api-switch__font--inactive': (currentIdx !== API_DEBUG_INDEX)}">接口调试</span>
        </div>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <v-divider vertical inset></v-divider>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <div class="d-flex  flex-grow-1 justify-end align-center" @click="doSwitch(0)">
            <ev-document-icon></ev-document-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span :class="{'api-switch__font--active': (currentIdx === API_DOC_INDEX), 'api-switch__font--inactive': (currentIdx !== API_DOC_INDEX)}">接口文档</span>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLightIcon from '@/components/icon/ev-light-icon'
    import EvDocumentIcon from '@/components/icon/ev-document-icon'

    export default {
        name: "EvApiSwitchButton",

        components: {
            EvDocumentIcon,
            EvLightIcon,
            EvVerticalGutter
        },

        data() {
            return {
                currentIdx: 0,

                API_DOC_INDEX: 0,

                API_DEBUG_INDEX: 1,

                API_MOCK_INDEX: 2,
            }
        },

        methods: {
            doSwitch(idx) {
                this.currentIdx = idx

                this.$emit('switch', idx)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .api-switch {
        //width: 120px;

        height: 32px;

        user-select: none;
    }

    .api-switch__font--inactive {
        font-size: 12px;

        line-height: 24px;

        font-weight: normal;

        color: #b3b3b3;

        transition: 50ms;

        //border-bottom: 2px solid transparent;
    }

    .api-switch__font--active {
        font-size: 12px;

        line-height: 24px;

        font-weight: bold;

        color: $PRIMARY_COLOR;

        transition: 50ms;

        //border-bottom: 2px solid $PRIMARY_COLOR;
    }
</style>

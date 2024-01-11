<template>
    <div class="json-method-context-menu">
        <div class="json-method-context-menu__menu-item" @click="doCreateNewHttpOperation">
            <ev-label primary bold size="11">Create New Request</ev-label>
        </div>

        <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

        <ev-horizon-divider color="#E0E0E0"></ev-horizon-divider>

        <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

        <div class="json-method-context-menu__menu-item" @click="doCreateNewHttpOperation">
            <ev-label primary bold size="11">Create New Mock</ev-label>
        </div>

        <!--        <div class="content-tab-menu__menu-item" @click="doCloseOtherContentTabs">-->
        <!--            <ev-label primary bold>{{ $t("EvContentTabMenu.closeOtherTabs") }}</ev-label>-->
        <!--        </div>-->

        <!--        <div class="content-tab-menu__menu-item" @click="doCloseAllContentTabs">-->
        <!--            <ev-label primary bold>{{ $t("EvContentTabMenu.closeAllTabs") }}</ev-label>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvJsonMethodContextMenu",

        components: {
            EvHorizonGutter,
            EvHorizonDivider,
            EvLabel
        },

        methods: {
            doCreateNewHttpOperation() {
                this.$emit('create-http-operation')
            },

            doCreateNewMockOperation() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .json-method-context-menu {
        display: flex;

        flex-direction: column;

        width: 160px;

        padding: 4px;

        background-color: #F1F1F1;

        &__menu-item {
            @include horizon-center;

            height: 32px;

            border-radius: 4px;

            padding-left: 8px;

            width: 100%;

            &:hover {
                background-color: #E0E0E0;
            }
        }
    }
</style>

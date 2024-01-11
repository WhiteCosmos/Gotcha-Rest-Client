<template>
    <div class="ev-http-client-api-key-auth">
        <div class="d-flex align-center">
            <ev-label size="11" :width="72" blue>Key :</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="ev-http-client-api-key-auth__input-container">
                <ev-borderless-input dense v-model="apiKey.key" placeholder="Authorization Key"></ev-borderless-input>
            </div>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="d-flex align-center">
            <ev-label size="11" :width="72" blue>Prefix :</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="ev-http-client-api-key-auth__input-container">
                <ev-borderless-input dense v-model="apiKey.prefix" placeholder="Authorization Key Prefix"></ev-borderless-input>
            </div>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="d-flex align-center">
            <ev-label size="11" :width="72" blue>Value :</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="ev-http-client-api-key-auth__input-container">
                <ev-borderless-input dense v-model="apiKey.value" placeholder="Authorization Value"></ev-borderless-input>
            </div>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="d-flex align-center">
            <ev-label size="11" :width="72" blue>Add To :</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="header" v-mode="apiKey.addTo">Header</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="query" v-mode="apiKey.addTo">Query</ev-popup-menu-radio-item>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'

    export default {
        name: "EvHttpClientApiKeyAuth",

        components: {
            EvPopupMenuRadioItem,
            EvVerticalGutter,
            EvBorderlessInput,
            EvHorizonGutter,
            EvLabel
        },

        props: {
            apiKey: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-api-key-auth {
        display: flex;

        flex-direction: column;

        width: 100%;

        min-width: 1px;

        min-height: 1px;

        height: calc(100vh - 244px);

        user-select: none;

        padding: 32px;

        &__input-container {
            display: flex;

            align-items: center;

            flex: 1;

            min-height: 1px;

            min-width: 1px;

            height: 24px;

            padding-left: 4px;

            border: 1px solid $SECONDARY_COLOR;

            border-radius: 3px;

            background-color: #FCFCFC;
        }
    }
</style>

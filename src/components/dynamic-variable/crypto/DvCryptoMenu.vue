<template>
    <div class="dv-crypto-menu">
        <div class="algorithm-selector">
            <ev-popup-menu-radio-item name="md5" v-model="value.algorithm">MD5</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="sha128" v-model="value.algorithm">SHA-128</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="sha256" v-model="value.algorithm">SHA-256</ev-popup-menu-radio-item>
        </div>

        <dv-data-source-selector :value="value"></dv-data-source-selector>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvSelector from '@/components/selector/EvSelector'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'
    import EvChooseFileButton from '@/components/button/EvChooseFileButton'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvFileDialogMixin from '@/mixins/EvFileDialogMixin'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import DvDataSourceSelector from '@/components/dynamic-variable/components/DvDataSourceSelector'

    export default {
        name: "DvCryptoMenu",

        components: {
            DvDataSourceSelector,
            EvHorizonGutter,
            EvPopupMenuRadioItem,
            EvChooseFileButton,
            EvDynamicVariableInput,
            EvPopupMenuDivider,
            EvVerticalGutter,
            EvSelector,
            EvLabel
        },

        mixins: [
            EvFileDialogMixin,
        ],

        props: {
            value: Object
        },

        data() {
            return {}
        },

        computed: {},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-crypto-menu {
        display: flex;

        flex-direction: column;

        max-height: 320px;

        min-height: 1px;

        min-width: 1px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        overflow-y: auto;

        padding: 8px;

        .algorithm-selector {
            display: flex;

            align-items: center;

            height: 16px;

            margin-bottom: 20px;
        }
    }
</style>

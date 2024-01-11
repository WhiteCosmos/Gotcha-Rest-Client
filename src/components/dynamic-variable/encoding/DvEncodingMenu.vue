<template>
    <div class="dv-encoding-menu">
        <div class="dv-encoding-menu__target-wrapper">
            <ev-popup-menu-radio-item name="url" v-model="value.target">url</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="base64" v-model="value.target">base64</ev-popup-menu-radio-item>

            <v-spacer></v-spacer>

            <ev-label size="11" seURLcondary>{{ value.encode ? '编码' : '解码' }}</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-switch v-model="value.encode"></ev-switch>
        </div>

        <dv-data-source-selector :value="value"></dv-data-source-selector>
    </div>
</template>

<script>
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvSwitch from '@/components/button/EvSwitch'
    import EvLabel from '@/components/typography/EvLabel'
    import EvFileDialogMixin from '@/mixins/EvFileDialogMixin'
    import DvDataSourceSelector from '@/components/dynamic-variable/components/DvDataSourceSelector'

    export default {
        name: "DvEncodingMenu",

        components: {
            DvDataSourceSelector,
            EvLabel,
            EvSwitch,
            EvVerticalGutter,
            EvPopupMenuRadioItem
        },

        mixins: [
            EvFileDialogMixin
        ],

        props: {
            value: Object
        },

        methods: {
            chooseFile() {
                this.openFile().then(file => {
                    this.value.file = file
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-encoding-menu {
        @include flex-column;

        max-height: 320px;

        background-color: #F1F1F1;

        border: 1px solid #D8D8D8;

        border-radius: 5px;

        padding: 8px;

        overflow-y: auto;

        &__target-wrapper {
            display: flex;

            align-items: center;

            height: 16px;

            margin-bottom: 20px;
        }
    }
</style>

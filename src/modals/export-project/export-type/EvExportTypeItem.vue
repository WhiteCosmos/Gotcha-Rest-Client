<template>
    <div class="export-type-item">
        <div class="export-type-item__button">
            <ev-export-type-toggle-button :flag="isCurrentExportType"></ev-export-type-toggle-button>
        </div>

        <div class="d-flex flex-column justify-center" style="padding-left: 16px">
            <span class="export-type-item__font">{{ exportType.name }}</span>

            <span class="export-type-item__ps" v-if="exportType.remarks">{{ exportType.remarks }}</span>
        </div>
    </div>
</template>

<script>
    import EvExportTypeToggleButton from '@/modals/export-project/export-type/EvExportTypeToggleButton'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'

    export default {
        name: "EvExportTypeItem",

        components: {
            EvExportCheckBox,
            EvExportTypeToggleButton
        },

        props: {
            currentExportType: Object,

            exportType: Object,
        },

        computed: {
            isCurrentExportType() {
                return this.currentExportType === this.exportType
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .export-type-item {
        width: 320px;

        height: 72px;

        background-color: #FAFAFA;

        border-radius: 4px;

        border: 1px dashed #EAEAEA;

        margin-top: 16px;

        display: flex;

        align-items: center;

        transition: 100ms;

        user-select: none;

        &:hover {
            background-color: #F8F8F8;
        }

        //@include component-shadow;
    }

    .export-type-item__button {
        height: 72px;

        width: 72px;

        display: flex;

        @include full-center;

        border-right: 1px dashed #EAEAEA;
    }

    .export-type-item__font {
        font-size: 14px;

        line-height: 32px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;
    }

    .export-type-item__ps {
        font-size: 10px;

        line-height: 24px;

        font-weight: normal;

        color: #AABBCC;
    }
</style>

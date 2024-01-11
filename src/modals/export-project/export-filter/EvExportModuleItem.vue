<template>
    <div class="ev-export__item" :class="{'module-item__selected': this.isSelectedJsonModule}">
        <div class="ev-export__indicator">
            <ev-triangle v-if="isSelectedJsonModule"></ev-triangle>
        </div>

        <div class="ev-export__icon">
            <ev-export-check-box v-model="jsonModule.checkedStatus"></ev-export-check-box>
        </div>

        <div class="ev-export__body">
            <span class="service-name">{{ jsonModule.moduleName }}</span>
        </div>

        <v-spacer></v-spacer>

        <div class="ev-export__extension">
            <ev-count-tag :count="checkedJsonServiceCount"></ev-count-tag>
        </div>
    </div>
</template>

<script>
    import EvExportTypeToggleButton from '@/modals/export-project/export-type/EvExportTypeToggleButton'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvCountTag from '@/components/tag/EvCountTag'
    import EvMagic from '@/components/icon/EvMagic'
    import EvTriangle from '@/components/icon/ev-triangle'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportFilterMixin from '@/modals/export-project/export-filter/EvExportFilterMixin'

    export default {
        name: "EvExportModuleItem",

        components: {
            EvVerticalGutter,
            EvTriangle,
            EvMagic,
            EvCountTag,
            EvExportCheckBox,
            EvExportTypeToggleButton
        },

        mixins: [
            EvExportFilterMixin,
        ],

        watch: {
            'jsonModule.checkedStatus'() {
                this.watchModuleCheckedStatus(this.jsonModule)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "export-filter";

    .module-item {
        position: relative;
    }

    .module-item__selected {
        //background-color: #EAEAEA;
    }

    .service-name {
        font-size: 12px;

        line-height: 24px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;
    }
</style>

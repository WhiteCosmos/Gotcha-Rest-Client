<template>
    <div class="column-title">
        <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

        <ev-export-check-box v-model="column.checkedStatus" v-if="columnIndex === moduleColumnIdx"></ev-export-check-box>

        <ev-export-check-box v-model="selectedJsonModule.checkedStatus" v-if="columnIndex === serviceColumnIdx"></ev-export-check-box>

        <ev-export-check-box v-model="selectedJsonService.checkedStatus" v-if="columnIndex === methodColumnIdx"></ev-export-check-box>

        <ev-vertical-gutter :gutter="24"></ev-vertical-gutter>

        <span class="column-title__font"><slot></slot></span>
    </div>
</template>

<script>
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportFilterMixin from '@/modals/export-project/export-filter/EvExportFilterMixin'
    import _ from 'lodash'

    export default {
        name: "EvExportColumnTitle",

        components: {EvVerticalGutter, EvExportCheckBox},

        mixins: [
            EvExportFilterMixin,
        ],

        props: {
            columnIndex: Number
        },

        data() {
            return {
                column: {
                    checkedStatus: "CHECKED"
                },

                moduleColumnIdx: 0,

                serviceColumnIdx: 1,

                methodColumnIdx: 2,
            }
        },

        methods: {},

        watch: {
            'column.checkedStatus'() {
                if (this.columnIndex === this.moduleColumnIdx) { // Module Column
                    this.jsonModules.forEach(jsonModule => {
                        this.isItemChecked(this.column) && this.toItemChecked(jsonModule)

                        this.isItemUnchecked(this.column) && this.toItemUnchecked(jsonModule)

                        this.watchModuleCheckedStatus(jsonModule)
                    })
                }
            },

            'selectedJsonModule.checkedStatus'() {
                this.watchModuleCheckedStatus(this.selectedJsonModule)
            },

            'selectedJsonService.checkedStatus'() {
                this.watchServiceCheckedStatus(this.selectedJsonService)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "export-filter";

    .column-title {
        display: flex;

        height: 40px;

        align-items: center;

        border-bottom: 1px solid #DFDFDF;

        padding-left: 16px;

        background-color: #F1F1F1;
    }

    .column-title__font {
        font-size: 12px;

        font-weight: bold;

        line-height: 32px;

        //color: $SECONDARY_FONT_COLOR;
        color: $PRIMARY_COLOR;
    }
</style>

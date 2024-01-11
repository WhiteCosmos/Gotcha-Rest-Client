<template>
    <div class="ev-export__item">
        <div class="ev-export__indicator">
            <ev-triangle v-if="isSelectedJsonService"></ev-triangle>
        </div>

        <div class="ev-export__icon">
            <ev-export-check-box v-model="jsonService.checkedStatus"></ev-export-check-box>
        </div>

        <div class="ev-export__body">
            <span class="service-name text-truncate">{{ jsonService.serviceName }}</span>

            <span class="service-comment text-truncate">{{ jsonService.summary }}</span>
        </div>

        <div class="ev-export__extension">
            <ev-count-tag :count="checkedJsonMethodCount"></ev-count-tag>
        </div>
    </div>
</template>

<script>
    import EvExportTypeToggleButton from '@/modals/export-project/export-type/EvExportTypeToggleButton'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvCountTag from '@/components/tag/EvCountTag'
    import EvTriangle from '@/components/icon/ev-triangle'
    import EvExportFilterMixin from '@/modals/export-project/export-filter/EvExportFilterMixin'

    export default {
        name: "EvExportServiceItem",

        components: {
            EvTriangle,
            EvCountTag,
            EvExportCheckBox,
            EvExportTypeToggleButton
        },

        mixins: [
            EvExportFilterMixin,
        ],

        watch: {
            'jsonService.checkedStatus'() {
                this.watchServiceCheckedStatus(this.jsonService)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "export-filter";

    .service-name {
        font-size: 12px;

        line-height: 24px;

        font-weight: bold;

        width: 160px;

        color: $SECONDARY_FONT_COLOR;
    }

    .service-comment {
        font-size: 12px;

        line-height: 24px;

        width: 160px;

        color: $SECONDARY_FONT_COLOR;
    }
</style>

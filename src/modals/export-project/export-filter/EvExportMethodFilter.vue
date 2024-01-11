<template>
    <div class="ev-export__column">
        <ev-export-column-title :selected-json-service="selectedJsonService" :column-index="2">{{ $t("EvExportProjectModal.methodList") }}
        </ev-export-column-title>

        <div class="scroll-container" v-if="selectedJsonService">
            <ev-export-method-item v-for="jsonMethod in selectedJsonService.methods"
                                   :selected-json-module="selectedJsonModule"
                                   :selected-json-service="selectedJsonService"
                                   :json-method="jsonMethod"></ev-export-method-item>
        </div>
    </div>
</template>

<script>
    import EvExportModuleItem from '@/modals/export-project/export-filter/EvExportModuleItem'
    import EvExportColumnTitle from '@/modals/export-project/export-filter/EvExportColumnTitle'
    import EvExportMethodItem from '@/modals/export-project/export-filter/EvExportMethodItem'
    import EvExportFilterProps from '@/modals/export-project/export-filter/EvExportFilterProps'

    export default {
        name: "EvExportMethodFilter",

        components: {
            EvExportMethodItem,
            EvExportColumnTitle,
            EvExportModuleItem
        },

        mixins: [
            EvExportFilterProps,
        ]
    }
</script>

<style lang="scss" scoped>
    @import "export-filter";
</style>

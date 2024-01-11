<template>
    <div class="ev-export__column">
        <ev-export-column-title :json-modules="jsonModules" :column-index="0">{{ $t("EvExportProjectModal.moduleList") }}</ev-export-column-title>

        <ev-export-module-item v-for="jsonModule in jsonModules"
                               :selected-json-module="selectedJsonModule"
                               :selected-json-service="selectedJsonService"
                               :json-module="jsonModule"
                               @click.native="doSelectJsonModule(jsonModule)"></ev-export-module-item>
    </div>
</template>

<script>
    import EvExportModuleItem from '@/modals/export-project/export-filter/EvExportModuleItem'
    import EvExportColumnTitle from '@/modals/export-project/export-filter/EvExportColumnTitle'
    import EvMagic from '@/components/icon/EvMagic'
    import EvExportFilterProps from '@/modals/export-project/export-filter/EvExportFilterProps'

    export default {
        name: "EvExportModuleFilter",

        components: {
            EvMagic,
            EvExportColumnTitle,
            EvExportModuleItem
        },

        mixins: [
            EvExportFilterProps,
        ],
    }
</script>

<style lang="scss" scoped>
    @import "export-filter";
</style>

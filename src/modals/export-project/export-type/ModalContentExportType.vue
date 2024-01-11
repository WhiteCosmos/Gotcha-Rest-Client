<template>
    <div class="export-type">
        <ev-export-type-item :export-type="type"
                             :current-export-type="currentExportType"
                             @click.native="selectExportType(type)"
                             v-for="type in exportTypes"></ev-export-type-item>
    </div>
</template>

<script>
    import EvExportTypeItem from '@/modals/export-project/export-type/EvExportTypeItem'
    import EvExportProjectMixin from '@/modals/export-project/EvExportProjectMixin'

    export default {
        name: "ModalContentExportType",

        components: {
            EvExportTypeItem
        },

        mixins: [
            EvExportProjectMixin
        ],

        mounted() {
            this.currentExportType = this.exportTypes[0]
        },

        data() {
            return {
                currentExportType: undefined,
            }
        },

        methods: {
            selectExportType(exportType) {
                this.currentExportType = exportType

                this.$emit('select', exportType)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .export-type {
        width: 100%;

        height: 100%;

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;
    }
</style>

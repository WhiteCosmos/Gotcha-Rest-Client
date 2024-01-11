<template>
    <v-card class="modal__export" style="border: 1px solid #E0E0E0">
        <div class="modal__title" style="position: relative">
            <ev-circle-close-button style="position: absolute; left: 12px" @click.native="doClose"></ev-circle-close-button>

            <span class="modal__title__font">{{ $t("EvExportProjectModal.title") }}</span>
        </div>

        <ModalContentExportType @select="doSelectExportType" v-if="is(statuses.CHOOSE_EXPORT_TYPE)"></ModalContentExportType>

        <ModalContentExportFilter
            :export-type="selectedExportType"
            :exported-modules="exportedModules"
            v-if="is(statuses.FILTER_EXPORT_ITEM)"></ModalContentExportFilter>

        <div class="modal__action">
            <!--            <ev-document-create-button @click.native="nextStep" v-if="is(statuses.CHOOSE_EXPORT_TYPE)">{{ $t("EvExportProjectModal.next") }}-->
            <!--            </ev-document-create-button>-->

            <!--            <ev-document-create-button @click.native="doExport" v-if="is(statuses.FILTER_EXPORT_ITEM)">{{ $t("EvExportProjectModal.startExport") }}-->
            <!--            </ev-document-create-button>-->
        </div>
    </v-card>
</template>

<script>
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import ModalContentExportType from '@/modals/export-project/export-type/ModalContentExportType'
    import ModalContentExportFilter from '@/modals/export-project/export-filter/ModalContentExportFilter'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import _ from 'lodash'
    import EvExportProjectMixin from '@/modals/export-project/EvExportProjectMixin'

    /*
    Check list

    1. 搜索接口，全部展开、收起
    */

    export default {
        name: "EvExportProjectModal",

        components: {
            ModalContentExportFilter,
            ModalContentExportType,
            EvCircleCloseButton
        },

        mixins: [
            EvDialogMixin,
            EvStoreMixin,
            EvExportProjectMixin,
        ],

        props: {
            dialog: Boolean
        },

        mounted() {
            this.initStateMachine(this.statuses.CHOOSE_EXPORT_TYPE)

            this.initModules()
        },

        computed: {
            title() {
                if (this.is(this.statuses.CHOOSE_EXPORT_TYPE)) {
                    return this.$t("exportProjectModal.chooseExportType")
                }

                if (this.is(this.statuses.FILTER_EXPORT_ITEM)) {
                    return this.$t("exportProjectModal.filterExportItem")
                }
            },

            buttonName() {
                if (this.is(this.statuses.CHOOSE_EXPORT_TYPE)) {
                    return "下一步"
                }

                if (this.is(this.statuses.FILTER_EXPORT_ITEM)) {
                    // return this.$t("exportProjectModal.filterExportItem")
                    return "开始导出"
                }
            }
        },

        methods: {
            initModules() {
                this.doSelectExportType(this.exportTypes[0])

                this.exportedModules = _.cloneDeep(this.modules)

                this.exportedModules.forEach(module => {
                    this.$set(module, 'checkedStatus', this.checkedStatuses.CHECKED)

                    module.restfulApis.forEach(service => {
                        this.$set(service, 'checkedStatus', this.checkedStatuses.CHECKED)

                        service.methods.forEach(method => {
                            this.$set(method, 'checkedStatus', this.checkedStatuses.CHECKED)
                        })
                    })

                    module.javaServices.forEach(service => {
                        this.$set(service, 'checkedStatus', this.checkedStatuses.CHECKED)

                        service.methods.forEach(method => {
                            this.$set(method, 'checkedStatus', this.checkedStatuses.CHECKED)
                        })
                    })
                })
            },

            doSelectExportType(exportType) {
                this.selectedExportType = exportType
            },

            doClose() {
                this.to(this.statuses.CHOOSE_EXPORT_TYPE)

                this.close()
            }
        },

        watch: {
            dialog(newVal) {
                newVal && this.initModules()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/modal.scss";
</style>

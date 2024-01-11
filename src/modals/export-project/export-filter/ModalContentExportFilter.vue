<template>
    <div class="export-filter">
        <div class="export-filter__option">
            <ev-vertical-gutter :gutter="28"></ev-vertical-gutter>

            <span class="export-filter__tag-name">{{ $t("EvExportProjectModal.exportType") }} :</span>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="export-filter__path">{{ exportType.id }}</span>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <span class="export-filter__divider">|</span>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <span class="export-filter__tag-name">{{ $t("EvExportProjectModal.projectName") }} :</span>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="export-filter__path">{{ currentProject.projectName }}</span>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <span class="export-filter__divider">|</span>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <span class="export-filter__tag-name">{{ $t("EvExportProjectModal.branchName") }} :</span>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="export-filter__path">{{ currentBranch.branchName }}</span>

            <!--            <v-spacer></v-spacer>-->

            <!--            <span class="notification">导出前请确保分支是最新的，并且提交了所有的更改。</span>-->

            <!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->
        </div>

        <v-divider></v-divider>

        <div class="d-flex flex-grow-1">
            <ev-export-module-filter
                :json-modules="exportedModules"
                :selected-json-module="selectedJsonModule"
                :selected-json-service="selectedJsonService"
                @select="doSelectModule"></ev-export-module-filter>

            <ev-export-service-filter
                :selected-json-module="selectedJsonModule"
                :selected-json-service="selectedJsonService"
                @select="doSelectService"></ev-export-service-filter>

            <ev-export-method-filter
                :selected-json-module="selectedJsonModule"
                :selected-json-service="selectedJsonService"></ev-export-method-filter>
        </div>
    </div>
</template>

<script>
    import EvExportModuleFilter from '@/modals/export-project/export-filter/EvExportModuleFilter'
    import EvExportServiceFilter from '@/modals/export-project/export-filter/EvExportServiceFilter'
    import EvExportMethodFilter from '@/modals/export-project/export-filter/EvExportMethodFilter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import _ from 'lodash'
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    export default {
        name: "ModalContentExportFilter",

        components: {
            EvVerticalGutter,
            EvExportMethodFilter,
            EvExportServiceFilter,
            EvExportModuleFilter
        },

        mixins: [
            EvStoreMixin
        ],

        props: {
            exportedModules: Array,

            exportType: Object,
        },

        created() {
            this.doSelectModule(this.exportedModules[0])
        },

        data() {
            return {
                selectedJsonModule: undefined,

                selectedJsonService: undefined,
            }
        },

        methods: {
            doSelectModule(module) {
                if (!module) {
                    return
                }

                this.selectedJsonModule = module

                if (!_.isEmpty(module.restfulApis)) {
                    this.selectedJsonService = module.restfulApis[0]

                    return
                }

                if (!_.isEmpty(module.javaServices)) {
                    this.selectedJsonService = module.javaServices[0]

                    return
                }
            },

            doSelectService(jsonService) {
                this.selectedJsonService = jsonService
            },
        },

        watch: {
            exportedModules(newVal) {
                if (_.isEmpty(newVal)) {
                    return
                }

                this.doSelectModule(newVal[0])
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .export-filter {
        width: 100%;

        height: 560px;

        //background-color: #ff8282;

        display: flex;

        flex-direction: column;
    }

    .export-filter__option {
        display: flex;

        align-items: center;

        height: 40px;
    }

    .export-filter__tag-name {
        font-size: 10px;

        font-weight: bold;

        color: $PRIMARY_COLOR;
    }

    .export-filter__path {
        font-size: 12px;

        color: $SECONDARY_FONT_COLOR;
    }

    .export-filter__divider {
        font-size: 12px;

        color: #AABBCC;
    }

    .notification {
        font-size: 12px;

        font-weight: normal;

        color: $RED_COLOR;
    }
</style>

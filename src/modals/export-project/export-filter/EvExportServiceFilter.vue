<template>
    <div class="ev-export__column">
        <ev-export-column-title :selected-json-module="selectedJsonModule" :column-index="1">{{ $t("EvExportProjectModal.serviceList") }}
        </ev-export-column-title>

        <div class="scroll-container">
            <ev-export-service-list
                v-if="hasRestfulApi(selectedJsonModule)"
                name="HTTP 服务"
                @select="doSelectJsonService"
                :selected-json-module="selectedJsonModule"
                :selected-json-service="selectedJsonService"
                :json-services="selectedJsonModule.restfulApis"></ev-export-service-list>

            <ev-export-service-list
                v-if="hasJavaService(selectedJsonModule)"
                name="JAVA 服务"
                @select="doSelectJsonService"
                :selected-json-module="selectedJsonModule"
                :selected-json-service="selectedJsonService"
                :json-services="selectedJsonModule.javaServices"></ev-export-service-list>
        </div>
    </div>
</template>

<script>
    import EvExportModuleItem from '@/modals/export-project/export-filter/EvExportModuleItem'
    import EvExportServiceItem from '@/modals/export-project/export-filter/EvExportServiceItem'
    import EvExportColumnTitle from '@/modals/export-project/export-filter/EvExportColumnTitle'
    import EvMagic from '@/components/icon/EvMagic'
    import EvExportServiceList from '@/modals/export-project/export-filter/EvExportServiceList'
    import EvExportFilterProps from '@/modals/export-project/export-filter/EvExportFilterProps'
    import _ from 'lodash'

    export default {
        name: "EvExportServiceFilter",

        components: {
            EvExportServiceList,
            EvMagic,
            EvExportColumnTitle,
            EvExportServiceItem,
            EvExportModuleItem
        },

        mixins: [
            EvExportFilterProps,
        ],

        methods: {
            hasRestfulApi(jsonModule) {
                return !_.isEmpty(jsonModule.restfulApis)
            },

            hasJavaService(jsonModule) {
                return !_.isEmpty(jsonModule.javaServices)
            },
        },


    }
</script>

<style lang="scss" scoped>
    @import "export-filter";

    .magic-2 {
        position: absolute;

        left: calc(640px - 3px);

        //background-color: #ff8282;
    }
</style>

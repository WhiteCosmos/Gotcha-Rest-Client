<script>
    import _ from 'lodash'
    import EvExportFilterProps from '@/modals/export-project/export-filter/EvExportFilterProps'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'

    export default {
        name: "EvExportFilterMixin",

        mixins: [
            EvExportFilterProps,
            EvCheckedStatusMixin,
        ],

        computed: {
            checkedJsonServiceCount() {
                let jsonServices = _.concat(this.jsonModule.restfulApis, this.jsonModule.javaServices)

                let checkedJsonServices = jsonServices.filter(jsonService => {
                    return this.isItemChecked(jsonService)
                })

                return checkedJsonServices.length
            },

            checkedJsonMethodCount() {
                let checkedJsonMethods = this.jsonService.methods.filter(jsonMethod => {
                    return this.isItemChecked(jsonMethod)
                })

                return checkedJsonMethods.length
            },

            isSelectedJsonModule() {
                return this.selectedJsonModule === this.jsonModule
            },

            isSelectedJsonService() {
                return this.selectedJsonService === this.jsonService
            },
        },

        methods: {
            watchModuleCheckedStatus(jsonModule) {
                let services = _.concat(jsonModule.restfulApis, jsonModule.javaServices)

                services.forEach(jsonService => {
                    this.isItemChecked(jsonModule) && this.toItemChecked(jsonService)

                    this.isItemUnchecked(jsonModule) && this.toItemUnchecked(jsonService)

                    jsonService.methods.forEach(jsonMethod => {
                        this.isItemChecked(jsonService) && this.toItemChecked(jsonMethod)

                        this.isItemUnchecked(jsonService) && this.toItemUnchecked(jsonMethod)
                    })
                })
            },

            watchServiceCheckedStatus(jsonService) {
                if (!this.selectedJsonModule) {
                    return
                }

                jsonService.methods.forEach(jsonMethod => {
                    this.isItemChecked(jsonService) && this.toItemChecked(jsonMethod)

                    this.isItemUnchecked(jsonService) && this.toItemUnchecked(jsonMethod)
                })

                let services = _.concat(this.selectedJsonModule.restfulApis, this.selectedJsonModule.javaServices)

                this.isEveryChecked(services) && this.toItemChecked(this.selectedJsonModule)

                this.isAnyChecked(services) && this.toItemHalfChecked(this.selectedJsonModule)

                this.isNullChecked(services) && this.toItemUnchecked(this.selectedJsonModule)
            },

            watchMethodCheckedStatus(jsonMethod) {
                this.isEveryChecked(this.selectedJsonService.methods) && this.toItemChecked(this.selectedJsonService)

                this.isAnyChecked(this.selectedJsonService.methods) && this.toItemHalfChecked(this.selectedJsonService)

                this.isNullChecked(this.selectedJsonService.methods) && this.toItemUnchecked(this.selectedJsonService)
            },
        }
    }
</script>
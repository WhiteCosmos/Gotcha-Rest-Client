<script>
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import SwaggerBuilder from '@/export/SwaggerBuilder'
    import EvStateMachineMixin from '@/mixins/EvStateMachineMixin'
    import MarkdownBuilder from '@/export/MarkdownBuilder'
    import AsciidocBuilder from '@/export/AsciidocBuilder'
    import OpenApiBuilder from '@/export/OpenApiBuilder'
    import i18n from '@/main'

    export default {
        name: "EvExportProjectMixin",

        mixins: [
            EvStoreMixin,
            EvStateMachineMixin,
        ],

        data() {
            return {
                exportedModules: [],

                selectedExportType: undefined,

                exportTypes: [
                    {
                        id: "markdown",
                        name: "Markdown",
                    },

                    {
                        id: "asciidoc",
                        name: "Asciidoc"
                    },

                    {
                        id: "swagger",
                        name: "Swagger 2.0",
                        remarks: i18n.t("EvExportProjectModal.httpOnly")
                    },

                    {
                        id: "openapi",
                        name: "OpenAPI 3.0",
                        remarks: i18n.t("EvExportProjectModal.httpOnly")
                    },
                ],

                statuses: {
                    EXPORT_PROJECT: "EXPORT_PROJECT",

                    CHOOSE_EXPORT_TYPE: "CHOOSE_EXPORT_TYPE", // 选择导出类型

                    FILTER_EXPORT_ITEM: "FILTER_EXPORT_ITEM", // 过滤需要导出的内容

                    EXPORT_PROJECT_START: "EXPORT_PROJECT_START",

                    EXPORT_PROJECT_COMPLETE: "EXPORT_PROJECT_COMPLETE",
                },

                checkedStatuses: { // 选中状态
                    CHECKED: "CHECKED", // 已选中

                    HALF_CHECKED: "HALF_CHECKED", // 部分选中

                    UNCHECKED: "UNCHECKED" // 未选中
                },
            }
        },

        methods: {
            nextStep() {
                this.to(this.statuses.FILTER_EXPORT_ITEM)
            },

            async doExport() {
                let jsonProject = this.currentProject

                let jsonModules = this.exportedModules

                let data = []

                if (this.selectedExportType.id === "markdown") {
                    data = await this.doExportMarkdown(jsonModules)
                }

                if (this.selectedExportType.id === "asciidoc") {
                    data = await this.doExportAsciidoc(jsonModules)
                }

                if (this.selectedExportType.id === "swagger") {
                    data = await this.doExportSwagger(jsonModules)
                }

                if (this.selectedExportType.id === "openapi") {
                    data = await this.doExportOpenAPI(jsonModules)
                }

                this.doSaveFiles(data, jsonProject.projectName)
            },

            async doExportMarkdown(jsonModules) {
                let data = []

                for (let jsonModule of jsonModules) {
                    if (jsonModule.checkedStatus === "UNCHECKED") {
                        continue
                    }

                    let md = await MarkdownBuilder.buildFromJsonModule(jsonModule)

                    data.push({
                        moduleName: jsonModule.moduleName,
                        text: md,
                        suffix: ".md"
                    })
                }

                return data
            },

            async doExportAsciidoc(jsonModules) {
                let data = []

                for (let jsonModule of jsonModules) {
                    if (jsonModule.checkedStatus === "UNCHECKED") {
                        continue
                    }

                    let asciidoc = await AsciidocBuilder.buildFromJsonModule(jsonModule)

                    data.push({
                        moduleName: jsonModule.moduleName,
                        text: asciidoc,
                        suffix: ".asciidoc"
                    })
                }

                return data
            },

            async doExportSwagger(jsonModules) {
                let data = []

                for (let jsonModule of jsonModules) {
                    if (jsonModule.checkedStatus === "UNCHECKED") {
                        continue
                    }

                    let swagger = await SwaggerBuilder.buildFromJsonModule(jsonModule)

                    data.push({
                        moduleName: jsonModule.moduleName,
                        text: JSON.stringify(swagger, null, 4),
                        suffix: ".json"
                    })
                }

                return data
            },

            async doExportOpenAPI(jsonModules) {
                let data = []

                for (let jsonModule of jsonModules) {
                    if (jsonModule.checkedStatus === "UNCHECKED") {
                        continue
                    }

                    let openapi = await OpenApiBuilder.buildFromJsonModule(jsonModule)

                    data.push({
                        moduleName: jsonModule.moduleName,
                        text: JSON.stringify(openapi, null, 4),
                        suffix: ".json"
                    })
                }

                return data
            },

            doSaveFiles(modules, projectName) {
                const {dialog, app} = require('electron').remote

                const dirName = projectName + "-" + new Date().getTime()

                const options = {
                    defaultPath: app.getPath('desktop') + '/' + dirName,
                    createDirectory: true,
                }

                let fs = require('fs')

                dialog.showSaveDialog(null, options).then(dir => {
                    if (dir.canceled) {
                        return
                    }

                    if (!fs.existsSync(dir.filePath)) {
                        fs.mkdirSync(dir.filePath)
                    }

                    modules.forEach(module => {
                        fs.writeFileSync(dir.filePath + "/" + module.moduleName + module.suffix, module.text, {})
                    })
                })
            }
        }
    }
</script>
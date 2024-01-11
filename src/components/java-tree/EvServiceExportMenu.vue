<template>
    <div class="service-export">
        <span class="service-export__title">{{ $t("exportService") }}</span>

        <ev-horizon-divider></ev-horizon-divider>

        <span class="service-export__font" v-for="exportType in actualExportTypes" @click="doExport(exportType)">{{ exportType }}</span>
    </div>
</template>

<script>
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import _ from 'lodash'
    import MarkdownBuilder from '@/export/MarkdownBuilder'
    import AsciidocBuilder from '@/export/AsciidocBuilder'

    export default {
        name: "EvServiceExportMenu",

        props: {
            jsonService: Object,

            matchedJsonMethods: Array, // 如果存在过滤那么仅导出匹配的方法
        },

        components: {
            EvHorizonDivider
        },

        mixins: [
            EvStoreMixin,
        ],

        data() {
            return {
                markdown: "Markdown",
                asciidoc: "Asciidoc",
                swagger: "Swagger 2.x",
                openapi: "OpenAPI 3.x"
            }
        },

        computed: {
            actualExportTypes() { // 根据接口类型返回可以导出的类型
                return [
                    this.markdown,
                    this.asciidoc
                ]
            }
        },

        methods: {
            async doExport(exportType) {
                if (!_.isEmpty(this.matchedJsonMethods)) {
                    this.jsonService.methods.forEach(jsonMethod => {
                        if (!this.matchedJsonMethods.includes(jsonMethod)) {
                            this.$set(jsonMethod, "checkedStatus", "UNCHECKED")
                        }
                    })
                }

                if (exportType === this.markdown) {
                    await this.exportToMarkdown()
                }

                if (exportType === this.asciidoc) {
                    await this.exportApiToAsciidoc()
                }

                if (!_.isEmpty(this.matchedJsonMethods)) {
                    this.jsonService.methods.forEach(jsonMethod => {
                        if (!this.matchedJsonMethods.includes(jsonMethod)) {
                            this.$set(jsonMethod, "checkedStatus", undefined)
                        }
                    })
                }
            },

            async exportToMarkdown() {
                let md = await MarkdownBuilder.buildFromJsonService(this.jsonService)

                this.writeAndSave(md, this.markdown)
            },

            async exportApiToAsciidoc() {
                let as = await AsciidocBuilder.buildFromJsonService(this.jsonService)

                this.writeAndSave(as, this.asciidoc)
            },

            writeAndSave(data, exportType) {
                let service = this.jsonService

                let filename = service.serviceName + this.getFileType(exportType)

                const {dialog, app} = require('electron').remote

                const options = {
                    defaultPath: app.getPath('desktop') + '/' + filename,
                }

                let fs = require('fs')

                dialog.showSaveDialog(null, options).then(file => {
                    if (file.canceled) {
                        return
                    }

                    fs.writeFileSync(file.filePath, data, {})
                })
            },

            getFileType(exportType) {
                if (exportType === this.markdown) {
                    return ".md"
                }

                if (exportType === this.asciidoc) {
                    return ".asciidoc"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .service-export {
        width: 128px;

        //height: 256px;

        background-color: white;

        display: flex;

        flex-direction: column;

        //border: 1px solid #E0E0E0;

        user-select: none;
    }

    .service-export__title {
        line-height: 32px;

        font-size: 12px;

        font-weight: bold;

        color: #007AFF;

        text-indent: 8px;
    }

    .service-export__item {

    }

    .service-export__font {
        line-height: 32px;

        font-size: 12px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;

        text-indent: 8px;
    }

    .service-export__font:hover {
        background-color: $SELECTOR_BACKGROUND_COLOR;
    }
</style>

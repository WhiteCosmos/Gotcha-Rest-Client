<!-- 所有接口文档导出功能 -->

<script>
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import fs from 'fs'
    import MarkdownBuilder_ from '@/export/markdown/MarkdownBuilder_'

    export default {
        name: "EvExportMixin",

        mixins: [
            // EvStoreMixin,
        ],

        data() {
            return {
                markdown: "Markdown",

                asciidoc: "Asciidoc",

                image_png: "Image/PNG",

                curl: "Text/cURL",

                html_file: "HTML File",

                swagger: "Swagger 2.x",

                openapi: "OpenAPI 3.x",
            }
        },

        computed: {
            canExportToMarkdown() {

            },

            canExportToAsciiDoc() {

            },

            canExportToPNG() {

            },

            canExportToCUrl() {

            },
        },

        methods: {
            doExportMarkdown(jsonMethod) {
                const {dialog, app} = require('electron').remote

                const options = {
                    defaultPath: app.getPath('desktop'),
                    filters: [
                        {
                            name: "File Extension",
                            extensions: ['md']
                        }
                    ]
                }

                let fs = require('fs')

                let md = new MarkdownBuilder_().buildFromJsonMethod(jsonMethod)

                dialog.showSaveDialog(null, options).then(dir => {
                    if (dir.canceled) {
                        return
                    }

                    fs.writeFileSync(dir.filePath, md, {})
                })
            }
        }
    }
</script>


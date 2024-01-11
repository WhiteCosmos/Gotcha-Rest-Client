<template>
    <div class="d-flex flex-column">
        <div :class="optionStyle">
            <div :class="radioStyle" @click.stop="doSelectOption">
                <ev-export-type-toggle-button :flag="selected"></ev-export-type-toggle-button>
            </div>

            <div class="import-local-project-option__container">
                <div class="import-local-project-option__container__file-selector" @click.stop="doSelectSwaggerFile">
                    <span class="import-local-project-option__container__file-selector__label" v-if="fileName">{{ fileName }}</span>

                    <span class="import-local-project-option__container__file-selector__label" v-else>请选择需要导入的 Swagger 文件</span>
                </div>
            </div>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ul>
            <li>导入 Swagger 和 OpenAPI <b>JSON</b> 文件</li>
            <li>作为项目管理，无法修改接口定义</li>
        </ul>
    </div>
</template>

<script>
    import EvExportTypeToggleButton from '@/modals/export-project/export-type/EvExportTypeToggleButton'

    import _ from 'lodash'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvImportSwaggerFileOption",

        components: {
            EvHorizonGutter,
            EvExportTypeToggleButton
        },

        props: {
            options: Object, // ImportLocalProjectOptions
        },

        computed: {
            selected() {
                return this.options && this.options.type === 'FILE'
            },

            optionStyle() {
                return [
                    'import-local-project-option',
                    this.selected ? 'import-local-project-option--selected' : 'import-local-project-option--unselected',
                ]
            },

            radioStyle() {
                return [
                    'import-local-project-option__radio',
                    this.selected ? 'import-local-project-option__radio--selected' : 'import-local-project-option__radio--unselected',
                ]
            },

            fileName() {
                if (!_.isEmpty(this.options.filePath)) {
                    let splits = this.options.filePath.split("/")

                    return splits[splits.length - 1]
                }
            }
        },

        data() {
            return {}
        },

        methods: {
            doSelectOption() {
                this.options.type = 'FILE'
            },

            doSelectSwaggerFile() {
                this.options.type = 'FILE'

                const {dialog} = require('electron').remote

                dialog.showOpenDialog({properties: ['openFile'], securityScopedBookmarks: true})
                    .then(file => {
                        if (file.canceled) { // ignore
                            return
                        }

                        if (!_.isEmpty(file.bookmarks)) {
                            this.options.bookmark = file.bookmarks[0]
                        }

                        this.options.filePath = file.filePaths[0]

                        this.validate()
                    })
            },

            validate() {

            }
        },

        watch: {
            'options.type'() {
                this.options.filePath = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvImportLocalProjectOption";
</style>

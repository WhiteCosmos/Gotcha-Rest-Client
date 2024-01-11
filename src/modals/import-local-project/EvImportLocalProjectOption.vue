<template>
    <div class="d-flex flex-column">
        <div class="import-local-project-option">
            <div class="import-local-project-option__radio" @click="doSelectOption">
                <ev-export-type-toggle-button :flag="selected"></ev-export-type-toggle-button>
            </div>

            <div class="import-local-project-option__container">
                <div class="import-local-project-option__container__file-selector" @click.stop="doSelectProjectDirectory">
                    <span class="import-local-project-option__container__file-selector__label" v-if="projectName">{{ projectName }}</span>

                    <span class="import-local-project-option__container__file-selector__label" v-else>请选择需要导入的项目文件夹</span>
                </div>
            </div>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ul>
            <li>直接导入Java项目，通过源代码生成接口文档</li>
            <li>支持 Spring / JAX-RS / Swagger 注解</li>
        </ul>
    </div>
</template>

<script>
    import EvExportTypeToggleButton from '@/modals/export-project/export-type/EvExportTypeToggleButton'

    import _ from 'lodash'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvImportLocalProjectOption",

        components: {
            EvHorizonGutter,
            EvExportTypeToggleButton
        },

        props: {
            options: Object, // ImportLocalProjectOptions
        },

        computed: {
            selected() {
                return this.options && this.options.type === 'DIRECTORY'
            },

            projectName() {
                if (!_.isEmpty(this.options.directoryPath)) {
                    let splits = this.options.directoryPath.split("/")

                    return splits[splits.length - 1]
                }
            }
        },

        data() {
            return {}
        },

        methods: {
            doSelectOption() {
                this.options.type = 'DIRECTORY'
            },

            doSelectProjectDirectory() {
                this.options.type = 'DIRECTORY'

                const {dialog} = require('electron').remote

                dialog.showOpenDialog({properties: ['openDirectory'], securityScopedBookmarks: true})
                    .then(file => {
                        if (file.canceled) { // ignore
                            return
                        }

                        if (!_.isEmpty(file.bookmarks)) {
                            this.options.bookmark = file.bookmarks[0]
                        }

                        this.options.directoryPath = file.filePaths[0]

                        console.log("options", this.options)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvImportLocalProjectOption";
</style>

<template>
    <div class="ev-project-importer">
        <ev-project-importer-type-selector @select-project-type="handleSelectProjectType"></ev-project-importer-type-selector>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-project-importer-empty-type v-if="isEmptyType"></ev-project-importer-empty-type>

        <ev-project-importer-file-type v-if="isFileType"></ev-project-importer-file-type>

        <ev-project-importer-link-type v-if="isLinkType"></ev-project-importer-link-type>

        <ev-project-importer-folder-type v-if="isFolderType"></ev-project-importer-folder-type>
    </div>
</template>

<script>
    import EvProjectImporterTypeSelector from '@/views/titlebar/project-importer/EvProjectImporterTypeSelector'
    import EvProjectImporterFileType from '@/views/titlebar/project-importer/EvProjectImporterFileType'
    import EvProjectImporterFolderType from '@/views/titlebar/project-importer/EvProjectImporterFolderType'
    import EvProjectImporterLinkType from '@/views/titlebar/project-importer/EvProjectImporterLinkType'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import {
        EvProjectImporterEventBus,
        EvProjectImporterEvents
    } from '@/views/titlebar/project-importer/EvProjectImporterEventBus'
    import EvProjectImporterEmptyType from '@/views/titlebar/project-importer/EvProjectImporterEmptyType'

    const PROJECT_TYPE_EMPTY = "PROJECT_TYPE_EMPTY"

    const PROJECT_TYPE_FILE = "PROJECT_TYPE_FILE"

    const PROJECT_TYPE_FOLDER = "PROJECT_TYPE_FOLDER"

    const PROJECT_TYPE_LINK = "PROJECT_TYPE_LINK"

    export default {
        name: "EvProjectImporter",

        components: {
            EvProjectImporterEmptyType,
            EvHorizonGutter,
            EvVerticalGutter,
            EvProjectImporterLinkType,
            EvProjectImporterFolderType,
            EvProjectImporterFileType,
            EvProjectImporterTypeSelector
        },

        created() {
            EvProjectImporterEventBus.$on(EvProjectImporterEvents.NEW_PROJECT, (projectName) => {
                this.handleCreateNewProject(projectName)
            })

            EvProjectImporterEventBus.$on(EvProjectImporterEvents.CHOOSE_FILE, () => {
                this.handleChooseFile()
            })

            EvProjectImporterEventBus.$on(EvProjectImporterEvents.CHOOSE_LINK, (url, path) => {
                this.handleChooseLink(url, path)
            })

            EvProjectImporterEventBus.$on(EvProjectImporterEvents.CHOOSE_FOLDER, () => {
                this.handleChooseFolder()
            })
        },

        data() {
            return {
                projectType: "PROJECT_TYPE_EMPTY"
            }
        },

        computed: {
            isEmptyType() {
                return this.projectType === PROJECT_TYPE_EMPTY
            },

            isFileType() {
                return this.projectType === PROJECT_TYPE_FILE
            },

            isFolderType() {
                return this.projectType === PROJECT_TYPE_FOLDER
            },

            isLinkType() {
                return this.projectType === PROJECT_TYPE_LINK
            }
        },

        methods: {
            handleSelectProjectType(projectType) {
                this.projectType = projectType
            },

            handleCreateNewProject(name) {
                this.$emit('create-new-project', name)
            },

            handleChooseFile() {
                this.$emit('choose-file')
            },

            handleChooseLink(url, path) {
                this.$emit('choose-link', url, path)
            },

            handleChooseFolder() {
                this.$emit('choose-folder')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-importer {
        display: flex;

        flex-direction: column;

        width: 320px;

        height: 200px;

        //border-radius: 3px;

        //background-color: #FAFAFA;
    }
</style>

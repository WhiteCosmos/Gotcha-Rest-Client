<template>
    <v-menu v-bind="projectTypeSelectorMenuConfig" v-model="showProjectTypeSelectorMenu">
        <template v-slot:activator="{ on }">
            <div class="project-type-selector__icon" v-on="on">
                <ev-plus-button></ev-plus-button>
            </div>
        </template>

        <div class="project-type-selector__menu" v-if="showProjectTypeSelectorMenu">
            <ev-menu-top-indicator class="mmm"></ev-menu-top-indicator>

            <ev-project-importer @create-new-project="handleCreateNewProject"
                                 @choose-file="handleImportProjectFromFile"
                                 @choose-link="handleImportProjectFromLink"
                                 @choose-folder="handleImportProjectFromJava"></ev-project-importer>
        </div>
    </v-menu>
</template>

<script>
    import EvPlusButton from '@/components/button/EvPlusButton'
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvJavaIcon from '@/components/icon/brands/ev-java-icon'
    import EvSwaggerIcon from '@/components/icon/brands/ev-swagger-icon'
    import EvDialogMixin from '@/mixins/EvDialogMixin'

    import _ from 'lodash'
    import EvProjectImporter from '@/views/titlebar/project-importer/EvProjectImporter'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import ProjectImporterPayload from '@/views/titlebar/project-importer/ProjectImporterPayload'
    import ProjectImporterPayloadOperation from '@/views/titlebar/project-importer/ProjectImporterPayloadOperation'
    import ProjectImporterPayloadSource from '@/views/titlebar/project-importer/ProjectImporterPayloadSource'
    import AppDao from '@/AppDao'

    export default {
        name: "EvProjectTypeSelector", // EvProjectImporterButton

        components: {
            EvProjectImporter,
            EvSwaggerIcon,
            EvJavaIcon,
            EvHorizonDivider,
            EvHorizonGutter,
            EvMenuTopIndicator,
            EvPlusButton
        },

        mixins: [
            EvDialogMixin
        ],

        data() {
            return {
                showProjectTypeSelectorMenu: false,

                projectTypeSelectorMenuConfig: {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'allow-overflow': true,

                    'content-class': "my-menu",

                    'nudge-left': 157,
                },
            }
        },

        methods: {
            handleCreateNewProject(projectName) {
                this.showProjectTypeSelectorMenu = false

                new AppDao().createProject(projectName).then(({project, version}) => {
                    AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FINISHED, project, version)
                })
            },

            handleImportProjectFromFile() {
                this.showProjectTypeSelectorMenu = false

                const {dialog} = require('electron').remote

                let path = ""

                let bookmark = ""

                dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: [{name: "Json", extensions: ['json', 'yaml']}],
                    securityScopedBookmarks: true
                })
                    .then(file => {
                        if (file.canceled) {
                            return
                        }

                        path = file.filePaths[0]

                        if (!_.isEmpty(file.bookmarks)) {
                            bookmark = file.bookmarks[0]
                        }

                        let payload = new ProjectImporterPayload()

                        payload.operation = ProjectImporterPayloadOperation.IMPORT

                        payload.source = ProjectImporterPayloadSource.FILE

                        payload.path = path

                        payload.bookmark = bookmark

                        AppEventBus.$emit(AppEvents.IMPORT_PROJECT, payload)
                    })
            },

            handleImportProjectFromLink(url, path) {
                this.showProjectTypeSelectorMenu = false

                const fs = require('fs')

                const md5 = require('md5')

                let payload = new ProjectImporterPayload()

                payload.operation = ProjectImporterPayloadOperation.IMPORT

                payload.source = ProjectImporterPayloadSource.URL

                payload.url = url

                payload.temporaryPath = path

                payload.sha = md5(fs.readFileSync(path)).toUpperCase()

                AppEventBus.$emit(AppEvents.IMPORT_PROJECT, payload)
            },

            handleImportProjectFromJava() {
                this.showProjectTypeSelectorMenu = false

                const {dialog} = require('electron').remote

                let path = ""

                let bookmark = ""

                dialog.showOpenDialog({properties: ['openDirectory'], securityScopedBookmarks: true})
                    .then(file => {
                        if (file.canceled) { // ignore
                            return
                        }

                        if (!_.isEmpty(file.bookmarks)) {
                            bookmark = file.bookmarks[0]
                        }

                        path = file.filePaths[0]

                        let payload = new ProjectImporterPayload()

                        payload.operation = ProjectImporterPayloadOperation.IMPORT

                        payload.source = ProjectImporterPayloadSource.JAVA

                        payload.path = path

                        payload.bookmark = bookmark

                        AppEventBus.$emit(AppEvents.IMPORT_PROJECT, payload)
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-type-selector {
        &__icon {
            @include full-center;

            height: 24px;

            width: 24px;
        }

        &__menu {
            display: flex;

            flex-direction: column;

            background-color: #FCFCFC;

            padding: 8px;

            //background-color: #F1F1F1;

            //width: 160px;

            border-radius: 4px;

            //overflow: auto;
        }

        &__menu-item {
            height: 32px;

            display: flex;

            align-items: center;

            padding-left: 8px;

            padding-right: 4px;

            margin-left: 4px;

            margin-right: 4px;

            border-radius: 4px;

            &:hover {
                background-color: #F1F1F1;
            }
        }

        &__menu-label {
            font-size: 12px;

            font-weight: bold;

            color: $PRIMARY_COLOR;

            margin-left: 8px;

            user-select: none;
        }
    }

    .my-menu {
        margin-top: 8px;

        contain: initial;

        overflow: visible;

        align-self: center;
    }

    .mmm {
        position: absolute;

        display: block;

        top: -12px;

        align-self: center;
    }
</style>

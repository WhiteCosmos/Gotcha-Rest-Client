<template>
    <v-app>
        <ev-app-navigation></ev-app-navigation>

        <div class="d-flex">
            <ev-app-sidebar v-show="showAppSidebar"></ev-app-sidebar>

            <ev-app-content></ev-app-content>
        </div>

        <ev-importing-processing-modal></ev-importing-processing-modal>

        <ev-importing-failed-modal></ev-importing-failed-modal>

        <ev-remove-project-modal @confirm="handleRemoveProject"></ev-remove-project-modal>

        <ev-remove-version-modal @confirm="handleRemoveVersion"></ev-remove-version-modal>
    </v-app>
</template>

<script>
    import EvAppNavigation from "@/views/titlebar/EvAppNavigation"
    import EvAppSidebar from "@/views/sidebar/EvAppSidebar"
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import EvAppContent from '@/views/content/EvAppContent'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import Evalon4JExecutor from '@/core/Evalon4JExecutor'
    import AppDao from '@/AppDao'
    import RabiProjectDao from '@/core/dao/RabiProjectDao'
    import EvImportingProcessingModal from '@/components/modal/EvImportingProcessingModal'
    import EvImportingFailedModal from '@/components/modal/EvImportingFailedModal'
    import EvNotificationMixin from '@/mixins/EvNotificationMixin'
    import EvalonUrlHelper from '@/core/EvalonUrlHelper'
    import Evalon4JParseResult from '@/data/evalon/Evalon4JParseResult'
    import EvRemoveProjectModal from '@/components/modal/EvRemoveProjectModal'
    import EvAppCacheMixin from '@/mixins/EvAppCacheMixin'
    import EvRemoveVersionModal from '@/components/modal/EvRemoveVersionModal'
    import AppConfig from './AppConfig'

    export default {
      name: 'App',

      components: {
        EvRemoveVersionModal,
        EvRemoveProjectModal,
        EvImportingFailedModal,
        EvImportingProcessingModal,
        EvAppContent,
        EvVerticalDivider,
        EvAppSidebar,
            EvAppNavigation,
        },

        mixins: [
            EvStoreMixin,
            EvDialogMixin,
            EvNotificationMixin,
            EvAppCacheMixin,
        ],

        created() {
            this.initializeProject()

            this.interceptClickUrl()

            // this.interceptDoubleClick() // TODO 需要优化

            AppEventBus.$on(AppEvents.IMPORT_PROJECT, (payload) => {
                this.handleImportProject(payload)
            })

            AppEventBus.$on(AppEvents.TOGGLE_APP_SIDEBAR, () => {
                this.showAppSidebar = !this.showAppSidebar
            })
        },

        mounted() {

        },

        watch: {
            currentProject: {
                deep: true,
                handler() {
                    this.saveCurrentProject()
                },
            },

            // currentModule: {
            //     deep: true,
            //     handler() {
            //         this.saveCurrentModule()
            //     },
            // }
        },

        data() {
            return {
                showSnackbar: false,

                showMaximumSnackbar: false,

                selectedProjectPath: "",

                selectedProjectBookmark: "",

                showProjectAddDialog: false,

                showImportingProjectDialog: false,

                selection: undefined,

                showAppSidebar: true,
            }
        },

        methods: {
            async initializeProject() {
                let playground = await new RabiProjectDao().queryPlaygroundProject()

                if (!playground) {
                    new AppDao().createPlayground().then(({project, version}) => {
                        AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FINISHED, project, version)
                    })
                } else {
                    AppEventBus.$emit(AppEvents.INITIALIZE_PROJECTS_FINISHED)
                }
            },

            async handleRemoveProject() {
                let name = this.currentProject.name

                await new AppDao().removeProject(this.currentProject)

                AppEventBus.$emit(AppEvents.REMOVE_PROJECT_FINISHED)

                this.sendNotification("Remove Complete", `Project ${name} has been removed`)
            },

            async handleRemoveVersion() {
                let name = this.currentVersion.name

                await new AppDao().removeVersion(this.currentVersion)

                AppEventBus.$emit(AppEvents.REMOVE_VERSION_FINISHED)

                this.sendNotification("Remove Complete", `Version ${name} has been removed`)
            },

            handleImportProject(payload) {
                this.showImportingProjectDialog = true

                if (payload.isFromUrl()) {
                    this._handleImportRemoteProject(payload)
                } else {
                    this._handleImportLocalProject(payload)
                }
            },

            _handleImportLocalProject(payload) {
                new Evalon4JExecutor().execute(payload)
                    .then(evalon4JParseResult => {
                        new AppDao().importProject(evalon4JParseResult).then(({project, version}) => {
                            AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FINISHED, project, version)

                            this.sendNotification("Import Complete", `Project ${project.name} has been created`)
                        })
                    }).catch(evalon4JParseResult => {
                    AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FAILED, evalon4JParseResult)
                })
            },

            _handleImportRemoteProject(payload) {
                let url = payload.url

                let filename = EvalonUrlHelper.getFileNameFromUrl(url)

                const path = require('path')

                const fs = require('fs')

                let dirname = ""

                if (AppConfig.isDevelopment()) {
                    dirname = path.resolve(__dirname, '..', '..')
                } else {
                    let {app} = require('electron').remote

                    dirname = app.getPath("appData")
                }

                const got = require('got')

                got(url, {timeout: {response: 60000}}).then(response => {
                    let filePath = path.join(dirname, filename)

                    fs.writeFileSync(filePath, response.body)

                    payload.temporaryPath = filePath

                    new Evalon4JExecutor().execute(payload)
                        .then(evalon4JParseResult => {
                            new AppDao().importProject(evalon4JParseResult).then(({project, version}) => {
                                AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FINISHED, project, version)

                                this.sendNotification("Import Complete", `Project ${project.name} has been created.`)
                            })
                        }).catch(evalon4JParseResult => {
                        AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FAILED, evalon4JParseResult)

                        this.sendNotification("Import Failed")
                    })
                }).catch(error => {
                    let evalon4JParseResult = Evalon4JParseResult.NETWORK_ERROR(error)

                    AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FAILED, evalon4JParseResult)
                })
            },

            registryListeners() {
                require('electron').ipcRenderer.on('reset-database', (event, message) => {
                    // db.delete()
                    //
                    // this.initRepositories()
                })

                require('electron').ipcRenderer.on('change-locale', (event, message) => {
                    this.$i18n.locale = message
                })
            },

            interceptClickUrl() {
                document.body.addEventListener('click', event => {
                    if (event.target.tagName.toLowerCase() === 'a') {
                        event.preventDefault()
                        require("electron").shell.openExternal(event.target.href)
                    }
                })
            },
        },
    }
</script>

<style lang="scss">
    //* {
    //-webkit-user-select: none;

    //font-family: "SF Pro", sans-serif;
    //}

    //*, *::after, *::before {
    //-webkit-user-select: none;
    //-webkit-user-drag: none;
    //-webkit-app-region: no-drag;
    //cursor: default;
    //}

    html {
        overflow-y: hidden !important;
    }

    span {
        font-family: "SF Pro", sans-serif;
    }

    input {
        border: none;

        outline: none;
    }
</style>

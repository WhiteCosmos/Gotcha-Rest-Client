<template>
    <v-menu v-bind="menu_config" v-model="showProjectSelector" transition="dummy">
        <template v-slot:activator="{ on }">
            <ev-project-label :events="on" :active="showProjectSelector" :project="selectedProject"></ev-project-label>
        </template>

        <ev-project-menu :projects="projects" :active="showProjectSelector" @select-project="handleSelectProject"></ev-project-menu>
    </v-menu>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvProjectLabel from "@/views/titlebar/project-selector/EvProjectLabel"
    import EvProjectMenu from "@/views/titlebar/project-selector/EvProjectMenu"
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import RabiProjectDao from '@/core/dao/RabiProjectDao'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvAppCacheMixin from '@/mixins/EvAppCacheMixin'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCCookieJarsDao from '@/data/gotcha/http-operation/cookie/GHCCookieJarsDao'
    import GHCCookieJarsBuilder from '@/data/gotcha/http-operation/cookie/GHCCookieJarsBuilder'
    import GHCEnvironmentsDao from '@/data/gotcha/http-operation/environment/GHCEnvironmentsDao'
    import GHCEnvironmentsBuilder from '@/data/gotcha/http-operation/environment/GHCEnvironmentsBuilder'

    import _ from 'lodash'
    import GHCCachedRequestUrlDao from '@/data/gotcha/http-operation/cache/GHCCachedRequestUrlDao'
    import GHCDynamicVariableRender from '@/components/dynamic-variable/GHCDynamicVariableRender'
    import GHCProjectExportConfigWrapper from '@/data/gotcha/GHCProjectExportConfigWrapper'
    import GHCHttpOperation from '@/data/gotcha/http-operation/GHCHttpOperation'
    import GHCUXSettings from '@/data/gotcha/GHCUXSettings'

    export default {
        name: "EvProjectSelector",

        components: {
            EvProjectMenu,
            EvProjectLabel,
            EvVerticalGutter,
        },

        mixins: [
            EvDialogMixin,
            EvAppCacheMixin,
            EvStoreMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.INITIALIZE_PROJECTS_FINISHED, () => {
                this.handleInitializeProjectsFinished()
            })

            AppEventBus.$on(AppEvents.IMPORT_PROJECT_FINISHED, (project, version) => {
                this.handleImportProjectFinished(project, version)
            })

            AppEventBus.$on(AppEvents.REMOVE_PROJECT_FINISHED, () => {
                this.handleRemoveProjectFinished()
            })
        },

        data() {
            return {
                showProjectSelector: false,

                projects: [],

                selectedProject: undefined,
            }
        },

        methods: {
            async handleInitializeProjectsFinished() {
                this.handleInitializeCachedRequestUrls()

                this.projects = await new RabiProjectDao().batchQuery()

                this.selectedProject = this.getLastSelectedProject(this.projects)

                // 把新版本中加入的属性更新到之前的项目上面
                this.injectProjectProperties(this.selectedProject)

                this.handleSelectProject(this.selectedProject)
            },

            injectProjectProperties(project) {
                // Since 1.6.0

                if (!project.hasOwnProperty('globalVariables')) {
                    this.$set(project, 'globalVariables', [])
                }

                if (!project.hasOwnProperty('exportConfig')) {
                    this.$set(project, 'exportConfig', new GHCProjectExportConfigWrapper())
                }

                if (!project.hasOwnProperty('jsonSchemaGroups')) {
                    this.$set(project, 'jsonSchemaGroups', [])
                }

                // Since 1.6.1

                if (!project.hasOwnProperty('servers')) {
                    this.$set(project, 'servers', [])
                }

                // Since 1.6.3

                if (!project.hasOwnProperty('globalTemplate')) {
                    this.$set(project, 'globalTemplate', new GHCHttpOperation())
                }

                if (!project.hasOwnProperty('requestTemplates')) {
                    this.$set(project, 'requestTemplates', [])
                }

                if (!project.hasOwnProperty('uxSettings')) {
                    this.$set(project, 'uxSettings', new GHCUXSettings())
                }
            },

            handleSelectProject(project) {
                this.showProjectSelector = false

                this.selectedProject = project

                this.handleInitializeProjectEnvironment(this.selectedProject)

                this.handleInitializeProjectCookieJars(this.selectedProject)

                this.updateLastSelectedProject(this.selectedProject)

                AppEventBus.$emit(AppEvents.SELECT_PROJECT, this.selectedProject)
            },

            async handleInitializeProjectEnvironment(project) {
                let environments = await new GHCEnvironmentsDao().query({
                    projectId: project.id
                })

                if (!environments) {
                    environments = new GHCEnvironmentsBuilder(project).build()

                    await new GHCEnvironmentsDao().save(environments)
                }

                if (!_.isEmpty(environments.environments)) {
                    let selectedEnvironment = environments.environments.find(it => {
                        return it.uid === environments.selectedEnvironmentUID
                    })

                    if (!selectedEnvironment) {
                        selectedEnvironment = environments.environments[0]

                        environments.selectedEnvironmentUID = selectedEnvironment.uid
                    }

                    this.setCurrentEnvironment(selectedEnvironment)
                } else {
                    this.setCurrentEnvironment(undefined)
                }

                this.setCurrentEnvironments(environments)

                this.initializeDynamicVariableRender()
            },

            async handleInitializeProjectCookieJars(project) {
                let cookieJars = await new GHCCookieJarsDao().query({
                    projectId: project.id
                })

                if (!cookieJars) {
                    cookieJars = new GHCCookieJarsBuilder(project).build()

                    await new GHCCookieJarsDao().save(cookieJars)
                }

                let selectedCookieJar

                if (cookieJars.selectedCookieJarUID) {
                    selectedCookieJar = cookieJars.cookieJars.find(it => {
                        return it.uid === cookieJars.selectedCookieJarUID
                    })
                } else {
                    selectedCookieJar = cookieJars.cookieJars[0]
                }

                this.setCurrentCookieJar(selectedCookieJar)

                this.setCurrentCookieJars(cookieJars)
            },

            handleInitializeCachedRequestUrls() {
                new GHCCachedRequestUrlDao().queryAll().then(urls => {
                    this.setCachedRequestUrls(urls.map(it => {
                        return it.url
                    }))
                })
            },

            initializeDynamicVariableRender() {
                let dynamicVariableRender = new GHCDynamicVariableRender(this.currentEnvironments, this.currentVariables, this.servers)

                this.setDynamicVariableRender(dynamicVariableRender)
            },

            async handleImportProjectFinished(project, version) {
                this.projects = await new RabiProjectDao().batchQuery()

                this.selectedProject = project

                await this.handleInitializeProjectEnvironment(this.selectedProject)

                await this.handleInitializeProjectCookieJars(this.selectedProject)

                this.updateLastSelectedProject(this.selectedProject)

                await this.updateLastSelectedVersion(version)

                AppEventBus.$emit(AppEvents.SELECT_PROJECT, this.selectedProject)
            },

            async handleRemoveProjectFinished() {
                this.projects = await new RabiProjectDao().batchQuery()

                this.selectedProject = this.projects[this.projects.length - 1]

                this.updateLastSelectedProject(this.selectedProject)

                AppEventBus.$emit(AppEvents.SELECT_PROJECT, this.selectedProject)
            },

            async handleRenameProject(project) {
                await new RabiProjectDao().save(project)
            },

            async handleRemoveProject(project) {

            },

            async handleSaveCookieJars() {
                await new GHCCookieJarsDao().save(this.currentCookieJars)
            },

            cancel() {
                this.showProjectSelector = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";
</style>

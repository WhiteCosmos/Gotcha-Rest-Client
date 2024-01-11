<script>
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import RabiProjectDao from '@/core/dao/RabiProjectDao'
    import RabiVersionDao from '@/core/dao/RabiVersionDao'
    import RabiModuleDao from '@/core/dao/RabiModuleDao'

    const LAST_SELECTED_PROJECT_ID = "lastSelectedProjectId"

    export default {
        name: "EvAppCacheMixin",

        created() {
            if (localStorage.getItem(LAST_SELECTED_PROJECT_ID)) {
                this.lastSelectedProjectId = Number.parseInt(localStorage.getItem(LAST_SELECTED_PROJECT_ID))
            }
        },

        mixins: [
            EvStoreMixin,
        ],

        data() {
            return {
                lastSelectedProjectId: null,

                //TODO v1.4.x Content Tabs
            }
        },

        methods: {
            getLastSelectedProject(projects) {
                let project = this._getLastSelectedItem(projects, this.lastSelectedProjectId)

                this.updateLastSelectedProject(project)

                this.setCurrentProject(project)

                return project
            },

            getLastSelectedVersion(versions) {
                let project = this.currentProject

                let version = this._getLastSelectedItem(versions, project.lastSelectedVersionId)

                this.updateLastSelectedVersion(version)

                this.setCurrentVersion(version)

                return version
            },

            getLastSelectedModule(modules) {
                let version = this.currentVersion

                let module = this._getLastSelectedItem(modules, version.lastSelectedModuleId)

                this.updateLastSelectedModule(module)

                this.setCurrentModule(module)

                return module
            },

            getLastSelectedGroup(groups) {
                let group = this._getLastSelectedItem(groups, this.lastSelectedGroupId)

                this.updateLastSelectedGroup(group)

                return group
            },

            getLastSelectedCookieJar(cookieJars) {
                let project = this.currentProject

                let cookieJar = this._getLastSelectedItem(cookieJars, project.lastSelectedCookieJarId)

                this.updateLastSelectedCookieJar(cookieJar)

                return cookieJar
            },

            getLastSelectedEnvironment() {
                // TODO
            },

            updateLastSelectedProject(project) {
                localStorage.setItem(LAST_SELECTED_PROJECT_ID, project.id)

                this.lastSelectedProjectId = project.id

                this.setCurrentProject(project)
            },

            async updateLastSelectedVersion(version) {
                this.currentProject.lastSelectedVersionId = version.id

                await new RabiProjectDao().save(this.currentProject)

                this.setCurrentVersion(version)
            },

            async updateLastSelectedModule(module) {
                this.currentVersion.lastSelectedModuleId = module.id

                await new RabiVersionDao().save(this.currentVersion)

                this.setCurrentModule(module)
            },

            async updateLastSelectedGroup(group) {
                this.currentModule.lastSelectedGroupId = group.id

                await new RabiModuleDao().save(this.currentModule)

                this.setCurrentGroup(group)
            },

            async updateLastSelectedCookieJar(cookieJar) {
                this.currentProject.lastSelectedCookieJarId = cookieJar.id

                await new RabiProjectDao().save(this.currentProject)

                this.setCurrentCookieJar(cookieJar)
            },

            _getLastSelectedItem(items, id) {
                if (id) {
                    let module = items.find(module => {
                        return module.id === id
                    })

                    if (module) {
                        return module
                    } else {
                        return items[0]
                    }
                } else {
                    return items[0]
                }
            }
        }
    }
</script>

<script>
    import RabiProjectDao from '@/core/dao/RabiProjectDao'
    import RabiModuleDao from '@/core/dao/RabiModuleDao'

    export default {
        name: "EvStoreMixin",

        computed: {
            currentProject() {
                return this.$store.state.currentProject
            },

            currentVersion() {
                return this.$store.state.currentVersion
            },

            currentModule() {
                return this.$store.state.currentModule
            },

            currentGroup() {
                return this.$store.state.currentGroup
            },

            currentCookieJar() {
                return this.$store.state.currentCookieJar
            },

            currentCookieJars() {
                return this.$store.state.currentCookieJars
            },

            currentEnvironment() {
                return this.$store.state.currentEnvironment
            },

            currentEnvironments() {
                return this.$store.state.currentEnvironments
            },

            currentVariables() {
                let project = this.currentProject

                // 项目未初始化之前不存在Project
                return project ? project.globalVariables : []
            },

            servers() {
                let project = this.currentProject

                return project ? project.servers : []
            },

            cachedRequestUrls() {
                return this.$store.state.cachedRequestUrls
            },

            dynamicVariableRender() {
                return this.$store.state.dynamicVariableRender
            },

            // Json Schema

            jsonSchemaGroups() {
                let project = this.currentProject

                if (!project) {
                    return []
                }

                let jsonSchemaGroups = project.jsonSchemaGroups

                let defaultGroup = jsonSchemaGroups.find(it => {
                    return it.default === true
                })

                if (!defaultGroup) {
                    defaultGroup = {
                        name: "默认分组",
                        default: true,
                        items: []
                    }

                    jsonSchemaGroups.splice(0, 0, defaultGroup)
                }

                return jsonSchemaGroups
            },

            jsonSchemaPool() {
                let pool = new Map()

                this.jsonSchemaGroups.forEach(group => {
                    group.items.forEach(item => {
                        pool.set(item.uid, item.root)
                    })
                })

                return pool
            },

            receipt() {
                return this.$store.state.receipt
            },
        },

        methods: {
            setCurrentProject(project) {
                this.$store.commit('setCurrentProject', project)
            },

            saveCurrentProject() {
                new RabiProjectDao().save(this.currentProject)
            },

            setCurrentVersion(version) {
                this.$store.commit('setCurrentVersion', version)
            },

            setCurrentModule(module) {
                this.$store.commit('setCurrentModule', module)
            },

            saveCurrentModule() {
                new RabiModuleDao().save(this.currentModule)
            },

            setCurrentGroup(group) {
                this.$store.commit('setCurrentGroup', group)
            },

            setCurrentCookieJar(cookieJar) {
                this.$store.commit('setCurrentCookieJar', cookieJar)
            },

            setCurrentCookieJars(cookieJars) {
                this.$store.commit('setCurrentCookieJars', cookieJars)
            },

            setCurrentEnvironment(environment) {
                this.$store.commit('setCurrentEnvironment', environment)
            },

            setCurrentEnvironments(environments) {
                this.$store.commit('setCurrentEnvironments', environments)
            },

            setCachedRequestUrls(urls) {
                this.$store.commit('setCachedRequestUrls', urls)
            },

            setDynamicVariableRender(dynamicVariableRender) {
                this.$store.commit('setDynamicVariableRender', dynamicVariableRender)
            },

            setReceipt(receipt) {
                this.$store.commit('setReceipt', receipt)
            },

            checkIsCurrentProject(project) {
                return this.currentProject && this.currentProject.id === project.id
            },

            checkIsCurrentVersion(version) {
                return this.currentVersion && this.currentVersion.id === version.id
            },

            checkIsCurrentModule(module) {
                return this.currentModule && this.currentModule.id === module.id
            },

            checkIsCurrentGroup(group) {
                return this.currentGroup && this.currentGroup.id === group.id
            },

            // Http Request

            // getCurrentEnvironment() {
            //     return this.environments.environments.find(env => {
            //         return env.uid === this.environments.selectedEnvironmentUID
            //     })
            // },
            //
            // getCurrentRequestUrl(httpRequest) {
            //
            // },
        },
    }
</script>

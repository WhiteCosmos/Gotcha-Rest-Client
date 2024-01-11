import Vue
    from 'vue'
import Vuex
    from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentProject: undefined,

        currentVersion: undefined,

        currentModule: undefined,

        currentGroup: undefined,

        currentCookieJar: undefined,

        currentCookieJars: undefined,

        currentEnvironment: undefined,

        currentEnvironments: undefined,

        cachedRequestUrls: new Set(),

        dynamicVariableRender: undefined,

        receipt: undefined,
    },

    mutations: {
        setCurrentProject(state, project) {
            state.currentProject = project
        },

        setCurrentVersion(state, version) {
            state.currentVersion = version
        },

        setCurrentModule(state, module) {
            state.currentModule = module
        },

        setCurrentGroup(state, group) {
            state.currentGroup = group
        },

        setCurrentCookieJar(state, cookieJar) {
            state.currentCookieJar = cookieJar
        },

        setCurrentCookieJars(state, cookieJars) {
            state.currentCookieJars = cookieJars
        },

        setCurrentEnvironment(state, environment) {
            state.currentEnvironment = environment
        },

        setCurrentEnvironments(state, environments) {
            state.currentEnvironments = environments
        },

        setCachedRequestUrls(state, urls) {
            urls && urls.forEach(url => {
                state.cachedRequestUrls.add(url)
            })
        },

        setDynamicVariableRender(state, dynamicVariableRender) {
            state.dynamicVariableRender = dynamicVariableRender
        },

        setReceipt(state, receipt) {
            state.receipt = receipt
        },
    },
})
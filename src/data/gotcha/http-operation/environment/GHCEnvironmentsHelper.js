class GHCEnvironmentsHelper {
    constructor() {

    }

    static checkIsSingleEnvironment(environments) {
        return environments.environments && environments.environments.length === 1
    }

    static checkIsNoEnvironmentSelected(environments) {
        return !environments.selectedEnvironmentUID
    }

    static checkIsSelectedEnvironment(environments, environment) {
        return environments.selectedEnvironmentUID === environment.uid
    }

    static setSelectedEnvironment(environments, environment) {
        if (environment) {
            environments.selectedEnvironmentUID = environment.uid
        } else {
            environments.selectedEnvironmentUID = undefined
        }
    }
}

export default GHCEnvironmentsHelper
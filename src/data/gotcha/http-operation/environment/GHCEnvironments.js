/**
 * @IndexedDB
 *
 * project 1 -> 1 GHCEnvironments
 */
class GHCEnvironments {
    constructor() {
        // id

        this.projectId = -1 // -1 means GLOBAL ENVIRONMENT

        this.uid = undefined // Selected Environment UID

        this.selectedEnvironmentUID = undefined

        this.variables = [] // GHCEnvironmentVariable

        this.groups = [] // GHCEnvironmentVariableGroup

        this.environments = [] // GHCEnvironment
    }
}

export default GHCEnvironments
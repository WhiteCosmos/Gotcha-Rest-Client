/**
 * @IndexedDB
 */
class GHCVersion {
    constructor() {
        this.projectId = -1

        this.lastSelectedModuleId = -1

        /**
         * @type {string}
         */
        this.type = ""

        this.name = ""

        /**
         * SHA value for current version, check if version needs update
         *
         * @type {string}
         */
        this.sha = ""

        /**
         * Swagger Info Object
         *
         * @type {undefined}
         */
        this.swagger = undefined

        /**
         * OpenAPI Info Object
         *
         * @type {undefined}
         */
        this.openapi = undefined

        /**
         * Swagger Base Url
         *
         * @type {string}
         */
        this.baseUrl = ""
    }

    static buildFromRabiProject(project) {

    }

    static buildFromJsonVersion(project, jsonVersion) {
        let version = new GHCVersion()

        version.projectId = project.id

        version.type = jsonVersion.type

        version.name = jsonVersion.name

        version.sha = jsonVersion.sha

        version.swagger = jsonVersion.swagger

        version.openapi = jsonVersion.openapi

        version.baseUrl = jsonVersion.baseUrl

        return version
    }

    static updateFromJsonVersion(version, jsonVersion) {
        version.sha = jsonVersion.sha

        version.swagger = jsonVersion.swagger

        version.openapi = jsonVersion.openapi

        version.baseUrl = jsonVersion.baseUrl
    }
}

export default GHCVersion
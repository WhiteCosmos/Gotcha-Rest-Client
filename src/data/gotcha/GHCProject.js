import _
    from 'lodash'
import RabiProjectType
    from '@/data/gotcha/RabiProjectType'
import RabiProjectSource
    from '@/data/gotcha/RabiProjectSource'
import GHCProjectExportConfigWrapper
    from '@/data/gotcha/GHCProjectExportConfigWrapper'
import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import GHCUXSettings
    from '@/data/gotcha/GHCUXSettings'

/**
 * @IndexedDB
 */
class GHCProject {
    constructor() {
        // IndexedDB ID

        // Properties

        this.repositoryId = 1

        /**
         * Project Name
         * @type {string}
         */
        this.name = ""

        /**
         * @see RabiProjectType
         *
         * @type {string}
         */
        this.type = ""

        /**
         * @see RabiProjectSource
         * @deprecated
         * @type {string}
         */
        this.source = ""

        /**
         * Project Description
         *
         * @type {string}
         */
        this.description = ""

        /**
         * Project import from local file or folder
         *
         * @type {string}
         */
        this.path = ""

        /**
         * Security bookmark for re-access local file or folder
         *
         * @type {string}
         */
        this.bookmark = ""

        /**
         * Project import from url
         *
         * @type {string}
         */
        this.url = ""

        /**
         * File SHA value
         *
         * @type {string}
         */
        this.sha = ""

        /**
         * @type {Date}
         */
        this.createdAt = new Date()

        /**
         * @type {Date}
         */
        this.updatedAt = new Date()

        // Data

        /**
         * @since 1.4.3
         * @type {*[]}
         */
        this.globalVariables = []

        /**
         * @since 1.6.3
         * @type {GHCHttpOperation}
         */
        this.globalTemplate = new GHCHttpOperation()

        /**
         * @since 1.6.3
         * @type {*[]}
         */
        this.requestTemplates = []

        /**
         * @since 1.6.3
         * @type {GHCUXSettings}
         */
        this.uxSettings = new GHCUXSettings()

        /**
         * 项目导出配置
         *
         * @type {GHCProjectExportConfigWrapper}
         * @see EvProjectExportModal_
         * @since 1.5.0
         */
        this.exportConfig = new GHCProjectExportConfigWrapper()

        /**
         * JsonSchemaGroup -> JsonSchema
         *
         * @since 1.6.0
         */
        this.jsonSchemaGroups = []

        /**
         *
         * @type {*[]}
         * @since 1.6.1
         */
        this.servers = []
    }

    /**
     *
     * @param {JsonProject} jsonProject
     */
    static buildFromJsonProject(jsonProject) {
        let project = new GHCProject()

        project.name = jsonProject.name

        project.type = jsonProject.type

        project.description = jsonProject.description

        project.path = jsonProject.path

        project.url = jsonProject.url

        project.sha = jsonProject.sha

        project.bookmark = jsonProject.bookmark

        project.source = jsonProject.source

        return project
    }

    static buildEmptyProject(projectName) {
        let project = new GHCProject()

        if (_.isEmpty(projectName)) {
            project.name = "Awesome Project"
        } else {
            project.name = projectName
        }

        project.type = RabiProjectType.EMPTY

        project.source = RabiProjectSource.CUSTOM

        return project
    }
}

export default GHCProject
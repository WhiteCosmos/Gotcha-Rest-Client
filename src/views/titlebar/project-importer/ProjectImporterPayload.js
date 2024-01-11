import ProjectImporterPayloadOperation
    from '@/views/titlebar/project-importer/ProjectImporterPayloadOperation'
import ProjectImporterPayloadSource
    from '@/views/titlebar/project-importer/ProjectImporterPayloadSource'
import AppConfig
    from '@/AppConfig'

class ProjectImporterPayload {
    constructor() {
        this.operation = ProjectImporterPayloadOperation.IMPORT

        this.source = ProjectImporterPayloadSource.FILE

        // LOCAL FILE OR FOLDER

        this.path = undefined

        this.bookmark = undefined

        // REMOTE FILE

        this.url = undefined

        this.temporaryPath = undefined

        this.sha = undefined
    }

    isImportOperation() {
        return this.operation === ProjectImporterPayloadOperation.IMPORT
    }

    isRefreshOperation() {
        return this.operation === ProjectImporterPayloadOperation.REFRESH
    }

    isFromFile() {
        return this.source === ProjectImporterPayloadSource.FILE
    }

    isFromUrl() {
        return this.source === ProjectImporterPayloadSource.URL
    }

    isFromJava() {
        return this.source === ProjectImporterPayloadSource.JAVA
    }

    static SWAGGER_FILE() {
        const path = require('path')

        let filepath

        let filename = "swagger.json"

        if (AppConfig.isDevelopment()) {
            let dirname = path.resolve('.')

            filepath = dirname + "/public/demo/" + filename
        } else {
            let dirname = path.resolve(__dirname, '..')

            filepath = path.join(dirname, 'demo/' + filename)
        }

        let payload = new ProjectImporterPayload()

        payload.operation = ProjectImporterPayloadOperation.IMPORT

        payload.type = ProjectImporterPayloadSource.FILE

        payload.path = filepath

        // no bookmark

        return payload
    }

    static OPENAPI_FILE() {

    }
}

export default ProjectImporterPayload
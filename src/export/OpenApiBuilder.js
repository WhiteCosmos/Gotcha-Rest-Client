import Info
    from '@/export/openapi/Info'
import ExportHelper
    from '@/export/ExportHelper'
import JsonMethodContentDao
    from '@/core/dao/JsonMethodContentDao'
import PathItem
    from '@/export/swagger/PathItem'
import Operation
    from '@/export/openapi/Operation'
import JsonMethodHelper
    from '@/core/evalon4j/JsonMethodHelper'
import Tag
    from '@/export/openapi/tags/Tag'
import JsonStructContentDao
    from '@/core/dao/JsonStructContentDao'
import Schema
    from '@/export/openapi/media/Schema'

async function buildFromJsonModule(jsonModule) {
    let openAPIDefinition = jsonModule.openAPIDefinition

    let openapi = {}

    openapi.openapi = "3.0.2"

    if (openAPIDefinition && openAPIDefinition.info) {
        openapi.info = openAPIDefinition.info
    } else {
        openapi.info = new Info(jsonModule)
    }

    if (openAPIDefinition && openAPIDefinition.externalDocs) {
        openapi.externalDocs = openAPIDefinition.externalDocs
    } else {
        // openapi.externalDocs = {} // TODO
    }

    if (openAPIDefinition && openAPIDefinition.servers) {
        openapi.servers = openAPIDefinition.servers
    } else {
        openapi.servers = [] // TODO
    }

    openapi.tags = await buildTags(jsonModule)

    openapi.paths = await buildPaths(jsonModule)

    openapi.components = {
        schemas: await buildSchemas(jsonModule),
    }

    // openapi.components.requestBodies = {} // TODO

    // securitySchemes ignore

    return openapi
}

async function buildTags(jsonModule) {
    let tags = []

    for (let jsonService of jsonModule.restfulApis) {
        if (ExportHelper.isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        tags.push(new Tag(jsonService))
    }

    return tags
}

async function buildPaths(jsonModule, definitions) {
    let paths = {}

    for (let jsonService of jsonModule.restfulApis) {
        if (ExportHelper.isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        for (let jsonMethod of jsonService.methods) {
            if (ExportHelper.isUnchecked(jsonService.checkedStatus)) {
                continue
            }

            let jsonMethodContent = await JsonMethodContentDao.query(jsonMethod.id)

            if (!jsonMethodContent) {
                continue
            }

            let requestMethod = jsonMethodContent.requestMethod.toLowerCase()

            let requestPath = jsonMethodContent.fullRequestPath

            let pathItem = paths[requestPath]

            if (!pathItem) {
                pathItem = new PathItem()

                paths[requestPath] = pathItem
            }

            let operation = new Operation(jsonMethodContent, definitions)

            operation.tags = [JsonMethodHelper.getServiceSummary(jsonService)]

            pathItem[requestMethod] = operation
        }
    }

    return paths
}

async function buildSchemas(jsonModule) {
    let schemas = {}

    for (let jsonStruct of jsonModule.restfulModels) {
        let jsonStructContent = await JsonStructContentDao.query(jsonStruct.id)

        schemas[jsonStructContent.fieldTypeName] = new Schema(jsonStructContent, schemas)
    }

    return schemas
}

async function buildRequestBodies() {

}

export default {
    buildFromJsonModule
}
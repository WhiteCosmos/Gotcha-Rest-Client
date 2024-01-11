import Info
    from '@/export/swagger/Info'
import Schema
    from '@/export/swagger/Schema'
import Tag
    from '@/export/swagger/Tag'
import JsonMethodHelper
    from '@/core/evalon4j/JsonMethodHelper'
import PathItem
    from '@/export/swagger/PathItem'
import Operation
    from '@/export/swagger/Operation'
import JsonStructContentDao
    from '@/core/dao/JsonStructContentDao'
import JsonMethodContentDao
    from '@/core/dao/JsonMethodContentDao'
import _
    from 'lodash'

async function buildFromJsonModule(jsonModule) {
    let swaggerDefinition = jsonModule.swaggerDefinition

    let swagger = {}

    swagger.swagger = "2.0"

    if (swaggerDefinition && swaggerDefinition.info) {
        swagger.info = swaggerDefinition.info
    } else {
        swagger.info = new Info(jsonModule)
    }

    if (swaggerDefinition && _.isEmpty(swaggerDefinition.host)) {
        swagger.host = swaggerDefinition.host
    }

    if (swaggerDefinition && _.isEmpty(swaggerDefinition.basePath)) {
        swagger.basePath = swaggerDefinition.basePath
    }

    swagger.schemes = ["http", "https"]

    if (swaggerDefinition && _.isEmpty(swaggerDefinition.consumes)) {
        swagger.consumes = swaggerDefinition.consumes
    } else {
        swagger.consumes = []
    }

    if (swaggerDefinition && _.isEmpty(swaggerDefinition.produces)) {
        swagger.produces = swaggerDefinition.produces
    } else {
        swagger.produces = []
    }

    swagger.tags = await buildTags(jsonModule)

    swagger.paths = await buildPaths(jsonModule)

    swagger.definitions = await buildDefinitions(jsonModule)

    if (swaggerDefinition && swaggerDefinition.externalDocs) {
        swagger.externalDocs = swaggerDefinition.externalDocs
    }

    return swagger
}

async function buildDefinitions(jsonModule) {
    let definitions = {}

    for (let jsonStruct of jsonModule.restfulModels) {
        let jsonStructContent = await JsonStructContentDao.query(jsonStruct.id)

        definitions[jsonStructContent.fieldTypeName] = new Schema(jsonStructContent, definitions)
    }

    return definitions
}

async function buildTags(jsonModule) {
    let tags = []

    for (let jsonService of jsonModule.restfulApis) {
        if (isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        tags.push(new Tag(jsonService))
    }

    return tags
}

async function buildPaths(jsonModule) {
    let paths = {}

    for (let jsonService of jsonModule.restfulApis) {
        if (isUnchecked(jsonService.checkedStatus)) {
            continue
        }

        for (let jsonMethod of jsonService.methods) {
            if (isUnchecked(jsonMethod.checkedStatus)) {
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

            let operation = new Operation(jsonMethodContent)

            operation.tags = [JsonMethodHelper.getServiceSummary(jsonService)]

            pathItem[requestMethod] = operation
        }
    }

    return paths
}

function isUnchecked(checkedStatus) {
    return checkedStatus && checkedStatus === "UNCHECKED"
}

export default {
    buildFromJsonModule
}
import Info
    from '@/export/swagger/Info'
import Schema
    from '@/export/swagger/Schema'
import Tag
    from '@/export/swagger/Tag'
import Operation
    from '@/export/swagger/Operation'
import PathItem
    from '@/export/swagger/PathItem'
import JsonMethodContentDao
    from '@/core/dao/JsonMethodContentDao'
import JsonStructContentDao
    from '@/core/dao/JsonStructContentDao'

class Swagger {
    constructor(jsonProject, jsonModules) {
        this.swagger = "2.0"

        this.info = new Info(jsonProject)

        this.host = ""

        this.basePath = ""

        this.schemes = ["http", "https"]

        this.consumes = []

        this.produces = []

        // !!! 多个模块如果存在同名的类型，会导致覆盖

        let definitions = {}

        for (let jsonModule of jsonModules) {
            if (isUnchecked(jsonModule)) {
                return
            }

            for (let jsonStruct of jsonModule.restfulModels) {
                let jsonStructContent = queryJsonStructContent(jsonModule.id, jsonStruct.fieldQualifiedName)

                definitions[jsonStructContent.fieldTypeName] = new Schema(jsonStructContent, definitions)
            }
        }

        this.definitions = definitions

        this.tags = []

        this.paths = {}

        for (let jsonModule of jsonModules) {
            if (isUnchecked(jsonModule)) {
                return
            }

            for (let jsonService of jsonModule.restfulApis) {
                if (isUnchecked(jsonService)) {
                    return
                }

                this.tags.push(new Tag(jsonService))

                for (let jsonMethod of jsonService.methods) {
                    let jsonMethodContent = queryJsonMethodContent(jsonMethod.contentId)

                    if (!jsonMethodContent) {
                        return
                    }

                    let requestMethod = jsonMethodContent.requestMethod.toLowerCase() // Swagger中请求方法小写

                    let requestPath = jsonMethodContent.fullRequestPath

                    let pathItem = this.paths[requestPath]

                    if (!pathItem) {
                        pathItem = new PathItem()

                        this.paths[requestMethod] = pathItem
                    }

                    pathItem[requestPath] = new Operation(jsonMethodContent, definitions)
                }
            }
        }
    }
}

async function queryJsonMethodContent(contentId) {
    return await JsonMethodContentDao.query(contentId)
}

async function queryJsonStructContent(contentId) {
    return await JsonStructContentDao.query(contentId)
}

function isUnchecked(checkedStatus) {
    return checkedStatus && checkedStatus === "UNCHECKED"
}

export default Swagger

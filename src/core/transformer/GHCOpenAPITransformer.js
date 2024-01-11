import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import GHCRequestParameterItem
    from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
import GHCAbstractTransformer
    from '@/core/transformer/GHCAbstractTransformer'
import GHCTreeNode
    from '@/components/api-tree/data/GHCTreeNode'
import GHCMIMEType
    from '@/core/GHCMIMEType'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import GHCJsonSchemaPropertiesUtil
    from '@/core/transformer/GHCJsonSchemaPropertiesUtil'
import GHCOpenAPIComponentTransformer
    from '@/core/transformer/GHCOpenAPIComponentTransformer'
import _
    from 'lodash'
import RabiHttpResponseExample
    from '@/data/gotcha/http-operation/RabiHttpResponseExample'
import {
    STATUS_CODES
} from 'http'

/**
 * @created_at 2022/4/15
 * @app_version 1.4.5
 */
class GHCOpenAPITransformer extends GHCAbstractTransformer {
    constructor(openapi) {
        super()

        this.openapi = openapi

        this.treeNodePool = new Map()

        this.componentTransformer = new GHCOpenAPIComponentTransformer({openapi: this.openapi})
    }

    transformToRequests(options) {
        let jsonSchemaGroup = this.componentTransformer.toJsonSchemas()

        this.jsonSchemas = jsonSchemaGroup.items

        let treeViewGroup = this._buildApiTreeViewGroup()

        let paths = this.openapi['paths']

        for (const [path, methods] of Object.entries(paths)) {
            for (const [method, operation] of Object.entries(methods)) {
                this._buildHttpOperation(method.toUpperCase(), path, operation)
            }
        }

        return {
            treeNode: treeViewGroup,

            jsonSchemaGroup: jsonSchemaGroup
        }
    }

    _buildRootTreeNode() {
        let titleNode = GHCTreeNode.newTreeViewGroupNode()

        titleNode.expand = false

        let info = this.openapi['info']

        if (info) {
            titleNode.name = info.title || 'No Title'

            if (info.version) {
                let versionNode = GHCTreeNode.newTreeViewGroupNode()

                versionNode.expand = false

                versionNode.name = info.version

                titleNode.children.push(versionNode)
            }
        } else {
            titleNode.name = 'No Title'
        }


        return titleNode
    }

    _buildApiTreeViewGroup() {
        let titleNode = this._buildRootTreeNode()

        let tags = this.openapi['tags']

        tags.forEach(tag => {
            let treeNode = GHCTreeNode.newTreeViewGroupNode()

            treeNode.expand = false

            treeNode.name = tag['name']

            // TODO description & link

            this.treeNodePool.set(tag['name'], treeNode)

            if (_.isEmpty(titleNode.children)) {
                titleNode.children.push(treeNode)
            } else {
                let versionNode = titleNode.children[0]

                versionNode.children.push(treeNode)
            }
        })

        return titleNode
    }

    _buildHttpOperation(method, path, operation) {
        let httpOperation = new GHCHttpOperation()

        httpOperation.requestMethod = method

        httpOperation.name = operation['summary']

        httpOperation.requestMethod = method

        httpOperation.requestPath = path

        let httpRequest = httpOperation.httpRequest

        httpRequest.name = operation['summary'] // TODO httpOperation 和 httpRequest 都存在name字段 需要重构

        httpRequest.description = operation['description']

        httpRequest.operationId = operation['operationId']

        httpRequest.deprecated = !!operation['deprecated']

        if (operation['externalDocs']) {
            httpRequest.externalUrl = operation['externalDocs']['url']
        }

        this._buildRequestUrl(method, path, httpRequest)

        this._buildRequestParameters(httpRequest, operation)

        this._buildRequestBody(httpRequest, operation)

        this._buildResponseBodies(httpRequest, operation)

        this._appendRequestHeaders(httpRequest, operation)

        if (!_.isEmpty(operation['tags'])) {
            let treeNode = this.treeNodePool.get(operation['tags'][0])

            treeNode && (treeNode.children.push(this._buildRequestTreeNode(httpOperation)))
        }
    }

    _buildRequestTreeNode(httpOperation) {
        let treeNode = GHCTreeNode.newTreeViewHttpRequestNode()

        treeNode.name = httpOperation.name

        treeNode.requestMethod = httpOperation.requestMethod

        treeNode.requestPath = httpOperation.requestPath

        treeNode.httpRequest = httpOperation

        return treeNode
    }

    _appendRequestHeaders(httpRequest, operation) {
        // TODO
    }

    /**
     * @param method
     * @param path
     * @param httpRequest
     * @private
     * @see https://swagger.io/specification/#Server%20Object
     */
    _buildRequestUrl(method, path, httpRequest) {
        httpRequest.requestMethod = method

        let requestUrl = httpRequest.requestUrl

        let servers = this.openapi['servers']

        if (servers && servers.length !== 0) {
            let server = servers[0]

            this._setUrlFromServer(requestUrl, server)
        } else {
            this._setUrlAsLocalhost(requestUrl)
        }

        let parts = path.split('/')

        parts.forEach(part => {
            if (!part) {
                return
            }

            let gParameter = new GHCRequestParameterItem()

            gParameter.value = part

            gParameter.requiredStatus = 'UNCHECKED'

            httpRequest.pathParameters.push(gParameter)
        })
    }

    _buildRequestParameters(httpRequest, operation) {
        let parameters = operation['parameters']

        parameters && parameters.forEach(parameter => {
            let gParameter = new GHCRequestParameterItem()

            let schema = parameter['schema']

            gParameter.key = parameter['name']

            if (schema) {
                GHCJsonSchemaPropertiesUtil.setJsonSchemaProperties(gParameter, schema)

                if (schema['type']) {
                    gParameter.type = schema['type'] || 'string'
                } else {
                    gParameter.type = 'string'
                }

                gParameter.format = schema['format']
            }

            gParameter.value = parameter['default'] || ''

            gParameter.description = parameter['description']

            let constraint = gParameter.properties.constraint

            constraint.required = parameter['required'] ? 'CHECKED' : 'UNCHECKED'

            constraint.deprecated = parameter['deprecated'] ? 'CHECKED' : 'UNCHECKED'

            constraint.allowEmptyValue = parameter['allowEmptyValue'] ? 'CHECKED' : 'UNCHECKED'

            let format = gParameter.properties.format

            format.style = parameter['style']

            format.explode = !!parameter['explode']

            format.allowReserved = !!parameter['allowReserved']

            // 暂时忽略 Schema 和 Ref

            if (parameter['in'] === 'header') {
                httpRequest.headers.push(gParameter)
            }

            if (parameter['in'] === 'cookie') {
                httpRequest.cookies.push(gParameter)
            }

            if (parameter['in'] === 'path') {
                let existsPath = httpRequest.pathParameters.find(param => {
                    return param.value === `{${gParameter.key}}`
                })

                if (existsPath) {
                    let index = httpRequest.pathParameters.indexOf(existsPath)

                    gParameter.requiredStatus = 'CHECKED' // Path 参数强制 Required

                    gParameter.value = existsPath.value

                    httpRequest.pathParameters[index] = gParameter // 作替换处理
                }

                // 未在Path中写{param}格式的参数作丢弃处理
            }

            if (parameter['in'] === 'query') {
                httpRequest.queryParameters.push(gParameter)
            }
        })
    }

    /*
    OpenAPI 支持存在多个Content, Content-Type 设置为枚举
     */
    _buildRequestBody(httpRequest, operation) {
        let requestBody = operation['requestBody']

        if (!requestBody) {
            return
        }

        let description = requestBody['description'] // Ignore

        let content = requestBody['content']

        if (!content || Object.keys(content).length === 0) {
            return
        }

        let payload = httpRequest.payload

        payload.dType = 'schema'

        // ContentTypes

        for (let contentType in content) {
            payload.dContentTypes.push(contentType)
        }

        // Schema

        for (let contentType in content) {
            let media = content[contentType]

            if (media.schema) {
                payload.dSchema = this.componentTransformer.toJsonSchema(media.schema)
            }

            break // 只读取一个Schema
        }

        for (let contentType in content) {
            let schema = content[contentType]['schema']

            if (contentType === GHCMIMEType.APPLICATION_JSON) {
                payload.type = GHCHttpRequestPayloadType.TEXT

                let text = httpRequest.payload.text

                text.contentType = GHCMIMEType.APPLICATION_JSON

                text.mode = 'json'

                text.content = this._buildJsonFromSchema(schema)
            }

            if (contentType === GHCMIMEType.APPLICATION_XML) {
                // TODO
            }

            if (contentType === GHCMIMEType.FORM_URLENCODED) {

            }
        }

        // example

        // examples

        // encoding

        // TODO 为每种类型创建对应的Request Body
    }

    _buildResponseBodies(httpRequest, operation) {
        let responses = operation['responses']

        if (_.isEmpty(responses)) {
            return
        }

        for (let statusCode in responses) {
            let example = new RabiHttpResponseExample()

            let response = responses[statusCode]

            let headers = response['headers']

            if (headers) {
                for (let key in headers) {
                    let value = headers[key]

                    let item = new GHCRequestParameterItem()

                    item.key = key

                    let schema = value.schema

                    if (schema) {

                        GHCJsonSchemaPropertiesUtil.setJsonSchemaProperties(item, schema)

                        if (schema['type']) {
                            item.type = schema['type'] || 'string'
                        } else {
                            item.type = 'string'
                        }

                        item.format = schema['format']
                    }

                    item.description = value['description']

                    example.headers.push(item)
                }
            }

            example.statusCode = statusCode

            const {STATUS_CODES} = require('http')

            example.statusText = STATUS_CODES[statusCode]

            example.description = response.description

            let content = response['content']

            if (content) {
                example.dType = 'schema'

                for (let contentType in content) {
                    example.dContentTypes.push(contentType)
                }

                for (let contentType in content) {
                    let media = content[contentType]

                    if (media.schema) {
                        example.dSchema = this.componentTransformer.toJsonSchema(media.schema)
                    }

                    break // 只读取一个Schema
                }
            }

            // example

            httpRequest.examples.push(example)
        }
    }

    _buildJsonFromSchema(schema) {
        let resolvedSchemas = new Set()

        let json = this._resolveSchemaRecursively(schema, resolvedSchemas)

        return JSON.stringify(json, null, 2)
    }

    /**
     * @private
     * @see https://swagger.io/docs/specification/data-models/data-types
     */
    _resolveSchemaRecursively(schema, resolvedSchemas = new Set()) {
        if (!schema) {
            return
        }

        if (schema['$ref']) {
            schema = this._getSchemaByRef(schema['$ref'])
        }

        let type = schema['type']

        if (type === 'string') {
            return ''
        }

        if (type === 'number') {
            return 0
        }

        if (type === 'integer') {
            return 0
        }

        if (type === 'boolean') {
            return false
        }

        if (type === 'array') {
            return [this._resolveSchemaRecursively(schema['items'])]
        }

        if (type === 'object') {
            if (this._checkIsFreeFormObject(schema)) {
                return {} // Nothing to do
            }

            let obj = {}

            let ref = schema['$ref']

            if (ref) {
                schema = this._getSchemaByRef(ref)

                if (resolvedSchemas.has(ref)) { // jump over recursively ref
                    return obj
                } else {
                    resolvedSchemas.add(ref)
                }
            }

            let properties = schema['properties']

            if (!properties) {
                return obj
            }

            for (let [key, value] of Object.entries(properties)) {
                obj[key] = this._resolveSchemaRecursively(value, resolvedSchemas)
            }

            return obj
        }
    }

    // Utils

    _getSchemaByRef(ref) {
        let name = ref.replace('#/components/schemas/', '')

        return this.openapi['components']['schemas'][name]
    }

    _checkIsFreeFormObject(schema) { // Aka map dictionary ...
        return schema.hasOwnProperty('additionalProperties')
    }

    transformToDefinitions() {
        // TODO
    }

    // Url Utils

    _setUrlAsLocalhost(requestUrl, basePath = '') {
        requestUrl.host = 'localhost'

        requestUrl.port = 8080

        requestUrl.basePath = basePath
    }

    _setUrlFromServer(requestUrl, server) {
        let url = server.url

        if (url) {
            if (this._checkIsFullUrl(url)) {
                let Url = require('url-parse')

                let url_ = new Url(url)

                requestUrl.host = url_['hostname'] || 'localhost'

                requestUrl.port = url_['port']

                requestUrl.basePath = url_['pathname'] || ''
            }

            if (this._checkIsUrlPath(url)) {
                this._setUrlAsLocalhost(requestUrl, url)
            }
        } else {
            this._setUrlAsLocalhost(requestUrl)
        }
    }

    _checkIsUrlPath(value) {
        return value && value.startsWith('/')
    }

    _checkIsFullUrl(value) {
        return value && (value.startsWith('http://') || value.startsWith('https://'))
    }
}

export default GHCOpenAPITransformer
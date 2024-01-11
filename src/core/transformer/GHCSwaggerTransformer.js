/**
 * @created_at 2022/4/15
 * @app_version 1.4.5
 */
import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import GHCRequestParameterItem
    from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import GHCTreeNode
    from '@/components/api-tree/data/GHCTreeNode'

import _
    from 'lodash'
import MultipartFormItem
    from '@/views/http-client/components/multipart-form-editor/MultipartFormItem'
import GHCAbstractTransformer
    from '@/core/transformer/GHCAbstractTransformer'
import GHCOpenAPIComponentTransformer
    from '@/core/transformer/GHCOpenAPIComponentTransformer'
import RabiHttpResponseExample
    from '@/data/gotcha/http-operation/RabiHttpResponseExample'
import KeyValueItem
    from '@/views/http-client/request/key-value-editor/KeyValueItem'
import GHCJsonSchemaPropertiesUtil
    from '@/core/transformer/GHCJsonSchemaPropertiesUtil'

/**
 * 导出 rootTreeNode 1 -> N treeNode 1 -> 1 httpRequest or httpDefinition
 * @since 1.4.5
 */
class GHCSwaggerTransformer extends GHCAbstractTransformer {
    constructor(swagger) {
        super()

        this.swagger = swagger

        this.treeNodePool = new Map() // name -> treeNode

        this.jsonSchemas = []

        this.componentTransformer = new GHCOpenAPIComponentTransformer({swagger: this.swagger})
    }

    /**
     * return nodes and requests
     */
    transformToRequests(options) {
        let jsonSchemaGroup = this.componentTransformer.toJsonSchemas()

        this.jsonSchemas = jsonSchemaGroup.items

        let treeViewGroup = this._buildApiTreeViewGroup()

        let paths = this.swagger['paths']

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

    _buildTitleTreeNode() {
        let titleNode = GHCTreeNode.newTreeViewGroupNode()

        titleNode.expand = false

        let info = this.swagger.info

        if (info) {
            titleNode.name = info.title

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
        let titleNode = this._buildTitleTreeNode()

        let tags = this.swagger['tags']

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

        httpOperation.name = operation['summary']

        httpOperation.requestMethod = method

        httpOperation.requestPath = path

        let httpRequest = httpOperation.httpRequest

        httpRequest.name = operation['summary'] // TODO httpOperation 和 httpRequest 都存在name字段 需要重构

        httpRequest.description = operation['description']

        httpRequest.operationId = operation['operationId']

        httpRequest.deprecated = operation['deprecated'] || false

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
        if (httpRequest.requestMethod === 'post') {

        }

        // TODO
    }

    _buildRequestUrl(method, path, httpRequest) {
        httpRequest.requestMethod = method

        let requestUrl = httpRequest.requestUrl

        let host = this.swagger['host']

        if (host) {
            if (!host.startsWith('http://') && !host.startsWith('https://')) {
                host = `http://${host}`
            }

            let Url = require('url-parse')

            let url = new Url(host)

            requestUrl.host = url['hostname'] || 'localhost'

            requestUrl.port = url['port']
        }

        requestUrl.basePath = this.swagger['basePath'] || ''

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
            if (parameter['in'] === 'formData') {
                let payload = httpRequest.payload

                payload.type = GHCHttpRequestPayloadType.MULTIPART

                payload.dType = 'multipart'

                let gParameter = new MultipartFormItem()

                gParameter.key = parameter['name']

                gParameter.type = parameter['type'] || 'string'

                gParameter.format = parameter['format']

                gParameter.value = parameter['default'] || ''

                gParameter.requiredStatus = parameter['required'] ? 'CHECKED' : 'UNCHECKED'

                if (parameter.type === 'file') {
                    gParameter.type = 'file'
                }

                gParameter.description = parameter['description']

                GHCJsonSchemaPropertiesUtil.setJsonSchemaProperties(gParameter, parameter)

                payload.multipart.items.push(gParameter)
            } else {
                let gParameter = new GHCRequestParameterItem()

                gParameter.key = parameter['name']

                gParameter.type = parameter['type'] || 'string'

                gParameter.format = parameter['format']

                gParameter.value = parameter['default'] || ''

                gParameter.requiredStatus = parameter['required'] ? 'CHECKED' : 'UNCHECKED'

                gParameter.description = parameter['description']

                GHCJsonSchemaPropertiesUtil.setJsonSchemaProperties(gParameter, parameter)

                if (parameter['in'] === 'header') {
                    httpRequest.headers.push(gParameter)
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
            }
        })
    }

    _buildRequestBody(httpRequest, operation) {
        let parameters = operation['parameters']

        if (!parameters) {
            return
        }

        let body = parameters.find(parameter => {
            return parameter['in'] === 'body'
        })

        if (body && body['schema']) {
            let schema = body['schema']

            let payload = httpRequest.payload

            // payload.type = GHCHttpRequestPayloadType.TEXT
            //
            // let text = payload.text
            //
            // text.contentType = GHCMIMEType.APPLICATION_JSON
            //
            // text.mode = 'json'
            //
            // text.content = this._buildJsonFromSchema(schema)

            payload.dType = 'schema'

            let consumes = operation['consumes']

            payload.dContentTypes = consumes || ['application/json'] // 默认设置为Json

            payload.dSchema = this.componentTransformer.toJsonSchema(schema)
        }
    }

    _buildResponseBodies(httpRequest, operation) {
        let responses = operation['responses']

        if (_.isEmpty(responses)) {
            return
        }

        for (let statusCode in responses) {
            let example = new RabiHttpResponseExample()

            let response = responses[statusCode]

            example.statusCode = statusCode

            const {STATUS_CODES} = require('http')

            example.statusText = STATUS_CODES[statusCode]

            example.description = response.description

            let schema = response['schema']

            if (schema) {
                example.dType = 'schema'

                example.dSchema = this.componentTransformer.toJsonSchema(schema)

                let produces = operation['produces']

                example.dContentTypes = produces || ['application/json'] // 默认设置为Json
            }

            let headers = response['headers']

            if (headers) {
                for (let key in headers) {
                    let value = headers[key]

                    let item = new KeyValueItem()

                    item.key = key

                    item.description = value['description']

                    example.headers.push(item)
                }
            }

            // headers

            // examples

            httpRequest.examples.push(example)
        }
    }

    transformToDefinitions(swagger) {
        // TODO
    }

    _buildJsonFromSchema(schema) {
        let resolvedSchemas = new Set()

        // let json = this._resolveSchemaRecursively(schema, resolvedSchemas)

        // return JSON.stringify(json, null, 2)

        return ''
    }

    /**
     * @private
     * @see https://swagger.io/docs/specification/data-models/data-types
     */
    _resolveSchemaRecursively(schema, resolvedSchemas = new Set()) {
        if (!schema) {
            return
        }

        let ref = schema['$ref']

        if (ref) {
            if (resolvedSchemas.has(ref)) { // jump over recursively ref
                return {}
            } else {
                resolvedSchemas.add(ref)
            }

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

            let properties = schema['properties']

            for (let [key, value] of Object.entries(properties)) {
                obj[key] = this._resolveSchemaRecursively(value, resolvedSchemas)
            }

            return obj
        }
    }

    _setJsonSchemaProperties(gParameter, parameter) {
        this._setJsonSchemaConstraint(gParameter, parameter)

        this._setJsonSchemaEnums(gParameter, parameter)

        this._setJsonSchemaXml(gParameter, parameter)

        this._setJsonSchemaMisc(gParameter, parameter)
    }

    // Utils

    _getSchemaByRef(ref) {
        let name = ref.replace('#/definitions/', '')

        return this.swagger['definitions'][name]
    }

    _getJsonSchemaByRef(ref) {
        let name = ref.replace('#/definitions/', '')

        return this.jsonSchemas.find(jsonSchema => {
            return jsonSchema.name === name
        })
    }

    _checkIsFreeFormObject(schema) { // Aka map dictionary ...
        return schema.hasOwnProperty('additionalProperties')
    }
}

export default GHCSwaggerTransformer
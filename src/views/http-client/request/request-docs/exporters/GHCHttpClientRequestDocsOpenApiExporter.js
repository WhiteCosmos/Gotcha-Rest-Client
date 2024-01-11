import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'
import GHCOpenAPIComponentGenerator
    from '@/core/transformer/GHCOpenAPIComponentGenerator'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import _
    from 'lodash'

/**
 * @created_at 2022/12/1
 * @app_version 1.6.0
 */
class GHCHttpClientRequestDocsOpenApiExporter {
    constructor(cookieJar, dynamicVariableRender, predict = (treeNode) => {
        return true
    }) {
        this.cookieJar = cookieJar

        this.dynamicVariableRender = dynamicVariableRender

        this.predict = predict
    }

    async batchExportToOpenApi(treeNodes, jsonSchemaGroups = [], settings) {
        let openapi = {openapi: '3.0.3'}

        openapi.info = this._buildopenapiInfo(settings)

        openapi.servers = []

        openapi.tags = []

        treeNodes.forEach(treeNode => {
            if (!this.predict(treeNode)) {
                return
            }

            if (_.isEmpty(treeNode.children)) {
                return
            }

            openapi.tags.push({
                name: treeNode.name,
                description: treeNode.description
            })
        })

        openapi.paths = {}

        let httpOperationDao = new RabiHttpOperationDao()

        let componentGenerator = new GHCOpenAPIComponentGenerator(jsonSchemaGroups, 'openapi')

        for (let i = 0; i < treeNodes.length; i++) {
            let group = treeNodes[i]

            if (!this.predict(group)) {
                continue
            }

            for (let j = 0; j < group.children.length; j++) {
                let child = group.children[j]

                if (!this.predict(child)) {
                    continue
                }

                let httpOperation = await httpOperationDao.query({id: child.httpRequestId})

                if (!httpOperation) {
                    continue
                }

                let httpRequest = httpOperation.httpRequest

                let helper = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender)

                let path = helper.getRequestPathWithParameters() // build path from path parameters

                let pathItem = openapi.paths[path]

                if (!pathItem) {
                    pathItem = {}

                    openapi.paths[path] = pathItem
                }

                let operation = {}

                operation.tags = [group.name]

                operation.summary = httpRequest.name

                operation.description = httpRequest.description

                operation.operationId = httpRequest.operationId

                httpRequest.deprecated && (operation['deprecated'] = true)

                httpRequest.externalUrl && (operation['externalDocs'] = {url: httpRequest.externalUrl})

                operation.parameters = []

                this._buildUrlParameters(httpRequest, operation)

                this._buildRequestPayload(httpRequest, operation, componentGenerator)

                operation.responses = {}

                this._buildResponses(httpRequest, operation, componentGenerator)

                // Security Schema

                pathItem[httpRequest.requestMethod.toLowerCase()] = operation
            }
        }

        openapi.components = {
            schemas: componentGenerator.getDefinitions()
        }

        return openapi
    }

    _buildopenapiInfo(settings) {
        let info = {
            title: settings.title || '',
            description: settings.description || '',
            version: settings.version || '1.0.0',
            termsOfService: settings.termsOfService || '',
        }

        let contact_ = _.clone(settings.contact)

        for (let key in contact_) {
            !contact_[key] && (delete contact_[key])
        }

        if (Object.keys(contact_).length !== 0) {
            info.contact = contact_
        }

        let license_ = _.clone(settings.license)

        for (let key in license_) {
            !license_[key] && (delete license_[key])
        }

        if (Object.keys(license_).length !== 0) {
            info.license = license_
        }

        return info
    }

    _buildUrlParameters(httpRequest, operation) {
        httpRequest.headers.forEach(header => {
            if (header.key) {
                operation.parameters.push(this._buildRequestParameter(header, 'header'))
            }
        })

        httpRequest.cookies.forEach(cookie => {
            if (cookie.key) {
                operation.parameters.push(this._buildRequestParameter(cookie, 'cookie'))
            }
        })

        httpRequest.pathParameters.forEach(path => {
            if (path.requiredStatus === 'CHECKED' && path.key) {
                operation.parameters.push(this._buildRequestParameter(path, 'path'))
            }
        })

        httpRequest.queryParameters.forEach(query => {
            if (query.key) {
                operation.parameters.push(this._buildRequestParameter(query, 'query'))
            }
        })
    }

    _buildRequestPayload(httpRequest, operation, componentGenerator) {
        let payload = httpRequest.payload

        if (httpRequest.requestMethod === 'GET') { // GET 请求不允许有请求体
            return
        }

        if (payload.dType === GHCHttpRequestPayloadType.NONE) {
            return
        }

        operation.requestBody = {}

        if (payload.dType === GHCHttpRequestPayloadType.TEXT) {
            operation.requestBody['required'] = true

            operation.requestBody['content'] = {}

            let content = {}

            content[payload.dContentType ? payload.dContentType : 'application/json'] = {
                "schema": payload.dExample
            }

            operation.requestBody['content'] = content
        }

        if (payload.dType === GHCHttpRequestPayloadType.SCHEMA) {
            operation.requestBody['required'] = true

            operation.requestBody['content'] = {}

            let content = {}

            let schema = componentGenerator.generate(payload.dSchema)

            if (_.isEmpty(payload.dContentTypes)) {
                content['application/json'] = {
                    "schema": schema
                }
            } else {
                payload.dContentTypes.forEach(contentType => {
                    content[contentType] = {
                        "schema": schema
                    }
                })
            }

            operation.requestBody['content'] = content
        }

        if (payload.dType === GHCHttpRequestPayloadType.FORM) {
            operation.requestBody['required'] = true

            operation.requestBody['content'] = {}

            let form = payload.form

            let schema = {
                type: 'object',
                properties: {}
            }

            form.items.forEach(item => {
                if (!item.key) {
                    return
                }

                schema.properties[item.key] = {
                    type: item.type,
                    description: item.description
                }

                item.format && (schema.properties[item.key].format = item.format)

                // TODO Constraint
            })

            operation.requestBody['content'] = {
                'application/x-www-form-urlencoded': {
                    'schema': schema
                }
            }
        }

        if (payload.dType === GHCHttpRequestPayloadType.MULTIPART) {
            operation.requestBody['required'] = true

            operation.requestBody['content'] = {}

            let multipart = payload.multipart

            let schema = {
                type: 'object',
                properties: {}
            }

            multipart.items.forEach(item => {
                if (!item.key) {
                    return
                }

                schema.properties[item.key] = {
                    type: item.type,
                    description: item.description
                }

                item.format && (schema.properties[item.key].format = item.format)

                // TODO Constraint
            })

            operation.requestBody['content'] = {
                'multipart/form-data': {
                    'schema': schema
                }
            }
        }
    }

    _buildResponses(httpRequest, operation, componentGenerator) {
        let examples = httpRequest.examples

        if (_.isEmpty(examples)) {
            operation.responses[200] = {
                description: "Success"
            }

            return
        }

        examples.forEach(example => {
            let response = {}

            response['description'] = example.description ? example.description : example.statusText

            if (example.dType === 'text') {
                response.content = {}

                response.content[example.dContentType ? example.dContentType : 'application/json'] = {
                    example: example.dExample
                }
            }

            if (example.dType === 'schema') {
                response.content = {}

                let schema = componentGenerator.generate(example.dSchema)

                if (_.isEmpty(example.dContentTypes)) {
                    response.content['application/json'] = {
                        'schema': schema
                    }
                } else {
                    example.dContentTypes.forEach(contentType => {
                        response.content[contentType] = {
                            'schema': schema
                        }
                    })
                }
            }

            if (!_.isEmpty(example.headers)) {
                response['headers'] = {}

                example.headers.forEach(header => {
                    response['headers'][header.key] = this._buildResponseHeader(header)
                })
            }

            operation.responses[example.statusCode] = response
        })
    }

    _buildResponseHeader(gHeader) {
        let schema = {
            type: gHeader.type,
            format: gHeader.format,
        }

        let header = {
            description: gHeader.description,
            schema: schema,
        }

        this._appendRequestParameterConstraint(gHeader.properties, schema)

        this._appendRequestParameterExtensions(gHeader.properties, header)

        return header
    }

    _buildRequestParameter(gParameter, position) {
        let parameter = {
            name: gParameter.key,
            in: position,
            required: (gParameter.properties.constraint.required === 'CHECKED'),
            description: gParameter.description || '',
        }

        let constraint = gParameter.properties.constraint

        constraint.deprecated === 'CHECKED' && (parameter['deprecated'] = true)

        constraint.allowEmptyValue === 'CHECKED' && (parameter['allowEmptyValue'] = true)

        this._appendRequestParameterSchema(gParameter, parameter)

        let properties = gParameter.properties

        this._appendRequestParameterFormat(properties, parameter)

        this._appendRequestParameterExtensions(properties, parameter)

        if (position === 'path') {
            parameter.required = true

            delete parameter.allowEmptyValue
        }

        return parameter
    }

    _appendRequestParameterSchema(gParameter, parameter) {
        let schema = {
            type: gParameter.type,
            format: gParameter.format,
            default: gParameter.default,
        }

        this._appendRequestParameterConstraint(gParameter.properties, schema)

        parameter.schema = schema
    }

    _appendRequestParameterConstraint(properties, parameter) {
        let constraint = properties.constraint

        constraint.default && (parameter['default'] = constraint.default)

        // constraint.example && (parameter['example'] = constraint.example)

        if (!_.isEmpty(constraint.enums)) {
            parameter.enum = constraint.enums.map(it => {
                return it.value
            })
        }

        if (parameter.type === 'string') {
            constraint.minLength !== '' && (parameter.minLength = Number(constraint.minLength))

            constraint.maxLength !== '' && (parameter.maxLength = Number(constraint.maxLength))

            constraint.pattern !== '' && (parameter.pattern = constraint.pattern)
        }

        if (parameter.type === 'number' || parameter.type === 'integer') {
            constraint.minimum !== '' && (parameter.minimum = Number(constraint.minimum))

            constraint.exclusiveMinimum && (parameter.exclusiveMinimum = true)

            constraint.maximum !== '' && (parameter.maximum = Number(constraint.maximum))

            constraint.exclusiveMaximum && (parameter.exclusiveMaximum = true)

            constraint.multipleOf !== '' && (parameter.multipleOf = Number(constraint.multipleOf))
        }

        if (parameter.type === 'array') {
            constraint.maxItems !== '' && (parameter.minimum = Number(constraint.minimum))

            constraint.maxItems && (parameter.exclusiveMinimum = true)

            constraint.uniqueItems !== '' && (parameter.maximum = Number(constraint.maximum))
        }
    }

    _appendRequestParameterFormat(properties, parameter) {
        let format = properties.format

        format.style && (parameter['style'] = format.style)

        format.explode && (parameter['explode'] = true)

        format.allowReserved && (parameter['allowReserved'] = true)
    }

    _appendRequestParameterExtensions(properties, parameter) {
        let extensions = properties.extensions

        extensions.forEach(extension => {
            parameter[extension.key] = extension.value
        })
    }
}

export default GHCHttpClientRequestDocsOpenApiExporter
import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'
import GHCOpenAPIComponentGenerator
    from '@/core/transformer/GHCOpenAPIComponentGenerator'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import swagger
    from '@/export/swagger/Swagger'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import _
    from 'lodash'

/**
 * @created_at 2022/12/1
 * @app_version 1.6.0
 */
class GHCHttpClientRequestDocsSwaggerExporter {
    constructor(cookieJar, dynamicVariableRender, predict = (treeNode) => {
        return true
    }) {
        this.cookieJar = cookieJar

        this.dynamicVariableRender = dynamicVariableRender

        this.predict = predict
    }

    async batchExportToSwagger(treeNodes, jsonSchemaGroups = [], settings) {
        let swagger = {swagger: '2.0'}

        swagger.info = this._buildSwaggerInfo(settings)

        settings.host && (swagger.host = settings.host)

        settings.basePath && (swagger.basePath = settings.basePath)

        swagger.tags = []

        treeNodes.forEach(treeNode => {
            if (!this.predict(treeNode)) {
                return
            }

            if (_.isEmpty(treeNode.children)) {
                return
            }

            swagger.tags.push({
                name: treeNode.name,
                description: treeNode.description
            })
        })

        swagger.schemes = ['https', 'http']

        swagger.paths = {}

        let httpOperationDao = new RabiHttpOperationDao()

        let componentGenerator = new GHCOpenAPIComponentGenerator(jsonSchemaGroups, 'swagger')

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

                let pathItem = swagger.paths[path]

                if (!pathItem) {
                    pathItem = {}

                    swagger.paths[path] = pathItem
                }

                let operation = {}

                operation.tags = [group.name]

                operation.summary = httpRequest.name

                operation.description = httpRequest.description

                operation.operationId = httpRequest.operationId

                httpRequest.deprecated && (operation['deprecated'] = true)

                httpRequest.externalUrl && (operation['externalDocs'] = {url: httpRequest.externalUrl})

                operation.consumes = []

                operation.produces = []

                operation.parameters = []

                operation.responses = {}

                this._buildUrlParameters(httpRequest, operation)

                this._buildRequestPayload(httpRequest, operation, componentGenerator)

                this._buildResponses(httpRequest, operation, componentGenerator)

                // Security Schema

                pathItem[httpRequest.requestMethod.toLowerCase()] = operation
            }
        }

        swagger.definitions = componentGenerator.getDefinitions()

        return swagger
    }

    _buildSwaggerInfo(settings) {
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

        if (payload.dType === GHCHttpRequestPayloadType.NONE) {
            return
        }

        if (payload.dType === GHCHttpRequestPayloadType.TEXT) {
            operation.parameters.push({
                name: "body",
                in: "body",
                description: "",
                required: true,
                schema: {
                    example: payload.dExample
                }
            })

            operation.consumes = payload.dContentType ? [payload.dContentType] : ['application/json']
        }

        if (payload.dType === GHCHttpRequestPayloadType.SCHEMA) {
            let dSchema = payload.dSchema

            operation.parameters.push({
                name: "body",
                in: "body",
                description: "",
                required: true,
                schema: componentGenerator.generate(dSchema)
            })

            operation.consumes = _.isEmpty(payload.dContentTypes) ? ['application/json'] : payload.dContentTypes
        }

        if (payload.dType === GHCHttpRequestPayloadType.FORM) {
            let form = payload.form

            form.items.forEach(item => {
                operation.parameters.push(this._buildRequestParameter(item, 'formData'))
            })

            operation.consumes = ['application/x-www-form-urlencoded']
        }

        if (payload.type === GHCHttpRequestPayloadType.MULTIPART) {
            let multipart = payload.multipart

            multipart.items.forEach(item => {
                operation.parameters.push(this._buildRequestParameter(item, 'formData'))
            })

            operation.consumes = ['multipart/form-data']
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
                operation.produces = example.dContentType ? [example.dContentType] : ['application/json']

                response['schema'] = {
                    example: example.dExample
                }
            }

            if (example.dType === 'schema') {
                operation.produces = _.isEmpty(example.dContentTypes) ? example.dContentTypes : ['application/json']

                response['schema'] = componentGenerator.generate(example.dSchema)
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
        let header = {
            type: gHeader.type,
            format: gHeader.format,
            description: gHeader.description
        }

        // this._appendRequestParameterConstraint(gHeader.properties, header) 响应头部没有约束

        this._appendRequestParameterExtensions(gHeader.properties, header)

        return header
    }

    _buildRequestParameter(gParameter, position) {
        let parameter = {
            name: gParameter.key,
            in: position,
            description: gParameter.description || '',
            type: gParameter.type,
            format: gParameter.format,
        }

        let properties = gParameter.properties

        this._appendRequestParameterConstraint(properties, parameter)

        this._appendRequestParameterFormat(properties, parameter)

        this._appendRequestParameterExtensions(properties, parameter)

        if (position === 'path') {
            parameter.required = true

            delete parameter.allowEmptyValue
        }

        return parameter
    }

    _appendRequestParameterConstraint(properties, parameter) {
        let constraint = properties.constraint

        parameter['required'] = constraint.required === 'CHECKED'

        constraint.default && (parameter['default'] = constraint.default)

        constraint.example && (parameter['example'] = constraint.example)

        constraint.allowEmptyValue === 'CHECKED' && (parameter['allowEmptyValue'] = true)

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

        format.collectionFormat && (parameter['collectionFormat'] = format.collectionFormat)
    }

    _appendRequestParameterExtensions(properties, parameter) {
        let extensions = properties.extensions

        extensions.forEach(extension => {
            parameter[extension.key] = extension.value
        })
    }
}

export default GHCHttpClientRequestDocsSwaggerExporter
import _
    from 'lodash'
import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import KeyValueItem
    from '@/views/http-client/request/key-value-editor/KeyValueItem'
import GHCTreeNode
    from '@/components/api-tree/data/GHCTreeNode'
import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'
import RabiHttpResponseExample
    from '@/data/gotcha/http-operation/RabiHttpResponseExample'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import MultipartFormItem
    from '@/views/http-client/components/multipart-form-editor/MultipartFormItem'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'

/**
 * @created_at 2021/12/21
 * @app_version 1.3.15
 */
class GHCPostmanCollectionV2Parser {
    constructor(project, version) {
        this.project = project

        this.version = version

        this.treeNodes = []

        this.operations = []

        this.environments = []
    }

    /**
     * Return TreeNodes
     * @param collection
     */
    async parse(collection) {
        if (!this._checkFormatIsPostmanCollectionV2(collection)) {
            return {}
        }

        let items = collection.item

        if (_.isEmpty(items)) {
            return {}
        }

        let root = this._getRootTreeNode(collection)

        for (let i = 0; i < items.length; i++) {
            try {
                root.children.push(await this._parseItem(items[i]))
            } catch (e) {
                console.error('Parse Postman Item Failed', e)
            }
        }

        this.treeNodes.push(root)

        return {
            treeNodes: this.treeNodes,
            operations: this.operations,
        }
    }

    _getRootTreeNode(collection) {
        let treeNode = GHCTreeNode.newTreeViewGroupNode()

        treeNode.expand = false

        treeNode.name = collection.info.name

        return treeNode
    }

    async _parseItem(item, layer = 1) {
        let treeNode

        if (this._checkIsPostmanFolder(item)) {
            treeNode = GHCTreeNode.newTreeViewGroupNode()

            treeNode.name = item.name

            treeNode.expand = false

            treeNode.layer = layer // TODO NO!!!

            let items = item.item

            for (let i = 0; i < items.length; i++) {
                try {
                    let result = await this._parseItem(items[i], layer + 1)

                    result && treeNode.children.push(result)
                } catch (e) {
                    console.error('Parse Postman Item Failed', e)
                }
            }
        }

        if (this._checkIsPostmanRequest(item)) {
            treeNode = GHCTreeNode.newTreeViewHttpRequestNode()

            treeNode.name = item.name

            treeNode.layer = layer

            let operation = await this._buildGHCHttpOperation(item)

            let httpRequest = operation.httpRequest

            treeNode.requestMethod = httpRequest.requestMethod

            treeNode.requestPath = new GHCHttpClientUrlHelper(httpRequest).getRequestPath()

            treeNode.httpRequestId = operation.id

            treeNode.httpOperationId = operation.id

            this.operations.push(operation)

        }

        return treeNode
    }

    async _buildGHCHttpOperation(item) {
        let operation = new GHCHttpOperation({
            projectId: this.project.id,
            versionId: this.version.id
        })

        operation.name = item.name

        operation.requestMethod = item.method

        let gRequest = operation.httpRequest

        let request = item.request

        let response = item.response // response example

        this._buildUrl(gRequest, request)

        this._appendHeaders(gRequest, request)

        this._buildUrlParams(gRequest, request)

        this._appendRequestBody(gRequest, request)

        this._appendRequestExamples(gRequest, request)

        return await new RabiHttpOperationDao().save(operation)
    }

    _appendHeaders(gRequest, request) {
        if (_.isEmpty(request.header)) {
            return
        }

        let headers = request.header

        headers.forEach(header => {
            if (header.type === 'text') { // TODO Text Type Only
                let gHeader = new KeyValueItem(header.key, header.value)

                gHeader.description = header.description

                gRequest.headers.push(gHeader)
            }
        })
    }

    _buildUrl(gRequest, request) {
        gRequest.requestMethod = request.method

        let requestUrl = gRequest.requestUrl

        let url = request.url

        if (url['protocol']) {
            requestUrl.scheme = url['protocol']
        }

        if (url['host']) {
            requestUrl.host = url['host'].join('.')
        }

        if (url['port']) {
            requestUrl.port = url['port']
        }
    }

    _buildUrlParams(gRequest, request) {
        let url = request.url

        let path = url.path

        let query = url.query

        !_.isEmpty(path) && path.forEach(p => {
            let keyValueItem = new KeyValueItem()

            if (this._isPathVariable(p) && url['variable']) {
                let variable = url['variable'].find(it => {
                    return p === `:${it.key}`
                })

                if (variable) {
                    keyValueItem.key = variable.key

                    keyValueItem.value = variable.value

                    keyValueItem.description = variable.description

                    keyValueItem.requiredStatus = "CHECKED"
                }
            } else {
                keyValueItem.value = p

                keyValueItem.requiredStatus = "UNCHECKED"
            }

            gRequest.pathParameters.push(keyValueItem)
        })

        !_.isEmpty(query) && query.forEach(q => {
            let keyValueItem = new KeyValueItem()

            keyValueItem.key = q.key

            keyValueItem.value = q.value

            keyValueItem.description = q.description

            gRequest.queryParameters.push(keyValueItem)
        })
    }

    _appendRequestBody(gRequest, request) {
        if (!request['body']) {
            return
        }

        if (this._isTextRequestBody(request)) {
            let text = gRequest.payload.text

            text.content = request?.body?.raw

            let language = request?.body?.options?.raw?.language

            let mode = 'text'

            let payloadType = 'text'

            let contentType = 'text/plain'

            if (language === 'text') {
                mode = 'text'
                payloadType = 'text'
                contentType = 'text/plain'
            }

            if (language === 'javascript') {
                mode = 'text'
                payloadType = 'text'
                contentType = 'application/javascript'
            }

            if (language === 'json') {
                mode = 'json'
                payloadType = 'text'
                contentType = 'application/json'
            }

            if (language === 'html') {
                mode = 'html'
                payloadType = 'html'
                contentType = 'text/html'
            }

            if (language === 'xml') {
                mode = 'xml'
                payloadType = 'text'
                contentType = 'application/xml'
            }

            text.mode = mode

            text.contentType = contentType

            gRequest.payload.type = payloadType

            this._setContentType(gRequest, contentType)
        }

        if (this._isFormRequestBody(request)) {
            let form = gRequest.payload.form

            let formdata = request['body']['urlencoded']

            formdata.forEach(data => {
                let kv = new KeyValueItem()

                kv.key = data.key

                kv.value = data.value

                kv.description = data.description

                form.items.push(kv)
            })

            gRequest.payload.type = GHCHttpRequestPayloadType.FORM

            this._setContentType(gRequest, 'application/x-www-form-urlencoded')
        }

        if (this._isMultipartRequestBody(request)) {
            let multipart = gRequest.payload.multipart

            let formdata = request['body']['formdata']

            formdata.forEach(data => {
                let kv = new MultipartFormItem()

                if (data['type'] === 'text') {
                    kv.type = 'text'

                    kv.key = data.key

                    kv.value = data.value

                    kv.description = data.description
                }


                if (data['type'] === 'file') {
                    kv.type = 'file'

                    kv.key = data.key

                    kv.description = data.description
                }

                multipart.items.push(kv)
            })

            gRequest.payload.type = GHCHttpRequestPayloadType.MULTIPART
        }
    }

    _appendRequestExamples(gRequest, request) {
        let responses = request.response

        !_.isEmpty(responses) && responses.forEach(response => {
            let example = new RabiHttpResponseExample()

            example.name = response.name

            example.statusCode = response.code

            example.statusText = response.status

            // Ignore Header

            let headers = response.header

            if (response.body) {
                example.dType = 'text'

                if (!_.isEmpty(headers)) {
                    let contentType = headers.find(header => {
                        return _.lowerCase(header.key) === 'content-type'
                    })

                    contentType && (example.dContentType = contentType.value)
                } else {
                    example.dContentType = 'application/json'
                }

                example.dExample = response.body
            }

            gRequest.examples.push(example)
        })
    }

    // Helper Function

    _checkFormatIsPostmanCollectionV2(collection) {
        return collection && collection?.info?._postman_id
    }

    _isTextRequestBody(request) {
        let body = request['body']

        return body['mode'] === 'raw'
    }

    _isFormRequestBody(request) {
        let body = request['body']

        return body['mode'] === 'urlencoded'
    }

    _isMultipartRequestBody(request) {
        let body = request['body']

        return body['mode'] === 'formdata'
    }

    _checkIsPostmanFolder(item) {
        return item.hasOwnProperty('item')
    }

    _checkIsPostmanRequest(item) {
        return item.hasOwnProperty('request')
    }

    _isPathVariable(name) {
        return name && name.startsWith(':')
    }

    _setContentType(gRequest, contentType) {
        let headers = gRequest.headers

        let header = headers.find(it => {
            return it.key && it.key.toLowerCase() === 'content-type'
        })

        if (header) {
            header.value = contentType
        } else {
            header = new KeyValueItem('Content-Type', contentType)

            headers.push(header)
        }
    }
}

export default GHCPostmanCollectionV2Parser
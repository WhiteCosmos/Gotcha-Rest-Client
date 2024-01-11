/**
 * @created_at 2022/4/20
 * @app_version 1.4.3
 */
import GHCAbstractTransformer
    from '@/core/transformer/GHCAbstractTransformer'
import GHCTreeNode
    from '@/components/api-tree/data/GHCTreeNode'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import _
    from 'lodash'
import KeyValueItem
    from '@/views/http-client/request/key-value-editor/KeyValueItem'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import MultipartFormItem
    from '@/views/http-client/components/multipart-form-editor/MultipartFormItem'
import RabiHttpResponseExample
    from '@/data/gotcha/http-operation/RabiHttpResponseExample'
import GHCRequestParameterItem
    from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'

class GHCPostmanTransformer extends GHCAbstractTransformer {
    constructor(collection) {
        super()

        this.collection = collection
    }

    transformToRequests(options = {}) {
        let root = this._buildRootTreeNode()

        let items = this.collection['item']

        items.forEach(item => {
            let treeNode = this._parseItem(item)

            treeNode && (root.children.push(treeNode))
        })

        return {
            treeNode: root
        }
    }

    _buildRootTreeNode() {
        let treeNode = GHCTreeNode.newTreeViewGroupNode()

        treeNode.expand = false

        treeNode.name = this.collection['info']['name']

        return treeNode
    }

    _parseItem(item) {
        let treeNode

        if (this._checkIsPostmanFolder(item)) {
            treeNode = GHCTreeNode.newTreeViewGroupNode()

            treeNode.name = item.name

            treeNode.expand = false

            let items = item.item

            items.forEach(i => {
                let result

                try {
                    result = this._parseItem(i)
                } catch (e) {
                    console.error('GHCPostmanTransformer _parseItem Error', e)
                }

                result && treeNode.children.push(result)
            })
        }

        if (this._checkIsPostmanRequest(item)) {
            treeNode = GHCTreeNode.newTreeViewHttpRequestNode()

            treeNode.name = item.name

            let httpOperation = this._buildHttpOperation(item)

            let httpRequest = httpOperation.httpRequest

            treeNode.requestMethod = httpRequest.requestMethod

            treeNode.requestPath = new GHCHttpClientUrlHelper(httpRequest, null).getRequestPath()

            treeNode.httpRequest = httpOperation
        }

        return treeNode
    }

    _buildHttpOperation(item) {
        let operation = new GHCHttpOperation()

        operation.name = item.name

        operation.requestMethod = item.method

        let gRequest = operation.httpRequest

        let request = item.request

        this._buildUrl(gRequest, request)

        this._appendHeaders(gRequest, request)

        this._buildUrlParams(gRequest, request)

        this._appendRequestBody(gRequest, request)

        this._appendRequestExamples(gRequest, request)

        return operation
    }

    _appendHeaders(gRequest, request) {
        if (_.isEmpty(request.header)) {
            return
        }

        let headers = request.header

        headers.forEach(header => {
            if (header.type === 'text') { // TODO Text Type Only
                let gHeader = new KeyValueItem(header.key, header.value)

                gRequest.headers.push(gHeader)
            }
        })
    }

    _buildUrl(gRequest, request) {
        gRequest.requestMethod = request.method

        let requestUrl = gRequest.requestUrl

        let url = request.url

        if (!url) {
            return
        }

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

        if (!url) {
            return
        }

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

            example.description = response.name

            example.statusCode = response.code

            example.statusText = response.status

            let headers = response.header

            if (!_.isEmpty(headers)) {
                let contentType = headers.find(header => {
                    return _.lowerCase(header.key) === 'content-type'
                })

                contentType && (example.dContentType = contentType.value)

                headers.forEach(header => {
                    let gHeader = new GHCRequestParameterItem()

                    gHeader.key = header.key

                    gHeader.description = header.description

                    example.headers.push(gHeader)
                })
            }

            example.dExample = response.body
        })
    }

    // Helper Function

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

export default GHCPostmanTransformer
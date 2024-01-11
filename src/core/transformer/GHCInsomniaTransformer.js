import GHCAbstractTransformer
    from '@/core/transformer/GHCAbstractTransformer'
import GHCTreeNode
    from '@/components/api-tree/data/GHCTreeNode'
import asPromise
    from 'got/dist/source/as-promise'
import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import GHCRequestParameterItem
    from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import MultipartFormItem
    from '@/views/http-client/components/multipart-form-editor/MultipartFormItem'

/**
 * Support Insomnia V4
 *
 * @created_at 2022/5/1
 * @app_version 1.4.6
 */
class GHCInsomniaTransformer extends GHCAbstractTransformer {
    constructor(collection) {
        super()

        this.collection = collection

        this.id2TreeNode = new Map() // id -> resource

        this.id2ParentId = new Map() // id -> parent_id

        this.resources = new Map()

        this.rootTreeNode = undefined
    }

    transformToRequests(options) {
        this._handleResources()

        this._handleRelationships()

        return {
            treeNode: this.rootTreeNode,

            jsonSchemaGroup: undefined,
        }
    }

    _handleResources() {
        this.collection.resources.forEach(resource => {
            if (this._checkIsWorkspace(resource)) {
                this.rootTreeNode = this._buildRootTreeNode(resource)
            }

            if (this._checkIsRequestGroup(resource)) {
                this._buildGroupTreeNode(resource)
            }

            if (this._checkIsRequest(resource)) {
                this._buildRequestTreeNode(resource)
            }
        })
    }

    _handleRelationships() {
        for (const [_id, treeNode] of this.id2TreeNode.entries()) {
            let _parentId = this.id2ParentId.get(_id)

            if (_parentId) {
                let parent = this.id2TreeNode.get(_parentId)

                parent && (parent.children.push(treeNode))
            }
        }
    }

    _buildRootTreeNode(resource) {
        let treeNode = GHCTreeNode.newTreeViewGroupNode()

        treeNode.expand = false

        treeNode.name = resource.name

        this._buildRelationship(resource, treeNode)

        return treeNode
    }

    _buildGroupTreeNode(resource) {
        let treeNode = GHCTreeNode.newTreeViewGroupNode()

        treeNode.expand = false

        treeNode.name = resource.name

        this._buildRelationship(resource, treeNode)

        return treeNode
    }

    _buildRequestTreeNode(resource) {
        let treeNode = GHCTreeNode.newTreeViewHttpRequestNode()

        let httpOperation = this._buildHttpOperation(resource)

        treeNode.name = httpOperation.name

        treeNode.requestMethod = httpOperation.requestMethod

        treeNode.requestPath = httpOperation.requestPath

        treeNode.httpRequest = httpOperation

        this._buildRelationship(resource, treeNode)

        return treeNode
    }

    _buildHttpOperation(resource) {
        let httpOperation = new GHCHttpOperation()

        let httpRequest = httpOperation.httpRequest

        httpOperation.name = resource['name']

        httpRequest.name = resource['name']

        httpRequest.description = resource['description']

        this._buildRequestUrl(httpOperation, httpRequest, resource)

        this._buildRequestParameters(httpRequest, resource)

        this._buildRequestBody(httpRequest, resource)

        return httpOperation
    }

    _buildRequestUrl(httpOperation, httpRequest, resource) {
        httpRequest.requestMethod = resource['method'] || 'GET'

        let requestUrl = httpRequest.requestUrl

        let url = resource['url']

        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url
        }

        let parseUrl = require('parse-url')

        let parsedUrl = parseUrl(url)

        requestUrl.scheme = parsedUrl.protocol

        requestUrl.host = parsedUrl.resource

        requestUrl.port = parsedUrl.port

        httpOperation.requestPath = parsedUrl.pathname

        parsedUrl.pathname && parsedUrl.pathname.split('/').forEach(part => {
            if (_.isEmpty(part)) {
                return
            }

            let item = new GHCRequestParameterItem()

            item.requiredStatus = 'UNCHECKED'

            item.value = part

            httpRequest.pathParameters.push(item)
        })
    }

    _buildRequestParameters(httpRequest, resource) {
        let headers = resource['headers']

        !_.isEmpty(headers) && headers.forEach(header => {
            let item = new GHCRequestParameterItem()

            item.key = header['name']

            item.value = header['value']

            httpRequest.headers.push(item)
        })

        let parameters = resource['parameters']

        !_.isEmpty(parameters) && parameters.forEach(parameter => {
            let item = new GHCRequestParameterItem()

            item.key = parameter['name']

            item.value = parameter['value']

            httpRequest.queryParameters.push(item)
        })
    }

    _buildRequestBody(httpRequest, resource) {
        if (_.isEmpty(resource['body'])) {
            return
        }

        let body = resource['body']

        let payload = httpRequest.payload

        if (body['mimeType'] === 'application/x-www-form-urlencoded') {
            payload.type = GHCHttpRequestPayloadType.FORM

            let form = payload.form

            body['params'] && body['params'].forEach(param => {
                let item = new GHCRequestParameterItem()

                item.key = param['name']

                item.value = param['value']

                form.items.push(item)
            })
        } else if (body['mimeType'] === 'multipart/form-data') {
            payload.type = GHCHttpRequestPayloadType.MULTIPART

            let multipart = payload.multipart

            body['params'] && body['params'].forEach(param => {
                let item = new MultipartFormItem()

                if (param['type'] === 'file') {
                    item.key = param['name']

                    item.dataType = 'file'
                } else {
                    item.key = param['name']

                    item.value = param['value']
                }

                multipart.items.push(item)
            })
        } else if (body['mimeType'] === 'application/octet-stream') {
            // ignore
        } else {
            payload.type = GHCHttpRequestPayloadType.TEXT

            let text = payload.text

            text.contentType = body['mimeType'] || 'application/json'

            text.content = body['text'] || ''
        }
    }

    _buildRelationship(resource, treeNode) {
        let _id = resource['_id']

        let _parentId = resource['parentId'] // 仏了

        this.id2TreeNode.set(_id, treeNode)

        _parentId && this.id2ParentId.set(_id, _parentId)
    }

    _checkIsWorkspace(resource) {
        return resource['_type'] === 'workspace'
    }

    _checkIsRequest(resource) {
        return resource['_type'] === 'request'
    }

    _checkIsWebsocketRequest(resource) {
        return resource['_type'] === 'websocket_request'
    }

    _checkIsRequestGroup(resource) {
        return resource['_type'] === 'request_group'
    }

}

export default GHCInsomniaTransformer
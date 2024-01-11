/**
 * @created_at 2022/7/4
 * @app_version 1.5.0
 */
import {
    v4
} from 'node-uuid'
import RabiHttpOperationDao
    from '@/core/dao/RabiHttpOperationDao'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import GHCJsonNodeBuilder
    from '@/components/json-editor-vsl/GHCJsonNodeBuilder'

const POSTMAN_V2_SCHEMA = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"

class GHCPostmanCollectionV2Builder {
    constructor(cookieJar, dynamicVariableRender, predict = () => {
        return true
    }) {
        this.cookieJar = cookieJar

        this.dynamicVariableRender = dynamicVariableRender

        this.predict = predict
    }

    async build(treeNode) {
        let postman = {}

        postman['info'] = this._buildInfo(treeNode)

        postman['item'] = await this._buildItem(treeNode)

        return postman
    }

    _buildInfo(treeNode) {
        return {
            '_postman_id': v4(),
            'name': treeNode.name,
            'schema': POSTMAN_V2_SCHEMA
        }
    }

    async _buildItem(treeNode) {
        let item = this._buildFolderItem(treeNode)

        for (let i = 0; i < treeNode.children.length; i++) {
            let result = await this._buildItemRecursively(treeNode.children[i])

            if (result) {
                if (result.item) {
                    if (result.item.length !== 0) { // 跳过空的Group
                        item.item.push(result)
                    }
                } else {
                    item.item.push(result)
                }
            }
        }

        return item
    }

    async _buildItemRecursively(treeNode) {
        let item

        if (treeNode.isContainer) {
            item = this._buildFolderItem(treeNode)

            for (let i = 0; i < treeNode.children.length; i++) {
                let child = treeNode.children[i]

                let result = await this._buildItemRecursively(child)

                result && (item.item.push(result))
            }
        } else {
            if (this.predict(treeNode)) {
                try {
                    return await this._buildRequestItem(treeNode)
                } catch (e) {
                    console.error('Postman _buildRequestItem Failed', e)
                }
            }
        }

        if (item && item.item && item.item.length === 0) {
            return undefined
        } else {
            return item
        }
    }

    _buildFolderItem(treeNode) {
        return {
            name: treeNode.name,
            item: []
        }
    }

    async _buildRequestItem(treeNode) {
        let item = {}

        let httpOperation = await new RabiHttpOperationDao().query({id: treeNode.httpRequestId})

        let httpRequest = httpOperation.httpRequest

        let requestUrl = this.dynamicVariableRender.getCurrentRequestUrl(httpRequest)

        if (!requestUrl.host) { // 处理Server
            return undefined
        }

        item.name = treeNode.name

        let request = {
            method: httpRequest.requestMethod,
            header: this._buildHeaderParameters(httpRequest),
            url: this._buildRequestUrl(httpRequest),
            body: this._buildRequestBody(httpRequest)
        }

        // request body

        request['method'] = httpRequest.requestMethod

        item['request'] = request

        item['responses'] = this._buildResponses(httpRequest)

        return item
    }

    _buildResponses(httpRequest) {
        let responses = []

        httpRequest.examples.forEach(example => {
            let response = {}

            response['code'] = example.statusCode

            response['status'] = example.statusText

            response['headers'] = []

            example.headers.forEach(gHeader => {
                let header = {
                    key: gHeader.key,
                    value: gHeader.value
                }

                response['headers'].push(header)
            })

            if (example.dType === 'text') { // 目前仅处理 text
                response['headers'].push({
                    key: "Content-Type",
                    value: example.dContentType
                })

                response['body'] = example.dExample
            }

            responses.push(response)
        })

        return responses
    }

    _buildRequestUrl(httpRequest) {
        this.dynamicVariableRender.setHttpRequest(httpRequest)

        return {
            raw: new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender).buildUrlStrFromRequestUrl(),
            host: this._buildRequestHost(httpRequest),
            path: this._buildPathParameters(httpRequest),
            variable: this._buildPathVariables(httpRequest),
            query: this._buildQueryParameters(httpRequest),
        }
    }

    _buildRequestHost(httpRequest) {
        let host = httpRequest.requestUrl.host

        let returnedHost = this.dynamicVariableRender.render(host)

        if (returnedHost) {
            return returnedHost.split(".")
        } else {
            return []
        }
    }

    _buildRequestBody(httpRequest) {
        let payload = httpRequest.payload

        let body

        if (payload.type === GHCHttpRequestPayloadType.NONE) {
            body = {}
        }

        if (payload.type === GHCHttpRequestPayloadType.FORM) {
            let form = payload.form

            body = {
                mode: "urlencoded",
                urlencoded: [],
            }

            form.items.forEach(item => {
                body.urlencoded.push({
                    key: item.key,
                    value: this.dynamicVariableRender.render(item.value),
                    type: 'text',
                    description: item.description
                })
            })
        }

        if (payload.type === GHCHttpRequestPayloadType.MULTIPART) {
            let multipart = payload.multipart

            body = {
                mode: "formdata",
                formdata: [],
            }

            multipart.items.forEach(item => {
                if (item.type === 'file') {
                    body.formdata.push({
                        key: item.key,
                        src: item.value.filePath,
                        description: item.description,
                        type: 'file'
                    })
                } else {
                    body.formdata.push({
                        key: item.key,
                        value: this.dynamicVariableRender.render(item.value),
                        description: item.description,
                        type: 'text'
                    })
                }
            })
        }

        if (payload.type === GHCHttpRequestPayloadType.TEXT) {
            let text = payload.text

            body = {
                mode: "raw",
                raw: text.content,
                options: {
                    language: text.mode
                }
            }
        }

        if (payload.type === GHCHttpRequestPayloadType.JSON) {
            let json = payload.json

            let builder = new GHCJsonNodeBuilder(this.dynamicVariableRender)

            body = {
                mode: "raw",
                raw: JSON.stringify(builder.buildJsonFromJsonNode(json.root), null, 2),
                options: {
                    language: 'json'
                }
            }
        }

        return body
    }

    _buildHeaderParameters(httpRequest) {
        let parameters = []

        httpRequest.headers.forEach(header => {
            parameters.push({
                key: header.key,
                value: this.dynamicVariableRender.render(header.value),
                description: header.description
            })
        })

        return parameters
    }

    _buildPathParameters(httpRequest) {
        let paths = []

        httpRequest.pathParameters.forEach(path => {
            if (path.requiredStatus === "CHECKED") {
                paths.push(`::${path.key}`)
            } else {
                paths.push(this.dynamicVariableRender.render(path.value))
            }
        })

        return paths
    }

    _buildPathVariables(httpRequest) {
        let variables = []

        httpRequest.pathParameters.forEach(path => {
            if (path.requiredStatus !== "CHECKED") {
                return
            }

            variables.push({
                key: `:${path.key}`,
                value: this.dynamicVariableRender.render(path.value),
                description: path.description
            })
        })

        return variables
    }

    _buildQueryParameters(httpRequest) {
        let parameters = []

        httpRequest.queryParameters.forEach(query => {
            if (query.dataType === 'text') {
                parameters.push({
                    key: query.key,
                    value: this.dynamicVariableRender.render(query.value),
                    description: query.description
                })
            }

            if (query.dataType === 'array') {
                query.children.forEach(child => {
                    parameters.push({
                        key: query.key,
                        value: this.dynamicVariableRender.render(child.value),
                    })
                })
            }
        })

        return parameters
    }
}

export default GHCPostmanCollectionV2Builder
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import EvCheckedStatusHelper
    from '@/mixins/EvCheckedStatusHelper'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import GHCJsonNodeBuilder
    from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
import Mime
    from 'mime/Mime'

/**
 * @created_at 2022/8/10
 * @app_version 1.5.1
 */
class GHCHttpClientHarBuilder {
    constructor(cookieJar, dynamicVariableRender) {
        this.cookieJar = cookieJar

        this.dynamicVariableRender = dynamicVariableRender
    }

    buildHarRequest(httpRequest) {
        this.dynamicVariableRender.setHttpRequest(httpRequest)

        let request = {}

        request['method'] = httpRequest.requestMethod

        request['url'] = this._buildUrl(httpRequest)

        request['httpVersion'] = 'HTTP/1.1'

        request['headers'] = this._buildHeaders(httpRequest)

        // request['cookies'] = this._buildCookies(httpRequest)

        request['queryString'] = this._buildQueryString(httpRequest)

        request['postData'] = this._buildPostData(httpRequest)

        return request
    }

    _buildUrl(httpRequest) {
        return new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender).buildUrlStrFromRequestUrl({
            urlEncode: true
        })
    }

    _buildHeaders(httpRequest) {
        let headers_ = []

        let headers = httpRequest.headers

        headers.forEach(header => {
            if (EvCheckedStatusHelper.isItemUnchecked(header)) {
                return
            }

            headers_.push({
                name: header.key,
                value: String(this.dynamicVariableRender.render(header.value)), // Value Must Be String
            })
        })

        return headers_
    }

    _buildCookies(httpRequest) {

    }

    _buildQueryString(httpRequest) {
        let parameters_ = []

        let parameters = httpRequest.queryParameters

        parameters.forEach(parameter => {
            if (EvCheckedStatusHelper.isItemUnchecked(parameter)) {
                return
            }

            parameters_.push({
                name: parameter.key,
                value: String(this.dynamicVariableRender.render(parameter.value)), // Value Must Be String
            })
        })

        return parameters_
    }

    _buildPostData(httpRequest) {
        let payload = httpRequest.payload

        let postData = {
            mimeType: "application/json",
            params: [],
            text: ''
        }

        if (payload.type === GHCHttpRequestPayloadType.NONE) {
            return
        }

        if (payload.type === GHCHttpRequestPayloadType.TEXT) {
            let text = payload.text

            postData.mimeType = text.contentType

            postData.text = text.content
        }

        if (payload.type === GHCHttpRequestPayloadType.JSON) {
            let json = payload.json

            let root = new GHCJsonNodeBuilder(this.dynamicVariableRender).buildJsonFromJsonNode(json.root)

            postData.text = JSON.stringify(root, null, 2)
        }

        if (payload.type === GHCHttpRequestPayloadType.FORM) {
            postData.mimeType = 'application/x-www-form-urlencoded'

            let form = payload.form

            form.items.forEach(item => {
                if (EvCheckedStatusHelper.isItemUnchecked(item)) {
                    return
                }

                let param = {}

                param.name = item.key

                param.value = this.dynamicVariableRender.render(item.value)

                postData.params.push(param)
            })
        }

        if (payload.type === GHCHttpRequestPayloadType.MULTIPART) {
            postData.mimeType = 'multipart/form-data'

            let multipart = payload.multipart

            multipart.items.forEach(item => {
                if (EvCheckedStatusHelper.isItemUnchecked(item)) {
                    return
                }

                let param = {}

                param.name = item.key

                param.value = this.dynamicVariableRender.render(item.value)

                // Skip File

                postData.params.push(param)
            })
        }

        return postData
    }
}

export default GHCHttpClientHarBuilder
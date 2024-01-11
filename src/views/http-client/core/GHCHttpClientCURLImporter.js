import KeyValueItem
    from '@/views/http-client/request/key-value-editor/KeyValueItem'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import EvHttpClientRequestHeadersHelper
    from '@/views/http-client/request/EvHttpClientRequestHeadersHelper'
import mime
    from 'mime-types'
import {
    CurlFileReference
} from '@/core/curl/CurlParser'
import MultipartFormItem
    from '@/views/http-client/components/multipart-form-editor/MultipartFormItem'
import GHCJson
    from '@/core/json/GHCJson'

/**
 * @created_at 2022/3/24
 * @app_version 1.4.3
 */
class GHCHttpClientCURLImporter {
    constructor(httpRequest) {
        this.httpRequest = httpRequest
    }

    overrideFromCurl(curlRequest) {
        this.httpRequest.requestMethod = curlRequest.method

        // skip url ??? why ?

        this._overrideRequestHeaders(curlRequest)

        this._overrideRequestBody(curlRequest)
    }

    _overrideRequestHeaders(curlRequest) {
        this.httpRequest.headers = [] // clear

        for (let [key, value] of curlRequest.headers) {
            let item = new KeyValueItem()

            item.key = key

            item.value = value

            // TODO cookie

            this.httpRequest.headers.push(item)
        }
    }

    _overrideRequestBody(curlRequest) {
        let bodyType = curlRequest.bodyType // 没用，无法根据cURL参数识别Body类型

        let headers = this.httpRequest.headers

        let payload = this.httpRequest.payload

        if (bodyType === 'formData') {
            payload.type = GHCHttpRequestPayloadType.MULTIPART

            for (let [key, value] of curlRequest.body) {
                if (value instanceof CurlFileReference) {
                    let item = new MultipartFormItem(key, null)

                    item.type = 'file'

                    payload.multipart.items.push(item)
                } else {
                    let item = new MultipartFormItem(key, value)

                    payload.multipart.items.push(item)
                }
            }
        }

        let bodyString = curlRequest.bodyString

        if (!bodyString) {
            return
        }

        if (this._isJsonData(headers)) {
            payload.type = GHCHttpRequestPayloadType.TEXT

            let text = payload.text

            text.content = GHCJson.beautify(bodyString)

            text.mode = 'json'
        }

        if (this._isFormData(headers)) {
            payload.type = GHCHttpRequestPayloadType.FORM

            let form = payload.form

            const queryString = require('query-string')

            let parsedForm = queryString.parse(bodyString)

            for (let key in parsedForm) {
                let item = new KeyValueItem(key, parsedForm[key])

                form.items.push(item)
            }
        }
    }

    _isJsonData(headers) {
        let contentType = EvHttpClientRequestHeadersHelper.getContentType(headers)

        if (contentType) {
            return contentType.includes('application/json')
        } else {
            return false
        }
    }

    _isFormData(headers) {
        let contentType = EvHttpClientRequestHeadersHelper.getContentType(headers)

        if (contentType) {
            return contentType.includes('application/x-www-form-urlencoded')
        } else {
            return false
        }
    }

    _isMultipartData(headers) {
        let contentType = EvHttpClientRequestHeadersHelper.getContentType(headers)

        if (contentType) {
            return contentType.includes('multipart/form-data')
        } else {
            return false
        }
    }
}

export default GHCHttpClientCURLImporter
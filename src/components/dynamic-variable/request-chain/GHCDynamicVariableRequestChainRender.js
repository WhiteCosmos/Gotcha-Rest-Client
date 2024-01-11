/**
 * @created_at 2022/9/18
 * @app_version 1.5.0
 */
import {
    JSONPath
} from 'jsonpath-plus'
import AppCache
    from '@/AppCache'
import _
    from 'lodash'
import GHCJson
    from '@/core/json/GHCJson'

class GHCDynamicVariableRequestChainRender {
    constructor() {

    }

    render(value) {
        let httpOperation = AppCache.httpOperations.get(value.requestId)

        if (!httpOperation) {
            return ''
        }

        let position = value.position

        let param = value.values[position]

        if (position === 'request_header') {
            return this._renderRequestHeader(httpOperation, param)
        }

        if (position === 'url_parameter') {
            return this._renderUrlParameter(httpOperation, param)
        }

        if (position === 'request_payload') {
            return this._renderRequestPayload(httpOperation, param)
        }

        if (position === 'response_header') {
            return this._renderResponseHeader(httpOperation, param)
        }

        if (position === 'response_body') {
            return this._renderResponseBody(httpOperation, param)
        }

        return ''
    }

    _renderRequestHeader(httpOperation, param) {
        let httpRequest = httpOperation.httpRequest

        if (!httpRequest) {
            return ''
        }
    }

    _renderUrlParameter(httpOperation, param) {

    }

    _renderRequestPayload(httpOperation, param) {

    }

    _renderResponseHeader(httpOperation, param) {
        let httpResponse = httpOperation.httpResponse

        if (!httpResponse) {
            return ''
        }

        let headers = httpResponse.headers

        return headers[param] || ''
    }

    _renderResponseBody(httpOperation, param) {
        let httpResponse = httpOperation.httpResponse

        if (!httpResponse) {
            return ''
        }

        let payload = httpResponse.payload

        if (!payload) {
            return ''
        }

        try {
            let json = GHCJson.parse(payload.body)

            const {JSONPath} = require('jsonpath-plus')

            let returnedValue = JSONPath({
                path: param,
                json
            })

            if (_.isEmpty(returnedValue)) {
                return ''
            }

            if (returnedValue instanceof Array) { // jp return array https://www.npmjs.com/package/jsonpath
                return returnedValue[0]
            } else {
                return returnedValue
            }
        } catch (e) {
            console.log("RequestChain Render Failed", e)

            return ''
        }
    }
}

export default GHCDynamicVariableRequestChainRender
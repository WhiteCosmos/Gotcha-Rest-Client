import _
    from 'lodash'
import JsonHttpPayload
    from '@/core/evalon4j/JsonHttpPayload'
import JsonStructHelper
    from '@/core/evalon4j/JsonStructHelper'
import JsonHttpResponseBuilder
    from '@/views/content/components/struct-definition/JsonHttpResponseBuilder'

class JsonMethodHelper {
    static getJsonServiceSummary(jsonService) {
        if (!jsonService) {
            return ""
        }

        if (_.isEmpty(jsonService.summary)) {
            return jsonService.serviceName
        } else {
            return jsonService.summary
        }
    }

    static getJsonMethodSummary(jsonMethod) {
        if (!jsonMethod) {
            return ""
        }

        if (_.isEmpty(jsonMethod.summary)) {
            return jsonMethod.methodName
        } else {
            return jsonMethod.summary
        }
    }

    static getJsonStructSummary(jsonStruct) {
        return jsonStruct.fieldName
    }

    /**
     * 兼容旧版本
     *
     * @since 1.3.6
     */
    static buildRequestPayloads(jsonMethod) {
        let requestPayload = new JsonHttpPayload()

        requestPayload.contentTypes = jsonMethod.consumes

        requestPayload.content = jsonMethod.parameters.filter(parameter => {
            return JsonStructHelper.isRequestPayload(parameter)
        })

        return [requestPayload]
    }

    /**
     * 兼容旧版本，默认存在响应数据
     *
     * @since 1.3.6
     */
    static buildResponsePayload(jsonMethod) {
        let requestPayload = new JsonHttpPayload()

        requestPayload.contentTypes = jsonMethod.produces

        return requestPayload
    }

    /**
     * 把旧版本的响应转换为新版的 HttpResponse
     *
     * @since 1.3.6
     */
    static buildHttpResponses(jsonMethod) {
        let httpResponses = []

        if (_.isEmpty(jsonMethod.responses)) {
            return httpResponses
        }

        jsonMethod.responses.forEach(jsonStruct => {
            httpResponses.push(JsonHttpResponseBuilder.buildFromJsonStruct(jsonMethod, jsonStruct))
        })

        return httpResponses
    }
}

export default JsonMethodHelper
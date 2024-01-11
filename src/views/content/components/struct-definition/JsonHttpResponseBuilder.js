import JsonHttpResponse
    from '@/core/evalon4j/JsonHttpResponse'
import JsonHttpPayload
    from '@/core/evalon4j/JsonHttpPayload'
import _
    from 'lodash'

export default {
    buildFromJsonStruct(jsonMethod, jsonStruct) {
        let httpResponse = new JsonHttpResponse()

        httpResponse.statusCode = jsonStruct.fieldName

        httpResponse.statusText = jsonStruct.fieldSummary

        httpResponse.description = jsonStruct.fieldDescription

        if (!_.isEmpty(jsonStruct.children)) {
            let httpPayload = new JsonHttpPayload()

            // httpPayload.contentType = jsonMethod.produces[0]

            // httpPayload.contentTypes = jsonMethod.produces

            httpPayload.content = jsonStruct.children

            httpResponse.payloads.push(httpPayload)
        }

        return httpResponse
    }
}
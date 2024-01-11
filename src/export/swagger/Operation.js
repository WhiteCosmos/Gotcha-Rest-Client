import JsonMethodHelper
    from '@/core/evalon4j/JsonMethodHelper'
import Parameter
    from '@/export/swagger/Parameter'
import Response
    from '@/export/swagger/Response'
import _
    from 'lodash'

class Operation {
    constructor(jsonMethodContent) {
        this.summary = JsonMethodHelper.getApiSummary(jsonMethodContent)

        this.description = JsonMethodHelper.getApiDescription(jsonMethodContent)

        this.operationId = jsonMethodContent.serviceName + "." + jsonMethodContent.methodName

        if (!_.isEmpty(jsonMethodContent.consumes)) {
            this.consumes = jsonMethodContent.consumes
        }

        if (!_.isEmpty(jsonMethodContent.produces)) {
            this.produces = jsonMethodContent.produces
        }

        this.parameters = []

        this.responses = {}

        jsonMethodContent.parameters.forEach(jsonStruct => {
            this.parameters.push(new Parameter(jsonStruct))
        })

        jsonMethodContent.responses.forEach(jsonStruct => {
            this.responses[jsonStruct.fieldName] = new Response(jsonStruct)
        })
    }
}

export default Operation
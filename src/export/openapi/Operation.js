import SwaggerHelper
    from '@/export/SwaggerHelper'
import RequestBody
    from '@/export/openapi/parameters/RequestBody'
import FormRequestBody
    from '@/export/openapi/responses/FormRequestBody'
import Parameter
    from '@/export/openapi/Parameter'
import Response
    from '@/export/openapi/responses/Response'

class Operation {
    constructor(jsonMethod, definitions) {
        this.tags = []

        this.summary = jsonMethod.summary

        this.description = jsonMethod.description

        this.operationId = SwaggerHelper.getOperationId(jsonMethod)

        this.parameters = []

        this.responses = {}

        if (jsonMethod.headers) {
            jsonMethod.headers.forEach(header => {
                this.parameters.push(new Parameter(header, definitions))
            })
        }

        if (jsonMethod.cookies) {
            jsonMethod.cookies.forEach(cookie => {
                this.parameters.push(new Parameter(cookie, definitions))
            })
        }

        if (jsonMethod.parameters) {
            jsonMethod.parameters.forEach(parameter => {
                if (SwaggerHelper.isPathParameter(parameter)) {
                    this.parameters.push(new Parameter(parameter, definitions))
                }

                if (SwaggerHelper.isQueryParameter(parameter)) {
                    this.parameters.push(new Parameter(parameter, definitions))
                }

                if (SwaggerHelper.isBodyParameter(parameter)) {
                    this.requestBody = new RequestBody(parameter, jsonMethod, definitions)
                }
            })
        }

        if (SwaggerHelper.isFormRequestBody(jsonMethod)) {
            this.requestBody = new FormRequestBody(jsonMethod, definitions)
        }

        if (SwaggerHelper.isMultipartRequestBody(jsonMethod)) {
            this.requestBody = new FormRequestBody(jsonMethod, definitions)
        }

        if (SwaggerHelper.isEmpty(this.parameters)) {
            delete this.parameters
        }

        jsonMethod.responses.forEach(jsonStruct => {
            this.responses[jsonStruct.fieldName] = new Response(jsonStruct, jsonMethod)
        })
    }
}

export default Operation
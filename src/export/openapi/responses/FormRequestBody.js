import SwaggerHelper
    from '@/export/SwaggerHelper'
import Schema
    from '@/export/openapi/media/Schema'

class FormRequestBody {
    constructor(jsonMethod, definitions) {
        this.required = true

        this.content = {}

        if (SwaggerHelper.isFormRequestBody(jsonMethod)) {
            this.content["application/x-www-form-urlencoded"] = {}
        }

        if (SwaggerHelper.isMultipartRequestBody(jsonMethod)) {
            this.content["multipart/form-data"] = {}
        }

        let schema = {
            type: "object",
            properties: {}
        }

        jsonMethod.parameters.forEach(parameter => {
            if (SwaggerHelper.isFormParameter(parameter)) {
                schema.properties[parameter.fieldName] = new Schema(parameter, definitions)
            }
        })

        // TODO required
    }
}

export default FormRequestBody
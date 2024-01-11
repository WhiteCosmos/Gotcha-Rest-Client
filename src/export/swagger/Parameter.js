import SwaggerParameterType
    from '@/export/swagger/SwaggerParameterType'
import Schema
    from '@/export/swagger/Schema'
import SwaggerDataType
    from '@/export/swagger/SwaggerDataType'
import Items
    from '@/export/swagger/Items'

class Parameter {
    constructor(jsonStruct) {
        this.name = jsonStruct.fieldName

        this.description = jsonStruct.summary

        this.required = jsonStruct.isRequired

        this.in = jsonStruct.parameterType

        if (this.in === "form") { // Swagger 2.0
            this.in = "formData"
        }

        if (this.in === SwaggerParameterType.body) {
            this.schema = new Schema(jsonStruct)
        } else {
            this.type = jsonStruct.swaggerDataType

            jsonStruct.swaggerDataFormat && (this.format = jsonStruct.swaggerDataFormat)

            if (this.type === SwaggerDataType.array) {
                this.items = new Items(jsonStruct.children[0])
            }
        }
    }
}

export default Parameter
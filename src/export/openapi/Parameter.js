import Schema
    from '@/export/openapi/media/Schema'

class Parameter {
    constructor(jsonStruct, definitions) {
        this.name = jsonStruct.fieldName

        this.description = jsonStruct.summary

        this.required = jsonStruct.isRequired

        this.in = jsonStruct.parameterType

        this.schema = new Schema(jsonStruct, definitions)
    }
}

export default Parameter
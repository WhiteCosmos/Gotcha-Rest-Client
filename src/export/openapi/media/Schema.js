import Items
    from '@/export/openapi/media/Items'

class Schema {
    constructor(jsonStruct, definitions) {
        if (jsonStruct.isStructType) {
            if (!definitions) {
                this['$ref'] = "#/components/schemas/" + jsonStruct.fieldTypeName

                return
            }

            this.properties = {}

            jsonStruct.children && jsonStruct.children.forEach(child => {
                if (child.isIgnore) {
                    return
                }

                let fieldName = child.fieldName

                this.properties[fieldName] = new Schema(child, definitions)
            })
        }

        if (jsonStruct.isArrayType) {
            this.items = new Items(jsonStruct.children[0], definitions)
        }

        if (jsonStruct.isEnumType) {
            this.enum = jsonStruct.children.map(child => {
                return child.fieldName
            })
        }

        if (jsonStruct.isMapType) {
            this.additionalProperties = new Schema(jsonStruct.children[1], definitions)
        }

        this.type = jsonStruct.swaggerDataType

        jsonStruct.swaggerDataFormat && (this.format = jsonStruct.swaggerDataFormat)

        this.description = jsonStruct.summary
    }
}

export default Schema
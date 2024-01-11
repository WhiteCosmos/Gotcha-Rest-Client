/**
 * @created_at 2022/11/14
 * @app_version 1.6.0
 */
import JsonSchemaNodeExtension
    from '@/components/json-schema-editor/JsonSchemaNodeExtension'

class JsonSchemaNodeXML extends JsonSchemaNodeExtension {
    constructor() {
        super()

        this.name = ''

        this.namespace = ''

        this.prefix = ''

        this.attribute = false

        this.wrapped = false
    }
}

export default JsonSchemaNodeXML
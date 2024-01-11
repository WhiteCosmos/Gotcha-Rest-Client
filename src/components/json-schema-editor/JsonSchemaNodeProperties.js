import JsonSchemaNodeConstraint
    from '@/components/json-schema-editor/JsonSchemaNodeConstraint'
import JsonSchemaNodeXML
    from '@/components/json-schema-editor/JsonSchemaNodeXML'
import JsonSchemaNodeFormat
    from '@/components/json-schema-editor/JsonSchemaNodeFormat'

/**
 * @created_at 2022/11/24
 * @app_version 1.6.0
 */
class JsonSchemaNodeProperties {
    constructor() {
        // 通用模式
        this.constraint = new JsonSchemaNodeConstraint()

        // Schema 模式
        this.xml = new JsonSchemaNodeXML()

        // 参数模式
        this.format = new JsonSchemaNodeFormat()

        // 通用模式
        this.extensions = [] // key - value
    }
}

export default JsonSchemaNodeProperties
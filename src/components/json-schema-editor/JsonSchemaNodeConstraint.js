/**
 * @created_at 2022/10/22
 * @app_version 1.6.0
 */
class JsonSchemaNodeConstraint {
    constructor(props = {}) {
        // General

        // 在参数模式和Schema模式中的含义并不相同
        this.required = 'CHECKED'

        this.deprecated = 'UNCHECKED'

        // 参数模式
        this.allowEmptyValue = 'UNCHECKED'

        // Schema 模式
        this.nullable = 'UNCHECKED'

        // Schema 模式
        this.readOnly = false

        // Schema 模式
        this.writeOnly = false

        this.example = ''

        this.default = ''

        // Key-Value Pair
        this.enums = [] // value description

        // String

        this.maxLength = ''

        this.minLength = ''

        this.pattern = ''

        // number

        this.maximum = ''

        this.exclusiveMaximum = false

        this.minimum = ''

        this.exclusiveMinimum = false

        this.multipleOf = ''

        // array

        this.maxItems = ''

        this.minItems = ''

        this.uniqueItems = false

        // Object (Ignore)

        this.maxProperties = ''

        this.minProperties = ''
    }
}

export default JsonSchemaNodeConstraint
import _
    from 'lodash'
import JsonSchemaNodeProperties
    from '@/components/json-schema-editor/JsonSchemaNodeProperties'

class MultipartFormItem {
    constructor(key, value) {
        this.key = key || ""

        this.value = value || ""

        this.type = "string" // text or file

        /**
         * Swagger | OpenAPI Format
         * since 1.6.0
         * @type {string}
         */
        this.format = ''

        /**
         * since 1.6.0
         * @type {string}
         */
        this.description = ''

        this.bookmark = undefined // secure bookmark for file

        this.keyPlaceholder = ""

        this.valuePlaceholder = ""

        this.deletable = false

        this.checkedStatus = "CHECKED"

        /**
         * 用于区分文本还是文件类型
         * @type {string}
         * @since 1.6.0
         */
        this.dataType = 'text' // text or file

        /**
         * Swagger | OpenAPI properties
         *
         * @since 1.6.0
         * @type {JsonSchemaNodeProperties}
         */
        this.properties = new JsonSchemaNodeProperties()
    }
}

export default MultipartFormItem
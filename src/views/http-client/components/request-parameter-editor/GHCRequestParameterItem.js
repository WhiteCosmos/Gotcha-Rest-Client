import GHCComponent
    from '@/data/gotcha/GHCComponent'
import JsonSchemaNodeProperties
    from '@/components/json-schema-editor/JsonSchemaNodeProperties'

class GHCRequestParameterItem extends GHCComponent {
    constructor(item = {}) {
        super()

        this.key = item.key || ''

        this.type = 'string' // text(deprecated) | array

        /**
         * 用于区分text和array
         * @since 1.6.0
         * @type {string}
         */
        this.dataType = 'text' // text | array

        /**
         * Swagger | OpenAPI Format
         * since 1.6.0
         * @type {string}
         */
        this.format = ''

        this.value = item.value || ''

        /**
         * @since 1.6.3
         * @type {undefined}
         */
        this.latestValue = undefined

        this.description = "" // Description as value's placeholder

        this.checkedStatus = "CHECKED" // Default is checked

        /**
         * 用于区分Path参数，与Constraint中的required不同
         * @type {string}
         */
        this.requiredStatus = "CHECKED" // Default is required

        // when type is array, since 1.4.6

        /**
         * @since 1.4.6
         * @type {*[]}
         */
        this.children = []

        /**
         * @since 1.4.6
         * @type {String}
         */
        this.separator = ''

        /**
         * Swagger | OpenAPI properties
         *
         * @since 1.6.0
         * @type {JsonSchemaNodeProperties}
         */
        this.properties = new JsonSchemaNodeProperties()
    }
}

export default GHCRequestParameterItem
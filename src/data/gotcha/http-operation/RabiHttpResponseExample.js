import JsonSchemaNode
    from '@/components/json-schema-editor/JsonSchemaNode'

class RabiHttpResponseExample {
    constructor() {
        this.description = ''

        this.statusCode = 200

        this.statusText = 'OK'

        /**
         * Response Headers
         */
        this.headers = []

        // Documentation

        /**
         * @since 1.6.0
         * @type {string}
         */
        this.dType = 'none' // none | text | schema

        // Example

        /**
         * @since 1.6.0
         * @type {string}
         */
        this.dContentType = 'application/json'

        /**
         * @since 1.6.0
         * @type {string}
         */
        this.dExample = ''

        // Schema

        /**
         * @since 1.6.0
         * @type {[]}
         */
        this.dContentTypes = ['application/json']

        /**
         * @since 1.6.0
         */
        this.dSchema = JsonSchemaNode.newRootNode('object')

        /**
         * @since 1.6.0
         * @type {Object}
         */
        this.dExamples = {} // content-type -> example
    }
}

export default RabiHttpResponseExample
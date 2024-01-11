import RabiHttpRequestJsonPayload
    from '@/data/gotcha/http-operation/payload/RabiHttpRequestJsonPayload'
import RabiHttpRequestFormPayload
    from '@/data/gotcha/http-operation/payload/RabiHttpRequestFormPayload'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import RabiHttpRequestMultipartPayload
    from '@/data/gotcha/http-operation/payload/RabiHttpRequestMultipartPayload'
import RabiHttpRequestTextPayload
    from '@/data/gotcha/http-operation/payload/RabiHttpRequestTextPayload'
import RabiHttpRequestBinaryPayload
    from '@/data/gotcha/http-operation/payload/RabiHttpRequestBinaryPayload'
import RabiHttpRequestGraphqlPayload
    from '@/data/gotcha/http-operation/payload/RabiHttpRequestGraphqlPayload'
import JsonSchemaNode
    from '@/components/json-schema-editor/JsonSchemaNode'

class RabiHttpRequestPayload {
    constructor() {
        /**
         * Choose which payload will be send
         *
         * @type {string}
         */
        this.type = GHCHttpRequestPayloadType.NONE

        this.text = new RabiHttpRequestTextPayload()

        this.json = new RabiHttpRequestJsonPayload()

        this.form = new RabiHttpRequestFormPayload()

        this.multipart = new RabiHttpRequestMultipartPayload()

        this.binary = new RabiHttpRequestBinaryPayload()

        this.graphql = new RabiHttpRequestGraphqlPayload()

        // Documentation

        /**
         * Payload type for documentation -> none text schema form multipart
         * @since 1.6.0
         * @type {string}
         */
        this.dType = 'none'

        /**
         * Content-Type for documentation
         * @since 1.6.0
         * @type {string}
         */
        this.dContentType = 'application/json'

        /**
         * Payload example for 'text' type
         * @since 1.6.0
         * @type {string}
         */
        this.dExample = ''

        /**
         * @since 1.6.0
         * @type {string[]}
         */
        this.dContentTypes = ['application/json']

        /**
         * @since 1.6.0
         * @type {undefined}
         */
        this.dSchema = JsonSchemaNode.newRootNode('object')
    }
}

export default RabiHttpRequestPayload
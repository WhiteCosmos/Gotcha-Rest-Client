import JsonNode
    from '@/components/json-editor-vsl/JsonNode'

class RabiHttpRequestGraphqlPayload {
    constructor() {
        this.query = ""

        this.operationName = ""

        this.variables = JsonNode.newRootNode('object')
    }
}

export default RabiHttpRequestGraphqlPayload
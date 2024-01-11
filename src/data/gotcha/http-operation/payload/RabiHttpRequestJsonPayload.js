import JsonNode
    from '@/components/json-editor-vsl/JsonNode'

class RabiHttpRequestJsonPayload {
    constructor() {
        this.root = JsonNode.newRootNode()
    }
}

export default RabiHttpRequestJsonPayload
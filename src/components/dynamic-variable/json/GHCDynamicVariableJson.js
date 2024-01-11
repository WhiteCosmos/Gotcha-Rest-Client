/**
 * @created_at 2022/10/29
 * @app_version 1.6.0
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'
import JsonNode
    from '@/components/json-editor-vsl/JsonNode'

class GHCDynamicVariableJson {
    constructor() {
        this.type = GHCDynamicVariableType.JSON

        this.root = JsonNode.newRootNode()

        this.stringify = false
    }
}

export default GHCDynamicVariableJson
/**
 * @created_at 2022/10/29
 * @app_version 1.6.0
 */
import GHCJsonNodeBuilder
    from '@/components/json-editor-vsl/GHCJsonNodeBuilder'

class GHCDynamicVariableJsonRender {
    constructor() {
        this.dynamicVariableRender = undefined
    }

    setDynamicVariableRender(dynamicVariableRender) {
        this.dynamicVariableRender = dynamicVariableRender
    }

    render(value) {
        let root = value.root

        let json = new GHCJsonNodeBuilder(this.dynamicVariableRender).buildJsonFromJsonNode(root)

        let stringify = value.stringify

        let jsonStr = JSON.stringify(json, null, 4)

        if (stringify) {
            return jsonStr.replace(/[\\$'"]/g, "\\$&")
        } else {
            return jsonStr
        }
    }
}

export default GHCDynamicVariableJsonRender
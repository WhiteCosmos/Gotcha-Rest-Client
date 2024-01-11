/**
 * @created_at 2022/10/25
 * @app_version 1.6.0
 */
import {
    v4
} from 'uuid'
import JsonSchemaNode
    from '@/components/json-schema-editor/JsonSchemaNode'

class GHCJsonSchema {
    constructor() {
        this.uid = v4()

        this.name = ''

        this.alias = ''

        this.description = ''

        this.root = JsonSchemaNode.newRootNode()
    }
}

export default GHCJsonSchema
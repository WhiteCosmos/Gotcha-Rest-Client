import EvFlattenTreeNode
    from '@/components/flatten-tree/EvFlattenTreeNode'
import JsonSchemaNodeProperties
    from '@/components/json-schema-editor/JsonSchemaNodeProperties'

/**
 * @created_at 2022/9/16
 * @app_version 1.6.0
 */
class JsonSchemaNode extends EvFlattenTreeNode {
    constructor() {
        super()

        // Data Fields

        this.key = ''

        this.type = 'string'

        this.format = '' // swagger/openapi format int64

        this.title = '' // 不使用

        this.description = ''

        this.properties = new JsonSchemaNodeProperties()

        // 暂不使用
        this.allOf = []

        // 暂不使用
        this.oneOf = []

        // 暂不使用
        this.anyOf = []

        // discriminator 暂不使用

        /**
         * Reference Json Schema UID
         * @type {string}
         */
        this.$ref = undefined

        /**
         * Reference Json Schema Name
         * @type {string}
         */
        this.refName = ''

        /**
         * @type {boolean}
         */
        this.isRefExists = true

        // Control Fields

        /**
         * @type {boolean}
         */
        this.isRecursive = false

        /**
         * @type {boolean}
         */
        this.isReadOnly = false

        // Control

        this.isRoot = false

        this.isObjectProperty = false

        this.isArrayItem = false

        this.isDictionaryKey = false

        this.isDictionaryValue = false

        this.isRecursive = false
    }

    static newRootNode(type) {
        let node = new JsonSchemaNode()

        node.isRoot = true

        node.isContainer = true

        node.expand = true

        node.type = type || 'object'

        node.children = []

        return node
    }

    static newContainerNode(key, type = 'object') {
        let node = new JsonSchemaNode()

        node.isContainer = true

        node.key = key || ''

        node.type = type

        node.children = []

        return node
    }

    static newPrimitiveNode(key, type = 'string', value) {
        let node = new JsonSchemaNode()

        node.key = key || ''

        node.type = type

        node.value = value

        node.children = []

        return node
    }

    static duplicateJsonNode(jsonNode) {
        if (jsonNode.isContainer) {
            return this.duplicateContainerNode(jsonNode)
        } else {
            return this.duplicatePrimitiveNode(jsonNode)
        }
    }

    static duplicateContainerNode(jsonNode) {
        let node = new JsonSchemaNode()

        node.key = jsonNode.key

        node.type = jsonNode.type

        node.value = jsonNode.value

        node.keyPlaceholder = jsonNode.keyPlaceholder

        node.valuePlaceholder = jsonNode.valuePlaceholder

        node.isObjectProperty = jsonNode.isObjectProperty

        node.isArrayItem = jsonNode.isArrayItem

        node.layer = jsonNode.layer

        node.isContainer = true

        node.expand = false

        jsonNode.children.forEach(child => {
            if (child.isContainer) {
                node.children.push(this.duplicateContainerNode(child))
            } else {
                node.children.push(this.duplicatePrimitiveNode(child))
            }
        })

        return node
    }

    static duplicatePrimitiveNode(jsonNode) {
        let node = new JsonSchemaNode()

        node.key = jsonNode.key

        node.type = jsonNode.type

        node.value = jsonNode.value

        node.keyPlaceholder = jsonNode.keyPlaceholder

        node.valuePlaceholder = jsonNode.valuePlaceholder

        node.isObjectProperty = jsonNode.isObjectProperty

        node.isArrayItem = jsonNode.isArrayItem

        node.layer = jsonNode.layer

        return node
    }
}

export default JsonSchemaNode
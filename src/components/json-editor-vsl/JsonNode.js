import EvFlattenTreeNode
    from '@/components/flatten-tree/EvFlattenTreeNode'

class JsonNode extends EvFlattenTreeNode {
    constructor(options) {
        super()

        this.key = ''

        this.type = 'object' // object array / string number boolean

        this.value = undefined // object -> [] array -> [] / string -> '' number -> 0 boolean -> false

        this.keyPlaceholder = 'Property Name'

        this.valuePlaceholder = 'Property Value'

        this.isRoot = false

        this.isObjectProperty = false

        this.isArrayItem = false

        this.isDuplicateKey = false // If duplicate show warning icon

        if (options) {
            this.isRoot = options.isRoot

            this.value = options.value

            this.isContainer = true

            this.children = []
        }
    }

    static newRootNode(type) {
        let node = new JsonNode()

        node.isRoot = true

        node.isContainer = true

        node.type = type || 'object'

        node.children = []

        return node
    }

    static newContainerNode(key, type = 'object') {
        let node = new JsonNode()

        node.isContainer = true

        node.key = key || ''

        node.type = type

        node.children = []

        return node
    }

    static newPrimitiveNode(key, type = 'string', value) {
        let node = new JsonNode()

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
        let node = new JsonNode()

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
        let node = new JsonNode()

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

export default JsonNode
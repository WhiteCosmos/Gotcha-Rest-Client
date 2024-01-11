import JsonNode
    from '@/components/json-editor-vsl/JsonNode'
import _
    from 'lodash'
import EvCheckedStatusHelper
    from '@/mixins/EvCheckedStatusHelper'

class GHCJsonNodeBuilder {
    constructor(variableRender) {
        this.variableRender = variableRender
    }

    buildJsonNodeFromJson(json, jsonNode = null) {
        if (typeof json === 'object' && !Array.isArray(json)) {
            !jsonNode && (jsonNode = JsonNode.newRootNode('object')) && (jsonNode.expand = true)

            for (let key in json) {
                let node = undefined

                let value = json[key]

                if (typeof value === 'object' && !Array.isArray(value)) {
                    node = JsonNode.newContainerNode(key, 'object')
                    // node.expand = true
                    node.layer = jsonNode.layer + 1

                    this.buildJsonNodeFromJson(value, node)
                }

                if (typeof value === 'object' && Array.isArray(value)) {
                    node = JsonNode.newContainerNode(key, 'array')
                    // node.expand = true
                    node.layer = jsonNode.layer + 1

                    this.buildJsonNodeFromJson(value, node)
                }

                if (typeof value === 'string') {
                    node = JsonNode.newPrimitiveNode(key, 'string', value)
                    node.layer = jsonNode.layer + 1
                }

                if (typeof value === 'number') {
                    node = JsonNode.newPrimitiveNode(key, 'number', value)
                    node.layer = jsonNode.layer + 1
                }

                if (typeof value === 'boolean') {
                    node = JsonNode.newPrimitiveNode(key, 'boolean', value)
                    node.layer = jsonNode.layer + 1
                }

                if (value === null || value === undefined) {
                    node = JsonNode.newPrimitiveNode(key, 'null', '')
                    node.layer = jsonNode.layer + 1
                }

                if (node) {
                    node.isObjectProperty = true
                    jsonNode.children.push(node)
                }
            }
        }

        if (typeof json === 'object' && Array.isArray(json)) {
            !jsonNode && (jsonNode = JsonNode.newRootNode('array')) && (jsonNode.expand = true)

            json.forEach(item => {
                let node = undefined

                if (typeof item === 'object' && !Array.isArray(item)) {
                    node = JsonNode.newContainerNode(null, 'object')
                    // node.expand = true
                    node.layer = jsonNode.layer + 1

                    this.buildJsonNodeFromJson(item, node)
                }

                if (typeof item === 'object' && Array.isArray(item)) {
                    node = JsonNode.newContainerNode(null, 'array')
                    // node.expand = true
                    node.layer = jsonNode.layer + 1

                    this.buildJsonNodeFromJson(item, node)
                }

                if (typeof item === 'string') {
                    node = JsonNode.newPrimitiveNode(null, 'string', item)
                    node.layer = jsonNode.layer + 1
                }

                if (typeof item === 'number') {
                    node = JsonNode.newPrimitiveNode(null, 'number', item)
                    node.layer = jsonNode.layer + 1
                }

                if (typeof item === 'boolean') {
                    node = JsonNode.newPrimitiveNode(null, 'boolean', item)
                    node.layer = jsonNode.layer + 1
                }

                if (item === null || item === undefined) {
                    node = JsonNode.newPrimitiveNode(null, 'null', item)
                    node.layer = jsonNode.layer + 1
                }

                if (node) {
                    node.isArrayItem = true

                    jsonNode.children.push(node)
                }
            })
        }

        return jsonNode
    }

    async buildJsonFromJsonNodeAsync(jsonNode) {
        return this.buildJsonFromJsonNode(jsonNode)
    }

    buildJsonFromJsonNode(jsonNode) {
        if (jsonNode.type === 'object') {
            let root = {}

            if (EvCheckedStatusHelper.isItemUnchecked(jsonNode)) {
                return root
            }

            jsonNode.children.forEach(child => {
                if (EvCheckedStatusHelper.isItemUnchecked(child)) {
                    return
                }

                if (_.isEmpty(child.key)) {
                    return
                }

                root[child.key] = this.buildJsonFromJsonNode(child)
            })

            return root
        }

        if (jsonNode.type === 'array') {
            let root = []

            if (EvCheckedStatusHelper.isItemUnchecked(jsonNode)) {
                return root
            }

            jsonNode.children.forEach(child => {
                if (EvCheckedStatusHelper.isItemUnchecked(jsonNode)) {
                    return
                }

                root.push(this.buildJsonFromJsonNode(child))
            })

            return root
        }

        if (jsonNode.type === 'string') {
            return this.variableRender.render(jsonNode.value)
        }

        if (jsonNode.type === 'number') { // 可能存在溢出和转换问题
            try {
                let value = this.variableRender.render(jsonNode.value)

                return value ? Number(value) : 0
            } catch (err) {
                return 0
            }
        }

        if (jsonNode.type === 'boolean') {
            return jsonNode.value || false
        }

        if (jsonNode.type === 'null') {
            return null
        }
    }

    buildJsonNodeFromJsonStruct_(jsonStruct) {
        if (jsonStruct.isStructType) {
            let node = new JsonNode()

            node.key = jsonStruct.fieldName

            node.type = 'object'

            node.value = []

            jsonStruct.children && jsonStruct.children.forEach(child => {
                let childNode = this.buildJsonNodeFromJsonStruct_(child)

                childNode.isProperty = true

                node.value.push(childNode)
            })

            return node
        }

        if (jsonStruct.isArrayType || jsonStruct.isSetType) {
            let node = new JsonNode()

            node.key = jsonStruct.fieldName

            node.type = 'array'

            node.value = []

            let childNode = this.buildJsonNodeFromJsonStruct_(jsonStruct.children[0])

            childNode.isItem = true

            node.value.push(childNode)

            return node
        }

        if (jsonStruct.isMapType) {
            let node = new JsonNode()

            node.type = 'object'

            node.key = jsonStruct.fieldName

            node.value = []

            let childNode = this.buildJsonNodeFromJsonStruct_(jsonStruct.children[1])

            childNode.isProperty = true

            node.value.push(childNode)

            return node
        }

        if (jsonStruct.isStringType) {
            let node = new JsonNode()

            node.key = jsonStruct.fieldName

            node.type = 'string'

            node.valuePlaceholder = jsonStruct.fieldSummary || 'Property Value'

            return node
        }

        if (jsonStruct.isEnumType) { // 枚举暂时作为string处理
            let node = new JsonNode()

            node.key = jsonStruct.fieldName

            node.type = 'string'

            node.value = jsonStruct.children[0].fieldName

            return node
        }

        if (jsonStruct.isNumberType) {
            let node = new JsonNode()

            node.key = jsonStruct.fieldName

            node.type = 'number'

            node.valuePlaceholder = jsonStruct.fieldSummary || 'Property Value'

            return node
        }

        if (jsonStruct.isBooleanType) {
            let node = new JsonNode()

            node.key = jsonStruct.fieldName

            node.type = 'boolean'

            node.value = false

            node.valuePlaceholder = jsonStruct.fieldSummary || ''

            return node
        }

        return this.buildDefaultNodeFromJsonStruct(jsonStruct)
    }

    buildDefaultNodeFromJsonStruct(jsonStruct) {
        let node = new JsonNode() // 其它一律当作string

        node.key = jsonStruct.fieldName

        node.type = 'string'

        node.valuePlaceholder = jsonStruct.fieldSummary || 'Property Value'

        return node
    }
}

export default GHCJsonNodeBuilder
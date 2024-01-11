const jsonTypes = {
    object: 'object',
    array: 'array',
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    null_: 'null',
}

const containerTypes = [
    'object',
    'array',
]

const primitiveTypes = [
    'string',
    'number',
    'boolean',
    'null',
]

class JsonNodeHelper {
    constructor() {

    }

    static checkIsContainerNode(node) {
        return node && containerTypes.includes(node.type)
    }

    static checkIsPrimitiveNode(node) {
        return node && primitiveTypes.includes(node.type)
    }

    static checkIsObjectNode(node) {
        return node && node.type === jsonTypes.object
    }

    static checkIsArrayNode(node) {
        return node && node.type === jsonTypes.array
    }

    static checkIsStringNode(node) {
        return node && node.type === jsonTypes.string
    }

    static checkIsNumberNode(node) {
        return node && node.type === jsonTypes.number
    }

    static checkIsBooleanNode(node) {
        return node && node.type === jsonTypes.boolean
    }

    static checkIsNullNode(node) {
        return node && node.type === jsonTypes.null_
    }
}

export default JsonNodeHelper
/**
 * @created_at 2022/11/14
 * @app_version 1.6.0
 */
import GHCJsonSchemaGroup
    from '@/modals/json-schema-manager/data/GHCJsonSchemaGroup'
import JsonSchemaNode
    from '@/components/json-schema-editor/JsonSchemaNode'
import GHCJsonSchema
    from '@/modals/json-schema-manager/data/GHCJsonSchema'
import GHCJsonSchemaNodeType
    from '@/components/json-schema-editor/GHCJsonSchemaNodeType'
import GHCJsonSchemaPropertiesUtil
    from '@/core/transformer/GHCJsonSchemaPropertiesUtil'

const OPENAPI_TYPES = {
    STRING: "string",
    NUMBER: "number",
    INTEGER: "integer",
    BOOLEAN: "boolean",

    DICTIONARY: "dictionary", // additionalProperties

    OBJECT: "object",
    ARRAY: "array",
}

const SWAGGER_DEFINITION_PREFIX = "#/definitions/"

const OPENAPI_COMPONENT_PREFIX = "#/components/schemas/"

class GHCOpenAPIComponentTransformer {
    constructor(props = {}) {
        this.swagger = props.swagger

        this.openapi = props.openapi

        this.version = props.version // 区分 openapi 3.0 和 3.1 版本

        this.referencePool = new Map()
    }

    /**
     * Swagger | OpenAPI -> GHCJsonSchemaNode
     */
    toJsonSchemas() {
        if (this.swagger) {
            return this.transformSwaggerDefinitionsToJsonSchemas()
        }

        if (this.openapi) {
            return this.transformOpenAPIComponentsToJsonSchemas()
        }

        return []
    }

    toJsonSchema(schema) {
        if (this.swagger) {
            return this.transformSwaggerDefinitionToJsonSchema(schema)
        }

        if (this.openapi) {
            return this.transformOpenAPIDefinitionToJsonSchema(schema)
        }
    }

    /**
     * GHCJsonSchemaNode -> Swagger Definitions
     */
    toSwaggerDefinitions() {
        // Resolve DSchema

        // let definitions = {} definitionName -> Schema

        // jsonSchemaPool = new Map() uid -> GHCJsonSchema

        /*
        1. 重名如何处理 -> 直接覆盖
         */
    }

    /**
     * GHCJsonSchemaNode -> OpenAPI Components
     */
    toOpenAPIComponents() {

    }

    transformOpenAPIDefinitionToJsonSchema(schema) { // return JsonSchema
        let root = this._resolve(schema, '')

        root.isRoot = true

        root.expand = true

        return root
    }

    transformOpenAPIComponentsToJsonSchemas() {
        let components = this.openapi.components?.schemas

        if (!components) {
            return []
        }

        let group = new GHCJsonSchemaGroup()

        group.name = this.openapi?.info?.title || 'Group'

        let entries = Object.entries(components)

        for (let i = 0; i < entries.length; i++) {
            let [key, value] = entries[i]

            let item = new GHCJsonSchema()

            item.name = key

            let ref = OPENAPI_COMPONENT_PREFIX + key

            this.referencePool.set(ref, item)

            group.items.push(item)
        }

        for (let i = 0; i < entries.length; i++) {
            let item = group.items[i]

            let [key, value] = entries[i]

            item.root = this._resolve(value, key, new Set([item.name]))

            item.root.key = item.name

            item.root.isRoot = true

            item.root.expand = true
        }

        return group
    }

    transformSwaggerDefinitionToJsonSchema(schema) { // return JsonSchema
        let root = this._resolve(schema, '')

        root.isRoot = true

        root.expand = true

        return root
    }

    transformSwaggerDefinitionsToJsonSchemas() { // return jsonSchemaGroups
        let definitions = this.swagger.definitions

        if (!definitions) {
            return []
        }

        let group = new GHCJsonSchemaGroup()

        group.name = this.swagger?.info?.title || 'Group'

        let entries = Object.entries(definitions)

        for (let i = 0; i < entries.length; i++) {
            let [key, value] = entries[i]

            let item = new GHCJsonSchema()

            item.name = key

            let ref = SWAGGER_DEFINITION_PREFIX + key

            this.referencePool.set(ref, item)

            group.items.push(item)
        }

        for (let i = 0; i < entries.length; i++) {
            let item = group.items[i]

            let [key, value] = entries[i]

            item.root = this._resolve(value, key, new Set([item.name]))

            if (item.root) {
                item.root.key = item.name

                item.root.isRoot = true

                item.root.isContainer = true

                item.root.expand = true
            } else {
                item.root = JsonSchemaNode.newRootNode('object')
            }
        }

        return group
    }


    _resolve(property, propertyName, definitionChecker = new Set()) {
        if (this._isDictionaryType(property)) {
            return this._dictionary(property, propertyName, new Set([...definitionChecker]))
        }

        if (this._isReferenceType(property)) {
            return this._reference(property, propertyName, new Set([...definitionChecker]))
        }

        if (!property.type || (property.type === OPENAPI_TYPES.OBJECT)) { // 没有 'type' 字段默认当作 object
            let properties = property.properties

            let node = this._buildJsonSchemaNode(property, propertyName)

            node.isContainer = true

            for (let p in properties) {
                let child = this._resolve(properties[p], p, new Set([...definitionChecker]))

                if (child) {
                    child.isObjectProperty = true

                    node.children.push(child)
                }
            }

            return node
        }

        if (this._isMultipleType(property)) {
            let node = this._buildJsonSchemaNode(property, propertyName) // 返回空对象

            node.type = 'object'

            node.isContainer = true

            return node
        }

        if (property.type === OPENAPI_TYPES.ARRAY) {
            let items = property.items

            let node = this._buildJsonSchemaNode(property, propertyName)

            node.isContainer = true

            let child = this._resolve(items, propertyName, new Set([...definitionChecker]))

            if (child) {
                child.isArrayItem = true

                node.children.push(child)
            }

            return node
        }

        if (this._isPrimitiveType(property)) {
            return this._buildJsonSchemaNode(property, propertyName)
        }

        console.log("unknown property", property)
    }

    _isDictionaryType(property) {
        return property.type === OPENAPI_TYPES.OBJECT && property.hasOwnProperty('additionalProperties')
    }

    _dictionary(property, propertyName, definitionChecker = new Set()) {
        let node = this._buildJsonSchemaNode(property, propertyName)

        node.isContainer = true

        node.type = OPENAPI_TYPES.DICTIONARY

        let keyItem = new JsonSchemaNode()

        keyItem.type = OPENAPI_TYPES.STRING

        keyItem.isDictionaryKey = true

        let valueItem = this._resolve(property.additionalProperties, '', new Set([...definitionChecker]))

        valueItem.isDictionaryValue = true

        node.children = [keyItem, valueItem]

        return node
    }

    _isReferenceType(property) {
        return property.$ref
    }

    _isMultipleType(property) { // 暂时忽略使用这个类型的结构 还差Postman导入和Markdown导出
        return property && (property.hasOwnProperty('anyOf') || property.hasOwnProperty('oneOf'))
    }

    _reference(property, propertyName, definitionChecker = new Set()) {
        let node = new JsonSchemaNode()

        node.key = propertyName

        node.type = GHCJsonSchemaNodeType.REFERENCE

        node.isContainer = true

        node.description = property.description

        let ref = property.$ref

        let item = this.referencePool.get(ref)

        if (!item) {
            return node
        }

        node.$ref = item.uid

        let referenceName = this._getReferenceName(ref)

        let definition

        if (this.swagger) {
            definition = this.swagger.definitions[referenceName]
        }

        if (this.openapi) {
            definition = this.openapi.components.schemas[referenceName]
        }

        if (!definition) {
            return node
        }

        if (definitionChecker.has(referenceName)) {
            node.isRecursive = true
        } else {
            definitionChecker.add(referenceName)
        }

        return node
    }

    _isPrimitiveType(property) {
        return [
            OPENAPI_TYPES.STRING,
            OPENAPI_TYPES.NUMBER,
            OPENAPI_TYPES.INTEGER,
            OPENAPI_TYPES.BOOLEAN,
        ].includes(property.type)
    }

    _buildJsonSchemaNode(property, propertyName) {
        let node = new JsonSchemaNode()

        node.key = propertyName

        node.type = property.type

        node.format = property.format

        node.title = property.title

        node.description = property.description

        GHCJsonSchemaPropertiesUtil.setJsonSchemaProperties(node, property)

        node.extensions = this._buildJsonSchemaNodeExtensions(property)

        return node
    }

    _buildJsonSchemaNodeExtensions(property) {
        let extensions = {}

        for (let p in property) {
            if (p.toLowerCase().startsWith("x-")) {
                extensions[p] = property[p]
            }
        }

        return extensions
    }

    _getReferenceName(ref) {
        if (this.swagger) {
            return ref.replaceAll(SWAGGER_DEFINITION_PREFIX, '')
        }

        if (this.openapi) {
            return ref.replaceAll(OPENAPI_COMPONENT_PREFIX, '')
        }

        return ref
    }
}

export default GHCOpenAPIComponentTransformer
/**
 * @created_at 2022/11/28
 * @app_version 1.6.0
 */

const SWAGGER_DEFINITION_PREFIX = "#/definitions/"

const OPENAPI_COMPONENT_PREFIX = "#/components/schemas/"

class GHCOpenAPIComponentGenerator {
    constructor(jsonSchemaGroups = [], type = 'swagger') {
        this.type = type

        this.jsonSchemaPool = new Map()

        this.definitions = {} // or 'schemas' in OpenAPI

        jsonSchemaGroups.forEach(group => {
            group.items.forEach(item => {
                this.jsonSchemaPool.set(item.uid, item.root)
            })
        })
    }

    generate(dSchema) {
        return this._resolve(dSchema)
    }

    _resolve(dSchema) {
        let schema = {}

        if (dSchema.$ref) {
            let refSchema = this.jsonSchemaPool.get(dSchema.$ref)

            if (!refSchema) {
                schema.$ref = ''

                return schema
            }

            // _resolve ref
            if (!dSchema.isRecursive) {
                this._resolveRef(refSchema)
            }

            if (this.type === 'swagger') {
                schema.$ref = SWAGGER_DEFINITION_PREFIX + refSchema.key
            }

            if (this.type === 'openapi') {
                schema.$ref = OPENAPI_COMPONENT_PREFIX + refSchema.key
            }

            return schema
        }

        this._setJsonSchemaProperties(dSchema, schema)

        if (dSchema.type === 'object') {
            schema.required = []

            schema.properties = {}

            dSchema.children.forEach(child => {
                schema.properties[child.key] = this._resolve(child)
            })

            let requiredProperties = dSchema.children.filter(child => {
                return child.properties.constraint.required === 'CHECKED'
            })

            if (requiredProperties.length !== 0) {
                schema.required = requiredProperties.map(property => {
                    return property.key
                })
            }

            return schema
        }

        if (dSchema.type === 'array') {
            schema.items = this._resolve(dSchema.children[0])
        }

        if (dSchema.type === 'dictionary') {
            schema.type = 'object'

            schema.additionalProperties = this._resolve(dSchema.children[1])
        }

        return schema
    }

    _resolveRef(refSchema) {
        this.definitions[refSchema.key] = this._resolve(refSchema)
    }

    _setJsonSchemaProperties(dSchema, schema) {
        schema.type = dSchema.type

        dSchema.format && (schema.format = dSchema.format)

        dSchema.title && (schema.title = dSchema.title)

        schema.description = dSchema.description

        this._setJsonSchemaConstraintProperties(dSchema, schema)

        this._setJsonSchemaXmlProperties(dSchema, schema)

        this._setJsonSchemaExtensions(dSchema, schema)
    }

    // @formatter:off
    _setJsonSchemaConstraintProperties(dSchema, schema) {
        let constraint = dSchema.properties.constraint

        constraint.deprecated === 'CHECKED' && (schema.deprecated = true)

        constraint.example && (schema.example = constraint.example)

        constraint.default && (schema.default = constraint.default)

        constraint.readOnly && (schema.readOnly = true)

        constraint.writeOnly && (schema.writeOnly = true)

        constraint.nullable === 'CHECKED' && (schema.nullable = true)

        // String

        try { constraint.maxLength !== '' && (schema.maxLength = Number(constraint.maxLength)) } catch (ignore) {}

        try { constraint.minLength !== '' && (schema.minLength = Number(constraint.minLength)) } catch (ignore) {}

        constraint.pattern && (schema.pattern = constraint.pattern)

        // Number

        try { constraint.maximum !== '' && (schema.maximum = Number(constraint.maximum)) } catch (ignore) {}

        constraint.exclusiveMaximum && (schema.exclusiveMaximum = constraint.exclusiveMaximum)

        try { constraint.maximum !== '' && (schema.pattern = Number(constraint.maximum)) } catch (ignore) {}

        constraint.exclusiveMaximum !== '' && (schema.pattern = constraint.pattern)

        try { constraint.multipleOf !== '' && (schema.multipleOf = Number(constraint.multipleOf)) } catch (ignore) {}

        // Array

        try { constraint.maxItems !== '' && (schema.maxItems = Number(constraint.maxItems)) } catch (ignore) {}

        try { constraint.minItems !== '' && (schema.minItems = Number(constraint.minItems)) } catch (ignore) {}

        constraint.uniqueItems && (schema.uniqueItems = constraint.uniqueItems)

        // Enums

        if (constraint.enums.length !== 0) {
            schema.enum = constraint.enums.map(enum_ => {
                return enum_.value
            })
        }
    }
    // @formatter:on

    _setJsonSchemaXmlProperties(dSchema, schema) {
        let xml = dSchema.properties.xml

        for (let key in xml) {
            let value = xml[key]

            if (key === 'extensions') {
                // TODO ignore
            } else {
                if (value) {
                    if (!schema.hasOwnProperty('xml')) {
                        schema.xml = {}
                    }

                    schema.xml[key] = value
                }
            }
        }
    }

    _setJsonSchemaExtensions(dSchema, schema) {
        let extensions = dSchema.properties.extensions

        extensions.forEach(extension => {
            schema[extension.key] = extension.value
        })
    }

    _checkIsJsonSchemaRequired() {

    }

    getDefinitions() {
        // 获取生成过程中所有用到的Definition
        return this.definitions
    }
}

export default GHCOpenAPIComponentGenerator
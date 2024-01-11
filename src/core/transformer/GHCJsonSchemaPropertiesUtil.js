import JsonSchemaNodeProperties
    from '@/components/json-schema-editor/JsonSchemaNodeProperties'

class GHCJsonSchemaPropertiesUtil {
    constructor() {

    }

    static setJsonSchemaProperties(gParameter, parameter) {
        let properties = gParameter.properties

        if (!properties) {
            properties = new JsonSchemaNodeProperties()

            gParameter.properties = properties
        }

        this._setJsonSchemaConstraint(gParameter, parameter)

        this._setJsonSchemaEnums(gParameter, parameter)

        this._setJsonSchemaXml(gParameter, parameter)

        this._setJsonSchemaMisc(gParameter, parameter)
    }

    static _setJsonSchemaConstraint(gParameter, parameter) {
        let properties = gParameter.properties

        let constraint = properties.constraint

        constraint.required = parameter.required ? 'CHECKED' : 'UNCHECKED'

        constraint.deprecated = parameter.deprecated ? 'CHECKED' : 'UNCHECKED'

        constraint.allowEmptyValue = parameter.allowEmptyValue ? 'CHECKED' : 'UNCHECKED'

        constraint.example = parameter.example

        constraint.default = parameter.default

        // String

        constraint.maxLength = parameter.maxLength

        constraint.minLength = parameter.minLength

        constraint.pattern = parameter.pattern

        // number

        constraint.maximum = parameter.maximum

        constraint.exclusiveMaximum = !!parameter.exclusiveMaximum

        constraint.minimum = parameter.minimum

        constraint.exclusiveMinimum = !!parameter.exclusiveMinimum

        constraint.multipleOf = parameter.multipleOf

        // array

        constraint.maxItems = parameter.maxItems

        constraint.minItems = parameter.minItems

        constraint.uniqueItems = !!parameter.uniqueItems

        // Object (Ignore)

        constraint.maxProperties = parameter.maxProperties

        constraint.minProperties = parameter.minProperties
    }

    static _setJsonSchemaEnums(gParameter, parameter) {
        let properties = gParameter.properties

        let enums = properties.constraint.enums

        let enums_ = parameter['enum']

        if (!enums_) {
            return
        }

        enums_.forEach(value => {
            enums.push({
                value: value,
                description: ''
            })
        })
    }

    static _setJsonSchemaXml(gParameter, parameter) {
        let xml_ = parameter.xml

        if (!xml_) {
            return
        }

        let xml = gParameter.properties.xml

        xml.name = xml_.name

        xml.namespace = xml_.namespace

        xml.prefix = xml_.prefix

        xml.attribute = !!xml_.attribute

        xml.wrapped = !!xml_.wrapped
    }

    static _setJsonSchemaMisc(gParameter, parameter) {
        let constraint = gParameter.properties.constraint

        constraint.readOnly = !!parameter.readOnly

        constraint.writeOnly = !!parameter.writeOnly

        constraint.nullable = parameter.nullable ? 'CHECKED' : 'UNCHECKED'

        let format = gParameter.properties.format

        // Swagger

        format.collectionFormat = parameter.collectionFormat

        // OpenAPI

        format.style = parameter.style

        format.explode = !!parameter.explode

        format.allowReserved = !!parameter.allowReserved
    }
}

export default GHCJsonSchemaPropertiesUtil
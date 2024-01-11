export default {
    javaFieldToJsonStr: javaFieldToJsonStr,

    javaFieldsToJsonStr: javaFieldsToJsonStr
}

function javaFieldsToJsonStr(javaFields) {
    let sb = ""

    sb += "{\n"

    javaFields.forEach(javaField => {
        sb += `${space(1)}`

        sb += javaFieldToJsonStr(0, false, javaField)
    })

    sb += "}\n"

    return sb
}

function javaFieldToJsonStr(layer = 0, underContainer = false, javaField) {
    let fieldName = javaField.fieldName

    let fieldTypeName = javaField.fieldTypeName

    if (isStringType(javaField)) {
        return `${space(layer)}\"${fieldName}\": \"\", \n`
    }

    if (isNumberType(javaField)) {
        return `${space(layer)}\"${fieldName}\": 0, \n`
    }

    if (isBooleanType(javaField)) {
        return `${space(layer)}\"${fieldName}\": false, \n`
    }

    if (isDatetimeType(javaField)) {
        return `${space(layer)}\"${fieldName}\": \"\", \n`
    }

    if (isEnumType(javaField)) {
        return `${space(layer)}\"${fieldName}\": \"${javaField.children[0].fieldName}\", \n`
    }

    if (isObjectType(javaField)) {
        let sb = ""

        if (javaField.notFound) {
            if (fieldName === fieldTypeName) {
                sb += "null,\n"
            } else {
                sb += `${space(layer)}\"${fieldName}\": null,\n`
            }

            return sb
        }

        if (fieldName === fieldTypeName) {
            sb += `${space(layer)}{\n`
        } else {
            sb += `${space(layer)}\"${fieldName}\": {\n`
        }

        javaField.children && javaField.children.forEach(child => {
            sb += javaFieldToJsonStr(layer + 1, underContainer, child)
        })

        if (layer === 0) {
            sb += `${space(layer)}}\n`
        } else {
            sb += `${space(layer)}},\n`
        }

        return sb
    }

    if (isListType(javaField) || isSetType(javaField)) {
        let sb = ""

        if (!javaField.children || javaField.children.length === 0) {
            return sb
        }

        let child = javaField.children[0]

        if (isObjectType(child)) {
            if (!underContainer) {
                sb += `${space(layer)}\"${fieldName}\": [\n`
            }

            sb += javaFieldToJsonStr(layer + 1, underContainer, child)

            sb += `${space(layer)}],\n`

            return sb
        }

        sb += `${space(layer)}\"${fieldName}\" : [],\n`

        return sb
    }

    if (isMapType(javaField)) {
//            def keyField = this.fields[0]
//
//            def valueField = this.fields[1]
//
//            def key = ""
//
//            def value = ""
//
//            if (JavaFieldHelper.isString(keyField)) {
//                key = "key"
//            }
//
//            if (JavaFieldHelper.isNumber(keyField)) {
//                key = -1
//            }
//
//            if (JavaFieldHelper.isEnum(keyField)) {
//                key = keyField.fields.first().fieldName
//            }


//            if (JavaFieldHelper.isString(valueField)) {
//                value = "value"
//            }
//
//            if (JavaFieldHelper.isNumber(valueField)) {
//                value = -1
//            }
//
//            if (JavaFieldHelper.isBoolean(valueField)) {
//                value = false
//            }


        return `${space(layer)}${fieldName} : { }, \n`
    }

    return `${space(layer)}${fieldName} : null, \n`
}

function space(layer) {
    let sb = ""

    if (layer === 0) {
        return sb
    }

    for (let i = 0; i < layer; i++) {
        sb += "\xa0\xa0"
    }

    return sb
}

function isStringType(javaField) {
    return javaField.fieldTypeName === "String"
}

function isNumberType(javaField) {
    return JAVA_NUMBER_TYPES.includes(javaField.fieldTypeName)
}

function isBooleanType(javaField) {
    return javaField.fieldTypeName === "Boolean" || javaField.fieldTypeName === "boolean"
}

function isDatetimeType(javaField) {
    return JAVA_DATETIME_TYPES.includes(javaField.fieldTypeName)
}

function isEnumType(javaField) {
    return javaField.isEnumType
}

function isObjectType(javaField) {
    return javaField.isStructType
}

function isListType(javaField) {
    return javaField.isArrayType
}

function isSetType(javaField) {
    return javaField.isSetType
}

function isMapType(javaField) {
    return javaField.isMapType
}

function isJsonTypeNode(javaField) {
    return javaField.fieldName === javaField.fieldTypeName // 字段名称和类型相同时，不需要显示出来
}

let JAVA_NUMBER_TYPES = [
    "byte",
    "Byte",
    "short",
    "Short",
    "int",
    "Integer",
    "long",
    "Long",
    "double",
    "Double",
    "float",
    "Float",
    "BigDecimal",
]

let JAVA_DATETIME_TYPES = [
    "Date",
    "LocalDate",
    "LocalTime",
    "LocalDateTime",
]


import _
    from 'lodash'

function getFieldName(jsonStruct) {
    if (jsonStruct.isEnumValue) {
        return '\"' + jsonStruct.fieldName + '\"'
    }

    return jsonStruct.fieldName
}

function getFieldType(jsonStruct) {
    let actualFieldType = ""

    let swaggerV2Field = jsonStruct.swaggerV2Field

    if (swaggerV2Field) {
        let apiImplicitParam = swaggerV2Field.apiImplicitParam

        apiImplicitParam && (actualFieldType = apiImplicitParam.dataType)
    }

    if (_.isEmpty(actualFieldType)) {
        return jsonStruct.fieldTypeName
    } else {
        return actualFieldType
    }
}

function getFieldQualifiedName(jsonStruct) {
    return jsonStruct ? jsonStruct.fieldQualifiedName : ""
}

function getFieldJsonType(jsonStruct) {
    if (isStructType(jsonStruct)) {
        return "(object)"
    }

    if (isStringType(jsonStruct)) {
        return undefined
    }

    if (isNumberType(jsonStruct)) {
        return "(number)"
    }

    if (isDateTimeType(jsonStruct)) {
        return "(datetime)"
    }

    if (isBooleanType(jsonStruct)) {
        return undefined
    }

    if (isArrayType(jsonStruct) || isSetType(jsonStruct)) {
        return "(array)"
    }

    if (isMapType(jsonStruct)) {
        return "(dict)"
    }

    if (isEnumType(jsonStruct)) {
        return "(enum)"
    }

    if (isAnyType(jsonStruct)) {
        return "(any)"
    }
}

function getSwaggerParameterType(jsonStruct) {

}

/**
 * Header Cookie Query Path Form Body
 */
function getParameterType(jsonStruct) {
    return jsonStruct.parameterType
}

function getFieldDescription(jsonStruct) {
    return jsonStruct.fieldSummary || "/"
}

function isFieldRequired(jsonStruct) {
    let actualRequired = false

    let springRestfulField = jsonStruct.springRestfulField

    let jaxRSField = jsonStruct.jaxRSField

    let swaggerV2Field = jsonStruct.swaggerV2Field

    if (springRestfulField) {
        let springParamAnnotation = findParamAnnotation(springRestfulField)

        // Path 参数固定为必填
        if (springParamAnnotation && springParamAnnotation.annotationName === "Path Variable") {
            return true
        }

        springParamAnnotation && (actualRequired = springParamAnnotation.required)

        return actualRequired || jsonStruct.isRequired
    }

    if (jaxRSField) {
        let jaxParamAnnotation = findParamAnnotation(jaxRSField)

        // Path 参数固定为必填
        if (jaxParamAnnotation && jaxParamAnnotation.annotationName === "Path Param") {
            return true
        }
    }

    if (jsonStruct.isRequired) {
        return true
    }

    if (swaggerV2Field) { // 如果框架中已经注明了必填，那么跳过swagger的配置
        let apiParam = swaggerV2Field.apiParam

        let apiImplicitParam = swaggerV2Field.apiImplicitParam

        apiParam && (actualRequired = apiParam.required)

        if (apiImplicitParam && apiImplicitParam.paramType === "path") {
            return true
        }

        apiImplicitParam && (actualRequired = apiImplicitParam.required)
    }

    return actualRequired
}

function findParamAnnotation(annotationField) {
    if (!annotationField) {
        return undefined
    }

    let existsParamAnnotation = undefined

    for (let name in annotationField) {
        if (annotationField[name]) {
            existsParamAnnotation = annotationField[name]
        }
    }

    return existsParamAnnotation
}

function getParameterTypeFromSpring(springParamAnnotation) {

}


function isStructType(jsonStruct) {
    return jsonStruct && jsonStruct.isStructType
}

function isArrayType(jsonStruct) {
    return jsonStruct && jsonStruct.isArrayType
}

function isSetType(jsonStruct) {
    return jsonStruct && jsonStruct.isArrayType
}

function isMapType(jsonStruct) {
    return jsonStruct && jsonStruct.isMapType
}

function isMapKey(jsonStruct) {
    return jsonStruct && jsonStruct.isMapKey
}

function isMapValue(jsonStruct) {
    return jsonStruct && jsonStruct.isMapValue
}

function isEnumType(jsonStruct) {
    return jsonStruct && jsonStruct.isEnumType
}

function isEnumValue(jsonStruct) {
    return jsonStruct && jsonStruct.isEnumValue
}

function isRecursiveType(jsonStruct) {
    return jsonStruct && jsonStruct.isRecursive
}

function isTypeNotFound(jsonStruct) { // 类型在该项目中不存在
    return jsonStruct && jsonStruct.notFound
}

function isTypeEmpty(jsonStruct) { // 没有字段的空类型
    return jsonStruct && (!jsonStruct.children || jsonStruct.children.length === 0)
}

// 具体类型判断，用于颜色展示

function isStringType(jsonStruct) {
    return [
        "String",
        "Character",
        "char"
    ].includes(jsonStruct.fieldTypeName)
}

function isNumberType(jsonStruct) {
    return [
        "Long",
        "long",
        "Integer",
        "int",
        "Short",
        "short",
        "Double",
        "double",
        "Float",
        "float",
        "BigDecimal",
        "BigInteger"
    ].includes(jsonStruct.fieldTypeName)
}

function isDateTimeType(jsonStruct) {
    return [
        "Date",
        "LocalDateTime",
        "LocalDate",
        "LocalTime",
        "Timestamp",
    ].includes(jsonStruct.fieldTypeName)
}

function isAnyType(jsonStruct) {
    return [
        "Object",
        "T"
    ].includes(jsonStruct.fieldTypeName)
}

function isBooleanType(jsonStruct) {
    return [
        "boolean",
        "Boolean",
    ].includes(jsonStruct.fieldTypeName)
}

function isQueryParameter(jsonStruct) {
    return jsonStruct && jsonStruct.parameterType === 'query'
}

function isPathParameter(jsonStruct) {
    return jsonStruct && jsonStruct.parameterType === 'path'
}

function isUrlParameter(jsonStruct) {
    return isQueryParameter(jsonStruct) || isPathParameter(jsonStruct)
}

function isFormParameter(jsonStruct) {
    return jsonStruct && jsonStruct.parameterType === 'form'
}

function isMultipartParameter(jsonStruct) {
    return jsonStruct && jsonStruct.parameterType === 'multipart'
}

function isFileParameter(jsonStruct) {
    return jsonStruct && jsonStruct.parameterType === 'file'
}

function isBodyParameter(jsonStruct) {
    return jsonStruct && jsonStruct.parameterType === 'body'
}

function isRequestPayload(jsonStruct) {
    return isFormParameter(jsonStruct)
        || isMultipartParameter(jsonStruct)
        || isBodyParameter(jsonStruct)
        || isFileParameter(jsonStruct)
}


export default {
    getFieldName,
    getFieldType,
    getFieldQualifiedName,
    getFieldJsonType,
    getParameterType,
    getSwaggerParameterType,
    getFieldDescription,
    isFieldRequired,

    // type

    isStringType,

    // Parameter Type

    isQueryParameter,
    isPathParameter,
    isFormParameter,
    isFileParameter,
    isBodyParameter,
    isUrlParameter,
    isRequestPayload,
}
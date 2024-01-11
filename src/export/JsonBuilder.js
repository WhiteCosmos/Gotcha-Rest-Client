import _
    from 'lodash'

function buildJsonFromJsonStruct(jsonStruct) {
    if (jsonStruct.isStructType) {
        let root = {}

        jsonStruct.children && jsonStruct.children.forEach(child => {
            root[child.fieldName] = buildJsonFromJsonStruct(child)
        })

        return root
    }

    if (jsonStruct.isArrayType || jsonStruct.isSetType) {
        let root = []

        root.push(buildJsonFromJsonStruct(jsonStruct.children[0]))

        return root
    }

    if (jsonStruct.isMapType) {
        let root = {}

        root[buildMapKey(jsonStruct.children[0])] = buildJsonFromJsonStruct(jsonStruct.children[1])

        return root
    }

    if (jsonStruct.isEnumType) {
        return jsonStruct.children[0].fieldName
    }

    if (jsonStruct.isStringType) {
        return ""
    }

    if (jsonStruct.isNumberType) {
        return 0
    }

    if (jsonStruct.isBooleanType) {
        return false
    }

    return ""
}

function buildMapKey(jsonStruct) {
    if (jsonStruct.isStringType) {
        return "key_"
    }

    if (jsonStruct.isNumberType) {
        return 42
    }

    if (jsonStruct.isBooleanType) {
        return false
    }

    if (jsonStruct.isEnumType) {
        return jsonStruct.children[0].fieldName
    }

    return "key_"
}

function buildMapValue(jsonStruct) {
    if (jsonStruct.isStringType) {
        return "value_"
    }

    if (jsonStruct.isNumberType) {
        return 0
    }

    if (jsonStruct.isBooleanType) {
        return false
    }

    if (jsonStruct.isEnumType) {
        return jsonStruct.children[0].fieldName
    }

    if (jsonStruct.isStructType) {

    }

    if (jsonStruct.isMapType) {

    }

    // return buildJsonFromJsonStruct(jsonStruct)

    return "value_"
}

function isJsonObject(root) {
    return _.isObject(root)
}

function isJsonArray(root) {
    return _.isArray(root)
}

export default {
    buildJsonFromJsonStruct: buildJsonFromJsonStruct
}
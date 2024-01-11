import SwaggerDataType
    from '@/export/swagger/SwaggerDataType'
import SwaggerDataFormat
    from '@/export/swagger/SwaggerDataFormat'
import JsonStructHelper
    from '@/core/evalon4j/JsonStructHelper'

export default {
    getSwaggerDataType(jsonStruct) {
        if (isSwaggerObject(jsonStruct)) {
            return SwaggerDataType.object
        }

        if (jsonStruct.isEnumType) {
            return SwaggerDataType.string
        }

        if (jsonStruct.isMapType) {
            return SwaggerDataType.object
        }

        if (isSwaggerArray(jsonStruct)) {
            return SwaggerDataType.array
        }

        if (isSwaggerString(jsonStruct)) {
            return SwaggerDataType.string
        }

        if (isSwaggerInteger32(jsonStruct)) {
            return SwaggerDataType.integer
        }

        if (isSwaggerInteger64(jsonStruct)) {
            return SwaggerDataType.integer
        }

        if (isSwaggerNumber(jsonStruct)) {
            return SwaggerDataType.number
        }

        if (isSwaggerBoolean(jsonStruct)) {
            return SwaggerDataType.boolean
        }

        if (isSwaggerDateTime(jsonStruct)) {
            return SwaggerDataType.string
        }

        return SwaggerDataType.string
    },

    getSwaggerDataFormat(jsonStruct) {
        if (isSwaggerInteger32(jsonStruct)) {
            return SwaggerDataFormat.int32
        }

        if (isSwaggerInteger64(jsonStruct)) {
            return SwaggerDataFormat.int64
        }

        if (isJavaFloat(jsonStruct)) {
            return SwaggerDataFormat.float
        }

        if (isJavaDouble(jsonStruct)) {
            return SwaggerDataFormat.double
        }

        if (isJavaDateTime(jsonStruct)) {
            return SwaggerDataFormat.date_time
        }
    },

    getSwaggerParameterType(jsonStruct) {
        return JsonStructHelper.getParameterType()
    },
}

function isSwaggerObject(jsonStruct) {

}

function isSwaggerArray(jsonStruct) {

}

function isSwaggerString(jsonStruct) {

}

function isSwaggerInteger32(jsonStruct) {

}

function isSwaggerInteger64(jsonStruct) {

}

function isSwaggerNumber(jsonStruct) {

}

function isSwaggerBoolean(jsonStruct) {

}

function isSwaggerDateTime(jsonStruct) {

}

function isJavaFloat(jsonStruct) {

}

function isJavaDouble(jsonStruct) {

}

function isJavaBoolean(jsonStruct) {
    return jsonStruct && (jsonStruct.fieldTypeName === "boolean" || jsonStruct.fieldTypeName === "Boolean")
}

function isJavaDateTime(jsonStruct) {

}
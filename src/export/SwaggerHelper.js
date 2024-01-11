import _
    from 'lodash'

class SwaggerHelper {
    constructor() {

    }

    static getOperationId(jsonMethod) {
        return jsonMethod.serviceName + "." + jsonMethod.methodName
    }

    static isEmpty(value) {
        return _.isEmpty(value)
    }

    // Parameter Type

    static isPathParameter(jsonStruct) {
        return jsonStruct && jsonStruct.parameterType === "path"
    }

    static isQueryParameter(jsonStruct) {
        return jsonStruct && jsonStruct.parameterType === "query"
    }

    static isHeaderParameter(jsonStruct) {
        return jsonStruct && jsonStruct.parameterType === "header"
    }

    static isCookieParameter(jsonStruct) {
        return jsonStruct && jsonStruct.parameterType === "cookie"
    }

    static isFormParameter(jsonStruct) {
        return jsonStruct && jsonStruct.parameterType === "form"
    }

    static isBodyParameter(jsonStruct) {
        return jsonStruct && jsonStruct.parameterType === "body"
    }

    static isFileParameter() {

    }

    static isFormRequestBody(jsonMethod) { // OPENAPI
        if (!_.isEmpty(jsonMethod.consumes)
            && jsonMethod.consumes.includes("application/x-www-form-urlencoded")) {
            return true
        }

        return false
    }

    static isMultipartRequestBody(jsonMethod) { // OPENAPI
        if (!_.isEmpty(jsonMethod.consumes)
            && jsonMethod.consumes.includes("multipart/form-data")) {
            return true
        }

        return false
    }
}

export default SwaggerHelper
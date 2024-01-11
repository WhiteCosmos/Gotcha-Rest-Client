import _
    from 'lodash'

function getServiceSummary(jsonService) {
    if (jsonService.isJavaService) {
        return jsonService.serviceName
    }

    if (jsonService.isHttpService) {
        return _.isEmpty(jsonService.summary) ? jsonService.serviceName : jsonService.summary
    }
}

function getServiceSubtitle(jsonService) {
    if (jsonService.isJavaService) {

    }

    if (jsonService.isHttpService) {
        return jsonService.basePath
    }
}

function getServiceApiRequestPath(jsonService) {
    return undefined
}

function getServiceApiDescription(jsonService) {

}

function getApiSummary(jsonMethod) {
    return jsonMethod.summary || jsonMethod.methodName
}

function getApiDescription(jsonMethod) {
    return jsonMethod.description
}

function getApiTags(jsonMethod) {
    return []
}

function getApiRequestBasePath(jsonMethod) {
    return ""
}

function getOperationId(jsonService, jsonMethod) { // 为HttpOperation生成唯一OperationId
    if (!_.isEmpty(jsonMethod.operationId)) {
        return jsonMethod.operationId
    }

    let serviceQualifiedName = jsonService.serviceQualifiedName

    if (_.isEmpty(serviceQualifiedName)) {
        serviceQualifiedName = jsonService.serviceName
    }

    let methodName = jsonMethod.methodName

    let overrideMethods = jsonService.methods.filter((jsonMethod) => {
        return jsonMethod.methodName === methodName
    })

    if (_.isEmpty(overrideMethods) || overrideMethods.length === 1) {
        return serviceQualifiedName + "." + methodName
    } else {
        return serviceQualifiedName + "." + methodName + "." + overrideMethods.indexOf(jsonMethod)
    }
}

function getApiRequestPath(jsonMethod) {
    if (isJavaInterface(jsonMethod)) { // Java Interface 没有请求路径
        return undefined
    }

    // let springRestfulMethod = jsonMethod.springRestfulMethod
    //
    // let jaxRSMethod = jsonMethod.jaxRSMethod
    //
    // let swaggerV2Method = jsonMethod.swaggerV2Method
    //
    // if (springRestfulMethod) {
    //     if (!_.isEmpty(springRestfulMethod.paths)) {
    //         return springRestfulMethod.paths[0]
    //     }
    // }
    //
    // if (jaxRSMethod) {
    //     if (!_.isEmpty(jaxRSMethod.path)) {
    //         return jaxRSMethod.path
    //     }
    // }
    //
    // if (swaggerV2Method) {
    //     let apiOperation = swaggerV2Method.apiOperation
    //
    //     // ApiOperation 以 / 为开头也算作路径
    //     if (apiOperation && !_.isEmpty(apiOperation.value) && apiOperation.value.startsWith("/")) {
    //         return apiOperation.value
    //     }
    // }

    return "/undefined"
}

function getApiRequestFullPath(jsonMethod) {
    let springRestfulMethod = jsonMethod.springRestfulMethod

    let jaxRSMethod = jsonMethod.jaxRSMethod

    let swaggerV2Method = jsonMethod.swaggerV2Method

    return "/undefined"
}

function getApiRequestMethod(jsonMethod) {
    if (isJavaInterface(jsonMethod)) { // Java Interface 没有请求方法
        return undefined
    }

    // let springRestfulMethod = jsonMethod.springRestfulMethod
    //
    // let jaxRSMethod = jsonMethod.jaxRSMethod
    //
    // let swaggerV2Method = jsonMethod.swaggerV2Method
    //
    // if (springRestfulMethod) {
    //     if (!_.isEmpty(springRestfulMethod.requestMethods)) {
    //         return springRestfulMethod.requestMethods[0]
    //     }
    // }
    //
    // if (jaxRSMethod) {
    //     if (!_.isEmpty(jaxRSMethod.requestMethods)) {
    //         return jaxRSMethod.requestMethods[0]
    //     }
    // }
    //
    // if (swaggerV2Method) {
    //     let apiOperation = swaggerV2Method.apiOperation
    //
    //     if (apiOperation && !_.isEmpty(apiOperation.httpMethod)) {
    //         return apiOperation.httpMethod
    //     }
    // }

    return "GET"
}

function getApiConsumes(jsonMethod) {
    let swaggerV2Method = jsonMethod.swaggerV2Method

    return []

}

function getApiProduces(jsonMethod) {
    let swaggerV2Method = jsonMethod.swaggerV2Method

    return []
}

function getJavaMethodName(jsonMethod) {
    return jsonMethod.serviceName + "." + jsonMethod.methodName
}

function getApiResponses(jsonMethod) {
    // TODO 没有特别指定的固定为200

    // TODO 其它以Swagger注解为准
    return []
}

function getApiHeaders(jsonMethod) {
    if (isJavaInterface(jsonMethod)) {
        return []
    }

    let headers = []


    return headers
}

function getApiCookies(jsonMethod) {
    if (isJavaInterface(jsonMethod)) {
        return []
    }

    let cookies = []


    return cookies
}

function isJavaInterface(jsonMethod) {
    return jsonMethod && jsonMethod.serviceType === "INTERFACE"
}

function isRestfulService(jsonMethod) {
    return jsonMethod && ["SPRING-MVC", "JAX-RS"].includes(jsonMethod.serviceType)
}

function getApiExceptions(jsonMethod) {

}

/**
 * 获取响应状态码，仅支持 swagger 和 openapi
 */
function getResponseCodes(jsonMethod) {

}

/**
 * 获取响应头部信息，仅支持 swagger 和 openapi
 */
function getResponseHeaders(jsonMethod) {

}


export default {
    getServiceSummary: getServiceSummary,
    getServiceApiRequestPath,
    getServiceApiDescription,

    getApiSummary,
    getApiDescription,

    getApiTags,
    getApiRequestPath,
    getApiRequestMethod,

    getApiConsumes,
    getApiProduces,

    getJavaMethodName,

    getApiHeaders,
    getApiCookies,

    getResponseCodes,
    getResponseHeaders,

    getOperationId: getOperationId
}


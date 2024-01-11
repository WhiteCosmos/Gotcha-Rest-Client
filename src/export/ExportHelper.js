import _
    from 'lodash'

export default {
    isUnchecked(checkedStatus) {
        return checkedStatus && checkedStatus === "UNCHECKED"
    },

    isEmpty(value) {
        return _.isEmpty(value)
    },

    getServiceTitle(jsonService) {
        if (jsonService.isHttpService) {
            return jsonService.summary || jsonService.serviceName
        }

        if (jsonService.isJavaService) {
            return jsonService.serviceName
        }
    },

    getServiceSubtitle(jsonService) {
        if (jsonService.isHttpService) {
            return jsonService.serviceName
        }

        if (jsonService.isJavaService) {
            return jsonService.summary || "/"
        }
    },

    getMethodTitle(jsonMethod) {
        if (jsonMethod.isHttpService) {
            return jsonMethod.summary || jsonMethod.methodName
        }

        if (jsonMethod.isJavaService) {
            return jsonMethod.methodName
        }
    },

    getMethodSubtitle(jsonMethod) {
        if (jsonMethod.isHttpService) {
            return jsonMethod.description || "/"
        }

        if (jsonMethod.isJavaService) {
            return jsonMethod.summary || "/"
        }
    },

    getMethodDescription(jsonMethod) {

    }
}
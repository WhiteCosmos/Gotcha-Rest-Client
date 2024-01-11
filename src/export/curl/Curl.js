import _
    from 'lodash'

export default {
    // server

    // headers

    // cookies

    // path

    // path params

    // query params

    // body

    requestUrl(jsonMethod) {
        let url = "https://example.org"

        url += jsonMethod.fullRequestPath

        if (!_.isEmpty(jsonMethod.parameters)) {
            url += "?"

            jsonMethod.parameters.forEach((p, idx) => {
                if (p.parameterType === "query") {
                    url += `${p.fieldName}=`

                    url += (idx === jsonMethod.parameters.length - 1) ? "&" : ""
                }
            })
        }

        return url
    },

    requestMethod(jsonMethod) {
        return " -X " + jsonMethod.requestMethod + "\\" + "\n"
    },

    requestHeaders(jsonMethod) {
        if (_.isEmpty(jsonMethod.headers)) {
            return ""
        }

        let headers = ""

        jsonMethod.headers.forEach(header => {
            headers += ` -H \"${header.fieldName}=\" \\ \n`
        })

        return headers
    },

    requestBody(jsonMethod) {

    },
}
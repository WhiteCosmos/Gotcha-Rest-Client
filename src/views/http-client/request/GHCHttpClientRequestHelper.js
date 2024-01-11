/**
 * @created_at 2022/8/21
 * @app_version 1.5.0
 */
class GHCHttpClientRequestHelper {
    constructor() {

    }

    static getHeaders(httpRequest) {
        if (!httpRequest) {
            return []
        }

        return httpRequest.headers
    }

    static getPathParameters(httpRequest) {
        if (!httpRequest) {
            return []
        }

        let params = []

        params = httpRequest.pathParameters.filter(it => {
            return it.requiredStatus === 'CHECKED'
        })

        return params
    }

    static getQueryParameters(httpRequest) {
        if (!httpRequest) {
            return []
        }

        return httpRequest.queryParameters
    }
}

export default GHCHttpClientRequestHelper
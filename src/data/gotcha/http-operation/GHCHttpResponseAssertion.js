/**
 * @created_at 2022/1/17
 * @app_version 1.4.0
 */
class GHCHttpResponseAssertion {
    constructor() {
        this.statusCode = undefined

        this.statusText = undefined

        this.headers = []

        this.jsonPaths = []
    }
}

export default GHCHttpResponseAssertion
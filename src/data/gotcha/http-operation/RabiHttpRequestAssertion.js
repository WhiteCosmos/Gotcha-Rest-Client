/**
 * @created_at 2022/1/17
 * @app_version 1.4.0
 */
class RabiHttpRequestAssertion {
    constructor() {
        this.enable = true

        this.headers = []

        this.jsonPaths = []

        this.text = {
            mode: "regexp",

            text: "",
        }
    }
}

export default RabiHttpRequestAssertion
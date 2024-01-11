/**
 * @created_at 2022/1/17
 * @app_version 1.4.0
 */
class GHCKeyValueAssertionResult {
    constructor() {
        this.key = ''

        this.value = ''

        this.condition = '=='

        this.pass = true

        this.mode = 'kv' // kv | jsonpath

        this.errorMessage = ''
    }
}

export default GHCKeyValueAssertionResult
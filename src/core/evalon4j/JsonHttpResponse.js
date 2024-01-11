/**
 *  Http Response Payload From Evalon4J
 * @since 1.3.6
 */
class JsonHttpResponse {
    constructor() {
        this.statusCode = 200

        this.statusText = 'OK'

        this.description = ''

        this.produces = []

        /**
         * Headers & Cookies
         *
         * @type {JsonStruct[]}
         */
        this.headers = []

        this.payloads = []
    }
}

export default JsonHttpResponse
class JsonHttpRequest {
    constructor(props) {
        !props && (props = {})

        /**
         * @type {string}
         */
        this.requestMethod = ""

        /**
         * @type {string}
         */
        this.requestPath = ""

        /**
         * @type {JsonHttpRequestUrl[]}
         */
        this.requestUrls = props.requestUrls

        /**
         * @type {JsonStruct[]}
         */
        this.headers = props.headers

        /**
         * @type {JsonStruct[]}
         */
        this.urlParams = props.urlParams

        /**
         * @type {string[]}
         */
        this.consumes = props.consumes

        /**
         * @type {JsonHttpPayload[]}
         */
        this.payloads = props.payloads
    }
}

export default JsonHttpRequest
class RabiHttpResponse {
    constructor() {
        this.requestMethod = ""

        this.requestUrl = ""

        this.totalTiming = 0

        this.statusCode = 200

        this.statusText = 'OK'

        /**
         * Response summary like IP and timing
         *
         * @type {RabiHttpResponseSummary}
         */
        this.summary = undefined

        /**
         * Redirect URLs
         *
         * @type {string[]}
         */
        this.redirectUrls = []

        /**
         * @type {*}
         */
        this.headers = {}

        /**
         *
         * @type {RabiHttpResponsePayload}
         */
        this.payload = undefined

        /**
         * @type {GHCHttpResponseAssertion}
         */
        this.assertion = undefined
    }
}

export default RabiHttpResponse
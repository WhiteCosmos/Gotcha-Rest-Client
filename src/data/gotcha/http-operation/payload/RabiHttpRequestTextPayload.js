class RabiHttpRequestTextPayload {
    constructor() {
        /**
         * @type {string}
         */
        this.contentType = 'application/json'

        /**
         * @type {string}
         */
        this.content = ''

        /**
         * Codemirror Mode -> text | json | xml | html
         *
         * @type {string}
         */
        this.mode = ''

        this.encoding = 'utf-8'

        this.lineBreak = "CRLF" // LF CRLF CR
    }

    static APPLICATION_JSON = "application/json"

    static APPLICATION_XML = "application/xml"

    static TEXT_PLAIN = "text/plain"

    static TEXT_HTML = "text/html"
}

export default RabiHttpRequestTextPayload
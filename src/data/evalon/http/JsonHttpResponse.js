class JsonHttpResponse {
    constructor(props) {
        !props && (props = {})

        this.statusCode = props.statusCode

        this.statusText = props.statusText

        this.summary = props.summary

        this.description = props.description

        this.produces = props.produces

        /**
         * @type {JsonStruct[]}
         */
        this.headers = props.headers

        /**
         * @type {JsonHttpPayload[]}
         */
        this.payloads = props.payloads
    }
}

export default JsonHttpResponse
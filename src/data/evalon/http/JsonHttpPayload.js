class JsonHttpPayload {
    constructor(props) {
        !props && (props = {})

        this.contentType = props.contentType

        /**
         * @type {JsonStruct[]}
         */
        this.content = props.content

        /**
         * @type {JsonHttpPayloadExample[]}
         */
        this.examples = props.examples
    }
}

export default JsonHttpPayload
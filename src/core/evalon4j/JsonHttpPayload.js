class JsonHttpPayload {
    constructor() {
        this.contentType = ""

        this.contentTypes = []

        this.content = [] // List<JsonStruct>

        this.examples = [] // List<JsonHttpPayloadExample>
    }
}

export default JsonHttpPayload
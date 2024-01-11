class RabiHttpResponsePayload {
    constructor() {
        this.extension = ""

        this.contentType = "" // application/json application/xml text/html ...

        this.body = undefined

        this.rawBody = undefined // Buffer

        this.rawSize = undefined
    }
}

export default RabiHttpResponsePayload
class RabiHttpError {
    constructor() {
        this.code = undefined // RequestError

        this.message = "" // error.toString()

        this.requestMethod = ""

        this.requestUrl = ""
    }
}

export default RabiHttpError
class Evalon4JParseResult {
    constructor() {
        this.hasError = false

        this.operation = "IMPORT" // IMPORT | REFRESH

        this.errorCode = ""

        this.errorMessage = ""

        this.errorTraces = []

        this.data = undefined
    }

    static EXECUTE_EVALON4J_ERROR() {
        let result = new Evalon4JParseResult()

        result.hasError = true

        result.errorCode = "PATH_NOT_FOUND"

        result.errorMessage = "File or directory not exists"

        return result
    }

    static RESOLVE_EVALON4J_ERROR() {
        let result = new Evalon4JParseResult()

        result.hasError = true

        result.errorCode = "PATH_NOT_FOUND"

        result.errorMessage = "File or directory not exists"

        return result
    }

    static NETWORK_ERROR(error) {
        let result = new Evalon4JParseResult()

        result.hasError = true

        result.errorCode = "NETWORK_ERROR"

        result.errorMessage = error.toString()

        return result
    }
}

export default Evalon4JParseResult
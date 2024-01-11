class RabiHttpOperationHistory {
    constructor() {
        this.createdAt = new Date()

        this.status = "" // NONE SUCCESS FAILED

        this.httpRequest = undefined

        this.httpResponse = undefined
    }
}

export default RabiHttpOperationHistory
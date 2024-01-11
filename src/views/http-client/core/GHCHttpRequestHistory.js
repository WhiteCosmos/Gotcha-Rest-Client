import _
    from 'lodash'

class GHCHttpRequestHistory {
    /**
     * @param {GHCHttpOperation} httpOperation
     */
    constructor(httpOperation) {
        let httpRequest = httpOperation.httpRequest

        this._removeOriginalRequest(httpRequest)

        let httpResponse = httpOperation.httpResponse

        let httpError = httpOperation.httpError

        this.createdAt = new Date()

        this.httpRequest = _.cloneDeep(httpRequest)

        if (httpResponse) {
            this.httpResponse = _.cloneDeep(httpResponse)
        } else {
            this.httpResponse = undefined
        }

        if (httpError) {
            this.httpError = _.cloneDeep(httpError)
        } else {
            this.httpError = undefined
        }
    }

    _removeOriginalRequest(httpRequest) {
        httpRequest.originalRequest = undefined
    }
}

export default GHCHttpRequestHistory
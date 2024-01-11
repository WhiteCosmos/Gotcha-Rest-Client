class RabiHttpResponseSummary {
    constructor() {
        // Raw

        this.rawRequestMessage = ''

        this.rawResponseMessage = ''

        // Request

        this.requestMethod = ""

        this.requestUrl = ""

        this.date = ""

        this.localIP = ""

        this.remoteIP = ""

        this.proxy = ""

        // Response

        this.statusCode = ""

        this.statusText = ""

        this.responseBodyEncoding = ""

        this.responseBodySize = ""

        this.responseBodyType = ""

        // Timing

        this.timing = {
            wait: 0, // Connection Start

            dns: 0, // DNS Lookup

            tcp: 0, // ignore

            tls: 0, // TLS Handshake

            request: 0, // Request Sent

            firstByte: 0, // Waiting (TTFB)

            download: 0, // Content Download

            total: 0,
        }
    }
}

export default RabiHttpResponseSummary
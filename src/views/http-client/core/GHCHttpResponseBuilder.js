import sizeof
    from 'object-sizeof'
import RabiHttpResponseSummary
    from '@/data/gotcha/http-operation/RabiHttpResponseSummary'
import GHCHttpResponse
    from '@/data/gotcha/http-operation/RabiHttpResponse'
import RabiHttpResponsePayload
    from '@/data/gotcha/http-operation/RabiHttpResponsePayload'
import mime
    from 'mime'
import RabiHttpError
    from '@/data/gotcha/http-operation/RabiHttpError'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'

export default {
    buildHttpErrorFromResponseError(error) {
        let httpError = new RabiHttpError()

        httpError.code = error.code

        httpError.message = error.toString()

        let options = error.options

        if (options) {
            httpError.requestUrl = options.url
        } else {
            httpError.requestUrl = '/'
        }

        return httpError
    },

    buildHttpResponseFromResponseStream(response, jsonp) {
        let httpResponse = this.buildHttpResponse(response)

        httpResponse.summary = this.buildHttpResponseSummary(response)

        httpResponse.headers = response.headers

        httpResponse.payload = this.buildHttpResponsePayload(response, jsonp)

        return httpResponse
    },

    buildHttpResponse(response) {
        let httpResponse = new GHCHttpResponse()

        let options = response.request.options

        httpResponse.requestMethod = options.method

        httpResponse.requestUrl = response.requestUrl

        httpResponse.redirectUrls = response.redirectUrls

        httpResponse.totalTiming = response.timings.phases.total

        httpResponse.statusCode = response.statusCode

        httpResponse.statusText = response.statusMessage

        return httpResponse
    },

    buildHttpResponseAssertion(httpRequest, httpResponse) {

    },

    buildHttpResponseSummary(response) {
        let summary = new RabiHttpResponseSummary()

        let options = response.request.options

        summary.requestMethod = options.method

        summary.requestUrl = response.requestUrl

        summary.requestHost = new GHCHttpClientUrlHelper().getHostFromUrlStr(summary.requestUrl)

        summary.date = new Date().toLocaleString()

        summary.statusCode = response.statusCode

        summary.statusText = response.statusMessage

        // summary.rawRequest = response.req._header.trim()

        summary.rawRequestMessage = this._getRawRequestMessage(response)

        summary.rawResponseMessage = this._getRawResponseMessage(response)

        summary.responseBodySize = this._calculateResponseBodySize(response.rawBody)

        summary.responseBodyType = this.readContentTypeFromHeaders(response.headers)

        summary.responseBodyEncoding = this.readContentEncodingFromHeaders(response.headers)

        summary.remoteIP = response.ip

        // let ip = require('internal-ip')
        //
        // ip.v4().then(ip => {
        //     summary.localIP = ip
        // })

        if (options.agent && options.agent.http) {
            summary.proxy = options.agent.http.proxy.host
        } else {
            summary.proxy = 'No Proxy'
        }

        let timings = response.timings

        summary.timing = timings.phases

        return summary
    },

    _getRawRequestMessage(response) {
        let partA = response.req._header.trim()

        let symbols = Object.getOwnPropertySymbols(response.request) // 仏了

        let bodySymbol = symbols.find(it => {
            return it.toString() === 'Symbol(body)'
        })

        let partB = response.request[bodySymbol] || ''

        return partA + '\n\n' + partB // Multipart/form-data 无法读取
    },

    _getRawResponseMessage(response) {
        let protocol = `HTTP/1.1 ${response.statusCode} ${response.statusMessage}`

        protocol += "\n"

        let headers = ""

        for (let key in response.headers) {
            headers += `${key}: ${response.headers[key]}\r\n`
        }

        headers += "\n\n"

        let body = response.body

        return protocol + headers + body
    },

    _calculateResponseBodySize(body) {
        if (!body) {
            return '0 B'
        }

        let size = sizeof(body)

        if (size < 1024) { // Bytes
            return `${size} B`
        } else if (size < (1024 * 1000)) { // KB
            let kiloBytes = (size / 1000).toFixed(1)
            return `${kiloBytes} KB`
        } else { // MB
            let megaBytes = (size / 1000 / 1000).toFixed(2)
            return `${megaBytes} MB`
        }
    },

    buildHttpResponsePayload(response, jsonp) {
        if (!response.rawBody || response.rawBody.length === 0) {
            return undefined
        }

        let payload = new RabiHttpResponsePayload()

        let contentType = this.readContentTypeFromHeaders(response.headers)

        payload.extension = mime.getExtension(contentType) || 'text'

        payload.contentType = contentType

        payload.rawBody = response.rawBody

        payload.rawSize = response.rawBody.length

        /*
        TODO 1.4.x 渲染类型选择功能

        1. 支持添加自定义Mime类型并指定渲染方式，例如application/example+json渲染为JSON

        并非在这个位置
         */

        try {
            if (payload.contentType.startsWith('image')) {
                payload.body = response.rawBody.toString('base64')
            } else if (this.checkIsJsonResponse(contentType)) {
                if (jsonp && this.checkIsJsonpResponse(jsonp.callback, response.body)) {
                    window[jsonp.callback] = (data) => {
                        payload.body = JSON.stringify(data, null, 4)
                    }

                    eval(response.body)

                    delete window[jsonp.callback]
                } else {
                    payload.body = response.rawBody.toString('UTF-8')
                }
            } else if (payload.extension === 'html' || payload.extension === 'xml') { // TODO 1.4.x 判断条件修改
                payload.body = response.rawBody.toString('utf8')

                return payload
            } else if (payload.contentType.startsWith('text')) {
                payload.body = response.rawBody.toString('UTF-8')
            } else {
                payload.body = response.rawBody.toString('UTF-8') // TODO !!! 可选择编码类型
            }
        } catch (e) {
            console.error('Parse Response Payload Failed', e)
        }

        return payload
    },

    readContentTypeFromHeaders(headers) {
        if (headers['content-type']) {
            return headers['content-type']
        }

        return "/"
    },

    readContentEncodingFromHeaders(headers) {
        if (headers['content-encoding']) {
            return headers['content-encoding']
        }

        return "/"
    },

    checkIsJsonpResponse(callback, body) {
        let regexp = new RegExp(`${callback}\(.*\)`)

        return body.match(regexp)
    },

    checkIsJsonResponse(contentType) {
        return contentType &&
            (contentType.match(/application\/.*\+?json;?/) ||
                (contentType.match(/application\/.*\+?javascript;?/)))

    },

    checkIsHtmlResponse(contentType) {
        return contentType && contentType.match(/application\/.*\+?html;?/)
    },

    checkIsXmlResponse(contentType) {
        return contentType && contentType.match(/application\/.*\+?xml;?/)
    },
}
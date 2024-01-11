import _
    from 'lodash'
import EvCheckedStatusHelper
    from '@/mixins/EvCheckedStatusHelper'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import GHCJsonNodeBuilder
    from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
import {
    EvHttpClientEventBus,
    EvHttpClientEvents
} from '@/views/http-client/EvHttpClientEventBus'
import tough, {
    Cookie,
    CookieJar
} from 'tough-cookie'
import {
    HttpProxyAgent,
    HttpsProxyAgent
} from 'hpagent'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import GHCJson
    from '@/core/json/GHCJson'

const session = require('electron').remote.getCurrentWindow().webContents.session

class GHCHttpRequestSender {
    /**
     * @param {GHCHttpRequest} httpRequest
     * @param {GHCCookieJar} cookieJar
     * @param {GHCDynamicVariableRender} dynamicVariableRender
     */
    constructor(httpRequest,
                cookieJar,
                dynamicVariableRender) {
        this.httpRequest = httpRequest

        this.cookieJar = cookieJar

        this.dynamicVariableRender = dynamicVariableRender
    }

    sendHttpRequest() {
        this.dynamicVariableRender.setHttpRequest(this.httpRequest)

        const got = require('got')

        this._buildGotOptions(this.httpRequest).then(options => {
            let request = got(options)

            this.httpRequest.originalRequest = request

            EvHttpClientEventBus.$emit(EvHttpClientEvents.SEND_REQUEST, this.httpRequest)

            console.log("EvHttpClientEvents.SEND_REQUEST")

            request.then(response => {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.SEND_REQUEST_SUCCESS, this.httpRequest, response)
            }).catch(error => {
                if (error.isCanceled) {
                    return
                }

                console.error('Send Http Request Failed', error)

                EvHttpClientEventBus.$emit(EvHttpClientEvents.SEND_REQUEST_FAILED, this.httpRequest, error)
            })
        })
    }

    /**
     * @param {GHCHttpRequest} httpRequest
     * @private
     */
    async _buildGotOptions(httpRequest) {
        let options = {}

        await this._buildRequestSettings(options, httpRequest)

        options.allowGetBody = true

        options.method = httpRequest.requestMethod

        options.url = this._buildRequestUrl(httpRequest)

        options.headers = this._buildRequestHeaders(httpRequest)

        options.cookieJar = this._buildRequestCookies(httpRequest)

        this._buildRequestAuthentication(options, httpRequest)

        options.body = this._buildRequestPayload(httpRequest)

        options.https = { // TODO Advanced SSL Settings
            rejectUnauthorized: false // ??? 为什么需要这个
        }

        return options
    }

    _buildRequestAuthentication(options, httpRequest) {
        let authorization = httpRequest.authorization

        if (authorization.type === 'basic') {
            let basicAuth = authorization.basic

            options.username = basicAuth.username

            options.password = basicAuth.password
        }

        if (authorization.type === 'bearer') {
            let bearer = authorization.bearer

            let prefix = bearer.prefix ? bearer.prefix : 'Bearer'

            options.headers['Authorization'] = `${prefix} ${bearer.token}`
        }

        // TODO 剩下的类型
    }

    async _buildRequestSettings(options, httpRequest) {
        try {
            let settings = httpRequest.settings

            let timeout = settings.timeout

            if (timeout.enable && timeout.value > 0) {
                options.timeout = {
                    response: timeout.value * 1000
                }
            }

            options.followRedirect = settings.followRedirects

            if (settings.followRedirects) {
                let maximumRedirects = settings.maximumRedirects

                if (maximumRedirects.enable && Number.parseInt(maximumRedirects.value) > 0) {
                    options.maxRedirects = Number.parseInt(maximumRedirects.value)
                }

                if (settings.redirectOriginalMethod) {
                    options.methodRewriting = true
                }
            }

            if (settings.proxy === "SYSTEM") {
                await this._buildHttpRequestAgent(options)
            } else {
                options.agent = {
                    http: undefined,
                    https: undefined
                }
            }
        } catch (e) {
            console.error('Read request settings error', e)
        }
    }

    /**
     * @param {GHCHttpRequest} httpRequest
     */
    _buildRequestUrl(httpRequest) {
        let helper = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender)

        return helper.buildUrlStrFromRequestUrl({
            appendDefaultHost: true
        })
    }

    /**
     * @param {GHCHttpRequest} httpRequest
     * @private
     */
    _buildRequestHeaders(httpRequest) {
        let headers = {}

        if (_.isEmpty(httpRequest.headers) &&
            _.isEmpty(httpRequest.cookies)) {
            return headers
        }

        httpRequest.headers.forEach(item => {
            if (!EvCheckedStatusHelper.isItemChecked(item)) {
                return
            }

            if (_.isEmpty(item.key)) {
                return
            }

            headers[item.key] = this.dynamicVariableRender.render(item.value)
        })

        return headers
    }

    _buildRequestCookies(httpRequest) {
        let toughCookieJar = new CookieJar()

        let settings = httpRequest.settings

        if (!settings.sendCookies) {
            return toughCookieJar
        }

        let requestUrl = httpRequest.requestUrl

        let host = this.dynamicVariableRender.render(requestUrl.host)

        let matchedCookies = []

        let matchedDomains = this.cookieJar.domains.filter(domain => {
            return tough.domainMatch(host, domain.name, true)
        })

        matchedDomains.forEach(domain => {
            matchedCookies.push(...domain.cookies)
        })

        if (_.isEmpty(matchedCookies)) {
            return toughCookieJar
        }

        let url = requestUrl.scheme + "://" + host

        matchedCookies.forEach(matchedCookie => {
            try {
                if (matchedCookie.checkedStatus === "UNCHECKED") {
                    return
                }

                if (_.isEmpty(matchedCookie.key)) {
                    return
                }

                matchedCookie.creation = new Date(matchedCookie.creation)

                matchedCookie.expires = new Date(matchedCookie.expires)

                let cookie = new Cookie(matchedCookie)

                cookie.value = encodeURI(this.dynamicVariableRender.render(cookie.value))

                toughCookieJar.setCookieSync(cookie, url)
            } catch (e) {
                console.error('Set Cookie Failed', e)
            }
        })

        return toughCookieJar
    }

    /**
     * @param {GHCHttpRequest} httpRequest
     * @private
     */
    _buildRequestPayload(httpRequest) {
        let payload = httpRequest.payload

        if (payload.type === GHCHttpRequestPayloadType.NONE) {
            return undefined
        }

        if (payload.type === GHCHttpRequestPayloadType.TEXT) {
            return this._buildRequestTextPayload(httpRequest)
        }

        if (payload.type === GHCHttpRequestPayloadType.JSON) {
            return this._buildRequestJsonPayload(httpRequest)
        }

        if (payload.type === GHCHttpRequestPayloadType.FORM) {
            return this._buildRequestFormPayload(httpRequest)
        }

        if (payload.type === GHCHttpRequestPayloadType.MULTIPART) {
            return this._buildRequestMultipartPayload(httpRequest)
        }

        if (payload.type === GHCHttpRequestPayloadType.FILE) {
            return this._buildRequestBinaryPayload(httpRequest)
        }

        if (payload.type === GHCHttpRequestPayloadType.GRAPHQL) {
            return this._buildRequestGraphqlPayload(httpRequest)
        }
    }

    /**
     * @param {GHCHttpRequest} httpRequest
     */
    _buildRequestTextPayload(httpRequest) {
        let text = httpRequest.payload.text

        return this.dynamicVariableRender.render(text.content)
    }

    /**
     * @param {GHCHttpRequest} httpRequest
     */
    _buildRequestJsonPayload(httpRequest) {
        let json = httpRequest.payload.json

        // return JSON.stringify(new GHCJsonNodeBuilder(this.dynamicVariableRender).buildJsonFromJsonNode(json.root), (key, value) => {
        //     if (value === undefined) {
        //         return null
        //     }
        //
        //     if (typeof value === 'bigint') {
        //         return "\'311893230188761088\'"
        //         // return value.toString()
        //     }
        //
        //     return value
        // })

        let obj = new GHCJsonNodeBuilder(this.dynamicVariableRender).buildJsonFromJsonNode(json.root)

        let jsonStr = GHCJson.stringify(obj, null, 4)

        console.log("jsonStr", jsonStr)

        return jsonStr
    }

    /**
     * application/x-www-form-urlencoded
     *
     * @param {GHCHttpRequest} httpRequest
     */
    _buildRequestFormPayload(httpRequest) {
        let form = httpRequest.payload.form

        let qs = require('query-string') // NodeJS 'querystring' module deprecated

        let data = {}

        form.items && form.items.forEach(item => {
            if (!EvCheckedStatusHelper.isItemChecked(item)) {
                return
            }

            if (_.isEmpty(item.key)) {
                return
            }

            if (data[item.key] instanceof Array) {
                data[item.key].push(item.value)
                return
            }

            if (data[item.key]) {
                data[item.key] = [data[item.key], item.value]
            } else {
                data[item.key] = this.dynamicVariableRender.render(item.value)
            }
        })

        return qs.stringify(data)
    }

    /**
     * @param {GHCHttpRequest} httpRequest
     */
    _buildRequestMultipartPayload(httpRequest) {
        let multipart = httpRequest.payload.multipart

        const FormData = require('form-data/lib/form_data')

        let form = new FormData()

        if (_.isEmpty(multipart.items)) {
            return form
        }

        multipart.items.forEach(item => {
            if (!EvCheckedStatusHelper.isItemChecked(item)) {
                return
            }

            if (_.isEmpty(item.key)) {
                return
            }

            if (item.dataType === 'text') {
                form.append(item.key, this.dynamicVariableRender.render(item.value))
            }

            if (item.dataType === 'file' && item.value) {
                let fs = require('fs')

                let {app} = require('electron').remote

                if (!_.isEmpty(item.bookmark)) {
                    try {
                        let stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(item.bookmark)

                        let buffer = fs.readFileSync(item.value.filePath)

                        stopAccessingSecurityScopedResource()

                        form.append(item.key, buffer, item.value.fileName)
                    } catch (err) {
                        console.error('Append Form Value Failed: ', err)
                    }
                } else {
                    let buffer = fs.readFileSync(item.value.filePath)

                    form.append(item.key, buffer, item.value.fileName)
                }
            }
        })

        return form
    }

    _buildRequestBinaryPayload(httpRequest) {
        let binary = httpRequest.payload.binary

        let fs = require('fs')

        if (binary.fileBookmark) {
            let {app} = require('electron').remote

            try {
                let stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(binary.fileBookmark)

                let stream = fs.createReadStream(binary.filePath)

                stopAccessingSecurityScopedResource()

                return stream
            } catch (err) {
                console.error('Create Read Stream Failed: ', err)
            }
        } else {
            return fs.createReadStream(binary.filePath)
        }
    }

    _buildRequestGraphqlPayload(httpRequest) {
        let payload = {}

        let graphql = httpRequest.payload.graphql

        payload.query = graphql.query

        graphql.operationName && (payload.operationName = graphql.operationName)

        payload.variables = new GHCJsonNodeBuilder(this.dynamicVariableRender).buildJsonFromJsonNode(graphql.variables)

        return JSON.stringify(payload)
    }

    async _buildHttpRequestAgent(options) {
        // resolve the proxy for a known URL. This could be the URL you expect to use or a known good url like google.com
        let proxyUrl = await session.resolveProxy('https://www.google.com')

        if (proxyUrl === 'DIRECT') {
            return
        }

        let splits = proxyUrl.split(' ')

        let httpProxyAgent = new HttpProxyAgent({
            keepAlive: false,
            keepAliveMsecs: 1000,
            maxSockets: 256,
            maxFreeSockets: 256,
            scheduling: 'lifo',
            proxy: 'http://' + splits[1]
        })

        let httpsProxyAgent = new HttpsProxyAgent({
            keepAlive: false,
            keepAliveMsecs: 1000,
            maxSockets: 256,
            maxFreeSockets: 256,
            scheduling: 'lifo',
            proxy: 'http://' + splits[1]
        })

        options.agent = {
            http: httpProxyAgent,
            https: httpsProxyAgent
        }
    }
}

export default GHCHttpRequestSender
import EvCheckedStatusHelper
    from '@/mixins/EvCheckedStatusHelper'
import GHCHttpClientUrlHelper
    from '@/views/http-client/core/GHCHttpClientUrlHelper'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import GHCJsonNodeBuilder
    from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
import _
    from 'lodash'
import tough, {
    Cookie,
    CookieJar
} from 'tough-cookie'

class GHCHttpClientCURLBuilder {
    constructor(cookieJar, dynamicVariableRender) {
        this.cookieJar = cookieJar

        this.dynamicVariableRender = dynamicVariableRender

        this.jsonBuilder = new GHCJsonNodeBuilder(dynamicVariableRender)
    }

    build(httpRequest) {
        this.dynamicVariableRender.setHttpRequest(httpRequest)

        let cUrl = ""

        cUrl += this._buildRequestUrl(httpRequest)

        cUrl += this._buildRequestHeaders(httpRequest)

        cUrl += this._buildRequestCookies(httpRequest)

        cUrl += this._buildRequestPayload(httpRequest)

        cUrl += '     --compressed'

        return cUrl
    }

    _buildRequestUrl(httpRequest) {
        let requestMethod = httpRequest.requestMethod

        let requestUrl = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender).buildUrlStrFromRequestUrl({
            urlEncode: true
        })

        return `curl -X${requestMethod} \'${requestUrl}\' \\\n`
    }

    _buildRequestCookies(httpRequest) {
        let toughCookieJar = new CookieJar()

        let settings = httpRequest.settings

        if (!settings.sendCookies) {
            return ''
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
            return ''
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

        let cookieStr = toughCookieJar.getCookieStringSync(url)

        return `     -b \'${cookieStr}\' \\\n`
    }

    _buildRequestHeaders(httpRequest) {
        let str = ""

        let headers = httpRequest.headers

        headers.forEach(header => {
            if (EvCheckedStatusHelper.isItemUnchecked(header)) {
                return
            }

            str += `     -H \'${header.key}: ${this.dynamicVariableRender.render(header.value)}\' \\\n`
        })

        return str
    }

    _buildRequestPayload(httpRequest) {
        let str = ""

        let payload = httpRequest.payload

        if (payload.type === GHCHttpRequestPayloadType.NONE) {
            return str
        }

        if (payload.type === GHCHttpRequestPayloadType.TEXT) {
            str = `     -d \'${payload.text.content}\' \\\n`
        }

        if (payload.type === GHCHttpRequestPayloadType.JSON) {
            let json = httpRequest.payload.json

            let jsonStr = JSON.stringify(this.jsonBuilder.buildJsonFromJsonNode(json.root), (key, value) => {
                return value === undefined ? null : value
            })

            str = `     -d \'${jsonStr}\' \\\n`
        }

        if (payload.type === GHCHttpRequestPayloadType.FORM) {
            let form = httpRequest.payload.form

            let qs = require('query-string') // NodeJS 'querystring' module deprecated

            let data = {}

            form.items && form.items.forEach(item => {
                if (EvCheckedStatusHelper.isItemUnchecked(item)) {
                    return
                }

                if (_.isEmpty(item.key)) {
                    return
                }

                if (data[item.key] instanceof Array) {
                    data[item.key].push(this.dynamicVariableRender.render(item.value))
                    return
                }

                if (data[item.key]) {
                    data[item.key] = [data[item.key], this.dynamicVariableRender.render(item.value)]
                } else {
                    data[item.key] = this.dynamicVariableRender.render(item.value)
                }
            })

            let formStr = qs.stringify(data)

            str = `     -d \'${formStr}\' \\\n`
        }

        if (payload.type === GHCHttpRequestPayloadType.MULTIPART) {
            let multipart = httpRequest.payload.multipart

            multipart.items && multipart.items.forEach(item => {
                if (EvCheckedStatusHelper.isItemUnchecked(item)) {
                    return
                }

                if (_.isEmpty(item.key)) {
                    return
                }

                if (item.dataType === 'text') {
                    str += `     -F \'${item.key}=${this.dynamicVariableRender.render(item.value)}\' \\\n`
                }

                if (item.dataType === 'file') {
                    let file = item.value

                    str += `     -F \'${item.key}=@\"${file.filePath}\"\' \\\n`
                }
            })
        }

        if (payload.type === GHCHttpRequestPayloadType.FILE) {
            let binary = httpRequest.payload.binary

            str += `     --data-binary @\"${binary.filePath}\" \\\n`
        }

        if (payload.type === GHCHttpRequestPayloadType.GRAPHQL) {
            let graphql = httpRequest.payload.graphql

            let payload = {}

            payload.query = graphql.query

            payload.variables = new GHCJsonNodeBuilder(this.dynamicVariableRender).buildJsonFromJsonNode(graphql.variables)

            let jsonStr = JSON.stringify(payload)

            str = `     -d \'${jsonStr}\' \\\n`
        }

        return str
    }
}

export default GHCHttpClientCURLBuilder
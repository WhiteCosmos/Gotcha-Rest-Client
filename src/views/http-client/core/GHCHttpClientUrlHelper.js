import {
    URL
} from 'url'
import _
    from 'lodash'
import EvCheckedStatusHelper
    from '@/mixins/EvCheckedStatusHelper'
import queryString
    from 'query-string'
import GHCQueryParametersConfig
    from '@/data/gotcha/http-operation/GHCQueryParametersConfig'
import GHCRequestParameterItem
    from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
import RabiHttpRequestUrl
    from '@/data/gotcha/http-operation/RabiHttpRequestUrl'
import parseUrl
    from 'parse-url'
import {
    v4
} from 'node-uuid'

class GHCHttpClientUrlHelper {
    constructor(httpRequest, dynamicVariableRender) {
        // if (!httpRequest) {
        //     console.error('httpRequest missing in GHCHttpClientUrlHelper')
        // }

        // if (!dynamicVariableRender) {
        //     console.error('dynamicVariableRender missing in GHCHttpClientUrlHelper')
        // }

        this.httpRequest = httpRequest

        this.dynamicVariableRender = dynamicVariableRender

        this.dynamicVariableRender && this.dynamicVariableRender.setHttpRequest(httpRequest)
    }

    getHostFromUrlStr(urlStr) {
        if (_.isEmpty(urlStr)) {
            return ''
        }

        try {
            const {URL} = require('url')

            let url = new URL(urlStr)

            return url.hostname
        } catch (e) {
            return ''
        }
    }

    buildBaseUrl(httpRequest) {
        let requestUrl = httpRequest.requestUrl

        if (!requestUrl.host) {
            return ''
        }

        let url = `${requestUrl.scheme}://${this._render(requestUrl.host)}`

        if (requestUrl.port) {
            let port = this._render(requestUrl.port)

            if (!['80', '443'].includes(port)) {
                url += ':' + port
            }
        }

        if (requestUrl.basePath) { // TODO 优化 basePath 斜杠逻辑，是否可以自动去除
            let basePath = this._render(requestUrl.basePath)

            if (basePath.startsWith("/")) {
                url += basePath
            } else {
                url += '/' + basePath
            }
        }

        return url
    }

    buildRequestUrlFromUrlStr(urlStr, previousUrlStr) {
        if (_.isEmpty(urlStr)) {
            this._clearHttpRequest(this.httpRequest)

            return
        }

        const parseUrl = require("parse-url")

        urlStr = this._appendHttpProtocol(urlStr)

        let parsedUrl = parseUrl(urlStr)

        if (previousUrlStr) {
            previousUrlStr = this._appendHttpProtocol(previousUrlStr)

            let previousParsedUrl = parseUrl(previousUrlStr)

            this._updateRequestUrl(parsedUrl, previousParsedUrl)

            this._updatePathParametersOptimized(parsedUrl)

            this._updateQueryParameters(parsedUrl, previousParsedUrl)
        } else {
            let requestUrl = this._buildRequestUrlFromUrl(parsedUrl)

            this.httpRequest.requestUrl = requestUrl

            this.httpRequest.pathParameters = this._buildPathParametersFromUrl(requestUrl, parsedUrl)

            this.httpRequest.queryParameters = this._buildQueryParametersFromUrl(parsedUrl)
        }
    }

    _updateRequestUrl(parsedUrl, previousParsedUrl) {
        let requestUrl = this.httpRequest.requestUrl

        if (parsedUrl.protocol !== previousParsedUrl.protocol) {
            requestUrl.scheme = parsedUrl.protocol
        }

        let server = this.dynamicVariableRender.getCurrentServer(this.httpRequest)

        if (server) {
            if (parsedUrl.resource !== previousParsedUrl.resource
                || parsedUrl.port !== previousParsedUrl.port) {
                this.httpRequest.serverId = undefined
            } else {
                return // Ignore
            }
        }

        if (parsedUrl.resource !== previousParsedUrl.resource) {
            requestUrl.host = parsedUrl.resource
        }

        if (parsedUrl.port !== previousParsedUrl.port) {
            if (parsedUrl.port) {
                requestUrl.port = parsedUrl.port
            } else {
                requestUrl.port = ''
            }
        }
    }

    _updatePathParametersOptimized(parsedUrl) {
        let requestUrl = this.httpRequest.requestUrl

        let newPathname = parsedUrl.pathname || ''

        let newSplits = newPathname.split('/').filter(it => {
            return !_.isEmpty(it)
        })

        if (requestUrl.basePath) {
            if (_.isEmpty(newSplits)) {
                requestUrl.basePath = ''
            } else {
                let sector = newSplits[0]

                let basePath = ''

                if (typeof requestUrl.basePath === 'object') {
                    basePath = this.dynamicVariableRender.render(requestUrl.basePath)
                } else {
                    basePath = requestUrl.basePath
                }

                if (sector === basePath) {
                    newSplits.shift() // Remove basePath
                } else {
                    requestUrl.basePath = '' // 因为无法区分删除还是修改
                }
            }
        }

        let pathParameters = this.httpRequest.pathParameters

        let uncheckedPathParameters = pathParameters.filter(it => {
            return it.checkedStatus === 'UNCHECKED'
        })

        let entries = []

        uncheckedPathParameters.forEach(upp => {
            let idx = pathParameters.indexOf(upp)

            entries.push({
                idx: idx,
                item: upp
            })
        })

        entries = _.sortBy(entries, 'idx')

        let checkedPathParameters = pathParameters.filter(it => {
            return it.checkedStatus === 'CHECKED'
        })

        for (let idx = 0; idx < newSplits.length; idx++) {
            let sector = newSplits[idx]

            if (idx > (checkedPathParameters.length - 1)) {
                let item = this._buildPathParameterFromSector(sector)

                checkedPathParameters.splice(idx, 0, item)
            } else {
                let parameter = checkedPathParameters.find(it => {
                    return it.latestValue === sector || it.value === sector
                })

                if (parameter) {
                    let clonedParameter = _.cloneDeep(parameter)

                    clonedParameter.uid = v4()

                    checkedPathParameters.splice(idx, 0, clonedParameter)
                } else {
                    let item = this._buildPathParameterFromSector(sector)

                    checkedPathParameters.splice(idx, 0, item)
                }
            }
        }

        checkedPathParameters = checkedPathParameters.slice(0, newSplits.length)

        entries.forEach(entry => {
            let idx = entry.idx

            if (idx > (checkedPathParameters.length - 1)) {
                checkedPathParameters.push(entry.item)
            } else {
                checkedPathParameters.splice(idx, 0, entry.item)
            }
        })

        this.httpRequest.pathParameters = checkedPathParameters
    }

    _buildPathParameterFromSector(sector) {
        let item = new GHCRequestParameterItem()

        if (this._checkIsPathParameter(sector)) {
            item.requiredStatus = 'CHECKED'

            item.key = this._extractPathParameter(sector)
        } else {
            item.requiredStatus = 'UNCHECKED'
        }

        item.value = sector

        return item
    }

    _updateQueryParameters(parsedUrl, previousParsedUrl) {
        if (!parsedUrl.search) {
            this.httpRequest.queryParameters = []

            return
        }

        let queryParameters = this.httpRequest.queryParameters

        let previousQuery = previousParsedUrl.query

        let query = parsedUrl.query

        let oldKeys = Object.keys(previousParsedUrl.query)

        let newKeys = Object.keys(parsedUrl.query)

        let removedKeys = _.difference(oldKeys, newKeys)

        let unmodifiedKeys = _.intersection(oldKeys, newKeys)

        let addedKeys = _.difference(newKeys, oldKeys)

        removedKeys.forEach(key => {
            let result = queryParameters.find(it => {
                return it.key === key
            })

            result && queryParameters.splice(queryParameters.indexOf(result), 1)
        })

        unmodifiedKeys.forEach(key => {
            let oldValue = previousQuery[key]

            let newValue = query[key]

            if (oldValue !== newValue) {
                let result = queryParameters.find(it => {
                    return it.key === key
                })

                result && (result.value = newValue) // TODO 处理数组
            }
        })

        addedKeys.forEach(key => {
            let value = query[key]

            let item = new GHCRequestParameterItem()

            if (value instanceof Array) {
                item.key = key

                item.dataType = 'array'

                for (const v of value) {
                    let child = new GHCRequestParameterItem()

                    child.value = v

                    item.children.push(child)
                }
            } else {
                item.key = key

                item.value = value
            }

            queryParameters.splice(newKeys.indexOf(key), 0, item)
        })
    }

    _clearHttpRequest(httpRequest) {
        let requestUrl = httpRequest.requestUrl

        requestUrl.scheme = 'http'

        requestUrl.host = ''

        requestUrl.port = ''

        requestUrl.basePath = ''

        httpRequest.pathParameters = []

        httpRequest.queryParameters = []
    }

    _appendHttpProtocol(urlStr) {
        urlStr = urlStr.trim()

        if (!urlStr.match(/https?:\/\//i)) {
            return 'http://' + urlStr
        } else {
            return urlStr
        }
    }

    _buildRequestUrlFromUrl(parsedUrl) {
        let requestUrl = new RabiHttpRequestUrl()

        if (parsedUrl.protocol) {
            requestUrl.scheme = parsedUrl.protocol
        } else {
            requestUrl.scheme = 'http'
        }

        if (parsedUrl.resource) {
            requestUrl.host = parsedUrl.resource
        }

        if (parsedUrl.port) {
            requestUrl.port = parsedUrl.port
        } else {
            requestUrl.port = ''
        }

        return requestUrl
    }

    _buildPathParametersFromUrl(requestUrl, url) {
        let basePath = requestUrl.basePath

        let pathname = url.pathname

        if (_.isEmpty(pathname)) {
            return []
        }

        let parameters = []

        let splits = pathname.split('/')

        splits.forEach(sector => {
            if (_.isEmpty(sector)) {
                return
            }

            if (sector === basePath) {
                return
            }

            let item = new GHCRequestParameterItem()

            if (sector.startsWith("::")) { // Postman 参数写法
                item.requiredStatus = 'CHECKED'

                item.key = sector.replaceAll(':', '')

                item.value = sector
            } else if (sector.match(/{.*}/)) { // Swagger 参数写法
                item.requiredStatus = 'CHECKED'

                item.key = sector.replaceAll('{', '').replaceAll('}', '')

                item.value = sector
            } else {
                item.requiredStatus = 'UNCHECKED'

                item.value = sector
            }

            parameters.push(item)
        })

        return parameters
    }

    _checkIsPathParameter(sector) {
        return sector && (sector.startsWith(":") || sector.match(/{.*}/))
    }

    _extractPathParameter(sector) {
        if (sector && sector.startsWith(":")) {
            return sector.replaceAll(':', '')
        }

        if (sector && sector.match(/{.*}/)) {
            return sector.replaceAll('{', '').replaceAll('}', '')
        }

        return sector
    }

    _buildQueryParametersFromUrl(url) {
        let search = url.search

        if (_.isEmpty(search)) {
            return []
        }
        let parameters = []

        for (const name in url.query) {
            if (url.query[name] instanceof Array) {
                for (const value of url.query[name]) {
                    let item = new GHCRequestParameterItem()

                    item.key = name

                    item.keyPlaceholder = "Parameter Name"

                    item.value = value

                    item.valuePlaceholder = "Parameter Value"

                    parameters.push(item)
                }
            } else {
                let item = new GHCRequestParameterItem()

                item.key = name

                item.keyPlaceholder = "Parameter Name"

                item.value = url.query[name]

                item.valuePlaceholder = "Parameter Value"

                parameters.push(item)
            }
        }

        return parameters
    }

    /**
     * 用于Docs中的Path展示
     *
     * @returns {string}
     */
    buildRequestPathFromRequestUrl() {
        let requestUrl = this.dynamicVariableRender.getCurrentRequestUrl(this.httpRequest)

        if (_.isEmpty(requestUrl.host)) {
            return '/'
        }

        let url = ''

        let basePath = this._fixRequestPath(this._render(requestUrl.basePath))

        url += basePath

        let path = ''

        this.httpRequest.pathParameters.forEach(item => {
            if (EvCheckedStatusHelper.isItemUnchecked(item)) {
                return
            }

            let value = this._fixRequestPath(this._render(item.value))

            if (item.requiredStatus === 'CHECKED') {
                path += `/{${item.key}}`
            } else {
                path += value
            }
        })

        url += path

        return url
    }

    /**
     * 生成URL栏中的和实现发送的URL
     * @see EvHttpClientRequestUrlBar
     * @see GHCHttpClientRequestSender
     * @param configs
     * @returns {string}
     */
    buildUrlStrFromRequestUrl(configs = {
        withoutQueryParameters: false,
        urlEncode: false,
        appendDefaultHost: false,
    }) {
        let requestUrl = this.dynamicVariableRender.getCurrentRequestUrl(this.httpRequest)

        if (!requestUrl.host) {
            if (configs.appendDefaultHost) {
                requestUrl.host = 'httpbin.org'
            } else {
                return ''
            }
        }

        let url = `${requestUrl.scheme}://${this._render(requestUrl.host)}`

        if (requestUrl.port) {
            let port = this._render(requestUrl.port)

            if (!['80', '443'].includes(port)) {
                url += ':' + port
            }
        }

        if (requestUrl.basePath) {
            let basePath = this._render(requestUrl.basePath)

            if (basePath && basePath.startsWith("/")) {
                url += basePath
            } else {
                url += '/' + basePath
            }
        }

        let path = ''

        this.httpRequest.pathParameters.forEach(item => {
            if (EvCheckedStatusHelper.isItemUnchecked(item)) {
                return
            }

            let value = String(this._render(item.value)) // 必需转换为String, value是数字时无法判断为空

            if (_.isEmpty(value)) {
                return
            }

            item.latestValue = value // 更新 latestValue

            if (value.startsWith("/")) {
                path += value
            } else {
                path += "/" + value
            }
        })

        url += path

        if (configs.withoutQueryParameters) {
            return url
        }

        let query = {}

        let config = this.httpRequest.queryParametersConfig || new GHCQueryParametersConfig()

        this.httpRequest.queryParameters.forEach(item => {
            if (EvCheckedStatusHelper.isItemUnchecked(item)) {
                return
            }

            if (_.isEmpty(item.key)) {
                return
            }

            if (item.dataType === 'array') {
                item.children.forEach(child => {
                    if (EvCheckedStatusHelper.isItemUnchecked(child)) {
                        return
                    }

                    let value = this._render(child.value)

                    configs.urlEncode && (value = encodeURIComponent(value))

                    if (query[item.key] instanceof Array) {
                        query[item.key].push(value)
                        return
                    }

                    if (query[item.key]) {
                        query[item.key] = [query[item.key], value]
                    } else {
                        query[item.key] = [value]
                    }
                })
            } else {
                let value = this._render(item.value)

                if (query[item.key] instanceof Array) {
                    configs.urlEncode && (value = encodeURIComponent(value))

                    query[item.key].push(value)

                    return
                }

                configs.urlEncode && (value = encodeURIComponent(value))

                if (query[item.key]) {
                    query[item.key] = [query[item.key], value]
                } else {
                    query[item.key] = value
                }
            }
        })

        if (!_.isEmpty(query)) {
            url += `?${queryString.stringify(query, {
                encode: false,
                arrayFormat: config.arrayFormat.toLowerCase(),
                arrayFormatSeparator: config.arrayFormatSeparator ? config.arrayFormatSeparator.charAt(0) : ',',
                skipEmptyString: config.skipEmptyString
            })}`
        }

        return url
    }

    getRequestPath(ignoreBasePath = false) {
        let requestUrl

        if (this.dynamicVariableRender) {
            requestUrl = this.dynamicVariableRender.getCurrentRequestUrl(this.httpRequest)
        } else {
            requestUrl = this.httpRequest.requestUrl
        }

        let basePath

        if (ignoreBasePath) {
            basePath = ''
        } else {
            basePath = this._fixRequestPath(this._render(requestUrl.basePath))
        }

        this.httpRequest.pathParameters.forEach(item => {
            if (item.checkedStatus === 'UNCHECKED') {
                return
            }

            let value = this._fixRequestPath(this._render(item.value))

            basePath += value
        })

        return basePath || '/'
    }

    getRequestPathWithParameters() {
        let path = ''

        this.httpRequest.pathParameters.forEach(item => {
            let value

            if (item.requiredStatus === 'CHECKED') {
                value = `/{${item.key}}`
            } else {
                value = this._fixRequestPath(this._render(item.value))
            }

            path += value
        })

        return path
    }

    _render(value) {
        if (!this.dynamicVariableRender) {
            return value
        }

        return this.dynamicVariableRender.render(value)
    }

    _fixRequestPath(path) {
        if ((typeof path) === 'object') {
            return ''
        }

        path = String(path)

        if (_.isEmpty(path)) {
            return ""
        }

        return path.startsWith('/') ? path : '/' + path
    }
}

let options = { // TODO 重构用
    withoutBasePath: false,
    withoutPath: false,
    withoutQuery: false,
    urlEncoded: false
}

export default GHCHttpClientUrlHelper
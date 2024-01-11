import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'
import GHCHttpRequest
    from '@/data/gotcha/http-operation/GHCHttpRequest'
import KeyValueItem
    from '@/views/http-client/request/key-value-editor/KeyValueItem'
import GHCHttpRequestPayload
    from '@/data/gotcha/http-operation/RabiHttpRequestPayload'
import _
    from 'lodash'
import RabiHttpRequestUrl
    from '@/data/gotcha/http-operation/RabiHttpRequestUrl'
import GHCHttpRequestPayloadType
    from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import KeyValueItemHelper
    from '@/views/http-client/request/key-value-editor/KeyValueItemHelper'
import moment
    from 'moment'

const APPLICATION_JSON = "application/json"

const APPLICATION_XML = "application/xml"

const FORM_URLENCODED = "application/x-www-form-urlencoded"

const MULTIPART = "form/multipart"

class HttpOperationBuilder {
    /**
     * @param {GHCVersion} version
     */
    constructor(version) {
        this.version = version
    }

    /**
     * @param {JsonMethod} jsonMethod
     */
    buildHttpOperation(jsonMethod) {
        let httpOperation = new GHCHttpOperation()

        httpOperation.versionId = this.version.id

        httpOperation.operationId = jsonMethod.operationId

        httpOperation.name = moment().format("MMM DD, HH:mm")

        this._appendHttpRequest(jsonMethod, httpOperation)

        return httpOperation
    }

    /**
     * @param {JsonMethod} jsonMethod
     * @param {GHCHttpOperation} httpOperation
     * @private
     */
    _appendHttpRequest(jsonMethod, httpOperation) {
        let httpRequest = jsonMethod.httpRequest

        let rHttpRequest = new GHCHttpRequest()

        rHttpRequest.requestMethod = jsonMethod.requestMethod

        this._appendHttpRequestHeaders(httpRequest, rHttpRequest)

        this._appendHttpRequestUrl(httpRequest, rHttpRequest)

        this._appendHttpPathParameters(httpRequest, rHttpRequest)

        this._appendHttpQueryParameters(httpRequest, rHttpRequest)

        // this._appendHttpRequestBody(httpRequest, rHttpRequest)

        httpOperation.httpRequest = rHttpRequest
    }

    /**
     * @param {JsonHttpRequest} httpRequest
     * @param {GHCHttpRequest} rHttpRequest
     * @private
     */
    _appendHttpRequestUrl(httpRequest, rHttpRequest) {
        if (_.isEmpty(httpRequest.requestUrls)) {
            return
        }

        rHttpRequest.requestUrls = httpRequest.requestUrls

        let url = httpRequest.requestUrls[0]

        let requestUrl = new RabiHttpRequestUrl()

        requestUrl.scheme = url.scheme

        requestUrl.host = url.host

        requestUrl.port = url.port

        if (url.scheme === "http") {
            requestUrl.port = "80"
        }

        if (url.scheme === "https") {
            requestUrl.port = "443"
        }

        requestUrl.basePath = url.basePath

        rHttpRequest.requestUrl = requestUrl
    }

    /**
     * @param {JsonHttpRequest} httpRequest
     * @param {GHCHttpRequest} rHttpRequest
     * @private
     */
    _appendHttpRequestHeaders(httpRequest, rHttpRequest) {
        httpRequest.headers && httpRequest.headers.forEach(header => {
            if (header.parameterType !== "header") {
                return
            }

            let item = KeyValueItem.buildFromJsonStruct(header)

            !item.valuePlaceholder && (item.valuePlaceholder = "Header Value")

            rHttpRequest.queryParameters.push(item)
        })
    }

    /**
     * @param {JsonHttpRequest} httpRequest
     * @param {GHCHttpRequest} rHttpRequest
     * @private
     */
    _appendHttpPathParameters(httpRequest, rHttpRequest) {
        let path = httpRequest.requestPath

        let splits = path.split("/")

        splits.forEach(sector => {
            if (_.isEmpty(sector)) {
                return
            }

            let pathParam = undefined

            if (!_.isEmpty(httpRequest.urlParams)) {
                pathParam = httpRequest.urlParams.find(urlParam => {
                    return urlParam.parameterType === "path" && `{${urlParam.fieldName}}` === sector
                })
            }

            let item

            if (pathParam) {
                item = KeyValueItem.buildFromJsonStruct(pathParam)

                item.isSortable = false

                item.value = pathParam.fieldName
            } else {
                item = new KeyValueItem()

                item.value = sector

                item.isDeletable = false

                item.isEditable = false

                item.isSortable = false
            }

            rHttpRequest.pathParameters.push(item)
        })
    }

    /**
     * @param {JsonHttpRequest} httpRequest
     * @param {GHCHttpRequest} rHttpRequest
     * @private
     */
    _appendHttpQueryParameters(httpRequest, rHttpRequest) {
        httpRequest.urlParams && httpRequest.urlParams.forEach(urlParam => {
            if (urlParam.parameterType !== "query") {
                return
            }

            let item = KeyValueItem.buildFromJsonStruct(urlParam)

            !item.valuePlaceholder && (item.valuePlaceholder = "Param Value")

            rHttpRequest.queryParameters.push(item)
        })
    }

    /**
     * @param {JsonHttpRequest} httpRequest
     * @param {GHCHttpRequest} rHttpRequest
     * @private
     */
    _appendHttpRequestBody(httpRequest, rHttpRequest) {
        if (_.isEmpty(httpRequest.payloads)) {
            return
        }

        let rPayload = new GHCHttpRequestPayload()

        rPayload.type = GHCHttpRequestPayloadType.TEXT

        httpRequest.payloads && httpRequest.payloads.forEach(payload => {
            if (payload.contentType === APPLICATION_XML) {
                this._appendHttpRequestContentType(rHttpRequest, APPLICATION_XML)

                this._appendHttpRequestTextPayload(payload, rPayload)
            }

            if (payload.contentType === APPLICATION_JSON) {
                this._appendHttpRequestContentType(rHttpRequest, APPLICATION_JSON)

                this._appendHttpRequestTextPayload(payload, rPayload)

                // TODO JSON
            }


            if (payload.contentType === FORM_URLENCODED) {
                this._appendHttpRequestContentType(rHttpRequest, FORM_URLENCODED)

                this._appendHttpRequestFormPayload(payload, rPayload)
            }

            if (payload.contentType === MULTIPART) {
                this._appendHttpRequestMultipartPayload(payload, rPayload)
            }

            if (_.isEmpty(payload.examples)) {
                return
            }

            let example = payload.examples[0]

            if (!rPayload.text.contentType) {
                rPayload.text.contentType = payload.contentType
            }

            rPayload.text.content[payload.contentType] = example.value
        })

        rHttpRequest.payload = rPayload
    }

    /**
     * @param {JsonHttpPayload} payload
     * @param {GHCHttpRequestPayload} rPayload
     * @private
     */
    _appendHttpRequestTextPayload(payload, rPayload) {
        if (payload.contentType === APPLICATION_JSON) {
            rPayload.text.contentType = APPLICATION_JSON

            if (_.isEmpty(payload.examples)) {
                rPayload.text.content[APPLICATION_JSON] = ""
            } else {
                rPayload.text.content[APPLICATION_JSON] = payload.examples[0].value
            }
        }

        if (payload.contentType === APPLICATION_XML) {
            rPayload.text.contentType = APPLICATION_XML

            if (_.isEmpty(payload.examples)) {
                rPayload.text.content[APPLICATION_XML] = ""
            } else {
                rPayload.text.content[APPLICATION_XML] = payload.examples[0].value
            }
        }
    }

    /**
     * @param {JsonHttpPayload} payload
     * @param {GHCHttpRequestPayload} rPayload
     * @private
     */
    _appendHttpRequestJsonPayload(payload, rPayload) {

    }

    /**
     * @param {JsonHttpPayload} payload
     * @param {GHCHttpRequestPayload} rPayload
     * @private
     */
    _appendHttpRequestFormPayload(payload, rPayload) {
        let items = []

        payload.content && payload.content.forEach(jsonStruct => {
            let item = new KeyValueItem()

            item.key = jsonStruct.fieldName

            if (jsonStruct.summary) {
                item.valuePlaceholder = jsonStruct.summary
            } else {
                item.valuePlaceholder = "Form Value"
            }

            items.push(item)
        })

        rPayload.type = GHCHttpRequestPayloadType.FORM

        rPayload.form.items = items
    }

    /**
     * @param {JsonHttpPayload} payload
     * @param {GHCHttpRequestPayload} rPayload
     * @private
     */
    _appendHttpRequestMultipartPayload(payload, rPayload) {
        let items = []

        payload.content && payload.content.forEach(jsonStruct => {
            let item = new KeyValueItem()

            item.key = jsonStruct.fieldName

            if (jsonStruct.summary) {
                item.valuePlaceholder = jsonStruct.summary
            } else {
                item.valuePlaceholder = "Form Value"
            }

            items.push(item)
        })

        rPayload.type = GHCHttpRequestPayloadType.MULTIPART

        rPayload.multipart.items = items
    }

    /**
     * @param {GHCHttpRequest} rHttpRequest
     * @param {string} contentType
     * @private
     */
    _appendHttpRequestContentType(rHttpRequest, contentType) {
        KeyValueItemHelper.addKeyValueItem(rHttpRequest.headers, 'content-type', contentType)
    }
}

export default HttpOperationBuilder
import GHCComponent
    from '@/data/gotcha/GHCComponent'
import GHCHttpRequestPayload
    from '@/data/gotcha/http-operation/RabiHttpRequestPayload'
import RabiHttpRequestUrl
    from '@/data/gotcha/http-operation/RabiHttpRequestUrl'
import RabiHttpRequestSettings
    from '@/data/gotcha/http-operation/RabiHttpRequestSettings'
import GHCHttpAuthorization
    from '@/data/gotcha/http-operation/authorization/GHCHttpAuthorization'
import RabiHttpRequestAssertion
    from '@/data/gotcha/http-operation/RabiHttpRequestAssertion'
import GHCQueryParametersConfig
    from '@/data/gotcha/http-operation/GHCQueryParametersConfig'

class GHCHttpRequest extends GHCComponent {
    constructor() {
        super()

        this.name = ''

        /**
         * Swagger / OpenAPI operationId
         *
         * @since 1.6.0
         * @type {string}
         */
        this.operationId = ""

        /**
         * Swagger / OpenAPI deprecated
         *
         * @since 1.6.0
         * @type {boolean}
         */
        this.deprecated = false

        this.description = ""

        /**
         * Swagger / OpenAPI extensions key-value pair
         * @since 1.6.0
         */
        this.extensions = []

        /**
         * NodeJS GOT request, used in cancel request (remove when saving)
         */
        this.originalRequest = undefined

        this.requestMethod = "GET"

        /**
         * 绑定的Server Id
         * @type {number}
         * @since 1.6.2
         */
        this.serverId = undefined

        this.requestUrl = new RabiHttpRequestUrl()

        /**
         * @type {GHCHttpAuthorization}
         */
        this.authorization = new GHCHttpAuthorization()

        /**
         * Header Parameters
         *
         * @type {KeyValueItem[]}
         */
        this.headers = []

        /**
         * Cookie Parameters，【没有用到，仅用作文档导出】
         *
         * @type {KeyValueItem[]}
         */
        this.cookies = []

        /**
         * Url Parameters, include path and query
         *
         * @type {KeyValueItem[]}
         */
        this.pathParameters = []

        /**
         * Url Parameters, include path and query
         *
         * @type {KeyValueItem[]}
         */
        this.queryParameters = []

        /**
         * Configuration about query parameters, like array format
         *
         * @type {GHCQueryParametersConfig}
         * @since 1.4.6
         */
        this.queryParametersConfig = new GHCQueryParametersConfig()

        /**
         * @type {GHCHttpRequestPayload}
         */
        this.payload = new GHCHttpRequestPayload()

        /**
         * Request Settings
         *
         * @type {RabiHttpRequestSettings}
         */
        this.settings = new RabiHttpRequestSettings()

        /**
         * Request Assertion
         *
         * @type {RabiHttpRequestAssertion}
         */
        this.assertion = new RabiHttpRequestAssertion()

        /**
         * @since 1.6.0
         *
         * @type {Date}
         */
        this.createdAt = new Date()

        // Responses

        /**
         * Response Definitions
         *
         * @type {RabiHttpResponseExample[]}
         */
        this.examples = []

        /**
         * External Docs for Swagger or OpenAPI
         *
         * @since 1.6.0
         * @type {string}
         */
        this.externalUrl = ''
    }
}

export default GHCHttpRequest
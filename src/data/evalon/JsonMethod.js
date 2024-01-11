class JsonMethod {
    constructor(props) {
        !props && (props = {})

        //========================
        // Fixed Fields
        //========================

        /**
         * Unique Id of this operation
         *
         * serviceQualifiedName + methodName + methodIndex
         *
         * or from swagger file
         *
         * @since 1.3.0
         */
        this.operationId = props.operationId

        this.methodName = props.methodName

        this.serviceName = props.serviceName

        this.serviceQualifiedName = props.serviceQualifiedName

        this.serviceSummary = props.serviceSummary

        this.serviceDescription = props.serviceDescription

        this.summary = props.summary

        this.description = props.description

        this.tags = props.tags

        //========================
        // Control Fields
        //========================

        this.isDeprecated = props.isDeprecated

        this.isJavaService = props.isJavaService

        this.isHttpService = props.isHttpService

        //========================
        // Java Fields
        //========================

        this.parameters = props.parameters

        this.responses = props.responses

        this.exceptions = props.exceptions

        //========================
        // Http Fields
        //========================

        this.requestMethod = props.requestMethod

        this.requestPath = props.requestPath

        /**
         * @deprecated
         *
         * @type {string}
         */
        this.basePath = props.basePath

        this.baseUrl = props.baseUrl

        /**
         * @deprecated
         *
         * @type {string}
         */
        this.fullRequestPath = props.fullRequestPath

        this.consumes = props.consumes

        this.produces = props.produces

        /**
         * @since RabiAPI 1.3.6
         * @type {JsonHttpRequest}
         */
        this.httpRequest = props.httpRequest

        /**
         * @since RabiAPI 1.3.6
         *
         * @type {JsonHttpResponse[]}
         */
        this.httpResponses = props.httpResponses

        /**
         * Http operation created by RabiAPI
         *
         * @type {GHCHttpOperation[]}
         */
        this.httpOperations = []

        /**
         * Mock operation created by RabiAPI
         *
         * @type {RabiMockOperation[]}
         */
        this.mockOperations = []
    }
}

export default JsonMethod
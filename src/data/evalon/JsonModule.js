class JsonModule {
    constructor(props) {
        !props && (props = {})

        this.moduleName = props.moduleName

        /**
         * @type {JsonService[]}
         */
        this.javaServices = props.javaServices

        /**
         * @type {JsonStruct[]}
         */
        this.javaModels = props.javaModels

        /**
         * @type {JsonService[]}
         */
        this.restfulApis = props.restfulApis

        /**
         * @type {JsonStruct[]}
         */
        this.restfulModels = props.restfulModels

        /**
         * Swagger Info Object
         *
         * @type {string|*}
         */
        this.swagger = props.swagger

        /**
         * Swagger 2.0 baseUrl
         */
        this.baseUrl = props.baseUrl

        /**
         * OpenAPI Info Object
         *
         * @type {string|*}
         */
        this.openapi = props.openapi
    }
}

export default JsonModule
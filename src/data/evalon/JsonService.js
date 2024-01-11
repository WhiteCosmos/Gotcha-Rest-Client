class JsonService {
    constructor(props) {
        !props && (props = {})

        //========================
        // Fixed Fields
        //========================

        /**
         * Swagger or OpenAPI is tag name
         *
         * @type {string}
         */
        this.serviceName = props.serviceName

        /**
         * Service qualified name, only for java
         *
         * @type {string}
         */
        this.serviceQualifiedName = props.serviceQualifiedName

        this.summary = props.summary

        this.description = props.description

        /**
         * @type {JsonMethod[]}
         */
        this.methods = props.methods

        this.moduleName = props.moduleName

        this.tags = props.tags

        this.externalDocs = props.externalDocs

        this.basePath = props.basePath

        //========================
        // Control Fields
        //========================

        /**
         * @type {boolean}
         */
        this.isDeprecated = props.isDeprecated

        /**
         * @type {boolean}
         */
        this.isHidden = props.isHidden

        /**
         * @type {boolean}
         */
        this.isHttpService = props.isHttpService

        /**
         * @type {boolean}
         */
        this.isJavaService = props.isJavaService
    }
}

export default JsonService
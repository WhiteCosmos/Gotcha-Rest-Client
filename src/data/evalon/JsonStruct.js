class JsonStruct {
    constructor(props) {
        !props && (props = {})

        //========================
        // Fixed Fields
        //========================

        /**
         * @since 1.0.0
         */
        this.fieldName = ""

        /**
         * @since 1.0.0
         */
        this.fieldType = ""

        /**
         * Format from swagger / openapi
         *
         * @since 1.3.6
         */
        this.fieldFormat = ""

        /**
         * @type {Object}
         */
        this.fieldValue = undefined

        /**
         * Restful API parameter type
         *
         * Path Query Body Form Header Cookie
         *
         * @since 1.3.0
         */
        this.parameterType = ""

        /**
         * Simple summary about field
         *
         * @since 1.0.0
         */
        this.summary = ""

        /**
         * More detail about field
         *
         * @since 1.0.0
         */
        this.description = ""

        /**
         * Default value if not sending this parameter
         *
         * @since 1.2.0
         */
        this.defaultValue = ""

        /**
         * Example value only for display
         *
         * @since 1.2.0
         */
        this.exampleValue = ""

        /**
         * Generated by evalon4j always be TEMPLATE
         *
         * @since 1.3.6
         */
        this.source = "TEMPLATE"

        //========================
        // Control Fields
        //========================

        /**
         * @since 1.0.0
         */
        this.isRequired = false // @NotNull or @NotEmpty

        /**
         * @since 1.0.0
         */
        this.isDeprecated = false

        /**
         * @since 1.0.0
         */
        this.isRecursive = false

        this.isPrimitiveType = false

        this.isStringType = false

        this.isNumberType = false

        this.isBooleanType = false

        this.isDatetimeType = false

        this.isStructType = false

        this.isArrayType = false

        this.isMapType = false

        this.isMapKey = false

        this.isMapValue = false

        this.isEnumType = false

        this.isEnumValue = false

        this.isFileType = false

        //========================
        // Fixed Fields For Java
        //========================

        /**
         * Class QualifiedName
         *
         * @since 1.0.0
         */
        this.qualifiedName = ""

        /**
         * @since 1.0.0
         */
        this.moduleName = ""

        /**
         * Custom Javadoc Tags
         *
         * @since 1.0.0
         */
        this.javadocTags = []

        /**
         * Struct not exists in project, need source jar
         *
         * @since 1.0.0
         */
        this.notExists = false

        /**
         * XML configuration from swagger/openapi
         *
         * @since 1.3.6
         */
        this.xml = null

        this.children = []

        this.oneOf = []

        this.allOf = []


        //========================
        // Constraints
        //========================

        /**
         * @since 1.2.0
         */
        this.constraint = null

        /**
         * Rest of all properties, render as list
         *
         * @since 1.3.6
         */
        this.vendorExtensions = {}
    }
}

export default JsonStruct
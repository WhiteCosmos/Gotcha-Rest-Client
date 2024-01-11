class JsonHttpPayloadExample {
    constructor(props) {
        !props && (props = {})

        /**
         * A unique name to identify this particular example
         **/
        this.name = props.name

        /**
         * Value type, json / xml / ...
         */
        this.type = props.type // JSON | XML

        /**
         * A string representation of the example.
         *
         * This is mutually exclusive with the externalValue property, and ignored if the externalValue property is specified.
         * If the media type associated with the example allows parsing into an object, it may be converted from a string
         **/
        this.value = props.value

        /**
         * A brief summary of the purpose or context of the example
         **/
        this.summary = props.summary

        /**
         * A description of the purpose or context of the example
         **/
        this.description = props.description

        /**
         * A URL to point to an external document to be used as an example.  This is mutually exclusive with the value property.
         **/
        this.externalValue = props.externalValue

        this.extensions = props.extensions
    }
}

export default JsonHttpPayloadExample
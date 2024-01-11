class Header {
    constructor(jsonStruct) {
        this.name = jsonStruct.fieldName

        this.description = jsonStruct.fieldSummary

        // schema ignore

        this.required = jsonStruct.isRequired

        this.deprecated = jsonStruct.isDeprecated

        // ref ignore
    }
}

export default Header
/**
 * @created_at 2022/11/24
 * @app_version 1.6.0
 */
class JsonSchemaNodeMisc {
    constructor() {
        this.readOnly = 'UNCHECKED'

        this.writeOnly = 'UNCHECKED'

        this.nullable = 'UNCHECKED'

        // Swagger

        this.collectionFormat = ''

        // OpenAPI

        this.style = ''

        this.explode = false

        this.allowReserved = false

        this.externalDocs = {
            description: '',
            url: '',
        }
    }
}

export default JsonSchemaNodeMisc
/**
 * @created_at 2022/11/15
 * @app_version 1.6.0
 */
class JsonSchemaNodeExtension {
    constructor() {
        /**
         * Swagger / OpenAPI 中以 x- 开头的扩展字段，导入和导出时都要保留
         * @type {{}}
         */
        this.extensions = []
    }
}

export default JsonSchemaNodeExtension
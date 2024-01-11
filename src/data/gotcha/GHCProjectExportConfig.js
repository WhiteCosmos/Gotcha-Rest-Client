import v4
    from 'node-uuid'
import GHCOpenAPIExportSettings
    from '@/data/gotcha/export/GHCOpenAPIExportSettings'
import GHCSwaggerExportSettings
    from '@/data/gotcha/export/GHCSwaggerExportSettings'

/**
 * @created_at 2022/6/27
 * @app_version 1.5.0
 */
class GHCProjectExportConfig {
    constructor() {
        this.uid = v4()

        this.name = ''

        this.isDefault = false

        this.format = 'postman'

        /**
         * @since 1.6.0
         * @type {{}}
         */
        this.openapiSettings = new GHCOpenAPIExportSettings()

        /**
         * @since 1.6.0
         * @type {{}}
         */
        this.swaggerSettings = new GHCSwaggerExportSettings()
    }
}

export default GHCProjectExportConfig
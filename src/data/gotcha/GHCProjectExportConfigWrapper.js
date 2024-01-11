/**
 * @created_at 2022/6/27
 * @app_version 1.5.0
 */
import GHCProjectExportConfig
    from '@/data/gotcha/GHCProjectExportConfig'

class GHCProjectExportConfigWrapper {
    constructor() {
        this.configs = [] // GHCProjectExportConfig

        this.selectedConfigId = '' // uid

        let defaultExportConfig = new GHCProjectExportConfig()

        defaultExportConfig.isDefault = true

        this.configs.push(defaultExportConfig)

        this.selectedConfigId = defaultExportConfig.uid
    }
}

export default GHCProjectExportConfigWrapper
/**
 * @created_at 2022/10/2
 * @app_version 1.5.3
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableUUID {
    constructor() {
        this.type = GHCDynamicVariableType.UUID

        this.version = 'v1' // v1 | v3 | v4 | v5
    }
}

export default GHCDynamicVariableUUID
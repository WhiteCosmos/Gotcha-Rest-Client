/**
 * @created_at 2022/5/30
 * @app_version 1.4.9
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableEnvironmentVariable {
    constructor(variable) {
        this.type = GHCDynamicVariableType.ENVIRONMENT_VARIABLE

        this.variable = variable || undefined // environmentVariable
    }
}

export default GHCDynamicVariableEnvironmentVariable
/**
 * @created_at 2022/8/14
 * @app_version 1.5.1
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableParameterReference {
    constructor(variable) {
        this.type = GHCDynamicVariableType.PARAMETER_REFERENCE

        this.position = variable.position // header | path  | query

        this.uid = variable.uid // parameter's UID

        this.key = variable.key // parameter's KEY
    }
}

export default GHCDynamicVariableParameterReference
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableGlobalVariable {
    constructor(variable) {
        this.type = GHCDynamicVariableType.GLOBAL_VARIABLE

        this.variable = variable || undefined
    }
}

export default GHCDynamicVariableGlobalVariable
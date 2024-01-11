/**
 * @created_at 2022/10/19
 * @app_version 1.5.4
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableFakerJS {
    constructor() {
        this.type = GHCDynamicVariableType.FAKERJS

        this.expression = 'faker.address.city'

        this.parameters = []
    }
}

export default GHCDynamicVariableFakerJS
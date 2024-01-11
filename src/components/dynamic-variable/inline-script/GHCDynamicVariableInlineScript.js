/**
 * @created_at 2022/8/11
 * @app_version 1.5.1
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableInlineScript {
    constructor() {
        this.type = GHCDynamicVariableType.INLINE_SCRIPT

        this.value = ''

        this.script = 'function execute(value) {\n' +
            '    // Write Script Here\n' +
            '    return value\n' +
            '}'
    }
}

export default GHCDynamicVariableInlineScript
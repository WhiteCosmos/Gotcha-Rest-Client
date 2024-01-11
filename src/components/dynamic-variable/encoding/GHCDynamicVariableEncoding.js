/**
 * @created_at 2022/10/7
 * @app_version 1.5.0
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableEncoding {
    constructor(target) {
        this.type = GHCDynamicVariableType.ENCODING

        this.encode = true // encode or decode

        this.target = target || 'base64' // url or base64

        this.source = 'text' // text | file

        this.text = ''

        this.file = undefined
    }
}

export default GHCDynamicVariableEncoding
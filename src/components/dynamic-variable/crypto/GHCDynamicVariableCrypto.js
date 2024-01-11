/**
 * @created_at 2022/8/22
 * @app_version 1.5.0
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableCrypto {
    constructor(algorithm) {
        this.type = GHCDynamicVariableType.CRYPTO

        this.algorithm = algorithm || 'md5' // md5 | sha-128 | sha-256

        this.source = 'text' // text | file

        this.text = ''

        this.file = undefined
    }
}

export default GHCDynamicVariableCrypto
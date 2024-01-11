/**
 * @created_at 2022/5/31
 * @app_version 1.4.9
 */
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'
import GHCDynamicVariableEnumeration
    from '@/components/dynamic-variable/enumeration/GHCDynamicVariableEnumeration'
import GHCDynamicVariableDatetime
    from '@/components/dynamic-variable/datetime/GHCDynamicVariableDatetime'
import GHCDynamicVariableEnvironmentVariable
    from '@/components/dynamic-variable/variables/GHCDynamicVariableEnvironmentVariable'
import GHCDynamicVariableGlobalVariable
    from '@/components/dynamic-variable/variables/GHCDynamicVariableGlobalVariable'
import GHCDynamicVariableInlineScript
    from '@/components/dynamic-variable/inline-script/GHCDynamicVariableInlineScript'
import GHCDynamicVariableParameterReference
    from '@/components/dynamic-variable/parameter-ref/GHCDynamicVariableParameterReference'
import GHCDynamicVariableCrypto
    from '@/components/dynamic-variable/crypto/GHCDynamicVariableCrypto'
import GHCDynamicVariableRequestChain
    from '@/components/dynamic-variable/request-chain/GHCDynamicVariableRequestChain'
import GHCDynamicVariableUUID
    from '@/components/dynamic-variable/uuid/GHCDynamicVariableUUID'
import GHCDynamicVariableFileContent
    from '@/components/dynamic-variable/file-content/GHCDynamicVariableFileContent'
import GHCDynamicVariableEncoding
    from '@/components/dynamic-variable/encoding/GHCDynamicVariableEncoding'
import GHCDynamicVariableFakerJS
    from '@/components/dynamic-variable/faker-js/GHCDynamicVariableFakerJS'
import GHCDynamicVariableJson
    from '@/components/dynamic-variable/json/GHCDynamicVariableJson'

class GHCDynamicVariableBuilder {
    constructor() {

    }

    build(type, param) {
        switch (type) {
            case GHCDynamicVariableType.TEXT:
                return ''
            case GHCDynamicVariableType.ENUM:
                return new GHCDynamicVariableEnumeration()
            case GHCDynamicVariableType.DATETIME:
                return new GHCDynamicVariableDatetime()
            case GHCDynamicVariableType.INLINE_SCRIPT:
                return new GHCDynamicVariableInlineScript()
            case GHCDynamicVariableType.ENVIRONMENT_VARIABLE:
                return new GHCDynamicVariableEnvironmentVariable(param)
            case GHCDynamicVariableType.GLOBAL_VARIABLE:
                return new GHCDynamicVariableGlobalVariable(param)
            case GHCDynamicVariableType.PARAMETER_REFERENCE:
                return new GHCDynamicVariableParameterReference(param)
            case GHCDynamicVariableType.REQUEST_CHAIN:
                return new GHCDynamicVariableRequestChain(param)
            case GHCDynamicVariableType.FAKERJS:
                return new GHCDynamicVariableFakerJS(param)
            case GHCDynamicVariableType.UUID:
                return new GHCDynamicVariableUUID(param)
            case GHCDynamicVariableType.JSON:
                return new GHCDynamicVariableJson(param)
            case GHCDynamicVariableType.FILE_CONTENT:
                return new GHCDynamicVariableFileContent(param)
            case GHCDynamicVariableType.CRYPTO:
                return new GHCDynamicVariableCrypto(param)
            case GHCDynamicVariableType.ENCODING:
                return new GHCDynamicVariableEncoding(param)
            default:
                return ''
        }
    }
}

export default GHCDynamicVariableBuilder
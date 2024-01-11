/**
 * @created_at 2022/5/29
 * @app_version 1.4.9
 */
import DynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'
import GHCDynamicVariableEnumRender
    from '@/components/dynamic-variable/enumeration/GHCDynamicVariableEnumRender'
import GHCDynamicVariableEnvironmentVariableRender
    from '@/components/dynamic-variable/variables/GHCDynamicVariableEnvironmentVariableRender'
import GHCEnvironmentVariablesNunjucksRender
    from '@/data/gotcha/http-operation/environment/GHCEnvironmentVariablesNunjucksRender'
import GHCDynamicVariableTextRender
    from '@/components/dynamic-variable/text/GHCDynamicVariableTextRender'
import GHCDynamicVariableDatetimeRender
    from '@/components/dynamic-variable/datetime/GHCDynamicVariableDatetimeRender'
import GHCDynamicVariableGlobalVariableRender
    from '@/components/dynamic-variable/variables/GHCDynamicVariableGlobalVariableRender'
import GHCDynamicVariableInlineScriptRender
    from '@/components/dynamic-variable/inline-script/GHCDynamicVariableInlineScriptRender'
import GHCDynamicVariableParameterReferenceRender
    from '@/components/dynamic-variable/parameter-ref/GHCDynamicVariableParameterReferenceRender'
import GHCDynamicVariableUUIDRender
    from '@/components/dynamic-variable/uuid/GHCDynamicVariableUUIDRender'
import GHCDynamicVariableFileContentRender
    from '@/components/dynamic-variable/file-content/GHCDynamicVariableFileContentRender'
import GHCDynamicVariableCryptoRender
    from '@/components/dynamic-variable/crypto/GHCDynamicVariableCryptoRender'
import GHCDynamicVariableEncodingRender
    from '@/components/dynamic-variable/encoding/GHCDynamicVariableEncodingRender'
import GHCDynamicVariableRequestChainRender
    from '@/components/dynamic-variable/request-chain/GHCDynamicVariableRequestChainRender'
import GHCDynamicVariableFakerJSRender
    from '@/components/dynamic-variable/faker-js/GHCDynamicVariableFakerJSRender'
import GHCDynamicVariableJsonRender
    from '@/components/dynamic-variable/json/GHCDynamicVariableJsonRender'

class GHCDynamicVariableRender {
    constructor(environments, globalVariables, servers) {
        this.httpRequest = undefined

        this.httpRequestPool = new Map()

        this.environments = environments

        this.servers = servers

        this.environmentVariableNunjucksRender = new GHCEnvironmentVariablesNunjucksRender(environments, globalVariables)

        let environmentVariableRender = new GHCDynamicVariableEnvironmentVariableRender(environments)

        let globalVariableRender = new GHCDynamicVariableGlobalVariableRender(globalVariables)

        this.renders = {}

        this.renders[DynamicVariableType.TEXT] = new GHCDynamicVariableTextRender(this.environmentVariableNunjucksRender)

        this.renders[DynamicVariableType.ENUM] = new GHCDynamicVariableEnumRender()

        this.renders[DynamicVariableType.DATETIME] = new GHCDynamicVariableDatetimeRender()

        this.renders[DynamicVariableType.INLINE_SCRIPT] = new GHCDynamicVariableInlineScriptRender()

        this.renders[DynamicVariableType.ENVIRONMENT_VARIABLE] = environmentVariableRender

        this.renders[DynamicVariableType.GLOBAL_VARIABLE] = globalVariableRender

        this.renders[DynamicVariableType.PARAMETER_REFERENCE] = new GHCDynamicVariableParameterReferenceRender()

        this.renders[DynamicVariableType.FAKERJS] = new GHCDynamicVariableFakerJSRender()

        this.renders[DynamicVariableType.UUID] = new GHCDynamicVariableUUIDRender()

        this.renders[DynamicVariableType.JSON] = new GHCDynamicVariableJsonRender()

        this.renders[DynamicVariableType.FILE_CONTENT] = new GHCDynamicVariableFileContentRender()

        this.renders[DynamicVariableType.CRYPTO] = new GHCDynamicVariableCryptoRender()

        this.renders[DynamicVariableType.ENCODING] = new GHCDynamicVariableEncodingRender()

        this.renders[DynamicVariableType.REQUEST_CHAIN] = new GHCDynamicVariableRequestChainRender()
    }

    setHttpRequest(httpRequest) {
        // this.httpRequest = httpRequest

        this.httpRequestPool.set(httpRequest.uid, httpRequest)

        this.renders[DynamicVariableType.PARAMETER_REFERENCE].setHttpRequest(httpRequest)
    }

    getCurrentEnvironment() {
        return this.environments.environments.find(env => {
            return env.uid === this.environments.selectedEnvironmentUID
        })
    }

    getCurrentRequestUrl(httpRequest) {
        let defaultRequestUrl = httpRequest.requestUrl

        let server = this.getCurrentServer(httpRequest)

        if (server) {
            if (server.isBindEnvironment === 'CHECKED') {
                let environment = this.getCurrentEnvironment()

                if (!environment) {
                    return defaultRequestUrl
                }

                return server.requestUrls[environment.uid] || defaultRequestUrl
            } else {
                return server.requestUrl
            }
        } else {
            return defaultRequestUrl
        }
    }

    getCurrentServer(httpRequest) {
        return this.servers.find(it => {
            return httpRequest.serverId === it.uid
        })
    }

    render(value) {
        if ((typeof value) !== 'object') {
            return this.environmentVariableNunjucksRender.render(value)
        }

        if (value && value.type) {
            let r = this.renders[value.type]

            // Recursive render if needed
            if (typeof r.setDynamicVariableRender === 'function') {
                r.setDynamicVariableRender(this)
            }

            return r.render(value)
        }
    }
}

export default GHCDynamicVariableRender
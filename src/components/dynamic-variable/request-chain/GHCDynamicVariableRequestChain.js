import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

/**
 * @created_at 2022/9/18
 * @app_version 1.5.0
 */
class GHCDynamicVariableRequestChain {
    constructor() {
        this.type = GHCDynamicVariableType.REQUEST_CHAIN

        this.requestId = -1

        this.requestName = ''

        this.position = 'response_body' // request_header | url_parameter | request_payload

        /**
         * @deprecated
         * @type {string}
         */
        this.jsonpath = ''

        this.values = {
            'request_header': '',

            'url_parameter': '',

            'request_payload': '', // json path

            'response_header': '',

            'response_body': '', // json path
        }
    }
}

export default GHCDynamicVariableRequestChain
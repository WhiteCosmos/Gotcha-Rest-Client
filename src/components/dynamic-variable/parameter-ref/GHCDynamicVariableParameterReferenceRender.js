/**
 * @created_at 2022/8/13
 * @app_version 1.5.1
 */
import GHCHttpClientRequestHelper
    from '@/views/http-client/request/GHCHttpClientRequestHelper'
import GHCDynamicVariableType
    from '@/components/dynamic-variable/GHCDynamicVariableType'

class GHCDynamicVariableParameterReferenceRender {
    constructor() {
        this.dynamicVariableRender = undefined

        this.httpRequest = undefined
    }

    setHttpRequest(httpRequest) {
        this.httpRequest = httpRequest
    }

    setDynamicVariableRender(dynamicVariableRender) {
        this.dynamicVariableRender = dynamicVariableRender
    }

    render(value) {
        let item = this._findParameter(value)

        if (item) {
            if (this._isRecursiveReference(item)) {
                return ''
            }

            return this.dynamicVariableRender.render(item.value)
        } else {
            return ''
        }
    }

    _findParameter(value) {
        let items = []

        if (value.position === 'header') {
            items = GHCHttpClientRequestHelper.getHeaders(this.httpRequest)
        }

        if (value.position === 'path') {
            items = GHCHttpClientRequestHelper.getPathParameters(this.httpRequest)
        }

        if (value.position === 'query') {
            items = GHCHttpClientRequestHelper.getQueryParameters(this.httpRequest)
        }

        return items.find(it => {
            if (it.uid) {
                return it.uid === value.uid
            } else {
                return it.key === value.key
            }
        })
    }

    _isRecursiveReference(item, pool = new Set()) {
        let value = item.value

        if (typeof value !== 'object') {
            return false
        }

        if (value.type && value.type !== GHCDynamicVariableType.PARAMETER_REFERENCE) {
            return false
        }

        let nextItem = this._findParameter(value)

        if (!nextItem) {
            return false
        }

        if (pool.has(value)) {
            return true
        } else {
            pool.add(value)

            return this._isRecursiveReference(nextItem, pool)
        }
    }
}

export default GHCDynamicVariableParameterReferenceRender
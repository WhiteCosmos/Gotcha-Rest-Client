import GHCHttpResponseAssertion
    from '@/data/gotcha/http-operation/GHCHttpResponseAssertion'
import GHCKeyValueAssertionResult
    from '@/views/http-client/components/key-value-assertion-editor/GHCKeyValueAssertionResult'
import jp
    from 'jsonpath'
import _
    from 'lodash'
import EvCheckedStatusHelper
    from '@/mixins/EvCheckedStatusHelper'
import GHCJson
    from '@/core/json/GHCJson'

class GHCHttpResponseAssertionBuilder {
    constructor(httpOperation, dynamicVariableRender) {
        this.httpRequest = httpOperation.httpRequest

        this.httpResponse = httpOperation.httpResponse

        this.dynamicVariableRender = dynamicVariableRender
    }

    build() {
        let result = new GHCHttpResponseAssertion()

        if (!this.httpResponse) {
            return result
        }

        this._assertResponseHeaders(result)

        this._assertResponseBody(result)

        return result
    }

    _assertResponseHeaders(result) {
        let assertion = this.httpRequest.assertion

        assertion.headers.forEach(header => {
            if (_.isEmpty(header.key)) {
                return
            }

            if (EvCheckedStatusHelper.isItemUnchecked(header)) {
                return
            }

            let item = new GHCKeyValueAssertionResult()

            item.key = header.key

            item.condition = header.condition

            let expectedValue = this.dynamicVariableRender.render(header.value)

            let returnedValue = this.httpResponse.headers[header.key]

            if (!returnedValue) { // Header not exists
                item.value = undefined
                item.expectedValue = undefined
                item.returnedValue = undefined
                item.pass = false
            }

            if (returnedValue && header.condition === '==') {
                item.value = returnedValue

                item.expectedValue = expectedValue

                item.returnedValue = returnedValue

                item.pass = (expectedValue === returnedValue)
            }

            if (returnedValue && header.condition === '~=') {
                item.value = returnedValue

                item.expectedValue = expectedValue

                item.returnedValue = returnedValue

                item.pass = new RegExp(expectedValue, 'i').test(returnedValue)
            }

            result.headers.push(item)
        })
    }

    _assertResponseBody(result) {
        let assertion = this.httpRequest.assertion

        if (!this._checkResponseBodyIsJson()) {
            assertion.jsonPaths.forEach(jsonPath => {
                let item = new GHCKeyValueAssertionResult()

                item.key = jsonPath.key

                item.condition = jsonPath.condition

                item.returnedValue = undefined

                item.pass = false

                result.jsonPaths.push(item)
            })

            return
        }


        let json = GHCJson.parse(this.httpResponse.payload.body)

        const {JSONPath} = require('jsonpath-plus')

        assertion.jsonPaths.forEach(jsonPath => {
            if (EvCheckedStatusHelper.isItemUnchecked(jsonPath)) {
                return
            }

            let item = new GHCKeyValueAssertionResult()

            item.key = jsonPath.key

            item.condition = jsonPath.condition

            try {
                let returnedValue = JSONPath({
                    path: item.key,
                    json
                })

                if (returnedValue instanceof Array) { // jp return array https://www.npmjs.com/package/jsonpath
                    returnedValue = returnedValue[0]
                }

                if ((typeof returnedValue) === 'number') {
                    returnedValue = returnedValue.toString()
                }

                item.expectedValue = this.dynamicVariableRender.render(jsonPath.value)

                item.returnedValue = returnedValue

                item.condition = jsonPath.condition

                if (jsonPath.condition === '--') {
                    item.pass = (returnedValue === null)
                    item.expectedValue = 'null'

                    if (item.pass) {
                        item.returnedValue = 'null'
                    }
                } else {
                    if (jsonPath.condition === '==') {
                        item.pass = (String(returnedValue) === String(item.expectedValue))
                    } else if (jsonPath.condition === '~=') {
                        item.pass = new RegExp(item.expectedValue, 'i').test(returnedValue)
                    } else if (jsonPath.condition === '>') {
                        item.pass = (returnedValue > item.expectedValue)
                    } else if (jsonPath.condition === '<') {
                        item.pass = (returnedValue < item.expectedValue)
                    } else if (jsonPath.condition === '≥') {
                        item.pass = (returnedValue > item.expectedValue || returnedValue === item.expectedValue)
                    } else if (jsonPath.condition === '≤') {
                        item.pass = (returnedValue < item.expectedValue || returnedValue === item.expectedValue)
                    } else if (jsonPath.condition === 'T') {
                        item.pass = (returnedValue === true)
                        item.expectedValue = 'true'
                        if (item.pass) {
                            item.returnedValue = 'true'
                        } else {
                            item.returnedValue = 'false'
                        }
                    } else if (jsonPath.condition === 'F') {
                        item.pass = (returnedValue === false)
                        item.expectedValue = 'false'
                        if (item.pass) {
                            item.returnedValue = 'false'
                        } else {
                            item.returnedValue = 'true'
                        }
                    }
                }
            } catch (e) {
                console.error(e)

                let item = new GHCKeyValueAssertionResult()

                item.key = jsonPath.key

                item.condition = jsonPath.condition

                item.errorMessage = e.message
            }

            result.jsonPaths.push(item)
        })
    }

    _checkResponseBodyIsJson() {
        return this.httpResponse.payload
            && this.httpResponse.payload.contentType.match(/application\/json.*/)
    }
}

export default GHCHttpResponseAssertionBuilder
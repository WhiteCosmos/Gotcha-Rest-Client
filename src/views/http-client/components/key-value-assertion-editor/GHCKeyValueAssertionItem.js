import {
    v4
} from 'uuid'

/**
 * @created_at 2022/1/13
 * @app_version 1.4.0
 */
class GHCKeyValueAssertionItem {
    constructor() {
        this.uid = v4()

        this.checkedStatus = 'CHECKED'

        this.key = ''

        this.value = ''

        this.returnedValue = ''

        this.expectedValue = ''

        this.type = 'string' // string number boolean null

        this.condition = '=='
    }
}

export default GHCKeyValueAssertionItem
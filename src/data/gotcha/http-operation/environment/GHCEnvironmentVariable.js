import {
    v4
} from 'node-uuid'

class GHCEnvironmentVariable {
    constructor(props = {}) {
        this.uid = props.uid || v4()

        this.name = props.name || ''

        this.value = props.value || ''

        /**
         * @since 1.5.0
         * @type {boolean}
         */
        this.match = true
    }
}

export default GHCEnvironmentVariable
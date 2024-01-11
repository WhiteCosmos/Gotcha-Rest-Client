import {
    v4
} from 'node-uuid'

class GHCEnvironmentVariableGroup {
    constructor(props = {}) {
        this.uid = v4()

        this.name = props.name || "Default Group"

        this.default = false

        /**
         * @since 1.4.9
         * @type {boolean}
         */
        this.expand = false

        this.variables = []
    }
}

export default GHCEnvironmentVariableGroup
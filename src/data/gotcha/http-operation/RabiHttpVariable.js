/**
 * Environment variable
 *
 * Saved in IndexDB
 */
class RabiHttpVariable {
    constructor() {
        /**
         * Find all variables by project id
         *
         * @type {number}
         */
        this.projectId = 0

        /**
         * ENVIRONMENT | FIXED | DYNAMIC
         *
         * @type {string}
         */
        this.type = ""

        /**
         * Actual environment it is
         *
         * @type {string}
         */
        this.environment = ""

        /**
         * Variable name
         *
         * @type {string}
         */
        this.name = ""

        /**
         * Variable values, if more than one value, a selector will be shown
         *
         * @type {RabiHttpVariableValue[]}
         */
        this.values = []

        /**
         * Exists if this is a DYNAMIC variable, calculate final result before send
         *
         * @type {object}
         */
        this.payload = undefined
    }
}

export default RabiHttpVariable
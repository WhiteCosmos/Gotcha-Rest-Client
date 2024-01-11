import {
    v4
} from 'node-uuid'

/**
 * @created_at 2021/12/5
 * @app_version 1.3.13
 */
class GHCEnvironment {
    constructor(props = {}) {
        this.uid = props.uid || v4()

        this.name = props.name || 'New Environment'

        this.variables = []
    }
}

export default GHCEnvironment
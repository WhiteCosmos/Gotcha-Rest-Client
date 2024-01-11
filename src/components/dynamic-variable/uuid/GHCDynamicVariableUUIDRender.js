import {
    v1,
    v4
} from 'uuid'

/**
 * @created_at 2022/10/2
 * @app_version 1.5.3
 */
class GHCDynamicVariableUUIDRender {
    constructor() {

    }

    render(value) {
        let version = value.version

        switch (version) {
            case 'v1':
                return v1()
            case 'v4':
                return v4()
            default:
                return ''
        }
    }
}

export default GHCDynamicVariableUUIDRender
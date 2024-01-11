/**
 * @created_at 2022/5/31
 * @app_version 1.4.9
 */
class GHCDynamicVariableEnumRender {
    constructor() {

    }

    render(value) {
        if (value.item) {
            return value.item.value
        } else {
            return ''
        }
    }
}

export default GHCDynamicVariableEnumRender
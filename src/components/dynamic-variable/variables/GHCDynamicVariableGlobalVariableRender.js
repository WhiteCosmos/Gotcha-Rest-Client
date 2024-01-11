/**
 * @created_at 2022/6/8
 *
 * @app_version 1.4.9
 */
class GHCDynamicVariableGlobalVariableRender {
    constructor(globalVariables) {
        this.globalVariables = globalVariables || []

        this.dynamicVariableRender = undefined
    }

    setDynamicVariableRender(dynamicVariableRender) {
        this.dynamicVariableRender = dynamicVariableRender
    }

    render(value) {
        if (!value.variable) {
            return ''
        }

        let result = this.globalVariables.find(it => {
            return it.uid === value.variable.uid
        })

        return result ? this.dynamicVariableRender.render(result.value) : ''
    }
}

export default GHCDynamicVariableGlobalVariableRender
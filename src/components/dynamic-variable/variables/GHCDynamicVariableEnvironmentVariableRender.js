/**
 * @created_at 2022/5/31
 * @app_version 1.4.9
 */
class GHCDynamicVariableEnvironmentVariableRender {
    constructor(environments) {
        this.environments = environments
    }

    setDynamicVariableRender(dynamicVariableRender) {
        this.dynamicVariableRender = dynamicVariableRender
    }

    render(value) {
        if (!value.variable) {
            return ''
        }

        let environment = this.environments.environments.find(env => {
            return env.uid === this.environments.selectedEnvironmentUID
        })

        if (!environment) {
            return ''
        }

        let result = environment.variables.find(it => {
            return it.uid === value.variable.uid
        })

        return result ? this.dynamicVariableRender.render(result.value) : ''
    }
}

export default GHCDynamicVariableEnvironmentVariableRender
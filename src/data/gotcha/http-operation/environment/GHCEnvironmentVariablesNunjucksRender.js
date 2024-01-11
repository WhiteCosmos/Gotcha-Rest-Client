import _
    from 'lodash'

class GHCEnvironmentVariablesNunjucksRender {
    constructor(environments, globalVariables = []) {
        this.values = this._initializeValues(environments, globalVariables)

        this.nunjucks = require('nunjucks')

        this.nunjucks.configure({autoescape: true})
    }

    _initializeValues(environments, globalVariables) {
        let values = {}

        this._initializeFromEnvironmentVariables(values, environments)

        this._initializeFromGlobalVariables(values, globalVariables)

        return values
    }

    _initializeFromEnvironmentVariables(values, environments) {
        if (!environments) {
            return
        }

        let selectedEnvironment = environments.environments.find(env => {
            return env.uid === environments.selectedEnvironmentUID
        })

        if (!selectedEnvironment) {
            return
        }

        let map = new Map()

        environments.groups.forEach(group => {
            group.variables.forEach(variable => {
                map.set(variable.uid, {
                    key: variable.name,
                })
            })
        })

        selectedEnvironment.variables.forEach(variable => {
            let v = map.get(variable.uid)

            v && (v.value = variable.value)
        })

        for (const v of map.values()) {
            values[v.key] = v.value
        }
    }

    _initializeFromGlobalVariables(values, globalVariables) {
        if (!globalVariables) {
            return
        }

        globalVariables.forEach(globalVariable => {
            values[globalVariable.key] = globalVariable.value
        })
    }

    render(str) {
        if (_.isEmpty(str)) {
            return str
        }

        if (str instanceof Number) {
            str = String(str)
        }

        return this.nunjucks.renderString(str, this.values)
    }
}

export default GHCEnvironmentVariablesNunjucksRender
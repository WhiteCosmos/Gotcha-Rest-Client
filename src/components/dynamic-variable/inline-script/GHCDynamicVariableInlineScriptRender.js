/**
 * @created_at 2022/8/11
 * @app_version 1.5.1
 */
import _
    from 'lodash'

class GHCDynamicVariableInlineScriptRender {
    constructor() {
        this.vm = require('vm')
    }

    render(payload) {
        let value = payload.value

        let script = payload.script

        let context = {
            '_': _,
            oldVal: value,
            newVal: undefined,
        }

        script = this.handle(script)

        try {
            this.vm.createContext(context)

            this.vm.runInContext(script, context)
        } catch (e) {
            console.error("Execute VM Failed", e)
        }

        return context.newVal
    }

    handle(script) {
        script += '\n newVal = execute(oldVal) \n'

        return script
    }
}

export default GHCDynamicVariableInlineScriptRender
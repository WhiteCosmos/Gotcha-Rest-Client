/**
 * @created_at 2022/10/19
 * @app_version 1.5.4
 */

import {
    faker
} from '@faker-js/faker'

class GHCDynamicVariableFakerJSRender {
    constructor() {
        this.vm = require('vm')
    }

    render(value) {
        let expression = value.expression

        if (!expression) {
            return ''
        }

        expression = this._format(expression)

        let script = '  function execute() { ' + ` return ${expression} ` + ' }' + '\n'

        script += 'result = execute()'

        let context = {
            faker: faker,
            result: '',
        }

        try {
            this.vm.createContext(context)

            this.vm.runInContext(script, context)
        } catch (e) {
            console.error("FakerJS Execute VM Failed", e)
        }

        return context.result
    }

    _format(expression) {
        if (!expression.endsWith('()')) {
            return expression + '()'
        } else {
            return expression
        }
    }
}

export default GHCDynamicVariableFakerJSRender
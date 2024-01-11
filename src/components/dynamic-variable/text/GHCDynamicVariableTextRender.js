/**
 * @created_at 2022/5/31
 * @app_version 1.4.6
 */
class GHCDynamicVariableTextRender {
    constructor(environmentVariableNunjucksRender) {
        this.environmentVariableNunjucksRender = environmentVariableNunjucksRender
    }

    render(value) {
        return this.environmentVariableNunjucksRender.render(value.text)
    }
}

export default GHCDynamicVariableTextRender
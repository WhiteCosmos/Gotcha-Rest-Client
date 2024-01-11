/**
 * @created_at 2022/10/25
 * @app_version 1.6.0
 */
import GHCComponent
    from '@/data/gotcha/GHCComponent'

class GHCJsonSchemaGroup extends GHCComponent {
    constructor() {
        super()

        this.name = ''

        this.default = false

        /**
         *
         * @type {GHCJsonSchema[]}
         */
        this.items = []
    }
}

export default GHCJsonSchemaGroup
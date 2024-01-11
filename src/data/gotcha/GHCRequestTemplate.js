import GHCComponent
    from '@/data/gotcha/GHCComponent'
import GHCHttpOperation
    from '@/data/gotcha/http-operation/GHCHttpOperation'

/**
 * @created_at 2023/3/3
 * @app_version 1.6.3
 */
class GHCRequestTemplate extends GHCComponent {
    constructor() {
        super()

        this.name = 'New Template'

        this.httpOperation = new GHCHttpOperation()
    }
}

export default GHCRequestTemplate
import GHCComponent
    from '@/data/gotcha/GHCComponent'
import RabiHttpRequestUrl
    from '@/data/gotcha/http-operation/RabiHttpRequestUrl'

/**
 * @created_at 2022/12/28
 * @app_version 1.6.1
 */
class GHCServer extends GHCComponent {
    constructor() {
        super()

        this.name = ''

        this.isBindEnvironment = 'UNCHECKED'

        this.requestUrl = new RabiHttpRequestUrl()

        this.requestUrls = {} // Environment Id -> Request Url
    }
}

export default GHCServer
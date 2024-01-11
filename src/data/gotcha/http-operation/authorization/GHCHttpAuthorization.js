import GHCHttpAuthorizationBasicAuth
    from '@/data/gotcha/http-operation/authorization/GHCHttpAuthorizationBasicAuth'
import GHCHttpAuthorizationApiKey
    from '@/data/gotcha/http-operation/authorization/GHCHttpAuthorizationApiKey'
import GHCHttpAuthorizationDigestAuth
    from '@/data/gotcha/http-operation/authorization/GHCHttpAuthorizationDigestAuth'
import GHCHttpAuthorizationBearerAuth
    from '@/data/gotcha/http-operation/authorization/GHCHttpAuthorizationBearerAuth'

class GHCHttpAuthorization {
    constructor() {
        this.type = "none"

        this.apiKey = new GHCHttpAuthorizationApiKey() // Token Auth in Header or Query (Deprecated)

        this.basic = new GHCHttpAuthorizationBasicAuth() // Http Basic Auth

        this.bearer = new GHCHttpAuthorizationBearerAuth()

        this.digest = new GHCHttpAuthorizationDigestAuth()
    }
}

export default GHCHttpAuthorization
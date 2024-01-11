class GHCHttpAuthorizationApiKey {
    constructor() {
        this.key = ""

        this.value = ""

        this.prefix = ""

        this.isBearer = false // Add 'Bearer' Prefix

        this.addTo = "header" // query | header | cookie*
    }
}

export default GHCHttpAuthorizationApiKey
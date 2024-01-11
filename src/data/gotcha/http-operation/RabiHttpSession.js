/**
 * A host can have multiple session configs
 *
 * Saved in IndexDB
 */
class RabiHttpSession {
    constructor() {
        this.host = ""

        this.sessionName = ""

        this.isDefaultSession = false

        this.cookies = [] // List<RabiHttpCookie>
    }
}

export default RabiHttpSession
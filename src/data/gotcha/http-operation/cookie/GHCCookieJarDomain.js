import {
    v4
} from 'node-uuid'

class GHCCookieJarDomain {
    constructor() {
        this.uid = v4()

        this.name = "" // example.com

        this.canonicalName = ""

        this.cookies = []
    }
}

export default GHCCookieJarDomain
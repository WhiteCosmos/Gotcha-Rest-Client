import {
    v4
} from 'node-uuid'

class GHCCookieJar {
    constructor() {
        this.uid = v4()

        this.name = "Cookie Jar"

        this.default = false

        this.domains = []
    }
}

export default GHCCookieJar
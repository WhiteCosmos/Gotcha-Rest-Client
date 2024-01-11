/**
 * @IndexedDB
 */
class RabiCookieJar {
    constructor() {
        // id

        this.projectId = -1

        this.name = "Cookie Jar"

        this.default = false

        /**
         * Cookies from 'set-cookie' header
         *
         * Map<String, List<ToughCookie>>
         *
         * @type {{}}
         */
        this.cookies = {}

        this.cookieJars = []
    }
}

export default RabiCookieJar
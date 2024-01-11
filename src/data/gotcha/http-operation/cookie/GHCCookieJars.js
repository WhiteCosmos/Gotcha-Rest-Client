/**
 * @IndexedDB
 *
 * Project & Version 1 -> 1 CookieJars -> CookieJar -> Domain -> Cookie
 */
class GHCCookieJars {
    constructor() {
        this.projectId = -1

        this.selectedCookieJarUID = undefined

        this.cookieJars = [] // GotchaHttpClientCookieJar
    }
}

export default GHCCookieJars
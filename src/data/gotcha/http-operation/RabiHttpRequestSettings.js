class RabiHttpRequestSettings {
    constructor() {
        // Cookies

        this.sendCookies = true

        this.storeCookies = true

        // Redirect

        this.followRedirects = true

        this.redirectAuthorization = false

        this.redirectOriginalMethod = false

        this.maximumRedirects = {
            enable: false,
            value: 0,
        }

        // Timeout

        this.timeout = {
            enable: false,
            value: 0,
        }

        // Proxy

        this.enableProxy = false

        this.systemProxy = false

        this.proxy = "SYSTEM" // DISABLE | SYSTEM | CUSTOM
    }
}

export default RabiHttpRequestSettings
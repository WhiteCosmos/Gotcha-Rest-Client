/**
 * Tough Cookie
 */
class RabiCookie {
    constructor() {
        /**
         * the name or key of the cookie (default "")
         *
         * @type {String}
         */
        this.key = ""

        /**
         * the value of the cookie (default "")
         *
         * @type {String}
         */
        this.value = ""

        /**
         * if set, the Expires= attribute of the cookie (defaults to the string "Infinity"). See setExpires()
         *
         * @type {Date}
         */
        this.expires = "Infinity"

        /**
         *  if set, the Max-Age= attribute in seconds of the cookie.
         *
         *  May also be set to strings "Infinity" and "-Infinity" for non-expiry and immediate-expiry, respectively. See setMaxAge()
         *
         * @type {Number}
         */
        this.maxAge = "Infinity"

        /**
         * the Domain= attribute of the cookie
         *
         * @type {String}
         */
        this.domain = undefined

        /**
         * the Path= of the cookie
         *
         * @type {String}
         */
        this.path = "/"

        /**
         * the Secure cookie flag
         *
         * @type {String}
         */
        this.secure = false

        /**
         * the HttpOnly cookie flag
         *
         * @type {String}
         */
        this.httpOnly = false

        /**
         * the SameSite cookie attribute (from [RFC6265bis]); must be one of none, lax, or strict
         *
         * @type {String}
         */
        this.sameSite = undefined

        /**
         * any unrecognized cookie attributes as strings (even if equal-signs inside)
         *
         * @type {Array}
         */
        this.extensions = undefined

        this.creation = new Date().toISOString()

        this.creationIndex = undefined

        // Control Fields

        this.checkedStatus = "CHECKED"

        this.isSetCookie = true
    }
}

export default RabiCookie
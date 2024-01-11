/**
 * Same as tough-cookie Cookie object
 *
 * @see https://github.com/salesforce/tough-cookie
 */
class RabiHttpCookie {
    constructor() {
        /**
         * the name or key of the cookie (default "")
         *
         * @type {String}
         */
        this.key = undefined

        /**
         * the value of the cookie (default "")
         *
         * @type {String}
         */
        this.value = undefined

        /**
         * if set, the Expires= attribute of the cookie (defaults to the string "Infinity"). See setExpires()
         *
         * @type {Date}
         */
        this.expires = undefined

        /**
         *  if set, the Max-Age= attribute in seconds of the cookie.
         *
         *  May also be set to strings "Infinity" and "-Infinity" for non-expiry and immediate-expiry, respectively. See setMaxAge()
         *
         * @type {Number}
         */
        this.maxAge = undefined

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
        this.path = undefined

        /**
         * the Secure cookie flag
         *
         * @type {String}
         */
        this.secure = undefined

        /**
         * the HttpOnly cookie flag
         *
         * @type {String}
         */
        this.httpOnly = undefined

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

        this.creation = undefined

        this.creationIndex = undefined
    }
}

export default RabiHttpCookie
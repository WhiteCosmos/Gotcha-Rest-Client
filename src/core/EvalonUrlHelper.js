class EvalonUrlHelper {
    /**
     * @param {string} urlStr
     */
    static getFileNameFromUrl(urlStr) {
        try {
            let url = require("url")

            let path = require("path")

            let parsed = new url.URL('', urlStr)

            return path.basename(parsed.pathname)
        } catch (e) {
            return ""
        }
    }

    static verifyUrl(urlStr) {
        try {
            new URL(urlStr)

            return true
        } catch (e) {
            return false
        }
    }

    static fetchUrl(urlStr) {

    }
}

export default EvalonUrlHelper
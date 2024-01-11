class GHCCookie {
    constructor() {
        this.key = ""

        this.value = ""

        this.domain = ""

        this.path = "/"

        this.expires = new Date('2049-12-25T14:48:00')

        this.httpOnly = false

        this.secure = false

        this.sameSite = ''

        // Custom Fields

        this.checkedStatus = "CHECKED"

        this.setCookie = false
    }
}

export default GHCCookie
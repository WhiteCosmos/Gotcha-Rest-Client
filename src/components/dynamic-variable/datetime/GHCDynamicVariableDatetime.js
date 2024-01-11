/**
 * @created_at 2022/5/29
 * @app_version 1.4.9
 */
import moment
    from 'moment'

class GHCDynamicVariableDatetime {
    constructor() {
        this.type = "DATETIME"

        this.now = 'CHECKED'

        this.format = "ISO-8601" // ISO-8601 | UNIX | TIMESTAMP | CUSTOM

        this.customFormat = 'YYYY-MM-DD hh:mm:ss' // If choose CUSTOM

        this.customDatetime = {
            YYYY: moment().year(),
            MM: moment().month(),
            DD: moment().day(),
            hh: '00',
            mm: '00',
            ss: '00',
        }

        this.offset = {
            YYYY: 0,
            MM: 0,
            DD: 0,
            hh: 0,
            mm: 0,
            ss: 0,
        }
    }
}

export default GHCDynamicVariableDatetime
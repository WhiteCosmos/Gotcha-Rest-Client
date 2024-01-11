/**
 * @created_at 2022/5/30
 * @app_version 1.4.9
 */
import GHCDynamicVariableDatetimeFormat
    from '@/components/dynamic-variable/datetime/GHCDynamicVariableDatetimeFormat'
import moment
    from 'moment'

class GHCDynamicVariableDatetimeRender {
    constructor() {

    }

    render(value) {
        try {
            let moment_

            if (value.now === 'CHECKED') {
                moment_ = moment()
                    .add(value.offset['YYYY'], 'years')
                    .add(value.offset['MM'], 'months')
                    .add(value.offset['DD'], 'days')
                    .add(value.offset['hh'], 'hours')
                    .add(value.offset['mm'], 'minutes')
                    .add(value.offset['ss'], 'seconds')

            } else {
                moment_ = moment.utc( // 使用UTC，我也不知道为什么
                    `${value.customDatetime.YYYY}-${value.customDatetime.MM}-${value.customDatetime.DD} ${value.customDatetime.hh}:${value.customDatetime.mm}:${value.customDatetime.ss}`,
                    'YYYY-MM-DD hh:mm:ss')
            }

            if (value.format === GHCDynamicVariableDatetimeFormat.ISO_8601) {
                return moment_.utc(true).toISOString()
            }

            if (value.format === GHCDynamicVariableDatetimeFormat.TIMESTAMP) {
                return moment_.utc(true).valueOf()
            }

            if (value.format === GHCDynamicVariableDatetimeFormat.UNIX) {
                return moment_.utc(true).unix()
            }

            if (value.format === GHCDynamicVariableDatetimeFormat.CUSTOM) {
                return moment_.utc(true).format(value.customFormat)
            }
        } catch (e) {
            return e.message
        }
    }
}

export default GHCDynamicVariableDatetimeRender
/**
 * @created_at 2022/7/26
 * @app_version 1.5.0
 */
class EvHttpClientRequestHeadersHelper {
    constructor() {

    }

    static getContentType(headers) {
        let item = headers.find(header => {
            let key = header.key

            return key && key.toLowerCase() === 'content-type'
        })

        if (item) {
            return item.value
        }
    }
}

export default EvHttpClientRequestHeadersHelper
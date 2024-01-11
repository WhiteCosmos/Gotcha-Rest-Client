class HttpClientConfiguration {
    constructor(props = {}) {
        /**
         * Can select request method and edit request url
         *
         * @type {boolean}
         */
        this.urlEditable = props.urlEditable || false
    }
}

export default HttpClientConfiguration
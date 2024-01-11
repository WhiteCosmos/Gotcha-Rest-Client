import Vue
    from 'vue'

export const EvHttpClientRequestHeadersEventBus = new Vue()

export const EvHttpClientRequestHeadersEvents = {
    ADD_REQUEST_HEADER: "ADD_REQUEST_HEADER",

    REMOVE_REQUEST_HEADER: "REMOVE_REQUEST_HEADER",

    RESET_REQUEST_HEADERS: "RESET_REQUEST_HEADERS",
}
import Vue
    from 'vue'

export const EvHttpClientEventBus = new Vue()

export const EvHttpClientEvents = {
    IMPORT_REQUEST_FROM_CURL: "IMPORT_REQUEST_FROM_CURL",

    // Request Life Circle

    SEND_REQUEST: "SEND_REQUEST",

    SEND_REQUEST_SUCCESS: "SEND_REQUEST_SUCCESS",

    SEND_REQUEST_FAILED: "SEND_REQUEST_FAILED",

    SEND_REQUEST_COMPLETE: "SEND_REQUEST_COMPLETE",

    CANCEL_REQUEST: "CANCEL_REQUEST",

    CANCEL_REQUEST_COMPLETE: "CANCEL_REQUEST_COMPLETE",

    // Request Events

    RESET_HEADER_PARAMETERS: "RESET_HEADER_PARAMETERS",

    RESET_PATH_PARAMETERS: "RESET_PATH_PARAMETERS",

    RESET_QUERY_PARAMETERS: "RESET_QUERY_PARAMETERS",

    SHOW_RESPONSE_BODY: "SHOW_RESPONSE_BODY",

    SHOW_RESPONSE_HEADER: "SHOW_RESPONSE_HEADER",

    // Request Parameter Events

    /**
     * Notify components who want to known current request method
     */
    MODIFY_REQUEST_METHOD: "MODIFY_REQUEST_METHOD",

    /**
     * Notify components who want to known current request path
     */
    MODIFY_REQUEST_PATH: "MODIFY_REQUEST_PATH",

    MODIFY_URL_PARAMETERS: "MODIFY_URL_PARAMETERS",

    // Header Events

    ADD_REQUEST_HEADER: "ADD_REQUEST_HEADER",

    REMOVE_REQUEST_HEADER: "REMOVE_REQUEST_HEADER",

    // Cookie Jar Events

    SELECT_COOKIE_JAR: "SELECT_COOKIE_JAR",

    // View Events

    MAKE_VIEW: "MAKE_VIEW",

    // Assertion Events

    ADD_JSONPATH_ASSERTION: "ADD_JSONPATH_ASSERTION"
}
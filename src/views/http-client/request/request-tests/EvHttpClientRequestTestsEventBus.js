import Vue
    from 'vue'

export const EvHttpClientRequestTestsEventBus = new Vue()

export const EvHttpClientRequestTestsEvents = {
    ADD_RESPONSE_HEADER_ASSERTION: "ADD_RESPONSE_HEADER_ASSERTION",

    ADD_RESPONSE_BODY_ASSERTION: "ADD_RESPONSE_BODY_ASSERTION"
}
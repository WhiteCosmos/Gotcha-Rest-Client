import Vue
    from 'vue'

export const EvHttpClientRequestBodyEventBus = new Vue()

export const EvHttpClientRequestBodyEvents = {
    RESET_APPLICATION_JSON_BODY: "RESET_APPLICATION_JSON_BODY",

    RESET_FORM_URLENCODED_BODY: "RESET_FORM_URLENCODED_BODY",

    RESET_MULTIPART_FORM_BODY: "RESET_MULTIPART_FORM_BODY",
}
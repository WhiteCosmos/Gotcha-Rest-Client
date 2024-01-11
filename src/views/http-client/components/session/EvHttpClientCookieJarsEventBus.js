import Vue
    from 'vue'

export const EvHttpClientCookieJarsEventBus = new Vue()

export const EvHttpClientCookieJarsEvents = {
    UPDATE_COOKIE_JAR: "UPDATE_COOKIE_JAR", // (cookieJar) => {}

    SWITCH_COOKIE_JAR: "SWITCH_COOKIE_JAR", // (cookieJar) => {}

    SAVE_COOKIE_JARS: "SAVE_COOKIE_JARS",

    RENAME_COOKIE_JAR: "RENAME_COOKIE_JAR",

    RENAME_COOKIE_JAR_DOMAIN: "RENAME_COOKIE_JAR_DOMAIN"
}

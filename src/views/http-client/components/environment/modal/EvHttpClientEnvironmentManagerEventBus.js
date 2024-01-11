import Vue
    from 'vue'

export const EvHttpClientEnvironmentManagerEventBus = new Vue()

export const EvHttpClientEnvironmentManagerEvents = {
    ADD_VARIABLE: "ADD_VARIABLE",

    REMOVE_VARIABLE: "REMOVE_VARIABLE",

    ADD_GROUP: "ADD_GROUP",

    REMOVE_GROUP: "REMOVE_GROUP",

    DUPLICATE_GROUP: "DUPLICATE_GROUP",

    ADD_ENVIRONMENT: "ADD_ENVIRONMENT",

    REMOVE_ENVIRONMENT: "REMOVE_ENVIRONMENT",

    DUPLICATE_ENVIRONMENT: "DUPLICATE_ENVIRONMENT"
}
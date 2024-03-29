import Vue
    from 'vue'

export const EvJsonSchemaManagerEventBus = new Vue()

export const EvJsonSchemaManagerEvents = {
    ADD_JSON_SCHEMA_GROUP: "ADD_JSON_SCHEMA_GROUP",

    RENAME_JSON_SCHEMA_GROUP: "RENAME_JSON_SCHEMA_GROUP",

    REMOVE_JSON_SCHEMA_GROUP: "REMOVE_JSON_SCHEMA_GROUP",

    SELECT_JSON_SCHEMA: "SELECT_JSON_SCHEMA",

    ADD_JSON_SCHEMA: "ADD_JSON_SCHEMA",

    REMOVE_JSON_SCHEMA: "REMOVE_JSON_SCHEMA",

    RENAME_JSON_SCHEMA: "RENAME_JSON_SCHEMA",

    CLONE_JSON_SCHEMA: "CLONE_JSON_SCHEMA"
}
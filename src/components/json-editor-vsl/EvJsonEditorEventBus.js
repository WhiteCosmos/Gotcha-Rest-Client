import Vue
    from 'vue'

export const EvJsonEditorEventBus = new Vue()

export const EvJsonEditorEvents = {
    ADD_PROPERTY: "ADD_PROPERTY",

    REMOVE_PROPERTY: "REMOVE_PROPERTY",

    COPY_PROPERTY: "COPY_PROPERTY",

    ADD_ITEM: "ADD_ITEM",

    REMOVE_ITEM: "REMOVE_ITEM",

    COPY_ITEM: "COPY_ITEM",

    EXPAND_ALL: "EXPAND_ALL",

    COLLAPSE_ALL: "COLLAPSE_ALL",

    TOGGLE: "TOGGLE",

    RESET: "RESET",

    CLEAR: "CLEAR",

    // Operation

    SELECT_JSON_NODE: "SELECT_JSON_NODE",

    COPY_JSON_NODE: "COPY_JSON_NODE",

    CUT_JSON_NODE: "CUT_JSON_NODE",

    PASTE_JSON_NODE: "PASTE_JSON_NODE",

    // Edit

    EDIT_COMPLETE: "EDIT_COMPLETE"
}
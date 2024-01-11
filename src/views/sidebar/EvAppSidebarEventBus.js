import Vue
    from 'vue'

export const EvAppSidebarEventBus = new Vue()

export const EvAppSidebarEvents = {
    EXPAND_ALL: "EXPAND_ALL",

    COLLAPSE_ALL: "COLLAPSE_ALL",

    AIM_TO_TARGET: "AIM_TO_TARGET",

    IMPORT_FROM_FILE: "IMPORT_FROM_FILE",

    IMPORT_FROM_URL: "IMPORT_FROM_URL",

    IMPORT_FROM_TEXT: "IMPORT_FROM_TEXT",

    IMPORT_FROM_FILE_COMPLETE: "IMPORT_FROM_FILE_COMPLETE"
}
import Vue
    from 'vue'

export const EvProjectImporterEventBus = new Vue()

export const EvProjectImporterEvents = {
    CHOOSE_FILE: "CHOOSE_FILE",

    CHOOSE_LINK: "CHOOSE_LINK",

    CHOOSE_FOLDER: "CHOOSE_FOLDER",

    NEW_PROJECT: "NEW_PROJECT",
}

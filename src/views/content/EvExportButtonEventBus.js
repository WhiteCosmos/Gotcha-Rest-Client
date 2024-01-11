import Vue
    from 'vue'

export const EvExportButtonEventBus = new Vue()

export const EvExportButtonEvents = {
    EXPORT_TO_HTML: "EXPORT_TO_HTML",

    PREPARE_TO_EXPORT: "PREPARE_TO_EXPORT",

    READY_TO_EXPORT: "READY_TO_EXPORT"
}
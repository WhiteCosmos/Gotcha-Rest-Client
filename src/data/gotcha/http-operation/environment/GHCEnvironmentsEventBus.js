import Vue
    from 'vue'

/**
 * @created_at 2021/12/5
 * @app_version 1.3.13
 */
export const GHCEnvironmentsEventBus = new Vue()

export const GHCEnvironmentsEvents = {
    CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",

    SAVE_ENVIRONMENTS: "SAVE_ENVIRONMENTS"
}
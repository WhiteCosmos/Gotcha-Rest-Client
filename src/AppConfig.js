const ENVIRONMENTS = {
    ALPHA: "ALPHA",

    BETA: "BETA",

    PRODUCTION: "PRODUCTION"
}

let environment = ENVIRONMENTS.PRODUCTION

let AppConfig = {
    isProduction() {
        return environment === ENVIRONMENTS.PRODUCTION
    },

    isDevelopment() {
        return environment === ENVIRONMENTS.ALPHA || environment === ENVIRONMENTS.BETA
    },

    alpha() {
        return environment === ENVIRONMENTS.ALPHA
    },

    beta() {
        return environment === ENVIRONMENTS.BETA
    },

    production() {
        return environment === ENVIRONMENTS.PRODUCTION
    },
}

export default AppConfig
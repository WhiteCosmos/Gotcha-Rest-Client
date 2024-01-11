module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

    chainWebpack: config => {
        config.module
            .rule('worker')
            .test(/\.worker\.js$/)
            .use('worker-loader')
            .loader('worker-loader')
            .end()

        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@intlify/vue-i18n-loader")
            .end()
    },
}
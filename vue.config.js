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

    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: "rest.gotcha.HttpClient",
                productName: "Gotcha",
                npmRebuild: false,
                mac: {
                    category: "public.app-category.developer-tools",
                    electronLanguages: ["en", "zh"],
                    hardenedRuntime: true,
                    entitlements: "build/entitlements.mac.plist",
                    entitlementsInherit: "build/entitlements.mac.plist",
                    provisioningProfile: "build/embedded.provisionprofile",
                    // provisioningProfile: "build/embedded_dev.provisionprofile", // open if need test
                    extendInfo: {
                        "ElectronTeamID": "4R7GF7Z7CV",
                    },
                    target: [
                        {
                            "target": "dmg",
                            "arch": [
                                "x64",
                                "arm64"
                            ]
                        }
                    ],
                    minimumSystemVersion: "10.15"
                },
            }
        }
    }
}
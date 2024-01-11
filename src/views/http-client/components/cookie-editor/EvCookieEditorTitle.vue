<template>
    <div class="ev-cookie-editor-title">
        <div class="ev-cookie-editor-title__icon-container">
            <!--            <ev-cookie-icon :send-cookies="sendCookies" :receive-cookies="receiveCookies"></ev-cookie-icon>-->
        </div>

        <ev-label size="12" bold secondary>{{ $t('cookies') }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label size="12" grey>/</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <!--        <ev-jar-icon></ev-jar-icon>-->

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-label size="12" bold secondary>{{ cookieJarName }}</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <div v-if="host" class="d-flex align-center">
            <ev-label size="12" grey>/</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="12" bold secondary>{{ host }}</ev-label>
        </div>

        <v-spacer></v-spacer>

        <ev-request-parameters-exporter @export="emitExportCookies" :options="options" v-if="sendCookies && host"></ev-request-parameters-exporter>

        <!--        <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>-->

        <!--        <ev-request-parameters-importer @import="emitImportCookies" :options="options"></ev-request-parameters-importer>-->

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-json-add-button @click.native="emitAddCookie" v-if="sendCookies && host"></ev-json-add-button>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvCookieIcon from '@/views/http-client/icon/ev-cookie-icon'
    import EvSendCookieIcon from '@/views/http-client/icon/ev-send-cookie-icon'
    import EvReceiveCookieIcon from '@/views/http-client/icon/ev-receive-cookie-icon'
    import EvJarIcon from '@/views/http-client/icon/ev-jar-icon'
    import EvHttpClientCookieJarDomainIcon from '@/views/http-client/components/session/EvHttpClientCookieJarDomainIcon'
    import EvRequestParameterImportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterImportIcon'
    import EvRequestParameterExportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterExportIcon'
    import EvRequestParametersExporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersExporter'
    import EvRequestParametersImporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersImporter'

    export default {
        name: "EvCookieEditorTitle",

        components: {
            EvRequestParametersImporter,
            EvRequestParametersExporter,
            EvRequestParameterExportIcon,
            EvRequestParameterImportIcon,
            EvHttpClientCookieJarDomainIcon,
            EvJarIcon,
            EvReceiveCookieIcon,
            EvSendCookieIcon,
            EvCookieIcon,
            EvJsonAddButton,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            httpRequest: Object,

            host: String,

            cookieJar: Object,

            sendCookies: Boolean,

            receiveCookies: Boolean,
        },

        computed: {
            cookieJarName() {
                if (!this.cookieJar) {
                    return
                }

                if (this.cookieJar.default) {
                    return this.$t('defaultCookieJar')
                }

                return this.cookieJar.name
            },

            options() {
                return {
                    importerPlaceholder: "key : value e.g",

                    importerLabel: this.$t('import'),

                    exporterLabel: this.$t('export'),
                }
            }
        },

        methods: {
            emitAddCookie() {
                this.$emit('add-cookie')
            },

            emitExportCookies(type) {
                this.$emit('export-cookies', type)
            },

            emitImportCookies(str) {
                this.$emit('import-cookies', str)
            },
        },

        i18n: {
            messages: {
                en: {
                    import: "Import",

                    export: "Export",

                    cookies: "Cookies",

                    defaultCookieJar: "Default Cookie Jar",
                },
                zh: {
                    import: "导入 Cookie",

                    export: "导出 Cookie",

                    cookies: "携带 Cookie",

                    defaultCookieJar: "默认 Cookie 罐",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-cookie-editor-title {
        display: flex;

        align-items: center;

        height: 28px;

        padding-right: 8px;

        border-top: 1px solid #F5F5F5;

        border-bottom: 1px solid #E0E0E0;

        user-select: none;

        &__icon-container {
            @include full-center;

            height: 28px;

            width: 24px;
        }

        &__cookie-jar {
            display: flex;

            align-items: flex-end;

            justify-self: flex-end;

            border-radius: 3px;

            height: 18px;

            padding-left: 4px;

            padding-right: 4px;

            border: 1px solid #007AFF;

            &__label {
                font-size: 10px;

                line-height: 14px;

                font-weight: 500;

                color: #007AFF;
            }

            &__host {
                font-size: 10px;

                line-height: 14px;

                font-weight: 500;

                color: $PRIMARY_FONT_COLOR;
            }
        }
    }
</style>

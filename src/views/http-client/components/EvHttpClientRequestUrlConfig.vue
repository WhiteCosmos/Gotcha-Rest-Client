<template>
    <div class="http-client-request-url-config">
        <div class="http-client-request-url-config__header">
            <ev-label secondary bold size="12">{{ $t('EvHttpClientRequestUrlParameters.url') }}</ev-label>

            <v-spacer></v-spacer>

            <ev-http-client-server-selector :http-request="httpRequest"></ev-http-client-server-selector>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-icon-wrapper @click.native="handleExportUrlConfigs('text')">
                <ev-copy-icon></ev-copy-icon>
            </ev-icon-wrapper>
        </div>

        <div class="http-client-request-url-config__row">
            <div class="http-client-request-url-config__row__key-part">
                <ev-label primary size="12" medium>{{ $t('EvHttpClientRequestUrlParameters.protocol') }}</ev-label>
            </div>

            <div class="http-client-request-url-config__row__value-part">
                <ev-http-client-scheme-switcher v-model="requestUrl.scheme"></ev-http-client-scheme-switcher>
            </div>
        </div>

        <div class="http-client-request-url-config__row">
            <div class="http-client-request-url-config__row__key-part">
                <ev-label primary size="12" medium>{{ $t('EvHttpClientRequestUrlParameters.host') }}</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-lock-icon color="#999" style="margin-top: 2px" v-if="hasServer"></ev-lock-icon>
            </div>

            <div class="http-client-request-url-config__row__value-part">
                <ev-label size="12" grey v-if="hasServer">{{ requestUrl.host || 'httpbin.org' }}</ev-label>

                <ev-dynamic-variable-input v-else
                                           v-model="requestUrl.host"
                                           placeholder="httpbin.org"
                                           :bulk-edit="false"></ev-dynamic-variable-input>

            </div>
        </div>

        <div class="http-client-request-url-config__row">
            <div class="http-client-request-url-config__row__key-part">
                <ev-label primary size="12" medium>{{ $t('EvHttpClientRequestUrlParameters.port') }}</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-lock-icon color="#999" style="margin-top: 2px" v-if="hasServer"></ev-lock-icon>
            </div>

            <div class="http-client-request-url-config__row__value-part">
                <ev-label size="12" grey v-if="hasServer">{{ requestUrl.port || portPlaceholder }}</ev-label>

                <ev-dynamic-variable-input v-else
                                           v-model="requestUrl.port"
                                           :placeholder="portPlaceholder"
                                           :bulk-edit="false"></ev-dynamic-variable-input>
            </div>
        </div>

        <div class="http-client-request-url-config__row">
            <div class="http-client-request-url-config__row__key-part">
                <ev-label primary size="12" medium>{{ $t('EvHttpClientRequestUrlParameters.basePath') }}</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-lock-icon color="#999" style="margin-top: 2px" v-if="hasServer"></ev-lock-icon>
            </div>

            <div class="http-client-request-url-config__row__value-part">
                <ev-label size="12" grey v-if="hasServer">{{ requestUrl.basePath || '/' }}</ev-label>

                <ev-dynamic-variable-input v-else
                                           v-model="requestUrl.basePath"
                                           placeholder="/"
                                           :bulk-edit="false"></ev-dynamic-variable-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import RabiHttpRequestUrl from '@/data/gotcha/http-operation/RabiHttpRequestUrl'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvHttpClientSchemeSwitcher from '@/views/http-client/components/EvHttpClientSchemeSwitcher'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'
    import EvRequestParameterExportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterExportIcon'
    import EvRequestParametersExporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersExporter'
    import EvRequestParametersImporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersImporter'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCHttpClientUrlHelper from '@/views/http-client/core/GHCHttpClientUrlHelper'
    import {clipboard} from 'electron'
    import EvHttpClientServerSelector from '@/views/http-client/components/EvHttpClientServerSelector.vue'
    import EvCopyIcon from '@/components/icon/ev-copy-icon.vue'
    import EvIconWrapper from '@/components/layout/EvIconWrapper.vue'
    import EvLockIcon from '@/assets/icon/ev-lock-icon.vue'
    import EvServerIcon from '@/views/http-client/icon/ev-server-icon.vue'

    export default {
        name: "EvHttpClientRequestUrlConfig",

        components: {
            EvServerIcon,
            EvLockIcon,
            EvIconWrapper,
            EvCopyIcon,
            EvHttpClientServerSelector,
            EvVerticalGutter,
            EvRequestParametersImporter,
            EvRequestParametersExporter,
            EvRequestParameterExportIcon,
            EvDynamicVariableInput,
            EvHttpClientSchemeSwitcher,
            EvBorderlessInput,
            EvLabel
        },

        mixins: [
            EvStoreMixin,
        ],

        props: {
            httpRequest: Object,
        },

        computed: {
            requestUrl() {
                if (this.hasServer) {
                    if (this.server.isBindEnvironment === 'UNCHECKED') {
                        return this.server.requestUrl
                    } else {
                        let env = this.currentEnvironment

                        return this.server.requestUrls[env.uid]
                    }
                } else {
                    return this.httpRequest.requestUrl
                }
            },

            portPlaceholder() {
                let protocol = this.requestUrl.scheme

                if (protocol === "http") {
                    return '80'
                }

                if (protocol === "https") {
                    return '443'
                }
            },

            hasServer() {
                return this.server !== undefined
            },

            server() {
                let servers = this.currentProject.servers

                return servers.find(it => {
                    return it.uid === this.httpRequest.serverId
                })
            },
        },

        i18n: {
            messages: {
                en: {
                    urlImporterLabel: "Import",

                    urlExporterLabel: "Export",
                },
                zh: {
                    urlImporterLabel: "导入",

                    urlExporterLabel: "导出",
                }
            }
        },

        data() {
            return {
                placeholder: "http:// ; https://"
            }
        },

        watch: {
            requestUrl: {
                deep: true,
                handler(newVal, oldVal) {
                    console.log("requestUrl", newVal.host, oldVal.host)

                    this.$emit('change')
                }
            },
        },

        methods: {
            handleExportUrlConfigs(type) {
                let builder = new GHCHttpClientUrlHelper(this.httpRequest, this.dynamicVariableRender)

                if (type === 'text') {
                    let url = builder.buildBaseUrl(this.httpRequest)

                    clipboard.writeText(url)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-request-url-config {
        display: flex;

        flex-direction: column;

        width: 100%;

        &__header {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 24px;

            padding-right: 6px;

            border-bottom: 1px solid #EAEAEA;
        }

        &__row {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 24px;

            padding-right: 12px;

            border-bottom: 1px solid #F1F1F1;

            &__key-part {
                display: flex;

                align-items: center;

                flex: 3;

                margin-right: 20px;
            }

            &__value-part {
                display: flex;

                align-items: center;

                flex: 4;

                flex-shrink: 0;
            }
        }
    }
</style>

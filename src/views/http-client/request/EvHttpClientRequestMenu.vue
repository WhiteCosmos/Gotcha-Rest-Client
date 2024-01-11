<template>
    <div class="ev-http-client-request-menu">
        <div class="ev-http-client-request-menu__part-a">
            <ev-http-client-request-menu-item v-for="m in menus"
                                              :menu="m"
                                              @click.native="doSelectMenu(m)"
                                              :active="checkIsSelectedMenu(m)"
                                              :enable="checkMenuHasContent(m)"></ev-http-client-request-menu-item>
        </div>

        <div class="ev-http-client-request-menu__part-b">
            <div class="ev-http-client-request-menu__icon-container">
            </div>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-popup-menu :config="menuConfig">
                <template slot="icon">
                    <div class="ev-http-client-request-menu__icon-container">
                        <ev-switcher-icon></ev-switcher-icon>
                    </div>
                </template>

                <template slot="items">
                    <ev-popup-menu-divider :label="$t('cookies')"></ev-popup-menu-divider>

                    <ev-popup-menu-toggle-item v-model="settings.sendCookies">{{ $t('sendCookies') }}</ev-popup-menu-toggle-item>

                    <ev-popup-menu-toggle-item v-model="settings.storeCookies">{{ $t('storeReceivedCookies') }}</ev-popup-menu-toggle-item>

                    <ev-popup-menu-divider :label="$t('redirect')"></ev-popup-menu-divider>

                    <ev-popup-menu-toggle-item v-model="settings.followRedirects">{{ $t('followRedirects') }}</ev-popup-menu-toggle-item>

                    <!--                    <ev-popup-menu-toggle-item v-model="settings.redirectAuthorization">Redirect Authorization</ev-popup-menu-toggle-item>-->

                    <ev-popup-menu-toggle-item v-model="settings.redirectOriginalMethod">{{ $t('redirectOriginalMethod') }}</ev-popup-menu-toggle-item>

                    <ev-popup-menu-compose-item :compose="settings.maximumRedirects">{{ $t('maximum') }}</ev-popup-menu-compose-item>

                    <ev-popup-menu-divider :label="$t('timeout')"></ev-popup-menu-divider>

                    <ev-popup-menu-compose-item :compose="settings.timeout">{{ $t('duration') }}</ev-popup-menu-compose-item>

                    <ev-popup-menu-divider :label="$t('proxy')"></ev-popup-menu-divider>

                    <ev-popup-menu-radio-item name="SYSTEM" v-model="settings.proxy">{{ $t('followSystemProxy') }}</ev-popup-menu-radio-item>

                    <ev-popup-menu-radio-item name="DISABLE" v-model="settings.proxy">{{ $t('disableProxy') }}</ev-popup-menu-radio-item>

                    <!--                    <ev-popup-menu-divider></ev-popup-menu-divider>-->

                    <!--                    <ev-popup-menu-item>OK</ev-popup-menu-item>-->
                </template>
            </ev-popup-menu>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-vertical-gutter :gutter="8" v-if="isTemplateMode"></ev-vertical-gutter>

            <ev-popup-menu :config="menuConfig_2" v-if="!isTemplateMode">
                <template slot="icon">
                    <div class="ev-http-client-request-menu__icon-container">
                        <ev-export-icon></ev-export-icon>
                    </div>
                </template>

                <template slot="items">
                    <ev-popup-menu-item @click.native="doCopyAsCURL">{{ $t('copyAs') }} cURL</ev-popup-menu-item>

                    <ev-popup-menu-item @click.native="doCopyAsMarkdown">{{ $t('copyAs') }} Markdown</ev-popup-menu-item>
                </template>
            </ev-popup-menu>
        </div>


    </div>
</template>

<script>
import EvHttpClientMenuMixin from '@/views/http-client/mixins/EvHttpClientMenuMixin'
import _ from 'lodash'
import EvHttpClientRequestMenuItem from '@/views/http-client/request/EvHttpClientRequestMenuItem'
import GHCHttpRequestPayloadType from '@/data/gotcha/http-operation/payload/GHCHttpRequestPayloadType'
import EvToolButton from '@/components/button/EvToolButton'
import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
import EvSwitcherIcon from '@/components/icon/EvSwitcherIcon'
import EvExportIcon from '@/views/http-client/icon/ev-export-icon'
import EvWorkflowIcon from '@/views/http-client/icon/ev-workflow-icon'
import EvPopupMenu from '@/components/menu/EvPopupMenu'
import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'
import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
import EvPopupMenuToggleItem from '@/components/menu/EvPopupMenuToggleItem'
import EvLeftArrowIcon from '@/views/http-client/icon/ev-left-arrow-icon'
import EvRightArrowIcon from '@/views/http-client/icon/ev-right-arrow-icon'
import EvDbLeftArrowIcon from '@/views/http-client/icon/ev-db-left-arrow-icon'
import EvDbRightArrowIcon from '@/views/http-client/icon/ev-db-right-arrow-icon'
import EvPopupMenuComposeItem from '@/components/menu/EvPopupMenuComposeItem'
import EvRadio from '@/components/form/EvRadio'
import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
import GHCHttpClientCURLBuilder from '@/views/http-client/core/GHCHttpClientCURLBuilder'
import EvDocumentIcon from '@/components/icon/EvDocumentIcon'
import {
    EvCookieEditorEventBus,
    EvCookieEditorEvents
} from '@/views/http-client/components/cookie-editor/EvCookieEditorEventBus'
import GHCHttpClientRequestDocsExporter from '@/views/http-client/request/request-docs/GHCHttpClientRequestDocsExporter'
import {clipboard} from 'electron'
import EvStoreMixin from '@/mixins/EvStoreMixin'
import EvDialogMixin from '@/mixins/EvDialogMixin'
import EvHttpClientCodeSnippetsManager from '@/views/http-client/request/code-snippets/EvHttpClientCodeSnippetsManager'

export default {
    name: "EvHttpClientRequestMenu",

    components: {
        EvHttpClientCodeSnippetsManager,
        EvDocumentIcon,
        EvPopupMenuRadioItem,
        EvRadio,
        EvPopupMenuComposeItem,
        EvDbRightArrowIcon,
        EvDbLeftArrowIcon,
            EvRightArrowIcon,
            EvLeftArrowIcon,
            EvPopupMenuToggleItem,
            EvPopupMenuDivider,
            EvPopupMenuItem,
            EvPopupMenu,
            EvWorkflowIcon,
            EvExportIcon,
            EvSwitcherIcon,
            EvVerticalGutter,
            EvToolButton,
            EvHttpClientRequestMenuItem
        },

        mixins: [
            EvHttpClientMenuMixin,
            EvStoreMixin,
            EvDialogMixin,
        ],

        created() {
            this.menus = [
                this.requestMenus.description,
                this.requestMenus.requestHeaders,
                this.requestMenus.requestParameters,
                this.requestMenus.requestBody,
                this.requestMenus.authorization,
                this.requestMenus.assertion,
            ]

            this.menu_ = this.menu

            // 是否存在Cookie需要通过事件单独判定
            EvCookieEditorEventBus.$on(EvCookieEditorEvents.INITIALIZE_COOKIES_FINISHED, this.handleInitializeCookieFinished)
        },

        beforeDestroy() {
            EvCookieEditorEventBus.$off(EvCookieEditorEvents.INITIALIZE_COOKIES_FINISHED, this.handleInitializeCookieFinished)
        },

        model: {
            prop: 'menu',

            event: 'change',
        },

        props: {
            menu: Object,

            httpRequest: Object,

            configuration: Object,
        },

        watch: {
            menu() {
                this.menu_ = this.menu
            }
        },

        data() {
            return {
                menus: [],

                menu_: undefined,

                menuConfig: {
                    'nudge-left': 76,
                    'close-on-content-click': false,
                },

                menuConfig_2: {
                    'nudge-left': 54,
                    'close-on-content-click': true,
                },

                hasCookie: false,

                showCodeSnippetsModal: false,
            }
        },

        computed: {
            settings() {
                return this.httpRequest.settings
            },

            isTemplateMode() {
                return this.configuration.template === true
            },
        },

        methods: {
            handleInitializeCookieFinished(httpRequest, cookies) {
                if (this.httpRequest.uid === httpRequest.uid) {
                    this.hasCookie = !_.isEmpty(cookies)
                }
            },

            doSelectMenu(m) {
                this.menu_ = m

                this.$emit('change', this.menu_)
            },

            checkIsSelectedMenu(m) {
                return this.menu_.type === m.type
            },

            checkMenuHasContent(m) {
                if (m.type === this.requestMenus.description.type) {
                    let requestUrl = this.httpRequest.requestUrl

                    if (requestUrl.host) {
                        return true
                    }
                }

                if (m.type === this.requestMenus.authorization.type) {
                    let authorization = this.httpRequest.authorization

                    return authorization && authorization.type !== GHCHttpRequestPayloadType.NONE
                }

                if (m.type === this.requestMenus.requestHeaders.type) {
                    return !_.isEmpty(this.httpRequest.headers) || this.hasCookie
                }

                if (m.type === this.requestMenus.requestParameters.type) {
                    let requestUrl = this.httpRequest.requestUrl

                    if (requestUrl.host) {
                        return true
                    }

                    return !_.isEmpty(this.httpRequest.pathParameters) || !_.isEmpty(this.httpRequest.queryParameters)
                }

                if (m.type === this.requestMenus.requestBody.type) {
                    let payload = this.httpRequest.payload

                    return payload.type !== GHCHttpRequestPayloadType.NONE
                }

                if (m.type === this.requestMenus.assertion.type) {
                    let assertion = this.httpRequest.assertion

                    if (!assertion) {
                        return false
                    }

                    return !_.isEmpty(assertion.headers) || !_.isEmpty(assertion.jsonPaths)
                }

                return false
            },

            doCopyAsCURL() {
                let builder = new GHCHttpClientCURLBuilder(this.currentCookieJar, this.dynamicVariableRender)

                let cURL = builder.build(this.httpRequest)

                clipboard.writeText(cURL)
            },

            doCopyAsMarkdown() {
                let exporter = new GHCHttpClientRequestDocsExporter(this.currentCookieJar, this.dynamicVariableRender)

                let md = exporter.exportToMarkdown(this.httpRequest)

                clipboard.writeText(md)
            },

            doOpenCodeSnippets() {

            },
        },

        i18n: {
            messages: {
                en: {
                    cookies: "Cookies",

                    sendCookies: "Send Cookies",

                    storeReceivedCookies: "Store Received Cookies",

                    redirect: "Redirect",

                    followRedirects: "Follow Redirects",

                    redirectOriginalMethod: "Redirect Original Method",

                    maximum: "Maximum",

                    timeout: "Timeout (seconds)",

                    duration: "Duration",

                    proxy: "Proxy",

                    followSystemProxy: "Follow System Proxy",

                    disableProxy: "Disable Proxy",

                    copyAs: "Copy as "
                },
                zh: {
                    cookies: "Cookie 设置",

                    sendCookies: "发送 Cookie",

                    storeReceivedCookies: "存储收到的 Cookie",

                    redirect: "重定向",

                    followRedirects: "跟随重定向",

                    redirectOriginalMethod: "覆盖重定向方法",

                    maximum: "最大次数",

                    timeout: "超时设置",

                    duration: "等待时间(秒)",

                    proxy: "代理设置",

                    followSystemProxy: "使用系统代理",

                    disableProxy: "不使用代理",

                    copyAs: "复制到 "
                },
                zh_TW: {
                    "cookies": "Cookie 設置",
                    "sendCookies": "發送 Cookie",
                    "storeReceivedCookies": "存儲收到的 Cookie",
                    "redirect": "重定向",
                    "followRedirects": "跟隨重定向",
                    "redirectOriginalMethod": "覆蓋重定向方法",
                    "maximum": "最大次數",
                    "timeout": "超時設置",
                    "duration": "等待時間(秒)",
                    "proxy": "代理設置",
                    "followSystemProxy": "使用系統代理",
                    "disableProxy": "不使用代理",
                    "copyAs": "複製到 "
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-menu {
        display: flex;

        height: 40px;

        width: 100%;

        align-items: center;

        justify-content: center;

        &__part-a {
            display: flex;

            align-items: center;

            justify-content: center;

            flex: 1;
        }

        &__part-b {
            display: flex;

            justify-content: flex-end;

            width: 64px;

            padding-bottom: 4px;
        }

        &__icon-container {
            height: 20px;

            display: flex;

            align-items: flex-end;
        }
    }
</style>

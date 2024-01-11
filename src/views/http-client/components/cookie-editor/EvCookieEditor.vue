<template>
    <div class="ev-cookie-editor">
        <ev-cookie-editor-title :http-request="httpRequest"
                                :host="currentHost"
                                :cookie-jar="currentCookieJar"
                                :send-cookies="sendCookies"
                                :receive-cookies="receiveCookies"
                                @export-cookies="handleExportCookies"
                                @import-cookies="handleImportCookies"
                                @add-cookie="handleAddCookie"></ev-cookie-editor-title>

        <ev-cookie-editor-header v-model="checkedStatus_"></ev-cookie-editor-header>

        <ev-cookie-editor-item v-if="sendCookies"
                               v-for="(cookie, idx) in cookies"
                               :ref="'ev-cookie-editor-item-' + idx"
                               :key="idx"
                               :cookie="cookie"
                               @update-cookie="handleUpdateCookie"
                               @remove-cookie="handleRemoveCookie"></ev-cookie-editor-item>

        <ev-cookie-editor-ghost-item v-if="sendCookies"
                                     @ghost-key-input="handleGhostKeyInput"
                                     @ghost-value-input="handleGhostValueInput"></ev-cookie-editor-ghost-item>

        <ev-cookie-editor-placeholder v-if="!sendCookies" :label="placeholder"></ev-cookie-editor-placeholder>
    </div>
</template>

<script>
    import EvCookieEditorHeader from '@/views/http-client/components/cookie-editor/EvCookieEditorHeader'
    import EvCookieEditorTitle from '@/views/http-client/components/cookie-editor/EvCookieEditorTitle'
    import EvCookieEditorDivider from '@/views/http-client/components/cookie-editor/EvCookieEditorDivider'
    import EvCookieEditorPlaceholder from '@/views/http-client/components/cookie-editor/EvCookieEditorPlaceholder'
    import _ from 'lodash'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import tough from 'tough-cookie'
    import EvCookieEditorItem from '@/views/http-client/components/cookie-editor/EvCookieEditorItem'
    import EvCookieEditorGhostItem from '@/views/http-client/components/cookie-editor/EvCookieEditorGhostItem'
    import draggable from 'vuedraggable'
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'
    import GHCCookie from '@/data/gotcha/http-operation/cookie/GHCCookie'
    import GHCCookieJarDomain from '@/data/gotcha/http-operation/cookie/GHCCookieJarDomain'
    import GHCEnvironmentVariablesNunjucksRender from '@/data/gotcha/http-operation/environment/GHCEnvironmentVariablesNunjucksRender'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'
    import {EvCookieEditorEventBus, EvCookieEditorEvents} from '@/views/http-client/components/cookie-editor/EvCookieEditorEventBus'
    import {clipboard} from 'electron'

    export default {
        name: "EvCookieEditor",

        components: {
            EvCookieEditorGhostItem,
            EvCookieEditorItem,
            EvCookieEditorPlaceholder,
            EvCookieEditorDivider,
            EvCookieEditorTitle,
            EvCookieEditorHeader,
            draggable
        },

        mixins: [
            EvStoreMixin,
            EvCheckedStatusMixin
        ],

        created() {
            this.initializeCookies()

            EvHttpClientCookieJarsEventBus.$on(EvHttpClientCookieJarsEvents.SWITCH_COOKIE_JAR, this.initializeCookies)

            EvHttpClientCookieJarsEventBus.$on(EvHttpClientCookieJarsEvents.UPDATE_COOKIE_JAR, this.initializeCookies)
        },

        beforeDestroy() {
            EvHttpClientCookieJarsEventBus.$off(EvHttpClientCookieJarsEvents.SWITCH_COOKIE_JAR, this.initializeCookies)

            EvHttpClientCookieJarsEventBus.$off(EvHttpClientCookieJarsEvents.UPDATE_COOKIE_JAR, this.initializeCookies)
        },

        props: {
            httpRequest: Object,
        },

        data() {
            return {
                cookies: [],

                checkedStatus_: "CHECKED",
            }
        },

        watch: {
            currentHost() {
                this.initializeCookies()
            },

            checkedStatus_(newVal) {
                if (newVal === "CHECKED") {
                    this.toEveryChecked(this.cookies)

                    // this.emitUpdateItems()
                }

                if (newVal === "UNCHECKED") {
                    this.toEveryUnchecked(this.cookies)

                    // this.emitUpdateItems()
                }
            }
        },

        computed: {
            currentHost() {
                let requestUrl = this.dynamicVariableRender.getCurrentRequestUrl(this.httpRequest)

                let host = requestUrl.host || ''

                return this.dynamicVariableRender.render(host)
            },

            currentDomain() {
                let cookieJar = this.currentCookieJar

                return cookieJar.domains.find(it => {
                    return it.name === this.currentHost
                })
            },

            noCookies() {
                return _.isEmpty(this.cookies)
            },

            sendCookies() {
                let settings = this.httpRequest.settings

                return settings.sendCookies && !_.isEmpty(this.currentHost)
            },

            receiveCookies() {
                let settings = this.httpRequest.settings

                return settings.storeCookies && !_.isEmpty(this.currentHost)
            },

            placeholder() {
                if (!this.currentHost) {
                    return this.$t('noHost')
                }

                if (!this.sendCookies && !this.receiveCookies) {
                    return this.$t('disableSendAndReceive')
                }

                if (!this.sendCookies) {
                    return this.$t('disableSend')
                }

                if (this.noCookies) {
                    return this.$t('noCookies')
                }
            }
        },

        methods: {
            initializeCookies() {
                this.cookies = []

                let cookieJar = this.currentCookieJar

                if (!cookieJar) {
                    this.cookies = []

                    return
                }

                let matchedDomains = cookieJar.domains.filter(domain => {
                    return tough.domainMatch(this.currentHost, domain.name, true)
                })

                if (_.isEmpty(matchedDomains)) {
                    this.cookies = []

                    return
                }

                matchedDomains.forEach(domain => {
                    this.cookies.push(...domain.cookies)
                })

                EvCookieEditorEventBus.$emit(EvCookieEditorEvents.INITIALIZE_COOKIES_FINISHED, this.httpRequest, this.cookies)
            },

            handleAddCookie(key, value) {
                if (!this.currentDomain) {
                    let domain = new GHCCookieJarDomain()

                    domain.name = this.currentHost

                    this.currentCookieJar.domains.push(domain)
                }

                let cookie = new GHCCookie()

                cookie.key = key || ""

                cookie.value = value || ""

                cookie.domain = this.currentHost

                this.currentDomain.cookies.push(cookie)

                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.SAVE_COOKIE_JARS)

                this.initializeCookies()
            },

            handleUpdateCookie() {
                if (this.isEveryChecked(this.cookies)) {
                    this.checkedStatus_ = "CHECKED"
                } else if (this.isAnyChecked(this.cookies)) {
                    this.checkedStatus_ = "HALF_CHECKED"
                } else if (this.isNullChecked(this.cookies)) {
                    this.checkedStatus_ = "UNCHECKED"
                }

                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.SAVE_COOKIE_JARS)
            },

            handleRemoveCookie(cookie) {
                let matchedDomain = this.currentCookieJar.domains.find(domain => {
                    return cookie.domain === domain.name
                })

                if (matchedDomain) {
                    matchedDomain.cookies.splice(matchedDomain.cookies.indexOf(cookie), 1)

                    EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.SAVE_COOKIE_JARS)

                    this.initializeCookies()
                }
            },

            handleGhostKeyInput(ghostKey) {
                this.handleAddCookie(ghostKey, "")

                this.$nextTick(() => {
                    let item = this.$refs['ev-cookie-editor-item-' + (this.cookies.length - 1)][0]

                    item.focusOnKey()
                })
            },

            handleGhostValueInput(ghostValue) {
                this.handleAddCookie("", ghostValue)

                this.$nextTick(() => {
                    let item = this.$refs['ev-cookie-editor-item-' + (this.cookies.length - 1)][0]

                    item.focusOnValue()
                })
            },

            handleExportCookies(type) {
                let cookies = this.cookies

                if (type === 'text') {
                    let text = ''

                    cookies.forEach(cookie => {
                        text += `${cookie.key} : ${this.dynamicVariableRender.render(cookie.value)}\n`
                    })

                    clipboard.writeText(text)
                }

                if (type === 'json') {
                    let json = {}

                    cookies.forEach(cookie => {
                        json[cookie.key] = this.dynamicVariableRender.render(cookie.value)
                    })

                    let jsonStr = JSON.stringify(json, null, 2)

                    clipboard.writeText(jsonStr)
                }
            },

            handleImportCookies(str) {
                // todo

                /*
                1. set-cookie 格式
                2. cookie: aaa=bbb 格式
                3. key-value 格式
                4. json 格式
                 */


            },
        },

        i18n: {
            messages: {
                en: {
                    disableSend: "Send Cookies Disabled",

                    disableSendAndReceive: "Send & Receive Cookies Disabled",

                    noHost: "No Host",

                    noCookies: "No Cookies",
                },
                zh: {
                    disableSend: "发送 Cookie 已关闭",

                    disableSendAndReceive: "发送和接收 Cookie 已关闭",

                    noHost: "未填写域名",

                    noCookies: "当前域名未携带 Cookie",
                },
                jp: {
                    disableSend: "Cookie送信はオフになっています",

                    disableSendAndReceive: "Cookieの送受信はオフになっています",

                    noHost: "ドメインが入力されていません",

                    noCookies: "現在のドメインにCookieが含まれていません",
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-cookie-editor {
        display: flex;

        flex-direction: column;
    }
</style>

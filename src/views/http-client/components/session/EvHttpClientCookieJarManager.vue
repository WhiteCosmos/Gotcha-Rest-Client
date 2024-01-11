<template>
    <div class="ev-http-client-cookie-jar-manager">
        <ev-http-client-cookie-jar-manager-sidebar
            @close="doClose"
            :cookie-jars="cookieJars"
            :selected-cookie-jar="selectedCookieJar"
            :selected-cookie-jar-domain="selectedCookieJarDomain"
            @add-cookie-jar="handleAddCookieJar"
            @add-cookie-jar-domain="handleAddDomain"
            @select-cookie-jar="handleSelectCookieJar"
            @select-cookie-jar-domain="handleSelectCookieJarDomain"></ev-http-client-cookie-jar-manager-sidebar>

        <div class="ev-http-client-cookie-jar-manager__content">
            <div class="ev-http-client-cookie-jar-manager__content__title">
                <ev-label size="11" bold secondary>{{ cookieJarName }}</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" grey>/</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" bold secondary>{{ domainName }}</ev-label>

                <v-spacer></v-spacer>

                <ev-label bold blue size="11" @click.native="handleAddCookie">{{ $t('newCookie') }}</ev-label>

                <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>
            </div>

            <div class="ev-http-client-cookie-jar-manager__content__body">
                <ev-http-client-cookie-jar-table :selected-cookie-jar="selectedCookieJar"
                                                 :selected-cookie-jar-domain="selectedCookieJarDomain"
                                                 @remove-cookie="handleRemoveCookie"></ev-http-client-cookie-jar-table>
            </div>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import EvHttpClientEnvironmentAddButton from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentAddButton'
    import EvHttpClientCookieJarTable from '@/views/http-client/components/session/EvHttpClientCookieJarTable'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'

    import draggable from 'vuedraggable'
    import EvHttpClientCookieJarItem from '@/views/http-client/components/session/EvHttpClientCookieJarItem'
    import EvHttpClientCookieJarManagerSidebar from '@/views/http-client/components/session/EvHttpClientCookieJarManagerSidebar'
    import GHCCookieJar from '@/data/gotcha/http-operation/cookie/GHCCookieJar'
    import GHCCookieJarDomain from '@/data/gotcha/http-operation/cookie/GHCCookieJarDomain'

    import _ from 'lodash'
    import GHCCookie from '@/data/gotcha/http-operation/cookie/GHCCookie'
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'

    export default {
        name: "EvHttpClientCookieJarManager",

        components: {
            EvHttpClientCookieJarManagerSidebar,
            EvHttpClientCookieJarItem,
            EvHttpClientDivider,
            EvHttpClientCookieJarTable,
            EvHttpClientEnvironmentAddButton,
            EvLabel,
            EvVerticalGutter,
            EvCircleCloseButton,
            draggable
        },

        created() {
            if (!_.isEmpty(this.cookieJars)) {
                this.selectedCookieJar = this.cookieJars[0]
            }
        },

        props: {
            cookieJars: Array
        },

        watch: {
            currentProject(newVal) {
                if (newVal) {
                    this.selectedCookieJar = undefined

                    this.selectedCookieJarDomain = undefined
                }
            },
        },

        data() {
            return {
                selectedCookieJar: undefined,

                selectedCookieJarDomain: undefined,
            }
        },

        computed: {
            cookieJarName() {
                if (!this.selectedCookieJar) {
                    return ''
                }

                if (this.selectedCookieJar.default) {
                    return this.$t('defaultCookieJar')
                } else {
                    return this.selectedCookieJar.name
                }
            },

            domainName() {
                return this.selectedCookieJarDomain ? this.selectedCookieJarDomain.name : this.$t('allDomains')
            },

            newCookieAvailable() {
                return this.selectedCookieJarDomain !== undefined
            },
        },

        methods: {
            doClose() {
                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.SAVE_COOKIE_JARS)

                this.$emit('close')
            },

            handleAddCookieJar() {
                let cookieJar = new GHCCookieJar()

                cookieJar.name = `New Cookie Jar (${this.cookieJars.length})`

                this.cookieJars.push(cookieJar)
            },

            handleAddDomain(cookieJar) {
                let domains = cookieJar.domains

                let cookieJarDomain = new GHCCookieJarDomain()

                cookieJarDomain.name = `example.com`

                cookieJarDomain.canonicalName = cookieJarDomain.name

                domains.push(cookieJarDomain)
            },

            handleAddCookie() {
                if (!this.newCookieAvailable) {
                    return
                }

                let domain = this.selectedCookieJarDomain

                let cookie = new GHCCookie()

                cookie.domain = domain.name

                domain.cookies.push(cookie)
            },

            handleRemoveCookie(cookie) {

            },

            handleSelectCookieJar(cookieJar) {
                this.selectedCookieJar = cookieJar

                this.selectedCookieJarDomain = undefined
            },

            handleSelectCookieJarDomain(cookieJar, cookieJarDomain) {
                this.selectedCookieJar = cookieJar

                this.selectedCookieJarDomain = cookieJarDomain
            }
        },

        i18n: {
            messages: {
                en: {
                    newCookie: "New Cookie",

                    allDomains: "All Domains",

                    defaultCookieJar: "Default Cookie Jar",
                },
                zh: {
                    newCookie: "添加 Cookie",

                    allDomains: "所有域名",

                    defaultCookieJar: "默认 Cookie 罐",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-cookie-jar-manager {
        display: flex;

        overflow: hidden;

        background-color: #FCFCFC;

        width: 960px;

        height: 640px;

        border-radius: 5px;

        &__content {
            display: flex;

            flex-direction: column;

            flex: 1;

            min-width: 1px;

            min-height: 1px;

            overflow-x: overlay;

            &__title {
                display: flex;

                align-items: center;

                height: 40px;

                flex-shrink: 0;

                padding-left: 8px;

                padding-right: 16px;

                border-bottom: 1px solid #E0E0E0;

                &__search-wrapper {
                    display: flex;

                    width: 240px;

                    height: 24px;

                    border: 1px solid #D8D8D8;

                    border-radius: 3px;

                    background-color: #FAFAFA;
                }
            }

            &__body {
                display: flex;

                min-width: 1px;

                min-height: 1px;

                height: calc(100% - 40px);

                flex-direction: column;
            }
        }
    }
</style>

<template>
    <div class="ev-http-client-cookie-jar-manager-sidebar">
        <div class="ev-http-client-cookie-jar-manager-sidebar__title">
            <ev-circle-close-button @click.native="onClose"></ev-circle-close-button>

            <ev-vertical-gutter :gutter="40"></ev-vertical-gutter>

            <ev-label size="11" bold primary>{{ $t('cookieJars') }}</ev-label>

            <v-spacer></v-spacer>

            <ev-http-client-add-cookie-jar-button @click.native="emitAddCookieJar"></ev-http-client-add-cookie-jar-button>

            <ev-vertical-gutter :gutter="17"></ev-vertical-gutter>
        </div>

        <div class="ev-http-client-cookie-jar-manager-sidebar__scroll-wrapper">
            <draggable v-model="cookieJars"
                       handle=".ev-http-client-cookie-jar-item"
                       animation="200">
                <ev-http-client-cookie-jar-item v-for="cookieJar in cookieJars"
                                                :key="cookieJar.uid"
                                                :cookie-jar="cookieJar"
                                                :selected-cookie-jar="selectedCookieJar"
                                                :selected-cookie-jar-domain="selectedCookieJarDomain"
                                                @add-cookie-jar-domain="emitAddCookieJarDomain"
                                                @remove-cookie-jar="emitRemoveCookieJar"
                                                @remove-cookie-jar-domain="handleRemoveCookieJarDomain"
                                                @select-cookie-jar="emitSelectCookieJar"
                                                @select-cookie-jar-domain="emitSelectCookieJarDomain"
                                                @show-context-menu="handleShowContextMenu"></ev-http-client-cookie-jar-item>
            </draggable>

            <div class="d-flex flex-shrink-0" style="height: 16px"></div>
        </div>

        <ev-http-client-cookie-jar-context-menu ref="ev-http-client-cookie-jar-context-menu"
                                                :selected-cookie-jar="selectedCookieJar"
                                                :selected-cookie-jar-domain="selectedCookieJarDomain"
                                                @add-cookie="handleAddCookie(selectedCookieJarDomain)"
                                                @add-cookie-jar-domain="emitAddCookieJarDomain"
                                                @rename-cookie-jar-domain="emitRenameCookieJarDomain"
                                                @rename-cookie-jar="emitRenameCookieJar"
                                                @clear-cookie-jar="handleClearCookieJar"
                                                @remove-cookie-jar="handleRemoveCookieJar"
                                                @clear-cookie-jar-domain="handleClearCookieJarDomain"
                                                @remove-cookie-jar-domain="handleRemoveCookieJarDomain"></ev-http-client-cookie-jar-context-menu>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import draggable from 'vuedraggable'
    import EvHttpClientCookieJarItem from '@/views/http-client/components/session/EvHttpClientCookieJarItem'
    import EvHttpClientEnvironmentAddButton from '@/views/http-client/components/environment/modal/EvHttpClientEnvironmentAddButton'
    import EvHttpClientAddVariableIcon from '@/views/http-client/components/environment/modal/EvHttpClientAddVariableIcon'
    import EvHttpClientCookieJarMixin from '@/views/http-client/components/session/EvHttpClientCookieJarMixin'
    import EvHttpClientAddCookieJarButton from '@/views/http-client/components/session/EvHttpClientAddCookieJarButton'
    import EvHttpClientCookieJarContextMenu from '@/views/http-client/components/session/EvHttpClientCookieJarContextMenu'
    import GHCCookie from '@/data/gotcha/http-operation/cookie/GHCCookie'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'

    export default {
        name: "EvHttpClientCookieJarManagerSidebar",

        components: {
            EvHttpClientCookieJarContextMenu,
            EvHttpClientAddCookieJarButton,
            EvHttpClientAddVariableIcon,
            EvHttpClientEnvironmentAddButton,
            EvHttpClientCookieJarItem,
            EvLabel,
            EvVerticalGutter,
            EvCircleCloseButton,
            draggable
        },

        mixins: [
            EvHttpClientCookieJarMixin,
            EvStoreMixin,
        ],

        props: {
            cookieJars: Array,

            selectedCookieJar: Object,

            focusedCookieJar: Object,

            selectedCookieJarDomain: Object,

            focusedCookieJarDomain: Object,
        },

        data() {
            return {}
        },

        computed: {},

        methods: {
            onClose() {
                this.$emit('close')
            },

            handleShowContextMenu(event, cookieJar, cookieJarDomain) {
                this.emitSelectCookieJar(cookieJar)

                cookieJarDomain && this.emitSelectCookieJarDomain(cookieJar, cookieJarDomain)

                this.$refs['ev-http-client-cookie-jar-context-menu'].show(event)
            },

            handleAddCookie(cookieJarDomain) {
                let cookie = new GHCCookie()

                cookie.domain = cookieJarDomain.name

                cookieJarDomain.cookies.push(cookie)
            },

            handleClearCookieJar(cookieJar) {
                cookieJar.domains = []
            },

            handleClearCookieJarDomain(cookieJarDomain) {
                cookieJarDomain.cookies = []
            },

            handleRemoveCookieJar(cookieJar) {
                if (cookieJar.default) {
                    return
                }

                this.cookieJars.splice(this.cookieJars.indexOf(cookieJar), 1)

                if (this.cookieJars.length !== 0) {
                    this.selectedCookieJar = this.cookieJars[this.cookieJars.length - 1]

                    this.emitSelectCookieJar(this.selectedCookieJar)

                    EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.SWITCH_COOKIE_JAR, this.selectedCookieJar)
                }
            },

            handleRemoveCookieJarDomain(cookieJarDomain) {
                let cookieJar = this.selectedCookieJar

                cookieJar.domains.splice(cookieJar.domains.indexOf(cookieJarDomain), 1)
            },

            handleRenameCookieJarDomain() {

            },
        },

        i18n: {
            messages: {
                en: {
                    cookieJars: "Cookie Jars"
                },
                zh: {
                    cookieJars: "全部 Cookie 罐"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-cookie-jar-manager-sidebar {
        display: flex;

        flex-direction: column;

        width: 240px;

        height: 100%;

        border-right: 1px solid #E0E0E0;

        background-color: #F5F5F5;

        &__title {
            display: flex;

            align-items: center;

            width: 100%;

            height: 40px;

            padding-left: 12px;

            border-bottom: 1px solid #E0E0E0;
        }

        &__scroll-wrapper {
            display: flex;

            flex-direction: column;

            overflow-y: scroll;

            height: calc(100% - 40px);

            min-height: 1px;

            min-width: 1px;
        }
    }
</style>

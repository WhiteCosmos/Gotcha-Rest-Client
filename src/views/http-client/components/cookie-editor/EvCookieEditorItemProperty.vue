<template>
    <ev-popup-menu :config="menuConfig">
        <template slot="icon">
            <div class="ev-icon-wrapper">
                <v-icon size="11" color="green">fa-circle-info</v-icon>
            </div>
        </template>

        <template slot="items">
            <div class="ev-menu-item-wrapper">
                <ev-label size="11" medium primary>Source :</ev-label>

                <!--                <v-spacer></v-spacer>-->

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-label size="11" medium secondary>{{ cookie.setCookie ? 'Set-Cookie' : 'Custom' }}</ev-label>
            </div>

            <div class="ev-menu-item-wrapper">
                <ev-label size="11" medium primary>Path :</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
                <!--                <v-spacer></v-spacer>-->

                <ev-label size="11" medium secondary>/</ev-label>
            </div>

            <div class="ev-menu-item-wrapper">
                <ev-label size="11" medium primary>Expires :</ev-label>

                <v-spacer></v-spacer>

                <ev-label size="11" medium secondary>{{ expireDate_ }}</ev-label>
            </div>

            <div class="ev-menu-item-wrapper">
                <ev-label size="11" medium primary>HttpOnly :</ev-label>

                <v-spacer></v-spacer>

                <ev-http-client-cookie-jar-check-box v-model="cookie.httpOnly"
                                                     @change="onCookieHttpOnlyChange(cookie)"></ev-http-client-cookie-jar-check-box>
            </div>

            <div class="ev-menu-item-wrapper">
                <ev-label size="11" medium primary>Secure :</ev-label>

                <v-spacer></v-spacer>

                <ev-http-client-cookie-jar-check-box v-model="cookie.secure"
                                                     @change="onCookieSecureChange(cookie)"></ev-http-client-cookie-jar-check-box>
            </div>

            <div class="ev-menu-item-wrapper">
                <ev-label size="11" medium primary>SameSite :</ev-label>

                <v-spacer></v-spacer>

                <ev-label size="11" medium secondary>{{ cookie.sameSite || '-' }}</ev-label>
            </div>
        </template>
    </ev-popup-menu>
</template>

<script>
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem.vue'
    import EvPopupMenu from '@/components/menu/EvPopupMenu.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox.vue'
    import moment from 'moment/moment'
    import EvHttpClientCookieJarCheckBox from '@/views/http-client/components/session/EvHttpClientCookieJarCheckBox.vue'

    export default {
        name: "EvCookieEditorItemProperty",

        components: {
            EvHttpClientCookieJarCheckBox,
            EvExportCheckBox,
            EvVerticalGutter,
            EvLabel,
            EvPopupMenu,
            EvPopupMenuItem
        },

        props: {
            cookie: Object,
        },

        computed: {
            menuConfig() {
                return {
                    'nudge-left': 70,
                    'nudge-bottom': 0,
                    // 'close-on-content-click': true,
                    'open-on-hover': true
                }
            },

            expireDate_() {
                return moment(this.cookie.expires).format('YYYY-MM-DD HH:mm')
            },
        },

        methods: {
            onCookieHttpOnlyChange(cookie) {
                cookie.httpOnly && (cookie.secure = false)
            },

            onCookieSecureChange(cookie) {
                cookie.secure && (cookie.httpOnly = false)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-icon-wrapper {
        @include full-center;

        width: 28px;

        height: 28px;
    }

    .ev-menu-item-wrapper {
        display: flex;

        align-items: center;

        width: 160px;

        height: 28px;

        padding-left: 4px;

        padding-right: 4px;
    }
</style>

<template>
    <div class="ev-http-client-cookie-jar-menu">
        <div class="ev-http-client-cookie-jar-menu__title">
            <ev-popup-menu-divider :label="$t('cookieJars')"></ev-popup-menu-divider>
        </div>

        <ev-popup-menu-radio-item v-for="cookieJar in cookieJars"
                                  name="name"
                                  item-key="uid"
                                  :item="cookieJar"
                                  v-model="currentCookieJars.selectedCookieJarUID"
                                  @click.native="handleSelectCookieJar(cookieJar)">{{ cookieJar.name }}
        </ev-popup-menu-radio-item>

        <ev-popup-menu-divider></ev-popup-menu-divider>

        <v-dialog v-model="dialog" width="960" v-bind="modalConfig">
            <template v-slot:activator="{ on, attrs }">
                <div class="ev-http-client-cookie-jar-menu__button" v-bind="attrs" v-on="on">
                    <ev-label size="11" bold secondary>{{ $t('manage') }}</ev-label>
                </div>
            </template>

            <ev-http-client-cookie-jar-manager
                v-hotkey="hotkey"
                :cookie-jars='cookieJars'
                @close="handleCloseDialog"></ev-http-client-cookie-jar-manager>
        </v-dialog>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvCirclePlusIcon from '@/views/http-client/icon/ev-circle-plus-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientCookieJarManager from '@/views/http-client/components/session/EvHttpClientCookieJarManager'
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import ElectronEventBus from '@/ElectronEventBus'

    export default {
        name: "EvHttpClientCookieJarMenu",

        components: {
            EvHttpClientCookieJarManager,
            EvVerticalGutter,
            EvCirclePlusIcon,
            EvPopupMenuRadioItem,
            EvPopupMenuDivider,
            EvLabel
        },

        mixins: [
            EvStoreMixin,
            EvDialogMixin,
        ],

        created() {
            ElectronEventBus.onOpenAppDialog((event, dialog) => {
                if (dialog === 'cookie-jar-manager') {
                    this.dialog = true
                }
            })
        },

        data() {
            return {
                dialog: false,
            }
        },

        computed: {
            cookieJars() {
                if (this.currentCookieJars) {
                    return this.currentCookieJars.cookieJars
                } else {
                    return []
                }
            },

            hotkey() {
                return {
                    'esc': this.handleCloseDialog
                }
            },
        },

        watch: {
            dialog(newVal) {
                if (newVal) {
                    this.$emit('close')
                }
            },
        },

        methods: {
            handleCloseDialog() {
                this.dialog = false

                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.UPDATE_COOKIE_JAR)
            },

            handleSelectCookieJar(cookieJar) {
                EvHttpClientCookieJarsEventBus.$emit(EvHttpClientCookieJarsEvents.SWITCH_COOKIE_JAR, cookieJar)
            }
        },

        i18n: {
            messages: {
                en: {
                    cookieJars: "Cookie Jars",

                    manage: "Manage",
                },
                zh: {
                    cookieJars: "全部 Cookie 罐",

                    manage: "管理",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-cookie-jar-menu {
        display: flex;

        flex-direction: column;

        background-color: #F1F1F1;

        border-radius: 3px;

        max-height: 320px;

        width: 144px;

        &__title {
            display: flex;

            align-items: center;

            width: 100%;

            height: 24px;

            padding: 4px;
        }

        &__button {
            display: flex;

            justify-content: center;

            height: 20px;

            cursor: default;
        }
    }
</style>

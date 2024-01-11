<template>
    <v-menu v-model="show" v-bind="menuConfig" transition="dummy">
        <template v-slot:activator="{ on }">
            <div class="ev-cookie-jar-selector" v-on="on">
                <div class="ev-cookie-jar-selector__icon-container">
                    <ev-jar-icon color="#555"></ev-jar-icon>
                </div>

                <span class="ev-cookie-jar-selector__label">{{ selectedCookieJarName }}</span>

                <v-spacer></v-spacer>

                <div class="ev-cookie-jar-selector__icon-container">
                    <v-icon size="10" color="#999" v-if="show">fa-caret-down</v-icon>

                    <v-icon size="10" color="#999" v-else>fa-caret-left</v-icon>
                </div>
            </div>
        </template>

        <ev-http-client-cookie-jar-menu @close="onCloseCookieJarSelector"></ev-http-client-cookie-jar-menu>
    </v-menu>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvSwitch from '@/components/button/EvSwitch'
    import SelectIcon from '@/components/icon/select-icon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvAppCacheMixin from '@/mixins/EvAppCacheMixin'
    import EvCookieIcon from '@/views/http-client/icon/ev-cookie-icon'
    import EvHttpClientCookieJarMenu from '@/views/http-client/components/session/EvHttpClientCookieJarMenu'
    import EvJarIcon from '@/views/http-client/icon/ev-jar-icon'

    /**
     * Life Circle
     *
     * 1. Initialize in after project initialized
     *
     * Development Progress
     *
     * 1. Data initialize -> Done
     * 2. Cookie Jar Selector -> Done
     * 3. Cookie Editor -> Done
     * 4. Request Sender -> Done
     * 5. Response Receiver -> Done
     */
    export default {
        name: "EvHttpClientCookieJarSelector",

        components: {
            EvJarIcon,
            EvHttpClientCookieJarMenu,
            EvCookieIcon,
            SelectIcon,
            EvSwitch,
            EvVerticalGutter
        },

        mixins: [
            EvAppCacheMixin,
            EvStoreMixin,
        ],

        data() {
            return {
                show: false,
            }
        },

        computed: {
            selectedCookieJarName() {
                if (this.currentCookieJar) {
                    if (this.currentCookieJar.default) {
                        return this.$t('EvHttpClientCookieJarSelector.default')
                    } else {
                        return this.currentCookieJar.name
                    }
                } else {
                    return ''
                }
            },

            cookieJars() {
                if (this.currentCookieJars) {
                    return this.currentCookieJars.cookieJars
                } else {
                    return []
                }
            },

            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'nudge-bottom': 1,
                }
            }
        },

        methods: {
            onCloseCookieJarSelector() {
                this.show = false
            }
        },

        i18n: {
            messages: {
                en: {},
                zh: {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-cookie-jar-selector {
        display: flex;

        align-items: center;

        user-select: none;

        width: 144px;

        height: 24px;

        &__icon-container {
            @include full-center;

            //padding-bottom: 3px;

            display: flex;

            //align-items: flex-end;

            justify-content: center;

            width: 24px;

            height: 20px;
        }

        &__label {
            font-size: 10px;

            padding-top: 1px;

            height: 16px;

            color: $SECONDARY_FONT_COLOR;

            font-weight: bold;

            width: 80%;

            text-overflow: ellipsis;

            white-space: nowrap;
        }
    }
</style>

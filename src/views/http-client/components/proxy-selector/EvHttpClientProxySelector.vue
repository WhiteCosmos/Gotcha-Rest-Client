<template>
    <div class="ev-session-selector">
        <div class="ev-session-selector__icon-container">
            <!--            <v-icon size="11" color="#AABBCC">fa-exchange-alt</v-icon>-->
            <!--            <ev-cookie-icon></ev-cookie-icon>-->
            <ev-server-icon></ev-server-icon>
        </div>

        <span class="ev-session-selector__label">System Proxy</span>

        <v-spacer></v-spacer>

        <!--        <ev-switch v-model="enable"></ev-switch>-->

        <div class="ev-session-selector__icon-container">
            <v-icon size="11" color="#AABBCC">fa-caret-left</v-icon>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvSwitch from '@/components/button/EvSwitch'
    import SelectIcon from '@/components/icon/select-icon'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import RabiCookieJarDao from '@/core/dao/RabiCookieJarDao'
    import _ from 'lodash'
    import RabiCookieJar from '@/data/gotcha/http-operation/cookie/RabiCookieJar'
    import EvAppCacheMixin from '@/mixins/EvAppCacheMixin'
    import EvCookieIcon from '@/views/http-client/icon/ev-cookie-icon'
    import EvServerIcon from '@/views/http-client/icon/ev-server-icon'

    export default {
        name: "EvHttpClientProxySelector",

        components: {
            EvServerIcon,
            EvCookieIcon,
            SelectIcon,
            EvSwitch,
            EvVerticalGutter
        },

        mixins: [
            EvAppCacheMixin,
            EvStoreMixin,
        ],

        created() {
            this.initialize(this.currentProject)

            AppEventBus.$on(AppEvents.SELECT_PROJECT, (project) => {
                this.initialize(project)
            })
        },

        data() {
            return {
                cookieJars: [],

                selectedCookieJar: undefined,
            }
        },

        computed: {},

        methods: {
            initialize(project) {
                project && new RabiCookieJarDao().batchQuery({
                    projectId: project.id
                }).then(cookieJars => {
                    if (_.isEmpty(cookieJars)) {
                        cookieJars = this._createDefaultCookieJar()
                    }

                    this.cookieJars = cookieJars

                    this.selectedCookieJar = this.getLastSelectedCookieJar(this.cookieJars)
                })
            },

            _createDefaultCookieJar() {
                let cookieJar = new RabiCookieJar()

                cookieJar.projectId = this.currentProject.id

                cookieJar.default = true

                cookieJar = new RabiCookieJarDao().save(cookieJar)

                return [cookieJar]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-session-selector {
        display: flex;

        align-items: center;

        user-select: none;

        //@include white-background-gradient;

        //@include component-shadow;

        //border-radius: 3px;

        //border: 1px solid #E0E0E0;

        width: 120px;

        height: 24px;

        &__icon-container {
            display: flex;

            align-items: center;

            justify-content: center;

            width: 24px;

            height: 16px;
        }

        &__label {
            font-size: 10px;

            padding-top: 1px;

            height: 16px;

            color: $PRIMARY_COLOR;

            font-weight: 500;
        }
    }
</style>

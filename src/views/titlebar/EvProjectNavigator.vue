<template>
    <div class="project-navigator">
        <ev-project-selector></ev-project-selector>

        <!--        <v-divider vertical inset></v-divider>-->

        <ev-version-selector v-show="false"></ev-version-selector>
    </div>
</template>

<script>
    import EvVersionSelector from '@/views/titlebar/version-selector/EvVersionSelector'
    import EvProjectSelector from '@/views/titlebar/project-selector/EvProjectSelector'
    import {EvHttpClientCookieJarsEventBus, EvHttpClientCookieJarsEvents} from '@/views/http-client/components/session/EvHttpClientCookieJarsEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCCookieJarsDao from '@/data/gotcha/http-operation/cookie/GHCCookieJarsDao'
    import {GHCEnvironmentsEventBus, GHCEnvironmentsEvents} from '@/data/gotcha/http-operation/environment/GHCEnvironmentsEventBus'
    import GHCEnvironmentsDao from '@/data/gotcha/http-operation/environment/GHCEnvironmentsDao'

    export default {
        name: "EvProjectNavigator",

        components: {
            EvProjectSelector,
            EvVersionSelector,
        },

        mixins: [
            EvStoreMixin
        ],

        created() {
            /**
             * Trigger Timing
             *
             * 1. After using 'manage' in cookie jar selector
             * 2. After edit cookies in cookie editor
             * 3. After http response received
             *
             * @see EvHttpClientCookieJarSelector
             * @see EvCookieEditor
             */
            EvHttpClientCookieJarsEventBus.$on(EvHttpClientCookieJarsEvents.SAVE_COOKIE_JARS, () => {
                new GHCCookieJarsDao().save(this.currentCookieJars)
            })

            EvHttpClientCookieJarsEventBus.$on(EvHttpClientCookieJarsEvents.UPDATE_COOKIE_JAR, () => {
                new GHCCookieJarsDao().save(this.currentCookieJars)
            })

            EvHttpClientCookieJarsEventBus.$on(EvHttpClientCookieJarsEvents.SWITCH_COOKIE_JAR, (cookieJar) => {
                this.setCurrentCookieJar(cookieJar)

                this.currentCookieJars.selectedCookieJarUID = cookieJar.uid

                new GHCCookieJarsDao().save(this.currentCookieJars)
            })

            GHCEnvironmentsEventBus.$on(GHCEnvironmentsEvents.SAVE_ENVIRONMENTS, () => {
                new GHCEnvironmentsDao().save(this.currentEnvironments)
            })
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-navigator {
        display: flex;

        //width: 640px;

        height: 28px;

        border-radius: 5px;

        //border: 1px solid $BORDER_COLOR;

        @include white-background-gradient;

        @include component-shadow;
    }
</style>


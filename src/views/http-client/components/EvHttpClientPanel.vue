<template>
    <div class="ev-http-client-panel">
        <ev-http-client-environment-selector></ev-http-client-environment-selector>

        <v-divider vertical inset></v-divider>

        <ev-http-client-cookie-jar-selector></ev-http-client-cookie-jar-selector>
    </div>
</template>

<script>
    import EvHttpClientEnvironmentSelector from '@/views/http-client/components/environment/EvHttpClientEnvironmentSelector'
    import EvHttpClientCookieJarSelector from '@/views/http-client/components/session/EvHttpClientCookieJarSelector'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientFunctionSwitcher from '@/views/http-client/components/switcher/EvHttpClientFunctionSwitcher'

    export default {
        name: "EvHttpClientPanel",

        components: {
            EvHttpClientFunctionSwitcher,
            EvVerticalGutter,
            EvHttpClientCookieJarSelector,
            EvHttpClientEnvironmentSelector,
        },

        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-panel {
        display: flex;

        align-items: center;

        @include component-shadow;

        border-radius: 3px;

        background-color: white;
    }
</style>

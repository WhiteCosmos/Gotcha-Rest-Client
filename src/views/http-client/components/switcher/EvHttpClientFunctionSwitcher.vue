<template>
    <div class="http-client-function-switcher">
        <ev-switcher-icon></ev-switcher-icon>
    </div>
</template>

<script>
    import EvSwitcherIcon from '@/components/icon/EvSwitcherIcon'

    export default {
        name: "EvHttpClientFunctionSwitcher",
        components: {EvSwitcherIcon},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-function-switcher {
        width: 28px;

        height: 28px;

        @include full-center;
    }
</style>

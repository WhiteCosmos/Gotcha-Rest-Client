<template>
    <div class="ev-http-client-request-tests-menu">
        <div class="ev-http-client-request-tests-menu__item">
            <ev-label size="10" color="#999">General</ev-label>
        </div>
        <div class="ev-http-client-request-tests-menu__item">
            <ev-label size="10" color="#999">Headers</ev-label>
        </div>
        <div class="ev-http-client-request-tests-menu__item">
            <ev-label size="10" color="#999">Json Path</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientRequestTestsMenu",

        components: {
            EvLabel
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-tests-menu {
        display: flex;

        align-items: center;

        width: 100%;

        height: 28px;

        background-color: #FAFAFA;

        border-bottom: 1px solid #F1F1F1;

        padding-left: 16px;

        &__item {
            display: flex;

            //justify-content: center;

            align-items: center;

            width: 72px;
        }
    }
</style>

<template>
    <div class="ev-http-client-cookie-jar-table-detail">
        <ev-label size="11" secondary text-truncate>{{ cookieValue }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientCookieJarTableDetail",

        components: {
            EvLabel
        },

        props: {
            cookie: Object,
        },

        computed: {
            cookieValue() {
                return this.cookie ? this.cookie.value : ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-cookie-jar-table-detail {
        display: flex;

        align-items: center;

        flex-shrink: 0;

        height: 28px;

        width: 100%;

        padding-left: 8px;

        background-color: #FFF;

        border-top: 1px solid #F1F1F1;
    }
</style>

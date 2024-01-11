<template>
    <div class="ev-http-client-request-history-menu">
        <ev-http-client-request-history-menu-item v-for="history in histories"
                                                  @click.native="doSelect(history)"
                                                  :history="history"></ev-http-client-request-history-menu-item>
    </div>
</template>

<script>
    import EvHttpClientRequestHistoryMenuItem from '@/views/http-client/response/request-history/EvHttpClientRequestHistoryMenuItem'

    export default {
        name: "EvHttpClientRequestHistoryMenu",

        components: {
            EvHttpClientRequestHistoryMenuItem
        },

        props: {
            histories: Array
        },

        methods: {
            doSelect(history) {
                this.$emit('select', history)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-history-menu {
        display: flex;

        flex-direction: column;

        overflow: hidden; // make border-radius work

        border-radius: 6px;

        background-color: #F1F1F1;

        width: 320px;

        height: auto;
    }
</style>

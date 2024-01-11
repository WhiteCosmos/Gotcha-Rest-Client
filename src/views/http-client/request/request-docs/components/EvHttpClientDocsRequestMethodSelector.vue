<template>
    <v-menu v-model="showPopupMenu" v-bind="menuConfig">
        <template v-slot:activator="{ on }">
            <div class="ev-http-client-method-selector" v-on="on">
                <ev-label size="11" bold :color="statusColor">{{ value.statusCode }}</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" bold :color="statusColor">{{ value.statusText }}</ev-label>

                <v-spacer></v-spacer>

                <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

                <select-icon></select-icon>
            </div>
        </template>

        <div class="d-flex flex-column" style="background-color: #F1F1F1; padding: 4px">
            <ev-popup-menu-divider label="2XX"></ev-popup-menu-divider>

            <ev-popup-menu-item v-for="code in statusCodes[0]" @click.native="doSelectStatusCode(code)">{{ code.c }} {{ code.m }}</ev-popup-menu-item>

            <ev-popup-menu-divider label="3XX"></ev-popup-menu-divider>

            <ev-popup-menu-item v-for="code in statusCodes[1]" @click.native="doSelectStatusCode(code)">{{ code.c }} {{ code.m }}</ev-popup-menu-item>

            <ev-popup-menu-divider label="4XX"></ev-popup-menu-divider>

            <ev-popup-menu-item v-for="code in statusCodes[2]" @click.native="doSelectStatusCode(code)">{{ code.c }} {{ code.m }}</ev-popup-menu-item>

            <ev-popup-menu-divider label="5XX"></ev-popup-menu-divider>

            <ev-popup-menu-item v-for="code in statusCodes[3]" @click.native="doSelectStatusCode(code)">{{ code.c }} {{ code.m }}</ev-popup-menu-item>
        </div>
    </v-menu>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import SelectIcon from '@/components/icon/select-icon'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'

    export default {
        name: "EvHttpClientDocsRequestMethodSelector",

        components: {
            EvPopupMenuItem,
            EvPopupMenuDivider,
            EvContextMenuItem,
            SelectIcon,
            EvVerticalGutter,
            EvLabel
        },

        props: {
            value: Object
        },

        computed: {
            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'nudge-bottom': 2,

                    'transition': 'dummy'
                }
            },

            statusCodes() {
                return [
                    [
                        {c: 200, m: 'OK'},
                        {c: 201, m: 'Created'},
                        {c: 202, m: 'Accepted'},
                        {c: 204, m: 'No Content'},
                    ],
                    [
                        {c: 301, m: 'Moved Permanently'},
                        {c: 302, m: 'Found'},
                        {c: 303, m: 'See Other'},
                        {c: 304, m: 'Not Modified'},
                    ],
                    [
                        {c: 400, m: 'Bad Request'},
                        {c: 401, m: 'Unauthorized'},
                        {c: 402, m: 'Payment Required'},
                        {c: 403, m: 'Forbidden'},
                        {c: 404, m: 'Not Found'},
                        {c: 405, m: 'Method Not Allowed'},
                    ],
                    [
                        {c: 500, m: 'Internal Server Error'},
                        {c: 501, m: 'Not Implemented'},
                        {c: 502, m: 'Bad Gateway'},
                        {c: 503, m: 'Service Unavailable'},
                        {c: 504, m: 'Gateway Timeout'},
                    ],
                ]
            },

            statusColor() {
                let statusCode = String(this.value.statusCode)

                if (statusCode.startsWith('2')) {
                    return 'green'
                }

                if (statusCode.startsWith('3')) {
                    return 'orange'
                }

                if (statusCode.startsWith('4')) {
                    return 'grey'
                }

                if (statusCode.startsWith('5')) {
                    return 'red'
                }
            },
        },

        data() {
            return {
                showPopupMenu: false
            }
        },

        methods: {
            doSelectStatusCode(code) {
                this.showPopupMenu = false

                this.value.statusCode = code.c

                this.value.statusText = code.m
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-method-selector {
        display: flex;

        align-items: center;

        border-radius: 3px;

        min-width: 96px;

        height: 20px;

        @include white-background-gradient;

        @include mac-shadow;

        padding-left: 4px;

        padding-right: 4px;

    }
</style>

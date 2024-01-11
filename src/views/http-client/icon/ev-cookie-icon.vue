<template>
    <svg width="12px" height="9px" viewBox="0 0 12 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="ev-cookie-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
            <polyline :stroke="receiveCookiesColor" points="11 6 1 6 3 8.5"></polyline>
            <polyline :stroke="sendCookiesColor" points="1 3 11 3 8.5 0.5"></polyline>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "ev-cookie-icon",

        props: {
            sendCookies: {
                type: Boolean,
                default: true
            },

            receiveCookies: {
                type: Boolean,
                default: true
            },
        },

        computed: {
            sendCookiesColor() {
                return this.sendCookies ? '#81b359' : '#AABBCC'
            },

            receiveCookiesColor() {
                return this.receiveCookies ? '#87b35b' : '#AABBCC'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

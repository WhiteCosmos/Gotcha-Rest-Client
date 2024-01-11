<template>
    <svg width="10px" height="12px" viewBox="0 0 10 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect id="Rectangle" :stroke="color" x="0.5" y="2.5" width="7" height="9"></rect>
            <line x1="3.5" y1="0.5" x2="9.5" y2="0.5" id="Line-22" :stroke="color" stroke-linecap="square"></line>
            <line x1="9.5" y1="0.5" x2="9.5" y2="9.5" id="Line-23" :stroke="color" stroke-linecap="square"></line>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "EvHttpClientRequestUrlCopyIcon",

        props: {
            hover: false
        },

        computed: {
            color() {
                return this.hover ? '#555' : "#777"
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

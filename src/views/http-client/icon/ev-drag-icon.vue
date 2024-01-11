<template>
    <svg width="6px" height="10px" viewBox="0 0 6 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect id="Rectangle" :fill="color" x="0" y="0" width="2" height="2" rx="1"></rect>
            <rect id="Rectangle" :fill="color" x="4" y="0" width="2" height="2" rx="1"></rect>
            <rect id="Rectangle" :fill="color" x="0" y="4" width="2" height="2" rx="1"></rect>
            <rect id="Rectangle" :fill="color" x="4" y="4" width="2" height="2" rx="1"></rect>
            <rect id="Rectangle" :fill="color" x="4" y="8" width="2" height="2" rx="1"></rect>
            <rect id="Rectangle" :fill="color" x="0" y="8" width="2" height="2" rx="1"></rect>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "ev-drag-icon",

        props: {
            color: {
                type: String,
                default: "#999"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

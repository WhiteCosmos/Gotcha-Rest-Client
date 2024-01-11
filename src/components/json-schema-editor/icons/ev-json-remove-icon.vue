<template>
    <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="RabiAPI-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M7,0 C10.8659932,0 14,3.13400675 14,7 C14,10.8659932 10.8659932,14 7,14 C3.13400675,14 0,10.8659932 0,7 C0,3.13400675 3.13400675,0 7,0 Z M7,0.875 C3.61725591,0.875 0.875,3.61725591 0.875,7 C0.875,10.3827441 3.61725591,13.125 7,13.125 C10.3827441,13.125 13.125,10.3827441 13.125,7 C13.125,3.61725591 10.3827441,0.875 7,0.875 Z" id="Combined-Shape" :fill="color"></path>
            <line x1="4" y1="7" x2="10" y2="7" id="Line-5" :stroke="color" stroke-linecap="round"></line>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "ev-json-remove-icon",

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

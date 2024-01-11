<template>
    <svg width="16px" height="10px" viewBox="0 0 16 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <circle id="Oval" :stroke="color" stroke-width="1.5" :fill="color" stroke-linejoin="round" cx="8" cy="5" r="1.75"></circle>
            <path d="M1,5 C3.33333333,2.33333333 5.66666667,1 8,1 C10.3333333,1 12.6666667,2.33333333 15,5" id="Path-10" :stroke="color" stroke-linecap="round"></path>
            <path d="M1,9 C3.33333333,6.33333333 5.66666667,5 8,5 C10.3333333,5 12.6666667,6.33333333 15,9" id="Path-10" :stroke="color" stroke-linecap="round" transform="translate(8.000000, 7.000000) scale(1, -1) translate(-8.000000, -7.000000) "></path>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "ev-eye-icon",

        data() {
            return {
                color: '#555'
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

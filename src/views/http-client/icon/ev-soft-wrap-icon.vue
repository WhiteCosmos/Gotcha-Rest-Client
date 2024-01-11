<template>
    <svg width="10px" height="8px" viewBox="0 0 10 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect id="Rectangle" :fill="color" x="0" y="6" width="4" height="1" rx="0.5"></rect>
            <rect id="Rectangle" :fill="color" x="0" y="0" width="10" height="1" rx="0.5"></rect>
            <path d="M0.5,3 L8,3 L8,3 L8,4 L0.5,4 C0.223857625,4 3.38176876e-17,3.77614237 0,3.5 C-3.38176876e-17,3.22385763 0.223857625,3 0.5,3 Z" id="Rectangle" :fill="color"></path>
            <path d="M5.5,6 L8,6 L8,6 L8,7 L5.5,7 C5.22385763,7 5,6.77614237 5,6.5 C5,6.22385763 5.22385763,6 5.5,6 Z" id="Rectangle" :fill="color"></path>
            <path d="M8.11662113,5.99327227 C8.61395981,5.93550716 9,5.51283584 9,5 C9,4.48716416 8.61395981,4.06449284 8.11662113,4.00672773 L8,4 L6.26760632,3.99992752 C6.61342606,3.40216612 7.25974756,3 8,3 C9.1045695,3 10,3.8954305 10,5 C10,6.1045695 9.1045695,7 8,7 C7.2601625,7 6.61415066,6.59828461 6.26818814,6.0010775 L8,6 L8.11662113,5.99327227 Z" id="Path" :fill="color"></path>
            <path d="M5.5,6.5 L7,5 M5.5,6.5 L7,8" id="Combined-Shape" stroke="#AABBCC"></path>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "ev-soft-wrap-icon",

        props: {
            color: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

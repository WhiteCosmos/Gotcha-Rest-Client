<template>
    <div class="ev-plus-icon">
        <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <circle id="Oval" :stroke="color" stroke-width="2" cx="14" cy="14" r="13"></circle>
                <path d="M14,7 C14.5522847,7 15,7.44771525 15,8 L15,13 L20,13 C20.5522847,13 21,13.4477153 21,14 C21,14.5522847 20.5522847,15 20,15 L15,15 L15,20 C15,20.5522847 14.5522847,21 14,21 C13.4477153,21 13,20.5522847 13,20 L13,15 L8,15 C7.44771525,15 7,14.5522847 7,14 C7,13.4477153 7.44771525,13 8,13 L13,13 L13,8 C13,7.44771525 13.4477153,7 14,7 Z" id="Path" :fill="color"></path>
            </g>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "ev-json-plus-icon",

        props: {
            color: {
                type: String,
                default: "#555"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-plus-icon {
        @include full-center;

        height: 14px;

        width: 14px;
    }
</style>

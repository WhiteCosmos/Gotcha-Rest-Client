<template>
    <svg width="54px" height="12px" viewBox="0 0 54 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon :fill="color" points="13 11 42 11 42 12 13 12"></polygon>
            <path d="M0.5,11.5493164 L11.2461258,11.5493164 C15.5327018,11.5493164 19.5830425,9.58553484 22.2378781,6.2200361 L25.174025,2.497923 C26.2001763,1.19708503 28.0865739,0.97440752 29.3874119,2.00055886 C29.5624928,2.13866948 29.7216289,2.29587065 29.8618709,2.469249 L33.00404,6.35384814 C35.6620774,9.63992528 39.6623826,11.5493164 43.888902,11.5493164 L54.5,11.5493164 L54.5,11.5493164" id="Line-4" stroke="#E0E0E0" :fill="color" stroke-linecap="square"></path>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "EvMenuTopIndicator",

        props: {
            color: {
                type: String,
                default: "#FCFCFC"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

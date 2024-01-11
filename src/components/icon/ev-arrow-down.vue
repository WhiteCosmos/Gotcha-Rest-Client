<template>
    <svg width="6px" height="4px" viewBox="0 0 6 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="RabiAPI-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M3.16,0.213333333 L5.76,3.68 C5.82627417,3.76836556 5.80836556,3.89372583 5.72,3.96 C5.68538077,3.98596443 5.64327404,4 5.6,4 L0.4,4 C0.28954305,4 0.2,3.91045695 0.2,3.8 C0.2,3.75672596 0.214035574,3.71461923 0.24,3.68 L2.84,0.213333333 C2.90627417,0.124967773 3.03163444,0.107059163 3.12,0.173333333 C3.13516113,0.184704183 3.14862915,0.1981722 3.16,0.213333333 Z" id="Triangle" :fill="color" transform="translate(3.000000, 2.000000) scale(1, -1) translate(-3.000000, -2.000000) "></path>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "ev-arrow-down",

        props: {
            color: {
                type: String,
                default: "#AABBCC"
            }
        }
    }
</script>

<style lang="scss" scoped>
   @import "~@/styles/rabiapi.scss";

</style>

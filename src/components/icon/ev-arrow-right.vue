<template>
    <svg width="4px" height="6px" viewBox="0 0 4 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="RabiAPI-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M2.16,1.21333333 L4.76,4.68 C4.82627417,4.76836556 4.80836556,4.89372583 4.72,4.96 C4.68538077,4.98596443 4.64327404,5 4.6,5 L-0.6,5 C-0.71045695,5 -0.8,4.91045695 -0.8,4.8 C-0.8,4.75672596 -0.785964426,4.71461923 -0.76,4.68 L1.84,1.21333333 C1.90627417,1.12496777 2.03163444,1.10705916 2.12,1.17333333 C2.13516113,1.18470418 2.14862915,1.1981722 2.16,1.21333333 Z" id="Triangle" :fill="color" transform="translate(2.000000, 3.000000) scale(1, -1) rotate(90.000000) translate(-2.000000, -3.000000) "></path>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "ev-arrow-right",

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

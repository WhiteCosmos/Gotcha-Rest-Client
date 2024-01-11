<template>
    <div class="ev-environment-variable-icon">
        <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M7.7087222,1.00486529 L20.3077134,1.01283501 C22.6990719,1.01434771 23.5801556,1.22854839 24.4578742,1.69867172 C25.2585348,2.12752121 25.8867129,2.75649455 26.3145491,3.557697 C26.7835616,4.4360097 26.9966474,5.31736368 26.9951347,7.7087222 L26.9951347,7.7087222 L26.987165,20.3077134 C26.9856523,22.6990719 26.7714516,23.5801556 26.3013283,24.4578742 C25.8724788,25.2585348 25.2435054,25.8867129 24.442303,26.3145491 C23.5639903,26.7835616 22.6826363,26.9966474 20.2912778,26.9951347 L20.2912778,26.9951347 L7.69228663,26.987165 C5.30092811,26.9856523 4.41984442,26.7714516 3.54212579,26.3013283 C2.74146525,25.8724788 2.11328714,25.2435054 1.68545093,24.442303 C1.21643842,23.5639903 1.0033526,22.6826363 1.00486529,20.2912778 L1.00486529,20.2912778 L1.01283501,7.69228663 C1.01434771,5.30092811 1.22854839,4.41984442 1.69867172,3.54212579 C2.12752121,2.74146525 2.75649455,2.11328714 3.557697,1.68545093 C4.4360097,1.21643842 5.31736368,1.0033526 7.7087222,1.00486529 L7.7087222,1.00486529 Z" id="Rectangle" :stroke="color" stroke-width="2"></path>
                <circle id="Oval" :stroke="color" stroke-width="2" cx="14" cy="14" r="8"></circle>
                <path d="M14,14.4948927 L19.4709844,27 L8.52901557,27 L14,14.4948927 Z" id="Triangle" :stroke="color" stroke-width="2" fill="#FFFFFF"></path>
            </g>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "ev-environment-variable-icon",

        props: {
            color: {
                type: String,
                default: "#7799BB"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-environment-variable-icon {
        @include full-center;

        width: 14px;

        height: 14px;
    }
</style>

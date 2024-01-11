<template>
    <!--    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">-->
    <!--        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
    <!--            <g id="Artboard" transform="translate(-81.000000, -41.000000)">-->
    <!--                <rect id="Rectangle" fill="url(#linearGradient-1)" x="81" y="41" width="20" height="20" rx="3"></rect>-->
    <!--                <g id="Group" transform="translate(84.000000, 47.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-width="1.5">-->
    <!--                    <path d="M0,0 C2.33333333,5.33333333 4.66666667,8 7,8 C9.33333333,8 11.6666667,5.33333333 14,0" id="Line"></path>-->
    <!--                    <path d="M0,8 C2.33333333,3.33333333 4.66666667,1 7,1 C9.33333333,1 11.6666667,3.33333333 14,8" id="Line"></path>-->
    <!--                </g>-->
    <!--            </g>-->
    <!--        </g>-->
    <!--    </svg>-->
    <div class="sdddd">
        <v-icon x-small color="#f3ab3e">fa-link</v-icon>
    </div>
</template>

<script>
    export default {
        name: "EvSessionIcon",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";


    .sdddd {
        width: 18px;

        height: 18px;

        @include full-center;

        //@include blue-background-gradient;

        background-color: #faf1e1;

        border-radius: 3px;
    }

</style>

<template>
    <div class="ev-switcher-icon">
        <svg width="32px" height="30px" viewBox="0 0 32 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M25,17 C26.6568542,17 28.1568542,17.6715729 29.2426407,18.7573593 C30.3284271,19.8431458 31,21.3431458 31,23 C31,24.6568542 30.3284271,26.1568542 29.2426407,27.2426407 C28.1568542,28.3284271 26.6568542,29 25,29 L25,29 L7,29 C5.34314575,29 3.84314575,28.3284271 2.75735931,27.2426407 C1.67157288,26.1568542 1,24.6568542 1,23 C1,21.3431458 1.67157288,19.8431458 2.75735931,18.7573593 C3.84314575,17.6715729 5.34314575,17 7,17 L7,17 Z" id="Rectangle" :stroke="color" stroke-width="2"></path>
                <path d="M25,1 C26.6568542,1 28.1568542,1.67157288 29.2426407,2.75735931 C30.3284271,3.84314575 31,5.34314575 31,7 C31,8.65685425 30.3284271,10.1568542 29.2426407,11.2426407 C28.1568542,12.3284271 26.6568542,13 25,13 L25,13 L7,13 C5.34314575,13 3.84314575,12.3284271 2.75735931,11.2426407 C1.67157288,10.1568542 1,8.65685425 1,7 C1,5.34314575 1.67157288,3.84314575 2.75735931,2.75735931 C3.84314575,1.67157288 5.34314575,1 7,1 L7,1 Z" id="Rectangle" :stroke="color" stroke-width="2"></path>
                <circle id="Oval" :fill="color" cx="25" cy="23" r="3"></circle>
                <circle id="Oval" :fill="color" cx="7" cy="7" r="3"></circle>
            </g>
        </svg>
    </div>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "EvSwitcherIcon",

        mixins: [
            EvIconMixin
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-switcher-icon {
        @include full-center;

        padding-top: 2px; // 与其它图标对齐

        width: 16px;

        height: 16px;
    }
</style>

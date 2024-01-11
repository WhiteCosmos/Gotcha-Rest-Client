<template>
    <svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon id="Path" :fill="color" points="7 3 8 3 8 7 11 7 11 8 7 8"></polygon>
            <path d="M8,0 C11.8659932,0 15,3.13400675 15,7 C15,10.8659932 11.8659932,14 8,14 C5.62183635,14 3.52066288,12.8140641 2.25561705,11.0013298 L3.52856479,11.0008689 C4.62718157,12.2278632 6.22341969,13 8,13 C11.3137085,13 14,10.3137085 14,7 C14,3.6862915 11.3137085,1 8,1 C4.6862915,1 2,3.6862915 2,7 L3,7 L1.5,10 L0,7 L1,7 C1,3.13400675 4.13400675,0 8,0 Z" id="Path" :fill="color"></path>
        </g>
    </svg>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "ev-time-icon",

        mixins: [
            EvIconMixin
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

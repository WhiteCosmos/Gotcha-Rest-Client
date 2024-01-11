<template>
    <svg width="9px" height="12px" viewBox="0 0 9 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
            <polygon id="Path-28" :stroke="color" points="6 0 4.73529412 5 8 5 2.85294118 12 4 7 0.5 7"></polygon>
        </g>
    </svg>
</template>

<script>
    import EvIconMixin from '@/assets/icons/EvIconMixin'

    export default {
        name: "ev-lighting-icon",

        mixins: [
            EvIconMixin
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

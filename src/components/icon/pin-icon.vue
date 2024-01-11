<template>
    <svg width="10px" height="13px" viewBox="0 0 10 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <line x1="2" y1="0.5" x2="8" y2="0.5" id="Line" :stroke="greyColor" :fill="greyColor" stroke-linecap="round"></line>
            <line x1="1" y1="7.5" x2="9" y2="7.5" id="Line" :stroke="greyColor" :fill="greyColor" stroke-linecap="round"></line>
            <polygon id="Rectangle" :fill="greyColor" points="3.48635864 1.5 6.57012939 1.5 7 6.5 3 6.5"></polygon>
            <polygon id="Rectangle" :fill="greyColor" points="4 8.5 6 8.5 5 13.0795898"></polygon>
        </g>
    </svg>
</template>

<script>
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "pin-icon",

        mixins: [
            EvComponentMixin
        ]
    }
</script>

<style lang="scss" scoped>

</style>

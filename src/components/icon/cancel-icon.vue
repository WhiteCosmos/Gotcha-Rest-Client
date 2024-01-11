<template>
    <svg width="6px" height="6px" viewBox="0 0 6 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <line x1="5.5" y1="0.5" x2="0.5" y2="5.5" id="Line-3" stroke="#999"></line>
            <line x1="0.5" y1="0.5" x2="5.5" y2="5.5" id="Line-4" stroke="#999"></line>
        </g>
    </svg>
</template>

<script>
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "cancel-icon",

        mixins: [
            EvComponentMixin,
        ],

        props: {}
    }
</script>

<style lang="scss" scoped>

</style>

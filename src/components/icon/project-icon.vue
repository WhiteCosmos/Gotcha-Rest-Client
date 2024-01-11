<template>
    <svg width="16px" height="12px" viewBox="0 0 16 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="RabiAPI-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M1,0 L6,0 C6.25641792,0 6.36516013,0.144966297 6.46985242,0.324464028 L6.5785142,0.511382058 C6.65714803,0.638214156 6.7552598,0.764032837 6.91540527,0.856116662 C6.97019156,0.899482295 7.03801644,0.923076923 7.10788857,0.923076923 L15,0.923076923 C15.5522847,0.923076923 16,1.33635254 16,1.84615385 L16,11.0769231 C16,11.5867244 15.5522847,12 15,12 L1,12 C0.44771525,12 0,11.5867244 0,11.0769231 L0,0.923076923 C0,0.413275616 0.44771525,0 1,0 Z" id="Path" :fill="color"></path>
            <line x1="0.5" y1="2.5" x2="15.5" y2="2.5" id="Line" stroke="#86A8CC" stroke-linecap="round"></line>
        </g>
    </svg>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "project-icon",

        mixins: [
            EvIconMixin
        ],
    }
</script>

<style lang="scss" scoped>

</style>

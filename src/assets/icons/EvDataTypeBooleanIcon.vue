<template>
    <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Data-Type-Boolean">
                <path d="M8.8722296,0.5 C10.5136685,0.5 11.1159211,0.653234454 11.717892,0.975172007 C12.2813208,1.27649702 12.723503,1.71867923 13.024828,2.28210802 C13.3467655,2.88407891 13.5,3.48633153 13.5,5.1277704 L13.5,5.1277704 L13.5,8.8722296 C13.5,10.5136685 13.3467655,11.1159211 13.024828,11.717892 C12.723503,12.2813208 12.2813208,12.723503 11.717892,13.024828 C11.1159211,13.3467655 10.5136685,13.5 8.8722296,13.5 L8.8722296,13.5 L5.1277704,13.5 C3.48633153,13.5 2.88407891,13.3467655 2.28210802,13.024828 C1.71867923,12.723503 1.27649702,12.2813208 0.975172007,11.717892 C0.653234454,11.1159211 0.5,10.5136685 0.5,8.8722296 L0.5,8.8722296 L0.5,5.1277704 C0.5,3.48633153 0.653234454,2.88407891 0.975172007,2.28210802 C1.27649702,1.71867923 1.71867923,1.27649702 2.28210802,0.975172007 C2.88407891,0.653234454 3.48633153,0.5 5.1277704,0.5 L5.1277704,0.5 Z" id="Rectangle" :stroke="color"></path>
                <text id="Check---FontAwesome" font-family="FontAwesome" font-size="10" font-weight="normal" :fill="color">
                    <tspan x="2" y="11"></tspan>
                </text>
            </g>
        </g>
    </svg>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "EvDataTypeBooleanIcon",

        mixins: [
            EvIconMixin
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

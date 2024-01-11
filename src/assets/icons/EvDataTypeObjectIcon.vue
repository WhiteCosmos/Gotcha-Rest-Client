<template>
    <div class="ev-data-type-object-icon">
        <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Data-Type-Object-2">
                    <path d="M17.7444592,1 C21.0273369,1 22.2318422,1.30646891 23.435784,1.95034401 C24.5626415,2.55299404 25.447006,3.43735847 26.049656,4.56421604 C26.6935311,5.76815781 27,6.97266306 27,10.2555408 L27,10.2555408 L27,17.7444592 C27,21.0273369 26.6935311,22.2318422 26.049656,23.435784 C25.447006,24.5626415 24.5626415,25.447006 23.435784,26.049656 C22.2318422,26.6935311 21.0273369,27 17.7444592,27 L17.7444592,27 L10.2555408,27 C6.97266306,27 5.76815781,26.6935311 4.56421604,26.049656 C3.43735847,25.447006 2.55299404,24.5626415 1.95034401,23.435784 C1.30646891,22.2318422 1,21.0273369 1,17.7444592 L1,17.7444592 L1,10.2555408 C1,6.97266306 1.30646891,5.76815781 1.95034401,4.56421604 C2.55299404,3.43735847 3.43735847,2.55299404 4.56421604,1.95034401 C5.76815781,1.30646891 6.97266306,1 10.2555408,1 L10.2555408,1 Z" id="Rectangle" :stroke="color" stroke-width="2"></path>
                    <rect id="Rectangle" :fill="color" x="8" y="13" width="5" height="2" rx="1"></rect>
                    <rect id="Rectangle" :fill="color" x="15" y="13" width="5" height="2" rx="1"></rect>
                    <rect id="Rectangle" :fill="color" x="15" y="18" width="5" height="2" rx="1"></rect>
                    <rect id="Rectangle" :fill="color" x="8" y="18" width="5" height="2" rx="1"></rect>
                    <rect id="Rectangle" :fill="color" x="8" y="8" width="5" height="2" rx="1"></rect>
                    <rect id="Rectangle" :fill="color" x="15" y="8" width="5" height="2" rx="1"></rect>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "EvDataTypeObjectIcon",

        mixins: [
            EvIconMixin
        ]
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-data-type-object-icon {
        @include full-center;

        height: 14px;

        width: 14px;
    }
</style>

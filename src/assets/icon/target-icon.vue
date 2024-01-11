<template>
    <div class="icon-container d-flex align-center justify-center">
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="画板" transform="translate(-2.000000, -2.000000)" :fill="color">
                    <path d="M9.9993238,18.70992 L9.9996419,19.7478729 C7.18871684,19.0242512 4.97574881,16.8112832 4.25212715,14.0003581 L5.28989247,14.0000463 C5.961784,16.2575785 7.74188043,18.0378224 9.9993238,18.70992 Z M14.0003581,19.7478729 L14.0000463,18.7101075 C16.2577884,18.0381535 18.0381535,16.2577884 18.7101075,14.0000463 L19.7478729,14.0003581 C19.0242512,16.8112832 16.8112832,19.0242512 14.0003581,19.7478729 Z M19.7478729,9.9996419 L18.70992,9.9993238 C18.0378224,7.74188043 16.2575785,5.961784 14.0000463,5.28989247 L14.0003581,4.25212715 C16.8112832,4.97574881 19.0242512,7.18871684 19.7478729,9.9996419 Z M9.9996419,4.25212715 L9.9993238,5.29007996 C7.74209038,5.96211512 5.96211512,7.74209038 5.29007996,9.9993238 L4.25212715,9.9996419 C4.97574881,7.18871684 7.18871684,4.97574881 9.9996419,4.25212715 Z"
                          id="形状结合"></path>
                    <rect id="矩形" x="11" y="2" width="2" height="6" rx="1"></rect>
                    <rect id="矩形" x="11" y="16" width="2" height="6" rx="1"></rect>
                    <rect id="矩形" x="2" y="11" width="6" height="2" rx="1"></rect>
                    <rect id="矩形" x="16" y="11" width="6" height="2" rx="1"></rect>
                    <circle id="椭圆形" cx="12" cy="12" r="1"></circle>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
    import EvIconMixin from '@/mixins/EvIconMixin'

    export default {
        name: "target-icon",

        mixins: [
            EvIconMixin
        ]
    }
</script>

<style lang="scss" scoped>
    .icon-container {
        transform: scale(.9);
    }
</style>

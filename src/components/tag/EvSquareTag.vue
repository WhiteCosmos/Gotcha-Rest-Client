<template>
    <div class="square-tag" :style="containerStyle">
        <span class="square-tag__font" :style="colorStyle"><slot></slot></span>
    </div>
</template>

<script>
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "EvSquareTag",

        mixins: [
            EvComponentMixin,
        ],

        props: {},

        computed: {}
    }
</script>

<style lang="scss" scoped>
    .square-tag {
        width: fit-content;

        height: 16px;

        padding-top: 2px;

        padding-left: 4px;

        padding-right: 4px;

        user-select: none;

        border-radius: 2px;

        display: flex;

        align-items: center;
    }

    .square-tag__font {
        font-size: 11px;

        font-weight: normal;
    }
</style>

<template>
    <div class="square-tag">
        <span class="square-tag__font"><slot></slot></span>
    </div>
</template>

<script>
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "EvHttpContentType",

        mixins: [
            EvComponentMixin,
        ],

        props: {},

        computed: {}
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .square-tag {
        height: 18px;

        padding-left: 8px;

        padding-right: 8px;

        user-select: none;

        border-radius: 20px;

        display: flex;

        align-items: center;

        background-color: #fffaf2;

        border: 1px solid $ORANGE_COLOR;
    }

    .square-tag__font {
        line-height: 16px;

        font-size: 10px;

        font-weight: bold;

        color: $ORANGE_COLOR;
        //color: white;
    }
</style>

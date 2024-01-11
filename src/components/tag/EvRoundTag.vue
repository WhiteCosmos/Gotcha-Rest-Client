<template>
    <div class="round-tag">
        <!--        <span class="round-tag__font" :style="colorStyle"><slot></slot></span>-->
        <span class="round-tag__font"><slot></slot></span>
    </div>
</template>

<script>
    import EvComponentMixin from '@/mixins/EvComponentMixin'

    export default {
        name: "EvRoundTag",

        mixins: [
            EvComponentMixin
        ],

        props: {}
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .round-tag {
        height: 16px;

        padding-left: 4px;

        padding-right: 4px;

        user-select: none;

        border-radius: 3px;

        display: flex;

        align-items: center;

        background-color: $PRIMARY_COLOR;
    }

    .round-tag__font {
        font-size: 10px;

        font-weight: bold;

        color: white;
    }
</style>
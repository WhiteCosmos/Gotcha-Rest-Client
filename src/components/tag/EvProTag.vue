<template>
    <div class="ev-pro-tag">
        <ev-label size="11" bold>PRO</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'

    export default {
        name: "EvProTag",

        components: {
            EvLabel
        },

    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-pro-tag {
        display: flex;

        align-items: center;

        justify-content: center;

        width: fit-content;

        padding-left: 4px;

        padding-right: 4px;

        height: 14px;

        background-color: $YELLOW_COLOR;

        border-radius: 2px;
    }
</style>

<template>
    <div class="subtitle-2 d-flex align-center">
        <EvVerticalGutter :gutter="indent"></EvVerticalGutter>

        <span class="subtitle-font"><slot></slot></span>
    </div>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter";
    export default {
        name: "EvSubtitle-2",
        components: {EvVerticalGutter},
        props: {
            indent: {
                type: Number,
                default: 16,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .subtitle-2 {
        height: 32px;

        border-bottom: 1px solid #E0E0E0;

        user-select: none;
    }

    .subtitle-font {
        font-size: 11px;

        font-weight: bold;

        color: $PRIMARY_FONT_COLOR;

        line-height: 24px;
    }
</style>

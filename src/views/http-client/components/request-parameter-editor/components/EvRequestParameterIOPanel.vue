<template>
    <div class="ev-request-parameter-io-panel">
        <div class="ev-request-parameter-io-panel__label">{{ label }}</div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvRequestParameterIOPanel",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        props: {
            label: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-request-parameter-io-panel {
        display: flex;

        align-items: center;

        height: 14px;

        width: fit-content;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 16px;

        border: 1px solid $SECONDARY_FONT_COLOR;

        &__divider {
            display: flex;

            width: 1px;

            height: 8px;

            margin-left: 4px;

            margin-right: 4px;

            border-left: 1px solid $SECONDARY_FONT_COLOR;
        }

        &__label {
            font-size: 10px;

            font-weight: bold;

            line-height: 12px;

            color: $SECONDARY_FONT_COLOR;
        }
    }
</style>

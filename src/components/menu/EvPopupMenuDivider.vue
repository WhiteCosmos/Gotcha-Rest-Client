<template>
    <div class="ev-context-menu-divider">
        <span class="ev-context-menu-divider__label" v-if="label">{{ label }}</span>

        <div class="ev-context-menu-divider__line"></div>
    </div>
</template>

<script>
    export default {
        name: "EvPopupMenuDivider",

        props: {
            label: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-context-menu-divider {
        display: flex;

        align-items: center;

        width: 100%;

        height: 12px;

        user-select: none;

        &__label {
            font-size: 9px;

            line-height: 12px;

            color: $SECONDARY_FONT_COLOR;

            margin-right: 8px;
        }

        &__line {
            display: flex;

            flex: 1;

            border-bottom: 1px solid #E0E0E0;
        }
    }
</style>

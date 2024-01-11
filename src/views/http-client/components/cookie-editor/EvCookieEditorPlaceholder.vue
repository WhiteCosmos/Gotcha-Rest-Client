<template>
    <div class="ev-cookie-editor-placeholder">
        <span class="ev-cookie-editor-placeholder__label">{{ label }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvCookieEditorPlaceholder",

        props: {
            label: String,
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-cookie-editor-placeholder {
        display: flex;

        align-items: center;

        justify-content: center;

        height: 28px;

        border-bottom: 1px solid #F1F1F1;

        user-select: none;

        &__label {
            font-size: 11px;

            color: $PLACEHOLDER_FONT_COLOR;
        }
    }
</style>

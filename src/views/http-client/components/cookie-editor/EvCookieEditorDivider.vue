<template>
    <div class="ev-cookie-editor-divider">
        <span class="ev-cookie-editor-divider__label">{{ label }}</span>

        <v-spacer></v-spacer>

        <ev-json-reset-button></ev-json-reset-button>

        <ev-vertical-gutter :gutter="1"></ev-vertical-gutter>

        <ev-json-add-button></ev-json-add-button>
    </div>
</template>

<script>
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvJsonResetButton from '@/components/json-editor-vsl/components/EvJsonResetButton'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvCookieEditorDivider",
        components: {
            EvVerticalGutter,
            EvJsonResetButton,
            EvJsonAddButton,
        },
        props: {
            label: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-cookie-editor-divider {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 32px;

        padding-right: 16px;

        background-color: #FCFCFC;

        border-bottom: 1px solid #F1F1F1;

        user-select: none;

        &__label {
            font-size: 10px;

            color: #007AFF;
        }
    }
</style>

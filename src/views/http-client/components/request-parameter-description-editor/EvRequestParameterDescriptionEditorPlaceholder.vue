<template>
    <div class="ev-request-parameter-description-editor-placeholder">
        <ev-label size="10" grey>No Parameters</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvRequestParameterDescriptionEditorPlaceholder",

        components: {
            EvLabel
        },

        props: {
            option: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-request-parameter-description-editor-placeholder {
        display: flex;

        align-items: center;

        justify-content: center;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;

        &__icon-container {
            @include full-center;

            height: 28px;

            width: 32px;
        }
    }

</style>

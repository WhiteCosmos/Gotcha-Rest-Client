<template>
    <div class="ev-dynamic-variable-preview">
        <pre class="ev-dynamic-variable-preview__text">{{ value }}</pre>
    </div>
</template>

<script>
    export default {
        name: "EvDynamicVariablePreview",

        props: {
            value: [String, Number],
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-dynamic-variable-preview {
        display: flex;

        height: 56px;

        width: 100%;

        padding: 4px;

        overflow: hidden;

        background-color: #FFF;

        border-top: 1px solid #e0e0e0;

        &__text {
            font-size: 10px;

            color: $SECONDARY_FONT_COLOR;
        }
    }

</style>

<template>
    <div class="d-flex">
        <span class="key-style">{{ k }}</span>

        <span class="value-style">{{ v }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvKeyValueText",

        props: {
            k: {
                type: String,

                default: "key",
            },

            v: {
                type: String,

                default: "value"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../evalon4j";

    .key-style {
        font-size: 12px;

        font-weight: bold;

        line-height: 32px;

        width: 72px;

        color: #007AFF;
    }

    .value-style {
        font-size: 12px;

        line-height: 32px;

        font-weight: bold;

        color: $PRIMARY_FONT_COLOR;

        width: 100%;

        text-align: right;
    }
</style>

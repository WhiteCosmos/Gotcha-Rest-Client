<template>
    <div class="http-response-divider d-flex align-center">
        <div class="http-response-divider__cylinder"></div>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span class="http-response-divider__label">{{ label }}</span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpBlockDivider",

        components: {
            EvVerticalGutter
        },

        props: {
            label: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-response-divider {
        margin-top: 16px;

        //margin-bottom: 16px;

        height: 28px;

        background-color: #FCFCFC;

        border-right: 1px solid #cce5ff;

        border-top: 1px solid #cce5ff;

        border-bottom: 1px solid #cce5ff;

        border-radius: 2px;

        &__cylinder {
            height: 28px;

            width: 2px;

            background-color: $PRIMARY_COLOR;

            border-radius: 2px 0 0 2px;
        }

        &__label {
            font-size: 12px;

            font-weight: bold;

            color: $PRIMARY_COLOR;
        }
    }
</style>

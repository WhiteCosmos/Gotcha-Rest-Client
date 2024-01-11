<template>
    <div class="api-definition-node-divider">
        <v-icon size="11" color="#AABBCC">fa-caret-down</v-icon>

        <ev-vertical-gutter :gutter="10"></ev-vertical-gutter>

        <span class="api-definition-node-divider__label">{{ label }}</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <div class="api-definition-node-divider__line"></div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvApiDefinitionNodeDivider",

        components: {
            EvVerticalGutter
        },

        props: {
            label: String,
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .api-definition-node-divider {
        height: 24px;

        width: 100%;

        display: flex;

        align-items: center;

        padding-left: 36px;

        padding-right: 16px;

        &__label {
            color: #AABBCC;

            font-size: 10px;
        }

        &__line {
            display: flex;

            flex: 1;

            border-bottom: 1px solid #F1F1F1;
        }
    }
</style>

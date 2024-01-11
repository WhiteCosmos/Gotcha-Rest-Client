<template>
    <div class="api-definition-export-bar-item">
        <!--        <v-icon size="8" color="#AABBCC">fa-code</v-icon>-->

        <!--        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

        <span class="api-definition-export-bar-item__label"><slot></slot></span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvApiDefinitionExportBarItem",
        components: {EvVerticalGutter},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .api-definition-export-bar-item {
        height: 28px;

        display: flex;

        flex: 1;

        align-items: center;

        justify-content: center;

        padding: 8px;

        &__label {
            font-size: 10px;

            line-height: 16px;

            font-weight: bolder;

            color: $SECONDARY_FONT_COLOR;

            transition: color 150ms;

            &:hover {
                color: $PRIMARY_COLOR;
            }
        }
    }
</style>

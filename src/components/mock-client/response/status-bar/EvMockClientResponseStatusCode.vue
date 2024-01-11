<template>
    <div class="d-flex align-center mock-client-response-status-code">
        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span class="mock-client-response-status-code__label">Status Code</span>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <v-divider vertical inset></v-divider>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <input class="mock-client-response-status-code__editor">

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span>-</span>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <input class="mock-client-response-status-code__editor">

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvMockClientResponseStatusCode",
        components: {EvVerticalGutter},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-response-status-code {
        height: 28px;

        display: flex;

        flex: 2;

        border: 1px solid $SECONDARY_COLOR;

        border-radius: 3px;

        @include white-background-gradient;

        @include component-shadow;

        &__label {
            font-size: 11px;

            font-weight: bold;

            color: #007aff;
        }

        &__editor {
            min-width: 1px;

            flex: 1;

            background-color: #F1F1F1;

            border-radius: 3px;

            height: 20px;

            outline: none;

            text-indent: 8px;

            font-size: 11px;

            color: $PRIMARY_FONT_COLOR;

            font-weight: bold;
        }
    }
</style>

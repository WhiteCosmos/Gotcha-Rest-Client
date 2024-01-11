<template>
    <div class="d-flex align-center mock-client-request-url">
        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span class="mock-client-request-url__request-method">GET</span>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <v-divider vertical inset></v-divider>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span class="mock-client-request-url__request-url">http://localhost:8848/v2/pet</span>

        <v-spacer></v-spacer>

        <v-divider vertical inset></v-divider>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-copy-request-icon></ev-copy-request-icon>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCopyRequestIcon from '@/components/tabs/content-tab-titles/http-client/EvCopyRequestIcon'

    export default {
        name: "EvMockClientRequestUrl",

        components: {
            EvCopyRequestIcon,
            EvVerticalGutter
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .mock-client-request-url {
        width: calc(100% - 72px);

        height: 28px;

        border: 1px solid $SECONDARY_COLOR;

        border-radius: 4px;

        @include component-shadow;

        @include white-background-gradient;

        &__request-method {
            font-size: 12px;

            font-weight: bold;

            color: $GREEN_COLOR;
        }

        &__request-url {
            font-size: 12px;

            font-weight: normal;

            color: $PRIMARY_COLOR;
        }

        &__copy {

        }
    }
</style>

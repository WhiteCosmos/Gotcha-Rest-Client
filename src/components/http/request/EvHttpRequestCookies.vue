<template>
    <div class="http-response-headers">
        <div class="http-response-headers__title">
            <span class="http-response-headers__title__label">请求 Cookies</span>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-http-empty-placeholder text="No Request Cookies"></ev-http-empty-placeholder>
    </div>
</template>

<script>
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvHttpRequestHeaders",
        components: {
            EvHorizonGutter,
            EvVerticalGutter,
            EvHttpEmptyPlaceholder
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-response-headers {
        padding-left: 24px;

        display: flex;

        flex-direction: column;

        &__title {
            @include horizon-center;

            height: 32px;

            user-select: none;

            border-bottom: 1px solid #007AFF;

            &__label {
                color: #007AFF;

                font-size: 11px;

                font-weight: bold;

                line-height: 24px;
            }
        }
    }
</style>

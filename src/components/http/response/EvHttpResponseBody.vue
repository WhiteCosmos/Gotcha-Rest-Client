<template>
    <div class="http-response-body">
        <div class="http-response-body__title">
            <span class="http-response-body__title__label">返回响应体</span>

            <v-spacer></v-spacer>

            <span class="http-response-body__title__content-type">Content-Type: </span>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="http-response-body__title__content-type">application/json</span>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-http-empty-placeholder text="没有响应体"></ev-http-empty-placeholder>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpResponseBody",
        components: {EvVerticalGutter, EvHttpEmptyPlaceholder, EvHorizonGutter},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-response-body {
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

            &__content-type {
                color: #AABBCC;

                font-size: 10px;

                font-weight: bold;

                line-height: 24px;
            }

        }
    }
</style>

<template>
    <div class="http-response-headers">
        <div class="http-response-headers__title">
            <span class="http-response-headers__title__label">请求携带数据</span>

            <v-spacer></v-spacer>

            <span class="http-response-headers__title__content-type">Content-Type: </span>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <span class="http-response-headers__title__content-type">application/json</span>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-http-empty-placeholder text="No Request Body"></ev-http-empty-placeholder>
    </div>
</template>

<script>
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvHttpRequestBody",
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

            &__content-type {
                color: #AABBCC;

                font-size: 10px;

                font-weight: bold;

                line-height: 24px;
            }
        }
    }
</style>

<template>
    <div class="http-response-title">
        <span class="http-response-title__label">返回响应</span>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <span class="http-response-title__status-code">{{ jsonHttpResponse.statusCode }}</span>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <span class="http-response-title__status-code">{{ jsonHttpResponse.statusText }}</span>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpResponseTitle",

        components: {
            EvVerticalGutter
        },

        props: {
            jsonHttpResponse: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-response-title {
        @include horizon-center;

        height: 32px;

        border-bottom: 1px solid $PRIMARY_COLOR;

        &__label {
            color: $PRIMARY_COLOR;

            font-size: 12px;

            font-weight: bold;

            line-height: 24px;

            user-select: none;
        }

        &__status-code {
            color: #AABBCC;

            font-size: 10px;

            font-weight: bold;

            line-height: 24px;

            user-select: none;
        }
    }
</style>

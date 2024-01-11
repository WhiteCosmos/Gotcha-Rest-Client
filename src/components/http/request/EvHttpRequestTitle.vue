<template>
    <div class="http-request-title">
        <span class="http-request-title__label">请求参数</span>
    </div>
</template>

<script>
    export default {
        name: "EvHttpRequestTitle",
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-request-title {
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

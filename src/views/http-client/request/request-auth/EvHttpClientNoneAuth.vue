<template>
    <div class="http-client-no-request-body">
        <span class="http-client-no-request-body__title-label">{{ $t('message') }}</span>

        <span class="http-client-no-request-body__subtitle-label">{{ $t('detail') }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvHttpClientNoneAuth",

        i18n: {
            messages: {
                en: {
                    message: "No Request Auth",

                    detail: "This request will not take any auth message"
                },
                zh: {
                    message: "没有鉴权信息",

                    detail: "该请求不会携带任何鉴权信息"
                },
                zh_TW: {
                    message: "沒有驗證信息",
                    detail: "該請求不會攜帶任何驗證信息"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-no-request-body {
        @include full-center;

        flex-direction: column;

        width: 100%;

        min-width: 1px;

        min-height: 1px;

        height: calc(100% - 28px);

        user-select: none;

        background-color: #FCFCFC;

        padding-bottom: 196px;

        &__title-label {
            font-size: 16px;

            line-height: 48px;

            font-weight: bold;

            color: $SECONDARY_FONT_COLOR;
        }

        &__subtitle-label {
            font-size: 12px;

            line-height: 16px;

            font-weight: bold;

            color: $SECONDARY_FONT_COLOR;
        }
    }
</style>

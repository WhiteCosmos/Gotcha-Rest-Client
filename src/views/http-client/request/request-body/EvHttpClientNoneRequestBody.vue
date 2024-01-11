<template>
    <div class="http-client-no-request-body">
        <span class="http-client-no-request-body__title-label">{{ $t('title') }}</span>

        <span class="http-client-no-request-body__subtitle-label">{{ $t('subtitle') }}</span>
    </div>
</template>

<script>
    export default {
        name: "EvHttpClientNoneRequestBody",

        i18n: {
            messages: {
                en: {
                    title: "No Request Body",

                    subtitle: "This request will not take any data."
                },
                zh: {
                    title: "没有请求数据",

                    subtitle: "该请求不会携带任何数据"
                },
                zh_TW: {
                    title: "沒有請求數據",
                    subtitle: "該請求不會攜帶任何數據"
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

        min-width: 1px;

        min-height: 1px;

        height: calc(100% - 28px);

        width: 100%;

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

<template>
    <div class="http-client__response-placeholder">
        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <span class="http-client__response-placeholder__text">{{ $t('title') }}</span>

        <span class="http-client__response-placeholder__subtitle">{{ $t('subtitle') }}</span>
    </div>
</template>

<script>
    import EvWarningIcon from '@/views/http-client/icon/ev-warning-icon'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvHttpClientResponsePlaceholder",

        components: {
            EvHorizonGutter,
            EvWarningIcon
        },

        i18n: {
            messages: {
                en: {
                    title: "No HTTP Response",

                    subtitle: "Please send a request to check the result",
                },
                zh: {
                    title: "没有返回响应",

                    subtitle: "请在发送HTTP请求后查看返回结果",
                },
                jp: {
                    title: "レスポンスがありません",

                    subtitle: "HTTPリクエストを送信した後、レスポンスを確認してください",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client__response-placeholder {
        display: flex;

        flex: 1;

        flex-direction: column;

        background-color: #FCFCFC;

        @include full-center;

        padding-bottom: 96px;

        user-select: none;
    }

    .http-client__response-placeholder__text {
        font-size: 16px;

        line-height: 48px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;
    }

    .http-client__response-placeholder__subtitle {
        font-size: 12px;

        line-height: 16px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;
    }
</style>

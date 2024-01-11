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
        name: "EvHttpClientNoResponseBodyPlaceholder",

        components: {
            EvHorizonGutter,
            EvWarningIcon
        },

        i18n: {
            messages: {
                en: {
                    title: "No Response Body",

                    subtitle: "This response have no data."
                },
                zh: {
                    title: "没有响应数据",

                    subtitle: "该响应没有携带任何数据"
                },
                zh_TW: {
                    title: "沒有響應數據",

                    subtitle: "該響應沒有攜帶任何數據"
                }
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

        padding-bottom: 128px;

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

        font-weight: normal;

        color: $PLACEHOLDER_FONT_COLOR;
    }
</style>

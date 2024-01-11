<template>
    <div class="ev-http-client-response-body-placeholder">
        <ev-label size="16" secondary bold>{{ message }}</ev-label>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-label size="12" grey bold v-if="detail">{{ detail }}</ev-label>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvHttpClientResponseBodyPlaceholder",

        components: {
            EvLabel,
            EvHorizonGutter,
        },

        props: {
            message: {
                type: String,
                default: function () {
                    return this.$t('message')
                }
            },

            detail: {
                type: String,
                default: ""
            },
        },

        i18n: {
            messages: {
                en: {
                    message: "No Response Data"
                },

                zh: {
                    message: "没有返回数据"
                },

                zh_TW: {
                    message: "沒有返回資料"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-body-placeholder {
        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        width: 100%;

        height: 100%;

        padding-bottom: 168px;

        background-color: #FAFAFA;
    }
</style>

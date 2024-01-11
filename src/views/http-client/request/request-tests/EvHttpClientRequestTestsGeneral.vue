<template>
    <div class="ev-http-client-request-tests-general">
        <div class="ev-http-client-request-tests-general__row">
            <ev-label size="11" bold secondary>{{ $t('title') }}</ev-label>
        </div>

        <div class="ev-http-client-request-tests-general__row">
            <div class="ev-http-client-request-tests-general__row__key-part">
                <ev-export-check-box></ev-export-check-box>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" primary>{{ $t('statusCode') }}</ev-label>
            </div>

            <div class="ev-http-client-request-tests-general__row__value-part">
                <ev-borderless-input v-model="assertion.statusCode" placeholder="200"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-http-client-request-tests-general__row">
            <div class="ev-http-client-request-tests-general__row__key-part">
                <ev-export-check-box></ev-export-check-box>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" primary>{{ $t('statusMessage') }}</ev-label>
            </div>

            <div class="ev-http-client-request-tests-general__row__value-part">
                <ev-borderless-input v-model="assertion.statusText" placeholder="OK"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-http-client-request-tests-general__row">
            <div class="ev-http-client-request-tests-general__row__key-part">
                <ev-export-check-box></ev-export-check-box>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" primary>{{ $t('contentType') }}</ev-label>
            </div>

            <div class="ev-http-client-request-tests-general__row__value-part">
                <ev-borderless-input v-model="statusText" placeholder="application/json"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-http-client-request-tests-general__row">
            <div class="ev-http-client-request-tests-general__row__key-part">
                <ev-export-check-box></ev-export-check-box>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" primary>{{ $t('responseEncoding') }}</ev-label>
            </div>

            <div class="ev-http-client-request-tests-general__row__value-part">
                <ev-borderless-input v-model="statusText" placeholder="gzip"></ev-borderless-input>
            </div>
        </div>


        <!--        <div class="ev-http-client-request-tests-general__row">-->
        <!--            <div class="ev-http-client-request-tests-general__row__key-part">-->
        <!--                <ev-label size="10" secondary>Total Timing</ev-label>-->
        <!--            </div>-->

        <!--            <div class="ev-http-client-request-tests-general__row__value-part">-->
        <!--                <ev-borderless-input v-model="ccc" placeholder="100 ms"></ev-borderless-input>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import EvHttpClientRequestTestsMenu from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsMenu'
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpClientRequestTestsGeneral",

        components: {
            EvVerticalGutter,
            EvExportCheckBox,
            EvBorderlessInput,
            EvLabel,
            EvHttpClientRequestTestsMenu
        },

        props: {
            assertion: Object,
        },

        data() {
            return {
                statusCode: '',

                statusText: '',
            }
        },

        i18n: {
            messages: {
                en: {
                    title: "Response Status",

                    statusCode: "Status Code",

                    statusMessage: "Status Message",

                    contentType: "Content Type",

                    responseEncoding: "Response Encoding"
                },
                zh: {
                    title: "响应状态",

                    statusCode: "状态码",

                    statusMessage: "状态信息",

                    contentType: "响应类型",

                    responseEncoding: "响应编码"
                },
                zh_TW: {
                    title: "響應狀態",

                    statusCode: "狀態碼",

                    statusMessage: "狀態信息",

                    contentType: "響應類型",

                    responseEncoding: "響應編碼"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-tests-general {
        display: flex;

        flex-direction: column;

        width: 100%;

        &__row {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 24px;

            padding-right: 16px;

            border-bottom: 1px solid #F1F1F1;

            &__key-part {
                display: flex;

                align-items: center;

                width: 244px;
            }

            &__value-part {
                display: flex;

                flex: 1;

                flex-shrink: 0;
            }
        }
    }
</style>

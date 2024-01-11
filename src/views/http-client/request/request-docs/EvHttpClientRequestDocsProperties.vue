<template>
    <div class="ev-http-client-request-docs-properties">
        <div class="ev-property-wrapper">
            <div class="ev-property-key">
                <ev-label size="12" bold secondary>{{ $t('operationId') }}</ev-label>
            </div>

            <div class="ev-property-value">
                <ev-borderless-input :size="12" placeholder="Operation Id" v-model="httpRequest.operationId"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-key">
                <ev-label size="12" bold secondary>{{ $t('deprecated') }}</ev-label>
            </div>

            <div class="ev-property-value">
                <ev-switch v-model="httpRequest.deprecated"></ev-switch>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-key">
                <ev-label size="12" bold secondary>{{ $t('externalLink') }}</ev-label>
            </div>

            <div class="ev-property-value">
                <ev-borderless-input :size="12" placeholder="https:// ..." v-model="httpRequest.externalUrl"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-property-wrapper">
            <div class="ev-property-key">
                <ev-label size="12" bold secondary>{{ $t('createdAt') }}</ev-label>
            </div>

            <div class="ev-property-value">
                <ev-label size="12" bold primary>{{ createdAt }}</ev-label>
            </div>
        </div>

        <!--        <div class="ev-property-wrapper">-->
        <!--            <div class="ev-property-key">-->
        <!--                <ev-label size="12" bold secondary>修改时间</ev-label>-->
        <!--            </div>-->

        <!--            <div class="ev-property-value">-->
        <!--                <ev-label size="12" bold primary>December 11, 2022 12:34 PM</ev-label>-->
        <!--            </div>-->
        <!--        </div>-->

        <!--        <div class="ev-property-wrapper">-->
        <!--            <div class="ev-property-key">-->
        <!--                <ev-label size="12" bold secondary>接口状态</ev-label>-->
        <!--            </div>-->

        <!--            <div class="ev-property-value">-->
        <!--                <ev-label size="12" bold primary>开发中</ev-label>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvSwitch from '@/components/button/EvSwitch'
    import moment from 'moment'

    export default {
        name: "EvHttpClientRequestDocsProperties",

        components: {
            EvSwitch,
            EvBorderlessInput,
            EvLabel
        },

        props: {
            httpRequest: Object
        },

        data() {
            return {}
        },

        computed: {
            createdAt() {
                if (this.httpRequest.createdAt) {
                    return moment(this.httpRequest.createdAt).format('MMMM DD, YYYY HH:mm')
                }
            }
        },

        i18n: {
            messages: {
                en: {
                    properties: "Properties",

                    operationId: "Operation Id",

                    deprecated: "Deprecated",

                    externalLink: "External Link",

                    createdAt: "Created At",
                },
                zh: {
                    properties: "接口属性",

                    operationId: "接口 ID",

                    deprecated: "是否弃用",

                    externalLink: "外部链接",

                    createdAt: "创建时间",
                },

                zh_TW: {
                    properties: "接口屬性",

                    operationId: "接口 ID",

                    deprecated: "是否棄用",

                    externalLink: "外部連結",

                    createdAt: "創建時間",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-docs-properties {
        display: flex;

        flex-direction: column;
    }

    .ev-property-wrapper {
        display: flex;

        align-items: center;

        width: 100%;

        height: 28px;

        //background-color: #FAFAFA;

        border-bottom: 1px solid #F1F1F1;
    }

    .ev-property-key {
        display: flex;

        align-items: center;

        flex: 3;

        padding-left: 4px;
    }

    .ev-property-value {
        display: flex;

        align-items: center;

        flex: 4;

        padding-right: 16px;
    }
</style>

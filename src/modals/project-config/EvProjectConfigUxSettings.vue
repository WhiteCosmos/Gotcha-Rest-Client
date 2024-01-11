<template>
    <div class="ev-content-wrapper">
        <ev-popup-menu-divider :label="$t('menuSettings')"></ev-popup-menu-divider>

        <div class="d-flex align-center" style="height: 32px">
            <ev-label size="12" medium primary>接口请求:</ev-label>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-radio v-model="defaultRequestMenu" name="接口文档" value="REQUEST_DOC"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultRequestMenu" name="请求头部" value="REQUEST_HEADER"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultRequestMenu" name="URL 参数" value="URL_PARAM"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultRequestMenu" name="请求数据" value="REQUEST_PAYLOAD"></ev-radio>
        </div>

        <div class="d-flex align-center" style="height: 32px">
            <ev-label size="12" medium primary>返回响应:</ev-label>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseMenu" name="请求信息" value="RESPONSE_SUMMARY"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseMenu" name="响应头部" value="RESPONSE_HEADER"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseMenu" name="返回数据" value="RESPONSE_PAYLOAD"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseMenu" name="断言结果" value="ASSERTION_RESULT"></ev-radio>
        </div>

        <div class="d-flex align-center" style="height: 32px">
            <ev-label size="12" medium primary>响应类型:</ev-label>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseType" name="Text" value="text"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseType" name="Json" value="json"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseType" name="Web" value="web"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseType" name="PDF" value="pdf"></ev-radio>

            <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

            <ev-radio v-model="defaultResponseType" name="Image" value="image"></ev-radio>
        </div>
    </div>
</template>

<script>
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvRadio from '@/components/form/EvRadio.vue'

    export default {
        name: "EvProjectConfigUxSettings",

        components: {
            EvRadio,
            EvVerticalGutter,
            EvLabel,
            EvPopupMenuDivider
        },

        data() {
            return {
                defaultRequestMenu: "REQUEST_DOC", // REQUEST_DOC | REQUEST_HEADER | URL_PARAM | REQUEST_PAYLOAD | ASSERTION

                defaultResponseMenu: "RESPONSE_SUMMARY", // RESPONSE_SUMMARY | RESPONSE_HEADER | RESPONSE_PAYLOAD | ASSERTION_RESULT

                defaultResponseType: "text", // TEXT | JSON | WEB |
            }
        },

        i18n: {
            messages: {
                en: {
                    menuSettings: "Menu Settings"
                },
                zh: {
                    menuSettings: "默认菜单设置"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";


    .ev-content-wrapper {
        display: flex;

        flex-direction: column;

        flex: 1;

        padding-top: 16px;

        padding-left: 32px;

        padding-right: 32px;

        height: 100%;
    }
</style>

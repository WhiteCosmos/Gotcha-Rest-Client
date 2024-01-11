<template>
    <div class="ev-http-client-docs-response-status">
        <div class="ev-http-client-docs-response-status__header">
            <ev-label size="11" secondary bold>响应状态</ev-label>
        </div>

        <div class="ev-http-client-docs-response-status__item">
            <div style="width: 56px">
                <ev-label size="11" secondary>状态码:</ev-label>
            </div>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div>
                <ev-borderless-input placeholder="200" v-model="example.statusCode"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-http-client-docs-response-status__item">
            <div style="width: 56px">
                <ev-label size="11" secondary>状态信息:</ev-label>
            </div>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div>
                <ev-borderless-input placeholder="OK" v-model="example.statusText"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-http-client-docs-response-status__item">
            <div style="width: 56px">
                <ev-label size="11" secondary>响应类型:</ev-label>
            </div>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div>
                <ev-borderless-input placeholder="application/json" v-model="example.contentType"></ev-borderless-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvHttpClientDocsResponseStatus",

        components: {
            EvVerticalGutter,
            EvBorderlessInput,
            EvLabel
        },

        props: {
            example: Object
        },

        data() {
            return {
                statusCode: "",

                statusText: "",

                contentType: ""
            }
        },

        i18n: {
            messages: {
                en: {},
                zh: {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-docs-response-status {
        display: flex;

        flex-direction: column;

        //padding-left: 20px;

        //margin-bottom: 20px;

        &__header {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 16px;

            border-bottom: 1px solid #EAEAEA;
        }

        &__item {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 16px;

            border-bottom: 1px solid #EAEAEA;
        }
    }
</style>

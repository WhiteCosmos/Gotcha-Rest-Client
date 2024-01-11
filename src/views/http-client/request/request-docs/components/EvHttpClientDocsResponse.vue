<template>
    <div class="ev-response-wrapper">
        <div class="ev-http-client-docs-response">
            <ev-http-client-docs-request-method-selector :value="example"></ev-http-client-docs-request-method-selector>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="d-flex" style="width: 160px; background-color: #007AFF">
                <ev-basic-input v-model="example.description" :placeholder="$t('placeholder')"></ev-basic-input>
            </div>

            <v-spacer></v-spacer>

            <v-fade-transition>
                <div class="ev-tooltip-wrapper" v-show="showDeletable" @click="$emit('remove-item', example)">
                    <ev-label size="11" bold red>{{ $t('confirmDeleteLabel') }}</ev-label>
                </div>
            </v-fade-transition>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="ev-icon-wrapper" @click="showDeletable = true">
                <ev-remove-icon></ev-remove-icon>
            </div>
        </div>

        <ev-http-client-docs-response-headers :example="example"></ev-http-client-docs-response-headers>

        <ev-http-client-divider></ev-http-client-divider>

        <ev-http-client-docs-response-payload :example="example"></ev-http-client-docs-response-payload>
    </div>
</template>

<script>
    import EvHttpClientDocsResponseStatus from '@/views/http-client/request/request-docs/components/EvHttpClientDocsResponseStatus'
    import EvHttpClientDocsResponseHeaders from '@/views/http-client/request/request-docs/components/EvHttpClientDocsResponseHeaders'
    import EvHttpClientDocsResponsePayload from '@/views/http-client/request/request-docs/components/EvHttpClientDocsResponsePayload'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvRemoveIcon from '@/components/icon/ev-remove-icon'
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvHttpClientDocsRequestMethodSelector from '@/views/http-client/request/request-docs/components/EvHttpClientDocsRequestMethodSelector'

    export default {
        name: "EvHttpClientDocsResponse",

        components: {
            EvHttpClientDocsRequestMethodSelector,
            EvEditableLabel,
            EvRemoveIcon,
            EvBasicInput,
            EvVerticalGutter,
            EvLabel,
            EvHttpClientDivider,
            EvHttpClientDocsResponsePayload,
            EvHttpClientDocsResponseHeaders,
            EvHttpClientDocsResponseStatus
        },

        props: {
            example: Object,
        },

        computed: {
            statusMessage() {
                return this.example.statusCode + ' ' + this.example.statusText
            },
        },

        data() {
            return {
                expand: false,

                showDeletable: false,
            }
        },

        watch: {
            showDeletable(newVal) {
                if (newVal) {
                    setTimeout(() => {
                        this.showDeletable = false
                    }, 2000)
                }
            },
        },

        methods: {
            initializeProperties() {
                // TODO
            },
        },

        i18n: {
            messages: {
                en: {
                    responseHeaders: "Response Headers",

                    placeholder: "Response Name, Optional",

                    responseBody: "Response Body",

                    noResponseBody: "No Response Body",

                    confirmDeleteLabel: "CONFIRM"
                },
                zh: {
                    responseHeaders: "响应头部",

                    placeholder: "响应名称，可不填",

                    responseBody: "返回数据",

                    noResponseBody: "没有返回数据",

                    confirmDeleteLabel: "确认删除"
                },
                zh_TW: {
                    responseHeaders: "響應頭部",

                    placeholder: "響應名稱，可不填",

                    responseBody: "返回數據",

                    noResponseBody: "沒有返回數據",

                    confirmDeleteLabel: "確認刪除"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-response-wrapper {
        display: flex;

        flex-direction: column;

        border: 1px solid #F5F5F5;

        border-radius: 5px;

        margin-top: 28px;
    }

    .ev-http-client-docs-response {
        display: flex;

        align-items: center;

        width: 100%;

        height: 32px;

        background-color: #F5F5F5;

        border-radius: 5px 5px 0 0;

        //@include mac-shadow;

        padding-left: 12px;

        padding-right: 3px;
    }


    .ev-icon-wrapper {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 18px;

        height: 20px;

        border-radius: 3px;

        transition: .1s;

        &:hover {
            background-color: #ffe6e6;
        }
    }

    .ev-tooltip-wrapper {
        display: flex;

        align-items: center;

        height: 20px;

        width: fit-content;

        border-radius: 2px;

        padding-left: 8px;

        padding-right: 8px;

        background-color: #ffe6e6;

        &:hover {
            background-color: #ffd9d9;;
        }
    }

</style>

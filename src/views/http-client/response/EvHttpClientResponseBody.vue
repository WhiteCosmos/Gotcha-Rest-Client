<template>
    <div class="http-client-response-body">
        <div class="http-client-response-body__menu">
            <div class="http-client-response-body__menu__button"
                 @click="changeBodyType(type)"
                 v-for="type in bodyTypes">
                <ev-label size="11" bold v-bind="{ primary: (type === bodyType), grey: (type !== bodyType) }">
                    {{ type === 'pdf' ? 'PDF' : capitalize(type) }}
                </ev-label>
            </div>
        </div>

        <div class="http-client-response-body__content" v-show="isBodyType('text')" v-if="defer(1)">
            <ev-http-client-response-text-viewer :payload="payload"
                                                 v-if="isTextPayload"
                                                 :visible="visible && isBodyType('text')"
                                                 :body-type="this.bodyType"></ev-http-client-response-text-viewer>

            <ev-http-client-response-body-placeholder v-else
                                                      :message="$t('notSupportedDataType')"
                                                      :detail="payload.contentType"></ev-http-client-response-body-placeholder>
        </div>

        <div class="http-client-response-body__content" v-show="isBodyType('json')" v-if="defer(2)">
            <ev-http-client-response-json-viewer v-if="isJsonPayload"
                                                 :payload="payload"
                                                 @add-jsonpath-assertion="handleAddJsonpathAssertion"></ev-http-client-response-json-viewer>

            <ev-http-client-response-body-placeholder v-else :message="$t('notSupportedDataType')"
                                                      :detail="payload.contentType"></ev-http-client-response-body-placeholder>
        </div>

        <div class="http-client-response-body__content" v-show="isBodyType('web')" v-if="defer(3)">
            <ev-http-client-response-web-viewer :payload="payload" v-if="isHtmlPayload"></ev-http-client-response-web-viewer>

            <ev-http-client-response-body-placeholder v-else :message="$t('notSupportedDataType')"
                                                      :detail="payload.contentType"></ev-http-client-response-body-placeholder>
        </div>

        <div class="http-client-response-body__content" v-show="isBodyType('pdf')" v-if="defer(4)">
            <ev-http-client-response-pdf-viewer :payload="payload" v-if="isPdfPayload"></ev-http-client-response-pdf-viewer>

            <ev-http-client-response-body-placeholder v-else :message="$t('notSupportedDataType')"
                                                      :detail="payload.contentType"></ev-http-client-response-body-placeholder>
        </div>

        <div class="http-client-response-body__content" v-show="isBodyType('image')" v-if="defer(5)">
            <ev-http-client-response-image-viewer :payload="payload" v-if="isImagePayload"></ev-http-client-response-image-viewer>

            <ev-http-client-response-body-placeholder v-else :message="$t('notSupportedDataType')"
                                                      :detail="payload.contentType"></ev-http-client-response-body-placeholder>
        </div>
    </div>
</template>

<script>
    import EvHttpClientNoResponseBodyPlaceholder from '@/views/http-client/response/response-body/EvHttpClientNoResponseBodyPlaceholder'
    import EvHttpClientResponseImageViewer from '@/views/http-client/response/response-body/EvHttpClientResponseImageViewer'
    import EvHttpClientResponseTextViewer from '@/views/http-client/response/response-body/EvHttpClientResponseTextViewer'
    import EvHttpClientResponseWebViewer from '@/views/http-client/response/response-body/EvHttpClientResponseWebViewer'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientResponseJsonViewer from '@/views/http-client/response/response-body/EvHttpClientResponseJsonViewer'
    import EvHttpClientResponseTypeMixin from '@/views/http-client/response/response-body/EvHttpClientResponseTypeMixin'
    import EvHttpClientResponsePlaceholder from '@/views/http-client/EvHttpClientResponsePlaceholder'
    import EvHttpClientResponseBodyPlaceholder from '@/views/http-client/response/EvHttpClientResponseBodyPlaceholder'
    import _ from 'lodash'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import Defer from '@/mixins/Defer'
    import EvHttpClientResponsePdfViewer from '@/views/http-client/response/response-body/EvHttpClientResponsePdfViewer.vue'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpClientResponseBody",

        components: {
            EvHttpClientResponsePdfViewer,
            EvHttpClientResponseBodyPlaceholder,
            EvHttpClientResponsePlaceholder,
            EvLabel,
            EvVerticalGutter,
            EvHttpClientResponseJsonViewer,
            EvHttpClientResponseWebViewer,
            EvHttpClientResponseTextViewer,
            EvHttpClientResponseImageViewer,
            EvHttpClientNoResponseBodyPlaceholder,
        },

        mixins: [
            EvHttpClientResponseTypeMixin,
            Defer(),
        ],

        created() {
            this.initializeBodyType()
        },

        props: {
            httpResponse: Object,

            visible: false,
        },

        data() {
            return {
                bodyType: undefined,

                bodyTypes: [
                    'text',
                    'json',
                    'web',
                    'pdf',
                    'image',
                ],
            }
        },

        watch: {
            payload() {
                this.initializeBodyType()
            },
        },

        computed: {
            payload() {
                return this.httpResponse.payload
            },

            isTextPayload() {
                return this.payload &&
                    (this.payload.contentType.startsWith('application')
                        || this.payload.contentType.startsWith('text')
                        || this.payload.contentType.startsWith('message'))
            },

            isJsonPayload() {
                try {
                    return this.payload && GHCJson.parse(this.payload.body)
                } catch (e) {
                    return false
                }
            },

            isHtmlPayload() {
                return this.payload.contentType.match(/text\/html.*/)
            },

            isPdfPayload() {
                return this.payload.extension === 'pdf'
            },

            isImagePayload() {
                return this.payload.contentType.match(/image\/.*/)
            },
        },

        methods: {
            initializeBodyType() {
                if (this.isPdfPayload) {
                    if (this.bodyType === 'pdf') {
                        return
                    }

                    this.bodyType = 'pdf'
                } else if (this.isTextPayload) {
                    if (this.bodyType === 'json') {
                        return
                    }

                    this.bodyType = 'text'
                } else if (this.isJsonPayload) {
                    if (this.bodyType === 'text') {
                        return
                    }

                    this.bodyType = 'json'
                } else if (this.isHtmlPayload) {
                    if (this.bodyType === 'text') {
                        return
                    }

                    this.bodyType = 'html'
                } else if (this.isImagePayload) {
                    this.bodyType = 'image'
                }
            },

            changeBodyType(bodyType) {
                this.bodyType = bodyType
            },

            isBodyType(bodyType) {
                return this.bodyType === bodyType
            },

            capitalize(bodyType) {
                return _.capitalize(bodyType)
            },

            handleAddJsonpathAssertion(jsonpath, type, value) {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.ADD_JSONPATH_ASSERTION, this.httpResponse, jsonpath, type, value)
            }
        },

        i18n: {
            messages: {
                en: {
                    notSupportedDataType: "Not Supported Data Type"
                },

                zh: {
                    notSupportedDataType: "不支持的数据类型"
                },

                zh_TW: {
                    notSupportedDataType: "不支援的資料類型"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-response-body {
        position: relative;

        display: flex;

        flex-direction: column;

        height: calc(100vh - 208px);

        &__menu {
            display: flex;

            align-items: center;

            justify-content: center;

            min-height: 1px;

            height: 28px;

            width: 100%;

            background-color: #FAFAFA;

            border-bottom: 1px solid #F1F1F1;

            &__button {
                @include full-center;

                width: 56px;

                height: 28px;
            }
        }

        &__content {
            display: flex;

            height: calc(100vh - 208px - 28px);

            width: 100%;
        }

        &__overlay {
            position: absolute;

            display: flex;

            align-items: center;

            justify-self: center;

            top: 0px;

            background-color: #F1F1F1;

            height: 20px;

            width: 72px;

            border-radius: 0 0 3px 3px;

            opacity: 70%;

            padding-left: 4px;

            padding-right: 4px;
        }
    }

</style>

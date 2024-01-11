<template>
    <div class="ev-http-client-request-docs" @scroll="onHttpClientRequestDocsScroll">
        <div class="ev-http-client-request-docs__title">
            <div class="ev-label-wrapper">
                <span class="ev-label-wrapper__title">{{ httpRequestName }}</span>
            </div>

            <div class="d-flex align-center" style="height: 36px">
                <ev-text-button @click.native="doCopyAsMarkdown">{{ $t('copyAs', {name: 'Markdown'}) }}</ev-text-button>
            </div>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="ev-http-client-request-docs__subtitle">
            <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

            <ev-label size="14" bold :color="requestMethodColor">{{ requestMethod }}</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="14" primary medium selectable>{{ requestPath }}</ev-label>
        </div>

        <ev-horizon-gutter :gutter="28"></ev-horizon-gutter>

        <!-- Properties -->

        <ev-http-client-request-docs-subtitle>{{ $t('properties') }}</ev-http-client-request-docs-subtitle>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-http-client-request-docs-properties :http-request="httpRequest"></ev-http-client-request-docs-properties>

        <ev-horizon-gutter :gutter="32"></ev-horizon-gutter>

        <!-- Description -->

        <ev-http-client-request-docs-subtitle>{{ $t('EvHttpClientRequestDocs.description') }}</ev-http-client-request-docs-subtitle>

        <ev-horizon-gutter :gutter="28"></ev-horizon-gutter>

        <ev-auto-resize-textarea v-model="httpRequest.description"></ev-auto-resize-textarea>

        <ev-horizon-gutter :gutter="32"></ev-horizon-gutter>

        <!-- Request -->

        <ev-http-client-request-docs-subtitle>{{ $t('EvHttpClientRequestDocs.request') }}</ev-http-client-request-docs-subtitle>

        <ev-horizon-gutter :gutter="28"></ev-horizon-gutter>

        <div class="ev-editor-wrapper" v-if="defer(1)">
            <div class="ev-request-docs-header">
                <ev-label size="11" bold
                          :color="headerMenu === 'header' ? '#555' : '#999'"
                          @click.native="headerMenu = 'header'">{{ $t('headers') }}
                </ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-counter-label :value="httpRequest.headers.length"></ev-counter-label>


                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <v-divider inset vertical></v-divider>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-label size="11" bold
                          :color="headerMenu === 'cookie' ? '#555' : '#999'"
                          @click.native="headerMenu = 'cookie'">{{ $t('cookies') }}
                </ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-counter-label :value="httpRequest.cookies.length"></ev-counter-label>
            </div>

            <ev-request-parameter-description-editor :options="headersOption"
                                                     v-model="httpRequest.headers"
                                                     v-if="headerMenu === 'header'"></ev-request-parameter-description-editor>

            <ev-request-parameter-description-editor :options="cookiesOptions"
                                                     v-model="httpRequest.cookies"
                                                     v-if="headerMenu === 'cookie'"></ev-request-parameter-description-editor>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="ev-editor-wrapper">
            <ev-request-parameter-description-editor :options="pathParametersOption"
                                                     v-model="httpRequest.pathParameters"
                                                     @update-items="emitUrlParametersChange"
                                                     v-if="defer(2)"></ev-request-parameter-description-editor>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="ev-editor-wrapper">
            <ev-request-parameter-description-editor :options="queryParametersOption"
                                                     v-model="httpRequest.queryParameters"
                                                     @update-items="emitUrlParametersChange"
                                                     v-if="defer(3)"></ev-request-parameter-description-editor>
        </div>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-http-client-request-docs-payload :http-request="httpRequest"
                                             v-if="menu.type === 'DESCRIPTION' && defer(4)"></ev-http-client-request-docs-payload>

        <ev-horizon-gutter :gutter="32"></ev-horizon-gutter>

        <!-- Response -->

        <ev-http-client-request-docs-subtitle :showAddButton="true"
                                              @add-item="handleAddExample">{{ $t('EvHttpClientRequestDocs.response') }}
        </ev-http-client-request-docs-subtitle>

        <ev-http-client-empty-placeholder v-if="responseExamples.length === 0" style="margin-top: 16px">
            {{ $t('payload_1') }}
            <ev-download-icon style="margin-left: 2px; margin-right: 2px"></ev-download-icon>
            {{ $t('payload_2') }}
            <span style="font-weight: bold">{{ $t('payload_3') }}</span>
        </ev-http-client-empty-placeholder>

        <ev-http-client-docs-response v-for="example in responseExamples"
                                      v-if="menu.type === 'DESCRIPTION' && defer(5) "
                                      :example="example"
                                      @remove-item="handleRemoveExample"></ev-http-client-docs-response>

        <ev-horizon-gutter :gutter="128"></ev-horizon-gutter>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvRequestParameterDescriptionEditor from '@/views/http-client/components/request-parameter-description-editor/EvRequestParameterDescriptionEditor'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvHttpClientRequestDocsSubtitle from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsSubtitle'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvHttpClientRequestDocsExample from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsExample'
    import GHCHttpClientUrlHelper from '@/views/http-client/core/GHCHttpClientUrlHelper'
    import GHCJsonNodeBuilder from '@/components/json-editor-vsl/GHCJsonNodeBuilder'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvHttpClientRequestDocsBodySubtitle from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsBodySubtitle'
    import EvHttpClientResponseDocsStatusCode from '@/views/http-client/request/request-docs/response-docs/EvHttpClientResponseDocsStatusCode'
    import EvHttpClientResponseDocsContent from '@/views/http-client/request/request-docs/response-docs/EvHttpClientResponseDocsContent'
    import EvHttpClientRequestDocsBody from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsBody'
    import EvHttpClientRequestDocsPayload from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsPayload'
    import EvHttpClientEmptyPlaceholder from '@/views/http-client/components/EvHttpClientEmptyPlaceholder'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import EvAutoResizeTextarea from '@/components/input/EvAutoResizeTextarea'
    import EvExportIcon from '@/views/http-client/icon/ev-export-icon'
    import EvDownloadIcon from '@/views/http-client/icon/ev-download-icon'
    import Defer from '@/mixins/Defer'
    import EvTextButton from '@/components/button/EvTextButton'
    import GHCHttpClientRequestDocsExporter from '@/views/http-client/request/request-docs/GHCHttpClientRequestDocsExporter'
    import {clipboard} from 'electron'
    import EvHttpClientDocsResponse from '@/views/http-client/request/request-docs/components/EvHttpClientDocsResponse'
    import RabiHttpResponseExample from '@/data/gotcha/http-operation/RabiHttpResponseExample'
    import EvHttpClientRequestDocsProperties from '@/views/http-client/request/request-docs/EvHttpClientRequestDocsProperties'
    import {EvHttpClientRequestDocsEventBus, EvHttpClientRequestDocsEvents} from '@/views/http-client/request/EvHttpClientRequestDocsEventBus'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvCounterLabel from '@/components/label/EvCounterLabel'

    export default {
        name: "EvHttpClientRequestDocs",

        components: {
            EvCounterLabel,
            EvJsonAddButton,
            EvHttpClientRequestDocsProperties,
            EvHttpClientDocsResponse,
            EvTextButton,
            EvDownloadIcon,
            EvExportIcon,
            EvAutoResizeTextarea,
            EvHttpClientEmptyPlaceholder,
            EvHttpClientRequestDocsPayload,
            EvHttpClientRequestDocsBody,
            EvHttpClientResponseDocsContent,
            EvHttpClientResponseDocsStatusCode,
            EvHttpClientRequestDocsBodySubtitle,
            EvHttpClientRequestDocsExample,
            EvCodemirrorWrapper,
            EvHttpClientRequestDocsSubtitle,
            EvHorizonDivider,
            EvHttpClientDivider,
            EvHorizonGutter,
            EvVerticalGutter,
            EvRequestParameterDescriptionEditor,
            EvLabel
        },

        mixins: [
            EvStoreMixin,
            Defer(),
        ],

        props: {
            menu: Object,

            httpRequest: Object,

            httpRequestName: String,
        },

        computed: {
            requestMethod() {
                return this.httpRequest.requestMethod
            },

            requestPath() {
                return new GHCHttpClientUrlHelper(this.httpRequest, this.dynamicVariableRender)
                    .buildRequestPathFromRequestUrl()
            },

            responseExamples() {
                return this.httpRequest.examples || []
            },

            hasRequestBody() {
                let payload = this.httpRequest.payload

                return payload && payload.type !== 'none'
            },

            hasTextRequestBody() {

            },

            isNoneRequestBody() {
                let payload = this.httpRequest.payload

                return payload && payload.type === 'none'
            },

            isTextRequestBody() {
                let payload = this.httpRequest.payload

                return payload && payload.type === 'text'
            },

            textRequestBody() {
                let payload = this.httpRequest.payload

                return payload.text.content
            },

            isJsonRequestBody() {
                let payload = this.httpRequest.payload

                return payload && payload.type === 'json'
            },

            jsonRequestBody() {
                let builder = new GHCJsonNodeBuilder(this.dynamicVariableRender)

                return JSON.stringify(builder.buildJsonFromJsonNode(this.httpRequest.payload.json.root), null, 4)
            },

            isFormRequestBody() {
                let payload = this.httpRequest.payload

                return payload && payload.type === 'form'
            },

            formRequestBodyItems() {

            },

            isMultipartRequestBody() {
                let payload = this.httpRequest.payload

                return payload && payload.type === 'multipart'
            },

            multipartRequestBodyItems() {

            },

            isGraphQLRequestBody() {
                return false
            },

            headersOption() {
                return {
                    noTitle: true,
                    title: this.$t('EvHttpClientRequestDocs.headers'),
                    keyPlaceholder: "Header Name",
                    valuePlaceholder: "Header Description",
                }
            },

            cookiesOptions() {
                return {
                    noTitle: true,
                    title: this.$t('EvHttpClientRequestDocs.cookies'),
                    keyPlaceholder: "Cookie Name",
                    valuePlaceholder: "Cookie Description",
                }
            },

            pathParametersOption() {
                return {
                    title: this.$t('EvHttpClientRequestDocs.paths'),
                    keyPlaceholder: "/path",
                    valuePlaceholder: "Description",
                    mode: 'path'
                }
            },

            queryParametersOption() {
                return {
                    title: this.$t('EvHttpClientRequestDocs.queryParameters'),
                    keyPlaceholder: "Param Name",
                    valuePlaceholder: "Param Description"
                }
            },

            requestMethodColor() {
                if (['GET', 'HEAD'].includes(this.requestMethod)) {
                    return 'green'
                }

                if (['POST', 'PUT', 'PATCH'].includes(this.requestMethod)) {
                    return 'orange'
                }

                if (['DELETE'].includes(this.requestMethod)) {
                    return 'red'
                }

                if (['OPTIONS', 'TRACE'].includes(this.requestMethod)) {
                    return 'purple'
                }

                return '#555'
            },
        },

        data() {
            return {
                responseBodyOption: {
                    title: "Headers"
                },

                description: "",

                previousScrollTop: 0,

                headerMenu: "header", // header | cookie

                headerAvailableTypes: [],

                pathAvailableTypes: [],

                queryAvailableTypes: []
            }
        },

        methods: {
            handleRemoveExample(example) {
                let index = this.httpRequest.examples.indexOf(example)

                if (index !== -1) {
                    this.httpRequest.examples.splice(index, 1)
                }
            },

            handleAddExample() {
                this.httpRequest.examples.push(new RabiHttpResponseExample())
            },

            emitUrlParametersChange() {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_REQUEST_PATH, this.httpRequest)

                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_URL_PARAMETERS, this.httpRequest)
            },

            doCopyAsMarkdown() {
                let exporter = new GHCHttpClientRequestDocsExporter(this.currentCookieJar, this.dynamicVariableRender)

                let md = exporter.exportToMarkdown(this.httpRequest)

                clipboard.writeText(md)
            },

            // WTF ???
            onHttpClientRequestDocsScroll(event) {
                let target = event.target

                let delta = 0

                if (this.previousScrollTop === 0) {
                    this.previousScrollTop = target.scrollTop
                } else {
                    delta = target.scrollTop - this.previousScrollTop
                }

                this.previousScrollTop = target.scrollTop

                EvHttpClientRequestDocsEventBus.$emit(EvHttpClientRequestDocsEvents.SCROLL, event, delta)
            },
        },

        i18n: {
            messages: {
                en: {
                    payload_1: "Click",

                    payload_2: " in response view and select",

                    payload_3: "'Save as Example'",

                    copyAs: "Copy as {name}",

                    properties: "Properties",

                    headers: "Headers",

                    cookies: "Cookies",
                },
                zh: {
                    payload_1: "点击响应页面中的",

                    payload_2: " 图标并且选择 ",

                    payload_3: "'保存为响应示例'",

                    copyAs: "复制为 {name}",

                    properties: "接口属性",

                    headers: "请求头部",

                    cookies: "携带 Cookies",
                },
                zh_TW: {
                    payload_1: "點擊響應頁面中的",

                    payload_2: " 圖示，並選擇 ",

                    payload_3: "「保存為響應範例」",

                    copyAs: "複製為 {name}",

                    properties: "接口屬性",

                    headers: "請求標頭",

                    cookies: "攜帶 Cookies",
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-http-client-request-docs {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        padding-top: 24px;

        padding-left: 24px;

        padding-right: 24px;

        min-height: 1px;

        min-width: 1px;

        overflow-y: scroll;

        &__title {
            display: flex;

            //align-items: center;

            //min-height: 40px;

            //background-color: #FF8282;
        }

        &__subtitle {
            display: flex;

            align-items: center;

            //padding-left: 24px;

            height: 40px;
        }

        &__description-wrapper {
            display: flex;

            width: 100%;

            min-height: 72px;

            border: 1px solid #F5F5F5;

            //border-radius: 6px;
        }
    }

    .ev-editor-wrapper {
        border: 1px solid #F1F1F1;

        border-radius: 5px;
    }

    .ev-request-docs-header {
        display: flex;

        align-items: center;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        border-radius: 5px 5px 0 0;

        user-select: none;

        background-color: #FAFAFA;

        padding-left: 16px;
    }

    .ev-label-wrapper {
        display: flex;

        flex: 1;

        width: 100%;

        &__title {
            font-size: 24px;

            color: $PRIMARY_FONT_COLOR;

            line-height: 36px;

            font-weight: bold;
        }
    }
</style>

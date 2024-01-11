<template>
    <div class="http-client-response-info">
        <div class="ev-http-client-raw-bundle">
            <ev-label primary bold size="11" @click.native="showRawMessage = !showRawMessage">{{ $t('showRawMessage') }}</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-switch v-model="showRawMessage"></ev-switch>

            <v-spacer></v-spacer>

            <div class="d-flex align-center">
                <ev-label bold size="11"
                          v-bind="{grey: !showRawMessage || (messageType !== 'request'), primary: (showRawMessage && (messageType === 'request'))}"
                          @click.native="doShowRawMessage('request')">{{ $t('requestMessage') }}
                </ev-label>

                <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>

                <ev-label bold size="11"
                          v-bind="{grey: !showRawMessage || (messageType !== 'response'), primary: (showRawMessage && (messageType === 'response'))}"
                          @click.native="doShowRawMessage('response')">{{ $t('responseMessage') }}
                </ev-label>
            </div>
        </div>

        <div class="http-client-response-info__raw-container" v-if="showRawMessage">
            <ev-codemirror-wrapper ref="ev-codemirror-wrapper" :text="rawMessage" :read-only="true" mode="http"></ev-codemirror-wrapper>
        </div>

        <div class="http-client-response-info__container" v-else>
            <ev-http-client-label-divider :label="$t('EvHttpClientResponseSummary.request')"></ev-http-client-label-divider>

            <ev-key-value-viewer :items="requestItems" :options="requestInfoOptions"></ev-key-value-viewer>

            <!--        <ev-http-client-label-divider :label="$t('rawRequest')"></ev-http-client-label-divider>-->

            <!--                    <ev-http-client-raw-request-viewer :summary="summary" :visible="visible"></ev-http-client-raw-request-viewer>-->

            <!--        <ev-http-client-label-divider label="SSL Handshake"></ev-http-client-label-divider>-->

            <!--        <ev-key-value-viewer :items="responseItems" :options="responseInfoOptions"></ev-key-value-viewer>-->

            <ev-http-client-label-divider :label="$t('EvHttpClientResponseSummary.redirects')" v-if="hasRedirectUrl"></ev-http-client-label-divider>

            <ev-key-value-viewer :items="redirectItems" :options="responseInfoOptions" v-if="hasRedirectUrl"></ev-key-value-viewer>

            <ev-http-client-label-divider :label="$t('EvHttpClientResponseSummary.response')"></ev-http-client-label-divider>

            <ev-key-value-viewer :items="responseItems" :options="responseInfoOptions"></ev-key-value-viewer>

            <ev-http-client-label-divider :label="$t('EvHttpClientResponseSummary.timeline')"></ev-http-client-label-divider>

            <ev-key-value-viewer :items="timingItems" :options="timingInfoOptions"></ev-key-value-viewer>
        </div>


    </div>
</template>

<script>
    import EvKeyValueViewer from '@/views/http-client/components/key-value-viewer/EvKeyValueViewer'
    import KeyValueViewerItem from '@/views/http-client/components/key-value-viewer/KeyValueViewerItem'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvHttpClientLabelDivider from '@/views/http-client/components/EvHttpClientLabelDivider'
    import EvHttpClientDividerPlaceholder from '@/views/http-client/components/EvHttpClientDividerPlaceholder'
    import _ from 'lodash'
    import EvCodemirrorWrapper from '@/components/input/EvCodemirrorWrapper'
    import EvHttpClientRawRequestViewer from '@/views/http-client/response/EvHttpClientRawRequestViewer'
    import EvLabel from '@/components/typography/EvLabel'
    import EvCheckbox from '@/components/button/EvCheckbox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvSwitch from '@/components/button/EvSwitch'

    export default {
        name: "EvHttpClientResponseSummary",

        components: {
            EvSwitch,
            EvVerticalGutter,
            EvCheckbox,
            EvLabel,
            EvHttpClientRawRequestViewer,
            EvCodemirrorWrapper,
            EvHttpClientDividerPlaceholder,
            EvHttpClientLabelDivider,
            EvHttpClientDivider,
            EvKeyValueViewer
        },

        props: {
            httpResponse: Object,

            visible: false,
        },

        data() {
            return {
                requestInfoOptions: {
                    withoutTitle: true,
                },

                responseInfoOptions: {
                    withoutTitle: true,
                },

                timingInfoOptions: {
                    withoutTitle: true
                },

                showRawMessage: false,

                messageType: "request"
            }
        },

        computed: {
            rawMessage() {
                if (this.messageType === 'request') {
                    return this.summary.rawRequestMessage
                }

                if (this.messageType === 'response') {
                    return this.summary.rawResponseMessage
                }
            },

            summary() {
                return this.httpResponse.summary
            },

            requestItems() {
                let items = []

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.requestUrl'), this.summary.requestUrl))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.date'), this.summary.date))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.ipAddress'), this.summary.remoteIP))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.proxy'), this.summary.proxy))

                return items
            },

            hasRedirectUrl() {
                return !_.isEmpty(this.httpResponse.redirectUrls)
            },

            redirectItems() {
                let items = []

                for (let i = 0; i < this.httpResponse.redirectUrls.length; i++) {
                    items.push(new KeyValueViewerItem(`# ${i + 1}`, this.httpResponse.redirectUrls[i]))
                }

                return items
            },

            responseItems() {
                let items = []

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.responseStatus'), this.summary.statusCode + ' ' + this.summary.statusText))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.responseEncoding'), this.summary.responseBodyEncoding || '/'))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.responseType'), this.summary.responseBodyType))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.responseSize'), this.summary.responseBodySize))

                return items
            },

            timingItems() {
                let timing = this.summary.timing

                let items = []

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.connectionStart'), (timing.wait || 0) + ' ms '))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.dnsLookup'), (timing.dns || 0) + ' ms '))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.tlsHandshake'), (timing.tls || 0) + ' ms '))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.requestSent'), (timing.request || '< 1') + ' ms '))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.waiting'), (timing.firstByte || '< 1') + ' ms '))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.contentDownload'), (timing.download || '< 1') + ' ms '))

                items.push(new KeyValueViewerItem(this.$t('EvHttpClientResponseSummary.total'), (timing.total || 0) + ' ms '))

                return items
            },
        },

        methods: {
            doShowRawMessage(type) {
                this.showRawMessage = true

                this.messageType = type
            },
        },

        i18n: {
            messages: {
                en: {
                    rawRequest: "Raw Request Header",

                    showRawMessage: "Show Raw Message",

                    requestMessage: "Request",

                    responseMessage: "Response",
                },

                zh: {
                    rawRequest: "原始请求头",

                    showRawMessage: "查看原始报文",

                    requestMessage: "请求报文",

                    responseMessage: "响应报文",
                },

                zh_TW: {
                    rawRequest: "原始請求頭",

                    showRawMessage: "查看原始訊息",

                    requestMessage: "請求訊息",

                    responseMessage: "回應訊息",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .http-client-response-info {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        &__container {
            display: flex;

            flex-direction: column;

            width: 100%;

            height: calc(100% - 28px);

            min-height: 1px;

            min-width: 1px;

            overflow-y: scroll;
        }

        &__raw-container {
            display: flex;

            flex-direction: column;

            width: 100%;

            height: calc(100% - 28px);

            min-height: 1px;

            min-width: 1px;
        }
    }

    .ev-http-client-raw-message-container {
        display: flex;

        width: 100%;

        height: calc(100% - 28px);

        min-height: 1px;

        min-width: 1px;
    }

    .ev-http-client-raw-bundle {
        display: flex;

        align-items: center;

        width: 100%;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        padding-left: 16px;

        padding-right: 16px;
    }

</style>

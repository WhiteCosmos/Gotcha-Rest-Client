<template>
    <div class="http-client-response-headers">
        <ev-key-value-viewer :items="headers"
                             :options="headersOption"
                             :diff-color="true"
                             @add-assertion="emitAddResponseHeaderAssertion"></ev-key-value-viewer>

        <ev-http-client-divider v-if="hasCookie"></ev-http-client-divider>

        <ev-key-value-viewer v-if="hasCookie"
                             :items="cookies"
                             :options='cookiesOption'
                             :diff-color="true"></ev-key-value-viewer>

        <ev-http-client-divider-placeholder></ev-http-client-divider-placeholder>
    </div>
</template>

<script>
    import EvKeyValueViewer from '@/views/http-client/components/key-value-viewer/EvKeyValueViewer'
    import KeyValueViewerItem from '@/views/http-client/components/key-value-viewer/KeyValueViewerItem'
    import EvHttpMethodLabel from '@/views/http-client/components/EvHttpMethodLabel'
    import EvHttpClientLabelDivider from '@/views/http-client/components/EvHttpClientLabelDivider'
    import {Cookie} from 'tough-cookie'
    import EvHttpClientDividerPlaceholder from '@/views/http-client/components/EvHttpClientDividerPlaceholder'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import {EvHttpClientRequestTestsEventBus, EvHttpClientRequestTestsEvents} from '@/views/http-client/request/request-tests/EvHttpClientRequestTestsEventBus'

    export default {
        name: "EvHttpClientResponseHeaders",

        components: {
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvHttpClientDivider,
            EvHttpClientDividerPlaceholder,
            EvHttpClientLabelDivider,
            EvHttpMethodLabel,
            EvKeyValueViewer
        },

        props: {
            httpResponse: Object // RabiHttpResponse
        },

        computed: {
            headers() {
                let items = []

                let headers = this.httpResponse.headers

                for (let headerKey in headers) {
                    let headerValue = headers[headerKey]

                    let item = new KeyValueViewerItem()

                    item.key = headerKey

                    item.value = headerValue

                    items.push(item)
                }

                items.sort((a, b) => {
                    if (a.key > b.key) {
                        return 1
                    }

                    if (a.key < b.key) {
                        return -1
                    }

                    return 0
                })

                return items
            },

            headersOption() {
                return {
                    keyTitle: this.$t('headerName'),

                    valueTitle: this.$t('headerValue'),

                    copyable: true,

                    copyToClipboard: this.copyHeadersToClipboard,

                    contextMenu: true,
                }
            },

            cookiesOption() {
                return {
                    keyTitle: this.$t('cookieName'),

                    valueTitle: this.$t('cookieValue'),
                }
            },

            hasCookie() {
                return this.cookies && this.cookies.length > 0
            },

            cookies() {
                let cookies

                if (!this.httpResponse.headers['set-cookie']) {
                    return []
                }

                if (this.httpResponse.headers['set-cookie'] instanceof Array) {
                    cookies = this.httpResponse.headers['set-cookie'].map(Cookie.parse)
                } else {
                    cookies = [Cookie.parse(this.httpResponse.headers['set-cookie'])]
                }

                let items = []

                cookies.forEach(cookie => {
                    let item = new KeyValueViewerItem()

                    item.key = cookie.key

                    item.value = cookie.value

                    items.push(item)
                })

                return items
            }
        },

        methods: {
            copyHeadersToClipboard(headers) {
                let text = ""

                headers.forEach(header => {
                    text += `${header.key}:${header.value}\n`
                })

                return text
            },

            emitAddResponseHeaderAssertion(item) {
                EvHttpClientRequestTestsEventBus.$emit(EvHttpClientRequestTestsEvents.ADD_RESPONSE_HEADER_ASSERTION, this.httpResponse, item)
            },
        },

        i18n: {
            messages: {
                en: {
                    headerName: "Header Name",

                    headerValue: "Header Value",

                    cookieName: "Cookie Name",

                    cookieValue: "Cookie Value",

                    copyToClipboard: "Copy to Clipboard"
                },
                zh: {
                    headerName: "参数名",

                    headerValue: "返回值",

                    cookieName: "Cookie 名",

                    cookieValue: "Cookie 值",

                    copyToClipboard: "复制到剪切板"
                },

                zh_TW: {
                    headerName: "標頭名稱",

                    headerValue: "標頭值",

                    cookieName: "Cookie 名稱",

                    cookieValue: "Cookie 值",

                    copyToClipboard: "複製到剪貼板"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .http-client-response-headers {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        width: 100%;

        height: 100%;

        overflow-y: scroll;
    }
</style>

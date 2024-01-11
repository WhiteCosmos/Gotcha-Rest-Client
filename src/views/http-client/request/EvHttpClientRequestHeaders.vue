<template>
    <div class="ev-http-client-request-headers">
        <ev-request-parameter-editor v-if="defer(1)"
                                     v-model="httpRequest.headers"
                                     @export-parameters="handleExportHeaders"
                                     @import-parameters="handleImportHeaders"
                                     :http-request="httpRequest"
                                     :options="headerOptions"></ev-request-parameter-editor>

        <ev-http-client-divider v-if="!isTemplateMode"></ev-http-client-divider>

        <ev-cookie-editor v-if="defer(2) && !isTemplateMode"
                          :http-request="httpRequest"></ev-cookie-editor>

        <div class="d-flex flex-shrink-0" style="height: 96px"></div>
    </div>
</template>

<script>
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import KeyValueItemHelper from '@/views/http-client/request/key-value-editor/KeyValueItemHelper'
    import EvCookieEditor from '@/views/http-client/components/cookie-editor/EvCookieEditor'
    import EvHttpClientRequestHeadersMixin from '@/views/http-client/request/EvHttpClientRequestHeadersMixin'
    import EvRequestParameterEditor from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditor'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import GHCObjectHelper from '@/core/helper/GHCObjectHelper'
    import EvStoreMixin from '@/mixins/EvStoreMixin'

    import {clipboard} from 'electron'
    import _ from 'lodash'
    import GHCRequestParameterItem from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
    import Defer from '@/mixins/Defer'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpClientRequestHeaders",

        components: {
            EvRequestParameterEditor,
            EvCookieEditor,
            EvHttpClientDivider,
        },

        mixins: [
            EvHttpClientRequestHeadersMixin,
            EvStoreMixin,
            Defer(),
        ],

        created() {
            EvHttpClientEventBus.$on(EvHttpClientEvents.ADD_REQUEST_HEADER, this.handleAddRequestHeader)

            EvHttpClientEventBus.$on(EvHttpClientEvents.REMOVE_REQUEST_HEADER, this.handleRemoveRequestHeader)
        },

        beforeDestroy() {
            EvHttpClientEventBus.$off(EvHttpClientEvents.ADD_REQUEST_HEADER, this.handleAddRequestHeader)

            EvHttpClientEventBus.$off(EvHttpClientEvents.REMOVE_REQUEST_HEADER, this.handleRemoveRequestHeader)
        },

        props: {
            httpRequest: Object,
            configuration: Object,
        },

        computed: {
            headerOptions() {
                return {
                    title: this.$t('headers'),

                    keyPlaceholder: this.$t('headerName'),

                    valuePlaceholder: this.$t('headerValue'),

                    importerLabel: this.$t('headerImporterLabel'),

                    importerPlaceholder: "\'foo : goo\' e.g.",

                    exporterLabel: this.$t('headerExporterLabel'),

                    availableKeys: this.availableRequestHeaders,

                    required: true
                }
            },

            cookieOptions() {

            },

            isTemplateMode() {
                return this.configuration.template === true
            },
        },

        methods: {
            handleAddRequestHeader(httpRequest, key, value) {
                if (GHCObjectHelper.notEquals(httpRequest, this.httpRequest)) {
                    return
                }

                KeyValueItemHelper.addKeyValueItem(this.httpRequest.headers, key, value)
            },

            handleRemoveRequestHeader(httpRequest, key) {
                if (GHCObjectHelper.notEquals(httpRequest, this.httpRequest)) {
                    return
                }

                KeyValueItemHelper.removeKeyValueItem(this.httpRequest.headers, key)
            },

            handleImportHeaders(str) {
                if (!str) {
                    return
                }

                let items = []

                try {
                    let obj = GHCJson.parse(str)

                    for (let key in obj) {
                        let item = new GHCRequestParameterItem({
                            key: key,
                            value: obj[key]
                        })

                        items.push(item)
                    }
                } catch (e) {
                    let lines = str.split('\n')

                    if (_.isEmpty(lines)) {
                        return
                    }

                    let regexp = /(.+?):(.*)/

                    lines.forEach(line => {
                        let match = line.match(regexp)

                        if (_.isEmpty(match) || match.length < 2) {
                            return
                        }

                        let item = new GHCRequestParameterItem({
                            key: match[1].trim(),
                            value: match[2].trim(),
                        })

                        items.push(item)
                    })
                }

                this.httpRequest.headers.push(...items)
            },

            handleExportHeaders(type) {
                this.dynamicVariableRender.setHttpRequest(this.httpRequest)

                let headers = this.httpRequest.headers

                if (type === 'text') {
                    let text = ''

                    headers.forEach(header => {
                        text += `${header.key} : ${this.dynamicVariableRender.render(header.value)}\n`
                    })

                    clipboard.writeText(text)
                }

                if (type === 'json') {
                    let json = {}

                    headers.forEach(header => {
                        json[header.key] = this.dynamicVariableRender.render(header.value)
                    })

                    let jsonStr = JSON.stringify(json, null, 2)

                    clipboard.writeText(jsonStr)
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    headers: "Headers",

                    headerName: "Header Name",

                    headerValue: "Header Value",

                    headerImporterLabel: "Import",

                    headerExporterLabel: "Export",

                    cookieImporterLabel: "Import",

                    cookieExporterLabel: "Export",
                },
                zh: {
                    headers: "请求头部",

                    headerName: "Header Name",

                    headerValue: "Header Value",

                    headerImporterLabel: "导入参数",

                    headerExporterLabel: "导出参数",

                    cookieImporterLabel: "导入 Cookie",

                    cookieExporterLabel: "导出 Cookie",
                },
                zh_TW: {
                    "headers": "請求頭部",
                    "headerName": "Header Name",
                    "headerValue": "Header Value",
                    "headerImporterLabel": "導入參數",
                    "headerExporterLabel": "導出參數",
                    "cookieImporterLabel": "導入 Cookie",
                    "cookieExporterLabel": "導出 Cookie"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/scrollbar.scss";

    .ev-http-client-request-headers {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        overflow-y: scroll;
    }
</style>

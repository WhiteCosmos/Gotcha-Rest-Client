<template>
    <div class="request-parameters">
        <ev-http-client-request-url-config
            :http-request="httpRequest"
            :request-url="httpRequest.requestUrl"
            @change="emitUrlParametersChange"></ev-http-client-request-url-config>

        <ev-http-client-divider></ev-http-client-divider>

        <ev-request-parameter-editor v-if="defer(2)"
                                     :options="pathOptions"
                                     v-model="httpRequest.pathParameters"
                                     @export-parameters="handleExportPathParameters"
                                     @import-parameters="handleImportPathParameters"
                                     @update-items="emitUrlParametersChange"></ev-request-parameter-editor>

        <ev-http-client-divider></ev-http-client-divider>

        <ev-request-parameter-editor v-if="defer(3)"
                                     :options="queryOptions"
                                     :config="httpRequest.queryParametersConfig"
                                     v-model="httpRequest.queryParameters"
                                     @export-parameters="handleExportQueryParameters"
                                     @import-parameters="handleImportQueryParameters"
                                     @update-items="emitUrlParametersChange"></ev-request-parameter-editor>

        <div class="d-flex flex-shrink-0" style="height: 96px"></div>
    </div>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvHorizonDivider from '@/components/layout/EvHorizonDivider'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvHttpClientRequestUrlConfig from '@/views/http-client/components/EvHttpClientRequestUrlConfig'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import EvRequestParameterEditor from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditor'
    import EvHttpEmptyPlaceholder from '@/components/http/EvHttpEmptyPlaceholder'
    import GHCQueryParametersConfig from '@/data/gotcha/http-operation/GHCQueryParametersConfig'
    import {clipboard} from 'electron'
    import _ from 'lodash'
    import GHCRequestParameterItem from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvCheckedStatusHelper from '@/mixins/EvCheckedStatusHelper'
    import Defer from '@/mixins/Defer'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpClientRequestUrlParameters",

        components: {
            EvHttpEmptyPlaceholder,
            EvRequestParameterEditor,
            EvHttpClientRequestUrlConfig,
            EvHttpClientDivider,
            EvHorizonDivider,
            EvHorizonGutter,
        },

        mixins: [
            EvStoreMixin,
            Defer(),
        ],

        created() {
            /**
             * since 1.4.6
             */
            if (!this.httpRequest.queryParametersConfig) {
                this.$set(this.httpRequest, 'queryParametersConfig', new GHCQueryParametersConfig())
            }
        },

        props: {
            httpRequest: Object,
        },

        data() {
            return {}
        },

        computed: {
            pathOptions() {
                return {
                    title: this.$t('pathParameters'),

                    valuePlaceholder: "/path",

                    importerPlaceholder: "\'/foo/goo\' e.g.",

                    importerLabel: this.$t('pathImporterLabel'),

                    exporterLabel: this.$t('pathExporterLabel'),

                    required: false,

                    mode: 'path',
                }
            },

            queryOptions() {
                return {
                    title: this.$t('queryParameters'),

                    keyPlaceholder: 'Param Name',

                    valuePlaceholder: 'Param Value',

                    importerPlaceholder: "foo : goo e.g.",

                    importerLabel: this.$t('queryImporterLabel'),

                    exporterLabel: this.$t('queryExporterLabel'),

                    required: true,

                    mode: 'query'
                }
            },
        },

        methods: {
            emitUrlParametersChange() {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_REQUEST_PATH, this.httpRequest)

                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_URL_PARAMETERS, this.httpRequest)
            },

            handleImportPathParameters(str) {
                if (!str) {
                    return
                }

                let parts = str.split('/')

                if (_.isEmpty(parts)) {
                    return
                }

                let items = []

                parts.forEach(part => {
                    if (_.isEmpty(part)) {
                        return
                    }

                    let item = new GHCRequestParameterItem({
                        value: part.trim()
                    })

                    items.push(item)
                })

                this.httpRequest.pathParameters.push(...items)
            },

            handleExportPathParameters(type) {
                this.dynamicVariableRender.setHttpRequest(this.httpRequest)

                let parameters = this.httpRequest.pathParameters

                if (type === 'text') {
                    let text = ''

                    parameters.forEach(p => {
                        let path = this.dynamicVariableRender.render(p.value)

                        !path.startsWith('/') && (text += '/')

                        text += path
                    })

                    clipboard.writeText(text)
                }

                if (type === 'json') {
                    let json = []

                    parameters.forEach(p => {
                        json.push(this.dynamicVariableRender.render(p.value))
                    })

                    clipboard.writeText(JSON.stringify(json, null, 2))
                }
            },

            handleImportQueryParameters(str) {
                if (!str) {
                    return
                }

                let items = []

                // TODO 提取到公共方法

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
                        return items
                    }

                    let regexp = /(.+?):(.*)/

                    lines.forEach(line => {
                        let match = line.match(regexp)

                        if (_.isEmpty(match) || match.length < 2) {
                            return
                        }

                        let item = new GHCRequestParameterItem({
                            key: match[1],
                            value: match[2]
                        })

                        items.push(item)
                    })
                }

                this.httpRequest.queryParameters.push(...items)
            },

            handleExportQueryParameters(type) {
                this.dynamicVariableRender.setHttpRequest(this.httpRequest)

                let parameters = this.httpRequest.queryParameters

                if (type === 'text') {
                    let text = ''

                    parameters.forEach(p => {
                        if (EvCheckedStatusHelper.isItemUnchecked(p)) {
                            return
                        }

                        if (p.dataType === 'array') {
                            p.children.forEach(child => {
                                text += `${p.key} : ${this.dynamicVariableRender.render(child.value)}\n`
                            })
                        } else {
                            text += `${p.key} : ${this.dynamicVariableRender.render(p.value)}\n`
                        }
                    })

                    clipboard.writeText(text)
                }

                if (type === 'json') {
                    let json = {}

                    parameters.forEach(p => {
                        if (EvCheckedStatusHelper.isItemUnchecked(p)) {
                            return
                        }

                        if (p.dataType === 'array') {
                            json[p.key] = []
                            p.children.forEach(child => {
                                json[p.key].push(this.dynamicVariableRender.render(child.value))
                            })
                        } else {
                            json[p.key] = this.dynamicVariableRender.render(p.value)
                        }
                    })

                    let jsonStr = JSON.stringify(json, null, 4)

                    clipboard.writeText(jsonStr)
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    pathParameters: "Paths",

                    queryParameters: "Query Parameters",

                    paramName: "Param Name",

                    paramValue: "Param Value",

                    pathImporterLabel: "Import",

                    pathExporterLabel: "Export",

                    queryImporterLabel: "Import",

                    queryExporterLabel: "Export"
                },
                zh: {
                    pathParameters: "请求路径",

                    queryParameters: "查询参数",

                    paramName: "参数名",

                    paramValue: "参数值",

                    pathImporterLabel: "导入路径",

                    pathExporterLabel: "导出路径",

                    queryImporterLabel: "导入参数",

                    queryExporterLabel: "导出参数"
                },
                zh_TW: {
                    "pathParameters": "請求路徑",
                    "queryParameters": "查詢參數",
                    "paramName": "參數名",
                    "paramValue": "參數值",
                    "pathImporterLabel": "導入路徑",
                    "pathExporterLabel": "導出路徑",
                    "queryImporterLabel": "導入參數",
                    "queryExporterLabel": "導出參數"

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .request-parameters {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        overflow-y: scroll;
    }
</style>

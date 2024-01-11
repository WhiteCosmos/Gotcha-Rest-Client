<template>
    <div class="ev-http-client-request-body__wrapper">
        <ev-request-parameter-editor page-mode
                                     :options="formOptions"
                                     @export-parameters="handleExportParameters"
                                     @import-parameters="handleImportParameters"
                                     v-model="items"></ev-request-parameter-editor>
    </div>
</template>

<script>
    import EvRequestParameterEditor from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditor'
    import GHCRequestParameterItem from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
    import _ from 'lodash'
    import {clipboard} from 'electron'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpClientFormRequestBody",

        components: {
            EvRequestParameterEditor,
        },

        props: {
            httpRequest: Object
        },

        data() {
            return {
                formOptions: {
                    title: "Form (application/x-www-form-urlencoded)",

                    keyPlaceholder: "Form Key",

                    valuePlaceholder: "Form Value",

                    importerPlaceholder: "Supported Formats:\n" +
                        "- query-string\n" +
                        "- key-value\n" +
                        "- json\n",

                    importerLabel: this.$t('formImporterLabel'),

                    exporterLabel: this.$t('formExporterLabel'),
                },

                render: false
            }
        },

        computed: {
            items: {
                get() {
                    return this.httpRequest.payload.form.items
                },
                set(values) {
                    this.httpRequest.payload.form.items = values
                },
            },
        },

        mounted() {

        },

        methods: {
            handleImportParameters(str) {
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

                if (items.length !== 0) {
                    this.httpRequest.payload.form.items.push(...items)
                    return
                }

                const queryString = require('query-string')

                let parsedForm = queryString.parse(str)

                if (parsedForm.length !== 0) {
                    for (let key in parsedForm) {
                        let value = parsedForm[key]

                        if (value instanceof Array) {
                            value.forEach(it => {
                                let item = new GHCRequestParameterItem({
                                    key: key,
                                    value: it,
                                })

                                items.push(item)
                            })
                        } else {
                            let item = new GHCRequestParameterItem({
                                key: key,
                                value: value,
                            })

                            items.push(item)
                        }

                    }
                }

                this.httpRequest.payload.form.items.push(...items)
            },

            handleExportParameters(type) {
                let items = this.httpRequest.payload.form.items

                if (type === 'text') {
                    let text = ''

                    items.forEach(p => {
                        text += `${p.key} : ${this.dynamicVariableRender.render(p.value)}\n`
                    })

                    clipboard.writeText(text)
                }

                if (type === 'json') {
                    let json = {}

                    items.forEach(p => {
                        json[p.key] = this.dynamicVariableRender.render(p.value)
                    })

                    let jsonStr = JSON.stringify(json, null, 2)

                    clipboard.writeText(jsonStr)
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    formImporterLabel: "Import",

                    formExporterLabel: "Export",
                },
                zh: {
                    formImporterLabel: "导入表单",

                    formExporterLabel: "导出表单"
                },
                zh_TW: {
                    formImporterLabel: "匯入表單",

                    formExporterLabel: "匯出表單"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvHttpClientRequestBody";

    @import "~@/styles/scrollbar.scss";
</style>

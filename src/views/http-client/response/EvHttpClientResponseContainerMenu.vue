<template>
    <div class="d-flex align-center http-client-response-container-menu">
        <ev-vertical-gutter :gutter="2"></ev-vertical-gutter>

        <ev-http-client-time-machine :http-operation="httpOperation"></ev-http-client-time-machine>

        <v-spacer></v-spacer>

        <ev-http-client-response-container-menu-item
            v-for="item in responseContainerMenus"
            :payload="responsePayload"
            :item="item" @click.native="doSelectMenu(item)"
            :selected-item="menu_"></ev-http-client-response-container-menu-item>

        <v-spacer></v-spacer>

        <div class="d-flex justify-end" style="width: 64px">
            <v-menu v-model="showContextMenu" v-bind="config" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <div v-on="on"
                         class="d-flex align-center justify-center http-client-save-response"
                         @click="">
                        <ev-download-icon></ev-download-icon>
                    </div>
                </template>

                <ev-context-menu>
                    <ev-context-menu-item @click.native="doSaveAsExample">{{
                            $t('saveAsExample')
                        }}
                    </ev-context-menu-item>

                    <!--                    <ev-context-menu-item @click.native="doSaveAsExample">{{ $t('saveAsSchema') }}</ev-context-menu-item>-->

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <ev-context-menu-item @click.native="doCopyToClipboard">{{ $t('copyToClipboard') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.native="doDownloadResponseBody">{{ $t('saveAsFile') }}</ev-context-menu-item>
                </ev-context-menu>
            </v-menu>
        </div>
    </div>
</template>

<script>
import EvHttpClientMenuMixin from '@/views/http-client/mixins/EvHttpClientMenuMixin'
import EvHttpClientResponseContainerMenuItem from '@/views/http-client/response/EvHttpClientResponseContainerMenuItem'
import EvHttpClientTimeMachine from '@/views/http-client/response/EvHttpClientTimeMachine'
import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
import EvToolButton from '@/components/button/EvToolButton'
import EvDownloadIcon from '@/views/http-client/icon/ev-download-icon'
import _ from 'lodash'
import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
import EvContextMenu from '@/components/menu/EvContextMenu'
import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
import {clipboard} from 'electron'
import RabiHttpResponseExample from '@/data/gotcha/http-operation/RabiHttpResponseExample'
import EvProTag from '@/components/tag/EvProTag.vue'

export default {
    name: "EvHttpClientResponseContainerMenu",

    components: {
        EvProTag,
        EvContextMenuDivider,
        EvContextMenuItem,
        EvContextMenu,
        EvDownloadIcon,
        EvToolButton,
        EvVerticalGutter,
            EvHttpClientTimeMachine,
            EvHttpClientResponseContainerMenuItem
        },

        mixins: [
            EvHttpClientMenuMixin,
        ],

        model: {
            prop: 'menu',
            event: 'change'
        },

        props: {
            menu: Object,

            httpOperation: Object,
        },

        created() {
            this.setHeaderCounter()

            this.setAssertionStatus()

            EvHttpClientEventBus.$on(EvHttpClientEvents.SEND_REQUEST_COMPLETE, this.handleSendRequestComplete)
        },

        beforeDestroy() {
            EvHttpClientEventBus.$off(EvHttpClientEvents.SEND_REQUEST_COMPLETE, this.handleSendRequestComplete)
        },

        mounted() {
            this.menu_ = this.menu
        },

        watch: {
            menu() {
                this.menu_ = this.menu
            },
        },

        data() {
            return {
                menu_: {
                    name: "Body",

                    type: "RESPONSE_BODY"
                },

                showContextMenu: false,
            }
        },

        computed: {
            hasResponseBody() {
                if (!this.httpOperation.httpResponse) {
                    return false
                }

                let httpResponse = this.httpOperation.httpResponse

                return httpResponse.payload !== undefined
            },

            responsePayload() {
                return this.httpOperation.httpResponse.payload
            },

            isAssertionPass() {

            },

            config() {
                return {
                    'nudge-bottom': 3,

                    transition: "dummy"
                }
            },
        },

        methods: {
            handleSendRequestComplete(httpRequest) {
                if (httpRequest.uid !== this.httpOperation.httpRequest.uid) {
                    return
                }

                this.setHeaderCounter()

                this.setAssertionStatus()
            },

            doSelectMenu(menu) {
                this.$emit('change', menu)
            },

            doSaveAsExample() {
                let httpRequest = this.httpOperation.httpRequest

                let httpResponse = this.httpOperation.httpResponse

                !httpRequest.examples && (httpRequest.examples = [])

                let examples = httpRequest.examples

                // Remove exists example

                let exists = examples.find(example => {
                    return example.statusCode === httpResponse.statusCode
                })

                exists && (examples.splice(examples.indexOf(exists), 1))

                // Add new example

                let example = new RabiHttpResponseExample()

                example.statusCode = httpResponse.statusCode

                example.statusText = httpResponse.statusText

                let payload = httpResponse.payload

                if (payload) {
                    example.dType = 'text'

                    example.dContentType = payload.contentType

                    example.dExample = payload.body
                }

                examples.push(example)

                // Sort examples by status code

                examples.sort((a, b) => {
                    return a.statusCode > b.statusCode ? 1 : -1
                })
            },

            doCopyToClipboard() {
                if (!this.hasResponseBody) {
                    return
                }

                let payload = this.httpOperation.httpResponse.payload

                const {clipboard} = require('electron')

                try {
                    clipboard.writeText(payload.body)
                } catch (e) {
                    // ignore
                }
            },

            doDownloadResponseBody() {
                if (!this.hasResponseBody) {
                    return
                }

                let payload = this.httpOperation.httpResponse.payload

                const {dialog, app} = require('electron').remote

                const options = {
                    defaultPath: app.getPath('desktop'),
                    filters: [
                        {
                            name: "File Extension",
                            extensions: [payload.extension]
                        }
                    ]
                }

                let fs = require('fs')

                const currentWindow = require('electron').remote.getCurrentWindow()

                dialog.showSaveDialog(currentWindow, options).then(dir => {
                    if (dir.canceled) {
                        return
                    }

                    let payload = this.httpOperation.httpResponse.payload

                    fs.writeFileSync(dir.filePath, payload.rawBody, {})
                })
            },

            setHeaderCounter() {
                let httpResponse = this.httpOperation.httpResponse

                if (!httpResponse) {
                    return
                }

                let header = this.responseContainerMenus[1]

                let headers = httpResponse.headers

                header.counter = headers ? Object.keys(headers).length : 0
            },

            setAssertionStatus() {
                let httpResponse = this.httpOperation.httpResponse

                if (!httpResponse) {
                    return
                }

                let assertion = httpResponse.assertion

                let tests = this.responseContainerMenus[3]

                if (!assertion) {
                    tests.badge = 'none'
                    return
                }

                if (_.isEmpty(assertion.headers) && _.isEmpty(assertion.jsonPaths)) {
                    tests.badge = 'none'
                    return
                }

                let passA = assertion.headers.filter(header => {
                    return !header.pass
                })

                let passB = assertion.jsonPaths.filter(jsonPath => {
                    return !jsonPath.pass
                })

                if (_.isEmpty(passA) && _.isEmpty(passB)) {
                    tests.badge = 'green'
                } else {
                    tests.badge = 'red'
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    saveAsExample: "Save as Example",

                    saveAsSchema: "Save as Schema",

                    copyToClipboard: "Copy to Clipboard",

                    saveAsFile: "Save as File",
                },
                zh: {
                    saveAsExample: "保存为响应示例",

                    saveAsSchema: "保存为响应模型(Schema)",

                    copyToClipboard: "复制到剪切板",

                    saveAsFile: "保存为文件",
                },

                zh_TW: {
                    saveAsExample: "儲存為回應範例",

                    saveAsSchema: "儲存為回應模型(Schema)",

                    copyToClipboard: "複製到剪貼簿",

                    saveAsFile: "儲存為檔案",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-response-container-menu {
        height: 40px;

        //background-color: #FAFAFA;

        //border-bottom: 1px solid #EAEAEA;
    }

    .http-client-save-response {
        //height: 20px;

        //width: 20px;

        //@include white-background-gradient;

        //border: 1px solid #F1F1F1;

        //border-radius: 3px;
    }
</style>

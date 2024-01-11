<template>
    <v-menu v-model="showContextMenu" transition="dummy"
            nudge-top="72"
            :position-x="coordinate.x"
            :position-y="coordinate.y" absolute offset-y>
        <ev-context-menu>
            <ev-context-menu-item :hotkeys="['⌘', 'X']" @click.native="doCut">{{ $t('EvContextMenu.cut') }}</ev-context-menu-item>

            <ev-context-menu-item :hotkeys="['⌘', 'C']" @click.native="doCopy">{{ $t('EvContextMenu.copy') }}</ev-context-menu-item>

            <ev-context-menu-item :hotkeys="['⌘', 'V']" @click.native="doPaste">{{ $t('EvContextMenu.paste') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="doSelectDynamicVariable('INPUT')">{{ $t('text') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="doSelectDynamicVariable('ENUM')">{{ $t('enum') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="doSelectDynamicVariable('DATETIME')">{{ $t('datetime') }}</ev-context-menu-item>

            <ev-context-menu-item @click.native="doSelectDynamicVariable('INLINE_SCRIPT')">{{ $t('inlineScript') }}</ev-context-menu-item>

            <ev-context-submenu-item>{{ $t('environmentVariables') }}
                <template v-slot:items>
                    <div v-for="group in environmentGroups">
                        <ev-popup-menu-divider :label="getEnvironmentGroupName(group)"></ev-popup-menu-divider>

                        <ev-context-menu-item v-for="variable in group.variables"
                                              @click.native="doSelectDynamicVariable('ENVIRONMENT_VARIABLE', variable)">{{ variable.name }}
                        </ev-context-menu-item>
                    </div>
                </template>
            </ev-context-submenu-item>

            <ev-context-submenu-item>{{ $t('globalVariables') }}
                <template v-slot:items>
                    <ev-context-menu-item v-if="!globalVariables">-</ev-context-menu-item>

                    <ev-context-menu-item v-for="variable in globalVariables"
                                          @click.native="doSelectDynamicVariable('GLOBAL_VARIABLE', variable)">{{ variable.key }}
                    </ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-popup-menu-divider :label="$t('paramReference')"></ev-popup-menu-divider>

            <ev-context-submenu-item>{{ $t('requestHeader') }}
                <template v-slot:items>
                    <ev-context-menu-item v-if="headers.length === 0">-</ev-context-menu-item>

                    <ev-context-menu-item v-for="header in headers" v-if="header.key"
                                          @click.native="doSelectParameterReference('PARAMETER_REFERENCE', 'header', header)">{{ header.key }}
                    </ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-context-submenu-item>{{ $t('urlParameter') }}
                <template v-slot:items>
                    <ev-popup-menu-divider :label="$t('path')"></ev-popup-menu-divider>

                    <ev-context-menu-item v-if="pathParameters.length === 0">-</ev-context-menu-item>

                    <ev-context-menu-item v-for="pp in pathParameters"
                                          @click.native="doSelectParameterReference('PARAMETER_REFERENCE', 'path', pp)">{{ pp.key }}
                    </ev-context-menu-item>

                    <ev-popup-menu-divider :label="$t('query')"></ev-popup-menu-divider>

                    <ev-context-menu-item v-if="queryParameters.length === 0">-</ev-context-menu-item>

                    <ev-context-menu-item v-for="qp in queryParameters" v-if="qp.key"
                                          @click.native="doSelectParameterReference('PARAMETER_REFERENCE', 'query', qp)">{{ qp.key }}
                    </ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <!--            <ev-context-menu-item @click.native="doSelectDynamicVariable('RESPONSE_REFERENCE')">返回数据</ev-context-menu-item>-->

            <ev-context-menu-item @click.native="doSelectDynamicVariable('REQUEST_CHAIN')">{{ $t('requestChain') }}</ev-context-menu-item>

            <ev-context-menu-divider></ev-context-menu-divider>

            <ev-context-menu-item @click.native="doSelectDynamicVariable('FAKERJS')">FakerJS</ev-context-menu-item>


            <!--            <ev-popup-menu-divider label="数据处理"></ev-popup-menu-divider>-->

            <!--            <ev-context-submenu-item>Values-->
            <!--                <template v-slot:items>-->
            <!--                    <ev-context-menu-item>Json</ev-context-menu-item>-->

            <!--                    <ev-context-menu-item>Array</ev-context-menu-item>-->

            <!--                    <ev-context-menu-item>Boolean</ev-context-menu-item>-->
            <!--                </template>-->
            <!--            </ev-context-submenu-item>-->

            <ev-context-submenu-item>{{ $t('dataStructure') }}
                <template v-slot:items>
                    <ev-context-menu-item @click.native="doSelectDynamicVariable('UUID')">UUID</ev-context-menu-item>

                    <ev-context-menu-item @click.native="doSelectDynamicVariable('JSON')">JSON</ev-context-menu-item>

                    <!--                    <ev-context-menu-item>Nonce</ev-context-menu-item>-->

                    <!--                    <ev-context-menu-item>自增 ID</ev-context-menu-item>-->
                </template>
            </ev-context-submenu-item>

            <!--            <ev-context-menu-item>Variables</ev-context-menu-item>-->

            <!--            <ev-context-menu-item @click.native="doSelectDynamicVariable('FILE_CONTENT')">{{ $t('fileContent') }}</ev-context-menu-item>-->

            <ev-context-submenu-item>{{ $t('encoding') }}
                <template v-slot:items>
                    <ev-context-menu-item @click.native="doSelectDynamicVariable('ENCODING', 'url')">URL</ev-context-menu-item>

                    <ev-context-menu-item @click.native="doSelectDynamicVariable('ENCODING', 'base64')">BASE64</ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <ev-context-submenu-item>{{ $t('crypto') }}
                <template v-slot:items>
                    <ev-context-menu-item @click.native="doSelectDynamicVariable('CRYPTO', 'md5')">MD5</ev-context-menu-item>

                    <ev-context-menu-item @click.native="doSelectDynamicVariable('CRYPTO', 'sha128')">SHA-128</ev-context-menu-item>

                    <ev-context-menu-item @click.native="doSelectDynamicVariable('CRYPTO', 'sha256')">SHA-256</ev-context-menu-item>
                </template>
            </ev-context-submenu-item>

            <!--            <ev-context-submenu-item>Authorization-->
            <!--                <template v-slot:items>-->
            <!--                    <ev-context-menu-item>Basic Auth</ev-context-menu-item>-->

            <!--                    <ev-context-menu-item>Digest Auth</ev-context-menu-item>-->

            <!--                    <ev-context-menu-item>OAuth 2.0</ev-context-menu-item>-->

            <!--                    <ev-context-menu-item>API Token</ev-context-menu-item>-->
            <!--                </template>-->
            <!--            </ev-context-submenu-item>-->

            <!--            <ev-context-submenu-item>HTTP-->
            <!--                <template v-slot:items>-->
            <!--                    <ev-context-menu-item>URL</ev-context-menu-item>-->

            <!--                    <ev-context-menu-item>MIME Type</ev-context-menu-item>-->

            <!--                    <ev-context-menu-item>User Agent</ev-context-menu-item>-->
            <!--                </template>-->
            <!--            </ev-context-submenu-item>-->
        </ev-context-menu>
    </v-menu>
</template>

<script>
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin'
    import EvContextMenu from '@/components/menu/EvContextMenu'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvContextSubmenuItem from '@/components/menu/EvContextSubmenuItem'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvHttpClientLabelDivider from '@/views/http-client/components/EvHttpClientLabelDivider'
    import EvHttpClientRequestMixin from '@/views/http-client/request/EvHttpClientRequestMixin'

    export default {
        name: "EvDynamicVariableContextMenu",

        components: {
            EvHttpClientLabelDivider,
            EvContextSubmenuItem,
            EvPopupMenuDivider,
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu
        },

        mixins: [
            EvHttpClientRequestMixin,
            EvContextMenuMixin,
            EvStoreMixin,
        ],

        computed: {
            globalVariables() {
                let globalVariables = this.currentProject.globalVariables

                if (!globalVariables || globalVariables.length === 0) {
                    return undefined
                } else {
                    return globalVariables
                }
            },

            environmentGroups() {
                return this.currentEnvironments.groups
            },
        },

        i18n: {
            messages: {
                en: {
                    text: "Text",

                    enum: "Enum",

                    datetime: "DateTime",

                    inlineScript: "Script",

                    environmentVariables: "Environment Variables",

                    globalVariables: "Global Variables",

                    encoding: "Encoding",

                    crypto: "Crypto",

                    urlEncode: "Url Encode",

                    urlDecode: "Url Decode",

                    base64Encode: "Base64 Encode",

                    base64Decode: "Base64 Decode",

                    defaultGroup: "Default Group",

                    paramReference: "Param Reference",

                    requestHeader: "Request Headers",

                    urlParameter: "URL Parameters",

                    path: "Path",

                    query: "Query",

                    requestChain: "Request Chain",

                    dataStructure: "Data"
                },

                zh: {
                    text: "文本",

                    enum: "枚举",

                    datetime: "日期时间",

                    inlineScript: "内联脚本",

                    environmentVariables: "环境变量",

                    globalVariables: "全局变量",

                    encoding: "编码解码",

                    crypto: "数据哈希",

                    urlEncode: "URL 编码",

                    urlDecode: "URL 解码",

                    base64Encode: "BASE64 编码",

                    base64Decode: "BASE64 解码",

                    fileContent: "文件内容",

                    defaultGroup: "默认分组",

                    paramReference: "参数引用",

                    requestHeader: "请求头部",

                    urlParameter: "URL参数",

                    path: "路径参数",

                    query: "查询参数",

                    requestChain: "链式引用",

                    dataStructure: "数据结构"
                }

            }
        },

        methods: {
            show(event) {
                this.doShowContextMenu(event)
            },

            hide() {
                this.doHideContextMenu()
            },

            doSelectDynamicVariable(dv, param) {
                this.hide()

                this.$emit('select-dynamic-variable', dv, param)
            },

            doSelectParameterReference(dv, position, item) {
                this.doSelectDynamicVariable(dv, {
                    position: position,
                    uid: item.uid,
                    key: item.key
                })
            },

            doCut() {
                this.$emit('cut-dynamic-variable')
            },

            doCopy() {
                this.$emit('copy-dynamic-variable')
            },

            doPaste() {
                this.$emit('paste-dynamic-variable')
            },

            getEnvironmentGroupName(group) {
                if (group.default) {
                    return this.$t('defaultGroup')
                } else {
                    return group.name
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

</style>

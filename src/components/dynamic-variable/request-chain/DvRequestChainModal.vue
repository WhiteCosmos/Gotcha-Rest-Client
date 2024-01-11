<template>
    <div class="dv-request-chain-modal">
        <div class="dv-request-chain-modal__header">
            <ev-circle-close-button @click.native="doClose" style="position: absolute; left: 12px"></ev-circle-close-button>

            <ev-label size="11" bold secondary>{{ $t('requestChain') }}</ev-label>
        </div>

        <!--        <div class="dv-request-chain-modal__panel">-->
        <!--            <div class="d-flex flex-grow-1">-->
        <!--                <ev-borderless-input placeholder="Search..."></ev-borderless-input>-->
        <!--            </div>-->

        <!--            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>-->

        <!--            <ev-label size="11" bold secondary>Expand All</ev-label>-->

        <!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

        <!--            <ev-label size="11" bold secondary>Collapse All</ev-label>-->
        <!--        </div>-->

        <div class="dv-request-chain-modal__content">
            <ev-request-tree-view :tree-nodes="treeNodes"
                                  ref="ev-request-tree-view"
                                  @select="handleSelectTreeNode"></ev-request-tree-view>
        </div>

        <div class="dv-request-chain-modal__content__selected-request">
            <ev-label size="11" bold secondary>{{ value.requestName || '/' }}</ev-label>
        </div>

        <div class="dv-request-chain-modal__footer">
            <div class="d-flex align-center">
<!--                <ev-popup-menu-radio-item name="request_header" v-model="value_.position">{{ $t('header') }}</ev-popup-menu-radio-item>-->

                <!--                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

                <!--                <ev-popup-menu-radio-item name="url_parameter" v-model="value_.position">{{ $t('urlParams') }}</ev-popup-menu-radio-item>-->

                <!--                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>-->

                <!--                <ev-popup-menu-radio-item name="request_body" v-model="value_.position">{{ $t('requestBody') }}</ev-popup-menu-radio-item>-->

                <!--                <ev-vertical-gutter :gutter="12"></ev-vertical-gutter>-->

                <!--                <div style="height: 12px;width: 1px; background-color: #999;"></div>-->

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-popup-menu-radio-item name="response_header" v-model="value_.position">{{ $t('responseHeader') }}</ev-popup-menu-radio-item>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-popup-menu-radio-item name="response_body" v-model="value_.position">{{ $t('responseBody') }}</ev-popup-menu-radio-item>
            </div>

            <div class="d-flex align-center">
                <div class="d-flex" style="width: 240px; margin-left: 6px">
                    <input type="text" spellcheck="false"
                           :placeholder="placeholder"
                           @keyup.enter="doClose"
                           v-model="param">
                </div>

                <v-spacer></v-spacer>

                <div class="dv-request-chain-modal__button-wrapper" @click="doClose">
                    <ev-label size="11" bold color="#FFF">{{ $t('confirm') }}</ev-label>
                </div>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
            </div>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvLabel from '@/components/typography/EvLabel'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvExportTreeView from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeView'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvRequestTreeView from '@/components/dynamic-variable/request-chain/request-tree-view/EvRequestTreeView'
    import EvDataBindMixin from '@/components/mixins/EvDataBindMixin'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import AppCache from '@/AppCache'

    export default {
        name: "DvRequestChainModal",

        components: {
            EvRequestTreeView,
            EvBorderlessInput,
            EvVerticalGutter,
            EvPopupMenuRadioItem,
            EvExportTreeView,
            EvLabel,
            EvCircleCloseButton
        },

        mixins: [
            EvStoreMixin,
            EvDataBindMixin,
        ],

        created() {
            this.fetchHttpOperation()
        },

        computed: {
            treeNodes() {
                let treeNodes = this.currentModule.apis

                let flattenTreeNodes = []

                this._iterateTreeNodes(treeNodes, (treeNode) => {
                    treeNode.isContainer && (flattenTreeNodes.push(treeNode))
                })

                treeNodes.forEach(treeNode => {
                    if (!treeNode.isContainer) {
                        flattenTreeNodes.push(treeNode)
                    }
                })

                return flattenTreeNodes
            },

            placeholder() {
                switch (this.value_.position) {
                    case 'request_header':
                        return 'Header Name'
                    case 'url_parameter':
                        return 'Parameter Name'
                    case 'request_body':
                        return '$.books[0].author.name"'
                    case 'response_header':
                        return 'Header Name'
                    case 'response_body':
                        return '$.books[0].author.name"'
                    default:
                        return ''
                }
            },

            param: {
                set(value) {
                    this.value_.values[this.value_.position] = value
                },

                get() {
                    return this.value_.values[this.value_.position]
                },
            },
        },

        methods: {
            doClose() {
                this.$emit('close')
            },

            _iterateTreeNodes(treeNodes, callback = () => {
            }) {
                treeNodes.forEach(node => {
                    callback(node)

                    if (node.isContainer) {
                        this._iterateTreeNodes(node.children, callback)
                    }
                })
            },

            handleSelectTreeNode(treeNode) {
                this.value.requestId = treeNode.httpRequestId

                this.fetchHttpOperation()
            },

            fetchHttpOperation() {
                let requestId = this.value.requestId

                if (requestId === -1) {
                    return
                }

                new RabiHttpOperationDao().query({id: requestId}).then(result => {
                    if (result) {
                        AppCache.httpOperations.set(requestId, result)

                        this.value.requestName = result.name
                    }
                })
            },
        },

        i18n: {
            messages: {
                en: {
                    requestChain: "Request Chain",

                    confirm: "Confirm",

                    header: "Header",

                    urlParams: "URL Param",

                    requestBody: "Payload",

                    responseHeader: "Response Header",

                    responseBody: "Response Body",
                },

                zh: {
                    requestChain: "链式引用",

                    confirm: "确认",

                    header: "请求头部",

                    urlParams: "URL 参数",

                    requestBody: "请求数据",

                    responseHeader: "响应头部",

                    responseBody: "响应数据",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    $PADDING: 12px;

    .dv-request-chain-modal {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100vh - 240px);

        width: 480px;

        &__header {
            position: relative;

            display: flex;

            align-items: center;

            justify-content: center;

            height: 40px;

            padding-left: $PADDING;

            padding-right: 16px;

            border-bottom: 1px solid #EAEAEA;

            background-color: #F1F1F1;
        }

        &__panel {
            display: flex;

            align-items: center;

            height: 28px;

            padding-left: 12px;

            padding-right: 16px;

            border-bottom: 1px solid #EAEAEA;

            background-color: white;
        }

        &__content {
            position: relative;

            display: flex;

            flex-direction: column;

            min-height: 1px;

            min-width: 1px;

            flex: 1;

            padding-left: $PADDING;

            padding-right: $PADDING;

            background-color: #FCFCFC;

            overflow-y: scroll;

            &__selected-request {
                display: flex;

                align-items: center;

                height: 28px;

                padding-left: 20px;

                border-top: 1px solid #EAEAEA;

                background-color: #F1F1F1;
            }
        }

        &__footer {
            position: relative;

            display: flex;

            flex-direction: column;


            height: 56px;

            border-top: 1px solid #E0E0E0;

            background-color: #F1F1F1;

            padding-left: $PADDING;

            padding-right: $PADDING;
        }

        &__button-wrapper {
            display: flex;

            align-items: center;

            justify-content: center;

            width: fit-content;

            height: 20px;

            background-color: #007AFF;

            padding-left: 12px;

            padding-right: 12px;

            border-radius: 3px;
        }
    }

    input {
        width: 100%;

        height: 20px;

        border: 1px solid #E0E0E0;

        border-radius: 3px;

        background-color: white;

        text-indent: 4px;

        font-size: 12px;

        color: #555;
    }
</style>

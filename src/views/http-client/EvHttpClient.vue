<template>
    <div class="ev-http-client">
        <div class="ev-http-client__progress-bar">
            <ev-http-client-progress-bar :progress="progress"></ev-http-client-progress-bar>
        </div>

        <splitpanes class="default-theme" vertical @resize="majorViewSize = $event[0].size">
            <pane :size="majorViewSize">
                <ev-http-client-request v-if="defer(1)"
                                        ref="ev-http-client-request"
                                        :http-operation="httpOperation"
                                        :configuration="configuration"></ev-http-client-request>
            </pane>
            <pane :size="100 - majorViewSize">
                <ev-http-client-response v-if="defer(2)"
                                         ref="ev-http-client-response"
                                         :http-operation="httpOperation"
                                         :configuration="configuration"></ev-http-client-response>
            </pane>
        </splitpanes>
    </div>
</template>

<script>
    import EvHttpClientRequest from '@/views/http-client/EvHttpClientRequest'
    import EvHttpClientResponse from '@/views/http-client/EvHttpClientResponse'
    import EvHttpClientResponsePlaceholder from '@/views/http-client/EvHttpClientResponsePlaceholder'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
    import EvHttpClientProgressBar from '@/views/http-client/EvHttpClientProgressBar'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import GHCHttpClientUrlHelper from '@/views/http-client/core/GHCHttpClientUrlHelper'
    import EvHttpClientSendRequestMixin from '@/views/http-client/mixins/EvHttpClientSendRequestMixin'
    import {EvApiTreeViewEventBus, EvApiTreeViewEvents} from '@/components/api-tree/EvApiTreeViewEventBus'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import EvSplitView from '@/components/layout/EvSplitView'
    import GHCHttpClientCURLImporter from '@/views/http-client/core/GHCHttpClientCURLImporter'
    import EvJsonPlusIcon from '@/components/json-editor-vsl/icons/ev-json-plus-icon'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import GHCKeyValueAssertionItem from '@/views/http-client/components/key-value-assertion-editor/GHCKeyValueAssertionItem'
    import Defer from '@/mixins/Defer'

    import {Splitpanes, Pane} from 'splitpanes'
    import '@/styles/splitpanes.scss'

    export default {
        name: "EvHttpClient",

        components: {
            EvJsonPlusIcon,
            EvSplitView,
            EvHttpClientProgressBar,
            EvVerticalDivider,
            EvHttpClientResponsePlaceholder,
            EvHttpClientResponse,
            EvHttpClientRequest,
            Splitpanes,
            Pane,
        },

        mixins: [
            EvHttpClientSendRequestMixin,
            EvStoreMixin,
            Defer(),
        ],

        props: {
            httpOperation: Object, // RabiHttpOperation or RabiAPIRequest

            configuration: Object, // HttpClientConfiguration
        },

        created() {
            EvHttpClientEventBus.$on(EvHttpClientEvents.SEND_REQUEST, this.handleSendRequest)

            EvHttpClientEventBus.$on(EvHttpClientEvents.SEND_REQUEST_COMPLETE, this.handleSendRequestComplete)

            EvHttpClientEventBus.$on(EvHttpClientEvents.CANCEL_REQUEST, this.handleCancelRequest)

            EvHttpClientEventBus.$on(EvHttpClientEvents.MODIFY_REQUEST_METHOD, this.handleModifyRequestMethod)

            EvHttpClientEventBus.$on(EvHttpClientEvents.MODIFY_REQUEST_PATH, this.handleModifyRequestPath)

            EvHttpClientEventBus.$on(EvHttpClientEvents.IMPORT_REQUEST_FROM_CURL, this.handleImportRequestFromCurl)

            EvHttpClientEventBus.$on(EvHttpClientEvents.MAKE_VIEW, this.handleMakeView)

            EvHttpClientEventBus.$on(EvHttpClientEvents.ADD_JSONPATH_ASSERTION, this.handleAddJsonpathAssertion)

            EvApiTreeViewEventBus.$on(EvApiTreeViewEvents.UPDATE_HTTP_OPERATION_NAME, this.handleUpdateHttpOperationName)
        },

        beforeDestroy() {
            EvHttpClientEventBus.$off(EvHttpClientEvents.SEND_REQUEST, this.handleSendRequest)

            EvHttpClientEventBus.$off(EvHttpClientEvents.SEND_REQUEST_COMPLETE, this.handleSendRequestComplete)

            EvHttpClientEventBus.$off(EvHttpClientEvents.CANCEL_REQUEST, this.handleCancelRequest)

            EvHttpClientEventBus.$off(EvHttpClientEvents.MODIFY_REQUEST_METHOD, this.handleModifyRequestMethod)

            EvHttpClientEventBus.$off(EvHttpClientEvents.MODIFY_REQUEST_PATH, this.handleModifyRequestPath)

            EvHttpClientEventBus.$off(EvHttpClientEvents.IMPORT_REQUEST_FROM_CURL, this.handleImportRequestFromCurl)

            EvHttpClientEventBus.$off(EvHttpClientEvents.MAKE_VIEW, this.handleMakeView)

            EvHttpClientEventBus.$off(EvHttpClientEvents.ADD_JSONPATH_ASSERTION, this.handleAddJsonpathAssertion)

            EvApiTreeViewEventBus.$off(EvApiTreeViewEvents.UPDATE_HTTP_OPERATION_NAME, this.handleUpdateHttpOperationName)

            clearTimeout(this.progressId)
        },

        data() {
            return {
                progress: 0,

                progressId: -1,

                majorViewSize: 50,

                minorViewSize: 50,
            }
        },

        computed: {
            viewConfig() {
                return {
                    name: 'EvHttpClient',
                    minMajorViewWidth: 496,
                    minMinorViewWidth: 496,
                }
            },
        },

        watch: {
            progress(newVal) {
                if (newVal === 100) {
                    this.progressId = setTimeout(() => {
                        this.progress = 0
                    }, 300)
                }
            }
        },

        methods: {
            /**
             * Command invoke by hotkey
             */
            sendHttpRequest() {
                this.doSendHttpRequest(this.httpOperation.httpRequest)
            },

            handleImportRequestFromCurl(curlRequest, httpRequest) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                new GHCHttpClientCURLImporter(httpRequest).overrideFromCurl(curlRequest)
            },

            /**
             * @param {GHCHttpRequest} httpRequest
             */
            handleCancelRequest(httpRequest) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                httpRequest.originalRequest && httpRequest.originalRequest.cancel()

                this.$emit('cancel-request')

                this.progress = 0
            },

            handleSendRequest(httpRequest) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                this.$emit('send-request')

                this.progress = 40
            },

            handleSendRequestComplete(httpRequest) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                this.$emit('send-request-finished', this.httpOperation)

                this.progress = 100
            },

            handleModifyRequestMethod(httpRequest) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                this.$emit('modify-request-method', httpRequest.requestMethod)
            },

            /**
             * 同步更新ApiTreeView中的Path
             *
             * @param httpRequest
             */
            handleModifyRequestPath(httpRequest) {
                if (!this.isCurrentHttpRequest(httpRequest)) {
                    return
                }

                let path = new GHCHttpClientUrlHelper(httpRequest, this.dynamicVariableRender).getRequestPath(true)

                this.$emit('modify-request-path', path)
            },

            handleUpdateHttpOperationName(treeNode) {
                if (treeNode && treeNode.httpRequestId !== this.httpOperation.id) {
                    return
                }

                this.httpOperation.name = treeNode.name

                let httpRequest = this.httpOperation.httpRequest

                httpRequest.name = treeNode.name

                new RabiHttpOperationDao().save(this.httpOperation)
            },

            isCurrentHttpOperation(httpOperation) {
                return this.httpOperation.uid === httpOperation.uid
            },

            isCurrentHttpRequest(httpRequest) {
                return this.httpOperation.httpRequest.uid === httpRequest.uid
            },

            isCurrentHttpResponse(httpResponse) {
                if (!this.httpOperation.httpResponse || !httpResponse) {
                    return false
                }

                return this.httpOperation.httpResponse === httpResponse
            },

            handleMakeView(httpOperation, type) {
                if (this.isCurrentHttpOperation(httpOperation)) {
                    // let splitView = this.$refs['ev-split-view']

                    if (type === 'MAJOR') {
                        this.majorViewSize = 5
                    }

                    if (type === 'CENTER') {
                        this.majorViewSize = 50
                    }

                    if (type === 'MINOR') {
                        this.majorViewSize = 95
                    }

                    // splitView.makeView(type) // MAJOR CENTER MINOR
                }
            },

            handleAddJsonpathAssertion(httpResponse, jsonpath, type, value) {
                if (this.isCurrentHttpResponse(httpResponse)) {
                    let httpRequest = this.httpOperation.httpRequest

                    let assertion = httpRequest.assertion

                    let item = new GHCKeyValueAssertionItem()

                    item.key = jsonpath

                    if (type === 'string') {
                        item.value = value
                    }

                    if (type === 'number') {
                        item.value = String(value)
                    }

                    if (type === 'boolean') {
                        item.condition = 'T'

                        item.value = value
                    }

                    if (type === 'null') {
                        item.condition = '--'

                        item.value = null
                    }

                    assertion.jsonPaths.push(item)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client {
        position: relative;

        display: flex;

        flex: 1;

        height: 100%;

        &__progress-bar {
            position: absolute;

            top: 0px;

            width: 100%;

            height: 4px;

            z-index: 1;
        }
    }
</style>

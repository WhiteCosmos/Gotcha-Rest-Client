<template>
    <div class="content-tab" v-hotkey="hotkey">
        <ev-content-tab-navigation :content-tab="contentTab"></ev-content-tab-navigation>

        <div class="content-tab-body" @scroll="handleScroll">
            <ev-http-client v-if="isHttpRequest"
                            ref="http-request-client"
                            :key="httpRequestKey"
                            :http-operation="contentTab.httpRequest"
                            :configuration="httpRequestConfiguration"
                            @send-request="handleSendRequest"
                            @cancel-request="handleCancelRequest"
                            @send-request-finished="handleSendRequestFinished"
                            @modify-request-method="handleModifyRequestMethod"
                            @modify-request-path="handleModifyRequestPath"></ev-http-client>

            <!--            <ev-websocket-client-->
            <!--                v-if="isWebsocketOperation"-->
            <!--                ref="websocket-client"-->
            <!--                :key="httpRequestKey"-->
            <!--                :websocket-operation="contentTab.websocketOperation"></ev-websocket-client>-->
        </div>
    </div>
</template>

<script>
    import GHCContentTab from '@/components/tabs/GHCContentTab'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvHttpClient from '@/views/http-client/EvHttpClient'
    import GHCContentTabType from '@/components/tabs/GHCContentTabType'
    import EvProjectOverview from '@/views/content/EvProjectOverview'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import GHCTreeNodeStatus from '@/components/api-tree/data/GHCTreeNodeStatus'
    import EvWebsocketClient from '@/views/websocket/EvWebsocketClient'
    import EvContentTabNavigation from '@/components/tabs/EvContentTabNavigation.vue'

    export default {
        name: "EvContentTab",

        components: {
            EvContentTabNavigation,
            EvWebsocketClient,
            EvProjectOverview,
            EvHttpClient,
            EvApiDefinition: () => import('@/views/content/components/EvApiDefinition'),
            EvStructDefinition: () => import('@/views/content/components/EvStructDefinition'),
            EvMockClient: () => import('@/components/mock-client/EvMockClient'),
            EvDocumentWelcome: () => import('@/views/content/EvDocumentWelcome'),
        },

        mixins: [
            EvStoreMixin,
        ],

        created() {
            EvContentTabsEventBus.$on(EvContentTabsEvents.SELECT_CONTENT_TAB, this.handleBackToTop)

            EvContentTabsEventBus.$on(EvContentTabsEvents.BACK_TO_TOP, this.handleBackToTop)
        },

        beforeDestroy() {
            EvContentTabsEventBus.$off(EvContentTabsEvents.SELECT_CONTENT_TAB, this.handleBackToTop)

            EvContentTabsEventBus.$off(EvContentTabsEvents.BACK_TO_TOP, this.handleBackToTop)
        },

        props: {
            contentTab: GHCContentTab
        },

        computed: {
            hotkey() {
                return {
                    'command+enter': this.doSendHttpRequest
                }
            },

            componentKey() {
                return this.contentTab.uid
            },

            componentName() {
                if (this.contentTab.isWelcomePage()) {
                    return "EvDocumentWelcome"
                }

                if (this.contentTab.isApiDefinition()) {
                    return "EvApiDefinition"
                }

                if (this.contentTab.isStructDefinition()) {
                    return "EvStructDefinition"
                }

                if (this.contentTab.isApiHttpClient()) {
                    return "EvHttpClient"
                }

                if (this.contentTab.isApiMockClient()) {
                    return "EvMockClient"
                }
            },

            isProjectOverview() {
                return this.contentTab && this.contentTab.type === GHCContentTabType.WELCOME
            },

            isApiDefinition() {
                return this.contentTab && this.contentTab.type === GHCContentTabType.API_DEFINITION
            },

            isStructDefinition() {
                return this.contentTab && this.contentTab.type === GHCContentTabType.STRUCT_DEFINITION
            },

            isHttpClient() {
                return this.contentTab
                    && this.contentTab.type === GHCContentTabType.API_HTTP_CLIENT
                    && this.contentTab.httpOperation
            },

            isHttpRequest() {
                return this.contentTab
                    && this.contentTab.type === GHCContentTabType.API_HTTP_REQUEST
                    && this.contentTab.httpRequest
            },

            isWebsocketOperation() {
                return this.contentTab
                    && this.contentTab.type === GHCContentTabType.WEBSOCKET_OPERATION
                    && this.contentTab.websocketOperation
            },

            isMockClient() {
                return this.contentTab && this.contentTab.type === GHCContentTabType.API_MOCK_CLIENT
            },

            httpClientKey() {
                return this.contentTab.httpOperation.uid
            },

            httpRequestKey() {
                return this.contentTab.uid
            }
        },

        data() {
            return {
                showBackToTopButton: true,

                scrollEvent: undefined,

                httpRequestConfiguration: {
                    urlEditable: true
                }
            }
        },

        methods: {
            doSendHttpRequest() {
                this.$emit('send-http-request', this.contentTab)
            },

            handleScroll(scrollEvent) {
                this.scrollEvent = scrollEvent
            },

            handleBackToTop() {
                this.$vuetify.goTo(0, {
                    container: '.content-tab-body',
                    duration: 0,
                    offset: 0,
                })
            },

            handleModifyRequestMethod(newVal) {
                let treeNode = this.contentTab.treeNode

                treeNode.requestMethod = newVal
            },

            handleModifyRequestPath(newVal) {
                let treeNode = this.contentTab.treeNode

                treeNode.requestPath = newVal
            },

            handleSendRequest() {
                let treeNode = this.contentTab.treeNode

                treeNode.status = GHCTreeNodeStatus.PENDING
            },

            handleCancelRequest() {
                let treeNode = this.contentTab.treeNode

                treeNode.status = GHCTreeNodeStatus.NONE
            },

            handleSendRequestFinished(httpOperation) {
                let treeNode = this.contentTab.treeNode

                treeNode.status = httpOperation.status
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .content-tab {
        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        overflow-y: overlay;
    }

    .content-tab-body {
        height: calc(100vh - 128px);

        overflow-y: overlay;
    }
</style>

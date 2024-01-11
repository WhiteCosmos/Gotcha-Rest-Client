<script>
    import GHCContentTabType from '@/components/tabs/GHCContentTabType'
    import {EvContentTabsEventBus, EvContentTabsEvents} from '@/components/tabs/EvContentTabsEventBus'

    export default {
        name: "EvContentTabMixin",

        methods: {
            // Helper Methods

            checkContentTabIsProjectOverview(contentTab) {
                return contentTab && contentTab.type === GHCContentTabType.WELCOME
            },

            checkContentTabIsApiDefinition(contentTab) {
                return contentTab && contentTab.type === GHCContentTabType.API_DEFINITION
            },

            checkContentTabIsHttpClient(contentTab) {
                return contentTab && (contentTab.type === GHCContentTabType.API_HTTP_CLIENT ||
                    contentTab.type === GHCContentTabType.API_HTTP_REQUEST)
            },

            checkContentTabIsWebsocketOperation(contentTab) {
                return contentTab && (contentTab.type === GHCContentTabType.WEBSOCKET_OPERATION)
            },

            checkContentTabIsStructDefinition(contentTab) {
                return contentTab && contentTab.type === GHCContentTabType.STRUCT_DEFINITION
            },

            // Common Handler

            doSelectContentTab(contentTab) {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.SELECT_CONTENT_TAB, contentTab)
            },

            doCloseContentTab(contentTab) {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_CONTENT_TAB, contentTab)
            },

            doCloseTabsToTheLeft(contentTab) {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_TABS_TO_THE_LEFT, contentTab)
            },

            doCloseTabsToTheRight(contentTab) {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_TABS_TO_THE_RIGHT, contentTab)
            },

            doCloseOtherTabs(contentTab) {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_OTHER_CONTENT_TABS, contentTab)
            },

            doCloseAllTabs() {
                EvContentTabsEventBus.$emit(EvContentTabsEvents.CLOSE_ALL_CONTENT_TABS)
            }
        }
    }
</script>

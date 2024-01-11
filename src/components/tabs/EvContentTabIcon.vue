<template>
    <div class="content-tab-icon flex-shrink-0">
        <v-icon v-if="showOverviewIcon" :color="isContentTabActive ? '#007AFF' : '#AABBCC' " size="10">fa-crow</v-icon>

        <ev-document-icon v-if="showDocumentIcon" :active="isContentTabActive"></ev-document-icon>

        <!--        <v-icon size="10" v-if="showThunderIcon" :color="isContentTabActive ? 'orange' : '#AABBCC' ">fa-bolt</v-icon>-->
        <ev-lighting-icon v-if="showThunderIcon" :color="isContentTabActive ? '#FFB900' : '#AABBCC'"></ev-lighting-icon>

        <ev-socket-icon v-if="showSocketIcon" :color="isContentTabActive ? '#FFB900' : '#AABBCC'"></ev-socket-icon>

        <ev-model-icon v-if="showModelIcon" :active="isContentTabActive"></ev-model-icon>
    </div>
</template>

<script>
    import EvContentTabMixin from '@/components/tabs/EvContentTabMixin'
    import EvDocumentIcon from '@/components/icon/EvDocumentIcon'
    import EvThunderIcon from '@/components/icon/EvThunderIcon'
    import EvModelIcon from '@/components/icon/EvModelIcon'
    import EvLightingIcon from '@/components/api-tree/icons/ev-lighting-icon'
    import EvSocketIcon from '@/components/api-tree/icons/EvSocketIcon'

    export default {
        name: "EvContentTabIcon",

        components: {
            EvSocketIcon,
            EvLightingIcon,
            EvModelIcon,
            EvThunderIcon,
            EvDocumentIcon
        },

        mixins: [
            EvContentTabMixin,
        ],

        props: {
            contentTab: Object,

            selectedContentTab: Object,
        },

        computed: {
            showOverviewIcon() {
                return this.checkContentTabIsProjectOverview(this.contentTab)
            },

            showDocumentIcon() {
                return this.checkContentTabIsApiDefinition(this.contentTab)
            },

            showThunderIcon() {
                return this.checkContentTabIsHttpClient(this.contentTab)
            },

            showSocketIcon() {
                return this.checkContentTabIsWebsocketOperation(this.contentTab)
            },

            showModelIcon() {
                return this.checkContentTabIsStructDefinition(this.contentTab)
            },

            isContentTabActive() {
                return this.contentTab && this.contentTab === this.selectedContentTab
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .content-tab-icon {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 16px;

        height: 16px;
    }
</style>

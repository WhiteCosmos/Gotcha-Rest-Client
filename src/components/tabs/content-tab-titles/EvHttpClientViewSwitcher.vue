<template>
    <div class="ev-http-client-view-switcher">
        <div class="ev-http-client-view-switcher__slot" @click="emitMinorView">
            <ev-http-client-view-right-icon></ev-http-client-view-right-icon>
        </div>

        <div class="ev-http-client-view-switcher__slot" @click="emitCenterView">
            <ev-http-client-view-center-icon></ev-http-client-view-center-icon>
        </div>

        <div class="ev-http-client-view-switcher__slot" @click="emitMajorView">
            <ev-http-client-view-left-icon></ev-http-client-view-left-icon>
        </div>
    </div>
</template>

<script>
    import EvHttpClientViewLeftIcon from '@/components/tabs/content-tab-titles/EvHttpClientViewLeftIcon'
    import EvHttpClientViewCenterIcon from '@/components/tabs/content-tab-titles/EvHttpClientViewCenterIcon'
    import EvHttpClientViewRightIcon from '@/components/tabs/content-tab-titles/EvHttpClientViewRightIcon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'

    export default {
        name: "EvHttpClientViewSwitcher",

        components: {
            EvVerticalGutter,
            EvHttpClientViewRightIcon,
            EvHttpClientViewCenterIcon,
            EvHttpClientViewLeftIcon
        },

        props: {
            contentTab: Object
        },

        methods: {
            emitMajorView() {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.MAKE_VIEW, this.contentTab.httpRequest, 'MAJOR')
            },

            emitCenterView() {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.MAKE_VIEW, this.contentTab.httpRequest, 'CENTER')
            },

            emitMinorView() {
                EvHttpClientEventBus.$emit(EvHttpClientEvents.MAKE_VIEW, this.contentTab.httpRequest, 'MINOR')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-view-switcher {
        display: flex;

        align-items: center;

        justify-content: space-around;

        height: 24px;

        background-color: #F1F1F1;

        border-radius: 3px;

        overflow: hidden;

        box-shadow: inset 0 1px 2px -1px $SHADOW_COLOR;

        &__slot {
            @include full-center;

            height: 24px;

            width: 28px;

            &:hover {
                background-color: #e0e0e0;
            }
        }
    }
</style>

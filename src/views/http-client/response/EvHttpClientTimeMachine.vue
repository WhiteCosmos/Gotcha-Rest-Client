<template>
    <div class="ev-http-client-time-machine">
        <div class="ev-http-client-time-machine__arrow-container" @click="toNextRequestHistory">
            <ev-left-arrow-icon></ev-left-arrow-icon>
        </div>

        <div class="ev-http-client-time-machine__arrow-container" @click="toPreviousRequestHistory">
            <ev-right-arrow-icon></ev-right-arrow-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <v-menu v-bind="menuConfig" v-model="showRequestHistoryMenu">
            <template v-slot:activator="{ on }">
                <div class="ev-http-client-time-machine__icon-container" v-on="on">
                    <ev-time-icon></ev-time-icon>
                </div>
            </template>

            <ev-http-client-request-history-menu :histories="histories"
                                                 @select="backToHistory"
                                                 v-if="hasRequestHistory"></ev-http-client-request-history-menu>
        </v-menu>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvToolButton from '@/components/button/EvToolButton'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
    import EvLeftArrowIcon from '@/views/http-client/icon/ev-left-arrow-icon'
    import EvRightArrowIcon from '@/views/http-client/icon/ev-right-arrow-icon'
    import EvTimeIcon from '@/views/http-client/icon/ev-time-icon'
    import EvHttpClientRequestHistoryMenu from '@/views/http-client/response/request-history/EvHttpClientRequestHistoryMenu'

    import _ from 'lodash'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'

    export default {
        name: "EvHttpClientTimeMachine",

        components: {
            EvHttpClientRequestHistoryMenu,
            EvTimeIcon,
            EvRightArrowIcon,
            EvLeftArrowIcon,
            EvVerticalDivider,
            EvToolButton,
            EvVerticalGutter
        },

        props: {
            httpOperation: Object
        },

        computed: {
            menuConfig() {
                return {
                    'offset-y': true,

                    'close-on-content-click': true,

                    'content-class': "ev-http-client-time-machine__popup-menu",

                    'transition': 'dummy',
                }
            },

            histories() {
                return this.httpOperation.histories || []
            },

            hasRequestHistory() {
                return this.histories.length > 0
            },
        },

        data() {
            return {
                showRequestHistoryMenu: false,

                selectedHistory: undefined
            }
        },

        methods: {
            toPreviousRequestHistory() {
                let histories = this.histories

                if (_.isEmpty(histories)) {
                    return
                }

                let history = undefined

                if (!this.selectedHistory) {
                    return
                } else {
                    let index = histories.indexOf(this.selectedHistory)

                    history = histories[index > 0 ? index - 1 : 0]
                }

                this.backToHistory(history)
            },

            toNextRequestHistory() {
                let histories = this.histories

                if (_.isEmpty(histories)) {
                    return
                }

                let history = undefined

                if (!this.selectedHistory) {
                    history = histories[0]
                } else {
                    let index = histories.indexOf(this.selectedHistory)

                    history = histories[index < (histories.length - 1) ? index + 1 : (histories.length - 1)]
                }

                this.backToHistory(history)
            },

            backToHistory(history) {
                if (!history) {
                    return
                }

                this.selectedHistory = history

                this.httpOperation.httpRequest = history.httpRequest

                this.httpOperation.httpResponse = history.httpResponse

                this.httpOperation.httpError = history.httpError

                let httpRequest = this.httpOperation.httpRequest

                // Refresh url in Url Editor

                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_REQUEST_PATH, httpRequest)

                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_URL_PARAMETERS, httpRequest)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-time-machine {
        display: flex;

        align-items: center;

        justify-self: flex-start;

        border-radius: 6px;

        height: 20px;

        //padding-left: 8px;

        padding-right: 4px;

        &__arrow-container {
            @include full-center;

            width: 20px;

            height: 16px;

            border-radius: 3px;

            transition: 100ms;

            &:hover {
                background-color: #F5F5F5;
            }
        }

        &__icon-container {
            @include full-center;

            width: 20px;

            height: 16px;
        }

        &__popup-menu {
            margin-top: 4px;

            contain: initial;

            overflow: visible;

            align-self: center;
        }
    }
</style>

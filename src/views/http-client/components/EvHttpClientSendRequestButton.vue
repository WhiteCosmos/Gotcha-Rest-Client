<template>
    <div class="send-button" @click="doClick">
        <transition name="fade-transition" duration="80" mode="out-in">
            <ev-http-client-cancel-icon v-if="isSending"></ev-http-client-cancel-icon>

            <ev-http-client-send-icon v-else></ev-http-client-send-icon>
        </transition>

        <div class="hotkey" @click.stop="dummy">
            <span class="hotkey-label" v-if="isSending && (seconds > threshold)">{{ minutes }} m {{ seconds }} s</span>

            <span class="hotkey-label" v-else>⌘ + ↩</span>
        </div>
    </div>
</template>

<script>
    import EvHttpClientSendIcon from '@/views/http-client/components/EvHttpClientSendIcon'

    import EvHttpClientCancelIcon from '@/views/http-client/components/EvHttpClientCancelIcon'
    import EvHttpClientSendRequestMixin from '@/views/http-client/mixins/EvHttpClientSendRequestMixin'
    import {EvHttpClientEventBus, EvHttpClientEvents} from '@/views/http-client/EvHttpClientEventBus'
    import Timer from 'easytimer.js'

    export default {
        name: "EvHttpClientSendRequestButton",

        components: {
            EvHttpClientCancelIcon,
            EvHttpClientSendIcon
        },

        mixins: [
            EvHttpClientSendRequestMixin
        ],

        props: {
            httpRequest: Object,
        },

        created() {
            EvHttpClientEventBus.$on(EvHttpClientEvents.SEND_REQUEST, this.handleSendRequest)

            EvHttpClientEventBus.$on(EvHttpClientEvents.SEND_REQUEST_COMPLETE, this.handleSendRequestFinished)

            this.timer = new Timer({precision: 'seconds'})

            this.timer.addEventListener('secondsUpdated', this.handleTimerUpdate)
        },

        beforeDestroy() {
            EvHttpClientEventBus.$off(EvHttpClientEvents.SEND_REQUEST, this.handleSendRequest)

            EvHttpClientEventBus.$off(EvHttpClientEvents.SEND_REQUEST_COMPLETE, this.handleSendRequestFinished)

            this.timer.removeEventListener('secondsUpdated', this.handleTimerUpdate)
        },

        data() {
            return {
                isSending: false,

                minutes: 0,

                seconds: 0,

                timer: undefined,

                threshold: 2, // over 3 seconds then start timer
            }
        },

        methods: {
            doClick() {
                if (this.isSending) {
                    this.isSending = false

                    this.stopTimer()

                    EvHttpClientEventBus.$emit(EvHttpClientEvents.CANCEL_REQUEST, this.httpRequest)
                } else {
                    this.isSending = true

                    this.startTimer()

                    this.doSendHttpRequest(this.httpRequest)
                }
            },

            handleSendRequest(httpRequest) {
                if (this.httpRequest.uid !== httpRequest.uid) {
                    return
                }

                this.isSending = true
            },

            handleSendRequestFinished(httpRequest) {
                if (this.httpRequest.uid !== httpRequest.uid) {
                    return
                }

                this.stopTimer()

                this.isSending = false

                // 请求完成后刷新一下动态变量

                EvHttpClientEventBus.$emit(EvHttpClientEvents.MODIFY_URL_PARAMETERS, this.httpRequest)
            },

            handleTimerUpdate() {
                this.seconds = this.timer.getTimeValues().seconds

                this.minutes = this.timer.getTimeValues().minutes
            },

            stopTimer() {
                this.timer.reset()

                this.minutes = 0

                this.seconds = 0
            },

            startTimer() {
                this.timer.reset()

                this.minutes = 0

                this.seconds = 0

                this.timer.start()
            },

            dummy() {
                // do nothing
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .send-button {
        @include full-center;

        position: relative;

        width: 64px;

        height: 28px;

        border-radius: 6px;

        background-color: white;

        box-shadow: 0 1px 4px -2px rgb(0, 0, 0, 0.1);

        padding-left: 2px;

        .hotkey {
            position: absolute;

            bottom: -20px;

            user-select: none;

            .hotkey-label {
                font-size: 10px;

                color: #AABBCC;
            }
        }
    }
</style>

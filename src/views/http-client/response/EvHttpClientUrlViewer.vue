<template>
    <div class="http-client-url-viewer">
        <ev-http-method-label :value="requestMethod"></ev-http-method-label>

        <v-divider vertical inset></v-divider>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="http-client-url-viewer__request-url">
            <ev-label size="13" primary medium text-truncate selectable>{{ requestUrl }}</ev-label>
        </div>

        <div class="d-flex align-center" v-if="httpResponse">
            <div class="ev-label-wrapper">
                <ev-label size="11" primary style="font-weight: 500">{{ totalTiming }}</ev-label>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="ev-label-wrapper">
                <ev-label size="11" primary style="font-weight: 500">{{ totalSize }}</ev-label>
            </div>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <v-divider vertical inset></v-divider>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="http-client-url-viewer__status-code flex-shrink-0">
            <ev-label size="12" v-bind=statusCodeColor v-if="httpResponse" bold>{{ httpResponse.statusCode }}</ev-label>

            <ev-label size="12" v-bind=errorColor bold v-else>ERROR</ev-label>
        </div>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
    </div>
</template>

<script>
    import EvHttpMethodSelector from '@/views/http-client/request/EvHttpMethodSelector'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import EvHttpMethodLabel from '@/views/http-client/components/EvHttpMethodLabel'
    import sizeof from 'object-sizeof'

    export default {
        name: "EvHttpClientUrlViewer",

        components: {
            EvHttpMethodLabel,
            EvLabel,
            EvVerticalGutter,
            EvHttpMethodSelector
        },

        props: {
            httpOperation: Object, // RabiHttpOperation
        },

        computed: {
            requestMethod() {
                if (this.httpResponse) {
                    return this.httpResponse.requestMethod
                }

                if (this.httpError) {
                    return this.httpError.requestMethod
                }
            },

            requestUrl() {
                if (this.httpResponse) {
                    return this.httpResponse.requestUrl
                }

                if (this.httpError) {
                    return this.httpError.requestUrl
                }
            },

            httpResponse() {
                return this.httpOperation.httpResponse
            },

            httpError() {
                return this.httpOperation.httpError
            },

            errorColor() {
                return {
                    red: true
                }
            },

            statusMessage() {
                if (this.httpResponse) {
                    return `${this.httpResponse.statusCode} ${this.httpResponse.statusText}`
                } else {
                    return "OOPS"
                }
            },

            statusCodeColor() {
                let statusCode = String(this.httpResponse.statusCode)

                if (statusCode.startsWith("2")) {
                    return {
                        green: true
                    }
                }

                if (statusCode.startsWith("3")) {
                    return {
                        orange: true
                    }
                }

                if (statusCode.startsWith("4")) {
                    return {
                        grey: true
                    }
                }

                if (statusCode.startsWith("5")) {
                    return {
                        red: true
                    }
                }

                return {
                    blue: true
                }
            },

            totalTiming() {
                let milliseconds = this.httpResponse.totalTiming

                if (milliseconds < 1000) { // 毫秒
                    return milliseconds + ' ms'
                } else if (milliseconds < (1000 * 60)) { // 秒
                    const seconds = (milliseconds / 1000).toFixed(1)

                    return seconds + ' s'
                } else { // 分
                    const seconds = Math.floor((milliseconds / 1000) % 60)

                    const minutes = Math.floor((milliseconds / 1000 / 60) % 60)

                    return `${minutes} m ${seconds} s`
                }
            },

            totalSize() {
                return this.httpResponse.summary.responseBodySize
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client-url-viewer {
        @include horizon-center;

        @include rectangle(100%, 28px, 6px);

        border: 1px solid #EAEAEA;

        background-color: white;

        box-shadow: 0 1px 4px -2px rgb(0, 0, 0, 0.1);

        &__request-method {
            @include horizon-center;

            justify-content: center;

            padding-left: 8px;

            padding-right: 16px;
        }

        &__request-url {
            @include horizon-center;

            min-width: 1px;

            flex: 1;

            user-select: text;
        }

        &__widget {
            @include full-center;

            //width: fit-content;
            width: 12px;

            height: 16px;

            //padding-left: 3px;

            //padding-right: 3px;

            //border-radius: 3px;

            //background-color: #FF8282;

            padding-top: 2px;

            &__dot {
                display: flex;

                width: 4px;

                height: 4px;

                border-radius: 4px;

                background-color: #999;
            }

            &--timing {
                border: 1px solid $GREEN_COLOR;
            }

            &--size {
                border: 1px solid $PURPLE_COLOR;
            }
        }

        &__response-time {
            @include horizon-center;

            .response-time-label {
                font-size: 11px;

                font-weight: bold;

                color: #9acc68;
            }
        }

        &__status-code {
            @include horizon-center;

            justify-content: center;

            padding-left: 4px;

            padding-right: 4px;
        }
    }

    .http-client__url-viewer {
        display: flex;

        align-items: center;

        height: 28px;

        border: 1px solid $SECONDARY_COLOR;

        border-radius: 4px;

        @include white-background-gradient;

        @include component-shadow;
    }

    .tooltip-container {
        display: flex;

        align-items: center;

        background-color: #FAFAFA;

        border-radius: 3px;

        margin-left: 12px;

        width: calc(100% - 38px);

        word-break: break-all;

        @include component-shadow;
    }

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 4px;

        padding-right: 4px;

        background-color: #FAFAFA;

        //border: 1px solid #E0E0E0;

        border-radius: 3px;
    }
</style>

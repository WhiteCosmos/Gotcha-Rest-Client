<template>
    <div class="ev-http-client-request-history-menu-item">
        <div class="ev-http-client-request-history-menu-item__datetime-container">
            <div class="d-flex">
                <ev-label size="10" primary style="font-weight: 500">{{ requestDate }}</ev-label>
            </div>

            <div class="d-flex">
                <ev-label size="10" secondary>{{ requestTime }}</ev-label>
            </div>
        </div>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-http-client-request-history-menu-item__request-container">
            <div class="d-flex" style="min-width: 1px; min-height: 1px;">
                <ev-label size="10" primary blue>{{ requestMethod }}</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <div class="d-flex" style="max-width: 90%">
                    <ev-label size="11" primary text-truncate>{{ requestUrl }}</ev-label>
                </div>
            </div>

            <div class="d-flex">
                <ev-label size="11" v-if="isRequestSuccess" v-bind="statusColor">{{ statusCode }} {{ statusText }}</ev-label>

                <ev-label size="11" red v-if="isRequestFailed">ERROR: {{ errorMessage }}</ev-label>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import moment from 'moment'

    export default {
        name: "EvHttpClientRequestHistoryMenuItem",

        components: {
            EvVerticalGutter,
            EvLabel
        },

        props: {
            history: Object
        },

        computed: {
            isRequestSuccess() {
                return this.history.httpResponse
            },

            isRequestFailed() {
                return this.history.httpError && !this.history.httpResponse
            },

            requestDate() {
                let createdAt = this.history.createdAt

                return moment(createdAt).format('MM-DD')
            },

            requestTime() {
                let createdAt = this.history.createdAt

                return moment(createdAt).format('HH:mm:ss')
            },

            requestMethod() {
                let httpRequest = this.history.httpRequest

                return httpRequest.requestMethod
            },

            requestUrl() {
                let httpResponse = this.history.httpResponse

                return httpResponse.requestUrl
            },

            statusCode() {
                let httpResponse = this.history.httpResponse

                return httpResponse ? httpResponse.statusCode : ''
            },

            statusText() {
                let summary = this.history.httpResponse.summary

                return summary ? summary.statusText : ''
            },

            statusColor() {
                let code = String(this.statusCode)

                if (code.startsWith('2')) {
                    return {
                        'green': true
                    }
                }

                if (code.startsWith('3')) {
                    return {
                        'orange': true
                    }
                }

                if (code.startsWith('4')) {
                    return {
                        'secondary': true
                    }
                }

                if (code.startsWith('5')) {
                    return {
                        'red': true
                    }
                }

                return 'secondary'
            },

            errorMessage() {
                let httpError = this.history.httpError

                if (httpError) {
                    return httpError.message
                } else {
                    return ''
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-history-menu-item {
        display: flex;

        align-items: center;

        flex-shrink: 0;

        height: 40px;

        &:hover {
            background-color: #EAEAEA;
        }

        &__datetime-container {
            display: flex;

            flex-direction: column;

            align-items: flex-end;

            padding-left: 8px;

            width: 64px;
        }

        &__request-container {
            display: flex;

            flex-direction: column;

            flex: 1;

            padding-right: 8px;

            overflow: hidden;
        }

    }
</style>

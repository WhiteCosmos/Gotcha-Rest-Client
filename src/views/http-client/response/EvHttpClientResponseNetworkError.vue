<template>
    <div class="http-client__response-network-error">
        <span class="http-client__response-network-error__title">{{ httpError.code }} ERROR</span>

        <span class="http-client__response-network-error__subtitle">{{ httpError.message }}</span>
    </div>
</template>

<script>
    import EvWarningIcon from '@/views/http-client/icon/ev-warning-icon'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "EvHttpClientResponseNetworkError",

        components: {
            EvHorizonGutter,
            EvWarningIcon
        },

        props: {
            httpError: Object
        },

        data() {
            return {
                ETIMEDOUT: "ETIMEDOUT", // One of the timeout limits were reached.

                ECONNRESET: "ECONNRESET", // Connection was forcibly closed by a peer.

                EADDRINUSE: "EADDRINUSE", // Could not bind to any free port.

                ECONNREFUSED: "ECONNREFUSED", // Connection was refused by the server.

                EPIPE: "EPIPE", // The remote side of the stream being written has been closed.

                ENOTFOUND: "ENOTFOUND", // Couldn't resolve the hostname to an IP address.

                ENETUNREACH: "ENETUNREACH", // No Internet connection.

                EAI_AGAIN: "EAI_AGAIN", // DNS lookup timed out.
            }
        },

        computed: {
            errorTitle() {

            },

            errorMessage() {
                switch (this.error.code) {
                    case this.ETIMEDOUT:
                        return "One of the timeout limits were reached."
                    case this.ECONNRESET:
                        return "Connection was forcibly closed by a peer."
                    case this.EADDRINUSE:
                        return "Could not bind to any free port."
                    case this.ECONNREFUSED:
                        return "Connection was refused by the server."
                    case this.EPIPE:
                        return " The remote side of the stream being written has been closed."
                    case this.ENOTFOUND:
                        return "Couldn't resolve the hostname to an IP address."
                    case this.ENETUNREACH:
                        return "No Internet connection."
                    case this.EAI_AGAIN:
                        return "DNS lookup timed out."
                    default:
                        return "Please check your request and try again."
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .http-client__response-network-error {
        display: flex;

        flex: 1;

        flex-direction: column;

        background-color: #FCFCFC;

        @include full-center;

        padding-bottom: 128px;

        padding-left: 72px;

        padding-right: 72px;

        user-select: none;

        &__title {
            font-size: 16px;

            line-height: 48px;

            font-weight: bold;

            color: $RED_COLOR;
        }

        &__subtitle {
            font-size: 12px;

            line-height: 16px;

            font-weight: normal;

            color: #AABBCC;

            word-break: break-all;

            white-space: pre-wrap;
        }
    }
</style>

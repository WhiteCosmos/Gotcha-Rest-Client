<template>
    <div class="ev-http-client-request-url-bar">
        <ev-http-client-request-url :http-request="httpRequest"
                                    :configuration="configuration"></ev-http-client-request-url>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-http-client-send-request-button :http-request="httpRequest" v-if="!isTemplateMode"></ev-http-client-send-request-button>
    </div>
</template>

<script>
    import EvHttpMethodSelector from '@/views/http-client/request/EvHttpMethodSelector'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import ReloadIcon from '@/components/icon/reload-icon'
    import HttpClientRequestIcon from '@/components/icon/http-client-request-icon'
    import HttpClientStopIcon from '@/components/icon/http-client-stop-icon'
    import EvRow from '@/components/layout/EvRow'
    import EvHttpClientSendRequestButton from '@/views/http-client/components/EvHttpClientSendRequestButton'
    import {EvHttpClientRequestUrlEventBus, EvHttpClientRequestUrlEvents} from '@/views/http-client/request/EvHttpClientRequestUrlEventBus'
    import EvCheckedStatusMixin from '@/mixins/EvCheckedStatusMixin'
    import EvSessionIcon from '@/components/icon/EvSessionIcon'
    import EvHttpClientRequestUrl from '@/views/http-client/request/EvHttpClientRequestUrl'

    export default {
        name: "EvHttpClientRequestUrlBar",

        components: {
            EvHttpClientRequestUrl,
            EvSessionIcon,
            EvHttpClientSendRequestButton,
            EvRow,
            HttpClientStopIcon,
            HttpClientRequestIcon,
            ReloadIcon,
            EvVerticalGutter,
            EvHttpMethodSelector
        },

        mixins: [
            EvCheckedStatusMixin,
        ],

        computed: {
            isTemplateMode() {
                return this.configuration.template === true
            },
        },

        props: {
            httpRequest: Object,

            configuration: Object,
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-url-bar {
        display: flex;

        align-items: center;

        width: 100%;
    }

    .http-client__url-editor {
        display: flex;

        align-items: center;

        width: 100%;

        height: 28px;

        border: 1px solid $SECONDARY_COLOR;

        border-radius: 4px;

        @include white-background-gradient;

        @include component-shadow;
    }

    .icon-container {
        width: 28px;

        height: 28px;

        display: flex;

        @include full-center
    }

    .http-client__url-input {
        font-size: 12px;

        line-height: 24px;

        color: $SECONDARY_COLOR;

        width: 80%;

        outline: none;
    }
</style>

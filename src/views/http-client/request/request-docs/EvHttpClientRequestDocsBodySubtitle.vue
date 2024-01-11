<template>
    <div class="ev-http-client-request-docs-body-subtitle">
        <ev-label size="11" bold secondary>Payload</ev-label>

        <v-spacer></v-spacer>

        <div class="ev-http-client-request-docs-body-subtitle__content-type">
            <ev-label size="10" color="#999">application/json</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvHttpClientRequestDocsBodySubtitle",

        components: {
            EvLabel
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-docs-body-subtitle {
        display: flex;

        align-items: center;

        height: 28px;

        flex-shrink: 0;

        //padding-left: 24px;

        //border-top: 1px solid #F5F5F5;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;

        &__icon-container {
            @include full-center;

            height: 28px;

            width: 32px;
        }

        &__content-type {
            display: flex;

            align-items: center;

            width: fit-content;

            height: 16px;

            border-radius: 3px;

            background-color: #FAFAFA;

            padding-left: 6px;

            padding-right: 6px;
        }
    }
</style>

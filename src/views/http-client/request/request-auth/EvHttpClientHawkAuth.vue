<template>
    <div class="d-flex flex-column">
        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" bold secondary>Hawk Authentication</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Hawk Auth ID</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Hawk Auth Key</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Algorithm</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>


        <ev-http-client-divider></ev-http-client-divider>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" bold secondary>Advanced Options</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Username</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Nonce</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Ext</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>App</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Delegate</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" primary>Timestamp</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'

    export default {
        name: "EvHttpClientHawkAuth",
        components: {EvHttpClientDivider, EvLabel},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "EvHttpClientAuthLayout";

</style>

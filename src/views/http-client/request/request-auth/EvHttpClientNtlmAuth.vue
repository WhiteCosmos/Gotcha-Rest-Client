<template>
    <div class="d-flex flex-column">
        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" bold secondary>Microsoft NTLM</ev-label>
            </div>
            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" secondary>Username</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="username"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" secondary>Password</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense password placeholder="password"></ev-borderless-input>
            </div>
        </div>

        <ev-http-client-divider></ev-http-client-divider>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" bold secondary>Advanced Options</ev-label>
            </div>

            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" secondary>Domain</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="e.g. domain"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" secondary>Workstation</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="e.g. workstation"></ev-borderless-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'

    export default {
        name: "EvHttpClientNtlmAuth",
        components: {EvHttpClientDivider, EvBorderlessInput, EvLabel},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "EvHttpClientAuthLayout";

    .ev-http-client-ntlm-auth {

    }
</style>

<template>
    <div class="d-flex flex-column">
        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" bold secondary>AWS Signature</ev-label>
            </div>
            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" secondary>Access Key</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="access key"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" secondary>Secret Key</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="secret key"></ev-borderless-input>
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
                <ev-label size="11" secondary>AWS Region</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="e.g. us-east-1"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" secondary>Service Name</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="e.g. s3"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="11" secondary>Session Token</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="Session Token"></ev-borderless-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvHint from '@/components/typography/EvHint.vue'

    export default {
        name: "EvHttpClientAwsAuth",
        components: {EvHint, EvVerticalGutter, EvHttpClientDivider, EvBorderlessInput, EvLabel},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "EvHttpClientAuthLayout";
</style>

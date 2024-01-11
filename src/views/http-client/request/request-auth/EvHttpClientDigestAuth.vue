<template>
    <div class="ev-http-client-digest-auth">
        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" bold secondary>Digest Auth</ev-label>
            </div>
            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Username</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="username"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Password</ev-label>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="password"></ev-borderless-input>
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
                <ev-label size="12" primary>Realm</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="realm@example.com"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Nonce</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="Nonce"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Algorithm</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="md5"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>qop</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="auth"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Nonce Count</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="e.g. 00000001"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Client Nonce</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="e.g. 114514"></ev-borderless-input>
            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Opaque</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-hint></ev-hint>
            </div>

            <div class="ev-row__value-part">
                <ev-borderless-input dense placeholder="Opaque"></ev-borderless-input>
            </div>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvHttpClientDivider from '@/views/http-client/request/EvHttpClientDivider'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvHint from '@/components/typography/EvHint.vue'

    export default {
        name: "EvHttpClientDigestAuth",
        components: {EvHint, EvVerticalGutter, EvBorderlessInput, EvHttpClientDivider, EvLabel},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "EvHttpClientAuthLayout";

    .ev-http-client-digest-auth {

    }
</style>

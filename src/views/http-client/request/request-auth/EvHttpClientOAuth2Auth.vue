<template>
    <div class="d-flex flex-column">
        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" bold secondary>OAuth 2.0</ev-label>
            </div>
            <div class="ev-row__value-part">

            </div>
        </div>

        <div class="ev-row">
            <div class="ev-row__key-part">
                <ev-label size="12" primary>Grant Type</ev-label>
            </div>

            <div class="ev-row__value-part">
                <div style="width: 200px">
                    <ev-selector v-model="grantType" :values="grantTypes"></ev-selector>
                </div>
            </div>
        </div>

        <div v-if="isAuthorizationCodeGrantType">
            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Authorization Url</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Authorization URL"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Access Token Url</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Access Token URL"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Callback Url</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Callback URL"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Client Id</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Client Id"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Client Secret</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Client Secret"></ev-borderless-input>
                </div>
            </div>
        </div>

        <div v-if="isImplicitGrantType">
            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Authorization Url</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Authorization URL"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" secondary>Callback Url</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Authorization URL"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" secondary>Client Id</ev-label>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-hint></ev-hint>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Client Id"></ev-borderless-input>
                </div>
            </div>
        </div>

        <div v-if="isPasswordCredentialsGrantType">
            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Username</ev-label>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Username"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Password</ev-label>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense password placeholder="Password"></ev-borderless-input>
                </div>
            </div>

            <div class="ev-row">
                <div class="ev-row__key-part">
                    <ev-label size="12" primary>Access Token Url</ev-label>
                </div>

                <div class="ev-row__value-part">
                    <ev-borderless-input size="12" dense placeholder="Access Token Url"></ev-borderless-input>
                </div>

            </div>
        </div>

        <div v-if="isClientCredentialsGrantType">

        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvHint from '@/components/typography/EvHint.vue'
    import EvSelector from '@/components/selector/EvSelector.vue'

    export default {
        name: "EvHttpClientOAuth2Auth",

        components: {
            EvSelector,
            EvHint,
            EvVerticalGutter,
            EvBorderlessInput,
            EvLabel
        },

        data() {
            return {
                grantType: "authorization_code", // authorization_code | implicit | password_credentials | client_credentials

                grantTypes: [
                    'authorization_code',
                    'implicit',
                    'password_credentials',
                    'client_credentials',
                ]
            }
        },

        computed: {
            isAuthorizationCodeGrantType() {
                return this.grantType === 'authorization_code'
            },

            isImplicitGrantType() {
                return this.grantType === 'implicit'
            },

            isPasswordCredentialsGrantType() {
                return this.grantType === 'password_credentials'
            },

            isClientCredentialsGrantType() {
                return this.grantType === 'client_credentials'
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "EvHttpClientAuthLayout";
</style>

<template>
    <div class="ev-http-client-request-auth">
        <ev-http-client-request-auth-menu v-model="authType"></ev-http-client-request-auth-menu>

        <ev-http-client-none-auth v-if="isNoneAuth"></ev-http-client-none-auth>

        <ev-http-client-basic-auth v-if="isBasicAuth" :value="authorization.basic"></ev-http-client-basic-auth>

        <ev-http-client-digest-auth v-if="isDigestAuth"></ev-http-client-digest-auth>

        <ev-http-client-o-auth2-auth v-if="isOAuth2"></ev-http-client-o-auth2-auth>

        <ev-http-client-ntlm-auth v-if="isNtlmAuth"></ev-http-client-ntlm-auth>

        <ev-http-client-aws-auth v-if="isAwsAuth"></ev-http-client-aws-auth>

        <ev-http-client-bearer-token-auth v-if="isBearerAuth" :value="authorization.bearer"></ev-http-client-bearer-token-auth>

        <ev-http-client-hawk-auth v-if="isHawkAuth"></ev-http-client-hawk-auth>
    </div>
</template>

<script>
    import EvHttpClientRequestAuthMenu from '@/views/http-client/request/EvHttpClientRequestAuthMenu'
    import EvHttpClientBasicAuth from '@/views/http-client/request/request-auth/EvHttpClientBasicAuth'
    import EvHttpClientNoneAuth from '@/views/http-client/request/request-auth/EvHttpClientNoneAuth'
    import EvHttpClientApiKeyAuth from '@/views/http-client/request/request-auth/EvHttpClientApiKeyAuth'
    import EvHttpClientDigestAuth from '@/views/http-client/request/request-auth/EvHttpClientDigestAuth'
    import EvHttpClientNtlmAuth from '@/views/http-client/request/request-auth/EvHttpClientNtlmAuth'
    import EvHttpClientAwsAuth from '@/views/http-client/request/request-auth/EvHttpClientAwsAuth'
    import EvHttpClientBearerTokenAuth from '@/views/http-client/request/request-auth/EvHttpClientBearerTokenAuth'
    import EvHttpClientHawkAuth from '@/views/http-client/request/request-auth/EvHttpClientHawkAuth'
    import EvHttpClientOAuth2Auth from '@/views/http-client/request/request-auth/EvHttpClientOAuth2Auth.vue'
    import GHCHttpAuthorizationBearerAuth from '@/data/gotcha/http-operation/authorization/GHCHttpAuthorizationBearerAuth'

    export default {
        name: "EvHttpClientRequestAuth",

        components: {
            EvHttpClientOAuth2Auth,
            EvHttpClientHawkAuth,
            EvHttpClientBearerTokenAuth,
            EvHttpClientAwsAuth,
            EvHttpClientNtlmAuth,
            EvHttpClientDigestAuth,
            EvHttpClientApiKeyAuth,
            EvHttpClientNoneAuth,
            EvHttpClientBasicAuth,
            EvHttpClientRequestAuthMenu
        },

        created() {
            this.initialize()
        },

        props: {
            httpRequest: Object,
        },

        data() {
            return {
                authType: 'none',
            }
        },

        watch: {
            authType(newVal) {
                this.authorization.type = newVal
            }
        },

        computed: {
            authorization() {
                return this.httpRequest.authorization
            },

            isNoneAuth() {
                return this.authType === 'none'
            },

            isBasicAuth() {
                return this.authType === 'basic'
            },

            isDigestAuth() {
                return this.authType === 'digest'
            },

            isOAuth2() {
                return this.authType === 'oauth2'
            },

            isNtlmAuth() {
                return this.authType === 'ntlm'
            },

            isAwsAuth() {
                return this.authType === 'aws'
            },

            isBearerAuth() {
                return this.authType === 'bearer'
            },

            isHawkAuth() {
                return this.authType === 'hawk'
            },
        },

        methods: {
            initialize() {
                this.authType = this.authorization.type

                this.initializeProperties()
            },

            initializeProperties() {
                if (!this.authorization.hasOwnProperty('bearer')) {
                    this.$set(this.authorization, 'bearer', new GHCHttpAuthorizationBearerAuth())
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-request-auth {
        height: 100%;

        display: flex;

        flex-direction: column;
    }
</style>

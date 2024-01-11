<script>
    import GHCHttpClientRequestHelper from '@/views/http-client/request/GHCHttpClientRequestHelper'

    export default {
        name: "EvHttpClientRequestMixin",

        inject: ['httpRequest'],

        computed: {
            headers() {
                return GHCHttpClientRequestHelper.getHeaders(this.httpRequest)
            },

            pathParameters() {
                return GHCHttpClientRequestHelper.getPathParameters(this.httpRequest)
            },

            queryParameters() {
                return GHCHttpClientRequestHelper.getQueryParameters(this.httpRequest)
            },
        }
    }
</script>

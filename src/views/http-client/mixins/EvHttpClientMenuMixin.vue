<script>
    export default {
        name: "EvHttpClientMenuMixin",

        created() {

        },

        data() {
            return {
                requestMenus: {
                    description: {
                        name: "Docs",

                        type: "DESCRIPTION",

                        itemCount: 0,

                        hasContent: false,

                        indicator: true,

                        isProFeature: true,
                    },

                    requestHeaders: {
                        name: "Headers",

                        type: "REQUEST_HEADERS",

                        itemCount: 0,

                        hasContent: false,

                        indicator: true,
                    },

                    requestParameters: {
                        name: "URL Params",

                        type: "REQUEST_PARAMETERS",

                        itemCount: 0,

                        hasContent: false,

                        indicator: true,
                    },

                    requestBody: {
                        name: "Body",

                        type: "REQUEST_BODY",

                        itemCount: 0,

                        hasContent: false,

                        indicator: true,
                    },

                    authorization: {
                        name: "Auth",

                        type: "AUTHORIZATION",

                        itemCount: 0,

                        hasContent: false,

                        indicator: true,
                    },

                    requestOptions: {
                        name: "Options",

                        type: "REQUEST_OPTIONS",

                        itemCount: 0,

                        hasContent: false,

                        children: undefined,

                        indicator: true,
                    },

                    assertion: {
                        name: "Tests",

                        type: "RESPONSE_ASSERTION",

                        itemCount: 0,

                        hasContent: false,

                        children: undefined,

                        indicator: true,
                    }
                },

                requestBodyMenus: {
                    noneBodyMenu: {
                        name: "none",

                        type: "NONE_REQUEST_BODY",

                        itemCount: 0,

                        hasContent: false,
                    },

                    jsonBodyMenu: {
                        name: "application/json",

                        type: "REQUEST_JSON_BODY",

                        itemCount: 0,

                        hasContent: false,
                    },

                    rawBodyMenu: {
                        name: "text/plain",

                        type: "REQUEST_RAW_BODY",

                        itemCount: 0,

                        hasContent: false,
                    },

                    formBodyMenu: {
                        name: "application/x-www-form-urlencoded",

                        type: "REQUEST_FORM_BODY",

                        itemCount: 0,

                        hasContent: false,
                    },

                    multipartBodyMenu: {
                        name: "multipart/form-data",

                        type: "REQUEST_MULTIPART_BODY",

                        itemCount: 0,

                        hasContent: false,
                    }
                },

                responseMenus: {
                    infoMenu: {
                        name: "Summary",

                        type: "RESPONSE_INFO",
                    },

                    requestMenu: {
                        name: "Request",

                        type: "REQUEST_MENU"
                    },

                    responseMenu: {
                        name: "Response",

                        type: "RESPONSE_MENU"
                    }
                },

                responseContainerMenus: [
                    {
                        name: "Summary",
                        type: "RESPONSE_INFO",
                    },
                    {
                        name: "Headers",
                        type: "RESPONSE_HEADERS",
                    },
                    {
                        name: "Body",
                        type: "RESPONSE_BODY",
                    },
                    {
                        name: "Tests",
                        badge: undefined,
                        type: "RESPONSE_TESTS",
                    }
                ]
            }
        },

        computed: {},

        methods: {
            isRequestDocs(menu) {
                return menu && menu.type === this.requestMenus.description.type
            },

            isRequestAuth(menu) {
                return menu && menu.type === this.requestMenus.authorization.type
            },

            isRequestHeaders(menu) {
                return menu && menu.type === this.requestMenus.requestHeaders.type
            },

            isRequestParameters(menu) {
                return menu && menu.type === this.requestMenus.requestParameters.type
            },

            isRequestBody(menu) {
                return menu && menu.type === this.requestMenus.requestBody.type
            },

            isRequestTests(menu) {
                return menu && menu.type === this.requestMenus.assertion.type
            },

            isNoneRequestBody(menu) {
                return menu && menu.type === this.requestBodyMenus.noneBodyMenu.type
            },

            isRequestJsonBody(menu) {
                return menu && menu.type === this.requestBodyMenus.jsonBodyMenu.type
            },

            isRequestRawBody(menu) {
                return menu && menu.type === this.requestBodyMenus.rawBodyMenu.type
            },

            isRequestFormBody(menu) {
                return menu && menu.type === this.requestBodyMenus.formBodyMenu.type
            },

            isRequestMultipartBody(menu) {
                return menu && menu.type === this.requestBodyMenus.multipartBodyMenu.type
            },

            isRequestOptions(menu) {

            }
        }
    }
</script>


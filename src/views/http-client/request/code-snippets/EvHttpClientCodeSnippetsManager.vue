<template>
    <div class="ev-http-client-code-snippets-manager">
        <ev-http-client-code-snippets-navigator @close="$emit('close')"></ev-http-client-code-snippets-navigator>

        <div class="d-flex">
            <ev-http-client-code-snippets-sidebar :snippets="snippets"
                                                  :selected-client="selectedClient"
                                                  @select-client="handleChooseClient"></ev-http-client-code-snippets-sidebar>

            <ev-http-client-code-snippets-content :snippet="snippet"
                                                  :selected-target="selectedTarget"
                                                  :selected-client="selectedClient"></ev-http-client-code-snippets-content>
        </div>
    </div>
</template>

<script>
    import EvHttpClientCodeSnippetsSidebar from '@/views/http-client/request/code-snippets/EvHttpClientCodeSnippetsSidebar'
    import EvHttpClientCodeSnippetsContent from '@/views/http-client/request/code-snippets/EvHttpClientCodeSnippetsContent'
    import EvHttpClientCodeSnippetsNavigator from '@/views/http-client/request/code-snippets/EvHttpClientCodeSnippetsNavigator'
    import GHCHttpClientHarBuilder from '@/views/http-client/core/GHCHttpClientHarBuilder'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import HTTPSnippet from 'httpsnippet'
    import {clipboard} from 'electron'

    export default {
        name: "EvHttpClientCodeSnippetsManager",

        components: {
            EvHttpClientCodeSnippetsNavigator,
            EvHttpClientCodeSnippetsContent,
            EvHttpClientCodeSnippetsSidebar
        },

        mixins: [
            EvStoreMixin,
        ],

        created() {
            this.initialize()
        },

        props: {
            httpRequest: Object // GHCHttpRequest
        },

        data() {
            return {
                show: false,

                snippet: "",

                selectedTarget: undefined,

                selectedClient: undefined,

                snippets: [
                    {
                        name: "C",
                        code: "c",
                        clients: [
                            {
                                name: "Libcurl",
                                code: "libcurl",
                                checkedStatus: "UNCHECKED",
                            }
                        ]
                    },
                    {
                        name: "C#",
                        code: "csharp",
                        clients: [
                            {
                                name: "RestSharp",
                                code: "restsharp",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "HttpClient",
                                code: "httpclient",
                                checkedStatus: "UNCHECKED",
                            },
                        ]
                    },
                    {
                        name: "Go",
                        code: "go",
                        clients: [
                            {
                                name: "Native",
                                code: "newrequest",
                                checkedStatus: "UNCHECKED",
                            },
                        ]
                    },
                    {
                        name: "HTTP",
                        code: "http",
                        clients: [
                            {
                                name: "HTTP/1.1",
                                code: "http/1.1",
                                checkedStatus: "UNCHECKED",
                            },
                        ]
                    },
                    {
                        name: "Java",
                        code: "java",
                        clients: [
                            {
                                name: "OkHttp",
                                code: "okhttp",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Unirest",
                                code: "unirest",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "AsyncHttp",
                                code: "asynchttp",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Native",
                                code: "java.net.http",
                                checkedStatus: "UNCHECKED",
                            },
                        ]
                    },
                    {
                        name: "JavaScript",
                        code: "javascript",
                        clients: [
                            {
                                name: "jQuery",
                                code: "jquery",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Fetch",
                                code: "fetch",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "XHR",
                                code: "xmlhttprequest",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Axios",
                                code: "axios",
                                checkedStatus: "UNCHECKED",
                            }
                        ]
                    },
                    {
                        name: "Kotlin",
                        code: "kotlin",
                        clients: [
                            {
                                name: "OkHttp",
                                code: "okhttp",
                                checkedStatus: "UNCHECKED",
                            },
                        ]
                    },
                    {
                        name: "Objective-C",
                        code: "objc",
                        clients: [
                            {
                                name: "NSURLSession",
                                code: "nsurlsession",
                                checkedStatus: "UNCHECKED",
                            },
                        ]
                    },
                    {
                        name: "OCaml",
                        code: "ocaml",
                        clients: [
                            {
                                name: "CoHTTP",
                                code: "cohttp",
                                checkedStatus: "UNCHECKED",
                            },
                        ]
                    },
                    {
                        name: "NodeJS",
                        code: "node",
                        clients: [
                            {
                                name: "HTTP",
                                code: "http",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Request",
                                code: "request",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Unirest",
                                code: "unirest",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Axios",
                                code: "axios",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Fetch",
                                code: "fetch",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                    {
                        name: "PHP",
                        code: "php",
                        clients: [
                            {
                                name: "cURL",
                                code: "curl",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "HTTP v1",
                                code: "http1",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "HTTP v2",
                                code: "http2",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                    {
                        name: "PowerShell",
                        code: "powershell",
                        clients: [
                            {
                                name: "WebRequest",
                                code: "invoke-webrequest",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "RequestMethod",
                                code: "invoke-restmethod",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                    {
                        name: "Python",
                        code: "python",
                        clients: [
                            {
                                name: "http.client",
                                code: "http.client",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "Requests",
                                code: "requests",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                    {
                        name: "R",
                        code: "r",
                        clients: [
                            {
                                name: "httr",
                                code: "httr",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                    {
                        name: "Ruby",
                        code: "ruby",
                        clients: [
                            {
                                name: "net::http",
                                code: "net::http",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                    {
                        name: "Shell",
                        code: "shell",
                        clients: [
                            {
                                name: "HTTPie",
                                code: "httpie",
                                checkedStatus: "UNCHECKED",
                            },
                            {
                                name: "wget",
                                code: "wget",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                    {
                        name: "Swift",
                        code: "swift",
                        clients: [
                            {
                                name: "httr",
                                code: "httr",
                                checkedStatus: "UNCHECKED",
                            },
                        ],
                    },
                ]
            }
        },

        watch: {
            selectedClient() {
                this.convert()
            },

            show() {

            },
        },

        methods: {
            initialize() {
                this.selectedTarget = this.snippets[0]

                this.selectedClient = this.selectedTarget.clients[0]

                this.convert()
            },

            convert() {
                let builder = new GHCHttpClientHarBuilder(this.currentCookieJar, this.dynamicVariableRender)

                let har = builder.buildHarRequest(this.httpRequest)

                let snippet = new HTTPSnippet(har)

                this.snippet = snippet.convert(this.selectedTarget.code, this.selectedClient.code)
            },

            handleChooseClient(target, client) {
                this.selectedTarget = target

                this.selectedClient = client
            },

            handleCopyToClipboard() {
                clipboard.writeText(this.snippet)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-code-snippets-manager {
        display: flex;

        flex-direction: column;

        overflow: hidden;

        background-color: #FCFCFC;

        width: 960px;

        height: 640px;

        user-select: none;
    }
</style>

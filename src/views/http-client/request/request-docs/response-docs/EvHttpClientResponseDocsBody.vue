<template>
    <div class="ev-http-client-response-docs-body">
        <pre v-html="value"></pre>
    </div>
</template>

<script>
    import hljs from 'highlightjs'

    export default {
        name: "EvHttpClientResponseDocsBody",

        created() {

        },

        props: {
            text: String
        },

        computed: {
            value() {
                return hljs.highlightAuto(this.text).value
            },
        },

        data() {
            return {
                json: {
                    "args": {
                        "query": "showemfsds"
                    },
                    "headers": {
                        "Accept-Encoding": "gzip, deflate, br",
                        "Authorization": "fsfs",
                        "Host": "httpbin.org",
                        "User-Agent": "got (https://github.com/sindresorhus/got)",
                        "X-Amzn-Trace-Id": "Root=1-620e6f55-45dcb1e554e9fc7a569ce698"
                    },
                    "origin": "45.152.112.102",
                    "url": "http://httpbin.org/get?query=showemfsds"
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-docs-body {
        display: flex;

        padding: 8px;

        background-color: #FAFAFA;

        font-size: 11px;
    }

    pre {
        white-space: pre-wrap;

        word-break: break-all;
    }
</style>

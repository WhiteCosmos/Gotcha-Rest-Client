<template>
    <div class="ev-http-client-response-web-viewer">
        <iframe ref="iframe" width="100%" height="100%" frameborder="0"></iframe>
    </div>
</template>

<script>
    export default {
        name: "EvHttpClientResponseWebViewer",

        props: {
            payload: Object
        },

        activated() { // keep-alive
            setTimeout(() => {
                this.loadWebview()
            }, 0)
        },

        created() {

        },

        mounted() {
            this.loadWebview()
        },

        watch: {
            payload() {
                this.loadWebview()
            }
        },

        computed: {
            html() {
                if (!this.payload) {
                    return ''
                }

                return this.payload.body
            }
        },

        methods: {
            loadWebview() {
                let iframe = this.$refs['iframe']

                let document

                if (iframe.contentDocument) {
                    document = iframe.contentDocument
                } else {
                    document = iframe.contentWindow.document
                }

                document.body.innerHTML = this.html
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-web-viewer {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;
    }

    webview {
        display: flex;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: 100%;
    }
</style>

<template>
    <div class="ev-http-client-highlightjs-view">
        <pre v-html="value_"></pre>
    </div>
</template>

<script>
    import {highlightJSWorker} from '@/worker/HighlightJSWorker'

    export default {
        name: "EvHttpClientHighlightjsView",

        /*

          import HighlightJSWorker from 'worker-loader!./highlightjs-worker'

    export default {
        name: "EvHttpClientHighlightjsView",

        created() {
            const worker = new HighlightJSWorker()

            console.log("worker", worker)

            worker.onmessage = (event) => {
                console.log("worker message", event)
                this.value_ = event.data
            }

            worker.postMessage(this.text)
        }
         */

        created() {
            console.log("EvHttpClientHighlightjsView created")

            highlightJSWorker.onmessage = (event) => {
                console.log("highlightJSWorker onmessage")
                this.value_ = event.data
            }

            // highlightJSWorker.addEventListener('message', (event) => {
            //     console.log("highlightJSWorker onmessage")
            // })

            highlightJSWorker.postMessage(this.text)
        },

        beforeDestroy() {

        },

        props: {
            text: String,

            format: String
        },

        watch: {
            text(newVal) {
                // highlightJSWorker.onmessage = (event) => {
                //     this.value_ = event.data
                // }

                console.log("highlightJSWorker postmessage")

                highlightJSWorker.postMessage(newVal)
            },
        },

        data() {
            return {
                value_: '',
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-highlightjs-view {
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

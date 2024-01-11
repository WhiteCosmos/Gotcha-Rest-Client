<template>
    <div class="ev-http-client-response-pdf-viewer">
        <div class="ev-http-client-response-pdf-viewer__panel">
            <ev-icon-wrapper @click.native="toPreviousPage">
                <v-icon size="12" color="#999">fa-arrow-left</v-icon>
            </ev-icon-wrapper>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="d-flex justify-center" style="width: 20px; height: 16px; background-color: #F1F1F1; border-radius: 2px">
                <ev-label size="12" secondary style="font-weight: 500">{{ currentPage }}</ev-label>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-icon-wrapper @click.native="toNextPage">
                <v-icon size="12" color="#999">fa-arrow-right</v-icon>
            </ev-icon-wrapper>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="11" bold grey>of</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="d-flex justify-center" style="width: 20px; height: 16px; background-color: #F1F1F1; border-radius: 2px">
                <ev-label size="12" secondary style="font-weight: 500">{{ pageCount }}</ev-label>
            </div>
        </div>

        <div id='ev-pdf-wrapper' class="ev-http-client-response-pdf-viewer__wrapper">
            <canvas id="pdf-viewer"></canvas>
        </div>
    </div>
</template>

<script>
    import * as pdfjsLib from 'pdfjs-dist/build/pdf'

    import "pdfjs-dist/web/pdf_viewer.css"
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvIconWrapper from '@/components/layout/EvIconWrapper.vue'

    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.worker.min.js"

    export default {
        name: "EvHttpClientResponsePdfViewer",
        components: {EvIconWrapper, EvVerticalGutter, EvLabel},

        props: {
            payload: Object,
        },

        mounted() {
            // TODO 监听resize事件
            this.initialize()
        },

        watch: {
            payload() {
                this.initialize()
            },
        },

        data() {
            return {
                pdf: null,

                currentPage: 1,

                pageCount: 0,

                zoom: 1,
            }
        },

        methods: {
            initialize() {
                this.currentPage = 1
                this.pageCount = 0

                pdfjsLib.getDocument(this._buffer2ArrayBuffer(this.payload.rawBody))
                    .promise
                    .then((data) => {
                        this.pdf = data

                        this.pageCount = data.numPages

                        this.renderPage()
                    })
            },

            renderPage(pageNumber = 1) {
                this.pdf
                    .getPage(pageNumber)
                    .then((page) => {
                        console.log('Page loaded')
                        let container = document.getElementById("ev-pdf-wrapper") //your body container

                        let wrapper = document.getElementById("wrapper") // your div where pdf is rendering

                        let canvas = document.getElementById('pdf-viewer')

                        let context = canvas.getContext('2d')

                        const pageWidthScale = container.clientWidth / page.view[2]
                        const pageHeightScale = container.clientHeight / page.view[3]

                        let scales = {1: 3.2, 2: 4},
                            defaultScale = 4,
                            scale = scales[window.devicePixelRatio] || defaultScale

                        let viewport = page.getViewport({scale: scale})

                        canvas.height = viewport.height

                        canvas.width = viewport.width

                        let displayWidth = Math.min(pageWidthScale, pageHeightScale)

                        canvas.style.width = `${(viewport.width * displayWidth) / scale}px`

                        canvas.style.height = `${(viewport.height * displayWidth) / scale}px`

                        // Render PDF page into canvas context
                        let renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        }

                        page.render(renderContext)

                        // renderTask.promise.then(function() {
                        //     console.log('Page rendered');
                        // });

                        // pageNum.textContent = initialState.currentPage
                    })
            },

            toNextPage() {
                if (this.currentPage < this.pageCount) {
                    this.currentPage += 1
                    this.renderPage(this.currentPage)
                }
            },

            toPreviousPage() {
                if (this.currentPage > 1) {
                    this.currentPage -= 1
                    this.renderPage(this.currentPage)
                }
            },

            zoomIn() {

            },

            zoomOut() {

            },

            _buffer2ArrayBuffer(buf) {
                const ab = new ArrayBuffer(buf.length)
                const view = new Uint8Array(ab)
                for (let i = 0; i < buf.length; ++i) {
                    view[i] = buf[i]
                }
                return ab
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-pdf-viewer {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        &__panel {
            display: flex;

            align-items: center;

            justify-content: center;

            width: 100%;

            height: 28px;

            padding-left: 28px;

            padding-right: 28px;

            background-color: #FCFCFC;

            //@include mac-shadow;

            border-bottom: 1px solid #F1F1F1;
        }

        &__wrapper {
            display: flex;

            align-items: center;

            justify-content: center;

            width: 100%;

            height: calc(100% - 28px);

            background-image: url("./background.png");

            background-repeat: repeat;

            //background-color: #555;

            //background-color: #FF8282;

            overflow: hidden;
        }
    }

    //#pdf-viewer {
    //    width: 100%;
    //
    //    height: 100%;
    //}

    .ev-icon-wrapper {
        @include full-center;

        width: 16px;

        height: 16px;

        border-radius: 2px;

        &:hover {
            background-color: #F1F1F1;
        }
    }
</style>

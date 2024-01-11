<template>
    <div class="ev-http-client-response-image-viewer" ref="image-viewer">
        <div class="ev-http-client-response-image-viewer__control-bar">
            <ev-label size="10" grey>{{ imageWidth }}</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="10" grey>x</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="10" grey>{{ imageHeight }}</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="10" grey>{{ imageType }}</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="10" grey>{{ imageSize }}</ev-label>
        </div>

        <canvas id="canvas-114514"></canvas>
    </div>
</template>

<script>
    import {fabric} from "fabric"
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientResponseTypeMixin from '@/views/http-client/response/response-body/EvHttpClientResponseTypeMixin'
    import EvHttpClientResponseBodyPlaceholder from '@/views/http-client/response/EvHttpClientResponseBodyPlaceholder'

    export default {
        name: "EvHttpClientResponseImageViewer",

        components: {
            EvHttpClientResponseBodyPlaceholder,
            EvVerticalGutter,
            EvLabel
        },

        mixins: [
            EvHttpClientResponseTypeMixin,
        ],

        created() {
            window.addEventListener('resize', this.resizeHandler)
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.resizeHandler)
        },

        props: {
            payload: Object,
        },

        watch: {
            payload() {
                this.loadImage()
            }
        },

        mounted() {
            this.loadImage()
        },

        data() {
            return {
                canvas: undefined,

                image: undefined,

                visibility: {
                    mt: false,
                    mb: false,
                    ml: false,
                    mr: false,
                    bl: true,
                    br: true,
                    tl: true,
                    tr: true,
                    mtr: false,
                }
            }
        },

        computed: {
            imageWidth() {
                return this.image ? this.image.width : 0
            },

            imageHeight() {
                return this.image ? this.image.height : 0
            },

            imageType() {
                return this.payload ? this.payload.extension.toUpperCase() : ''
            },

            imageSize() {
                if (!this.payload) {
                    return '0KB'
                }

                return this.bytesToSize(this.payload.rawSize)
            }
        },

        methods: {
            resizeHandler() {
                if (!this.canvas) {
                    return
                }

                let size = this.getViewerSize()

                this.canvas.setWidth(size.width)

                this.canvas.setHeight(size.height)
            },

            loadImage() {
                if (!this.canvas) {
                    this.canvas = new fabric.Canvas('canvas-114514')

                    this.canvas.backgroundColor = new fabric.Pattern({
                        source: require('./background.png') // TODO move to assets
                    })
                }

                let canvas = this.canvas

                canvas.remove(...canvas.getObjects())

                fabric.Image.fromURL(this.getDataUrl(), (img) => {
                    this.image = img

                    let size = this.getViewerSize()

                    canvas.setWidth(size.width)

                    canvas.setHeight(size.height)

                    if (img.width > size.width) {
                        img.scaleToWidth(size.width)
                    }

                    img.setControlsVisibility(this.visibility)

                    canvas.add(img)

                    canvas.centerObject(img)
                })
            },

            getViewerSize() {
                let viewer = this.$refs['image-viewer']

                if (viewer) {
                    return {
                        'width': viewer.clientWidth - 1, // remove divider
                        'height': viewer.clientHeight - 28, // remove control bar height
                    }
                }
            },

            getDataUrl() {
                return `data:${this.payload.contentType};base64,${this.payload.body}`
            },

            bytesToSize(bytes) {
                let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

                if (bytes === 0) return '0 Byte'

                let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

                return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-response-image-viewer {
        display: flex;

        flex-direction: column;

        min-width: 1px;

        min-height: 1px;

        width: 100%;

        height: 100%;

        &__control-bar {
            display: flex;

            align-items: center;

            justify-content: center;

            height: 28px;

            background-color: #FCFCFC;

            border-bottom: 1px solid #F1F1F1;

            padding-left: 16px;

            padding-right: 16px;
        }
    }
</style>

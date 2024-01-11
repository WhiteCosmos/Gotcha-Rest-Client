<template>
    <div class="export-button d-flex justify-center align-center">
        <v-menu offset-y v-model="showExportMenu" open-delay="100" attach=".export-button" close-on-click>
            <template v-slot:activator="{ on }">
                <div class="export-button__menu d-flex align-center" v-on="on">
                    <span class="export-button__font">{{ currentExportType }}</span>

                    <v-spacer></v-spacer>

                    <ev-dot-button></ev-dot-button>
                </div>
            </template>

            <div class="export-type-menu d-flex flex-column">
                <div class="export-type-menu__item" v-for="type in exportTypes" @click.stop="changeExportType(type)">
                    <span class="export-type-menu__font">{{ type }}</span>
                </div>
            </div>
        </v-menu>

        <div class="export-button__icon d-flex justify-center align-center" @click="doExport">
            <export-icon></export-icon>
        </div>

        <v-snackbar v-model="showSnackbar" :timeout="1500">
            <div class="d-flex justify-center">
                <span style="font-size: 13px; font-weight: normal">{{ currentExportType }} Copied To Clipboard</span>
            </div>
        </v-snackbar>
    </div>
</template>

<script>
    import ExportIcon from '@/components/icon/export-icon'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDotButton from '@/components/button/EvDotButton'
    import EvExportMixin from '@/mixins/EvExportMixin'
    import MarkdownBuilder from '@/export/MarkdownBuilder'
    import AsciidocBuilder from '@/export/AsciidocBuilder'
    import {EvExportButtonEventBus, EvExportButtonEvents} from '@/views/content/EvExportButtonEventBus'

    let {clipboard} = require('electron')

    export default {
        name: "EvExportButton",

        components: {
            EvDotButton,
            EvVerticalGutter,
            ExportIcon
        },

        mixins: [
            EvExportMixin,
        ],

        props: {
            jsonMethodContent: Object
        },

        data() {
            return {
                showSnackbar: false,

                currentExportType: "Markdown",

                showExportMenu: false,
            }
        },

        computed: {
            exportTypes() {
                return [
                    this.markdown,
                    this.asciidoc,
                    this.image_png,
                    // this.html_file
                ]
            }
        },

        methods: {
            changeExportType(type) {
                this.currentExportType = type

                this.showExportMenu = false
            },
            doExport() {
                if (this.currentExportType === this.markdown) {
                    this.exportApiToMarkdown()
                }

                if (this.currentExportType === this.asciidoc) {
                    this.exportApiToAsciidoc()
                }

                if (this.currentExportType === this.image_png) {
                    this.previewExportHandler()
                }

                if (this.currentExportType === this.html_file) {
                    this.exportApiToHtmlFile()
                }

                // if (this.currentExportType === "File/HTML") {
                //     this.exportApiToMarkdown()
                // }

                // if (this.currentExportType === "Text/cURL") {
                //     this.exportApiToMarkdown()
                // }

                this.showSnackbar = true
            },

            async exportApiToMarkdown() {
                let markdown = ""

                markdown = await MarkdownBuilder.buildFromJsonMethod(this.jsonMethodContent)

                clipboard.writeText(markdown)
            },

            async exportApiToAsciidoc() {
                let asciidoc = ""

                asciidoc = await AsciidocBuilder.buildFromJsonMethod(this.jsonMethodContent)

                clipboard.writeText(asciidoc)
            },

            async exportApiToHtmlFile() {
                EvExportButtonEventBus.$emit(EvExportButtonEvents.EXPORT_TO_HTML, this.jsonMethodContent)
            },

            previewExportHandler() {
                let nativeImage = require('electron').nativeImage

                let documentContainer = document.querySelector("#ev-api-definition")

                let clientHeight = documentContainer.clientHeight

                let scrollHeight = documentContainer.scrollHeight

                html2canvas(documentContainer, {
                    height: scrollHeight,
                    windowHeight: scrollHeight + clientHeight, // WTF???
                    scrollY: 0,
                    scrollX: 0,
                }).then(canvas => {
                    let img = nativeImage.createFromDataURL(canvas.toDataURL())

                    clipboard.writeImage(img)
                })
            },

            htmlExportHandler() {

            },

            cURLExportHandler() {

            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .export-button {
        width: 144px;

        height: 24px;

        @include white-background-gradient;

        border-radius: 4px;

        user-select: none;

        border: 1px solid #E0E0E0;

        padding-top: 4px;

        padding-bottom: 4px;

        box-shadow: 0px 1px 4px -2px #AABBCC;
    }

    .export-button__icon {
        width: 28px;

        height: 22px;

        padding-bottom: 1px;

        @include white-background-gradient;

        border-radius: 0px 4px 4px 0;

        border-left: 1px solid #E0E0E0;
    }

    .export-button__menu {
        width: 120px;

        height: 24px;

        padding-left: 12px;

        padding-right: 4px;
    }

    .export-button__font {
        font-size: 11px;

        line-height: 24px;

        font-weight: bold;

        color: $PRIMARY_FONT_COLOR;
    }

    .export-type-menu {
        @include white-background-gradient;

        user-select: none;
    }

    .export-type-menu__item {
        height: 32px;

        display: flex;

        align-items: center;

        padding-left: 12px;

        &:hover {
            background-color: #e6ecf2;
        }
    }

    .export-type-menu__font {
        font-size: 11px;

        font-weight: bold;

        color: $SECONDARY_FONT_COLOR;
    }
</style>

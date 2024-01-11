<template>
    <div class="multipart-form-item-file-selector" @click="doChooseFile">
        <span class="multipart-form-item-file-selector__label" v-if="!item.value">{{ $t('selectFile') }}</span>

        <div class="multipart-form-item-file-selector__file-container" v-else>
            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <span class="multipart-form-item-file-selector__label text-truncate">{{ item.value.fileName }}</span>

            <v-spacer></v-spacer>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div style="display: flex; flex-shrink: 0">
                <span class="multipart-form-item-file-selector__size-label">{{ item.value.fileSize }}</span>
            </div>

            <div class="multipart-form-item-file-selector__close-btn" @click.stop="doClearFile">
                <ev-cancel-icon></ev-cancel-icon>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvCancelIcon from '@/views/http-client/components/multipart-form-editor/ev-cancel-icon'

    export default {
        name: "EvMultipartFormItemFileSelector",

        components: {
            EvCancelIcon,
            EvVerticalGutter
        },

        props: {
            item: Object
        },

        data() {
            return {}
        },

        methods: {
            doClearFile() {
                this.item.value = undefined
            },

            doChooseFile() {
                const {dialog} = require('electron').remote

                const currentWindow = require('electron').remote.getCurrentWindow()

                dialog.showOpenDialog(currentWindow, {properties: ['openFile'], securityScopedBookmarks: true})
                    .then(file => {
                        if (file.canceled) { // ignore
                            return
                        }

                        if (file.bookmarks) {
                            this.item.bookmark = file.bookmarks[0]
                        }

                        let path = file.filePaths[0]

                        let split = path.split("/")

                        this.item.value = {
                            fileName: split[split.length - 1],
                            fileSize: this.calcFileSize(path),
                            filePath: path
                        }
                    })
            },

            calcFileSize(filePath) {
                let fs = require('fs')

                let stats = fs.statSync(filePath)

                let size = stats.size

                let kiloBytes = 1024

                let megaBytes = 1024 * 1024

                if (size < kiloBytes) {
                    return Math.ceil(size) + " B"
                } else if (size < megaBytes) {
                    return Math.ceil(size / kiloBytes) + " KB"
                } else {
                    return Math.ceil(size / megaBytes) + " MB"
                }
            }
        },

        i18n: {
            messages: {
                en: {
                    selectFile: "Select File"
                },
                zh: {
                    selectFile: "选择文件"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .multipart-form-item-file-selector {
        @include full-center;

        justify-self: center;

        border: 1px solid #F1F1F1;

        background-color: #FAFAFA;

        min-width: 128px;

        max-width: 160px;

        height: 20px;

        border-radius: 24px;

        user-select: none;

        &__label {
            font-size: 10px;

            line-height: 16px;

            font-weight: bold;

            color: $SECONDARY_FONT_COLOR;
        }

        &__size-label {
            font-size: 10px;

            line-height: 16px;

            color: $SECONDARY_FONT_COLOR;
        }

        &__close-btn {
            @include full-center;

            flex-shrink: 0;

            @include circle(12px);

            padding-top: 1px;

            padding-left: 1px;

            justify-self: flex-end;

            transition: 100ms;

            &:hover {
                background-color: #F1F1F1;
            }
        }

        &__file-container {
            @include horizon-center;

            width: 100%;
        }
    }
</style>

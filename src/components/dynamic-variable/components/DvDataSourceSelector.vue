<template>
    <div class="dv-source-selector">
        <div class="dv-source-selector__button">
            <div class="d-flex flex-grow-1 justify-center" @click="toSource('text')">
                <ev-label size="11" bold secondary v-bind="{ blue: isTextSource}">{{ $t('text') }}</ev-label>
            </div>

            <div class="dv-source-selector__button-divider"></div>

            <div class="d-flex flex-grow-1 justify-center" @click="toSource('file')">
                <ev-label size="11" bold secondary v-bind="{ blue: isFileSource }">{{ $t('file') }}</ev-label>
            </div>
        </div>

        <div class="dv-source-selector__input-wrapper" v-if="isTextSource">
            <textarea class="textarea-style" spellcheck="false" :placeholder="$t('placeholder')" v-model="value.text"></textarea>
        </div>

        <div class="dv-source-selector__input-wrapper" v-if="isFileSource">
            <div class="ev-choose-file-button">
                <ev-label size="11" secondary @click.native="chooseFile">{{ $t('selectFile') }}</ev-label>
            </div>

            <ev-label size="11" secondary>{{ filename || ' ' }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvFileDialogMixin from '@/mixins/EvFileDialogMixin'

    export default {
        name: "DvDataSourceSelector",

        components: {
            EvLabel
        },

        mixins: [
            EvFileDialogMixin
        ],

        props: {
            value: Object
        },

        data() {
            return {}
        },

        computed: {
            isTextSource() {
                return this.value && this.value.source === 'text'
            },

            isFileSource() {
                return this.value && this.value.source === 'file'
            },

            filename() {
                let file = this.value.file

                if (file) {
                    return file.filename
                } else {
                    return ''
                }
            },
        },

        methods: {
            toSource(source) {
                this.value.source = source
            },

            chooseFile() {
                this.openFile().then(file => {
                    this.value.file = file
                })
            },
        },

        i18n: {
            messages: {
                en: {
                    text: "Text",

                    file: "File",

                    selectFile: "Select File",

                    placeholder: "Put your content here..."
                },

                zh: {
                    text: "文本",

                    file: "文件",

                    selectFile: "选择文件",

                    placeholder: "在这里输入内容"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .dv-source-selector {
        @include flex-column;

        align-items: center;

        position: relative;

        height: 128px;

        border: 1px solid #E0E0E0;

        background-color: white;

        border-radius: 5px;

        &__button {
            @include full-center;

            @include white-background-gradient;

            @include mac-shadow;

            position: absolute;

            width: 128px;

            height: 24px;

            border-radius: 5px;

            top: -12px;

            padding-bottom: 1px;
        }

        &__button-divider {
            //margin-left: 16px;

            height: 12px;

            width: 1px;

            background-color: #D8D8D8;

            //margin-right: 16px;
        }

        &__input-wrapper {
            @include flex-column;

            align-items: center;

            justify-content: center;

            width: 100%;

            height: 100%;

            padding-top: 16px;

            padding-left: 8px;

            padding-right: 8px;
        }
    }

    .ev-choose-file-button {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 72px;

        height: 20px;

        border-radius: 16px;

        border: 1px solid #D8D8D8;

        margin-bottom: 8px;
    }

    textarea {
        width: 100%;

        height: 100%;

        resize: none;

        border: none;

        outline: none;

        font-size: 12px;

        color: $SECONDARY_FONT_COLOR;

        &::-webkit-scrollbar {
            display: none;
        }

        &::placeholder {
            font-size: 12px;

            color: $PLACEHOLDER_FONT_COLOR;
        }

    }
</style>

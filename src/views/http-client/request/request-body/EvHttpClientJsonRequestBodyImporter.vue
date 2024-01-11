<template>
    <v-menu v-bind="config" left :close-on-content-click="false" v-model="show" :disabled="disabled">
        <template v-slot:activator="{ on }">
            <div class="d-flex" v-on="on">
                <ev-import-json-icon :color="disabled ? '#999' : '#555'"></ev-import-json-icon>
            </div>
        </template>

        <div class="ev-http-client-json-request-body-importer">
            <ev-menu-top-indicator class="ev-http-client-json-request-body-importer__indicator" color="#FAFAFA"></ev-menu-top-indicator>

            <div class="ev-http-client-json-request-body-importer__header">
                <div class="header-container">
                    <div class="header-container__button" @click="type = 'text'">
                        <ev-label size="11" v-bind="{'blue': isTextType,'bold': isTextType,'grey': !isTextType}">{{ $t('text') }}</ev-label>
                    </div>

                    <ev-vertical-divider></ev-vertical-divider>

                    <div class="header-container__button" @click="type = 'file'">
                        <ev-label size="11" v-bind="{'blue': isFileType,'bold': isFileType,'grey': !isFileType}">{{ $t('file') }}</ev-label>
                    </div>
                </div>
            </div>

            <div class="ev-http-client-json-request-body-importer__content" v-if="isTextType">
                <textarea class="ev-http-client-json-request-body-importer__textarea" :placeholder="$t('tips')" v-model="text"></textarea>
            </div>

            <div class="ev-http-client-json-request-body-importer__content" v-if="isFileType">
                <ev-choose-file-button @click.native="doChooseJsonFile"></ev-choose-file-button>
            </div>

            <div class="ev-http-client-json-request-body-importer__footer" v-if="isTextType">
                <ev-label size="11" medium secondary>{{ $t('override') }}</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-switch v-model="merge"></ev-switch>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-label size="11" medium secondary>{{ $t('merge') }}</ev-label>

                <v-spacer></v-spacer>

                <ev-label size="12" secondary bold @click.native="doImportJson">{{ $t('done') }}</ev-label>
            </div>
        </div>
    </v-menu>
</template>

<script>
    import EvImportJsonIcon from '@/components/json-editor-vsl/icons/ev-import-json-icon'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
    import EvMenuTopIndicator from '@/components/json-editor-vsl/icons/ev-menu-top-indicator'
    import EvChooseFileButton from '@/components/button/EvChooseFileButton'
    import _ from 'lodash'
    import ProjectImporterPayload from '@/views/titlebar/project-importer/ProjectImporterPayload'
    import ProjectImporterPayloadOperation from '@/views/titlebar/project-importer/ProjectImporterPayloadOperation'
    import ProjectImporterPayloadSource from '@/views/titlebar/project-importer/ProjectImporterPayloadSource'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvSwitch from '@/components/button/EvSwitch.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvHttpClientJsonRequestBodyImporter",

        components: {
            EvVerticalGutter,
            EvSwitch,
            EvChooseFileButton,
            EvMenuTopIndicator,
            EvVerticalDivider,
            EvLabel,
            EvImportJsonIcon
        },

        props: {
            disabled: {
                type: Boolean,
                default: false,
            }
        },

        data() {
            return {
                show: false,

                type: 'text', // text | file

                merge: false,

                config: {
                    'offset-y': true,

                    'nudge-right': 110,

                    'nudge-top': -12,

                    'content-class': "popup-menu",
                },

                text: ""
            }
        },

        watch: {
            show() {
                this.text = ""
            }
        },

        computed: {
            isTextType() {
                return this.type === 'text'
            },

            isFileType() {
                return this.type === 'file'
            }
        },

        methods: {
            doImportJson() {
                try {
                    let json = GHCJson.parse(this.text)

                    this.$emit('import-json', json, this.merge)
                } catch (e) {
                    console.error('Import Json Failed', e)
                }

                this.show = false
            },

            doChooseJsonFile() {
                const {dialog} = require('electron').remote

                const fs = require('fs')

                dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: [{name: "Json", extensions: ['json']}],
                }).then(file => {
                    if (file.canceled) {
                        return
                    }

                    let path = file.filePaths[0]

                    try {
                        let json = GHCJson.parse(fs.readFileSync(path).toString('utf-8'))

                        this.$emit('import-json', json)
                    } catch (e) {
                        console.error('Import Json Failed', e)
                    }
                })

                this.show = false
            }
        },

        i18n: {
            messages: {
                en: {
                    text: "Text",

                    file: "File",

                    tips: "Paste Json Here...",

                    done: "Done",

                    merge: "Merge",

                    override: "Override",
                },
                zh: {
                    text: "文本",

                    file: "文件",

                    tips: "在这里粘贴JSON文本",

                    done: "导入",

                    merge: "增量更新",

                    override: "全部覆盖",
                },
                zh_TW: {
                    text: "文本",

                    file: "文件",

                    tips: "在此貼上JSON文本",

                    done: "匯入",

                    merge: "合併",

                    override: "覆蓋",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-json-request-body-importer {
        position: relative;

        display: flex;

        flex-direction: column;

        width: 240px;

        height: 160px;

        background-color: #FAFAFA;

        border-radius: 3px;

        &__indicator {
            position: absolute;

            display: block;

            top: -12px;

            align-self: center;

            z-index: 800;
        }

        &__header {
            @include full-center;

            height: 32px;

            width: 100%;

            border-bottom: 1px solid #F1F1F1;

            padding-left: 16px;

            padding-right: 16px;
        }

        &__content {
            @include full-center;

            height: 96px;

            width: 100%;
        }

        &__footer {
            display: flex;

            align-items: center;

            justify-content: flex-end;

            height: 32px;

            width: 100%;

            border-top: 1px solid #F1F1F1;

            padding-left: 8px;

            padding-right: 16px;
        }

        &__textarea {
            border: none;

            resize: none;

            outline: none;

            width: 100%;

            height: 100%;

            padding: 8px;

            font-size: 11px;

            color: $SECONDARY_FONT_COLOR;

            overflow: hidden;

            &::placeholder {
                font-size: 11px;

                color: $PLACEHOLDER_FONT_COLOR;
            }
        }
    }

    .header-container {
        display: flex;

        align-items: center;

        width: 100%;

        height: 20px;

        background-color: #F1F1F1;

        border-radius: 5px;

        &__button {
            @include full-center;

            flex: 1;
        }
    }

    .popup-menu {
        contain: initial;

        overflow: visible;

        align-self: center;
    }
</style>

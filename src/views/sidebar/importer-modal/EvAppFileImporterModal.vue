<template>
    <div class="ev-app-file-importer-modal" @dragover.prevent v-hotkey="hotkey">
        <div class="ev-app-file-importer-modal__navigator">
            <ev-circle-close-button @click.native="doClose"></ev-circle-close-button>

            <v-spacer></v-spacer>

            <ev-label primary size="11" bold>{{ $t('importFromFile') }}</ev-label>

            <v-spacer></v-spacer>
        </div>

        <div class="ev-app-file-importer-modal__content">
            <div class="ev-app-file-importer-modal__content__drag-container" @drop.prevent="handleDropFile">
                <ev-label size="11" primary>{{ $t('dragFileHere') }}</ev-label>

                <ev-label size="11" grey>or</ev-label>

                <div class="ev-app-file-importer-modal__choose-file">
                    <ev-label size="11" blue @click.native="doChooseFile">{{ $t('chooseFile') }}</ev-label>
                </div>

                <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

                <ev-label size="11" secondary>{{ $t('supportedFormats') }}</ev-label>

                <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

                <ul>
                    <li>Postman V2</li>
                    <li>Insomnia V4</li>

                    <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

                    <li>Swagger 2.0</li>
                    <li>OpenAPI 3.x</li>

                    <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>
                    <!--                    <li>API Blueprint</li>-->
                    <!--                    <li>RAML</li>-->
                    <!--                    <li>WSDL</li>-->
                    <!--                    <li>HAR</li>-->
                </ul>
            </div>
        </div>

        <div class="ev-app-file-importer-modal__footer">
            <!--            <ev-label size="11">IMPORT</ev-label>-->
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvLabel from '@/components/typography/EvLabel'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import {EvAppSidebarEventBus, EvAppSidebarEvents} from '@/views/sidebar/EvAppSidebarEventBus'
    import EvNotificationMixin from '@/mixins/EvNotificationMixin'
    import GHCSwaggerTransformer from '@/core/transformer/GHCSwaggerTransformer'
    import RabiHttpOperationDao from '@/core/dao/RabiHttpOperationDao'
    import fs from 'fs'
    import GHCPostmanTransformer from '@/core/transformer/GHCPostmanTransformer'
    import GHCOpenAPITransformer from '@/core/transformer/GHCOpenAPITransformer'
    import GHCInsomniaTransformer from '@/core/transformer/GHCInsomniaTransformer'
    import GHCJson from '@/core/json/GHCJson'

    export default {
        name: "EvAppFileImporter",

        components: {
            EvHorizonGutter,
            EvLabel,
            EvCircleCloseButton
        },

        mixins: [
            EvStoreMixin,
            EvNotificationMixin
        ],

        props: {
            targetTreeNode: Object,
        },

        data() {
            return {
                loading: false
            }
        },

        computed: {
            hotkey() {
                return {
                    'esc': this.doClose,
                }
            },
        },

        methods: {
            doClose() {
                this.$emit('close')
            },

            handleDropFile(event) {
                event.preventDefault()

                let items = event.dataTransfer.items

                items && items.forEach(item => {
                    if (item.kind === 'file') {
                        let file = item.getAsFile()

                        this.importFile(file.path)
                    }
                })
            },

            doChooseFile() {
                const {dialog} = require('electron').remote

                const currentWindow = require('electron').remote.getCurrentWindow()

                dialog.showOpenDialog(currentWindow, {
                    properties: ['openFile'],
                    filters: [{name: "", extensions: ['json', 'yaml']}],
                    securityScopedBookmarks: false
                })
                    .then(file => {
                        if (file.canceled) {
                            return
                        }

                        this.loading = true

                        let path = file.filePaths[0]

                        this.importFile(path)
                    })
            },

            importFile(path) {
                try {
                    let content = fs.readFileSync(path, 'utf8')

                    let data

                    if (path.endsWith(".yaml")) { // yaml 先转换为 json
                        const yaml = require('js-yaml')

                        data = yaml.load(content)
                    } else {
                        data = GHCJson.parse(content)
                    }

                    let transformer

                    if (this.checkIsPostmanV2Format(data)) {
                        transformer = new GHCPostmanTransformer(data)
                    }

                    if (this.checkIsInsomniaV4Format(data)) {
                        transformer = new GHCInsomniaTransformer(data)
                    }

                    if (this.checkIsSwaggerFormat(data)) {
                        transformer = new GHCSwaggerTransformer(data)
                    }

                    if (this.checkIsOpenAPIFormat(data)) {
                        transformer = new GHCOpenAPITransformer(data)
                    }

                    if (transformer) {
                        let result = transformer.transformToRequests()

                        let treeNode = result.treeNode

                        this.handle(treeNode).then(() => {
                            if (result.jsonSchemaGroup) {
                                this.currentProject.jsonSchemaGroups.push(result.jsonSchemaGroup)
                            }

                            EvAppSidebarEventBus.$emit(EvAppSidebarEvents.IMPORT_FROM_FILE_COMPLETE, treeNode, this.targetTreeNode)
                        }).catch(err => {
                            console.error(err)

                            this.sendNotification('Import File Failed', 'Unknown Error')
                        })
                    }
                } catch (err) {
                    console.error(err)

                    this.sendNotification('Import File Failed', 'Unknown Error')
                }
            },

            checkIsPostmanV2Format(json) {
                return json['info'] && json['info']['_postman_id']
            },

            checkIsInsomniaV4Format(json) {
                return json['__export_source'] && json['__export_source'].startsWith('insomnia.desktop.app')
            },

            checkIsSwaggerFormat(json) {
                return json['swagger'] && json['swagger'].startsWith('2.0')
            },

            checkIsOpenAPIFormat(json) {
                return json['openapi'] && json['openapi'].startsWith('3.0')
            },

            async handle(treeNode) {
                let projectId = this.currentProject.id

                let versionId = this.currentVersion.id

                for (let i = 0; i < treeNode.children.length; i++) {
                    let subTreeNode = treeNode.children[i]

                    if (subTreeNode.httpRequest) { // httpRequest -> httpOperation
                        let httpOperation = subTreeNode.httpRequest

                        httpOperation.projectId = projectId

                        httpOperation.versionId = versionId

                        httpOperation = await new RabiHttpOperationDao().save(httpOperation)

                        subTreeNode.httpRequestId = httpOperation.id

                        subTreeNode.httpRequest = undefined
                    } else {
                        await this.handle(subTreeNode)
                    }
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    importFromFile: "Import from File",

                    dragFileHere: "Drag File Here",

                    chooseFile: "Choose File",

                    supportedFormats: "Supported Formats"
                },
                zh: {
                    importFromFile: "导入文件",

                    dragFileHere: "拖动文件到此处",

                    chooseFile: "选择文件",

                    supportedFormats: "支持的格式"
                },
                zh_TW: {
                    importFromFile: "從檔案匯入",

                    dragFileHere: "拖曳檔案到這裡",

                    chooseFile: "選擇檔案",

                    supportedFormats: "支援的格式"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    $PADDING: 12px;

    .ev-app-file-importer-modal {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: 480px;

        width: 480px;

        background-color: #FCFCFC;

        &__choose-file {
            @include full-center;

            width: fit-content;

            height: 20px;

            padding-top: 1px;

            padding-left: 12px;

            padding-right: 12px;

            border: 1px solid #4da3ff;

            border-radius: 24px;

            transition: border 100ms;

            &:hover {
                border: 1px solid #007AFF;
            }
        }

        &__navigator {
            position: relative;

            display: flex;

            align-items: center;

            height: 40px;

            padding-left: $PADDING;

            background-color: #F1F1F1;

            border-bottom: 1px solid #E0E0E0;
        }

        &__content {
            display: flex;

            height: 100%;

            padding: $PADDING;

            &__drag-container {
                @include full-center;

                flex-direction: column;

                width: 100%;

                height: 100%;

                border: 1px dashed #e0e0e0;

                border-radius: 5px;

                background-color: #FAFAFA;
            }
        }

        &__footer {
            display: flex;

            height: 40px;

            border-top: 1px solid #EAEAEA;

            background-color: #F1F1F1;

            padding-left: $PADDING;

            padding-right: $PADDING;
        }
    }

    ul {
        user-select: none;

        li {
            font-size: 11px;

            color: $PLACEHOLDER_FONT_COLOR;
        }
    }
</style>

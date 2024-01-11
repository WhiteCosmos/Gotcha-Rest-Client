<template>
    <div class="ev-project-export-modal">
        <div class="ev-project-export-modal__header">
            <ev-circle-close-button @click.native="doClose"></ev-circle-close-button>

            <v-spacer></v-spacer>

            <ev-project-export-config-selector @select="handleSelectExportConfig"></ev-project-export-config-selector>
        </div>

        <div class="ev-project-export-modal__menu">
            <div class="ev-menu-wrapper"
                 @click="menu = 'typeA'"
                 :class="{'ev-menu-wrapper--selected': (menu === 'typeA')}">
                <ev-label size="11" bold secondary>{{ $t('apis') }}</ev-label>
            </div>

            <!--            <ev-vertical-gutter :gutter="28"></ev-vertical-gutter>-->

            <div class="ev-menu-wrapper"
                 @click="menu = 'typeB'"
                 :class="{'ev-menu-wrapper--selected': (menu === 'typeB')}">
                <ev-label size="11" bold secondary>{{ $t('settings') }}</ev-label>
            </div>
        </div>

        <div class="ev-project-export-modal__content" v-if="menu === 'typeA'">
            <ev-export-tree-view :tree-nodes="treeNodes"
                                 ref="ev-export-tree-view"></ev-export-tree-view>
        </div>

        <div class="ev-project-export-modal__content" v-if="menu === 'typeB'">
            <ev-project-export-open-api-settings v-if="selectedExportConfig.format === 'openapi'"
                                                 :settings="selectedExportConfig.openapiSettings"></ev-project-export-open-api-settings>

            <ev-project-export-swagger-settings v-else-if="selectedExportConfig.format === 'swagger'"
                                                :settings="selectedExportConfig.swaggerSettings"></ev-project-export-swagger-settings>

            <ev-project-export-settings-placeholder v-else></ev-project-export-settings-placeholder>
        </div>

        <div class="ev-project-export-modal__footer">
            <ev-popup-menu-radio-item name="postman" v-model="selectedExportConfig.format">Postman</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="markdown" v-model="selectedExportConfig.format">Markdown</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="swagger" v-model="selectedExportConfig.format">Swagger</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="openapi" v-model="selectedExportConfig.format">OpenAPI</ev-popup-menu-radio-item>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-popup-menu-radio-item name="curl" v-model="selectedExportConfig.format">cURL</ev-popup-menu-radio-item>

            <v-spacer></v-spacer>

            <ev-text-button no-border @click.native="doExport">{{ $t('exportProject') }}</ev-text-button>

            <ev-project-export-counter :count="count" v-if="menu === 'typeA'"></ev-project-export-counter>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvLabel from '@/components/typography/EvLabel'
    import EvProjectExportConfigSelector from '@/views/titlebar/project-exporter/EvProjectExportConfigSelector'
    import EvPopupMenuRadioItem from '@/components/menu/EvPopupMenuRadioItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvExportTreeView from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeView'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvProjectExportCounter from '@/views/titlebar/project-exporter/EvProjectExportCounter'
    import EvTextButton from '@/components/button/EvTextButton'
    import EvExportTreeViewMixin from '@/views/titlebar/project-exporter/export-tree-view/EvExportTreeViewMixin'
    import EvFileMixin from '@/mixins/EvFileMixin'
    import GHCPostmanCollectionV2Builder from '@/core/postman/GHCPostmanCollectionV2Builder'
    import GHCTreeNode from '@/components/api-tree/data/GHCTreeNode'
    import GHCHttpClientRequestDocsExporter from '@/views/http-client/request/request-docs/GHCHttpClientRequestDocsExporter'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvBasicInput from '@/components/input/EvBasicInput'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvAutoResizeTextarea from '@/components/input/EvAutoResizeTextarea'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvProjectExportOpenApiSettings from '@/views/titlebar/project-exporter/export-settings/EvProjectExportOpenApiSettings'
    import EvProjectExportSwaggerSettings from '@/views/titlebar/project-exporter/export-settings/EvProjectExportSwaggerSettings'
    import GHCHttpClientRequestDocsSwaggerExporter from '@/views/http-client/request/request-docs/exporters/GHCHttpClientRequestDocsSwaggerExporter'
    import GHCHttpClientRequestDocsOpenApiExporter from '@/views/http-client/request/request-docs/exporters/GHCHttpClientRequestDocsOpenApiExporter'
    import GHCSwaggerExportSettings from '@/data/gotcha/export/GHCSwaggerExportSettings'
    import GHCOpenAPIExportSettings from '@/data/gotcha/export/GHCOpenAPIExportSettings'
    import EvProjectExportSettingsPlaceholder from '@/views/titlebar/project-exporter/export-settings/EvProjectExportSettingsPlaceholder.vue'

    export default {
        name: "EvProjectExportModal_",

        components: {
            EvProjectExportSettingsPlaceholder,
            EvProjectExportSwaggerSettings,
            EvProjectExportOpenApiSettings,
            EvHorizonGutter,
            EvAutoResizeTextarea,
            EvPopupMenuDivider,
            EvBasicInput,
            EvBorderlessInput,
            EvTextButton,
            EvProjectExportCounter,
            EvExportTreeView,
            EvVerticalGutter,
            EvPopupMenuRadioItem,
            EvProjectExportConfigSelector,
            EvLabel,
            EvCircleCloseButton
        },

        mixins: [
            EvStoreMixin,
            EvFileMixin,
            EvExportTreeViewMixin,
        ],

        created() {
            this.initialize()
        },

        props: {
            // treeNodes: Array
        },

        computed: {
            treeNodes() {
                let treeNodes = this.currentModule.apis

                let flattenTreeNodes = []

                this._iterateTreeNodes(treeNodes, (treeNode) => {
                    treeNode.isContainer && (flattenTreeNodes.push(treeNode))
                })

                return flattenTreeNodes
            },

            count() {
                let count_1 = this.treeNodes.filter(treeNode => {
                    return treeNode.isContainer && !this.checkIsNoTreeNodeSelected(treeNode)
                }).length

                let count_2 = 0

                this.treeNodes.forEach(treeNode => {
                    if (treeNode.isContainer) {
                        let length = treeNode.children.filter(child => {
                            return !child.isContainer && this.checkIsTreeNodeSelected(child)
                        }).length

                        count_2 += length
                    }
                })

                return {
                    count_1: count_1,
                    count_2: count_2
                }
            },

            menuStyle() {
                if (this.menu === 'typeA') {
                    return ['ev-menu-wrapper--selected']
                }

                if (this.menu === 'typeB') {
                    return ['ev-menu-wrapper--selected']
                }
            },
        },

        data() {
            return {
                menu: "typeA", // typeA typeB
            }
        },

        methods: {
            initialize() {
                let project = this.currentProject

                project.exportConfig.configs.forEach(exportConfig => {
                    this.initializeProperties(exportConfig)
                })
            },

            initializeProperties(exportConfig) {
                if (!exportConfig.hasOwnProperty('swaggerSettings')) {
                    this.$set(exportConfig, 'swaggerSettings', new GHCSwaggerExportSettings())
                }

                if (!exportConfig.hasOwnProperty('openapiSettings')) {
                    this.$set(exportConfig, 'openapiSettings', new GHCOpenAPIExportSettings())
                }
            },

            doClose() {
                this.$emit('close')
            },

            doExport() {
                let exportConfig = this.selectedExportConfig

                let format = exportConfig.format

                if (format === 'postman') {
                    let builder = new GHCPostmanCollectionV2Builder(this.currentCookieJar, this.dynamicVariableRender, this.treeNodeExportPredict)

                    let root = GHCTreeNode.newTreeViewGroupNode()

                    root.name = exportConfig.name || 'Default Group'

                    root.children = this.currentModule.apis

                    builder.build(root).then(postman => {
                        let jsonStr = JSON.stringify(postman, null, 2)

                        this.saveFile(jsonStr, 'json', `${root.name}.postman_collection`)
                    })
                }

                if (format === 'markdown') {
                    let builder = new GHCHttpClientRequestDocsExporter(this.currentCookieJar, this.dynamicVariableRender, this.treeNodeExportPredict)

                    builder.batchExportToMarkdown(this.treeNodes).then(md => {
                        this.saveFile(md, 'md')
                    })
                }

                if (format === 'swagger') {
                    let exporter = new GHCHttpClientRequestDocsSwaggerExporter(this.currentCookieJar, this.dynamicVariableRender, this.treeNodeExportPredict)

                    exporter.batchExportToSwagger(this.treeNodes, this.jsonSchemaGroups, exportConfig.swaggerSettings).then(swagger => {
                        if (!swagger.info.title) {
                            swagger.info.title = this.currentProject.name
                        }

                        let jsonStr = JSON.stringify(swagger, null, 2)

                        this.saveFile(jsonStr, 'json', `${swagger.info.title}`)
                    })
                }

                if (format === 'openapi') {
                    let exporter = new GHCHttpClientRequestDocsOpenApiExporter(this.currentCookieJar, this.dynamicVariableRender, this.treeNodeExportPredict)

                    exporter.batchExportToOpenApi(this.treeNodes, this.jsonSchemaGroups, exportConfig.openapiSettings).then(openapi => {
                        if (!openapi.info.title) {
                            openapi.info.title = this.currentProject.name
                        }

                        let jsonStr = JSON.stringify(openapi, null, 2)

                        this.saveFile(jsonStr, 'json', `${openapi.info.title}`)
                    })
                }

                if (format === 'curl') {
                    let builder = new GHCHttpClientRequestDocsExporter(this.currentCookieJar, this.dynamicVariableRender, this.treeNodeExportPredict)

                    builder.batchExportToCurl(this.treeNodes).then(md => {
                        this.saveFile(md, 'md')
                    })
                }
            },

            handleAddProjectExportConfig() {

            },

            handleRemoveProjectExportConfig() {

            },

            handleSelectProjectExportConfig() {

            },

            _iterateTreeNodes(treeNodes, callback = () => {
            }) {
                treeNodes.forEach(node => {
                    callback(node)

                    if (node.isContainer) {
                        this._iterateTreeNodes(node.children, callback)
                    }
                })
            },

            checkIsContainerTreeNode(treeNode) {
                return treeNode.isContainer
            },

            handleSelectExportConfig() {
                this.$refs['ev-export-tree-view'].reset()
            },
        },

        i18n: {
            messages: {
                en: {
                    exportProject: "Export",

                    apis: "APIs",

                    settings: "Settings",
                },
                zh: {
                    exportProject: "导出项目",

                    apis: "选择接口",

                    settings: "导出设置",
                },
                zh_TW: {
                    exportProject: "導出專案",

                    apis: "選擇接口",

                    settings: "導出設定"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    $PADDING: 12px;

    .ev-project-export-modal {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100vh - 240px);

        width: 480px;

        &__header {
            position: relative;

            display: flex;

            align-items: center;

            height: 40px;

            padding-left: $PADDING;

            padding-right: 16px;

            border-bottom: 1px solid #EAEAEA;

            background-color: #F1F1F1;
        }

        &__menu {
            position: relative;

            display: flex;

            align-items: flex-end;

            padding-left: 16px;

            height: 28px;

            background-color: #F1F1F1;

            //border-bottom: 1px solid #EAEAEA;
        }

        &__content {
            position: relative;

            display: flex;

            flex-direction: column;

            min-height: 1px;

            min-width: 1px;

            flex: 1;

            padding: $PADDING;

            background-color: #FCFCFC;

            overflow-y: scroll;
        }

        &__footer {
            position: relative;

            display: flex;

            align-items: center;

            justify-content: flex-end;

            height: 40px;

            border-top: 1px solid #EAEAEA;

            background-color: #F1F1F1;

            padding-left: $PADDING;

            padding-right: $PADDING;
        }
    }

    .ev-menu-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        height: 24px;

        border-radius: 3px 3px 0 0;

        &--selected {
            background-color: #FCFCFC;

            border-bottom: 1px solid #007AFF;
        }

        //background-color: #FF8282;

        padding-left: 16px;

        padding-right: 16px;

        //background: linear-gradient(0deg, #FAFAFA 0%, #FFFFFF 100%);

        //@include mac-shadow;
    }

    .ev-property-wrapper {
        display: flex;

        align-items: center;

        height: 28px;

        width: 100%;

        &__key {
            display: flex;

            //justify-content: flex-end;

            width: 160px;

            //background-color: #FF8282;

            padding-left: 32px;

            padding-right: 16px;
        }

        &__value {
            display: flex;

            flex: 1;

            padding-right: 32px;
        }
    }
</style>

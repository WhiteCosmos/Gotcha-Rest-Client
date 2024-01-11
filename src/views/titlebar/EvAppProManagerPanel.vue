<template>
    <div class="ev-app-pro-manager-panel">
        <div class="ev-app-pro-manager-panel__panel-item" @click="openSchemaDialog">
            <ev-schema-icon></ev-schema-icon>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="11" bold secondary>{{ $t('jsonSchema') }}</ev-label>
        </div>

        <ev-vertical-divider></ev-vertical-divider>

        <div class="ev-app-pro-manager-panel__panel-item" @click="openTemplateDialog">
            <ev-request-template-icon></ev-request-template-icon>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="11" bold secondary>{{ $t('requestTemplate') }}</ev-label>
        </div>

        <ev-vertical-divider></ev-vertical-divider>

        <div class="ev-app-pro-manager-panel__panel-item" @click="openExportDialog">
            <ev-export-icon></ev-export-icon>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="11" bold secondary>{{ $t('exportApi') }}</ev-label>
        </div>

        <v-dialog v-bind="export_dialog_config" v-model="showExportDialog">
            <ev-project-export-modal_ v-hotkey="hotkey"
                                      @close="closeAllDialogs"></ev-project-export-modal_>
        </v-dialog>

        <v-dialog v-bind="modal_config_960" v-model="showTemplateDialog">
            <ev-http-client-request-template-manager v-hotkey="hotkey"
                                                     @close="closeAllDialogs"></ev-http-client-request-template-manager>
        </v-dialog>

        <v-dialog v-bind="modal_config_960" v-model="showSchemaDialog">
            <ev-json-schema-manager v-hotkey="hotkey"
                                    @close="closeAllDialogs"></ev-json-schema-manager>
        </v-dialog>
    </div>
</template>

<script>
import EvProTag from '@/components/tag/EvProTag.vue'
import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
import EvExportIcon from '@/views/http-client/icon/ev-export-icon.vue'
import EvLabel from '@/components/typography/EvLabel.vue'
import EvSchemaIcon from '@/assets/icon/ev-schema-icon.vue'
import EvVerticalDivider from '@/components/layout/EvVerticalDivider.vue'
import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
import EvRequestTemplateIcon from '@/assets/icon/ev-request-template-icon.vue'
import EvDialogMixin from '@/mixins/EvDialogMixin.vue'
import EvJsonSchemaManager from '@/modals/json-schema-manager/EvJsonSchemaManager.vue'
import EvProjectExportModal_ from '@/views/titlebar/project-exporter/EvProjectExportModal_.vue'
import EvHttpClientRequestTemplateManager
    from '@/views/titlebar/template-manager/EvHttpClientRequestTemplateManager.vue'

export default {
    name: "EvAppProManagerPanel",

    components: {
        EvHttpClientRequestTemplateManager,
        EvProjectExportModal_,
        EvJsonSchemaManager,
        EvRequestTemplateIcon,
        EvVerticalDivider,
        EvSchemaIcon,
        EvProTag,
            EvVerticalGutter,
            EvExportIcon,
            EvLabel
        },

        mixins: [
            EvStoreMixin,
            EvDialogMixin,
        ],

        created() {
            // save as template
        },

        beforeDestroy() {

        },

        data() {
            return {
                showSchemaDialog: false,

                showTemplateDialog: false,

                showExportDialog: false,
            }
        },

        computed: {
            hotkey() {
                return {
                    'esc': this.closeAllDialogs,
                }
            },
        },

        methods: {
            openSchemaDialog() {
                this.showSchemaDialog = true
            },

            openTemplateDialog() {
                this.showTemplateDialog = true
            },

            openExportDialog() {
                this.showExportDialog = true
            },

            closeAllDialogs() {
                this.showSchemaDialog = false

                this.showTemplateDialog = false

                this.showExportDialog = false
            },
        },

        i18n: {
            messages: {
                en: {
                    jsonSchema: "Schema",

                    requestTemplate: "Template",

                    exportApi: "Export"
                },
                zh: {
                    jsonSchema: "数据模型",

                    requestTemplate: "请求模板",

                    exportApi: "导出接口"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";


    .ev-app-pro-manager-panel {
        position: relative;

        display: flex;

        flex-direction: row;

        align-items: center;

        //width: fit-content;

        height: 28px;

        user-select: none;

        @include component-shadow;

        @include white-background-gradient;

        border-radius: 5px;

        padding-top: 1px;

        &__panel-item {
            display: flex;

            align-items: center;

            height: 28px;

            width: fit-content;

            padding-left: 8px;

            padding-right: 8px;
        }

        &__panel-overlay {
            @include full-center;

            position: absolute;

            width: 100%;

            height: 28px;

            opacity: 0.8;

            background-color: white;

            border-radius: 3px;
        }
    }
</style>

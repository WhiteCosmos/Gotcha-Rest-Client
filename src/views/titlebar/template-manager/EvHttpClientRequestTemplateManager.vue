<template>
    <div class="ev-960-modal">
        <div class="ev-960-modal__sidebar">
            <div class="ev-960-modal__navigator">
                <div style="position:absolute; left: 12px">
                    <ev-circle-close-button @click.native="doClose"></ev-circle-close-button>
                </div>

                <ev-label size="12" primary bold>{{ $t('title') }}</ev-label>

                <ev-icon-wrapper style="position: absolute; right: 20px" @click.native="handleAddTemplate">
                    <ev-http-client-add-variable-icon></ev-http-client-add-variable-icon>
                </ev-icon-wrapper>
            </div>

            <div class="ev-960-modal__tree-view" v-if="templates.length !== 0">
                <draggable v-model="templates"
                           handle=".ev-request-template-item"
                           animation="200"
                           style="width: 100%">
                    <ev-request-template-item v-for="template in templates"
                                              :ref="template.uid"
                                              :template="template"
                                              :selected-template="selectedTemplate"
                                              @click.native="handleSelectTemplate(template)"
                                              @remove-template="handleRemoveTemplate(template)"
                                              @show-context-menu="handleShowContextMenu"></ev-request-template-item>
                </draggable>
            </div>

            <div class="ev-960-modal__tree-view" v-else>
                <ev-http-client-request-template-placeholder :value="$t('treeViewPlaceholder')"
                                                             :padding-bottom="80"></ev-http-client-request-template-placeholder>
            </div>

            <v-menu v-model="showContextMenu" transition="dummy" :position-x="coordinate.x" :position-y="coordinate.y" absolute offset-y>
                <ev-context-menu>
                    <ev-context-menu-item @click.native="handleRenameTemplate">{{ $t('EvContextMenu.rename') }}</ev-context-menu-item>

                    <ev-context-menu-item @click.native="handleDuplicateTemplate">{{ $t('EvContextMenu.duplicate') }}</ev-context-menu-item>

                    <ev-context-menu-divider></ev-context-menu-divider>

                    <ev-context-menu-item @click.native="handleRemoveTemplate">{{ $t('EvContextMenu.remove') }}</ev-context-menu-item>
                </ev-context-menu>
            </v-menu>
        </div>

        <div class="ev-960-modal__content">
            <div class="ev-modal-content-navigation" v-if="hasSelectedTemplate">
                <ev-label size="12" primary medium>{{ selectedTemplate.name }}</ev-label>
            </div>

            <div class="ev-modal-content-body" v-if="hasSelectedTemplate">
                <ev-http-client-request :http-operation="selectedHttpOperation"
                                        :configuration="configuration"></ev-http-client-request>

            </div>

            <ev-http-client-request-template-placeholder v-else
                                                         :value="$t('contentViewPlaceholder')"
                                                         :padding-bottom="40"></ev-http-client-request-template-placeholder>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvHttpClientRequest from '@/views/http-client/EvHttpClientRequest.vue'
    import EvRequestTemplateItem from '@/views/titlebar/template-manager/EvRequestTemplateItem.vue'
    import EvHttpClientAddVariableIcon from '@/views/http-client/components/environment/modal/EvHttpClientAddVariableIcon.vue'
    import EvIconWrapper from '@/components/layout/EvIconWrapper.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvHttpClientRequestTemplatePlaceholder from '@/views/titlebar/template-manager/EvHttpClientRequestTemplatePlaceholder.vue'
    import GHCRequestTemplate from '@/data/gotcha/GHCRequestTemplate'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import EvContextMenuMixin from '@/components/menu/EvContextMenuMixin.vue'
    import EvContextMenu from '@/components/menu/EvContextMenu.vue'
    import EvContextMenuItem from '@/components/menu/EvContextMenuItem.vue'
    import EvContextMenuDivider from '@/components/menu/EvContextMenuDivider.vue'
    import draggable from 'vuedraggable'
    import {v4} from 'node-uuid'

    export default {
        name: "EvHttpClientRequestTemplateManager",

        components: {
            EvContextMenuDivider,
            EvContextMenuItem,
            EvContextMenu,
            EvHttpClientRequestTemplatePlaceholder,
            EvVerticalGutter,
            EvIconWrapper,
            EvHttpClientAddVariableIcon,
            EvRequestTemplateItem,
            EvHttpClientRequest,
            EvLabel,
            EvCircleCloseButton,
            draggable,
        },

        mixins: [
            EvStoreMixin,
            EvContextMenuMixin,
        ],

        watch: {
            currentProject(newVal) {
                if (newVal) {
                    this.selectedTemplate = undefined

                    this.focusedTemplate = undefined
                }
            },
        },

        data() {
            return {
                configuration: {
                    template: true,
                    urlEditable: true,
                },

                selectedTemplate: undefined,

                focusedTemplate: undefined,
            }
        },

        computed: {
            templates: {
                set(templates) {
                    this.currentProject.requestTemplates = templates
                },

                get() {
                    return this.currentProject.requestTemplates || []
                },
            },

            hasSelectedTemplate() {
                return this.selectedTemplate !== undefined
            },

            selectedHttpOperation() {
                return this.selectedTemplate.httpOperation
            },
        },

        methods: {
            doClose() {
                this.saveCurrentProject()

                this.$emit('close')
            },

            handleSelectTemplate(template) {
                this.selectedTemplate = template
            },

            handleAddTemplate() {
                let template = new GHCRequestTemplate()

                this.templates.push(template)

                !this.hasSelectedTemplate && (this.selectedTemplate = template)
            },

            handleRenameTemplate() {
                if (!this.focusedTemplate) {
                    return
                }

                this.$refs[this.focusedTemplate.uid][0].rename()
            },

            handleDuplicateTemplate() {
                if (!this.focusedTemplate) {
                    return
                }

                let duplicatedTemplate = _.cloneDeep(this.focusedTemplate)

                duplicatedTemplate.uid = v4()

                let index = this.templates.indexOf(this.focusedTemplate)

                this.templates.splice(index + 1, 0, duplicatedTemplate)
            },

            handleRemoveTemplate(template) {
                console.log("handleRemoveTemplate - before", this.selectedTemplate)

                let removedTemplate = this.focusedTemplate || template

                if (!removedTemplate) {
                    return
                }

                if (removedTemplate === this.selectedTemplate) {
                    this.selectedTemplate = undefined
                }

                this.templates.splice(this.templates.indexOf(removedTemplate), 1)
            },

            handleShowContextMenu(event, template) {
                this.focusedTemplate = template

                this.doShowContextMenu(event)
            },
        },

        i18n: {
            messages: {
                en: {
                    title: "Request Template",

                    treeViewPlaceholder: "No Template, Click '+' to add",

                    contentViewPlaceholder: "Click to Select Template",
                },
                zh: {
                    title: "请求模板",

                    treeViewPlaceholder: "没有请求模板，点击『+』号添加",

                    contentViewPlaceholder: "点击选择请求模板",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-modal-content-navigation {
        display: flex;

        align-items: center;

        height: 40px;

        background-color: #F1F1F1;

        padding-left: 16px;

        padding-right: 16px;

        border-bottom: 1px solid #E0E0E0;
    }

    .ev-modal-content-body {
        display: flex;

        height: 600px;
    }
</style>

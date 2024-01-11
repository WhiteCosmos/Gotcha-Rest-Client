<template>
    <div class="ev-content-wrapper">
        <ev-popup-menu-divider :label="$t('projectInfo')"></ev-popup-menu-divider>

        <div class="ev-property-wrapper">
            <div class="ev-property-wrapper__key">
                <ev-label size="12" bold secondary>{{ $t('projectName') }} :</ev-label>
            </div>

            <div class="ev-property-wrapper__value">
                <ev-basic-input :placeholder="$t('projectInput')"
                                v-model="renamedProjectName"
                                @blur="onRenameProjectBlur"></ev-basic-input>
            </div>
        </div>

        <ev-horizon-gutter :gutter="28"></ev-horizon-gutter>

        <ev-popup-menu-divider :label="$t('projectDescription')"></ev-popup-menu-divider>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <ev-auto-resize-textarea v-model="currentProject.description"></ev-auto-resize-textarea>

        <ev-horizon-gutter :gutter="28"></ev-horizon-gutter>

        <ev-popup-menu-divider :label="$t('projectDelete')"></ev-popup-menu-divider>

        <div class="ev-property-wrapper" style="width: 60%" v-if="!isSystemProject">
            <ev-basic-input :placeholder="$t('projectInput')" v-model="deletedProjectName"></ev-basic-input>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <v-btn x-small color='error' depressed
                   :disabled="!deletable"
                   style="border-radius: 2px; font-weight: bold" bold @click="doDeleteProject">{{ $t('confirmLabel') }}
            </v-btn>
        </div>

        <div class="ev-property-wrapper" v-if="!isSystemProject">
            <ev-label size="12" bold red>{{ $t('deleteWarning') }}</ev-label>
        </div>

        <div class="ev-property-wrapper" v-if="isSystemProject">
            <ev-label size="12" bold secondary red>{{ $t('deleteHint') }}</ev-label>
        </div>
    </div>
</template>

<script>
    import RabiProjectSource from '@/data/gotcha/RabiProjectSource'
    import EvProjectConfigSidebar from '@/modals/project-config/EvProjectConfigSidebar.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter.vue'
    import EvAutoResizeTextarea from '@/components/input/EvAutoResizeTextarea.vue'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider.vue'
    import EvBasicInput from '@/components/input/EvBasicInput.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton.vue'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'

    export default {
        name: "EvProjectConfigInformation",

        components: {
            EvProjectConfigSidebar,
            EvVerticalGutter,
            EvHorizonGutter,
            EvAutoResizeTextarea,
            EvPopupMenuDivider,
            EvBasicInput,
            EvLabel,
            EvCircleCloseButton
        },

        mixins: [
            EvStoreMixin,
        ],

        data() {
            return {
                renamedProjectName: '',

                deletedProjectName: '',
            }
        },

        computed: {
            deletable() {
                return this.deletedProjectName && this.deletedProjectName === this.currentProject.name
            },

            isSystemProject() {
                return this.currentProject && RabiProjectSource.SYSTEM === this.currentProject.source
            },
        },

        methods: {
            onRenameProjectBlur() {
                if (this.renamedProjectName) {
                    this.currentProject.name = this.renamedProjectName

                    this.saveCurrentProject()
                } else {
                    this.renamedProjectName = this.currentProject.name
                }
            },

            doDeleteProject() {
                AppEventBus.$emit(AppEvents.REMOVE_PROJECT)
            },
        },

        i18n: {
            messages: {
                en: {
                    title: "Configuration",

                    projectInfo: "Information",

                    projectDescription: "Description",

                    projectDelete: "Delete Project",

                    projectInput: "Enter project name ...",

                    projectName: "Project Name",

                    deleteWarning: "Once you delete a project, there is no going back. Please be certain.",

                    deleteHint: "Default project cannot be deleted.",

                    inputHint: "",

                    confirmLabel: "Confirm"
                },
                zh: {
                    title: "项目配置",

                    projectInfo: "项目信息",

                    projectDescription: "项目描述",

                    projectDelete: "删除项目",

                    projectInput: "请输入项目名称",

                    projectName: "项目名称",

                    deleteWarning: "项目一旦删除后将无法恢复，请谨慎操作。",

                    deleteHint: "默认项目不能被删除。",

                    inputHint: "",

                    confirmLabel: "确认删除"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-content-wrapper {
        display: flex;

        flex-direction: column;

        flex: 1;

        padding-top: 16px;

        padding-left: 32px;

        padding-right: 32px;

        height: 100%;

        //background-color: #FF8282;
    }
</style>

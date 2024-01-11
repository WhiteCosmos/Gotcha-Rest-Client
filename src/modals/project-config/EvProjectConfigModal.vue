<template>
    <div class="ev-project-config-modal" v-hotkey="hotkey">
        <div class="ev-project-config-modal__header">
            <ev-circle-close-button @click.native="doClose" style="position: absolute; left: 12px"></ev-circle-close-button>

            <ev-label size="12" bold primary>{{ $t('title') }}</ev-label>
        </div>

        <div class="d-flex" style="height: 100%">
            <ev-project-config-sidebar @select="handleSelectMenu"></ev-project-config-sidebar>

            <div class="ev-project-config-modal__content">
                <ev-project-config-information v-if="currentMenu === 'PROJECT_INFO'"></ev-project-config-information>

                <!--                <ev-project-config-ux-settings v-if="currentMenu === 'UX_SETTINGS'"></ev-project-config-ux-settings>-->

                <ev-project-config-global-template v-if="currentMenu === 'GLOBAL_TEMPLATE'"></ev-project-config-global-template>
            </div>
        </div>
    </div>
</template>

<script>
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton.vue'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvStoreMixin from '@/mixins/EvStoreMixin.vue'
    import EvBasicInput from '@/components/input/EvBasicInput.vue'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider.vue'
    import EvAutoResizeTextarea from '@/components/input/EvAutoResizeTextarea.vue'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter.vue'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter.vue'
    import RabiProjectSource from '@/data/gotcha/RabiProjectSource'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import EvProjectConfigSidebar from '@/modals/project-config/EvProjectConfigSidebar.vue'
    import EvProjectConfigInformation from '@/modals/project-config/EvProjectConfigInformation.vue'
    import EvProjectConfigGlobalTemplate from '@/modals/project-config/EvProjectConfigGlobalTemplate.vue'
    import EvProjectConfigUxSettings from '@/modals/project-config/EvProjectConfigUxSettings.vue'

    export default {
        name: "EvProjectConfigModal",

        components: {
            EvProjectConfigUxSettings,
            EvProjectConfigGlobalTemplate,
            EvProjectConfigInformation,
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

        created() {
            this.currentProject && (this.renamedProjectName = this.currentProject.name)
        },

        props: {
            showProjectConfigDialog: Boolean,
        },

        data() {
            return {
                currentMenu: "PROJECT_INFO" // PROJECT_INFO UX_SETTINGS GLOBAL_TEMPLATE
            }
        },

        computed: {
            hotkey() {
                return {
                    'esc': this.doClose,
                }
            },
        },

        watch: {
            showProjectConfigDialog(newVal) {
                if (newVal) {
                    this.renamedProjectName = this.currentProject.name

                    this.deletedProjectName = ''
                }
            },
        },

        methods: {
            doClose() {
                this.$emit('close')
            },

            handleSelectMenu(menu) {
                this.currentMenu = menu
            },
        },

        i18n: {
            messages: {
                en: {
                    title: "Settings",
                },
                zh: {
                    title: "项目配置",
                },
                zh_TW: {
                    title: "專案設定",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    $PADDING: 12px;

    .ev-project-config-modal {
        display: flex;

        flex-direction: column;

        min-height: 1px;

        min-width: 1px;

        height: calc(100vh - 240px);

        width: 960px;

        background-color: #FAFAFA;

        &__header {
            position: relative;

            display: flex;

            align-items: center;

            justify-content: center;

            height: 40px;

            padding-left: $PADDING;

            padding-right: 16px;

            border-bottom: 1px solid #EAEAEA;

            background-color: #F1F1F1;
        }

        &__content {
            position: relative;

            display: flex;

            flex-direction: column;

            min-height: 1px;

            min-width: 1px;

            flex: 1;

            //padding: $PADDING;

            background-color: #FCFCFC;

            //overflow-y: scroll;
        }
    }

    .ev-property-wrapper {
        display: flex;

        align-items: center;

        height: 28px;

        width: 100%;

        &__key {
            display: flex;

            width: 160px;

            padding-left: 8px;
        }

        &__value {
            display: flex;

            flex: 1;

            padding-right: 8px;
        }
    }
</style>

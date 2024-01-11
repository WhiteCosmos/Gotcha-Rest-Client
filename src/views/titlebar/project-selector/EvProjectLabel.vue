<template>
    <div class="ev-project-label">
        <div class="d-flex align-center" v-on="events" style="flex: 1">
            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-label size="11" bold secondary>{{ name }}</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-lock-icon v-if="isSystemProject"></ev-lock-icon>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-project-tag v-if="!isSystemProject && !isCustomProject">{{ type }}</ev-project-tag>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <v-spacer></v-spacer>

            <!--            <ev-project-options v-if="true"></ev-project-options>-->

            <div class="ev-icon-wrapper" @click.p.prevent.stop="doShowProjectConfigDialog">
                <ev-edit-icon></ev-edit-icon>
            </div>

            <EvVerticalGutter :gutter="4"></EvVerticalGutter>

            <select-icon></select-icon>
        </div>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <!--        <ev-project-type-selector></ev-project-type-selector>-->

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <v-dialog v-bind="project_config_dialog" v-model="showProjectConfigDialog">
            <ev-project-config-modal :show-project-config-dialog="showProjectConfigDialog"
                                     @close="doHideProjectConfigDialog"></ev-project-config-modal>
        </v-dialog>
    </div>
</template>

<script>
    import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
    import EvPlusButton from "@/components/button/EvPlusButton"
    import SelectIcon from '@/components/icon/select-icon'
    import ProjectIcon from '@/components/icon/project-icon'
    import EvDotButton from '@/components/button/EvDotButton'
    import EvSubscriptionMixin from '@/mixins/EvSubscriptionMixin'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import EvSquareTag from '@/components/tag/EvSquareTag'
    import EvRoundTag from '@/components/tag/EvRoundTag'
    import EvProjectTypeSelector from '@/views/titlebar/project-selector/EvProjectTypeSelector'
    import EvProjectDeleteButton from '@/views/titlebar/project-selector/EvProjectDeleteButton'
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvProjectOptions from '@/views/titlebar/project-selector/EvProjectOptions'
    import EvProjectTag from '@/views/titlebar/project-selector/EvProjectTag'
    import RabiProjectSource from '@/data/gotcha/RabiProjectSource'
    import EvLabel from '@/components/typography/EvLabel'
    import EvLockIcon from '@/assets/icon/ev-lock-icon'
    import EvEditIcon from '@/components/icon/ev-edit-icon.vue'
    import EvProjectConfigModal from '@/modals/project-config/EvProjectConfigModal.vue'

    export default {
        name: "EvProjectLabel",

        components: {
            EvProjectConfigModal,
            EvEditIcon,
            EvLockIcon,
            EvLabel,
            EvProjectTag,
            EvProjectOptions,
            EvPopupMenu,
            EvProjectDeleteButton,
            EvProjectTypeSelector,
            EvRoundTag,
            EvSquareTag,
            EvDotButton,
            ProjectIcon,
            SelectIcon,
            EvPlusButton,
            EvVerticalGutter
        },

        mixins: [
            EvDialogMixin,
            EvSubscriptionMixin,
            EvStoreMixin,
        ],

        props: {
            events: Object,

            project: Object,
        },

        mounted() {
            // 注册添加项目事件
            // require('electron').ipcRenderer.on('add-new-project', (event, message) => {
            //     this.addNewProject()
            // })
        },

        computed: {
            name() {
                return this.project ? this.project.name : ""
            },

            type() {
                return this.project ? this.project.type : ""
            },

            canDeleteProject() {
                // let project = this.currentProject
                //
                // return project && (project.id !== 1)
            },

            isSystemProject() {
                return this.project && RabiProjectSource.SYSTEM === this.project.source
            },

            isCustomProject() {
                return this.project && RabiProjectSource.CUSTOM === this.project.source
            },
        },

        data() {
            return {
                showProjectLabelMenu: false,

                showProjectConfigDialog: false
            }
        },

        methods: {
            deleteCurrentProject() {
                this.showProjectLabelMenu = false
            },

            doShowProjectConfigDialog() {
                this.showProjectConfigDialog = true
            },

            doHideProjectConfigDialog() {
                this.showProjectConfigDialog = false
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "project-selector";

    .ev-project-label {
        display: flex;

        align-items: center;

        width: 320px;

        min-width: 160px;

        height: 28px;
    }

    .label-menu {
        padding: 0px 16px;

        user-select: none;

        background-color: white;
    }

    .label-menu__font {
        font-size: 11px;

        font-weight: bold;

        color: #ff8080;

        &:hover {
            color: #ff5050;
        }
    }

    .label-button {
        transition: .1s;

        &:hover {
            transform: scale(1.06);
        }
    }

    .ev-icon-wrapper {
        @include full-center;

        width: 20px;

        height: 20px;

        border-radius: 2px;

        &:hover {
            background-color: #F1F1F1;
        }
    }
</style>

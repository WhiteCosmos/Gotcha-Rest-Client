<template>
    <div class="app-navigation">
        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-repository-selector></ev-repository-selector>

        <ev-vertical-gutter :gutter="24"></ev-vertical-gutter>

        <ev-project-navigator></ev-project-navigator>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <v-spacer></v-spacer>

        <ev-app-manager-panel></ev-app-manager-panel>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-app-pro-manager-panel></ev-app-pro-manager-panel>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-tool-button @click.native="emitToggleAppSidebar">
            <ev-sidebar-icon></ev-sidebar-icon>
        </ev-tool-button>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <!-- Export Modal -->

        <v-dialog v-bind="export_dialog_config" v-model="showExportDialog">
            <ev-project-export-modal_
                v-hotkey="hotkey"
                @close="closeAllDialogs"></ev-project-export-modal_>
        </v-dialog>
    </div>
</template>

<script>
import EvVerticalGutter from "@/components/layout/EvVerticalGutter"
import EvRepositorySelector from "@/views/titlebar/repository-selector/EvRepositorySelector"
import EvProjectSelector from "@/views/titlebar/project-selector/EvProjectSelector"
import EvToolButton from '@/components/button/EvToolButton'
import ReloadIcon from '@/components/icon/reload-icon'
import QuestionIcon from '@/assets/icon/question-icon'
import EvSubscriptionMixin from '@/mixins/EvSubscriptionMixin'
import ExportIcon from '@/components/icon/export-icon'
import EvStoreMixin from '@/mixins/EvStoreMixin'
import EvDialogMixin from '@/mixins/EvDialogMixin'
import EvSquareTag from '@/components/tag/EvSquareTag'
import EvExportProjectModal from '@/modals/export-project/EvExportProjectModal'
import RefreshIcon from '@/assets/icon/refresh-icon'
import EvProjectNavigator from '@/views/titlebar/EvProjectNavigator'
import EvProjectExportButton from '@/views/titlebar/project-exporter/EvProjectExportButton'
import EvProjectExportModal_ from '@/views/titlebar/project-exporter/EvProjectExportModal_'
import EvSidebarIcon from '@/assets/icon/ev-sidebar-icon'
import {AppEventBus, AppEvents} from '@/AppEventBus'
import EvLabel from '@/components/typography/EvLabel'
import EvVerticalDivider from '@/components/layout/EvVerticalDivider'
import EvEnvironmentIcon from '@/views/http-client/icon/ev-environment-icon'
import EvCookieIcon from '@/views/http-client/icon/ev-cookie-icon'
import EvJarIcon from '@/views/http-client/icon/ev-jar-icon'
import EvEnvironmentVariableIcon from '@/views/http-client/icon/ev-environment-variable-icon'
import EvAppManagerPanel from '@/views/titlebar/EvAppManagerPanel'
import EvTemplateManageButton from '@/views/titlebar/template-manager/EvTemplateManageButton.vue'
import EvAppProManagerPanel from '@/views/titlebar/EvAppProManagerPanel.vue'
import EvQuestionIcon from '@/assets/icon/ev-question-icon.vue'
import EvAppHelpButton from '@/views/titlebar/app-help/EvAppHelpButton.vue'

export default {
    name: "EvAppNavigation",

    components: {
        EvAppHelpButton,
        EvQuestionIcon,
        EvAppProManagerPanel,
        EvTemplateManageButton,
        EvAppManagerPanel,
        EvEnvironmentVariableIcon,
        EvJarIcon,
        EvCookieIcon,
        EvEnvironmentIcon,
        EvVerticalDivider,
        EvLabel,
        EvSidebarIcon,
        EvProjectExportModal_,
        EvProjectExportButton,
        EvProjectNavigator,
        RefreshIcon,
        EvExportProjectModal,
        EvSquareTag,
        ExportIcon,
        QuestionIcon,
        ReloadIcon,
        EvToolButton,
        EvProjectSelector,
        EvRepositorySelector,
        EvVerticalGutter
    },

    mixins: [
        EvDialogMixin,
        EvSubscriptionMixin,
        EvStoreMixin,
    ],

    computed: {
        hotkey() {
            return {
                'esc': this.closeExportDialog
            }
        },
    },

    data() {
        return {
            showProjectDialog: false,

            showSchemaDialog: false,

            showTemplateDialog: false,

            showExportDialog: false,

            targetProjectPath: "",

            targetProjectBookmark: "",

            targetBranchName: "",
        }
    },

    methods: {
        emitToggleAppSidebar() {
            AppEventBus.$emit(AppEvents.TOGGLE_APP_SIDEBAR)
        },

        openSchemaDialog() {

        },

        openTemplateDialog() {

        },

        openExportDialog() {
            this.showExportDialog = true
        },

        closeExportDialog() {
            this.showExportDialog = false
        },

        closeAllDialogs() {
            this.showSchemaDialog = false

            this.showTemplateDialog = false

            this.showExportDialog = false
        },
    },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/rabiapi.scss";

.app-navigation {
    display: flex;

    align-items: center;

    height: $APP_NAVIGATION_HEIGHT;

    width: 100vw;

    background-color: $MODAL_TITLE_COLOR;

    border-bottom: 1px solid #e0e0e0;

    -webkit-app-region: drag;
}

.export-button {
    padding-left: 8px;

    padding-right: 8px;

    &__font {
        font-size: 12px;

        font-weight: bold;

        color: $PRIMARY_COLOR;
    }
}

.ev-button-wrapper {
    display: flex;

    align-items: center;

    width: fit-content;

    height: 28px;

    padding-left: 8px;

    padding-right: 8px;

    user-select: none;

    @include component-shadow;

    @include white-background-gradient;

    border-radius: 5px;

    //padding-top: 1px;
}
</style>

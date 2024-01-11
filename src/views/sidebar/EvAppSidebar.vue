<template>
    <div class="ev-app-sidebar">
        <div class="tool-container" v-if="isMultipleModule">
            <ev-module-selector :modules="modules" :selectedModule="selectedModule"></ev-module-selector>
        </div>

        <div class="tool-container">
            <ev-tree-view-group-selector :groups="groups" :selected-group="selectedGroup"></ev-tree-view-group-selector>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <EvToolButton @click.native="expandAllServices">
                <ev-expand-icon></ev-expand-icon>
            </EvToolButton>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <EvToolButton @click.native="collapseAllServices">
                <shrink-icon></shrink-icon>
            </EvToolButton>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <EvToolButton @click.native="goToCurrentMethod">
                <target-icon></target-icon>
            </EvToolButton>
        </div>

        <div class="tool-container">
            <JavaServiceFilter v-model="filterKeyword" ref="JavaServiceFilter"></JavaServiceFilter>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-app-sidebar-create-button @new-request="doAddHttpRequest"
                                          @new-group="doAddRequestGroup"
                                          @import-from-file="doImportFromFile"
                                          @import-from-url="doImportFromUrl"
                                          @import-from-text="doImportFromText"></ev-app-sidebar-create-button>
        </div>

        <div ref='ev-tree-view-container' class="tree-view-container" :class="treeViewContainerStyle">
            <ev-api-tree-view v-if="isApiView"
                              ref="ev-api-tree-view"
                              :key="selectedGroup.id"
                              :module="selectedModule"
                              @scroll-to="handleScrollTo"
                              @open-import-from-file-dialog="doImportFromFile"></ev-api-tree-view>

            <ev-json-tree-view v-if="isServiceView"
                               :key="selectedGroup.id"
                               :json-services="jsonServices"
                               :selected-group="selectedGroup"></ev-json-tree-view>

            <ev-model-list-view v-if="isModelView"
                                :key="selectedGroup.id"
                                :json-structs="jsonStructs"
                                :selected-group="selectedGroup"></ev-model-list-view>
        </div>

        <v-dialog v-model="showImportFromFileModal" v-bind="importDialogConfig">
            <ev-app-file-importer @close="showImportFromFileModal = false"></ev-app-file-importer>
        </v-dialog>
    </div>
</template>

<script>
    import EvHorizonDivider from "@/components/layout/EvHorizonDivider"
    import EvModuleSelector from "@/views/sidebar/module-selector/EvModuleSelector"
    import EvHorizonGutter from "@/components/layout/EvHorizonGutter"
    import JavaServiceFilter from '@/components/java-tree/JavaServiceFilter'
    import EvTabSelector from '@/views/sidebar/sidebar-selector/EvTabSelector'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvTabButton from '@/views/sidebar/sidebar-selector/EvTabButton'
    import ShrinkIcon from '@/assets/icon/shrink-icon'
    import TargetIcon from '@/assets/icon/target-icon'
    import EvToolButton from '@/components/button/EvToolButton'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import ExportIcon from '@/components/icon/export-icon'
    import EvJsonTreeView from '@/components/java-tree/EvJsonTreeView'
    import {EvJsonTreeViewEventBus, EvJsonTreeViewEvents} from '@/components/java-tree/EvJsonTreeViewEventBus'
    import EvModelListView from '@/components/model-tree/EvModelListView'
    import EvTreeViewSelectorMixin from '@/views/sidebar/tree-view-selector/EvTreeViewSelectorMixin'
    import EvExpandIcon from '@/assets/icon/EvExpandIcon'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import RabiModuleDao from '@/core/dao/RabiModuleDao'
    import EvAppCacheMixin from '@/mixins/EvAppCacheMixin'
    import EvTreeViewGroupSelector from '@/views/sidebar/group-selector/EvTreeViewGroupSelector'
    import RabiTreeViewGroupDao from '@/core/dao/RabiTreeViewGroupDao'
    import {EvTreeViewGroupSelectorEventBus, EvTreeViewGroupSelectorEvents} from '@/views/sidebar/group-selector/EvTreeViewGroupSelectorEventBus'
    import RabiTreeViewGroupType from '@/views/sidebar/group-selector/RabiTreeViewGroupType'
    import EvApiTreeView from '@/components/api-tree/EvApiTreeView'
    import {EvAppSidebarEventBus, EvAppSidebarEvents} from '@/views/sidebar/EvAppSidebarEventBus'
    import EvPlusIcon from '@/components/icon/ev-plus-icon'
    import EvAppSidebarCreateButton from '@/views/sidebar/EvAppSidebarCreateButton'
    import _ from 'lodash'
    import ProjectImporterPayload from '@/views/titlebar/project-importer/ProjectImporterPayload'
    import ProjectImporterPayloadOperation from '@/views/titlebar/project-importer/ProjectImporterPayloadOperation'
    import ProjectImporterPayloadSource from '@/views/titlebar/project-importer/ProjectImporterPayloadSource'
    import EvAppFileImporter from '@/views/sidebar/importer-modal/EvAppFileImporterModal'
    import fs from 'fs'
    import GHCPostmanCollectionV2Parser from '@/core/postman/GHCPostmanCollectionV2Parser'

    export default {
        name: "EvAppSidebar",

        components: {
            EvAppFileImporter,
            EvAppSidebarCreateButton,
            EvPlusIcon,
            EvApiTreeView,
            EvTreeViewGroupSelector,
            EvExpandIcon,
            EvModelListView,
            EvJsonTreeView,
            ExportIcon,
            EvToolButton,
            TargetIcon,
            ShrinkIcon,
            EvTabButton,
            EvVerticalGutter,
            EvTabSelector,
            JavaServiceFilter,
            EvHorizonGutter,
            EvModuleSelector,
            EvHorizonDivider
        },

        mixins: [
            EvStoreMixin,
            EvTreeViewSelectorMixin,
            EvAppCacheMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.SELECT_VERSION, (version) => {
                this.handleSelectVersion(version)
            })

            AppEventBus.$on(AppEvents.SELECT_MODULE, (module) => {
                this.handleSelectModule(module)
            })

            EvTreeViewGroupSelectorEventBus.$on(EvTreeViewGroupSelectorEvents.SELECT_TREE_VIEW_GROUP, (group) => {
                this.handleSelectTreeViewGroup(group)
            })
        },

        mounted() {

        },

        data() {
            return {
                filterKeyword: "",

                selectedVersion: undefined,

                modules: [],

                selectedModule: undefined,

                groups: [],

                selectedGroup: undefined,

                loading: false,

                showImportFromFileModal: false,

                showImportFromUrlModal: false,

                showImportFromTextModal: false,
            }
        },

        watch: {
            filterKeyword(newVal) {
                this.$refs['ev-api-tree-view'].doSearch(newVal)
            }
        },

        methods: {
            async handleSelectVersion(version) {
                this.modules = await new RabiModuleDao().batchQuery({versionId: version.id})

                this.selectedVersion = version

                this.selectedModule = this.getLastSelectedModule(this.modules)

                this.groups = await new RabiTreeViewGroupDao().batchQuery({moduleId: this.selectedModule.id})

                this.selectedGroup = this.getLastSelectedGroup(this.groups)

                AppEventBus.$emit(AppEvents.SELECT_TREE_VIEW_GROUP, this.selectedGroup)
            },

            async handleSelectModule(module) {
                this.selectedModule = module

                this.updateLastSelectedModule(module)

                this.groups = await new RabiTreeViewGroupDao().batchQuery({moduleId: module.id})

                this.selectedGroup = this.getLastSelectedGroup(this.groups)

                AppEventBus.$emit(AppEvents.SELECT_TREE_VIEW_GROUP, this.selectedGroup)
            },

            async handleSelectTreeViewGroup(group) {
                this.selectedGroup = group

                this.updateLastSelectedGroup(group)

                AppEventBus.$emit(AppEvents.SELECT_TREE_VIEW_GROUP, this.selectedGroup)
            },

            collapseAllServices() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.COLLAPSE_ALL)

                EvAppSidebarEventBus.$emit(EvAppSidebarEvents.COLLAPSE_ALL)
            },

            expandAllServices() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.EXPAND_ALL)

                EvAppSidebarEventBus.$emit(EvAppSidebarEvents.EXPAND_ALL)
            },

            goToCurrentMethod() {
                EvJsonTreeViewEventBus.$emit(EvJsonTreeViewEvents.AIM)

                EvAppSidebarEventBus.$emit(EvAppSidebarEvents.AIM_TO_TARGET)
            },

            handleScrollTo(position) {
                let container = this.$refs['ev-tree-view-container']

                this.$vuetify.goTo(position, {
                    container: container,
                    duration: 0,
                    offset: 128,
                    easing: 'linear'
                })
            },

            doAddHttpRequest() {
                let treeView = this.$refs['ev-api-tree-view']

                treeView.doAddHttpRequest()
            },

            doAddRequestGroup() {
                let treeView = this.$refs['ev-api-tree-view']

                treeView.doAddGroup()
            },

            doImportFromFile() {
                this.showImportFromFileModal = true
            },

            doImportFromUrl() {
                this.showImportFromUrlModal = true
            },

            doImportFromText() {
                this.showImportFromTextModal = true
            },
        },

        computed: {
            isSwaggerProject() {
                return this.currentProject &&
                    (this.currentProject.projectType === "SWAGGER" || this.currentProject.projectType === "OPENAPI")
            },

            treeViewContainerStyle() {
                if (this.isSwaggerProject) {
                    return ['tree-view-container__without-module-selector']
                } else {
                    return ['tree-view-container__with-module-selector']
                }
            },

            isMultipleModule() {
                return this.modules && this.modules.length > 1
            },

            isApiView() {
                return this.selectedGroup
                    && (this.selectedGroup.group === RabiTreeViewGroupType.API_GROUP)
            },

            isServiceView() {
                return this.selectedGroup
                    && (this.selectedGroup.group === RabiTreeViewGroupType.HTTP_SERVICE_GROUP
                        || this.selectedGroup.group === RabiTreeViewGroupType.JAVA_SERVICE_GROUP)
            },

            isModelView() {
                return this.selectedGroup
                    && (this.selectedGroup.group === RabiTreeViewGroupType.HTTP_MODEL_GROUP
                        || this.selectedGroup.group === RabiTreeViewGroupType.JAVA_MODEL_GROUP)
            },

            jsonServices() {
                if (this.selectedGroup.group === RabiTreeViewGroupType.HTTP_SERVICE_GROUP) {
                    return this.selectedModule.restfulApis
                }

                if (this.selectedGroup.group === RabiTreeViewGroupType.JAVA_SERVICE_GROUP) {
                    return this.selectedModule.javaServices
                }
            },

            jsonStructs() {
                if (this.selectedGroup.group === RabiTreeViewGroupType.HTTP_MODEL_GROUP) {
                    return this.selectedModule.restfulModels
                }

                if (this.selectedGroup.group === RabiTreeViewGroupType.JAVA_MODEL_GROUP) {
                    return this.selectedModule.javaModels
                }
            },

            importDialogConfig() {
                return {
                    'width': 480,

                    'overlay-opacity': 0.6,

                    'overlay-color': '#FAFAFA',

                    'transition': "fade-transition",

                    'scrollable': false,

                    'no-click-animation': true,

                    'persistent': true,
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-app-sidebar {
        width: 288px;

        height: calc(100vh - 40px);

        background: $BACKGROUND_COLOR;

        border-right: 1px solid #EAEAEA;
    }

    .tool-container {
        width: 100%;

        height: 40px;

        background-color: $SECONDARY_BACKGROUND_COLOR;

        border-bottom: 1px solid $SECONDARY_BORDER_COLOR;

        padding-left: 8px;

        padding-right: 8px;

        display: flex;

        align-items: center;
    }

    .tab-title {
        font-size: 12px;

        font-weight: bold;
    }

    .tree-view-container {
        display: flex;

        overflow-y: scroll;

        &__with-module-selector {
            height: calc(100vh - 128px);
        }

        &__without-module-selector {
            height: calc(100vh - 168px);
        }
    }
</style>

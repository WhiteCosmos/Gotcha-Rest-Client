<template>
    <v-menu v-bind="menu_config" v-model="showVersionSelector" :disabled='isSingleVersion'>
        <template v-slot:activator="{ on }">
            <ev-version-label :version="selectedVersion"
                              :versions="versions"
                              :active="showVersionSelector"
                              :events="on"></ev-version-label>
        </template>

        <ev-version-menu :versions="versions"
                         :selected-version="selectedVersion"
                         @select-version="handleSelectVersion"
                         :active="showVersionSelector"></ev-version-menu>
    </v-menu>
</template>

<script>
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import RabiVersionDao from '@/core/dao/RabiVersionDao'
    import AppDao from '@/AppDao'
    import EvAppCacheMixin from '@/mixins/EvAppCacheMixin'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvVersionLabel from '@/views/titlebar/version-selector/EvVersionLabel'
    import EvVersionMenu from '@/views/titlebar/version-selector/EvVersionMenu'

    export default {
        name: "EvVersionSelector",

        components: {
            EvVersionMenu,
            EvVersionLabel
        },

        mixins: [
            EvDialogMixin,
            EvAppCacheMixin,
            EvStoreMixin,
        ],

        created() {
            AppEventBus.$on(AppEvents.SELECT_PROJECT, (project) => {
                this.handleSelectProject(project)
            })

            AppEventBus.$on(AppEvents.REMOVE_VERSION_FINISHED, () => {
                this.handleRemoveVersionFinished()
            })
        },

        data() {
            return {
                showVersionSelector: false,

                versions: [],

                selectedProject: undefined,

                selectedVersion: undefined,
            }
        },

        computed: {
            isSingleVersion() {
                return this.versions && this.versions.length === 1
            },
        },

        methods: {
            async handleSelectProject(project) {
                this.selectedProject = project

                this.versions = await new RabiVersionDao().batchQuery({projectId: this.selectedProject.id})

                this.selectedVersion = this.getLastSelectedVersion(this.versions)

                AppEventBus.$emit(AppEvents.SELECT_VERSION, this.selectedVersion)
            },

            async handleSelectVersion(version) {
                this.showVersionSelector = false

                this.selectedVersion = version

                this.updateLastSelectedVersion(this.selectedVersion)

                AppEventBus.$emit(AppEvents.SELECT_VERSION, this.selectedVersion)
            },

            async handleRemoveVersionFinished() {
                this.versions = await new RabiVersionDao().batchQuery({projectId: this.selectedProject.id})

                this.selectedVersion = this.versions[this.versions.length - 1]

                this.updateLastSelectedVersion(this.selectedVersion)

                AppEventBus.$emit(AppEvents.SELECT_VERSION, this.selectedVersion)
            },

            cancel() {
                this.showVersionSelector = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";
</style>

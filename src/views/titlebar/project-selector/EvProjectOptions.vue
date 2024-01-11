<template>
    <ev-popup-menu :config="projectOptionsConfig">
        <template v-slot:icon>
            <ev-dot-button></ev-dot-button>
        </template>

        <template v-slot:items>
            <div class="project-options">
                <span class="project-options__title">{{ $t("EvProjectOptions.location") }} :</span>

                <span class="project-options__description">{{ location }}</span>
            </div>

            <div class="project-options">
                <span class="project-options__title">{{ $t("EvProjectOptions.createdAt") }} :</span>

                <span class="project-options__description">{{ createdAt }}</span>
            </div>

            <div class="project-options">
                <span class="project-options__title">{{ $t("EvProjectOptions.updatedAt") }} :</span>

                <span class="project-options__description">{{ updatedAt }}</span>
            </div>

            <ev-popup-menu-divider></ev-popup-menu-divider>

            <ev-popup-menu-icon-item @click.native="doRefreshProject" v-if="!isCustomProject">
                <template v-slot:icon>
                    <v-icon size="11" color="#AABBCC">fa-sync-alt</v-icon>
                </template>

                <template v-slot:label>{{ $t("EvProjectOptions.refreshProject") }}</template>
            </ev-popup-menu-icon-item>

            <ev-popup-menu-icon-item warn @click.native="doRemoveProject">
                <template v-slot:icon>
                    <v-icon size="11" color="#FF8282">fa-trash-alt</v-icon>
                </template>

                <template v-slot:label>{{ $t("EvProjectOptions.removeProject") }}</template>
            </ev-popup-menu-icon-item>
        </template>
    </ev-popup-menu>
</template>

<script>
    import EvPopupMenu from '@/components/menu/EvPopupMenu'
    import EvPopupMenuItem from '@/components/menu/EvPopupMenuItem'
    import EvPopupMenuDivider from '@/components/menu/EvPopupMenuDivider'
    import EvDotButton from '@/components/button/EvDotButton'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import moment from 'moment'
    import {AppEventBus, AppEvents} from '@/AppEventBus'
    import ProjectImporterPayload from '@/views/titlebar/project-importer/ProjectImporterPayload'
    import EvNotificationMixin from '@/mixins/EvNotificationMixin'

    import _ from 'lodash'
    import ProjectImporterPayloadOperation from '@/views/titlebar/project-importer/ProjectImporterPayloadOperation'
    import ProjectImporterPayloadSource from '@/views/titlebar/project-importer/ProjectImporterPayloadSource'
    import EvPopupMenuIconItem from '@/components/menu/EvPopupMenuIconItem'
    import RabiProjectSource from '@/data/gotcha/RabiProjectSource'

    export default {
        name: "EvProjectOptions",

        mixins: [
            EvStoreMixin,
            EvNotificationMixin,
        ],

        components: {
            EvPopupMenuIconItem,
            EvDotButton,
            EvPopupMenuDivider,
            EvPopupMenuItem,
            EvPopupMenu
        },

        data() {
            return {
                projectOptionsConfig: {
                    'offset-y': true,

                    'close-on-content-click': false,

                    'allow-overflow': true,

                    'content-class': "popup-menu",

                    'nudge-left': 75,

                    'nudge-bottom': 5,
                }
            }
        },

        computed: {
            location() {
                if (this.isCustomProject) {
                    return 'IndexedDB'
                }

                if (!this.currentProject) {
                    return ""
                }

                if (this.currentProject.path) {
                    return this.currentProject.path
                }

                if (this.currentProject.url) {
                    return this.currentProject.url
                }
            },

            createdAt() {
                if (!this.currentProject) {
                    return ""
                }

                return moment(this.currentProject.createdAt).format("YYYY / MM / DD HH:mm")
            },

            updatedAt() {
                if (!this.currentProject) {
                    return ""
                }

                return moment(this.currentProject.updatedAt).format("YYYY / MM / DD HH:mm")
            },

            isCustomProject() {
                return this.currentProject && this.currentProject.source === RabiProjectSource.CUSTOM
            },
        },

        methods: {
            doRefreshProject() {
                let project = this.currentProject

                let payload = new ProjectImporterPayload()

                if (project.source === ProjectImporterPayloadSource.FILE) {
                    payload.source = ProjectImporterPayloadSource.FILE

                    payload.path = project.path

                    payload.bookmark = project.bookmark
                }

                if (project.source === ProjectImporterPayloadSource.URL) {
                    payload.source = ProjectImporterPayloadSource.URL

                    payload.url = project.url

                    payload.sha = project.sha
                }

                if (project.source === ProjectImporterPayloadSource.JAVA) {
                    payload.source = ProjectImporterPayloadSource.JAVA

                    payload.path = project.path

                    payload.bookmark = project.bookmark
                }

                payload.operation = ProjectImporterPayloadOperation.REFRESH

                AppEventBus.$emit(AppEvents.IMPORT_PROJECT, payload)
            },

            doRemoveProject() {
                AppEventBus.$emit(AppEvents.REMOVE_PROJECT)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-options {
        display: flex;

        flex-direction: column;

        width: 160px;

        padding-left: 8px;

        padding-right: 8px;

        user-select: none;

        margin-bottom: 8px;

        &__title {
            font-size: 10px;

            font-weight: bolder;

            line-height: 24px;

            color: $PRIMARY_FONT_COLOR;
        }

        &__description {
            font-size: 10px;

            line-height: 16px;

            color: $SECONDARY_FONT_COLOR;

            word-break: break-word;

            user-select: text;
        }
    }
</style>

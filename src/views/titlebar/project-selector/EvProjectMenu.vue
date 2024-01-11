<template>
    <div class="project-selector-menu d-flex flex-column">
        <div class="filter-container">
            <EvFilter ref="projectFilter" v-model="filterKeyword"></EvFilter>
        </div>

        <div class="d-flex flex-column project-list">
            <div class="ev-subtitle-wrapper">
                <ev-label size="12" bold secondary>{{ $t('projects') }}</ev-label>

                <v-spacer></v-spacer>

                <ev-json-add-button @click.native="doAddProject"></ev-json-add-button>
            </div>

            <div class="ev-menu__list">
                <ev-project-menu-item v-if="project.name.includes(filterKeyword)"
                                      :project="project" v-for="project in projects"
                                      @click.native="doSelectProject(project)"></ev-project-menu-item>
            </div>
        </div>
    </div>
</template>

<script>
    import EvProjectMenuItem from "@/views/titlebar/project-selector/EvProjectMenuItem"
    import EvHorizonGutter from "@/components/layout/EvHorizonGutter"
    import EvSubtitle2 from "@/components/typography/EvSubtitle-2"
    import EvFilter from "@/components/input/EvFilter"
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvLabel from '@/components/typography/EvLabel.vue'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton.vue'
    import AppDao from '@/AppDao'
    import {AppEventBus, AppEvents} from '@/AppEventBus'

    export default {
        name: "EvProjectMenu",

        components: {
            EvJsonAddButton,
            EvLabel,
            EvFilter,
            EvSubtitle2,
            EvHorizonGutter,
            EvProjectMenuItem
        },

        mixins: [
            EvStoreMixin
        ],

        mounted() {
            let projectFilter = this.$refs['projectFilter']

            projectFilter && projectFilter.clear()
        },

        props: {
            active: {
                type: Boolean,
                default: false,
            },

            projects: Array
        },

        data() {
            return {
                filterKeyword: ""
            }
        },

        methods: {
            doSelectProject(project) {
                this.$emit('select-project', project)
            },

            doAddProject() {
                let projectName = (this.$i18n.locale === 'en') ? 'New Project' : '新建项目'

                new AppDao().createProject(projectName).then(({project, version}) => {
                    // 什么都不做
                    AppEventBus.$emit(AppEvents.IMPORT_PROJECT_FINISHED, project, version)
                })
            },
        },

        watch: {
            active(newVal) {
                if (newVal) {
                    let projectFilter = this.$refs['projectFilter']

                    projectFilter && projectFilter.clear()
                }
            },


        },

        i18n: {
            messages: {
                en: {
                    projects: "Projects"
                },
                zh: {
                    projects: "项目列表"
                },
                zh_TW: {
                    projects: "專案列表"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "project-selector";

    .ev-menu__title {

    }

    .ev-menu__list {
        display: flex;

        flex-direction: column;

        max-height: 320px;

        overflow-y: overlay;
    }

    .ev-subtitle-wrapper {
        display: flex;

        align-items: center;

        width: 100%;

        height: 32px;

        border-bottom: 1px solid #E0E0E0;

        user-select: none;

        padding-left: 16px;

        padding-right: 16px;
    }
</style>

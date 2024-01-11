<template>
    <div class="project-importer-type-selector">
        <div class="project-importer-type-selector__items">
            <div class="project-importer-type-selector__items__item"
                 :class="isProjectTypeEmpty ? 'project-importer-type-selector__items__item--selected' : '' "
                 @click="doSelectProjectType('PROJECT_TYPE_EMPTY')">
                            <span class="project-importer-type-selector__items__item__label"
                                  :class="isProjectTypeEmpty ? 'project-importer-type-selector__items__item__label--selected' : '' ">Project</span>
            </div>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <div class="project-importer-type-selector__items__item"
                 :class="isProjectTypeFile ? 'project-importer-type-selector__items__item--selected' : '' "
                 @click="doSelectProjectType('PROJECT_TYPE_FILE')">
                <span class="project-importer-type-selector__items__item__label"
                      :class="isProjectTypeFile ? 'project-importer-type-selector__items__item__label--selected' : '' ">File</span>
            </div>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <div class="project-importer-type-selector__items__item"
                 :class="isProjectTypeLink ? 'project-importer-type-selector__items__item--selected' : '' "
                 @click="doSelectProjectType('PROJECT_TYPE_LINK')">
                <span class="project-importer-type-selector__items__item__label"
                      :class="isProjectTypeLink ? 'project-importer-type-selector__items__item__label--selected' : '' ">Link</span>
            </div>

            <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

            <div class="project-importer-type-selector__items__item"
                 :class="isProjectTypeJava ? 'project-importer-type-selector__items__item--selected' : '' "
                 @click="doSelectProjectType('PROJECT_TYPE_FOLDER')">
                <span class="project-importer-type-selector__items__item__label"
                      :class="isProjectTypeJava ? 'project-importer-type-selector__items__item__label--selected' : '' ">Java</span>
            </div>
        </div>

        <v-spacer></v-spacer>

        <!--        <span class="create-new-project">+ New Project</span>-->

        <!--        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'

    export default {
        name: "EvProjectImporterTypeSelector",

        components: {
            EvVerticalGutter
        },

        data() {
            return {
                projectType: "PROJECT_TYPE_EMPTY",
            }
        },

        computed: {
            isProjectTypeGotcha() {
                return this.projectType === "PROJECT_TYPE_GOTCHA"
            },

            isProjectTypeEmpty() {
                return this.projectType === "PROJECT_TYPE_EMPTY"
            },

            isProjectTypeFile() {
                return this.projectType === "PROJECT_TYPE_FILE"
            },

            isProjectTypeLink() {
                return this.projectType === "PROJECT_TYPE_LINK"
            },

            isProjectTypeJava() {
                return this.projectType === "PROJECT_TYPE_FOLDER"
            }
        },

        methods: {
            doSelectProjectType(projectType) {
                this.projectType = projectType

                this.$emit('select-project-type', projectType)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .project-importer-type-selector {
        height: 28px;

        border-radius: 3px;

        background-color: #F1F1F1;

        display: flex;

        align-items: center;

        user-select: none;

        &__items {
            display: flex;

            align-items: center;

            padding-left: 8px;

            //height: 24px;

            &__item {
                display: flex;

                justify-content: center;

                align-items: center;

                width: fit-content;

                padding-left: 8px;

                padding-right: 8px;

                height: 20px;

                transition: 100ms;

                //border-bottom: 2px solid transparent;

                &--selected {
                    //background-color: #007AFF;

                    //border-bottom: 2px solid #007AFF;
                }

                &__label {
                    font-size: 11px;

                    line-height: 16px;

                    //font-weight: bolder;

                    color: #AABBCC;

                    &--selected {
                        color: #007AFF;

                        font-weight: bolder;
                    }
                }
            }
        }
    }

    .create-new-project {
        font-size: 10px;

        font-weight: bolder;

        color: #007AFF;
    }
</style>

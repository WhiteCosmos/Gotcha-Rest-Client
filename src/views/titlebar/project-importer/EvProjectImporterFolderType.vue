<template>
    <div class="ev-project-importer-folder-type d-flex flex-column">
        <div class="d-flex justify-center">
            <div class="d-flex align-center" style="height: 20px">
                <span class="ev-project-importer-folder-type__label">Supported Frameworks</span>
            </div>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="d-flex justify-center">
            <div class="ev-project-importer-folder-type__format-block" v-for="format in supportedFormats">
                <span class="ev-project-importer-folder-type__format-label">{{ format }}</span>
            </div>
        </div>

        <div class="d-flex align-center justify-center flex-grow-1">
            <div class="ev-project-importer-folder-type__button" @click="doChooseFolder">
                <span class="ev-project-importer-folder-type__button__label">Choose Project</span>
            </div>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import {
        EvProjectImporterEventBus,
        EvProjectImporterEvents
    } from '@/views/titlebar/project-importer/EvProjectImporterEventBus'

    export default {
        name: "EvProjectImporterFolderType",

        components: {
            EvHorizonGutter,
            EvVerticalGutter
        },

        data() {
            return {
                supportedFormats: [
                    "Spring",
                    "SpringFox",
                    "JAX-RS",
                ]
            }
        },

        methods: {
            doChooseFolder() {
                EvProjectImporterEventBus.$emit(EvProjectImporterEvents.CHOOSE_FOLDER)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-importer-folder-type {
        display: flex;

        //align-items: flex-start;

        border: 1px dashed #F1F1F1;

        border-radius: 3px;

        width: 100%;

        //height: 100%;

        height: 160px;

        background-color: #FAFAFA;

        padding: 8px;

        user-select: none;

        &__label {
            font-size: 10px;

            font-weight: bolder;

            color: #AABBCC;
        }

        &__format-block {
            @include full-center;

            width: fit-content;

            height: 20px;

            padding-left: 4px;

            padding-right: 4px;

            background-color: #F1F1F1;

            border: 1px dashed #E0E0E0;

            border-radius: 2px;

            margin-right: 8px;
        }

        &__format-label {
            font-size: 10px;

            font-weight: bolder;

            color: $SECONDARY_FONT_COLOR;
        }

        &__button {
            @include full-center;

            width: 96px;

            height: 20px;

            background-color: #F1F1F1;

            border-radius: 20px;

            //border: 1px solid #007AFF;

            box-shadow: 0 2px 8px -6px #E0E0E0;

            &__label {
                font-size: 10px;

                font-weight: bolder;

                color: #007AFF;
            }
        }
    }
</style>

<template>
    <div class="ev-project-importer-file-type d-flex flex-column">
        <div class="d-flex justify-center">
            <div class="d-flex align-center" style="height: 20px">
                <span class="ev-project-importer-file-type__label">Supported Formats</span>
            </div>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <div class="d-flex justify-center">
            <div class="ev-project-importer-file-type__format-block" v-for="format in supportedFormats">
                <span class="ev-project-importer-file-type__format-label">{{ format }}</span>
            </div>
        </div>

        <div class="d-flex align-center justify-center flex-grow-1">
            <div class="ev-project-importer-file-type__button" @click="doChooseFile">
                <span class="ev-project-importer-file-type__button__label">Choose File</span>
            </div>
        </div>
    </div>
</template>

<script>
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import {EvProjectImporterEventBus, EvProjectImporterEvents} from '@/views/titlebar/project-importer/EvProjectImporterEventBus'

    export default {
        name: "EvProjectImporterFileType",

        components: {
            EvHorizonGutter,
            EvVerticalGutter
        },

        data() {
            return {
                supportedFormats: [
                    "Swagger",
                    "OpenAPI",
                    // "APIDOC",
                    // "RAML",
                ]
            }
        },

        methods: {
            doChooseFile() {
                EvProjectImporterEventBus.$emit(EvProjectImporterEvents.CHOOSE_FILE)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-importer-file-type {
        display: flex;

        border: 1px dashed #F1F1F1;

        border-radius: 3px;

        width: 100%;

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

<template>
    <div class="ev-project-importer-empty-type">
        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <div class="ev-project-importer-empty-type__input-container">
            <ev-borderless-input v-model="projectName" placeholder="Awesome Project" dense></ev-borderless-input>
        </div>

        <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

        <v-btn text color="#007AFF" small style="align-self: flex-end" @click="doCreateProject">Create</v-btn>
    </div>
</template>

<script>
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import {EvProjectImporterEventBus, EvProjectImporterEvents} from '@/views/titlebar/project-importer/EvProjectImporterEventBus'

    export default {
        name: "EvProjectImporterEmptyType",

        components: {
            EvHorizonGutter,
            EvBorderlessInput
        },

        data() {
            return {
                projectName: ""
            }
        },

        methods: {
            doCreateProject() {

                EvProjectImporterEventBus.$emit(EvProjectImporterEvents.NEW_PROJECT, this.projectName)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-project-importer-empty-type {
        display: flex;

        flex-direction: column;

        //justify-content: center;

        width: 100%;

        height: 160px;

        //background-color: #FAFAFA;

        user-select: none;

        &__input-container {
            display: flex;

            align-items: center;

            width: 100%;

            height: 24px;

            border: 1px solid #F1F1F1;

            border-radius: 3px;

            padding-left: 4px;
        }
    }
</style>

<template>
    <v-dialog v-model="dialog" persistent width="400" overlay-color="#FCFCFC">
        <v-card>
            <div class="ev-processing-modal">
                <span class="ev-processing-modal__label">IMPORTING</span>

                <ev-horizon-gutter :gutter="24"></ev-horizon-gutter>

                <v-progress-linear indeterminate rounded color="#007AFF"></v-progress-linear>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import {
        AppEventBus,
        AppEvents
    } from '@/AppEventBus'

    export default {
        name: "EvImportingProcessingModal",

        created() {
            AppEventBus.$on(AppEvents.IMPORT_PROJECT, () => {
                this.dialog = true
            })

            AppEventBus.$on([AppEvents.IMPORT_PROJECT_FINISHED, AppEvents.IMPORT_PROJECT_FAILED], () => {
                this.dialog = false
            })
        },

        components: {
            EvHorizonGutter
        },

        props: {
            message: String,
        },

        data() {
            return {
                dialog: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-processing-modal {
        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        width: 400px;

        height: 160px;

        background-color: #FAFAFA;

        padding-left: 72px;

        padding-right: 72px;

        &__label {
            font-size: 12px;

            line-height: 16px;

            font-weight: bolder;

            color: $PRIMARY_COLOR;
        }
    }
</style>

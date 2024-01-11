<template>
    <v-card class="modal__export d-flex align-center justify-center">
        <div class="modal__title">
            <ev-circle-close-button style="position: absolute; left: 12px" @click.native="close"></ev-circle-close-button>

            <span class="modal__title__font">{{ $t('EvImportLocalProjectModal.title') }}</span>
        </div>

        <div class="import-modal-content">
            <ev-import-local-project-option :options="options"></ev-import-local-project-option>

            <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

            <!--                <ev-import-local-project-option></ev-import-local-project-option>-->
            <ev-import-swagger-file-option :options="options"></ev-import-swagger-file-option>

            <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

            <!--                <ev-import-local-project-option></ev-import-local-project-option>-->

            <ev-create-empty-project-option :options="options"></ev-create-empty-project-option>
        </div>

        <div class="modal__action">
            <ev-document-create-button @click.native="doImportProject">{{ $t("EvImportLocalProjectModal.importButtonLabel") }}</ev-document-create-button>
        </div>
    </v-card>
</template>

<script>
    import EvDocumentCreateButton from '@/modals/add-local-project/EvDocumentCreateButton'
    import EvDialogMixin from '@/mixins/EvDialogMixin'
    import EvCircleCloseButton from '@/components/button/EvCircleCloseButton'
    import EvImportLocalProjectOption from '@/modals/import-local-project/EvImportLocalProjectOption'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvImportSwaggerFileOption from '@/modals/import-local-project/EvImportSwaggerFileOption'
    import EvCreateEmptyProjectOption from '@/modals/import-local-project/EvCreateEmptyProjectOption'
    import ImportLocalProjectOptions from '@/modals/import-local-project/ImportLocalProjectOptions'

    export default {
        name: "EvImportLocalProjectModal",

        components: {
            EvCreateEmptyProjectOption,
            EvImportSwaggerFileOption,
            EvHorizonGutter,
            EvVerticalGutter,
            EvImportLocalProjectOption,
            EvCircleCloseButton,
            EvDocumentCreateButton
        },

        mixins: [
            EvDialogMixin,
        ],

        mounted() {
            // init options

            // close init
        },

        data() {
            return {
                options: new ImportLocalProjectOptions()
            }
        },

        methods: {
            doClose() {
                // init options
            },

            doImportProject() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";
    @import "~@/styles/modal.scss";

    .import-modal-content {
        display: flex;

        flex-direction: column;

        width: 100%;

        height: 100%;

        padding: 24px;
    }
</style>

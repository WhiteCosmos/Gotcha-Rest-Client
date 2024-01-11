<template>
    <div class="message__container d-flex align-center justify-center">
        <ev-import-local-project-option :options="options"></ev-import-local-project-option>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-import-swagger-file-option :options="options"></ev-import-swagger-file-option>

        <ev-horizon-gutter :gutter="16"></ev-horizon-gutter>

        <ev-create-empty-project-option :options="options"></ev-create-empty-project-option>
    </div>
</template>

<script>
    import EvImportLocalProjectOption from '@/modals/import-local-project/EvImportLocalProjectOption'
    import EvImportSwaggerFileOption from '@/modals/import-local-project/EvImportSwaggerFileOption'
    import EvCreateEmptyProjectOption from '@/modals/import-local-project/EvCreateEmptyProjectOption'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'

    export default {
        name: "ModalContentOptionsSelector",

        components: {
            EvHorizonGutter,
            EvCreateEmptyProjectOption,
            EvImportSwaggerFileOption,
            EvImportLocalProjectOption
        },

        props: {
            options: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";
    @import "modal-content";

</style>

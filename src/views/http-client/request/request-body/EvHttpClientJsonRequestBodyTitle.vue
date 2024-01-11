<template>
    <div class="ev-http-client-json-request-body-title">
        <ev-label size="11" secondary bold>JSON</ev-label>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <!--        <div class="ev-borderless-input-wrapper">-->
        <!--            <ev-borderless-input v-model="search" placeholder="$.books[0].author"></ev-borderless-input>-->
        <!--        </div>-->

        <!--  Preview -->

        <v-spacer></v-spacer>

        <ev-json-preview-toggle @toggle="emitTogglePreview"></ev-json-preview-toggle>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-json-copy-button @copy="emitCopyJson"></ev-json-copy-button>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <ev-http-client-json-request-body-importer @import-json="emitImportJson"></ev-http-client-json-request-body-importer>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvImportJsonIcon from '@/components/json-editor-vsl/icons/ev-import-json-icon'
    import EvHttpClientJsonRequestBodyImporter from '@/views/http-client/request/request-body/EvHttpClientJsonRequestBodyImporter'
    import EvPopupMenuToggleItem from '@/components/menu/EvPopupMenuToggleItem'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvEyeIcon from '@/components/icon/ev-eye-icon'
    import EvEyeCloseIcon from '@/components/icon/ev-eye-close-icon'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvJsonPreviewToggle from '@/components/json-editor-vsl/components/EvJsonPreviewToggle.vue'
    import EvJsonCopyButton from '@/components/json-editor-vsl/components/EvJsonCopyButton.vue'

    export default {
        name: "EvHttpClientJsonRequestBodyTitle",

        components: {
            EvJsonCopyButton,
            EvJsonPreviewToggle,
            EvBorderlessInput,
            EvEyeCloseIcon,
            EvEyeIcon,
            EvVerticalGutter,
            EvPopupMenuToggleItem,
            EvHttpClientJsonRequestBodyImporter,
            EvImportJsonIcon,
            EvLabel
        },

        data() {
            return {
                preview: false,

                preview_: false,

                search: ""
            }
        },

        watch: {
            preview() {
                this.$emit('toggle-preview')
            },
        },

        methods: {
            emitImportJson(json, mergeOption) {
                this.$emit('import-json', json, mergeOption)
            },

            emitCopyJson() {
                this.$emit('copy-json')
            },

            emitTogglePreview() {
                this.$emit('toggle-preview')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    .ev-http-client-json-request-body-title {
        display: flex;

        align-items: center;

        width: 100%;

        height: 28px;

        border-bottom: 1px solid #EAEAEA;

        padding-left: 24px;

        padding-right: 20px;

        &__icon-wrapper {
            @include full-center;

            width: 24px;

            height: 14px;

            border: 1px solid #555;

            border-radius: 2px;
        }
    }

    .ev-borderless-input-wrapper {
        display: flex;

        flex: 1;

        align-items: center;

        height: 22px;

        //width: 200px;

        //border: 1px solid #e0e0e0;

        //border-radius: 4px;

        //background-color: #F1F1F1;
    }
</style>

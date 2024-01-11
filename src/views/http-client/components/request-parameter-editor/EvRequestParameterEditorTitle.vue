<template>
    <div class="ev-request-parameter-editor-title" :class="editorStyles" :style="{'padding-right': pageMode ? '22px' : '8px'}">
        <ev-label size="12" bold secondary>{{ options.title }}</ev-label>

        <v-spacer></v-spacer>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-request-parameters-exporter @export="emitExportParameters" :options="options"></ev-request-parameters-exporter>

        <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

        <ev-request-parameters-importer @import="emitImportParameters" :options="options"></ev-request-parameters-importer>

        <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

        <ev-json-add-button @click.native="emitAddItem"></ev-json-add-button>
    </div>
</template>

<script>
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvImportJsonIcon from '@/components/json-editor-vsl/icons/ev-import-json-icon'
    import EvRequestParameterConfigIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterConfigIcon'
    import EvRequestParameterIOPanel from '@/views/http-client/components/request-parameter-editor/components/EvRequestParameterIOPanel'
    import EvRequestParameterExportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterExportIcon'
    import EvRequestParameterImportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterImportIcon'
    import EvRequestParametersExporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersExporter'
    import EvRequestParametersImporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersImporter'
    import EvRequestParameterEditorEventsMixin from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorEventsMixin'

    export default {
        name: "EvCookieEditorTitle",

        components: {
            EvRequestParametersImporter,
            EvRequestParametersExporter,
            EvRequestParameterImportIcon,
            EvRequestParameterExportIcon,
            EvRequestParameterIOPanel,
            EvRequestParameterConfigIcon,
            EvImportJsonIcon,
            EvJsonAddButton,
            EvVerticalGutter,
            EvLabel
        },

        mixins: [
            EvRequestParameterEditorEventsMixin
        ],

        props: {
            options: Object,

            pageMode: Boolean,
        },

        computed: {
            editorStyles() {
                return {
                    'ev-request-parameter-editor-title__embed-mode': !this.pageMode
                }
            },
        },

        methods: {
            emitAddItem() {
                this.$emit('add-item')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterEditor";

    .ev-request-parameter-editor-title {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        &__embed-mode {
            border-top: 1px solid #F5F5F5;
        }

        border-bottom: 1px solid #EAEAEA;

        user-select: none;

        &__icon-container {
            @include full-center;

            height: 28px;

            width: 32px;
        }
    }
</style>

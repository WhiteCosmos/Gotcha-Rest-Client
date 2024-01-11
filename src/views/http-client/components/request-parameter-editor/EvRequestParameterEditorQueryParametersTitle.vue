<template>
    <div class="ev-request-parameter-editor-title" :class="editorStyles" :style="{'padding-right': pageMode ? '22px' : '8px'}">
        <ev-label size="12" bold secondary>{{ options.title }}</ev-label>

        <ev-dot-divider></ev-dot-divider>

        <ev-query-parameters-array-format-label :array-format="config.arrayFormat"></ev-query-parameters-array-format-label>

        <v-spacer></v-spacer>

        <ev-query-parameters-config :config="config"></ev-query-parameters-config>

        <ev-vertical-gutter :gutter="6"></ev-vertical-gutter>

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
    import EvQueryParametersArrayFormatLabel from '@/views/http-client/components/request-parameter-editor/components/EvQueryParametersArrayFormatLabel'
    import EvQueryParametersConfig from '@/views/http-client/components/request-parameter-editor/components/EvQueryParametersConfig'
    import EvDotDivider from '@/components/layout/EvDotDivider'
    import EvRequestParameterExportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterExportIcon'
    import EvRequestParameterImportIcon from '@/views/http-client/components/request-parameter-editor/icons/EvRequestParameterImportIcon'
    import EvRequestParametersExporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersExporter'
    import EvRequestParametersImporter from '@/views/http-client/components/request-parameter-editor/components/EvRequestParametersImporter'
    import EvRequestParameterEditorEventsMixin from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorEventsMixin'

    export default {
        name: "EvRequestParameterEditorQueryParametersTitle",

        components: {
            EvRequestParametersImporter,
            EvRequestParametersExporter,
            EvRequestParameterImportIcon,
            EvRequestParameterExportIcon,
            EvDotDivider,
            EvQueryParametersConfig,
            EvQueryParametersArrayFormatLabel,
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

            config: Object,

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

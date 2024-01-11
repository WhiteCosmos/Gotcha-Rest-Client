<template>
    <div class="ev-json-schema-manager-content">
        <div class="ev-json-schema-manager-content__header">
            <ev-label size="12" bold secondary>{{ selectedJsonSchemaGroup.name }}</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="12" primary>/</ev-label>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-label size="12" bold secondary>{{ selectedJsonSchema.name }}</ev-label>

            <v-spacer></v-spacer>

            <!--            <ev-json-preview-toggle @toggle=""></ev-json-preview-toggle>-->

            <!--            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>-->

            <ev-http-client-json-request-body-importer v-if="selectedJsonSchema !== undefined"
                                                       :disabled="!selectedJsonSchema"
                                                       @import-json="handleImportJson"></ev-http-client-json-request-body-importer>
        </div>

        <div class="ev-json-schema-manager-content__body">
            <ev-json-schema-editor :root="selectedJsonSchema.root" mode="schema"></ev-json-schema-editor>
        </div>
    </div>
</template>

<script>
    import EvJsonSchemaEditor from '@/components/json-schema-editor/EvJsonSchemaEditor'
    import EvLabel from '@/components/typography/EvLabel'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvHttpClientJsonRequestBodyImporter from '@/views/http-client/request/request-body/EvHttpClientJsonRequestBodyImporter.vue'
    import EvJsonPreviewToggle from '@/components/json-editor-vsl/components/EvJsonPreviewToggle.vue'
    import JsonSchemaHelper from '@/components/json-schema-editor/JsonSchemaHelper'

    export default {
        name: "EvJsonSchemaManagerContent",

        components: {
            EvJsonPreviewToggle,
            EvHttpClientJsonRequestBodyImporter,
            EvVerticalGutter,
            EvLabel,
            EvJsonSchemaEditor
        },

        props: {
            selectedJsonSchemaGroup: Object,

            selectedJsonSchema: Object
        },

        data() {
            return {}
        },

        methods: {
            handleImportJson(json, mergeOption) {
                let helper = new JsonSchemaHelper()

                let dSchema = helper.parse(json)

                if (mergeOption) {
                    helper.merge(this.selectedJsonSchema.root, dSchema)
                } else {
                    this.selectedJsonSchema.root = dSchema
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";

    @import "~@/styles/scrollbar.scss";

    .ev-json-schema-manager-content {
        display: flex;

        flex-direction: column;

        flex: 1;

        //background-color: #FF8282;

        &__header {
            display: flex;

            align-items: center;

            width: 100%;

            height: 40px;

            background-color: #F1F1F1;

            border-bottom: 1px solid #E0E0E0;

            padding-left: 20px;

            padding-right: 16px; // 给Import留出位置
        }

        &__body {
            display: flex;

            width: 100%;

            height: calc(100% - 40px);

            min-height: 1px;

            min-width: 1px;

            //overflow-y: scroll;
        }
    }
</style>

<template>
    <div class="ev-json-schema-item"
         :class="{'ev-json-schema-item--selected': this.isSelected}"
         @click="emitSelectJsonSchema">
        <ev-editable-label ref="ev-editable-label" size="12" secondary medium v-model="jsonSchema.name"></ev-editable-label>

        <v-spacer></v-spacer>

        <div class="d-flex align-center justify-center" style="height: 16px; width: 20px" @click.stop="">
            <ev-json-remove-button @remove="emitRemoveJsonSchemaItem"></ev-json-remove-button>
        </div>
    </div>
</template>

<script>
    import EvEditableLabel from '@/components/input/EvEditableLabel'
    import EvJsonRemoveButton from '@/components/json-editor-vsl/components/EvJsonRemoveButton'
    import {EvJsonSchemaManagerEventBus, EvJsonSchemaManagerEvents} from '@/modals/json-schema-manager/EvJsonSchemaManagerEventBus'

    export default {
        name: "EvJsonSchemaItem",

        components: {
            EvJsonRemoveButton,
            EvEditableLabel
        },

        created() {
            EvJsonSchemaManagerEventBus.$on(EvJsonSchemaManagerEvents.RENAME_JSON_SCHEMA, this.handleRenameJsonSchemaItem)
        },

        beforeDestroy() {
            EvJsonSchemaManagerEventBus.$off(EvJsonSchemaManagerEvents.RENAME_JSON_SCHEMA, this.handleRenameJsonSchemaItem)
        },

        props: {
            jsonSchemaGroup: Object,

            jsonSchema: Object,

            selectedJsonSchema: Object
        },

        watch: {
            'jsonSchema.name'(newVal) {
                let root = this.jsonSchema.root

                root && (root.key = newVal)
            },
        },

        computed: {
            isSelected() {
                return this.selectedJsonSchema === this.jsonSchema
            },
        },

        methods: {
            handleRenameJsonSchemaItem(jsonSchemaItem) {
                if (jsonSchemaItem !== this.jsonSchema) {
                    return
                }

                this.$refs['ev-editable-label'].enableEditing()
            },

            emitSelectJsonSchema() {
                this.$emit('select-json-schema')
            },

            emitRemoveJsonSchemaItem() {
                EvJsonSchemaManagerEventBus.$emit(EvJsonSchemaManagerEvents.REMOVE_JSON_SCHEMA, this.jsonSchemaGroup, this.jsonSchema)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/rabiapi.scss";


    .ev-json-schema-item {
        display: flex;

        align-items: center;

        width: 100%;

        height: 32px;

        padding-left: 24px;

        background-color: #F5F5F5;

        &--selected {
            background-color: #EAEAEA;
        }
    }
</style>

<template>
    <div class="ev-request-parameter-description-editor-item">
        <div class="ev-request-parameter-description-editor-item__drag-container">
            <ev-drag-icon></ev-drag-icon>
        </div>

        <ev-vertical-gutter :gutter="16"></ev-vertical-gutter>

        <div class="ev-request-parameter-description-editor__name-column">
            <ev-json-schema-properties
                mode="param"
                :type="item.type"
                :properties="item.properties"
                :disabled="isPathMode && !isPathParameter"></ev-json-schema-properties>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="ev-request-parameter-description-editor-item__index" v-if="isPathMode">
                <ev-label size="11" grey># {{ idx }}</ev-label>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <div class="d-flex" style="flex: 1">
                    <ev-borderless-input v-if="checkIsPathParameter(item)"
                                         :size="11"
                                         ref="key-input" :placeholder="pathname" v-model="item.key"></ev-borderless-input>

                    <ev-borderless-input v-if="!checkIsDynamicVariable(item) && !checkIsPathParameter(item)"
                                         :size="11"
                                         ref="key-input"
                                         :placeholder="item.value" v-model="item.value"></ev-borderless-input>

                    <div class="ev-label-wrapper" v-if="checkIsDynamicVariable(item) && !checkIsPathParameter(item)">
                        <ev-label orange size="11">{{ $t('dynamicVariable') }}</ev-label>
                    </div>
                </div>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-switch v-model="isPathParameter"></ev-switch>
            </div>

            <ev-borderless-input v-else
                                 ref="key-input"
                                 :placeholder="options.keyPlaceholder"
                                 v-model="item.key"></ev-borderless-input>
        </div>

        <div class="ev-request-parameter-description-editor__optional-column">
            <ev-json-schema-type-selector :node="item"
                                          :exclude-types="excludeTypes"
                                          :disabled="isPathMode && !isPathParameter"></ev-json-schema-type-selector>
        </div>

        <div class="ev-request-parameter-description-editor__value-column">
            <ev-borderless-input ref="value-input"
                                 :placeholder="(isPathMode && !isPathParameter) ? '-' : '/'"
                                 v-model="item.description"
                                 :disabled="isPathMode && !isPathParameter"></ev-borderless-input>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-confirm-delete-button @remove="emitRemoveItem" style="margin-right: 1px"></ev-confirm-delete-button>

            <ev-json-add-button @click.native="emitInsertItem"></ev-json-add-button>
        </div>
    </div>
</template>

<script>
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import EvConfirmDeleteButton from '@/components/button/EvConfirmDeleteButton'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvStoreMixin from '@/mixins/EvStoreMixin'
    import EvSwitch from '@/components/button/EvSwitch'
    import EvJsonSchemaTypeSelector from '@/components/json-schema-editor/components/EvJsonSchemaTypeSelector'
    import EvJsonSchemaProperties from '@/components/json-schema-editor/constraints/EvJsonSchemaProperties'
    import EvJsonDragIcon from '@/components/json-editor-vsl/icons/ev-json-drag-icon.vue'
    import JsonSchemaNodeProperties from '@/components/json-schema-editor/JsonSchemaNodeProperties'

    export default {
        name: "EvRequestParameterDescriptionEditorItem",

        components: {
            EvJsonDragIcon,
            EvJsonSchemaProperties,
            EvJsonSchemaTypeSelector,
            EvSwitch,
            EvJsonAddButton,
            EvConfirmDeleteButton,
            EvDeletableIcon,
            EvJsonRemoveIcon,
            EvBulkEditor,
            EvDragIcon,
            EvExportCheckBox,
            EvLabel,
            EvVerticalGutter,
            EvBorderlessInput
        },

        created() {
            this.initializeProperties()

            this.isPathParameter = (this.item.requiredStatus === 'CHECKED')
        },

        mixins: [
            EvStoreMixin,
        ],

        props: {
            idx: Number,

            item: Object,

            options: Object,
        },

        computed: {
            isPathMode() {
                return this.options.mode && this.options.mode === 'path'
            },

            isOptionalPath() {
                return this.isPathMode && this.item.requiredStatus === "CHECKED"
            },

            pathname: {
                get() {
                    return this.dynamicVariableRender.render(this.item.value)
                },

                set(path) {
                    this.item.value = path
                },
            },

            excludeTypes() {
                return [
                    'schema',
                    'dictionary'
                ]
            },
        },

        watch: {
            'item.key'() { // Why drag influence key ?
                this.emitUpdateItem()
            },

            isPathParameter(newVal) {
                if (newVal) {
                    this.item.requiredStatus = 'CHECKED'
                } else {
                    this.item.requiredStatus = 'UNCHECKED'
                }
            },
        },

        data() {
            return {
                isPathParameter: false
            }
        },

        methods: {
            initializeProperties() {
                if (!this.item.hasOwnProperty('properties')) {
                    this.$set(this.item, 'properties', new JsonSchemaNodeProperties())
                }
            },

            emitInsertItem() {
                this.$emit('insert-item', this.item)
            },

            emitUpdateItem() {
                this.$emit('update-item', this.item)
            },

            emitRemoveItem() {
                this.$emit('remove-item', this.item)
            },

            focusOnKey() {
                this.$refs['key-input'].focus()
            },

            focusOnValue() {
                this.$refs['value-input'].focus()
            },

            checkIsDynamicVariable(item) {
                return (typeof item.value === 'object')
            },

            checkIsPathParameter(item) {
                return item.requiredStatus === 'CHECKED'
            },
        },

        i18n: {
            messages: {
                en: {
                    dynamicVariable: "Dynamic Variable",
                },

                zh: {
                    dynamicVariable: "动态变量",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterDescriptionEditor";

    .ev-request-parameter-description-editor-item {
        position: relative;

        display: flex;

        align-items: center;

        height: 28px;

        padding-right: 4px;

        border-bottom: 1px solid #F1F1F1;

        background-color: #FFF;

        &__drag-container {
            width: 20px;

            height: 16px;

            @include full-center;

            position: absolute;

            left: -2px;

            transition: 80ms;
        }

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }

        &__index {
            display: flex;

            align-items: center;

            width: 100%;
        }
    }

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 8px;

        padding-right: 8px;

        border-radius: 3px;

        background-color: #fff7e6;
    }
</style>

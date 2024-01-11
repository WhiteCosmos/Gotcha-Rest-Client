<template>
    <div class="ev-request-parameter-editor-item">
        <div class="ev-request-parameter-editor-item__drag-container">
            <ev-drag-icon></ev-drag-icon>
        </div>

        <ev-export-check-box v-model="item.checkedStatus"></ev-export-check-box>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <!-- Path Parameters -->

        <!--        {{ item.latestValue }}-->

        <div class="ev-request-parameter-editor__name-column" v-if="isPathMode">
            <ev-label secondary size="12">{{ `Idx ${idx}` }}</ev-label>

            <ev-label primary size="12" style="margin-left: 8px">{{ item.key || '-' }}</ev-label>
        </div>

        <!-- Others -->

        <div class="ev-request-parameter-editor__name-column" v-else>
            <ev-borderless-input ref="key-input"
                                 :placeholder="options.keyPlaceholder"
                                 :available-values="options.availableKeys"
                                 v-model="item.key"></ev-borderless-input>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <ev-request-parameter-editor-type-selector :item="item" v-if="isQueryMode"></ev-request-parameter-editor-type-selector>

            <ev-vertical-gutter :gutter="8" v-if="isQueryMode"></ev-vertical-gutter>
        </div>

        <div class="ev-request-parameter-editor__value-column">
            <div class="d-flex" style="flex: 1">
                <ev-dynamic-variable-input ref="value-input"
                                           :placeholder="valuePlaceholder"
                                           v-model="item.value"></ev-dynamic-variable-input>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <ev-confirm-delete-button @remove='emitRemoveItem' style="margin-right: 1px"></ev-confirm-delete-button>

            <ev-json-add-button @click.native="emitInsertItem"></ev-json-add-button>
        </div>
    </div>
</template>

<script>
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDeleteIcon from '@/views/http-client/icon/ev-delete-icon'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import EvLabel from '@/components/typography/EvLabel'
    import EvConfirmDeleteButton from '@/components/button/EvConfirmDeleteButton'
    import EvRequestParameterEditorTypeSelector from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorTypeSelector'
    import EvRequestParameterEditorMixin from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorMixin'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'
    import GHCSwaggerExportSettings from '@/data/gotcha/export/GHCSwaggerExportSettings'

    export default {
        name: "EvRequestParameterEditorItem",

        components: {
            EvDynamicVariableInput,
            EvRequestParameterEditorTypeSelector,
            EvConfirmDeleteButton,
            EvLabel,
            EvBulkEditor,
            EvBorderlessInput,
            EvJsonAddButton,
            EvJsonRemoveIcon,
            EvDragIcon,
            EvDeletableIcon,
            EvDeleteIcon,
            EvVerticalGutter,
            EvExportCheckBox
        },

        mixins: [
            EvRequestParameterEditorMixin,
        ],

        created() {
            this.initializeProperties(this.item)
        },

        props: {
            idx: Number,

            item: Object,
        },

        computed: {
            valuePlaceholder() {
                return this.item.description ? this.item.description : this.options.valuePlaceholder
            },
        },

        watch: {
            'item.key'() {
                this.emitUpdateItem()
            },
            'item.type'() {
                this.emitUpdateItem()
            },
            'item.dataType'() {
                this.emitUpdateItem()
            },
            'item.format'() {
                this.emitUpdateItem()
            },
            'item.value': {
                deep: true,
                handler() {
                    this.emitUpdateItem()
                },
            },
            'item.children': {
                deep: true,
                handler() {
                    this.emitUpdateItem()
                },
            },
            'item.description'() {
                this.emitUpdateItem()
            },
            'item.checkedStatus'() {
                this.emitUpdateItem()
            },
            'item.requiredStatus'() {
                this.emitUpdateItem()
            },
            'item.separator'() {
                this.emitUpdateItem()
            },
        },

        methods: {
            initializeProperties(item) {
                // Since 1.6.3

                if (!item.hasOwnProperty('latestValue')) {
                    this.$set(item, 'latestValue', undefined)
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
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterEditor";

    .ev-request-parameter-editor-item {
        position: relative;

        display: flex;

        align-items: center;

        height: 28px;

        width: 100%;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;

        background-color: #FFF;

        &__drag-container {
            width: 20px;

            height: 16px;

            @include full-center;

            position: absolute;

            left: 2px;

            transition: 80ms;
        }

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }
    }
</style>
<template>
    <div class="ev-request-parameter-editor-item-wrapper">
        <div class="ev-request-parameter-editor-item">
            <div class="ev-request-parameter-editor-item__drag-container">
                <ev-drag-icon></ev-drag-icon>
            </div>

            <ev-export-check-box v-model="item.checkedStatus"></ev-export-check-box>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

            <div class="ev-request-parameter-editor__name-column">
                <ev-borderless-input ref="key-input"
                                     :placeholder="options.keyPlaceholder"
                                     :available-values="options.availableKeys"
                                     v-model="item.key"></ev-borderless-input>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-request-parameter-editor-type-selector :item="item"></ev-request-parameter-editor-type-selector>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
            </div>

            <div class="ev-request-parameter-editor__value-column">
                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-label size="11" grey>{{ item.children.length }} {{ item.children.length > 1 ? 'Items' : 'Item' }}</ev-label>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <div class="ev-label-wrapper">
                    <ev-label size="11" secondary @click.native="expand = !expand">{{ expand ? $t('collapse') : $t('expand') }}</ev-label>
                </div>

                <v-spacer></v-spacer>

                <ev-confirm-delete-button @remove='emitRemoveItem' style="margin-right: 1px"></ev-confirm-delete-button>

                <ev-vertical-gutter :gutter="3"></ev-vertical-gutter>

                <ev-new-json-node-icon></ev-new-json-node-icon>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-json-add-button @click.native="doAddChild"></ev-json-add-button>

                <ev-vertical-gutter :gutter="3"></ev-vertical-gutter>

                <ev-new-sibling-node-icon></ev-new-sibling-node-icon>

                <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                <ev-json-add-button @click.native="emitInsertItem"></ev-json-add-button>
            </div>
        </div>

        <draggable v-if="expand"
                   v-model="item.children"
                   @change=""
                   handle=".ev-request-parameter-editor-item__drag-container-2"
                   v-bind="dragOptions">
            <div class="ev-request-parameter-editor-item" v-for="(child, idx) in item.children">
                <div class="ev-request-parameter-editor-item__drag-container-2">
                    <ev-drag-icon></ev-drag-icon>
                </div>

                <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                <ev-export-check-box v-model="child.checkedStatus" @change="handleChildCheckedStatusChange"></ev-export-check-box>

                <div class="ev-request-parameter-editor__name-column">
                    <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                    <ev-label grey size="11">{{ `Idx ${idx}` }}</ev-label>

                    <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

                    <v-spacer></v-spacer>

                    <ev-data-type-string-icon color="#B5B5B5"></ev-data-type-string-icon>

                    <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
                </div>

                <div class="ev-request-parameter-editor__value-column">
                    <div class="d-flex flex-grow-1">
                        <ev-dynamic-variable-input ref="value-input" placeholder="Param Value" v-model="child.value"></ev-dynamic-variable-input>
                    </div>

                    <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

                    <ev-confirm-delete-button @remove='doRemoveChild(child)' style="margin-right: 1px"></ev-confirm-delete-button>

                    <ev-json-add-button @click.native="doInsertChild(child)"></ev-json-add-button>
                </div>
            </div>
        </draggable>
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
    import GHCRequestParameterItem from '@/views/http-client/components/request-parameter-editor/GHCRequestParameterItem'
    import EvRequestParameterEditorFormatSelector from '@/views/http-client/components/request-parameter-editor/EvRequestParameterEditorFormatSelector'
    import EvLeftArrowIcon from '@/views/http-client/icon/ev-left-arrow-icon'
    import EvNewJsonNodeIcon from '@/components/json-editor-vsl/icons/ev-new-json-node-icon'
    import EvNewSiblingNodeIcon from '@/components/json-editor-vsl/icons/ev-new-sibling-node-icon'
    import draggable from 'vuedraggable'
    import EvCheckedStatusHelper from '@/mixins/EvCheckedStatusHelper'
    import EvDataTypeStringIcon from '@/assets/icons/EvDataTypeStringIcon'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'

    export default {
        name: "EvRequestParameterEditorArrayItem",

        components: {
            EvDynamicVariableInput,
            EvDataTypeStringIcon,
            EvNewSiblingNodeIcon,
            EvNewJsonNodeIcon,
            EvLeftArrowIcon,
            EvRequestParameterEditorFormatSelector,
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
            EvExportCheckBox,
            draggable,
        },

        mixins: [],

        created() {

        },

        props: {
            idx: Number,

            item: Object,

            options: Object,
        },

        computed: {
            valuePlaceholder() {
                return this.item.description ? this.item.description : this.options.valuePlaceholder
            },

            isQueryParameter() {

            },

            children() {
                return this.item.children
            },
        },

        data() {
            return {
                dragOptions: {
                    animation: 200
                },

                expand: true,
            }
        },

        watch: {
            item: {
                deep: true,
                handler() {
                    this.emitUpdateItem()
                },
            },

            'item.checkedStatus'(newVal, oldVal) {
                this.handleItemCheckedStatusChange(newVal, oldVal)
            },
        },

        methods: {
            emitInsertItem() {
                this.$emit('insert-item', this.item)
            },

            emitUpdateItem() {
                this.$emit('update-item', this.item)
            },

            emitRemoveItem() {
                this.$emit('remove-item', this.item)
            },

            doAddChild() {
                this.children.push(new GHCRequestParameterItem())
            },

            doInsertChild(previousChild) {
                this.children.splice(this.children.indexOf(previousChild) + 1, 0, new GHCRequestParameterItem())
            },

            doRemoveChild(child) {
                this.children.splice(this.children.indexOf(child), 1)
            },

            focusOnKey() {
                this.$refs['key-input'].focus()
            },

            focusOnValue() {
                this.$refs['value-input'].focus()
            },

            handleItemCheckedStatusChange(newVal, oldVal) {
                if (newVal === 'CHECKED') {
                    this.children.forEach(child => {
                        EvCheckedStatusHelper.toItemChecked(child)
                    })
                }

                if (newVal === 'UNCHECKED') {
                    this.children.forEach(child => {
                        EvCheckedStatusHelper.toItemUnchecked(child)
                    })
                }
            },

            handleChildCheckedStatusChange() {
                if (EvCheckedStatusHelper.isEveryChecked(this.children)) {
                    EvCheckedStatusHelper.toItemChecked(this.item)
                } else if (EvCheckedStatusHelper.isNullChecked(this.children)) {
                    EvCheckedStatusHelper.toItemUnchecked(this.item)
                } else {
                    EvCheckedStatusHelper.toItemHalfChecked(this.item)
                }
            },
        },

        i18n: {
            messages: {
                en: {
                    expand: 'Expand',

                    collapse: "Collapse"
                },
                zh: {
                    expand: '展开',

                    collapse: "收起"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvRequestParameterEditor";

    .ev-request-parameter-editor-item-wrapper {
        display: flex;

        flex-direction: column;

        width: 100%;
    }

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

        &__drag-container-2 {
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

    .ev-label-wrapper {
        display: flex;

        align-items: center;

        width: fit-content;

        padding-left: 4px;

        padding-right: 4px;

        background-color: #F1F1F1;

        border-radius: 3px;
    }
</style>
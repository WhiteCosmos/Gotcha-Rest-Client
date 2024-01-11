<template>
    <div class="ev-multipart-form-editor-item">
        <div class="ev-multipart-form-editor-item__drag-container">
            <ev-drag-icon></ev-drag-icon>
        </div>

        <ev-export-check-box v-model="item.checkedStatus"></ev-export-check-box>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-multipart-form-editor__name-column">
            <ev-borderless-input ref="key-input" placeholder="Part Name" v-model="item.key"></ev-borderless-input>

            <div class="ev-multipart-form-editor__status-column" style="padding-right: 2px">
                <ev-multipart-form-item-type-selector :item="item"></ev-multipart-form-item-type-selector>
            </div>
        </div>

        <div class="ev-multipart-form-editor__value-column">
            <div class="d-flex flex-grow-1">
                <ev-dynamic-variable-input v-if="isTextType" ref="value-input" placeholder="Part Value" v-model="item.value"></ev-dynamic-variable-input>

                <ev-multipart-form-item-file-selector v-if="isFileType" :item="item"></ev-multipart-form-item-file-selector>
            </div>

            <ev-vertical-gutter :gutter="4"></ev-vertical-gutter>

            <div class="ev-multipart-form-editor-item__icon-container" style="margin-right: 1px">
                <transition name="slide-y-transition" duration="80" mode="out-in">
                    <ev-json-remove-icon key="delete" v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>

                    <ev-deletable-icon key="deletable" v-if="deletable" @click.native="emitRemoveItem"></ev-deletable-icon>
                </transition>
            </div>

            <ev-json-add-button @click.native="emitInsertItem"></ev-json-add-button>
        </div>
    </div>
</template>

<script>
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvDeleteIcon from '@/views/http-client/icon/ev-delete-icon'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import _ from 'lodash'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvBulkEditor from '@/components/input/EvBulkEditor'
    import EvMultipartFormItemTypeSelector from '@/views/http-client/components/multipart-form-editor/EvMultipartFormItemTypeSelector'
    import EvMultipartFormItemFileSelector from '@/views/http-client/components/multipart-form-editor/EvMultipartFormItemFileSelector'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'

    export default {
        name: "EvCookieEditorItem",

        components: {
            EvDynamicVariableInput,
            EvMultipartFormItemFileSelector,
            EvMultipartFormItemTypeSelector,
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

        mixins: [],

        created() {
            // setTimeout(() => {
            //     this.shouldRender = true
            // }, this.idx)
        },

        props: {
            idx: Number,

            item: Object,
        },

        data() {
            return {
                deletable: false,

                shouldRender: false
            }
        },

        computed: {
            isTextType() {
                return this.item && this.item.dataType === 'text'
            },

            isFileType() {
                return this.item && this.item.dataType === 'file'
            }
        },

        watch: {
            'item.checkedStatus'() {
                this.emitUpdateItem()
            },
            'item.key'() {
                this.emitUpdateItem()
            },
            'item.value'() {
                this.emitUpdateItem()
            }
        },

        methods: {
            toggleDeletable() {
                if (_.isEmpty(this.item.key) && _.isEmpty(this.item.value)) {
                    this.$emit('remove-item', this.item)
                    return
                }

                this.deletable = true

                new DelayTrigger(1500, () => {
                    this.deletable = false
                }).trigger()
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
    @import "EvMultipartFormEditor";

    .ev-multipart-form-editor-item {
        position: relative;

        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;

        background-color: white;

        &__drag-container {
            width: 20px;

            height: 16px;

            @include full-center;

            position: absolute;

            left: 2px;

            transition: 80ms;

            &:hover {
                cursor: grab;
            }

            &:active {
                cursor: grabbing;
            }
        }

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }
    }
</style>
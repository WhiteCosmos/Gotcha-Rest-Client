<template>
    <div class="ev-key-value-assertion-editor-item">
        <div class="ev-key-value-assertion-editor-item__drag-container">
            <ev-drag-icon></ev-drag-icon>
        </div>

        <ev-export-check-box v-model="item.checkedStatus"></ev-export-check-box>

        <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>

        <div class="ev-key-value-assertion-editor__name-column">
            <ev-borderless-input ref="key-input"
                                 :placeholder="options.keyPlaceholder"
                                 v-model="item.key"
                                 @blur="handleInputBlur"></ev-borderless-input>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
        </div>

        <div class="ev-key-value-assertion-editor__condition-column">
            <ev-key-value-condition-selector :item="item" :options="options"></ev-key-value-condition-selector>
        </div>

        <div class="ev-key-value-assertion-editor__value-column">
            <ev-dynamic-variable-input ref="value-input"
                                       :placeholder="options.valuePlaceholder"
                                       v-model="item.value"
                                       v-if="isValueAssertion"></ev-dynamic-variable-input>

            <ev-label size="11" bold secondary v-if="isTrueAssertion">true</ev-label>

            <ev-label size="11" bold secondary v-if="isFalseAssertion">false</ev-label>

            <ev-label size="11" bold secondary v-if="isNullAssertion">null</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
        </div>

        <div class="ev-key-value-assertion-editor-item__icon-container" style="margin-right: 1px">
            <transition name="slide-y-transition" duration="80" mode="out-in">
                <ev-json-remove-icon key="delete" v-if="!deletable" @click.native="toggleDeletable"></ev-json-remove-icon>

                <ev-deletable-icon key="deletable" v-if="deletable" @click.native="emitRemoveItem"></ev-deletable-icon>
            </transition>
        </div>

        <ev-json-add-button @click.native="emitInsertItem"></ev-json-add-button>
    </div>
</template>

<script>
    import EvDragIcon from '@/views/http-client/icon/ev-drag-icon'
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'
    import EvBorderlessInput from '@/components/input/EvBorderlessInput'
    import EvJsonAddButton from '@/components/json-editor-vsl/components/EvJsonAddButton'
    import EvJsonRemoveIcon from '@/components/json-editor-vsl/icons/ev-json-remove-icon'
    import EvDeletableIcon from '@/views/http-client/icon/ev-deletable-icon'
    import _ from 'lodash'
    import DelayTrigger from '@/core/utils/DelayTrigger'
    import EvKeyValueConditionSelector from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueConditionSelector'
    import EvDynamicVariableInput from '@/components/dynamic-variable/EvDynamicVariableInput'

    export default {
        name: "EvKeyValueAssertionEditorItem",

        components: {
            EvDynamicVariableInput,
            EvKeyValueConditionSelector,
            EvBorderlessInput,
            EvLabel,
            EvVerticalGutter,
            EvExportCheckBox,
            EvDragIcon,
            EvJsonAddButton,
            EvJsonRemoveIcon,
            EvDeletableIcon,
        },

        props: {
            item: Object,

            options: Object
        },

        data() {
            return {
                deletable: false
            }
        },

        watch: {
            item: {
                deep: true,
                handler() {
                    this.emitUpdateItem()
                },
            }
        },

        computed: {
            isJsonPathMode() {
                return this.options.mode === "JSON_PATH"
            },

            isValueAssertion() {
                return !this.isTrueAssertion
                    && !this.isFalseAssertion
                    && !this.isNullAssertion
            },

            isBooleanAssertion() {

            },

            isTrueAssertion() {
                return this.isJsonPathMode && this.item.condition === 'T'
            },

            isFalseAssertion() {
                return this.isJsonPathMode && this.item.condition === 'F'
            },

            isNullAssertion() {
                return this.isJsonPathMode && this.item.condition === '--'
            },
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
            },

            handleInputBlur() {
                if (this.options.mode !== 'JSON_PATH') {
                    return
                }

                if (_.isEmpty(this.item.key)) {
                    return
                }

                if (!this.checkIsJsonPath(this.item.key)) {
                    this.item.key = '$.' + this.item.key
                }
            },

            checkIsJsonPath(value) {
                return value && value.startsWith('\$\.')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvKeyValueAssertionEditor";

    .ev-key-value-assertion-editor-item {
        position: relative;

        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 8px;

        border-bottom: 1px solid #F1F1F1;

        background-color: #FFF;

        &__drag-container {
            @include full-center;

            width: 20px;

            height: 16px;

            position: absolute;

            left: 2px;

            transition: 80ms;
        }

        &__menu-container {

        }

        &__icon-container {
            width: 16px;

            height: 16px;

            @include full-center;
        }
    }
</style>

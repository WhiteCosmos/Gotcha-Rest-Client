<template>
    <div class="ev-key-value-assertion-editor-item">
        <div class="ev-key-value-assertion-editor__name-column">
            <ev-label size="12" secondary medium selectable>{{ item.key }}</ev-label>

            <ev-vertical-gutter :gutter="8"></ev-vertical-gutter>
        </div>

        <div class="ev-key-value-assertion-viewer__condition-column">
            <ev-key-value-condition-selector :item="item" :options="{}" :read-only="true"></ev-key-value-condition-selector>
        </div>

        <div class="ev-key-value-assertion-viewer__value-column" v-if="item.returnedValue !== undefined">
            <div class="d-flex flex-column">
                <ev-label size="11" secondary bold>{{ $t('expectedValue') }}</ev-label>

                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <pre class="pre-style">{{ item.expectedValue ? item.expectedValue : '\"\"' }}</pre>

                <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

                <ev-label size="11" secondary bold>{{ $t('returnedValue') }}</ev-label>

                <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                <pre class="pre-style">{{ item.returnedValue ? item.returnedValue : '\"\"' }}</pre>

                <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>

                <div v-if="showDiff">
                    <ev-label size="11" secondary bold>{{ $t('diff') }}</ev-label>

                    <ev-horizon-gutter :gutter="4"></ev-horizon-gutter>

                    <ev-key-value-assertion-viewer-diff :diff="diff"></ev-key-value-assertion-viewer-diff>

                    <ev-horizon-gutter :gutter="8"></ev-horizon-gutter>
                </div>
            </div>
        </div>

        <div class="ev-key-value-assertion-editor__value-column" v-else>
            <ev-label size="11" grey bold>{{ $t('notFound') }}</ev-label>
        </div>

        <div class="ev-key-value-assertion-editor-item__icon-container" style="margin-right: 1px">
            <ev-label size="11" bold green v-if="item.pass">{{ $t('pass') }}</ev-label>

            <ev-label size="11" bold red v-else>{{ $t('failed') }}</ev-label>
        </div>
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
    import EvKeyValueConditionSelector from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueConditionSelector'
    import EvHorizonGutter from '@/components/layout/EvHorizonGutter'
    import EvKeyValueAssertionViewerDiff from '@/views/http-client/components/key-value-assertion-editor/EvKeyValueAssertionViewerDiff'

    export default {
        name: "EvKeyValueAssertionViewerItem",

        components: {
            EvKeyValueAssertionViewerDiff,
            EvHorizonGutter,
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

        computed: {
            showDiff() {
                if (!this.item) {
                    return false
                }

                return !this.item.pass && (this.item.condition === '==')
            },

            diff() {
                if (!this.item) {
                    return
                }

                let expectedValue = String(this.item.expectedValue)

                let returnedValue = String(this.item.returnedValue)

                let Diff = require('diff')

                return Diff.diffChars(expectedValue, returnedValue)
            },
        },

        methods: {
            emitInsertItem() {

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

        i18n: {
            messages: {
                en: {
                    pass: "PASS",

                    failed: "FAIL",

                    condition: "Condition",

                    notFound: "Value Not Found",

                    returnedValue: "Returned",

                    expectedValue: "Expected",

                    diff: "Diff",
                },
                zh: {
                    pass: "通过",

                    failed: "失败",

                    condition: "判断条件",

                    notFound: "参数不存在",

                    returnedValue: "返回值",

                    expectedValue: "期望值",

                    diff: "对比结果",
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvKeyValueAssertionEditor";

    .ev-key-value-assertion-editor-item {
        position: relative;

        display: flex;

        align-items: center;

        min-height: 28px;

        padding-left: 24px;

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

        &__condition-container {
            display: flex;

            align-items: center;

            justify-content: center;

            font-family: 'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace;

            height: 14px;

            width: 20px;

            border-radius: 2px;

            background-color: #F1F1F1;
        }

        &__icon-container {
            display: flex;

            align-items: center;

            width: 48px;

            height: 16px;

            padding-left: 8px;

            //background-color: green;

            //opacity: 0.5;
        }
    }

    .pre-style {
        //font-family: "PingFang SC", sans-serif;

        display: flex;

        text-align: start;

        word-break: break-all;

        white-space: break-spaces;

        font-size: 11px;

        color: $SECONDARY_FONT_COLOR;

        background-color: #F5F5F5;

        border-radius: 3px;
    }
</style>

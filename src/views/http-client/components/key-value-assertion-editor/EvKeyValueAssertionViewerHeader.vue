<template>
    <div class="ev-key-value-assertion-editor-header">
        <div class="ev-key-value-assertion-editor__name-column">
            <ev-label size="11" bold secondary>{{ options.headers ? options.headers[0] : 'Name' }}</ev-label>
        </div>

        <div class="ev-key-value-assertion-viewer__condition-column">
            <ev-label size="11" bold secondary>{{ $t('condition') }}</ev-label>
        </div>

        <div class="ev-key-value-assertion-editor__value-column">
            <ev-label size="11" bold secondary>{{ options.headers ? options.headers[1] : 'Value' }}</ev-label>
        </div>
    </div>
</template>

<script>
    import EvExportCheckBox from '@/modals/export-project/export-filter/EvExportCheckBox'
    import EvVerticalGutter from '@/components/layout/EvVerticalGutter'
    import EvLabel from '@/components/typography/EvLabel'

    export default {
        name: "EvKeyValueAssertionViewerHeader",

        components: {
            EvExportCheckBox,
            EvVerticalGutter,
            EvLabel
        },

        created() {
            this.checkedStatus_ = this.checkedStatus
        },

        model: {
            prop: "checkedStatus",
            event: "change"
        },

        props: {
            options: Object,

            checkedStatus: String,
        },

        data() {
            return {
                checkedStatus_: "CHECKED"
            }
        },

        watch: {
            checkedStatus(newVal) {
                this.checkedStatus_ = newVal
            },

            checkedStatus_(newVal) {
                this.$emit('change', newVal)
            }
        },

        i18n: {
            messages: {
                en: {
                    condition: "Condition"
                },
                zh: {
                    condition: "判断条件"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "EvKeyValueAssertionEditor";

    .ev-key-value-assertion-editor-header {
        display: flex;

        align-items: center;

        height: 28px;

        padding-left: 24px;

        padding-right: 16px;

        border-bottom: 1px solid #EAEAEA;

        user-select: none;
    }
</style>
